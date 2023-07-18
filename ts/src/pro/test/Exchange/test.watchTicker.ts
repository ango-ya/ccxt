'use strict';

// ----------------------------------------------------------------------------

import testTicker from '../../../test/Exchange/base/test.ticker.js';
import errors from '../../../base/errors.js';

/*  ------------------------------------------------------------------------ */

export default async (exchange, symbol) => {

    // log (symbol.green, 'watching ticker...')

    const method = 'watchTicker';
    const skippedProperties = {};

    // we have to skip some exchanges here due to the frequency of trading
    const skippedExchanges = [
        'cex',
        'ripio',
        'mexc',
        'woo',
        'alpaca', // requires auth
    ];

    if (skippedExchanges.includes (exchange.id)) {
        console.log (exchange.id, method + '() test skipped');
        return;
    }

    if (!exchange.has[method]) {
        console.log (exchange.id, method + '() is not supported');
        return;
    }

    let response = undefined;

    let now = Date.now ();
    const ends = now + 10000;

    while (now < ends) {

        try {

            response = await exchange[method] (symbol);

            testTicker (exchange, skippedProperties, method, response, symbol);

            now = Date.now ();

        } catch (e) {

            if (!(e instanceof errors.NetworkError)) {
                throw e;
            }

            now = Date.now ();
        }

    }

    return response;
};
