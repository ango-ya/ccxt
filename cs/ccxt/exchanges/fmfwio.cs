namespace ccxt;

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

public partial class fmfwio : hitbtc
{
    public override object describe()
    {
        return this.deepExtend(base.describe(), new Dictionary<string, object>() {
            { "id", "fmfwio" },
            { "name", "FMFW.io" },
            { "countries", new List<object>() {"KN"} },
            { "urls", new Dictionary<string, object>() {
                { "logo", "https://user-images.githubusercontent.com/1294454/159177712-b685b40c-5269-4cea-ac83-f7894c49525d.jpg" },
                { "api", new Dictionary<string, object>() {
                    { "public", "https://api.fmfw.io/api/3" },
                    { "private", "https://api.fmfw.io/api/3" },
                } },
                { "www", "https://fmfw.io" },
                { "doc", "https://api.fmfw.io/" },
                { "fees", "https://fmfw.io/fees-and-limits" },
                { "referral", "https://fmfw.io/referral/da948b21d6c92d69" },
            } },
            { "fees", new Dictionary<string, object>() {
                { "trading", new Dictionary<string, object>() {
                    { "maker", this.parseNumber("0.005") },
                    { "taker", this.parseNumber("0.005") },
                } },
            } },
        });
    }
}
