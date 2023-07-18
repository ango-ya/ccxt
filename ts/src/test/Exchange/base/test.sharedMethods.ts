
import assert from 'assert';
import Precise from '../../../base/Precise.js';
import { TICK_SIZE } from '../../../base/functions/number.js';

function logTemplate (exchange, method, entry) {
    return ' <<< ' + exchange.id + ' ' + method + ' ::: ' + exchange.json (entry) + ' >>> ';
}

function isInteger (value) {
    const isNumeric = (typeof value === 'number');
    if (isNumeric) {
        return (value % 1) === 0;
    } else {
        return false;
    }
}

function stringValue (value) {
    let stringVal = undefined;
    if (typeof value === 'string') {
        stringVal = value;
    } else if (value === undefined) {
        stringVal = 'undefined';
    } else {
        stringVal = value.toString ();
    }
    return stringVal;
}

function assertType (exchange, skippedProperties, entry, key, format) {
    if (key in skippedProperties) {
        return;
    }
    // because "typeof" string is not transpilable without === 'name', we list them manually at this moment
    const entryKeyVal = exchange.safeValue (entry, key);
    const formatKeyVal = exchange.safeValue (format, key);
    const same_string = (typeof entryKeyVal === 'string') && (typeof formatKeyVal === 'string');
    const same_numeric = (typeof entryKeyVal === 'number') && (typeof formatKeyVal === 'number');
    const same_boolean = ((entryKeyVal === true) || (entryKeyVal === false)) && ((formatKeyVal === true) || (formatKeyVal === false));
    const same_array = Array.isArray (entryKeyVal) && Array.isArray (formatKeyVal);
    const same_object = (typeof entryKeyVal === 'object') && (typeof formatKeyVal === 'object');
    const result = (entryKeyVal === undefined) || same_string || same_numeric || same_boolean || same_array || same_object;
    return result;
}

function assertStructure (exchange, skippedProperties, method, entry, format, emptyAllowedFor = []) {
    const logText = logTemplate (exchange, method, entry);
    assert (entry, 'item is null/undefined' + logText);
    // get all expected & predefined keys for this specific item and ensure thos ekeys exist in parsed structure
    if (Array.isArray (format)) {
        assert (Array.isArray (entry), 'entry is not an array' + logText);
        const realLength = entry.length;
        const expectedLength = format.length;
        assert (realLength === expectedLength, 'entry length is not equal to expected length of ' + expectedLength.toString () + logText);
        for (let i = 0; i < format.length; i++) {
            const emptyAllowedForThisKey = exchange.inArray (i, emptyAllowedFor);
            const value = entry[i];
            // check when:
            // - it's not inside "allowe empty values" list
            // - it's not undefined
            if (emptyAllowedForThisKey && (value === undefined)) {
                continue;
            }
            assert (value !== undefined, i.toString () + ' index is expected to have a value' + logText);
            // because of other langs, this is needed for arrays
            assert (assertType (exchange, skippedProperties, entry, i, format), i.toString () + ' index does not have an expected type ' + logText);
        }
    } else {
        assert (typeof entry === 'object', 'entry is not an object' + logText);
        const keys = Object.keys (format);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (key in skippedProperties) {
                continue;
            }
            assert (key in entry, '"' + stringValue (key) + '" key is missing from structure' + logText);
            const emptyAllowedForThisKey = exchange.inArray (key, emptyAllowedFor);
            const value = entry[key];
            // check when:
            // - it's not inside "allowe empty values" list
            // - it's not undefined
            if (emptyAllowedForThisKey && (value === undefined)) {
                continue;
            }
            // if it was in needed keys, then it should have value.
            assert (value !== undefined, '"' + stringValue (key) + '" key is expected to have a value' + logText);
            // add exclusion for info key, as it can be any type
            if (key !== 'info') {
                assert (assertType (exchange, skippedProperties, entry, key, format), '"' + stringValue (key) + '" key is neither undefined, neither of expected type' + logText);
            }
        }
    }
}

function assertTimestamp (exchange, skippedProperties, method, entry, nowToCheck = undefined, keyNameOrIndex : any = 'timestamp') {
    const logText = logTemplate (exchange, method, entry);
    const skipValue = exchange.safeValue (skippedProperties, keyNameOrIndex);
    if (skipValue !== undefined) {
        return; // skipped
    }
    const isDateTimeObject = typeof keyNameOrIndex === 'string';
    if (isDateTimeObject) {
        assert ((keyNameOrIndex in entry), 'timestamp key "' + keyNameOrIndex + '" is missing from structure' + logText);
    } else {
        // if index was provided (mostly from fetchOHLCV) then we check if it exists, as mandatory
        assert (!(entry[keyNameOrIndex] === undefined), 'timestamp index ' + stringValue (keyNameOrIndex) + ' is undefined' + logText);
    }
    const ts = entry[keyNameOrIndex];
    if (ts !== undefined) {
        assert (typeof ts === 'number', 'timestamp is not numeric' + logText);
        assert (isInteger (ts), 'timestamp should be an integer' + logText);
        const minTs = 1230940800000; // 03 Jan 2009 - first block
        const maxTs = 2147483648000; // 03 Jan 2009 - first block
        assert (ts > minTs, 'timestamp is impossible to be before ' + minTs.toString () + ' (03.01.2009)' + logText); // 03 Jan 2009 - first block
        assert (ts < maxTs, 'timestamp more than ' + maxTs.toString () + ' (19.01.2038)' + logText); // 19 Jan 2038 - int32 overflows // 7258118400000  -> Jan 1 2200
        if (nowToCheck !== undefined) {
            const maxMsOffset = 60000; // 1 min
            assert (ts < nowToCheck + maxMsOffset, 'returned trade timestamp (' + exchange.iso8601 (ts) + ') is ahead of the current time (' + exchange.iso8601 (nowToCheck) + ')' + logText);
        }
    }
    // only in case if the entry is a dictionary, thus it must have 'timestamp' & 'datetime' string keys
    if (isDateTimeObject) {
        // we also test 'datetime' here because it's certain sibling of 'timestamp'
        assert (('datetime' in entry), '"datetime" key is missing from structure' + logText);
        const dt = entry['datetime'];
        if (dt !== undefined) {
            assert (typeof dt === 'string', '"datetime" key does not have a string value' + logText);
            assert (dt === exchange.iso8601 (entry['timestamp']), 'datetime is not iso8601 of timestamp' + logText);
        }
    }
}

function assertCurrencyCode (exchange, skippedProperties, method, entry, actualCode, expectedCode = undefined) {
    const logText = logTemplate (exchange, method, entry);
    if (actualCode !== undefined) {
        assert (typeof actualCode === 'string', 'currency code should be either undefined or a string' + logText);
        assert ((actualCode in exchange.currencies), 'currency code should be present in exchange.currencies' + logText);
        if (expectedCode !== undefined) {
            assert (actualCode === expectedCode, 'currency code in response ("' + stringValue (actualCode) + '") should be equal to expected code ("' + stringValue (expectedCode) + '")' + logText);
        }
    }
}

function assertValidCurrencyIdAndCode (exchange, skippedProperties, method, entry, currencyId, currencyCode) {
    // this is exclusive exceptional key name to be used in `skip-tests.json`, to skip check for currency id and code
    if ('currencyIdAndCode' in skippedProperties) {
        return;
    }
    const logText = logTemplate (exchange, method, entry);
    const undefinedValues = currencyId === undefined && currencyCode === undefined;
    const definedValues = currencyId !== undefined && currencyCode !== undefined;
    assert (undefinedValues || definedValues, 'currencyId and currencyCode should be either both defined or both undefined' + logText);
    if (definedValues) {
        // check by code
        const currencyByCode = exchange.currency (currencyCode);
        assert (currencyByCode['id'] === currencyId, 'currencyId "' + stringValue (currencyId) + '" does not match currency of code: "' + stringValue (currencyCode) + '"' + logText);
        // check by id
        const currencyById = exchange.safeCurrency (currencyId);
        assert (currencyById['code'] === currencyCode, 'currencyCode ' + stringValue (currencyCode) + ' does not match currency of id: ' + stringValue (currencyId) + logText);
    }
}

function assertSymbol (exchange, skippedProperties, method, entry, key, expectedSymbol = undefined) {
    if (key in skippedProperties) {
        return;
    }
    const logText = logTemplate (exchange, method, entry);
    const actualSymbol = exchange.safeString (entry, key);
    if (actualSymbol !== undefined) {
        assert (typeof actualSymbol === 'string', 'symbol should be either undefined or a string' + logText);
        assert ((actualSymbol in exchange.markets), 'symbol should be present in exchange.symbols' + logText);
    }
    if (expectedSymbol !== undefined) {
        assert (actualSymbol === expectedSymbol, 'symbol in response ("' + stringValue (actualSymbol) + '") should be equal to expected symbol ("' + stringValue (expectedSymbol) + '")' + logText);
    }
}

function assertGreater (exchange, skippedProperties, method, entry, key, compareTo) {
    if (key in skippedProperties) {
        return;
    }
    const logText = logTemplate (exchange, method, entry);
    const value = exchange.safeString (entry, key);
    if (value !== undefined) {
        assert (Precise.stringGt (value, compareTo), stringValue (key) + ' key (with a value of ' + stringValue (value) + ') was expected to be > ' + stringValue (compareTo) + logText);
    }
}

function assertGreaterOrEqual (exchange, skippedProperties, method, entry, key, compareTo) {
    if (key in skippedProperties) {
        return;
    }
    const logText = logTemplate (exchange, method, entry);
    const value = exchange.safeString (entry, key);
    if (value !== undefined) {
        assert (Precise.stringGe (value, compareTo), stringValue (key) + ' key (with a value of ' + stringValue (value) + ') was expected to be >= ' + stringValue (compareTo) + logText);
    }
}

function assertLess (exchange, skippedProperties, method, entry, key, compareTo) {
    if (key in skippedProperties) {
        return;
    }
    const logText = logTemplate (exchange, method, entry);
    const value = exchange.safeString (entry, key);
    if (value !== undefined) {
        assert (Precise.stringLt (value, compareTo), stringValue (key) + ' key (with a value of ' + stringValue (value) + ') was expected to be < ' + stringValue (compareTo) + logText);
    }
}

function assertLessOrEqual (exchange, skippedProperties, method, entry, key, compareTo) {
    if (key in skippedProperties) {
        return;
    }
    const logText = logTemplate (exchange, method, entry);
    const value = exchange.safeString (entry, key);
    if (value !== undefined) {
        assert (Precise.stringLe (value, compareTo), stringValue (key) + ' key (with a value of ' + stringValue (value) + ') was expected to be <= ' + stringValue (compareTo) + logText);
    }
}

function assertEqual (exchange, skippedProperties, method, entry, key, compareTo) {
    if (key in skippedProperties) {
        return;
    }
    const logText = logTemplate (exchange, method, entry);
    const value = exchange.safeString (entry, key);
    if (value !== undefined) {
        assert (Precise.stringEq (value, compareTo), stringValue (key) + ' key (with a value of ' + stringValue (value) + ') was expected to be equal to ' + stringValue (compareTo) + logText);
    }
}

function assertNonEqual (exchange, skippedProperties, method, entry, key, compareTo) {
    if (key in skippedProperties) {
        return;
    }
    const logText = logTemplate (exchange, method, entry);
    const value = exchange.safeString (entry, key);
    if (value !== undefined) {
        assert (!Precise.stringEq (value, compareTo), stringValue (key) + ' key (with a value of ' + stringValue (value) + ') was expected not to be equal to ' + stringValue (compareTo) + logText);
    }
}

function assertInArray (exchange, skippedProperties, method, entry, key, expectedArray) {
    if (key in skippedProperties) {
        return;
    }
    const logText = logTemplate (exchange, method, entry);
    const value = exchange.safeValue (entry, key);
    // todo: remove undefined check
    if (value !== undefined) {
        const stingifiedArrayValue = exchange.json (expectedArray); // don't use expectedArray.join (','), as it bugs in other languages, if values are bool, undefined or etc..
        assert (exchange.inArray (value, expectedArray), '"' + stringValue (key) + '" key (value "' + stringValue (value) + '") is not from the expected list : [' + stingifiedArrayValue + ']' + logText);
    }
}

function assertFeeStructure (exchange, skippedProperties, method, entry, key) {
    const logText = logTemplate (exchange, method, entry);
    const keyString = stringValue (key);
    if (isInteger (key)) {
        assert (Array.isArray (entry), 'fee container is expected to be an array' + logText);
        assert (key < entry.length, 'fee key ' + keyString + ' was expected to be present in entry' + logText);
    } else {
        assert (typeof entry === 'object', 'fee container is expected to be an object' + logText);
        assert (key in entry, 'fee key "' + key + '" was expected to be present in entry' + logText);
    }
    const feeObject = exchange.safeValue (entry, key);
    // todo: remove undefined check to make stricter
    if (feeObject !== undefined) {
        assert ('cost' in feeObject, keyString + ' fee object should contain "cost" key' + logText);
        assertGreaterOrEqual (exchange, skippedProperties, method, feeObject, 'cost', '0');
        assert ('currency' in feeObject, '"' + keyString + '" fee object should contain "currency" key' + logText);
        assertCurrencyCode (exchange, skippedProperties, method, entry, feeObject['currency']);
    }
}

function assertTimestampOrder (exchange, method, codeOrSymbol, items, ascending = false) {
    for (let i = 0; i < items.length; i++) {
        if (i > 0) {
            const ascendingOrDescending = ascending ? 'ascending' : 'descending';
            const firstIndex = ascending ? i - 1 : i;
            const secondIndex = ascending ? i : i - 1;
            assert (items[firstIndex]['timestamp'] >= items[secondIndex]['timestamp'], exchange.id + ' ' + method + ' ' + stringValue (codeOrSymbol) + ' must return a ' + ascendingOrDescending + ' sorted array of items by timestamp. ' + exchange.json (items));
        }
    }
}

function assertInteger (exchange, skippedProperties, method, entry, key) {
    if (key in skippedProperties) {
        return;
    }
    const logText = logTemplate (exchange, method, entry);
    if (entry !== undefined) {
        const value = exchange.safeNumber (entry, key);
        if (value !== undefined) {
            assert (isInteger (value), '"' + stringValue (key) + '" key (value "' + stringValue (value) + '") is not an integer' + logText);
        }
    }
}

function checkPrecisionAccuracy (exchange, skippedProperties, method, entry, key) {
    if (key in skippedProperties) {
        return;
    }
    const isTickSizePrecisionMode = exchange.precisionMode === TICK_SIZE;
    if (isTickSizePrecisionMode) {
        // TICK_SIZE should be above zero
        assertGreater (exchange, skippedProperties, method, entry, key, '0');
        // the below array of integers are inexistent tick-sizes (theoretically technically possible, but not in real-world cases), so their existence in our case indicates to incorrectly implemented tick-sizes, which might mistakenly be implemented with DECIMAL_PLACES, so we throw error
        const decimalNumbers = [ '2', '3', '4', '6', '7', '8', '9', '11', '12', '13', '14', '15', '16' ];
        for (let i = 0; i < decimalNumbers.length; i++) {
            const num = decimalNumbers[i];
            const numStr = num;
            assertNonEqual (exchange, skippedProperties, method, entry, key, numStr);
        }
    } else {
        assertInteger (exchange, skippedProperties, method, entry, key); // should be integer
        assertLessOrEqual (exchange, skippedProperties, method, entry, key, '18'); // should be under 18 decimals
        assertGreaterOrEqual (exchange, skippedProperties, method, entry, key, '-8'); // in real-world cases, there would not be less than that
    }
}

export default {
    logTemplate,
    assertTimestamp,
    assertStructure,
    assertSymbol,
    assertCurrencyCode,
    assertInArray,
    assertFeeStructure,
    assertTimestampOrder,
    assertGreater,
    assertGreaterOrEqual,
    assertLess,
    assertLessOrEqual,
    assertEqual,
    assertNonEqual,
    assertInteger,
    checkPrecisionAccuracy,
    assertValidCurrencyIdAndCode,
    assertType,
};
