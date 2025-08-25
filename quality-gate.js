/**
 * وحدة بوابة الجودة - Quality Gate Module
 * مسؤولة عن تصفية وتقييم الإشارات التجارية لضمان جودتها
 */

class QualityGate {
    constructor() {
        // إعدادات بوابة الجودة
        this.config = {
            // الحد الأدنى لقوة الإشارة (من 100)
            minSignalStrength: 60,
            
            // الحد الأدنى لحجم التداول (نسبة من المتوسط)
            minVolumeRatio: 0.8,
            
            // الحد الأقصى للتذبذب المسموح (ATR %)
            maxVolatility: 2.0,
            
            // عدد المؤشرات المطلوبة للتأكيد
            minConfirmingIndicators: 3,
            
            // فترة التحقق من الإشارات المتضاربة (بالدقائق)
            conflictCheckPeriod: 30,
            
            // الحد الأدنى للمسافة من مستويات الدعم والمقاومة
            minSupportResistanceDistance: 0.001, // 0.1%
            
            // إعدادات RSI
            rsi: {
                overbought: 70,
                oversold: 30,
                neutral: { min: 40, max: 60 }
            },
            
            // إعدادات Stochastic
            stochastic: {
                overbought: 80,
                oversold: 20
            },
            
            // إعدادات MACD
            macd: {
                minHistogramValue: 0.0001,
                minSignalLineCrossing: 0.0001
            }
        };
        
        // سجل الإشارات السابقة
        this.signalHistory = [];
        
        // إحصائيات بوابة الجودة
        this.stats = {
            totalSignals: 0,
            approvedSignals: 0,
            rejectedSignals: 0,
            rejectionReasons: {}
        };
    }
    
    /**
     * تقييم إشارة تجارية
     * @param {Object} signal - الإشارة التجارية
     * @param {Object} indicators - المؤشرات الفنية
     * @param {Array} candles - بيانات الشموع
     * @returns {Object} نتيجة التقييم
     */
    evaluateSignal(signal, indicators, candles) {
        this.stats.totalSignals++;
        
        const evaluation = {
            signal: signal,
            approved: false,
            confidence: 0,
            strength: 0,
            rejectionReasons: [],
            warnings: [],
            timestamp: new Date().toISOString()
        };
        
        try {
            // 1. التحقق من قوة الإشارة الأساسية
            const signalStrength = this.calculateSignalStrength(indicators);
            evaluation.strength = signalStrength;
            
            if (signalStrength < this.config.minSignalStrength) {
                evaluation.rejectionReasons.push(`قوة الإشارة ضعيفة: ${signalStrength}% (المطلوب: ${this.config.minSignalStrength}%)`);
            }
            
            // 2. التحقق من تأكيد المؤشرات المتعددة
            const confirmingIndicators = this.checkIndicatorConfirmation(signal, indicators);
            if (confirmingIndicators.count < this.config.minConfirmingIndicators) {
                evaluation.rejectionReasons.push(`عدد المؤشرات المؤكدة غير كافي: ${confirmingIndicators.count} (المطلوب: ${this.config.minConfirmingIndicators})`);
            }
            
            // 3. التحقق من حجم التداول
            const volumeCheck = this.checkVolume(candles);
            if (!volumeCheck.adequate) {
                evaluation.rejectionReasons.push(`حجم التداول منخفض: ${volumeCheck.ratio.toFixed(2)} (المطلوب: ${this.config.minVolumeRatio})`);
            }
            
            // 4. التحقق من التذبذب
            const volatilityCheck = this.checkVolatility(indicators);
            if (!volatilityCheck.acceptable) {
                evaluation.rejectionReasons.push(`التذبذب مرتفع جداً: ${volatilityCheck.percentage.toFixed(2)}% (الحد الأقصى: ${this.config.maxVolatility}%)`);
            }
            
            // 5. التحقق من الإشارات المتضاربة
            const conflictCheck = this.checkForConflicts(signal, indicators);
            if (conflictCheck.hasConflict) {
                evaluation.rejectionReasons.push(`إشارات متضاربة: ${conflictCheck.conflicts.join(', ')}`);
            }
            
            // 6. التحقق من مستويات الدعم والمقاومة
            const supportResistanceCheck = this.checkSupportResistance(indicators, candles);
            if (!supportResistanceCheck.safe) {
                evaluation.warnings.push(`قريب من مستوى ${supportResistanceCheck.level}: ${supportResistanceCheck.distance.toFixed(4)}`);
            }
            
            // 7. التحقق من توقيت السوق
            const timingCheck = this.checkMarketTiming();
            if (!timingCheck.optimal) {
                evaluation.warnings.push(`توقيت السوق: ${timingCheck.reason}`);
            }
            
            // 8. حساب مستوى الثقة النهائي
            evaluation.confidence = this.calculateConfidence(
                signalStrength,
                confirmingIndicators.count,
                volumeCheck.adequate,
                volatilityCheck.acceptable,
                !conflictCheck.hasConflict,
                supportResistanceCheck.safe
            );
            
            // 9. اتخاذ القرار النهائي
            if (evaluation.rejectionReasons.length === 0 && evaluation.confidence >= 70) {
                evaluation.approved = true;
                this.stats.approvedSignals++;
                
                // إضافة الإشارة إلى السجل
                this.signalHistory.push({
                    ...signal,
                    timestamp: evaluation.timestamp,
                    confidence: evaluation.confidence,
                    strength: evaluation.strength
                });
                
                // الاحتفاظ بآخر 100 إشارة فقط
                if (this.signalHistory.length > 100) {
                    this.signalHistory = this.signalHistory.slice(-100);
                }
            } else {
                this.stats.rejectedSignals++;
                
                // تسجيل أسباب الرفض للإحصائيات
                evaluation.rejectionReasons.forEach(reason => {
                    const key = reason.split(':')[0];
                    this.stats.rejectionReasons[key] = (this.stats.rejectionReasons[key] || 0) + 1;
                });
            }
            
        } catch (error) {
            evaluation.rejectionReasons.push(`خطأ في التقييم: ${error.message}`);
            this.stats.rejectedSignals++;
        }
        
        return evaluation;
    }
    
    /**
     * حساب قوة الإشارة
     * @param {Object} indicators - المؤشرات الفنية
     * @returns {number} قوة الإشارة (0-100)
     */
    calculateSignalStrength(indicators) {
        let strength = 0;
        let maxStrength = 0;
        
        // قوة RSI (25 نقطة)
        maxStrength += 25;
        if (indicators.rsi <= this.config.rsi.oversold || indicators.rsi >= this.config.rsi.overbought) {
            strength += 25; // في منطقة التشبع
        } else if (indicators.rsi < this.config.rsi.neutral.min || indicators.rsi > this.config.rsi.neutral.max) {
            strength += 15; // خارج المنطقة المحايدة
        } else {
            strength += 5; // في المنطقة المحايدة
        }
        
        // قوة MACD (25 نقطة)
        maxStrength += 25;
        const macdStrength = Math.abs(indicators.macdHistogram);
        if (macdStrength > this.config.macd.minHistogramValue * 3) {
            strength += 25;
        } else if (macdStrength > this.config.macd.minHistogramValue) {
            strength += 15;
        } else {
            strength += 5;
        }
        
        // قوة Stochastic (20 نقطة)
        maxStrength += 20;
        if (indicators.stochasticK <= this.config.stochastic.oversold || indicators.stochasticK >= this.config.stochastic.overbought) {
            strength += 20;
        } else if (indicators.stochasticK < 40 || indicators.stochasticK > 60) {
            strength += 12;
        } else {
            strength += 4;
        }
        
        // قوة المتوسطات المتحركة (20 نقطة)
        maxStrength += 20;
        const emaDistance = Math.abs(indicators.ema12 - indicators.ema26) / indicators.price;
        if (emaDistance > 0.003) {
            strength += 20;
        } else if (emaDistance > 0.001) {
            strength += 12;
        } else {
            strength += 4;
        }
        
        // قوة ATR (10 نقاط)
        maxStrength += 10;
        const atrPercent = (indicators.atr / indicators.price) * 100;
        if (atrPercent > 0.3 && atrPercent < 1.5) {
            strength += 10; // تذبذب مثالي
        } else if (atrPercent > 0.1 && atrPercent < 2.0) {
            strength += 6; // تذبذب مقبول
        } else {
            strength += 2; // تذبذب غير مثالي
        }
        
        return Math.round((strength / maxStrength) * 100);
    }
    
    /**
     * التحقق من تأكيد المؤشرات المتعددة
     * @param {Object} signal - الإشارة التجارية
     * @param {Object} indicators - المؤشرات الفنية
     * @returns {Object} نتيجة التحقق
     */
    checkIndicatorConfirmation(signal, indicators) {
        const confirmations = [];
        const direction = signal.direction; // 'buy' أو 'sell'
        
        // تأكيد RSI
        if (direction === 'buy' && indicators.rsi < this.config.rsi.oversold) {
            confirmations.push('RSI_OVERSOLD');
        } else if (direction === 'sell' && indicators.rsi > this.config.rsi.overbought) {
            confirmations.push('RSI_OVERBOUGHT');
        }
        
        // تأكيد MACD
        if (direction === 'buy' && indicators.macdHistogram > this.config.macd.minHistogramValue) {
            confirmations.push('MACD_BULLISH');
        } else if (direction === 'sell' && indicators.macdHistogram < -this.config.macd.minHistogramValue) {
            confirmations.push('MACD_BEARISH');
        }
        
        // تأكيد Stochastic
        if (direction === 'buy' && indicators.stochasticK < this.config.stochastic.oversold) {
            confirmations.push('STOCH_OVERSOLD');
        } else if (direction === 'sell' && indicators.stochasticK > this.config.stochastic.overbought) {
            confirmations.push('STOCH_OVERBOUGHT');
        }
        
        // تأكيد المتوسطات المتحركة
        if (direction === 'buy' && indicators.ema12 > indicators.ema26) {
            confirmations.push('EMA_BULLISH');
        } else if (direction === 'sell' && indicators.ema12 < indicators.ema26) {
            confirmations.push('EMA_BEARISH');
        }
        
        // تأكيد السعر مقابل المتوسط المتحرك
        if (direction === 'buy' && indicators.price > indicators.ema50) {
            confirmations.push('PRICE_ABOVE_EMA50');
        } else if (direction === 'sell' && indicators.price < indicators.ema50) {
            confirmations.push('PRICE_BELOW_EMA50');
        }
        
        // تأكيد Bollinger Bands
        if (direction === 'buy' && indicators.price <= indicators.bbLower) {
            confirmations.push('BB_LOWER_TOUCH');
        } else if (direction === 'sell' && indicators.price >= indicators.bbUpper) {
            confirmations.push('BB_UPPER_TOUCH');
        }
        
        return {
            count: confirmations.length,
            confirmations: confirmations
        };
    }
    
    /**
     * التحقق من حجم التداول
     * @param {Array} candles - بيانات الشموع
     * @returns {Object} نتيجة التحقق
     */
    checkVolume(candles) {
        if (!candles || candles.length < 20) {
            return { adequate: true, ratio: 1, reason: 'بيانات الحجم غير متوفرة' };
        }
        
        const volumes = candles.map(c => c.volume || 0).filter(v => v > 0);
        if (volumes.length === 0) {
            return { adequate: true, ratio: 1, reason: 'بيانات الحجم غير متوفرة' };
        }
        
        const averageVolume = volumes.reduce((sum, vol) => sum + vol, 0) / volumes.length;
        const currentVolume = candles[candles.length - 1].volume || 0;
        const ratio = currentVolume / averageVolume;
        
        return {
            adequate: ratio >= this.config.minVolumeRatio,
            ratio: ratio,
            currentVolume: currentVolume,
            averageVolume: averageVolume
        };
    }
    
    /**
     * التحقق من التذبذب
     * @param {Object} indicators - المؤشرات الفنية
     * @returns {Object} نتيجة التحقق
     */
    checkVolatility(indicators) {
        const atrPercent = (indicators.atr / indicators.price) * 100;
        
        return {
            acceptable: atrPercent <= this.config.maxVolatility,
            percentage: atrPercent,
            level: atrPercent > 1.5 ? 'high' : atrPercent > 0.5 ? 'medium' : 'low'
        };
    }
    
    /**
     * التحقق من الإشارات المتضاربة
     * @param {Object} signal - الإشارة التجارية
     * @param {Object} indicators - المؤشرات الفنية
     * @returns {Object} نتيجة التحقق
     */
    checkForConflicts(signal, indicators) {
        const conflicts = [];
        const direction = signal.direction;
        
        // تضارب RSI مع الاتجاه
        if (direction === 'buy' && indicators.rsi > this.config.rsi.overbought) {
            conflicts.push('RSI في منطقة التشبع الشرائي');
        } else if (direction === 'sell' && indicators.rsi < this.config.rsi.oversold) {
            conflicts.push('RSI في منطقة التشبع البيعي');
        }
        
        // تضارب MACD مع الاتجاه
        if (direction === 'buy' && indicators.macdHistogram < -this.config.macd.minHistogramValue) {
            conflicts.push('MACD يشير للاتجاه الهبوطي');
        } else if (direction === 'sell' && indicators.macdHistogram > this.config.macd.minHistogramValue) {
            conflicts.push('MACD يشير للاتجاه الصعودي');
        }
        
        // تضارب المتوسطات المتحركة
        if (direction === 'buy' && indicators.ema12 < indicators.ema26) {
            conflicts.push('المتوسطات المتحركة تشير للاتجاه الهبوطي');
        } else if (direction === 'sell' && indicators.ema12 > indicators.ema26) {
            conflicts.push('المتوسطات المتحركة تشير للاتجاه الصعودي');
        }
        
        return {
            hasConflict: conflicts.length > 0,
            conflicts: conflicts
        };
    }
    
    /**
     * التحقق من مستويات الدعم والمقاومة
     * @param {Object} indicators - المؤشرات الفنية
     * @param {Array} candles - بيانات الشموع
     * @returns {Object} نتيجة التحقق
     */
    checkSupportResistance(indicators, candles) {
        if (!candles || candles.length < 50) {
            return { safe: true, reason: 'بيانات غير كافية' };
        }
        
        const currentPrice = indicators.price;
        const recentCandles = candles.slice(-50);
        
        // العثور على مستويات الدعم والمقاومة
        const highs = recentCandles.map(c => c.high);
        const lows = recentCandles.map(c => c.low);
        
        const resistance = Math.max(...highs);
        const support = Math.min(...lows);
        
        // حساب المسافة من المستويات
        const resistanceDistance = Math.abs(currentPrice - resistance) / currentPrice;
        const supportDistance = Math.abs(currentPrice - support) / currentPrice;
        
        const minDistance = this.config.minSupportResistanceDistance;
        
        if (resistanceDistance < minDistance) {
            return {
                safe: false,
                level: 'resistance',
                distance: resistanceDistance,
                value: resistance
            };
        }
        
        if (supportDistance < minDistance) {
            return {
                safe: false,
                level: 'support',
                distance: supportDistance,
                value: support
            };
        }
        
        return { safe: true };
    }
    
    /**
     * التحقق من توقيت السوق
     * @returns {Object} نتيجة التحقق
     */
    checkMarketTiming() {
        const now = new Date();
        const hour = now.getUTCHours();
        const day = now.getUTCDay(); // 0 = الأحد, 6 = السبت
        
        // تجنب عطلة نهاية الأسبوع
        if (day === 0 || day === 6) {
            return {
                optimal: false,
                reason: 'عطلة نهاية الأسبوع - السوق مغلق'
            };
        }
        
        // تجنب الساعات الهادئة (22:00 - 02:00 UTC)
        if (hour >= 22 || hour <= 2) {
            return {
                optimal: false,
                reason: 'ساعات تداول هادئة'
            };
        }
        
        // أفضل أوقات التداول
        if ((hour >= 8 && hour <= 10) || (hour >= 13 && hour <= 16)) {
            return {
                optimal: true,
                reason: 'وقت تداول مثالي'
            };
        }
        
        return {
            optimal: true,
            reason: 'وقت تداول مقبول'
        };
    }
    
    /**
     * حساب مستوى الثقة النهائي
     * @param {number} signalStrength - قوة الإشارة
     * @param {number} confirmingIndicators - عدد المؤشرات المؤكدة
     * @param {boolean} adequateVolume - حجم التداول كافي
     * @param {boolean} acceptableVolatility - التذبذب مقبول
     * @param {boolean} noConflicts - لا توجد تضاربات
     * @param {boolean} safeFromLevels - بعيد عن مستويات الدعم والمقاومة
     * @returns {number} مستوى الثقة (0-100)
     */
    calculateConfidence(signalStrength, confirmingIndicators, adequateVolume, acceptableVolatility, noConflicts, safeFromLevels) {
        let confidence = 0;
        
        // قوة الإشارة (40%)
        confidence += (signalStrength / 100) * 40;
        
        // عدد المؤشرات المؤكدة (25%)
        confidence += Math.min(confirmingIndicators / this.config.minConfirmingIndicators, 1) * 25;
        
        // حجم التداول (10%)
        confidence += adequateVolume ? 10 : 0;
        
        // التذبذب (10%)
        confidence += acceptableVolatility ? 10 : 0;
        
        // عدم وجود تضاربات (10%)
        confidence += noConflicts ? 10 : 0;
        
        // البعد عن المستويات الحرجة (5%)
        confidence += safeFromLevels ? 5 : 0;
        
        return Math.round(confidence);
    }
    
    /**
     * الحصول على إحصائيات بوابة الجودة
     * @returns {Object} الإحصائيات
     */
    getStats() {
        const approvalRate = this.stats.totalSignals > 0 ? 
            (this.stats.approvedSignals / this.stats.totalSignals * 100).toFixed(2) : '0.00';
        
        return {
            ...this.stats,
            approvalRate: approvalRate + '%',
            recentSignals: this.signalHistory.slice(-10)
        };
    }
    
    /**
     * إعادة تعيين الإحصائيات
     */
    resetStats() {
        this.stats = {
            totalSignals: 0,
            approvedSignals: 0,
            rejectedSignals: 0,
            rejectionReasons: {}
        };
        this.signalHistory = [];
    }
    
    /**
     * تحديث إعدادات بوابة الجودة
     * @param {Object} newConfig - الإعدادات الجديدة
     */
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
    }
}

// تصدير الكلاس للاستخدام
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QualityGate;
} else {
    window.QualityGate = QualityGate;
}

