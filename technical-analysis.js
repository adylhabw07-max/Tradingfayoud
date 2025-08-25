/**
 * وحدة التحليل الفني - Technical Analysis Module
 * تحتوي على جميع المؤشرات الفنية المطلوبة للتحليل
 */

class TechnicalAnalysis {
    constructor() {
        this.indicators = {};
    }
    
    /**
     * حساب المتوسط المتحرك البسيط (SMA)
     * @param {Array} data - مصفوفة الأسعار
     * @param {number} period - فترة المتوسط
     * @returns {Array} قيم المتوسط المتحرك
     */
    calculateSMA(data, period) {
        if (!data || data.length < period) return [];
        
        const sma = [];
        for (let i = period - 1; i < data.length; i++) {
            const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
            sma.push(sum / period);
        }
        return sma;
    }
    
    /**
     * حساب المتوسط المتحرك الأسي (EMA)
     * @param {Array} data - مصفوفة الأسعار
     * @param {number} period - فترة المتوسط
     * @returns {Array} قيم المتوسط المتحرك الأسي
     */
    calculateEMA(data, period) {
        if (!data || data.length < period) return [];
        
        const ema = [];
        const multiplier = 2 / (period + 1);
        
        // البداية بـ SMA للقيمة الأولى
        const smaFirst = data.slice(0, period).reduce((a, b) => a + b, 0) / period;
        ema.push(smaFirst);
        
        // حساب باقي قيم EMA
        for (let i = period; i < data.length; i++) {
            const emaValue = (data[i] * multiplier) + (ema[ema.length - 1] * (1 - multiplier));
            ema.push(emaValue);
        }
        
        return ema;
    }
    
    /**
     * حساب مؤشر القوة النسبية (RSI)
     * @param {Array} prices - مصفوفة أسعار الإغلاق
     * @param {number} period - فترة RSI (افتراضي: 14)
     * @returns {Array} قيم RSI
     */
    calculateRSI(prices, period = 14) {
        if (!prices || prices.length < period + 1) return [];
        
        const gains = [];
        const losses = [];
        
        // حساب المكاسب والخسائر
        for (let i = 1; i < prices.length; i++) {
            const change = prices[i] - prices[i - 1];
            gains.push(change > 0 ? change : 0);
            losses.push(change < 0 ? Math.abs(change) : 0);
        }
        
        const rsi = [];
        
        // حساب أول قيمة RSI باستخدام المتوسط البسيط
        const avgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period;
        const avgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period;
        
        if (avgLoss === 0) {
            rsi.push(100);
        } else {
            const rs = avgGain / avgLoss;
            rsi.push(100 - (100 / (1 + rs)));
        }
        
        // حساب باقي قيم RSI باستخدام المتوسط المتحرك الأسي
        let smoothedGain = avgGain;
        let smoothedLoss = avgLoss;
        
        for (let i = period; i < gains.length; i++) {
            smoothedGain = ((smoothedGain * (period - 1)) + gains[i]) / period;
            smoothedLoss = ((smoothedLoss * (period - 1)) + losses[i]) / period;
            
            if (smoothedLoss === 0) {
                rsi.push(100);
            } else {
                const rs = smoothedGain / smoothedLoss;
                rsi.push(100 - (100 / (1 + rs)));
            }
        }
        
        return rsi;
    }
    
    /**
     * حساب مؤشر MACD
     * @param {Array} prices - مصفوفة أسعار الإغلاق
     * @param {number} fastPeriod - فترة EMA السريع (افتراضي: 12)
     * @param {number} slowPeriod - فترة EMA البطيء (افتراضي: 26)
     * @param {number} signalPeriod - فترة خط الإشارة (افتراضي: 9)
     * @returns {Object} كائن يحتوي على MACD Line, Signal Line, Histogram
     */
    calculateMACD(prices, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) {
        if (!prices || prices.length < slowPeriod) {
            return { macdLine: [], signalLine: [], histogram: [] };
        }
        
        const fastEMA = this.calculateEMA(prices, fastPeriod);
        const slowEMA = this.calculateEMA(prices, slowPeriod);
        
        // حساب MACD Line
        const macdLine = [];
        const startIndex = slowPeriod - fastPeriod;
        
        for (let i = 0; i < slowEMA.length; i++) {
            macdLine.push(fastEMA[i + startIndex] - slowEMA[i]);
        }
        
        // حساب Signal Line
        const signalLine = this.calculateEMA(macdLine, signalPeriod);
        
        // حساب Histogram
        const histogram = [];
        const signalStartIndex = macdLine.length - signalLine.length;
        
        for (let i = 0; i < signalLine.length; i++) {
            histogram.push(macdLine[i + signalStartIndex] - signalLine[i]);
        }
        
        return {
            macdLine: macdLine,
            signalLine: signalLine,
            histogram: histogram
        };
    }
    
    /**
     * حساب Bollinger Bands
     * @param {Array} prices - مصفوفة أسعار الإغلاق
     * @param {number} period - فترة المتوسط (افتراضي: 20)
     * @param {number} stdDev - عدد الانحرافات المعيارية (افتراضي: 2)
     * @returns {Object} كائن يحتوي على Upper Band, Middle Band (SMA), Lower Band
     */
    calculateBollingerBands(prices, period = 20, stdDev = 2) {
        if (!prices || prices.length < period) {
            return { upperBand: [], middleBand: [], lowerBand: [] };
        }
        
        const middleBand = this.calculateSMA(prices, period);
        const upperBand = [];
        const lowerBand = [];
        
        for (let i = period - 1; i < prices.length; i++) {
            const slice = prices.slice(i - period + 1, i + 1);
            const mean = slice.reduce((a, b) => a + b, 0) / period;
            
            // حساب الانحراف المعياري
            const variance = slice.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / period;
            const standardDeviation = Math.sqrt(variance);
            
            const middleValue = middleBand[i - period + 1];
            upperBand.push(middleValue + (stdDev * standardDeviation));
            lowerBand.push(middleValue - (stdDev * standardDeviation));
        }
        
        return {
            upperBand: upperBand,
            middleBand: middleBand,
            lowerBand: lowerBand
        };
    }
    
    /**
     * حساب Average True Range (ATR)
     * @param {Array} candles - مصفوفة الشموع (high, low, close)
     * @param {number} period - فترة ATR (افتراضي: 14)
     * @returns {Array} قيم ATR
     */
    calculateATR(candles, period = 14) {
        if (!candles || candles.length < period + 1) return [];
        
        const trueRanges = [];
        
        // حساب True Range لكل شمعة
        for (let i = 1; i < candles.length; i++) {
            const current = candles[i];
            const previous = candles[i - 1];
            
            const tr1 = current.high - current.low;
            const tr2 = Math.abs(current.high - previous.close);
            const tr3 = Math.abs(current.low - previous.close);
            
            trueRanges.push(Math.max(tr1, tr2, tr3));
        }
        
        // حساب ATR باستخدام المتوسط المتحرك الأسي
        return this.calculateEMA(trueRanges, period);
    }
    
    /**
     * حساب Stochastic Oscillator
     * @param {Array} candles - مصفوفة الشموع (high, low, close)
     * @param {number} kPeriod - فترة %K (افتراضي: 14)
     * @param {number} dPeriod - فترة %D (افتراضي: 3)
     * @returns {Object} كائن يحتوي على %K و %D
     */
    calculateStochastic(candles, kPeriod = 14, dPeriod = 3) {
        if (!candles || candles.length < kPeriod) {
            return { percentK: [], percentD: [] };
        }
        
        const percentK = [];
        
        // حساب %K
        for (let i = kPeriod - 1; i < candles.length; i++) {
            const slice = candles.slice(i - kPeriod + 1, i + 1);
            const highestHigh = Math.max(...slice.map(c => c.high));
            const lowestLow = Math.min(...slice.map(c => c.low));
            const currentClose = candles[i].close;
            
            if (highestHigh === lowestLow) {
                percentK.push(50); // تجنب القسمة على صفر
            } else {
                const k = ((currentClose - lowestLow) / (highestHigh - lowestLow)) * 100;
                percentK.push(k);
            }
        }
        
        // حساب %D (متوسط متحرك بسيط لـ %K)
        const percentD = this.calculateSMA(percentK, dPeriod);
        
        return {
            percentK: percentK,
            percentD: percentD
        };
    }
    
    /**
     * تحليل شامل للبيانات
     * @param {Array} candles - مصفوفة الشموع
     * @returns {Object} كائن يحتوي على جميع المؤشرات
     */
    analyzeData(candles) {
        if (!candles || candles.length < 50) {
            throw new Error('البيانات غير كافية للتحليل (مطلوب على الأقل 50 شمعة)');
        }
        
        const closePrices = candles.map(c => c.close);
        const highPrices = candles.map(c => c.high);
        const lowPrices = candles.map(c => c.low);
        
        const analysis = {
            // المتوسطات المتحركة
            sma20: this.calculateSMA(closePrices, 20),
            sma50: this.calculateSMA(closePrices, 50),
            ema12: this.calculateEMA(closePrices, 12),
            ema26: this.calculateEMA(closePrices, 26),
            ema50: this.calculateEMA(closePrices, 50),
            ema200: this.calculateEMA(closePrices, 200),
            
            // مؤشرات الزخم
            rsi: this.calculateRSI(closePrices, 14),
            macd: this.calculateMACD(closePrices, 12, 26, 9),
            stochastic: this.calculateStochastic(candles, 14, 3),
            
            // مؤشرات التذبذب
            bollingerBands: this.calculateBollingerBands(closePrices, 20, 2),
            atr: this.calculateATR(candles, 14),
            
            // بيانات أساسية
            currentPrice: closePrices[closePrices.length - 1],
            previousPrice: closePrices[closePrices.length - 2],
            priceChange: closePrices[closePrices.length - 1] - closePrices[closePrices.length - 2],
            priceChangePercent: ((closePrices[closePrices.length - 1] - closePrices[closePrices.length - 2]) / closePrices[closePrices.length - 2]) * 100,
            
            // إحصائيات
            highestPrice: Math.max(...highPrices),
            lowestPrice: Math.min(...lowPrices),
            averageVolume: candles.reduce((sum, c) => sum + (c.volume || 0), 0) / candles.length,
            
            // طابع زمني
            timestamp: new Date().toISOString(),
            dataPoints: candles.length
        };
        
        return analysis;
    }
    
    /**
     * الحصول على آخر قيم المؤشرات
     * @param {Object} analysis - نتائج التحليل
     * @returns {Object} آخر قيم المؤشرات
     */
    getLatestIndicators(analysis) {
        const getLastValue = (arr) => arr && arr.length > 0 ? arr[arr.length - 1] : null;
        
        return {
            price: analysis.currentPrice,
            priceChange: analysis.priceChange,
            priceChangePercent: analysis.priceChangePercent,
            
            // المتوسطات المتحركة
            sma20: getLastValue(analysis.sma20),
            sma50: getLastValue(analysis.sma50),
            ema12: getLastValue(analysis.ema12),
            ema26: getLastValue(analysis.ema26),
            ema50: getLastValue(analysis.ema50),
            ema200: getLastValue(analysis.ema200),
            
            // مؤشرات الزخم
            rsi: getLastValue(analysis.rsi),
            macdLine: getLastValue(analysis.macd.macdLine),
            macdSignal: getLastValue(analysis.macd.signalLine),
            macdHistogram: getLastValue(analysis.macd.histogram),
            stochasticK: getLastValue(analysis.stochastic.percentK),
            stochasticD: getLastValue(analysis.stochastic.percentD),
            
            // Bollinger Bands
            bbUpper: getLastValue(analysis.bollingerBands.upperBand),
            bbMiddle: getLastValue(analysis.bollingerBands.middleBand),
            bbLower: getLastValue(analysis.bollingerBands.lowerBand),
            
            // ATR
            atr: getLastValue(analysis.atr),
            
            timestamp: analysis.timestamp
        };
    }
    
    /**
     * تحديد الاتجاه العام للسوق
     * @param {Object} indicators - المؤشرات الحالية
     * @returns {string} الاتجاه (bullish, bearish, sideways)
     */
    determineTrend(indicators) {
        let bullishSignals = 0;
        let bearishSignals = 0;
        
        // تحليل المتوسطات المتحركة
        if (indicators.price > indicators.ema50) bullishSignals++;
        else bearishSignals++;
        
        if (indicators.ema12 > indicators.ema26) bullishSignals++;
        else bearishSignals++;
        
        if (indicators.sma20 > indicators.sma50) bullishSignals++;
        else bearishSignals++;
        
        // تحليل MACD
        if (indicators.macdLine > indicators.macdSignal) bullishSignals++;
        else bearishSignals++;
        
        if (indicators.macdHistogram > 0) bullishSignals++;
        else bearishSignals++;
        
        // تحليل RSI
        if (indicators.rsi > 50) bullishSignals++;
        else bearishSignals++;
        
        // تحديد الاتجاه
        if (bullishSignals > bearishSignals + 1) return 'bullish';
        if (bearishSignals > bullishSignals + 1) return 'bearish';
        return 'sideways';
    }
    
    /**
     * تحديد قوة الإشارة
     * @param {Object} indicators - المؤشرات الحالية
     * @returns {number} قوة الإشارة من 0 إلى 100
     */
    calculateSignalStrength(indicators) {
        let strength = 0;
        let maxStrength = 0;
        
        // قوة RSI
        maxStrength += 20;
        if (indicators.rsi > 70 || indicators.rsi < 30) {
            strength += 20; // إشارة قوية في منطقة التشبع
        } else if (indicators.rsi > 60 || indicators.rsi < 40) {
            strength += 10; // إشارة متوسطة
        }
        
        // قوة MACD
        maxStrength += 20;
        if (Math.abs(indicators.macdHistogram) > 0.001) {
            strength += 20;
        } else if (Math.abs(indicators.macdHistogram) > 0.0005) {
            strength += 10;
        }
        
        // قوة المتوسطات المتحركة
        maxStrength += 20;
        const emaDistance = Math.abs(indicators.ema12 - indicators.ema26) / indicators.price;
        if (emaDistance > 0.002) {
            strength += 20;
        } else if (emaDistance > 0.001) {
            strength += 10;
        }
        
        // قوة Stochastic
        maxStrength += 20;
        if (indicators.stochasticK > 80 || indicators.stochasticK < 20) {
            strength += 20;
        } else if (indicators.stochasticK > 70 || indicators.stochasticK < 30) {
            strength += 10;
        }
        
        // قوة ATR (التذبذب)
        maxStrength += 20;
        const atrPercent = (indicators.atr / indicators.price) * 100;
        if (atrPercent > 0.5) {
            strength += 20; // تذبذب عالي = إشارة قوية
        } else if (atrPercent > 0.3) {
            strength += 10;
        }
        
        return Math.round((strength / maxStrength) * 100);
    }
}

// تصدير الكلاس للاستخدام
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TechnicalAnalysis;
} else {
    window.TechnicalAnalysis = TechnicalAnalysis;
}

