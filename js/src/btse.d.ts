import Exchange from './abstract/btse.js';
import type { Balances, Int, Market, Ticker, OrderBook, Dict, Order, Trade, OHLCV, Currencies } from './base/types.js';
export default class btse extends Exchange {
    constructor(options?: {});
    describe(): any;
    fetchMarkets(symbol?: any, params?: {}): Promise<Market[]>;
    fetchTicker(symbol: string, params?: {}): Promise<Ticker>;
    parseTicker(ticker: Dict, market?: Market): Ticker;
    fetchOrderBook(symbol: string, limit?: Int, params?: {}): Promise<OrderBook>;
    sign(path: string, api?: string, method?: string, params?: {}, headers?: any, body?: any): {
        url: string;
        method: string;
        body: any;
        headers: any;
    };
    fetchBalance(params?: {}): Promise<Balances>;
    createOrder(symbol: string, type: string, side: string, amount: number, price?: number, params?: {}): Promise<Order>;
    cancelOrder(id: string, symbol?: string, params?: {}): Promise<Order>;
    fetchOrder(id: string, symbol?: string, params?: {}): Promise<Order>;
    fetchOpenOrders(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<Order[]>;
    fetchMyTrades(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<Trade[]>;
    fetchOHLCV(symbol: string, timeframe?: string, since?: Int, limit?: Int, params?: {}): Promise<OHLCV[]>;
    fetchCurrencies(params?: {}): Promise<Currencies>;
    parseOrder(order: Dict, market?: Market): Order;
    parseOrderStatus(status: string): string;
    parseOrderStatusCode(statusCode: number): string;
    parseOrderType(orderType: number): string;
    parseTrade(trade: Dict, market?: Market): Trade;
    parseOHLCV(ohlcv: any[], market?: Market): OHLCV;
    handleErrors(code: Int, reason: string, url: string, method: string, headers: Dict, body: string, response: any, requestHeaders: any, requestBody: any): any;
}
