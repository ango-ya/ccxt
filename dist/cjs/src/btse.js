'use strict';

var btse$1 = require('./abstract/btse.js');
var errors = require('./base/errors.js');
var sha512 = require('./static_dependencies/noble-hashes/sha512.js');

class btse extends btse$1 {
    constructor(options = {}) {
        super(options);
    }
    describe() {
        return this.deepExtend(super.describe(), {
            'id': 'btse',
            'name': 'BTSE',
            'country': ['VG'],
            'rateLimit': 67,
            'version': 'v3.2',
            'certified': false,
            'pro': false,
            'has': {
                'CORS': undefined,
                'spot': true,
                'margin': false,
                'swap': false,
                'future': false,
                'option': false,
                'addMargin': false,
                'borrowCrossMargin': false,
                'borrowIsolatedMargin': false,
                'cancelAllOrders': false,
                'cancelOrder': true,
                'cancelOrders': false,
                'createDepositAddress': false,
                'createMarketBuyOrderWithCost': false,
                'createMarketOrderWithCost': false,
                'createMarketSellOrderWithCost': false,
                'createOrder': true,
                'createOrderWithTakeProfitAndStopLoss': false,
                'createPostOnlyOrder': false,
                'createReduceOnlyOrder': false,
                'createStopLimitOrder': false,
                'createStopMarketOrder': false,
                'createStopOrder': false,
                'createTrailingAmountOrder': false,
                'createTrailingPercentOrder': false,
                'editOrder': false,
                'fetchBalance': true,
                'fetchBidsAsks': false,
                'fetchBorrowInterest': false,
                'fetchBorrowRateHistories': false,
                'fetchBorrowRateHistory': false,
                'fetchCanceledOrders': false,
                'fetchClosedOrders': false,
                'fetchCurrencies': true,
                'fetchDepositAddress': false,
                'fetchDepositAddresses': false,
                'fetchDepositAddressesV2': false,
                'fetchDeposits': false,
                'fetchFundingHistory': false,
                'fetchFundingRate': false,
                'fetchFundingRateHistory': false,
                'fetchFundingRates': false,
                'fetchIndexOHLCV': false,
                'fetchLeverage': false,
                'fetchLeverageTiers': false,
                'fetchMarginMode': false,
                'fetchMarkets': true,
                'fetchMarkOHLCV': false,
                'fetchMyTrades': true,
                'fetchOHLCV': true,
                'fetchOpenInterest': false,
                'fetchOpenInterestHistory': false,
                'fetchOpenOrders': true,
                'fetchOrder': true,
                'fetchOrderBook': true,
                'fetchOrderBooks': false,
                'fetchOrders': false,
                'fetchOrderTrades': false,
                'fetchPosition': false,
                'fetchPositions': false,
                'fetchPositionsRisk': false,
                'fetchPremiumIndexOHLCV': false,
                'fetchStatus': false,
                'fetchTicker': true,
                'fetchTickers': false,
                'fetchTime': false,
                'fetchTrades': false,
                'fetchTradingFee': false,
                'fetchTradingFees': false,
                'fetchWithdrawals': false,
                'setLeverage': false,
                'setMarginMode': false,
                'setPositionMode': false,
                'transfer': false,
                'withdraw': false,
            },
            'timeframes': {
                '1m': '1m',
                '5m': '5m',
                '15m': '15m',
                '30m': '30m',
                '1h': '1h',
                '4h': '4h',
                '1d': '1d',
                '1w': '1w',
                '1M': '1M',
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/104117117-f2fd9500-52d9-11eb-9b88-cc9e3e8f5ad1.jpg',
                'api': {
                    'public': 'https://api.btse.com/spot',
                    'private': 'https://api.btse.com/spot',
                },
                'test': {
                    'public': 'https://testapi.btse.io/spot',
                    'private': 'https://testapi.btse.io/spot',
                },
                'www': 'https://www.btse.com',
                'doc': [
                    'https://btsecom.github.io/docs/spot/en/',
                ],
                'fees': 'https://www.btse.com/en/fees',
                'referral': 'https://www.btse.com/en/register?ref=7j1hT6Cg',
            },
            'api': {
                'public': {
                    'get': [
                        'api/v3.2/market_summary',
                        'api/v3.2/orderbook',
                        'api/v3.2/trades',
                        'api/v3.2/ohlcv',
                        'api/v3.2/market_summary/{symbol}',
                        'api/v3.2/orderbook/{symbol}',
                        'api/v3.2/trades/{symbol}',
                        'api/v3.2/ohlcv/{symbol}',
                    ],
                },
                'private': {
                    'get': [
                        'api/v3.2/user/wallet',
                        'api/v3.2/user/wallet/{symbol}',
                        'api/v3.2/user/open_orders',
                        'api/v3.2/user/orders',
                        'api/v3.2/user/order/{order_id}',
                        'api/v3.2/user/trades',
                        'api/v3.2/user/trades/{symbol}',
                    ],
                    'post': [
                        'api/v3.2/order',
                    ],
                    'delete': [
                        'api/v3.2/order',
                        'api/v3.2/order/{order_id}',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'maker': this.parseNumber('0.001'),
                    'taker': this.parseNumber('0.001'),
                },
            },
            'exceptions': {
                'exact': {},
                'broad': {},
            },
            'precisionMode': 4,
            'paddingMode': 0,
            'options': {
                'createMarketBuyOrderRequiresPrice': false,
                'fetchOrdersRequiresSymbol': false,
                'fetchMyTradesRequiresSymbol': false,
                'fetchOrderBookRequiresSymbol': false,
                'fetchTickerRequiresSymbol': false,
                'fetchTradesRequiresSymbol': false,
                'brokerId': 'CCXT',
                'partner': {
                    'id': 'CCXT',
                    'key': 'ccxt',
                },
                'networks': {
                    'BTC': 'BTC',
                    'ETH': 'ETH',
                    'LTC': 'LTC',
                    'BCH': 'BCH',
                    'EOS': 'EOS',
                    'XRP': 'XRP',
                    'TRX': 'TRX',
                    'USDT': 'USDT',
                    'USDC': 'USDC',
                },
                'partner-id': 'CCXT',
            },
            'commonCurrencies': {
                'PNT': 'Penta',
            },
            'requiredCredentials': {
                'apiKey': true,
                'secret': true,
            },
        });
    }
    async loadMarkets(reload = false, params = {}) {
        const markets = await super.loadMarkets(reload, params);
        return markets;
    }
    async fetchMarkets(params = {}) {
        const response = await this.request('api/v3.2/market_summary', 'public', 'GET', params);
        const markets = Array.isArray(response) ? response : this.safeList(response, 'data', []);
        const result = [];
        for (let i = 0; i < markets.length; i++) {
            const market = markets[i];
            const id = this.safeString(market, 'symbol');
            if (id === undefined) {
                continue;
            }
            const parts = id.split('-');
            if (parts.length !== 2) {
                continue;
            }
            const baseId = parts[0];
            const quoteId = parts[1];
            const base = this.safeCurrencyCode(baseId);
            const quote = this.safeCurrencyCode(quoteId);
            const symbol = base + '/' + quote;
            result.push({
                'id': id,
                'symbol': symbol,
                'base': base,
                'quote': quote,
                'settle': undefined,
                'baseId': baseId,
                'quoteId': quoteId,
                'settleId': undefined,
                'type': 'spot',
                'spot': true,
                'margin': false,
                'swap': false,
                'future': false,
                'option': false,
                'active': true,
                'contract': false,
                'linear': undefined,
                'inverse': undefined,
                'contractSize': undefined,
                'expiry': undefined,
                'expiryDatetime': undefined,
                'strike': undefined,
                'optionType': undefined,
                'precision': {
                    'amount': undefined,
                    'price': undefined,
                },
                'limits': {
                    'leverage': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'amount': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'price': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'cost': {
                        'min': undefined,
                        'max': undefined,
                    },
                },
                'created': undefined,
                'info': market,
            });
        }
        return result;
    }
    async fetchTicker(symbol, params = {}) {
        // シンボルを変換 (BTC/USDT -> BTC-USDT)
        const marketId = symbol.replace('/', '-');
        const request = {
            'symbol': marketId,
        };
        const response = await this.request('api/v3.2/market_summary', 'public', 'GET', request);
        const tickers = Array.isArray(response) ? response : [];
        const ticker = tickers.find((t) => this.safeString(t, 'symbol') === marketId);
        if (!ticker) {
            throw new errors.ExchangeError(this.id + ' fetchTicker symbol ' + symbol + ' not found');
        }
        return this.parseTicker(ticker, undefined);
    }
    parseTicker(ticker, market = undefined) {
        const marketId = this.safeString(ticker, 'symbol');
        // marketIdを直接シンボルに変換 (BTC-USDT -> BTC/USDT)
        const symbol = marketId ? marketId.replace('-', '/') : undefined;
        const timestamp = this.milliseconds();
        const last = this.safeString(ticker, 'last');
        const high = this.safeString(ticker, 'high24Hr');
        const low = this.safeString(ticker, 'low24Hr');
        const baseVolume = this.safeString(ticker, 'size');
        const quoteVolume = this.safeString(ticker, 'volume');
        const bid = this.safeString(ticker, 'highestBid');
        const ask = this.safeString(ticker, 'lowestAsk');
        const percentage = this.safeString(ticker, 'percentageChange');
        const open = undefined;
        const change = undefined;
        const average = undefined;
        return this.safeTicker({
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': high,
            'low': low,
            'bid': bid,
            'bidVolume': undefined,
            'ask': ask,
            'askVolume': undefined,
            'vwap': undefined,
            'open': open,
            'close': last,
            'last': last,
            'previousClose': undefined,
            'change': change,
            'percentage': percentage,
            'average': average,
            'baseVolume': baseVolume,
            'quoteVolume': quoteVolume,
            'info': ticker,
        }, market);
    }
    async fetchOrderBook(symbol, limit = undefined, params = {}) {
        // await this.loadMarkets ();
        // const market = this.market (symbol);
        const symbolId = symbol.replace('/', '-'); // BTC/USDT -> BTC-USDT
        const request = {
            'symbol': symbolId,
        };
        if (limit !== undefined) {
            request['depth'] = limit;
        }
        const response = await this.request('api/v3.2/orderbook', 'public', 'GET', request);
        const bids = (response.buyQuote || []).map((bid) => [this.safeString(bid, 'price'), this.safeString(bid, 'size')]);
        const asks = (response.sellQuote || []).map((ask) => [this.safeString(ask, 'price'), this.safeString(ask, 'size')]);
        const orderbook = {
            'bids': bids,
            'asks': asks,
            'timestamp': response.timestamp,
        };
        const timestamp = this.safeTimestamp(response, 'timestamp');
        return this.parseOrderBook(orderbook, symbol, timestamp, 'bids', 'asks');
    }
    sign(path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        let url = this.urls['api'][api] + '/' + path;
        if (api === 'public') {
            if (Object.keys(params).length) {
                url += '?' + this.urlencode(params);
            }
        }
        else {
            this.checkRequiredCredentials();
            const nonce = Date.now().toString();
            let bodyStr = '';
            if (method === 'GET' || method === 'DELETE') {
                if (Object.keys(params).length) {
                    const queryString = this.urlencode(params);
                    url += '?' + queryString;
                }
            }
            else if (method === 'POST') {
                body = this.json(params);
                bodyStr = body;
            }
            const fullPath = '/' + path;
            const content = fullPath + nonce + bodyStr;
            const signature = this.hmac(this.encode(content), this.encode(this.secret), sha512.sha384, 'hex');
            headers = {
                'request-api': this.apiKey,
                'request-nonce': nonce,
                'request-sign': signature,
                'Content-Type': 'application/json',
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }
    async fetchBalance(params = {}) {
        // await this.loadMarkets ();
        const response = await this.request('api/v3.2/user/wallet', 'private', 'GET', params);
        const result = {
            'info': response,
            'timestamp': undefined,
            'datetime': undefined,
        };
        for (let i = 0; i < response.length; i++) {
            const balance = response[i];
            const currencyId = this.safeString(balance, 'currency');
            const code = this.safeCurrencyCode(currencyId);
            const total = this.safeString(balance, 'total');
            const free = this.safeString(balance, 'available');
            const used = this.safeString(balance, 'reserved');
            result[code] = {
                'free': free,
                'used': used,
                'total': total,
            };
        }
        return this.safeBalance(result);
    }
    async createOrder(symbol, type, side, amount, price = undefined, params = {}) {
        const marketId = symbol.replace('/', '-');
        const request = {
            'symbol': marketId,
            'side': side.toUpperCase(),
            'type': type.toUpperCase(),
            'size': String(amount),
        };
        if (type === 'limit') {
            if (price === undefined) {
                throw new errors.ExchangeError(this.id + ' createOrder() requires a price argument for limit orders');
            }
            request['price'] = String(price);
        }
        const response = await this.request('api/v3.2/order', 'private', 'POST', request);
        const orderData = Array.isArray(response) ? response[0] : response;
        return this.parseOrder(orderData, undefined);
    }
    async cancelOrder(id, symbol = undefined, params = {}) {
        if (symbol === undefined) {
            throw new errors.ExchangeError(this.id + ' cancelOrder() requires a symbol argument');
        }
        const request = {
            'orderID': id,
            'symbol': symbol.replace('/', '-'),
            ...params,
        };
        const response = await this.request('api/v3.2/order', 'private', 'DELETE', request);
        const orderData = Array.isArray(response) ? response[0] : response;
        return this.parseOrder(orderData, undefined);
    }
    async fetchOrder(id, symbol = undefined, params = {}) {
        const request = {
            'orderID': id,
        };
        const response = await this.request('api/v3.2/order', 'private', 'GET', request);
        return this.parseOrder(response, undefined);
    }
    async fetchOpenOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        const request = {};
        if (symbol !== undefined) {
            const marketId = symbol.replace('/', '-');
            request['symbol'] = marketId;
        }
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        const response = await this.request('api/v3.2/user/open_orders', 'private', 'GET', request);
        const orders = Array.isArray(response) ? response : [];
        return this.parseOrders(orders, undefined, since, limit);
    }
    async fetchMyTrades(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        const request = {};
        if (symbol !== undefined) {
            const marketId = symbol.replace('/', '-');
            request['symbol'] = marketId;
        }
        if (limit !== undefined) {
            request['count'] = limit;
        }
        const response = await this.request('api/v3.2/user/trade_history', 'private', 'GET', request);
        const trades = Array.isArray(response) ? response : [];
        return this.parseTrades(trades, undefined, since, limit);
    }
    async fetchOHLCV(symbol, timeframe = '1m', since = undefined, limit = undefined, params = {}) {
        const marketId = symbol.replace('/', '-');
        const request = {
            'symbol': marketId,
            'resolution': this.timeframes[timeframe],
        };
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        const response = await this.request('api/v3.2/ohlcv', 'public', 'GET', request);
        const ohlcvs = Array.isArray(response) ? response : [];
        return this.parseOHLCVs(ohlcvs, undefined, timeframe, since, limit);
    }
    async fetchCurrencies(params = {}) {
        const markets = await this.fetchMarkets(params);
        const currencies = {};
        for (let i = 0; i < markets.length; i++) {
            const market = markets[i];
            const baseId = market['baseId'];
            const quoteId = market['quoteId'];
            const base = market['base'];
            const quote = market['quote'];
            if (!(base in currencies)) {
                currencies[base] = {
                    'id': baseId,
                    'code': base,
                    'name': base,
                    'active': true,
                    'deposit': undefined,
                    'withdraw': undefined,
                    'fee': undefined,
                    'precision': undefined,
                    'limits': {
                        'amount': {
                            'min': undefined,
                            'max': undefined,
                        },
                        'withdraw': {
                            'min': undefined,
                            'max': undefined,
                        },
                    },
                    'networks': {},
                    'info': undefined,
                };
            }
            if (!(quote in currencies)) {
                currencies[quote] = {
                    'id': quoteId,
                    'code': quote,
                    'name': quote,
                    'active': true,
                    'deposit': undefined,
                    'withdraw': undefined,
                    'fee': undefined,
                    'precision': undefined,
                    'limits': {
                        'amount': {
                            'min': undefined,
                            'max': undefined,
                        },
                        'withdraw': {
                            'min': undefined,
                            'max': undefined,
                        },
                    },
                    'networks': {},
                    'info': undefined,
                };
            }
        }
        return currencies;
    }
    parseOrder(order, market = undefined) {
        const id = this.safeString(order, 'orderID');
        const marketId = this.safeString(order, 'symbol');
        const symbol = marketId ? marketId.replace('-', '/') : undefined;
        const side = this.safeStringLower(order, 'side');
        const orderType = this.safeInteger(order, 'orderType');
        const type = this.parseOrderType(orderType) || this.safeStringLower(order, 'type');
        const amount = this.safeString(order, 'size');
        const price = this.safeString(order, 'price');
        const filled = this.safeString(order, 'filledSize');
        const remaining = this.safeString(order, 'remainingSize');
        const averageFillPrice = this.safeString(order, 'averageFillPrice');
        const average = (averageFillPrice && averageFillPrice !== '0') ? averageFillPrice : undefined;
        const statusCode = this.safeInteger(order, 'status');
        const orderState = this.safeString(order, 'orderState');
        const status = statusCode ? this.parseOrderStatusCode(statusCode) : this.parseOrderStatus(orderState);
        const timestamp = this.safeTimestamp(order, 'timestamp');
        const fee = undefined;
        return this.safeOrder({
            'id': id,
            'clientOrderId': this.safeString(order, 'clOrderID'),
            'datetime': this.iso8601(timestamp),
            'timestamp': timestamp,
            'lastTradeTimestamp': undefined,
            'symbol': symbol,
            'type': type,
            'timeInForce': undefined,
            'postOnly': undefined,
            'side': side,
            'amount': amount,
            'price': price,
            'stopPrice': undefined,
            'triggerPrice': undefined,
            'cost': undefined,
            'average': average,
            'filled': filled,
            'remaining': remaining,
            'status': status,
            'fee': fee,
            'trades': undefined,
            'info': order,
        }, market);
    }
    parseOrderStatus(status) {
        const statuses = {
            'PENDING': 'open',
            'PARTIAL_FILL': 'open',
            'FILLED': 'closed',
            'CANCELLED': 'canceled',
            'REJECTED': 'rejected',
            'STATUS_ACTIVE': 'open',
            'STATUS_INACTIVE': 'canceled',
        };
        return this.safeString(statuses, status, status);
    }
    parseOrderStatusCode(statusCode) {
        const statuses = {
            '2': 'open',
            '4': 'closed',
            '5': 'open',
            '6': 'canceled',
            '8': 'rejected',
            '9': 'open',
            '10': 'open',
            '15': 'rejected',
            '16': 'rejected',
            '17': 'rejected', // Failed to complete the request
        };
        return this.safeString(statuses, statusCode.toString(), 'open');
    }
    parseOrderType(orderType) {
        const orderTypes = {
            '76': 'limit',
            '77': 'market',
            '80': 'limit', // Peg/Algo order (treated as limit)
        };
        return this.safeString(orderTypes, orderType.toString());
    }
    parseTrade(trade, market = undefined) {
        const id = this.safeString(trade, 'tradeId');
        const orderId = this.safeString(trade, 'orderId');
        const marketId = this.safeString(trade, 'symbol');
        const symbol = marketId ? marketId.replace('-', '/') : undefined;
        const side = this.safeStringLower(trade, 'side');
        const orderType = this.safeInteger(trade, 'orderType');
        const type = this.parseOrderType(orderType) || this.safeStringLower(trade, 'type');
        const amount = this.safeString(trade, 'size');
        const price = this.safeString(trade, 'price');
        const cost = this.safeString(trade, 'quoteAmount');
        const timestamp = this.safeTimestamp(trade, 'timestamp');
        const feeCost = this.safeString(trade, 'feeAmount');
        const feeCurrency = this.safeString(trade, 'feeCurrency');
        const fee = {
            'cost': feeCost,
            'currency': feeCurrency,
        };
        return this.safeTrade({
            'id': id,
            'order': orderId,
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'type': type,
            'side': side,
            'amount': amount,
            'price': price,
            'cost': cost,
            'fee': fee,
        }, market);
    }
    parseOHLCV(ohlcv, market = undefined) {
        return [
            this.safeTimestamp(ohlcv, 0),
            this.safeNumber(ohlcv, 1),
            this.safeNumber(ohlcv, 2),
            this.safeNumber(ohlcv, 3),
            this.safeNumber(ohlcv, 4),
            this.safeNumber(ohlcv, 5),
        ];
    }
    handleErrors(code, reason, url, method, headers, body, response, requestHeaders, requestBody) {
        if (response === undefined) {
            return undefined;
        }
        if (code >= 400) {
            let message = reason || 'Unknown error';
            if (response && typeof response === 'object') {
                message = this.safeString(response, 'message', this.safeString(response, 'error', message));
            }
            // Handle 404 errors for order-related endpoints
            if (code === 404 && (url.includes('/order') || url.includes('/user/order'))) {
                throw new errors.OrderNotFound(this.id + ' order not found: ' + message);
            }
            throw new errors.ExchangeError(this.id + ' ' + message);
        }
        const success = this.safeValue(response, 'success');
        if (success !== undefined && !success) {
            const message = this.safeString(response, 'message', 'Unknown error');
            const errorCode = this.safeString(response, 'code');
            this.throwExactlyMatchedException(this.exceptions['exact'], errorCode, message);
            this.throwBroadlyMatchedException(this.exceptions['broad'], message, message);
            throw new errors.ExchangeError(this.id + ' ' + message);
        }
        return undefined;
    }
}

module.exports = btse;
