'use strict';

//  ---------------------------------------------------------------------------

const Exchange = require ('./base/Exchange');
const { ExchangeError, AuthenticationError, InvalidNonce, InsufficientFunds, InvalidOrder, OrderNotFound, PermissionDenied } = require ('./base/errors');

//  ---------------------------------------------------------------------------

module.exports = class adambitred extends Exchange {
    describe () {
        return this.deepExtend (super.describe (), {
            'id': 'adambitred',
            'name': 'adambit-red',
            'countries': [ 'JP' ],
            'version': 'v1',
            'has': {
                'cancelOrder': true,
                'createOrder': true,
                'fetchBalance': true,
                'fetchDepositAddress': true,
                'fetchMyTrades': false,
                'fetchOHLCV': false,
                'fetchOpenOrders': true,
                'fetchOrder': true,
                'fetchOrderBook': true,
                'fetchTicker': true,
                'fetchTrades': true,
                'withdraw': true,
            },
            'timeframes': {
                '1m': '1min',
                '5m': '5min',
                '15m': '15min',
                '30m': '30min',
                '1h': '1hour',
                '4h': '4hour',
                '8h': '8hour',
                '12h': '12hour',
                '1d': '1day',
                '1w': '1week',
            },
            'urls': {
                'logo': 'https://adam-bit.net/images/logo_main.png',
                'api': {
                    'public': 'https://adam-bit.net/api',
                    'private': 'https://adam-bit.net/api',
                },
                'www': 'https://adam-bit.net',
                'doc': 'https://adam-bit.net/docs/',
                'fees': 'https://adam-bit.net/docs/fees/',
            },
            'api': {
                'public': {
                    'get': [
                        '{pair}/ticker',
                        '{pair}/orderBook',
                        '{pair}/transactions',
                        '{pair}/transactions/{yyyymmdd}',
                        '{pair}/candlestick/{candletype}/{yyyymmdd}',
                    ],
                },
                'private': {
                    'get': [
                        'user/assets',
                        'user/order',
                        'user/orders',
                        'user/spot/trade_history',
                        'user/deposit/request',
                    ],
                    'post': [
                        'user/order/create',
                        'user/order/cancel',
                        'user/order/cancel/multi',
                        'user/spot/orders_info',
                        'user/withdraw/request',
                    ],
                },
            },
            'markets': {
                'ETH/BTC': { 'id': 'eth_btc', 'symbol': 'ETH/BTC', 'base': 'ETH', 'quote': 'BTC', 'baseId': 'eth', 'quoteId': 'btc' },
                'BTC/USDT': { 'id': 'btc_usdt', 'symbol': 'BTC/USDT', 'base': 'BTC', 'quote': 'USDT', 'baseId': 'btc', 'quoteId': 'usdt' },
                'XRP/BTC': { 'id': 'xrp_btc', 'symbol': 'XRP/BTC', 'base': 'XRP', 'quote': 'BTC', 'baseId': 'xrp', 'quoteId': 'btc' },
                'ADAB/BTC': { 'id': 'adab_btc', 'symbol': 'ADAB/BTC', 'base': 'ADAB', 'quote': 'BTC', 'baseId': 'adab', 'quoteId': 'btc' },
                'ETH/USDT': { 'id': 'eth_usdt', 'symbol': 'ETH/USDT', 'base': 'ETH', 'quote': 'USDT', 'baseId': 'eth', 'quoteId': 'usdt' },
                'XRP/ETH': { 'id': 'xrp_eth', 'symbol': 'XRP/ETH', 'base': 'XRP', 'quote': 'ETH', 'baseId': 'xrp', 'quoteId': 'eth' },
                'ADAB/ETH': { 'id': 'adab_eth', 'symbol': 'ADAB/ETH', 'base': 'ADAB', 'quote': 'ETH', 'baseId': 'adab', 'quoteId': 'eth' },
                'XRP/USDT': { 'id': 'xrp_usdt', 'symbol': 'XRP/USDT', 'base': 'XRP', 'quote': 'USDT', 'baseId': 'xrp', 'quoteId': 'usdt' },
                'ADAB/USDT': { 'id': 'adab_usdt', 'symbol': 'ADAB/USDT', 'base': 'ADAB', 'quote': 'USDT', 'baseId': 'adab', 'quoteId': 'usdt' },
                'XRP/ADAB': { 'id': 'xrp_adab', 'symbol': 'XRP/ADAB', 'base': 'XRP', 'quote': 'ADAB', 'baseId': 'xrp', 'quoteId': 'adab' },
            },
            'fees': {
                'trading': {
                    'maker': -0.02 / 100,
                    'taker': 0.12 / 100,
                },
                'funding': {
                    'withdraw': {
                        // 'JPY': (amount > 30000) ? 756 : 540,
                        'BTC': 0.001,
                        'LTC': 0.001,
                        'XRP': 0.15,
                        'ETH': 0.0005,
                        'MONA': 0.001,
                        'BCC': 0.001,
                    },
                },
            },
            'precision': {
                'price': 8,
                'amount': 8,
            },
            'exceptions': {
                '10000': AuthenticationError,
                '10001': ExchangeError,
                '10010': AuthenticationError,
                '20001': AuthenticationError,
                '20002': AuthenticationError,
                '20003': AuthenticationError,
                '20005': AuthenticationError,
                '20004': InvalidNonce,
                '20006': AuthenticationError,
                '20007': AuthenticationError,
                '20008': AuthenticationError,
                '40020': InvalidOrder,
                '40021': InvalidOrder,
                '40025': ExchangeError,
                '40013': OrderNotFound,
                '40014': OrderNotFound,
                '40006': ExchangeError,
                '40022': ExchangeError,
                '50008': PermissionDenied,
                '50009': OrderNotFound,
                '50010': OrderNotFound,
                '50012': OrderNotFound,
                '60001': InsufficientFunds,
                '60005': InvalidOrder,
                '80001': ExchangeError,
                '80002': ExchangeError,
                '80003': ExchangeError,
                '80004': ExchangeError,
                '80005': ExchangeError,
            },
        });
    }

    parseTicker (ticker, market = undefined) {
        let symbol = undefined;
        if (market !== undefined) {
            symbol = market['symbol'];
        }
        const timestamp = this.safeInteger (ticker, 'timestamp');
        const last = this.safeFloat (ticker, 'last');
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'high': this.safeFloat (ticker, 'high'),
            'low': this.safeFloat (ticker, 'low'),
            'bid': this.safeFloat (ticker, 'buy'),
            'bidVolume': undefined,
            'ask': this.safeFloat (ticker, 'sell'),
            'askVolume': undefined,
            'vwap': undefined,
            'open': undefined,
            'close': last,
            'last': last,
            'previousClose': undefined,
            'change': undefined,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': this.safeFloat (ticker, 'vol'),
            'quoteVolume': undefined,
            'info': ticker,
        };
    }

    async fetchTicker (symbol, params = {}) {
        this.timeout = 10000;
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'pair': market['id'],
        };
        const response = await this.publicGetPairTicker (this.extend (request, params));
        const data = this.safeValue (response, 'data', {});
        return this.parseTicker (data, market);
    }

    async fetchOrderBook (symbol, limit = undefined, params = {}) {
        this.timeout = 10000;
        await this.loadMarkets ();
        const request = {
            'pair': this.marketId (symbol),
        };
        const response = await this.publicGetPairOrderBook (this.extend (request, params));
        const orderbook = this.safeValue (response, 'data', {});
        const timestamp = this.safeInteger (orderbook, 'timestamp');
        return this.parseOrderBook (orderbook, timestamp);
    }

    parseTrade (trade, market = undefined) {
        const timestamp = this.safeInteger (trade, 'executed_at');
        let symbol = undefined;
        let feeCurrency = undefined;
        if (market !== undefined) {
            symbol = market['symbol'];
            feeCurrency = market['quote'];
        }
        const price = this.safeFloat (trade, 'price');
        const amount = this.safeFloat (trade, 'amount');
        let cost = undefined;
        if (price !== undefined) {
            if (amount !== undefined) {
                cost = parseFloat (this.costToPrecision (symbol, price * amount));
            }
        }
        const id = this.safeString2 (trade, 'transaction_id', 'trade_id');
        const takerOrMaker = this.safeString (trade, 'maker_taker');
        let fee = undefined;
        const feeCost = this.safeFloat (trade, 'fee_amount_quote');
        if (feeCost !== undefined) {
            fee = {
                'currency': feeCurrency,
                'cost': feeCost,
            };
        }
        const orderId = this.safeString (trade, 'order_id');
        const type = this.safeString (trade, 'type');
        const side = this.safeString (trade, 'side');
        return {
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'symbol': symbol,
            'id': id,
            'order': orderId,
            'type': type,
            'side': side,
            'takerOrMaker': takerOrMaker,
            'price': price,
            'amount': amount,
            'cost': cost,
            'fee': fee,
            'info': trade,
        };
    }

    async fetchTrades (symbol, since = undefined, limit = undefined, params = {}) {
        this.timeout = 10000;
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'pair': market['id'],
        };
        const response = await this.publicGetPairTransactions (this.extend (request, params));
        const data = this.safeValue (response, 'data', {});
        const trades = this.safeValue (data, 'transactions', []);
        return this.parseTrades (trades, market, since, limit);
    }

    parseOHLCV (ohlcv, market = undefined) {
        //
        //     [
        //         "0.02501786",
        //         "0.02501786",
        //         "0.02501786",
        //         "0.02501786",
        //         "0.0000",
        //         1591488000000
        //     ]
        //
        return [
            this.safeInteger (ohlcv, 5),
            this.safeFloat (ohlcv, 0),
            this.safeFloat (ohlcv, 1),
            this.safeFloat (ohlcv, 2),
            this.safeFloat (ohlcv, 3),
            this.safeFloat (ohlcv, 4),
        ];
    }

    async fetchOHLCV (symbol, timeframe = '5m', since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets ();
        const market = this.market (symbol);
        let date = this.milliseconds ();
        date = this.ymd (date);
        date = date.split ('-');
        const request = {
            'pair': market['id'],
            'candletype': this.timeframes[timeframe],
            'yyyymmdd': date.join (''),
        };
        const response = await this.publicGetPairCandlestickCandletypeYyyymmdd (this.extend (request, params));
        //
        //     {
        //         "success":1,
        //         "data":{
        //             "candlestick":[
        //                 {
        //                     "type":"5min",
        //                     "ohlcv":[
        //                         ["0.02501786","0.02501786","0.02501786","0.02501786","0.0000",1591488000000],
        //                         ["0.02501747","0.02501953","0.02501747","0.02501953","0.3017",1591488300000],
        //                         ["0.02501762","0.02501762","0.02500392","0.02500392","0.1500",1591488600000],
        //                     ]
        //                 }
        //             ],
        //             "timestamp":1591508668190
        //         }
        //     }
        //
        const data = this.safeValue (response, 'data', {});
        const candlestick = this.safeValue (data, 'candlestick', []);
        const first = this.safeValue (candlestick, 0, {});
        const ohlcv = this.safeValue (first, 'ohlcv', []);
        return this.parseOHLCVs (ohlcv, market, timeframe, since, limit);
    }

    async fetchBalance (params = {}) {
        this.timeout = 10000;
        await this.loadMarkets ();
        const response = await this.privateGetUserAssets (params);
        const result = { 'info': response };
        const data = this.safeValue (response, 'data', {});
        const assets = this.safeValue (data, 'assets', []);
        for (let i = 0; i < assets.length; i++) {
            const balance = assets[i];
            const currencyId = this.safeString (balance, 'asset');
            const code = this.safeCurrencyCode (currencyId);
            const account = {
                'free': this.safeFloat (balance, 'free_amount'),
                'used': this.safeFloat (balance, 'locked_amount'),
                'total': this.safeFloat (balance, 'onhand_amount'),
            };
            result[code] = account;
        }
        return this.parseBalance (result);
    }

    parseOrderStatus (status) {
        const statuses = {
            'UNFILLED': 'open',
            'PARTIALLY_FILLED': 'open',
            'FULLY_FILLED': 'closed',
            'CANCELED_UNFILLED': 'canceled',
            'CANCELED_PARTIALLY_FILLED': 'canceled',
        };
        return this.safeString (statuses, status, status);
    }

    parseOrder (order, market = undefined) {
        const id = this.safeString (order, 'order_id');
        const marketId = this.safeString (order, 'pair');
        let symbol = undefined;
        if (marketId && !market && (marketId in this.marketsById)) {
            market = this.marketsById[marketId];
        }
        if (market !== undefined) {
            symbol = market['symbol'];
        }
        const timestamp = this.safeInteger (order, 'ordered_at');
        const price = this.safeFloat (order, 'price');
        const amount = this.safeFloat (order, 'start_amount');
        const filled = this.safeFloat (order, 'executed_amount');
        const remaining = this.safeFloat (order, 'remaining_amount');
        const average = this.safeFloat (order, 'average_price');
        let cost = undefined;
        if (filled !== undefined) {
            if (average !== undefined) {
                cost = filled * average;
            }
        }
        const status = this.parseOrderStatus (this.safeString (order, 'status'));
        const type = this.safeStringLower (order, 'type');
        const side = this.safeStringLower (order, 'side');
        return {
            'id': id,
            'clientOrderId': undefined,
            'datetime': this.iso8601 (timestamp),
            'timestamp': timestamp,
            'lastTradeTimestamp': undefined,
            'status': status,
            'symbol': symbol,
            'type': type,
            'timeInForce': undefined,
            'postOnly': undefined,
            'side': side,
            'price': price,
            'stopPrice': undefined,
            'cost': cost,
            'average': average,
            'amount': amount,
            'filled': filled,
            'remaining': remaining,
            'trades': undefined,
            'fee': undefined,
            'info': order,
        };
    }

    async createOrder (symbol, type, side, amount, price = undefined, params = {}) {
        this.timeout = 10000;
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'pair': market['id'],
            'amount': this.amountToPrecision (symbol, amount),
            'side': side,
            'type': type,
        };
        if (price !== undefined) {
            request['price'] = this.priceToPrecision (symbol, price);
        }
        const response = await this.privatePostUserOrderCreate (this.extend (request, params));
        const data = this.safeValue (response, 'data');
        return this.parseOrder (data, market);
    }

    async cancelOrder (id, symbol = undefined, amount = undefined, params = {}) {
        this.timeout = 10000;
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'order_id': id,
            'pair': market['id'],
            'amount': (amount === undefined ? 0 : amount),
        };
        const response = await this.privatePostUserOrderCancel (this.extend (request, params));
        const data = this.safeValue (response, 'data');
        return data;
    }

    async fetchOrder (id, symbol = undefined, params = {}) {
        this.timeout = 10000;
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'order_id': id,
            'pair': market['id'],
        };
        const response = await this.privateGetUserOrder (this.extend (request, params));
        const data = this.safeValue (response, 'data');
        return this.parseOrder (data, market);
    }

    async fetchOpenOrders (symbol = undefined, since = undefined, limit = undefined, params = {}) {
        this.timeout = 10000;
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'pair': market['id'],
        };
        if (limit !== undefined) {
            request['count'] = limit;
        }
        if (since !== undefined) {
            request['since'] = parseInt (since / 1000);
        }
        const response = await this.privateGetUserOrders (this.extend (request, params));
        const data = this.safeValue (response, 'data', {});
        const orders = this.safeValue (data, 'orders', []);
        return this.parseOrders (orders, market, since, limit);
    }

    async fetchMyTrades (symbol = undefined, since = undefined, limit = undefined, params = {}) {
        this.timeout = 10000;
        await this.loadMarkets ();
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market (symbol);
        }
        const request = {};
        if (market !== undefined) {
            request['pair'] = market['id'];
        }
        if (limit !== undefined) {
            request['count'] = limit;
        }
        if (since !== undefined) {
            request['since'] = parseInt (since / 1000);
        }
        const response = await this.privateGetUserSpotTradeHistory (this.extend (request, params));
        const data = this.safeValue (response, 'data', {});
        const trades = this.safeValue (data, 'trades', []);
        return this.parseTrades (trades, market, since, limit);
    }

    async fetchDepositAddress (code, params = {}) {
        this.timeout = 10000;
        await this.loadMarkets ();
        const currency = this.currency (code);
        const request = {
            'asset': currency['id'],
        };
        const response = await this.privateGetUserDepositRequest (this.extend (request, params));
        const data = this.safeValue (response, 'data', {});
        // Not sure about this if there could be more than one account...
        const accounts = this.safeValue (data, 'accounts', []);
        const firstAccount = this.safeValue (accounts, 0, {});
        const address = this.safeString (firstAccount, 'address');
        return {
            'currency': currency,
            'address': address,
            'tag': undefined,
            'info': response,
        };
    }

    async withdraw (code, amount, address, tag = undefined, params = {}) {
        this.timeout = 30000;
        await this.loadMarkets ();
        const currency = this.currency (code);
        const request = {
            'asset': currency['id'],
            'amount': amount,
            'address': address,
        };
        const response = await this.privatePostUserWithdrawRequest (this.extend (request, params));
        const data = this.safeValue (response, 'data', {});
        const txid = this.safeString (data, 'txid');
        return {
            'info': response,
            'id': txid,
        };
    }

    nonce () {
        return this.milliseconds ();
    }

    sign (path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        let query = this.omit (params, this.extractParams (path));
        let url = this.urls['api'][api] + '/';
        if (api === 'public') {
            url += this.implodeParams (path, params);
            if (Object.keys (query).length) {
                url += '?' + this.urlencode (query);
            }
        } else {
            this.checkRequiredCredentials ();
            const nonce = this.nonce ().toString ();
            let auth = nonce;
            url += this.version + '/' + this.implodeParams (path, params);
            if (method === 'POST') {
                body = this.json (query);
                auth += body;
            } else {
                auth += '/' + this.version + '/' + path;
                if (Object.keys (query).length) {
                    query = this.urlencode (query);
                    url += '?' + query;
                    auth += '?' + query;
                }
            }
            headers = {
                'Content-Type': 'application/json',
                'X-CTEX-API-KEY': this.apiKey,
                'X-CTEX-API-NONCE': nonce,
                'X-CTEX-SIGNATURE': this.hmac (this.encode (auth), this.encode (this.secret)),
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }

    async request (path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        const response = await this.fetch2 (path, api, method, params, headers, body);
        const success = this.safeInteger (response, 'success');
        const data = this.safeValue (response, 'data');
        if (!success || !data) {
            const errorMessages = {
                '10000': 'URL does not exist',
                '10001': 'A system error occurred. Please contact support',
                '10002': 'Invalid JSON format. Please check the contents of transmission',
                '10003': 'A system error occurred. Please contact support',
                '10005': 'A timeout error occurred. Please wait for a while and try again',
                '10010': 'Invalid pair',
                '20001': 'API authentication failed',
                '20002': 'Illegal API key',
                '20003': 'API key does not exist',
                '20004': 'API Nonce does not exist',
                '20005': 'API signature does not exist',
                '20006': 'Invalid IP address',
                '20007': 'Secondly limit has reached',
                '20008': 'Daily limit has reached',
                '20011': 'Two-step verification failed',
                '20014': 'SMS authentication failed',
                '30001': 'Please specify the order quantity',
                '30006': 'Please specify the order ID',
                '30007': 'Please specify the order ID array',
                '30009': 'Please specify the stock',
                '30012': 'Please specify the order price',
                '30013': 'Trade Please specify either',
                '30015': 'Please specify the order type',
                '30016': 'Please specify asset name',
                '30019': 'Please specify uuid',
                '30039': 'Please specify the amount to be withdrawn',
                '40001': 'The order quantity is invalid',
                '40006': 'Count value is invalid',
                '40007': 'End time is invalid',
                '40008': 'end_id Value is invalid',
                '40009': 'The from_id value is invalid',
                '40013': 'The order ID is invalid',
                '40014': 'The order ID array is invalid',
                '40015': 'Too many specified orders',
                '40017': 'Incorrect issue name',
                '40020': 'The order price is invalid',
                '40021': 'The trading classification is invalid',
                '40022': 'Start date is invalid',
                '40024': 'The order type is invalid',
                '40025': 'Incorrect asset name',
                '40028': 'uuid is invalid',
                '40048': 'The amount of withdrawal is illegal',
                '50003': 'Currently, this account is in a state where you can not perform the operation you specified. Please contact support',
                '50004': 'Currently, this account is temporarily registered. Please try again after registering your account',
                '50005': 'Currently, this account is locked. Please contact support',
                '50006': 'Currently, this account is locked. Please contact support',
                '50008': 'User identification has not been completed',
                '50009': 'Your order does not exist',
                '50010': 'Can not cancel specified order',
                '50011': 'API not found',
                '50012': 'Your order has been already cancelled',
                '60001': 'The number of possessions is insufficient',
                '60002': 'It exceeds the quantity upper limit of the tender buying order',
                '60003': 'The specified quantity exceeds the limit',
                '60004': 'The specified quantity is below the threshold',
                '60005': 'The specified price is above the limit',
                '60006': 'The specified price is below the lower limit',
                '70001': 'A system error occurred. Please contact support',
                '70002': 'A system error occurred. Please contact support',
                '70003': 'A system error occurred. Please contact support',
                '70004': 'We are unable to accept orders as the transaction is currently suspended',
                '70005': 'Order can not be accepted because purchase order is currently suspended',
                '70006': 'We can not accept orders because we are currently unsubscribed ',
                '70009': 'We are currently temporarily restricting orders to be carried out. Please use the limit order.',
                '70010': 'We are temporarily raising the minimum order quantity as the system load is now rising.',
                '80001': 'No deposit address',
                '80002': 'Invalid withdraw address',
                '80003': 'Invalid withdraw amount',
                '80004': 'Not enough balance',
                '80005': 'Crypto API has failed',
            };
            const errorClasses = this.exceptions;
            const code = this.safeString (data, 'code');
            const message = this.safeString (errorMessages, code, 'Error');
            const ErrorClass = this.safeValue (errorClasses, code);
            if (ErrorClass !== undefined) {
                throw new ErrorClass (message);
            } else {
                throw new ExchangeError (this.id + ' ' + this.json (response));
            }
        }
        return response;
    }
};
