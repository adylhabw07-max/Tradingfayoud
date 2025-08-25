/**
 * محرك التداول الذكي - Smart Trading Engine
 * يدمج جميع المكونات: جلب البيانات، التحليل الفني، بوابة الجودة
 */

class SmartTradingEngine {
    constructor() {
        // تهيئة المكونات الأساسية
        this.dataFetcher = new DataFetcher();
        this.technicalAnalysis = new TechnicalAnalysis();
        this.qualityGate = new QualityGate();
        
        // إعدادات المحرك
        this.config = {
            // الأزواج المدعومة
            supportedPairs: [
                'EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CAD',
                'USD/CHF', 'NZD/USD', 'EUR/GBP', 'EUR/JPY', 'GBP/JPY',
                'AUD/JPY', 'CAD/JPY', 'CHF/JPY', 'EUR/AUD', 'GBP/AUD'
            ],
            
            // الفترات الزمنية المدعومة
            supportedIntervals: ['1min', '5min', '15min', '30min', '1h', '4h', '1day'],
            
            // الحد الأدنى لعدد الشموع المطلوبة للتحليل
            minCandles: 50,
            
            // فترة التحديث التلقائي (بالميلي ثانية)
            autoUpdateInterval: 300000, // 5 دقائق
            
            // تفعيل التحديث التلقائي
            autoUpdateEnabled: false,
            
            // الحد الأقصى لعدد الإشارات المحفوظة
            maxStoredSignals: 100
        };
        
        // حالة المحرك
        this.state = {
            isRunning: false,
            currentPair: null,
            currentInterval: null,
            lastUpdate: null,
            lastAnalysis: null,
            activeSignals: [],
            errors: []
        };
        
        // معرف التحديث التلقائي
        this.autoUpdateTimer = null;
        
        // مستمعي الأحداث
        this.eventListeners = {
            'signal': [],
            'analysis': [],
            'error': [],
            'update': []
        };
        
        console.log('تم تهيئة محرك التداول الذكي بنجاح');
    }
    
    /**
     * بدء تشغيل المحرك
     * @param {string} pair - زوج العملات
     * @param {string} interval - الفترة الزمنية
     * @param {Object} options - خيارات إضافية
     */
    async start(pair, interval = '5min', options = {}) {
        try {
            console.log(`بدء تشغيل محرك التداول لـ ${pair} - ${interval}`);
            
            // التحقق من صحة المدخلات
            if (!this.config.supportedPairs.includes(pair)) {
                throw new Error(`زوج العملات غير مدعوم: ${pair}`);
            }
            
            if (!this.config.supportedIntervals.includes(interval)) {
                throw new Error(`الفترة الزمنية غير مدعومة: ${interval}`);
            }
            
            // تحديث حالة المحرك
            this.state.isRunning = true;
            this.state.currentPair = pair;
            this.state.currentInterval = interval;
            this.state.errors = [];
            
            // دمج الخيارات مع الإعدادات الافتراضية
            const mergedOptions = {
                outputsize: 100,
                enableAutoUpdate: false,
                ...options
            };
            
            // تحديث إعدادات بوابة الجودة إذا تم توفيرها
            if (options.qualityGateConfig) {
                this.qualityGate.updateConfig(options.qualityGateConfig);
            }
            
            // تحديث مفاتيح API إذا تم توفيرها
            if (options.apiKeys) {
                this.dataFetcher.updateApiKeys(options.apiKeys);
            }
            
            // إجراء التحليل الأولي
            await this.performAnalysis(pair, interval, mergedOptions.outputsize);
            
            // تفعيل التحديث التلقائي إذا كان مطلوباً
            if (mergedOptions.enableAutoUpdate) {
                this.enableAutoUpdate();
            }
            
            this.emit('update', {
                type: 'engine_started',
                pair: pair,
                interval: interval,
                timestamp: new Date().toISOString()
            });
            
            console.log(`تم بدء تشغيل المحرك بنجاح لـ ${pair}`);
            
        } catch (error) {
            this.handleError('start', error);
            throw error;
        }
    }
    
    /**
     * إيقاف تشغيل المحرك
     */
    stop() {
        console.log('إيقاف تشغيل محرك التداول');
        
        this.state.isRunning = false;
        this.disableAutoUpdate();
        
        this.emit('update', {
            type: 'engine_stopped',
            timestamp: new Date().toISOString()
        });
        
        console.log('تم إيقاف المحرك بنجاح');
    }
    
    /**
     * إجراء تحليل شامل
     * @param {string} pair - زوج العملات
     * @param {string} interval - الفترة الزمنية
     * @param {number} outputsize - عدد الشموع
     */
    async performAnalysis(pair, interval, outputsize = 100) {
        try {
            console.log(`بدء التحليل لـ ${pair} - ${interval}`);
            
            // 1. جلب البيانات التاريخية
            const historicalData = await this.dataFetcher.fetchHistoricalData(pair, interval, outputsize);
            
            if (!historicalData || !historicalData.values || historicalData.values.length < this.config.minCandles) {
                throw new Error(`البيانات غير كافية للتحليل. مطلوب ${this.config.minCandles} شمعة على الأقل`);
            }
            
            // تحويل البيانات إلى تنسيق الشموع
            const candles = this.convertToCandles(historicalData.values);
            
            // 2. إجراء التحليل الفني
            const analysis = this.technicalAnalysis.analyzeData(candles);
            const indicators = this.technicalAnalysis.getLatestIndicators(analysis);
            
            // 3. تحديد الاتجاه العام
            const trend = this.technicalAnalysis.determineTrend(indicators);
            
            // 4. توليد الإشارات المحتملة
            const potentialSignals = this.generateSignals(indicators, trend, candles);
            
            // 5. تصفية الإشارات عبر بوابة الجودة
            const evaluatedSignals = [];
            for (const signal of potentialSignals) {
                const evaluation = this.qualityGate.evaluateSignal(signal, indicators, candles);
                evaluatedSignals.push(evaluation);
            }
            
            // 6. الاحتفاظ بالإشارات المعتمدة فقط
            const approvedSignals = evaluatedSignals.filter(eval => eval.approved);
            
            // 7. تحديث حالة المحرك
            this.state.lastUpdate = new Date().toISOString();
            this.state.lastAnalysis = {\n                pair: pair,\n                interval: interval,\n                dataSource: historicalData.source,\n                candlesCount: candles.length,\n                indicators: indicators,\n                trend: trend,\n                potentialSignals: potentialSignals.length,\n                approvedSignals: approvedSignals.length,\n                evaluations: evaluatedSignals,\n                timestamp: this.state.lastUpdate\n            };\n            \n            // 8. إضافة الإشارات المعتمدة إلى القائمة النشطة\n            approvedSignals.forEach(evaluation => {\n                this.state.activeSignals.push({\n                    ...evaluation.signal,\n                    confidence: evaluation.confidence,\n                    strength: evaluation.strength,\n                    timestamp: evaluation.timestamp,\n                    pair: pair,\n                    interval: interval\n                });\n            });\n            \n            // الاحتفاظ بآخر الإشارات فقط\n            if (this.state.activeSignals.length > this.config.maxStoredSignals) {\n                this.state.activeSignals = this.state.activeSignals.slice(-this.config.maxStoredSignals);\n            }\n            \n            // 9. إرسال الأحداث\n            this.emit('analysis', this.state.lastAnalysis);\n            \n            if (approvedSignals.length > 0) {\n                approvedSignals.forEach(evaluation => {\n                    this.emit('signal', evaluation);\n                });\n            }\n            \n            console.log(`تم إكمال التحليل: ${approvedSignals.length} إشارة معتمدة من أصل ${potentialSignals.length}`);\n            \n            return this.state.lastAnalysis;\n            \n        } catch (error) {\n            this.handleError('performAnalysis', error);\n            throw error;\n        }\n    }\n    \n    /**\n     * توليد الإشارات المحتملة\n     * @param {Object} indicators - المؤشرات الفنية\n     * @param {string} trend - الاتجاه العام\n     * @param {Array} candles - بيانات الشموع\n     * @returns {Array} الإشارات المحتملة\n     */\n    generateSignals(indicators, trend, candles) {\n        const signals = [];\n        const currentPrice = indicators.price;\n        \n        // إشارة RSI\n        if (indicators.rsi <= 30) {\n            signals.push({\n                type: 'RSI_OVERSOLD',\n                direction: 'buy',\n                price: currentPrice,\n                reason: `RSI في منطقة التشبع البيعي: ${indicators.rsi.toFixed(2)}`,\n                source: 'RSI',\n                priority: 'high'\n            });\n        } else if (indicators.rsi >= 70) {\n            signals.push({\n                type: 'RSI_OVERBOUGHT',\n                direction: 'sell',\n                price: currentPrice,\n                reason: `RSI في منطقة التشبع الشرائي: ${indicators.rsi.toFixed(2)}`,\n                source: 'RSI',\n                priority: 'high'\n            });\n        }\n        \n        // إشارة MACD\n        if (indicators.macdHistogram > 0 && indicators.macdLine > indicators.macdSignal) {\n            signals.push({\n                type: 'MACD_BULLISH',\n                direction: 'buy',\n                price: currentPrice,\n                reason: `MACD صعودي: Histogram = ${indicators.macdHistogram.toFixed(6)}`,\n                source: 'MACD',\n                priority: 'medium'\n            });\n        } else if (indicators.macdHistogram < 0 && indicators.macdLine < indicators.macdSignal) {\n            signals.push({\n                type: 'MACD_BEARISH',\n                direction: 'sell',\n                price: currentPrice,\n                reason: `MACD هبوطي: Histogram = ${indicators.macdHistogram.toFixed(6)}`,\n                source: 'MACD',\n                priority: 'medium'\n            });\n        }\n        \n        // إشارة Stochastic\n        if (indicators.stochasticK <= 20 && indicators.stochasticD <= 20) {\n            signals.push({\n                type: 'STOCH_OVERSOLD',\n                direction: 'buy',\n                price: currentPrice,\n                reason: `Stochastic في منطقة التشبع البيعي: K=${indicators.stochasticK.toFixed(2)}, D=${indicators.stochasticD.toFixed(2)}`,\n                source: 'Stochastic',\n                priority: 'medium'\n            });\n        } else if (indicators.stochasticK >= 80 && indicators.stochasticD >= 80) {\n            signals.push({\n                type: 'STOCH_OVERBOUGHT',\n                direction: 'sell',\n                price: currentPrice,\n                reason: `Stochastic في منطقة التشبع الشرائي: K=${indicators.stochasticK.toFixed(2)}, D=${indicators.stochasticD.toFixed(2)}`,\n                source: 'Stochastic',\n                priority: 'medium'\n            });\n        }\n        \n        // إشارة Bollinger Bands\n        if (currentPrice <= indicators.bbLower) {\n            signals.push({\n                type: 'BB_LOWER_TOUCH',\n                direction: 'buy',\n                price: currentPrice,\n                reason: `السعر لمس الحد الأدنى لـ Bollinger Bands: ${indicators.bbLower.toFixed(5)}`,\n                source: 'BollingerBands',\n                priority: 'medium'\n            });\n        } else if (currentPrice >= indicators.bbUpper) {\n            signals.push({\n                type: 'BB_UPPER_TOUCH',\n                direction: 'sell',\n                price: currentPrice,\n                reason: `السعر لمس الحد الأعلى لـ Bollinger Bands: ${indicators.bbUpper.toFixed(5)}`,\n                source: 'BollingerBands',\n                priority: 'medium'\n            });\n        }\n        \n        // إشارة المتوسطات المتحركة\n        if (indicators.ema12 > indicators.ema26 && currentPrice > indicators.ema50) {\n            signals.push({\n                type: 'EMA_BULLISH',\n                direction: 'buy',\n                price: currentPrice,\n                reason: `المتوسطات المتحركة صعودية: EMA12 > EMA26 والسعر > EMA50`,\n                source: 'EMA',\n                priority: 'low'\n            });\n        } else if (indicators.ema12 < indicators.ema26 && currentPrice < indicators.ema50) {\n            signals.push({\n                type: 'EMA_BEARISH',\n                direction: 'sell',\n                price: currentPrice,\n                reason: `المتوسطات المتحركة هبوطية: EMA12 < EMA26 والسعر < EMA50`,\n                source: 'EMA',\n                priority: 'low'\n            });\n        }\n        \n        // إشارة مركبة (عدة مؤشرات)\n        const bullishCount = signals.filter(s => s.direction === 'buy').length;\n        const bearishCount = signals.filter(s => s.direction === 'sell').length;\n        \n        if (bullishCount >= 3) {\n            signals.push({\n                type: 'MULTI_BULLISH',\n                direction: 'buy',\n                price: currentPrice,\n                reason: `إشارة صعودية مركبة من ${bullishCount} مؤشرات`,\n                source: 'MultiIndicator',\n                priority: 'very_high'\n            });\n        } else if (bearishCount >= 3) {\n            signals.push({\n                type: 'MULTI_BEARISH',\n                direction: 'sell',\n                price: currentPrice,\n                reason: `إشارة هبوطية مركبة من ${bearishCount} مؤشرات`,\n                source: 'MultiIndicator',\n                priority: 'very_high'\n            });\n        }\n        \n        return signals;\n    }\n    \n    /**\n     * تحويل البيانات إلى تنسيق الشموع\n     * @param {Array} values - قيم البيانات\n     * @returns {Array} مصفوفة الشموع\n     */\n    convertToCandles(values) {\n        return values.map(value => ({\n            datetime: value.datetime,\n            open: parseFloat(value.open),\n            high: parseFloat(value.high),\n            low: parseFloat(value.low),\n            close: parseFloat(value.close),\n            volume: parseInt(value.volume) || 0\n        }));\n    }\n    \n    /**\n     * تفعيل التحديث التلقائي\n     */\n    enableAutoUpdate() {\n        if (this.autoUpdateTimer) {\n            clearInterval(this.autoUpdateTimer);\n        }\n        \n        this.config.autoUpdateEnabled = true;\n        \n        this.autoUpdateTimer = setInterval(async () => {\n            if (this.state.isRunning && this.state.currentPair && this.state.currentInterval) {\n                try {\n                    console.log('تحديث تلقائي للتحليل...');\n                    await this.performAnalysis(this.state.currentPair, this.state.currentInterval);\n                } catch (error) {\n                    console.warn('خطأ في التحديث التلقائي:', error.message);\n                }\n            }\n        }, this.config.autoUpdateInterval);\n        \n        console.log(`تم تفعيل التحديث التلقائي كل ${this.config.autoUpdateInterval / 1000} ثانية`);\n    }\n    \n    /**\n     * إلغاء التحديث التلقائي\n     */\n    disableAutoUpdate() {\n        if (this.autoUpdateTimer) {\n            clearInterval(this.autoUpdateTimer);\n            this.autoUpdateTimer = null;\n        }\n        \n        this.config.autoUpdateEnabled = false;\n        console.log('تم إلغاء التحديث التلقائي');\n    }\n    \n    /**\n     * الحصول على حالة المحرك\n     * @returns {Object} حالة المحرك\n     */\n    getStatus() {\n        return {\n            ...this.state,\n            config: this.config,\n            dataFetcherStats: this.dataFetcher.getUsageStats(),\n            qualityGateStats: this.qualityGate.getStats()\n        };\n    }\n    \n    /**\n     * الحصول على الإشارات النشطة\n     * @param {number} limit - عدد الإشارات المطلوبة\n     * @returns {Array} الإشارات النشطة\n     */\n    getActiveSignals(limit = 10) {\n        return this.state.activeSignals.slice(-limit).reverse();\n    }\n    \n    /**\n     * مسح الإشارات النشطة\n     */\n    clearActiveSignals() {\n        this.state.activeSignals = [];\n        console.log('تم مسح الإشارات النشطة');\n    }\n    \n    /**\n     * إضافة مستمع للأحداث\n     * @param {string} event - نوع الحدث\n     * @param {Function} callback - دالة الاستدعاء\n     */\n    on(event, callback) {\n        if (!this.eventListeners[event]) {\n            this.eventListeners[event] = [];\n        }\n        this.eventListeners[event].push(callback);\n    }\n    \n    /**\n     * إزالة مستمع للأحداث\n     * @param {string} event - نوع الحدث\n     * @param {Function} callback - دالة الاستدعاء\n     */\n    off(event, callback) {\n        if (this.eventListeners[event]) {\n            this.eventListeners[event] = this.eventListeners[event].filter(cb => cb !== callback);\n        }\n    }\n    \n    /**\n     * إرسال حدث\n     * @param {string} event - نوع الحدث\n     * @param {*} data - بيانات الحدث\n     */\n    emit(event, data) {\n        if (this.eventListeners[event]) {\n            this.eventListeners[event].forEach(callback => {\n                try {\n                    callback(data);\n                } catch (error) {\n                    console.error(`خطأ في مستمع الحدث ${event}:`, error);\n                }\n            });\n        }\n    }\n    \n    /**\n     * معالجة الأخطاء\n     * @param {string} context - سياق الخطأ\n     * @param {Error} error - الخطأ\n     */\n    handleError(context, error) {\n        const errorInfo = {\n            context: context,\n            message: error.message,\n            timestamp: new Date().toISOString(),\n            stack: error.stack\n        };\n        \n        this.state.errors.push(errorInfo);\n        \n        // الاحتفاظ بآخر 50 خطأ فقط\n        if (this.state.errors.length > 50) {\n            this.state.errors = this.state.errors.slice(-50);\n        }\n        \n        console.error(`خطأ في ${context}:`, error.message);\n        \n        this.emit('error', errorInfo);\n    }\n    \n    /**\n     * إعادة تعيين المحرك\n     */\n    reset() {\n        this.stop();\n        this.state.activeSignals = [];\n        this.state.errors = [];\n        this.state.lastAnalysis = null;\n        this.dataFetcher.clearCache();\n        this.qualityGate.resetStats();\n        \n        console.log('تم إعادة تعيين المحرك');\n    }\n}\n\n// تصدير الكلاس للاستخدام\nif (typeof module !== 'undefined' && module.exports) {\n    module.exports = SmartTradingEngine;\n} else {\n    window.SmartTradingEngine = SmartTradingEngine;\n}

