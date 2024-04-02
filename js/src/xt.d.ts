import Exchange from './abstract/xt.js';
import { Int, Strings, Transaction, Market, OrderType, OrderSide, Tickers } from './base/types.js';
export default class xt extends Exchange {
    describe(): any;
    nonce(): number;
    fetchTime(params?: {}): Promise<number>;
    fetchCurrencies(params?: {}): Promise<{}>;
    fetchMarkets(params?: {}): Promise<any>;
    fetchSpotMarkets(params?: {}): Promise<any[]>;
    fetchSwapAndFutureMarkets(params?: {}): Promise<any[]>;
    parseMarkets(markets: any): any[];
    parseMarket(market: any): Market;
    fetchOrderBook(symbol: string, limit?: Int, params?: {}): Promise<import("./base/types.js").OrderBook>;
    fetchTicker(symbol: string, params?: {}): Promise<import("./base/types.js").Ticker>;
    fetchTickers(symbols?: Strings, params?: {}): Promise<Tickers>;
    fetchBidsAsks(symbols?: string[], params?: {}): Promise<import("./base/types.js").Dictionary<import("./base/types.js").Ticker>>;
    parseTicker(ticker: any, market?: any): import("./base/types.js").Ticker;
    fetchTrades(symbol: string, since?: Int, limit?: Int, params?: {}): Promise<import("./base/types.js").Trade[]>;
    fetchMyTrades(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<import("./base/types.js").Trade[]>;
    parseTrade(trade: any, market?: any): import("./base/types.js").Trade;
    fetchBalance(params?: {}): Promise<import("./base/types.js").Balances>;
    parseBalance(response: any): import("./base/types.js").Balances;
    createOrder(symbol: string, type: OrderType, side: OrderSide, amount: number, price?: number, params?: {}): Promise<import("./base/types.js").Order>;
    createSpotOrder(symbol: string, type: any, side: any, amount: any, price?: any, params?: {}): Promise<import("./base/types.js").Order>;
    createContractOrder(symbol: string, type: any, side: any, amount: any, price?: any, params?: {}): Promise<import("./base/types.js").Order>;
    fetchOrder(id: string, symbol?: string, params?: {}): Promise<import("./base/types.js").Order>;
    fetchOrders(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<import("./base/types.js").Order[]>;
    fetchOrdersByStatus(status: any, symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<import("./base/types.js").Order[]>;
    fetchOpenOrders(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<import("./base/types.js").Order[]>;
    fetchClosedOrders(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<import("./base/types.js").Order[]>;
    fetchCanceledOrders(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<import("./base/types.js").Order[]>;
    cancelOrder(id: string, symbol?: string, params?: {}): Promise<import("./base/types.js").Order>;
    cancelAllOrders(symbol?: string, params?: {}): Promise<any>;
    cancelOrders(ids: string[], symbol?: string, params?: {}): Promise<any>;
    parseOrder(order: any, market?: any): import("./base/types.js").Order;
    parseOrderStatus(status: any): string;
    fetchDepositAddress(code: string, params?: {}): Promise<{
        currency: string;
        address: string;
        tag: string;
        network: any;
        info: any;
    }>;
    parseDepositAddress(depositAddress: any, currency?: any): {
        currency: string;
        address: string;
        tag: string;
        network: any;
        info: any;
    };
    fetchDeposits(code?: string, since?: Int, limit?: Int, params?: {}): Promise<Transaction[]>;
    fetchWithdrawals(code?: string, since?: Int, limit?: Int, params?: {}): Promise<Transaction[]>;
    withdraw(code: string, amount: any, address: any, tag?: any, params?: {}): Promise<Transaction>;
    parseTransaction(transaction: any, currency?: any): Transaction;
    parseTransactionStatus(status: any): string;
    addMargin(symbol: string, amount: any, params?: {}): Promise<{
        info: any;
        type: any;
        amount: any;
        code: any;
        symbol: string;
        status: any;
    }>;
    reduceMargin(symbol: string, amount: any, params?: {}): Promise<{
        info: any;
        type: any;
        amount: any;
        code: any;
        symbol: string;
        status: any;
    }>;
    modifyMarginHelper(symbol: string, amount: any, addOrReduce: any, params?: {}): Promise<{
        info: any;
        type: any;
        amount: any;
        code: any;
        symbol: string;
        status: any;
    }>;
    parseMarginModification(data: any, market?: any): {
        info: any;
        type: any;
        amount: any;
        code: any;
        symbol: string;
        status: any;
    };
    fetchLeverageTiers(symbols?: string[], params?: {}): Promise<{}>;
    fetchPosition(symbol: string, params?: {}): Promise<import("./base/types.js").Position>;
    handleErrors(code: any, reason: any, url: any, method: any, headers: any, body: any, response: any, requestHeaders: any, requestBody: any): any;
    sign(path: any, api?: any[], method?: string, params?: {}, headers?: any, body?: any): {
        url: any;
        method: string;
        body: any;
        headers: any;
    };
}
