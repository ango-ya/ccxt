"use strict";

const ccxt      = require ('../../ccxt.js')
const asTable   = require ('as-table')
const log       = require ('ololog').configure ({ locate: false })
const argv      = process.argv.slice(2);

require ('ansicolor').nice

let sleep = (ms) => new Promise (resolve => setTimeout (resolve, ms))

// Check arguments
if (argv.length < 1) {
    console.log('Invalid arguments!');
    console.log('node adambit-test.js FUNCTION [PARAM1] [PARAM2] [PARAM3] ...');
    process.exit(0);
}

;(async () => {

    // instantiate the exchange
    let adambit = new ccxt.adambit({
        'apiKey': 'uAQLtn4Iq7Wu7DANfQqwPfkp5Pq42cPr',
        'secret': 'LbXqhtdjAOT+dYWSM7whMxzcfkVnd8ljnfrv700G6QvZ9x4D5Enk4Q==',
    });

    let adambit_admin = new ccxt.adambit({
        'apiKey': 'iqu18^&reqwu34QQWERRWEQqi1324==',
        'secret': 'Q!QQWE^#*#&I#()EIEIRREI=-===QEWRWERQEWREWr',
    });

    try {
        let result = null;
        switch (argv[0]) {
            case 'fetchSymbols':
                const markets = await adambit.loadMarkets();
                const symbols = Object.keys (markets)
            
                log ('---------------------------------------- Symbols ----------------------------------------')
                for (let i = 0; i < symbols.length; i++) {
                    log('>>', symbols[i]);
                }
                break;

            case 'fetchTicker':
                // fetchTicker
                result = await adambit.fetchTicker(argv[1]);
                log(adambit.name.green, 'fetchTicker', result);
                break;

            case 'fetchBalance':
                // fetchBalance;
                result = await adambit.fetchBalance();
                log(adambit.name.green, 'fetchBalance', result);
                break;

            case 'fetchOrderBook':
                result = await adambit.fetchOrderBook(argv[1]);
                log(adambit.name.green, 'fetchOrderBook', result);
                break;

            case 'createOrder':
                result = await adambit.createOrder('BTC/ETH', 'limit', 'sell', '0.0001', '450000');
                log(adambit.name.green, 'createOrder', result);
                break;

            case 'cancelOrder':
                result = await adambit.cancelOrder('101801054729', 'BTC/ETH');
                log(adambit.name.green, 'cancelOrder', result);
                break;

            case 'fetchOrder':  
                result = await adambit.fetchOrder('101801054729', 'BTC/ETH');
                log(adambit.name.green, 'fetchOrder', result);
                break;

            case 'fetchOpenOrders':
                result = await adambit.fetchOpenOrders('BTC/ETH', 1634531210960, 5);
                log(adambit.name.green, 'fetchOpenOrders', result);
                break;

            case 'fetchDepositAddress':
                result = await adambit_admin.fetchDepositAddress(argv[1]);
                log(adambit_admin.name.green, 'fetchDepositAddress', result);
                break;

            case 'withdraw':
                //result = await adambit_admin.withdraw('ETH', '0.001', '0xf2D214fa592b14b4176157d7d8287f8b7a057c8b');
                result = await adambit_admin.withdraw('BTC', '0.0001', 'msA5PDxvJZnKPqVzhFv5Zj9pHV2MGzz8mU');
                log(adambit_admin.name.green, 'withdraw', result);
                break;
    
            }

    } catch (e) {

        if (e instanceof ccxt.DDoSProtection || e.message.includes ('ECONNRESET')) {
            log.bright.yellow ('[DDoS Protection] ' + e.message)
        } else if (e instanceof ccxt.RequestTimeout) {
            log.bright.yellow ('[Request Timeout] ' + e.message)
        } else if (e instanceof ccxt.AuthenticationError) {
            log.bright.yellow ('[Authentication Error] ' + e.message)
        } else if (e instanceof ccxt.ExchangeNotAvailable) {
            log.bright.yellow ('[Exchange Not Available Error] ' + e.message)
        } else if (e instanceof ccxt.ExchangeError) {
            log.bright.yellow ('[Exchange Error] ' + e.message)
        } else if (e instanceof ccxt.NetworkError) {
            log.bright.yellow ('[Network Error] ' + e.message)
        } else {
            throw e;
        }
    }

}) ()