import { implicitReturnType } from '../base/types.js';
import { Exchange as _Exchange } from '../base/Exchange.js';
interface Exchange {
    publicGetApiV32MarketSummary(params?: {}): Promise<implicitReturnType>;
    publicGetApiV32Orderbook(params?: {}): Promise<implicitReturnType>;
    publicGetApiV32Trades(params?: {}): Promise<implicitReturnType>;
    publicGetApiV32Ohlcv(params?: {}): Promise<implicitReturnType>;
    publicGetApiV32MarketSummarySymbol(params?: {}): Promise<implicitReturnType>;
    publicGetApiV32OrderbookSymbol(params?: {}): Promise<implicitReturnType>;
    publicGetApiV32TradesSymbol(params?: {}): Promise<implicitReturnType>;
    publicGetApiV32OhlcvSymbol(params?: {}): Promise<implicitReturnType>;
    privateGetApiV32UserWallet(params?: {}): Promise<implicitReturnType>;
    privateGetApiV32UserOpenOrders(params?: {}): Promise<implicitReturnType>;
    privateGetApiV32Order(params?: {}): Promise<implicitReturnType>;
    privateGetApiV32UserTradeHistory(params?: {}): Promise<implicitReturnType>;
    privatePostApiV32Order(params?: {}): Promise<implicitReturnType>;
    privateDeleteApiV32Order(params?: {}): Promise<implicitReturnType>;
}
declare abstract class Exchange extends _Exchange {
}
export default Exchange;
