using ccxt;
namespace Tests;

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code


public partial class testMainClass : BaseTest
{
    public static void testAccount(Exchange exchange, object skippedProperties, object method, object entry)
    {
        object format = new Dictionary<string, object>() {
            { "info", new Dictionary<string, object>() {} },
            { "code", "BTC" },
            { "type", "spot" },
            { "id", "12345" },
        };
        object emptyAllowedFor = new List<object>() {"code", "id"};
        testSharedMethods.assertStructure(exchange, skippedProperties, method, entry, format, emptyAllowedFor);
        testSharedMethods.assertCurrencyCode(exchange, skippedProperties, method, entry, getValue(entry, "code"));
    }

}