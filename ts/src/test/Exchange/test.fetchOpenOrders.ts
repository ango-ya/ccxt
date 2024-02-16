
import assert from 'assert';
import testSharedMethods from './base/test.sharedMethods.js';
import testOrder from './base/test.order.js';

async function testFetchOpenOrders (exchange, skippedProperties, symbol) {
    const method = 'fetchOpenOrders';
    const orders = await exchange.fetchOpenOrders (symbol);
    assert (Array.isArray (orders), exchange.id + ' ' + method + ' must return an array, returned ' + exchange.json (orders));
    const now = exchange.milliseconds ();
    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        testOrder (exchange, skippedProperties, method, order, symbol, now);
        assert (order['status'] === 'open', exchange.id + ' ' + method + ' ' + symbol + ' returned an order with status ' + order['status'] + ' (expected "open")');
    }
    testSharedMethods.assertTimestampOrder (exchange, method, symbol, orders);
}

export default testFetchOpenOrders;
