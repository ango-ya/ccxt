"use strict";

const ccxt      = require ('../../ccxt.js')
const asTable   = require ('as-table')
const log       = require ('ololog').configure ({ locate: false })
const argv      = process.argv.slice(2);

require ('ansicolor').nice

let sleep = (ms) => new Promise (resolve => setTimeout (resolve, ms))

;(async () => {

    // instantiate the exchange
    let adambit = new ccxt.adambitred({
        'apiKey': 'YOUR_API_KEY',
        'secret': 'YOUR_SECRET',
        'enableRateLimit': true,
        'timeout': 1000 * 10,
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
                if (argv.length < 2) {
                    log.bright.yellow('Invalid arguments!');
                    log.bright.red('node adambit-test.js fetchTicker PAIR');
                    process.exit(0);
                }
                
                result = await adambit.fetchTicker(argv[1]);
                log(adambit.name.green, 'fetchTicker', result);
                break;

            case 'fetchBalance':
                result = await adambit.fetchBalance();
                log(adambit.name.green, 'fetchBalance', result);
                break;

            case 'fetchOrderBook':
                if (argv.length < 2) {
                    log.bright.yellow('Invalid arguments!');
                    log.bright.red('node adambit-test.js fetchOrderBook PAIR');
                    process.exit(0);
                }
                
                result = await adambit.fetchOrderBook(argv[1]);
                log(adambit.name.green, 'fetchOrderBook', result);
                break;

            case 'createOrder':
                if (argv.length < 5) {
                    log.bright.yellow('Invalid arguments!');
                    log.bright.red('node adambit-test.js createOrder PAIR TYPE CMD LOTS PRICE');
                    log.bright.red('   TYPE: limit/market');
                    log.bright.red('   CMD : sell/buy');
                    process.exit(0);
                }
                
                result = await adambit.createOrder(argv[1], argv[2], argv[3], argv[4], argv[5]);
                log(adambit.name.green, 'createOrder', result);
                break;

            case 'cancelOrder':
                if (argv.length < 3) {
                    log.bright.yellow('Invalid arguments!');
                    log.bright.red('node adambit-test.js cancelOrder ORDER_ID PAIR AMOUNT');
                    process.exit(0);
                }
                
                result = await adambit.cancelOrder(argv[1], argv[2], argv[3]);
                log(adambit.name.green, 'cancelOrder', result);
                break;

            case 'fetchOrder':
                if (argv.length < 3) {
                    log.bright.yellow('Invalid arguments!');
                    log.bright.red('node adambit-test.js fetchOrder ORDER_ID PAIR');
                    process.exit(0);
                }
                
                result = await adambit.fetchOrder(argv[1], argv[2]);
                log(adambit.name.green, 'fetchOrder', result);
                break;

            case 'fetchOpenOrders':
                if (argv.length < 4) {
                    log.bright.yellow('Invalid arguments!');
                    log.bright.red('node adambit-test.js fetchOpenOrders PAIR SINCE COUNT');
                    process.exit(0);
                }
                
                result = await adambit.fetchOpenOrders(argv[1], argv[2], argv[3]);
                log(adambit.name.green, 'fetchOpenOrders', result);
                break;

            case 'fetchDepositAddress':
                if (argv.length < 2) {
                    log.bright.yellow('Invalid arguments!');
                    log.bright.red('node adambit-test.js fetchDepositAddress CURRENCY');
                    process.exit(0);
                }
                
                result = await adambit.fetchDepositAddress(argv[1]);
                log(adambit.name.green, 'fetchDepositAddress', result);
                break;

            case 'withdraw':
                if (argv.length < 4) {
                    log.bright.yellow('Invalid arguments!');
                    log.bright.red('node adambit-test.js withdraw CURRENCY AMOUNT ADDRESS');
                    process.exit(0);
                }
                
                result = await adambit.withdraw(argv[1], argv[2], argv[3]);
                log(adambit.name.green, 'withdraw', result);
                break;

            default:
                log(adambit.name.yellow, 'Invalid command!');
    
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