/**
 * وحدة جلب البيانات المالية من مصادر متعددة مع دعم البروكسي
 * Data Fetcher Module with Multi-Source Support and Proxy Integration
 */

class DataFetcher {
    constructor() {
        // خدمات البروكسي المتاحة
        this.proxyServices = [
            'https://api.allorigins.win/get?url=',
            'https://corsproxy.io/?',
            'https://cors-anywhere.herokuapp.com/'
        ];
        
        // مفاتيح API (يجب استبدالها بمفاتيح حقيقية)
        this.apiKeys = {
            twelveData: 'demo', // استخدم مفتاح حقيقي
            alphaVantage: 'demo', // استخدم مفتاح حقيقي
            polygon: 'demo', // استخدم مفتاح حقيقي
            finnhub: 'demo' // استخدم مفتاح حقيقي
        };
        
        // مصادر البيانات مرتبة حسب الأولوية
        this.dataSources = {
            forex: [
                {
                    name: 'TwelveData',
                    baseUrl: 'https://api.twelvedata.com',
                    rateLimit: 800, // طلبات يومية
                    priority: 1
                },
                {
                    name: 'AlphaVantage',
                    baseUrl: 'https://www.alphavantage.co/query',
                    rateLimit: 500,
                    priority: 2
                },
                {
                    name: 'Finnhub',
                    baseUrl: 'https://finnhub.io/api/v1',
                    rateLimit: 60,
                    priority: 3
                }
            ],
            crypto: [
                {
                    name: 'CoinGecko',
                    baseUrl: 'https://api.coingecko.com/api/v3',
                    rateLimit: 100,
                    priority: 1
                },
                {
                    name: 'TwelveData',
                    baseUrl: 'https://api.twelvedata.com',
                    rateLimit: 800,
                    priority: 2
                }
            ]
        };
        
        // تخزين مؤقت للبيانات
        this.cache = new Map();
        this.cacheTimeout = 60000; // 60 ثانية
        
        // إحصائيات الاستخدام
        this.usageStats = {
            requests: 0,
            successfulRequests: 0,
            failedRequests: 0,
            cacheHits: 0
        };
    }
    
    /**
     * جلب البيانات التاريخية لزوج عملات معين
     * @param {string} symbol - رمز الزوج (مثل EUR/USD)
     * @param {string} interval - الفترة الزمنية (1min, 5min, 15min, 1h, 4h, 1day)
     * @param {number} outputsize - عدد النقاط المطلوبة (افتراضي: 100)
     * @returns {Promise<Object>} البيانات التاريخية
     */
    async fetchHistoricalData(symbol, interval = '5min', outputsize = 100) {
        const cacheKey = `${symbol}_${interval}_${outputsize}`;
        
        // التحقق من التخزين المؤقت
        if (this.isCacheValid(cacheKey)) {
            this.usageStats.cacheHits++;
            console.log(`استخدام البيانات المخزنة مؤقتاً لـ ${symbol}`);
            return this.cache.get(cacheKey).data;
        }
        
        // تحديد نوع الأصل
        const assetType = this.determineAssetType(symbol);
        const sources = this.dataSources[assetType] || this.dataSources.forex;
        
        // محاولة جلب البيانات من المصادر المختلفة
        for (const source of sources) {
            try {
                console.log(`محاولة جلب البيانات من ${source.name} لـ ${symbol}`);
                const data = await this.fetchFromSource(source, symbol, interval, outputsize);
                
                if (data && this.validateData(data)) {
                    // تخزين البيانات في التخزين المؤقت
                    this.cache.set(cacheKey, {
                        data: data,
                        timestamp: Date.now()
                    });
                    
                    this.usageStats.successfulRequests++;
                    console.log(`تم جلب البيانات بنجاح من ${source.name}`);
                    return data;
                }
            } catch (error) {
                console.warn(`فشل في جلب البيانات من ${source.name}:`, error.message);
                continue;
            }
        }
        
        this.usageStats.failedRequests++;
        
        // محاولة استخدام البيانات المخزنة محلياً (حتى لو كانت قديمة)
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            console.warn(`استخدام البيانات المخزنة القديمة لـ ${symbol}`);
            return cachedData.data;
        }
        
        throw new Error(`فشل في جلب البيانات لـ ${symbol} من جميع المصادر`);
    }
    
    /**
     * جلب البيانات من مصدر محدد
     * @param {Object} source - مصدر البيانات
     * @param {string} symbol - رمز الزوج
     * @param {string} interval - الفترة الزمنية
     * @param {number} outputsize - عدد النقاط
     * @returns {Promise<Object>} البيانات
     */
    async fetchFromSource(source, symbol, interval, outputsize) {
        let url;
        
        switch (source.name) {
            case 'TwelveData':
                url = `${source.baseUrl}/time_series?symbol=${symbol}&interval=${interval}&outputsize=${outputsize}&apikey=${this.apiKeys.twelveData}`;
                break;
                
            case 'AlphaVantage':
                const avFunction = this.getAlphaVantageFunction(interval);
                url = `${source.baseUrl}?function=${avFunction}&symbol=${symbol}&apikey=${this.apiKeys.alphaVantage}`;
                break;
                
            case 'Finnhub':
                // Finnhub يستخدم timestamps
                const to = Math.floor(Date.now() / 1000);
                const from = to - (outputsize * this.getIntervalSeconds(interval));
                url = `${source.baseUrl}/forex/candle?symbol=${symbol}&resolution=${this.getFinnhubResolution(interval)}&from=${from}&to=${to}&token=${this.apiKeys.finnhub}`;
                break;
                
            case 'CoinGecko':
                // CoinGecko للعملات المشفرة
                const coinId = this.getCoinGeckoId(symbol);
                url = `${source.baseUrl}/coins/${coinId}/market_chart?vs_currency=usd&days=30`;
                break;
                
            default:
                throw new Error(`مصدر غير مدعوم: ${source.name}`);
        }
        
        this.usageStats.requests++;
        
        // محاولة استخدام البروكسي
        for (const proxy of this.proxyServices) {
            try {
                const proxyUrl = proxy + encodeURIComponent(url);
                const response = await fetch(proxyUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000 // 10 ثواني
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                let data = await response.json();
                
                // معالجة استجابة البروكسي
                if (data.contents) {
                    data = JSON.parse(data.contents);
                }
                
                return this.normalizeData(data, source.name);
                
            } catch (error) {
                console.warn(`فشل البروكسي ${proxy}:`, error.message);
                continue;
            }
        }
        
        throw new Error('فشل في جميع خدمات البروكسي');
    }
    
    /**
     * تحديد نوع الأصل بناءً على الرمز
     * @param {string} symbol - رمز الزوج
     * @returns {string} نوع الأصل
     */
    determineAssetType(symbol) {
        const cryptoSymbols = ['BTC', 'ETH', 'LTC', 'XRP', 'ADA', 'DOT'];
        const forexSymbols = ['EUR', 'USD', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'NZD'];
        
        if (cryptoSymbols.some(crypto => symbol.includes(crypto))) {
            return 'crypto';
        }
        
        if (forexSymbols.some(forex => symbol.includes(forex))) {
            return 'forex';
        }
        
        return 'forex'; // افتراضي
    }
    
    /**
     * التحقق من صحة البيانات
     * @param {Object} data - البيانات المستلمة
     * @returns {boolean} صحة البيانات
     */
    validateData(data) {
        if (!data || typeof data !== 'object') {
            return false;
        }
        
        // التحقق من وجود البيانات الأساسية
        if (data.values && Array.isArray(data.values) && data.values.length > 0) {
            return true;
        }
        
        if (data.candles && Array.isArray(data.candles) && data.candles.length > 0) {
            return true;
        }
        
        if (data['Time Series (5min)'] || data['Time Series (Daily)']) {
            return true;
        }
        
        return false;
    }
    
    /**
     * توحيد تنسيق البيانات من مصادر مختلفة
     * @param {Object} data - البيانات الخام
     * @param {string} sourceName - اسم المصدر
     * @returns {Object} البيانات الموحدة
     */
    normalizeData(data, sourceName) {
        const normalized = {
            source: sourceName,
            symbol: data.meta?.symbol || 'Unknown',
            interval: data.meta?.interval || 'Unknown',
            values: []
        };
        
        switch (sourceName) {
            case 'TwelveData':
                if (data.values) {
                    normalized.values = data.values.map(item => ({
                        datetime: item.datetime,
                        open: parseFloat(item.open),
                        high: parseFloat(item.high),
                        low: parseFloat(item.low),
                        close: parseFloat(item.close),
                        volume: parseInt(item.volume) || 0
                    }));
                }
                break;
                
            case 'AlphaVantage':
                const timeSeries = data['Time Series (5min)'] || data['Time Series (Daily)'];
                if (timeSeries) {
                    normalized.values = Object.entries(timeSeries).map(([datetime, values]) => ({
                        datetime: datetime,
                        open: parseFloat(values['1. open']),
                        high: parseFloat(values['2. high']),
                        low: parseFloat(values['3. low']),
                        close: parseFloat(values['4. close']),
                        volume: parseInt(values['5. volume']) || 0
                    }));
                }
                break;
                
            case 'Finnhub':
                if (data.c && data.o && data.h && data.l && data.t) {
                    for (let i = 0; i < data.c.length; i++) {
                        normalized.values.push({
                            datetime: new Date(data.t[i] * 1000).toISOString(),
                            open: data.o[i],
                            high: data.h[i],
                            low: data.l[i],
                            close: data.c[i],
                            volume: data.v ? data.v[i] : 0
                        });
                    }
                }
                break;
        }
        
        // ترتيب البيانات حسب التاريخ (الأحدث أولاً)
        normalized.values.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
        
        return normalized;
    }
    
    /**
     * التحقق من صحة التخزين المؤقت
     * @param {string} key - مفتاح التخزين المؤقت
     * @returns {boolean} صحة التخزين المؤقت
     */
    isCacheValid(key) {
        const cached = this.cache.get(key);
        if (!cached) return false;
        
        return (Date.now() - cached.timestamp) < this.cacheTimeout;
    }
    
    /**
     * الحصول على دالة Alpha Vantage المناسبة
     * @param {string} interval - الفترة الزمنية
     * @returns {string} اسم الدالة
     */
    getAlphaVantageFunction(interval) {
        const intervalMap = {
            '1min': 'FX_INTRADAY',
            '5min': 'FX_INTRADAY',
            '15min': 'FX_INTRADAY',
            '30min': 'FX_INTRADAY',
            '60min': 'FX_INTRADAY',
            '1day': 'FX_DAILY'
        };
        
        return intervalMap[interval] || 'FX_INTRADAY';
    }
    
    /**
     * الحصول على دقة Finnhub المناسبة
     * @param {string} interval - الفترة الزمنية
     * @returns {string} دقة Finnhub
     */
    getFinnhubResolution(interval) {
        const resolutionMap = {
            '1min': '1',
            '5min': '5',
            '15min': '15',
            '30min': '30',
            '60min': '60',
            '1day': 'D'
        };
        
        return resolutionMap[interval] || '5';
    }
    
    /**
     * الحصول على عدد الثواني للفترة الزمنية
     * @param {string} interval - الفترة الزمنية
     * @returns {number} عدد الثواني
     */
    getIntervalSeconds(interval) {
        const secondsMap = {
            '1min': 60,
            '5min': 300,
            '15min': 900,
            '30min': 1800,
            '60min': 3600,
            '1day': 86400
        };
        
        return secondsMap[interval] || 300;
    }
    
    /**
     * الحصول على معرف CoinGecko للعملة المشفرة
     * @param {string} symbol - رمز العملة
     * @returns {string} معرف CoinGecko
     */
    getCoinGeckoId(symbol) {
        const coinMap = {
            'BTC': 'bitcoin',
            'ETH': 'ethereum',
            'LTC': 'litecoin',
            'XRP': 'ripple',
            'ADA': 'cardano',
            'DOT': 'polkadot'
        };
        
        const baseCurrency = symbol.split('/')[0] || symbol.substring(0, 3);
        return coinMap[baseCurrency] || 'bitcoin';
    }
    
    /**
     * الحصول على إحصائيات الاستخدام
     * @returns {Object} إحصائيات الاستخدام
     */
    getUsageStats() {
        return {
            ...this.usageStats,
            successRate: this.usageStats.requests > 0 ? 
                (this.usageStats.successfulRequests / this.usageStats.requests * 100).toFixed(2) + '%' : '0%',
            cacheHitRate: this.usageStats.requests > 0 ? 
                (this.usageStats.cacheHits / this.usageStats.requests * 100).toFixed(2) + '%' : '0%'
        };
    }
    
    /**
     * مسح التخزين المؤقت
     */
    clearCache() {
        this.cache.clear();
        console.log('تم مسح التخزين المؤقت');
    }
    
    /**
     * تحديث مفاتيح API
     * @param {Object} newKeys - مفاتيح API الجديدة
     */
    updateApiKeys(newKeys) {
        this.apiKeys = { ...this.apiKeys, ...newKeys };
        console.log('تم تحديث مفاتيح API');
    }
}

// تصدير الكلاس للاستخدام
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataFetcher;
} else {
    window.DataFetcher = DataFetcher;
}

