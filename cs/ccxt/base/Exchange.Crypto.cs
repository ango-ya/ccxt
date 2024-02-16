using System.Text;
using System.Security.Cryptography;
using System.IO.Compression;

namespace ccxt;

public partial class Exchange
{

    public static string sha1() => "sha1";
    public static string sha256() => "sha256";
    public static string sha384() => "sha384";
    public static string sha512() => "sha512";
    public static string md5() => "md5";
    public static string ed25519() => "ed25519";
    public static string keccak() => "keccak";
    public static string secp256k1() => "secp256k1";

    public static string Hmac(object request2, object secret2, Delegate algorithm2 = null, string digest = "hex")
    {
        var request = request2 as String;
        Byte[] secretBytes;
        if (secret2 is String)
        {
            secretBytes = Encoding.ASCII.GetBytes((string)secret2);
        }
        else
        {
            secretBytes = secret2 as Byte[];
        }
        // var secretBytes = Encoding.ASCII.GetBytes((string)secret2);

        var algorithm = "md5";
        if (algorithm2 != null)
        {
            algorithm = algorithm2.DynamicInvoke() as String;
        }

        var signature = new Byte[] { };
        switch (algorithm)
        {
            case "sha256":
                signature = SignHMACSHA256(request, secretBytes);
                break;
            case "sha512":
                signature = SignHMACSHA512(request, secretBytes);
                break;
            case "sha384":
                signature = SignHMACSHA384(request, secretBytes);
                break;
            case "md5":
                signature = SignHMACMD5(request, secretBytes);
                break;
        }

        return digest == "hex" ? binaryToHex(signature) : binaryToBase64(signature);
    }

    public string hmac(object request2, object secret2, Delegate algorithm2 = null, string digest = "hex") => Hmac(request2, secret2, algorithm2, digest);

    public string hash(object request2, Delegate algorithm2 = null, object digest2 = null) => Hash(request2, algorithm2, digest2);

    public static string Hash(object request2, Delegate hash = null, object digest2 = null)
    {
        var request = request2 as String;
        var algorithm = hash.DynamicInvoke() as string;
        digest2 ??= "hex";
        var digest = digest2 as String;
        var signature = new Byte[] { };
        switch (algorithm)
        {
            case "sha256":
                signature = SignSHA256(request);
                break;
            case "sha512":
                signature = SignSHA512(request);
                break;
            case "sha384":
                signature = SignSHA384(request);
                break;
            case "sha1":
                signature = SignSHA1(request);
                break;
            case "md5":
                signature = SignMD5(request);
                break;
        }

        return digest == "hex" ? binaryToHex(signature) : binaryToBase64(signature);
    }


    public string jwt(object data, object secret, Delegate alg = null, bool isRsa = false) => Jwt(data, secret, alg, isRsa);

    public static string Jwt(object data, object secret, Delegate hash = null, bool isRsa = false)
    {
        var algorithm = hash.DynamicInvoke() as string;
        var alg = (isRsa ? "RS" : "HS") + algorithm.Substring(3).ToUpper();
        var header = Exchange.Json(new Dictionary<string, object> {
            {"alg" , alg},
            {"typ", "JWT"}
        });
        var encodedHeader = Exchange.Base64urlEncode(Exchange.StringToBase64(header));
        var encodedData = Exchange.Base64urlEncode(Exchange.StringToBase64(Exchange.Json(data)));
        var token = encodedHeader + "." + encodedData;
        string signature = null;
        if (isRsa)
        {
            signature = Exchange.Base64urlEncode(Exchange.Rsa(token, secret, hash));
        }
        else
        {
            signature = Exchange.Base64urlEncode(Exchange.Hmac(token, secret, hash, "binary"));
        }
        var res = token + "." + signature;
        return res;
    }

    public static byte[] SignSHA256Bytes(string data)
    {
        using var encryptor = SHA256.Create();
        return encryptor.ComputeHash(Encoding.UTF8.GetBytes(data));
    }

    public static byte[] SignSHA256(string data)
    {
        using var encryptor = SHA256.Create();
        var resultBytes = encryptor.ComputeHash(Encoding.UTF8.GetBytes(data));
        return resultBytes;
    }

    public static byte[] SignSHA1(string data)
    {
        using var encryptor = SHA1.Create();
        var resultBytes = encryptor.ComputeHash(Encoding.UTF8.GetBytes(data));
        return resultBytes;
    }

    public static byte[] SignSHA384(string data)
    {
        using var encryptor = SHA384.Create();
        var resultBytes = encryptor.ComputeHash(Encoding.UTF8.GetBytes(data));
        return resultBytes;
    }

    public static byte[] SignSHA512(string data)
    {
        using var encryptor = SHA512.Create();
        var resultBytes = encryptor.ComputeHash(Encoding.UTF8.GetBytes(data));
        return resultBytes;
    }

    public static byte[] SignMD5(string data)
    {
        using var encryptor = MD5.Create();
        var resultBytes = encryptor.ComputeHash(Encoding.UTF8.GetBytes(data));
        return resultBytes;
    }

    public static byte[] SignHMACSHA256(string data, byte[] secret)
    {
        using var encryptor = new HMACSHA256(secret);
        var resultBytes = encryptor.ComputeHash(Encoding.UTF8.GetBytes(data));
        return resultBytes;
    }

    public static byte[] SignHMACSHA384(string data, byte[] secret)
    {
        using var encryptor = new HMACSHA384(secret);
        var resultBytes = encryptor.ComputeHash(Encoding.UTF8.GetBytes(data));
        return resultBytes;
    }

    public static byte[] SignHMACSHA512(string data, byte[] secret)
    {
        using var encryptor = new HMACSHA512(secret);
        var resultBytes = encryptor.ComputeHash(Encoding.UTF8.GetBytes(data));
        return resultBytes;
    }

    public static byte[] SignHMACMD5(string data, byte[] secret)
    {
        using var encryptor = new HMACMD5(secret);
        var resultBytes = encryptor.ComputeHash(Encoding.UTF8.GetBytes(data));
        return resultBytes;
    }

    public string rsa(object request, object secret, Delegate alg = null) => Rsa(request, secret, alg);

    public static string Rsa(object data, object publicKey, Delegate hash = null)
    {
        var pk = ((string)publicKey);
        var pkParts = pk.Split(new[] { ((string)"\n") }, StringSplitOptions.None).ToList();
        pkParts.RemoveAt(0);
        pkParts.RemoveAt(pkParts.Count - 1);
        var newPk = string.Join("", pkParts);
        byte[] Data = Encoding.UTF8.GetBytes((string)data);
        byte[] privatekey;
        privatekey = Convert.FromBase64String(newPk);
        // https://gist.github.com/GaiaAnn/29071961482462ff5334a121bd103166
        RSACryptoServiceProvider rsa = DecodeRSAPrivateKey(privatekey);
        object sh;
        var algorithm = "md5";
        if (hash != null)
        {
            algorithm = hash.DynamicInvoke() as String;
        }

        if (algorithm == "sha1")
        {
            sh = new SHA1CryptoServiceProvider();
        }
        else if (algorithm == "sha256")
        {
            sh = new SHA256CryptoServiceProvider();
        }
        else if (algorithm == "sha384")
        {
            sh = new SHA384CryptoServiceProvider();
        }
        else if (algorithm == "sha512")
        {
            sh = new SHA512CryptoServiceProvider();
        }
        else if (algorithm == "md5")
        {
            sh = new MD5CryptoServiceProvider();
        }
        else
        {
            throw new ArgumentException("Invalid hash algorithm name");
        }
        byte[] signData = rsa.SignData(Data, sh);

        return Convert.ToBase64String(signData);
    }

    private static HashAlgorithmName stringToHashAlgorithmName(string hashAlgorithmName)
    {
        switch (hashAlgorithmName)
        {
            case "sha256":
                return HashAlgorithmName.SHA256;
            case "sha384":
                return HashAlgorithmName.SHA384;
            case "sha512":
                return HashAlgorithmName.SHA512;
            case "sha1":
                return HashAlgorithmName.SHA1;
            case "md5":
                return HashAlgorithmName.MD5;
            default:
                throw new ArgumentException("Invalid hash algorithm name");
        }
    }

    public static byte[] StringToByteArray(string hex)
    {
        return Enumerable.Range(0, hex.Length)
                         .Where(x => x % 2 == 0)
                         .Select(x => Convert.ToByte(hex.Substring(x, 2), 16))
                         .ToArray();
    }

    public string ecdsa(object request, object secret, Delegate alg = null, Delegate hash = null) => Ecdsa(request, secret, alg, hash);

    public static string Ecdsa(object request, object secret, Delegate curve = null, Delegate hash = null)
    {
        // if (hash != null)
        //     request = Hash(request, hash);
        // var bytesSecret = Encoding.UTF8.GetBytes((string)secret);
        // PrivateKey privateKey = PrivateKey.fromString(bytesSecret);
        // Signature signature = Ecdsa.sign((string)request, privateKey);
        // var sec = (string)secret;
        // var curveName = curve.DynamicInvoke() as string ?? "secp256k1";
        // var omg = StringToByteArray(sec);
        // ECDsa key = ECDsa.Create(stringToCurve(curveName));
        // var be = Encoding.BigEndianUnicode.GetString(omg);
        // var beBytes = Encoding.BigEndianUnicode.GetBytes(be);
        // key.ImportParameters(new ECParameters
        // {
        //     Curve = stringToCurve(curveName),
        //     D = beBytes,
        // });
        // key.ImportECPrivateKey(beBytes, out _);
        // var dataBytes = Encoding.UTF8.GetBytes((string)request);
        // var signature = key.SignHash(dataBytes);
        // var signatureString = binaryToBase64(signature);
        // var newSign = ByteArrayToString(signature);
        // return signatureString;
        return String.Empty;
    }

    public static string ByteArrayToString(byte[] ba)
    {
        return BitConverter.ToString(ba).Replace("-", "");
    }

    private static ECCurve stringToCurve(string curve)
    {
        switch (curve)
        {
            case "secp256k1":
                return ECCurve.NamedCurves.nistP256;
            case "secp256r1":
                return ECCurve.NamedCurves.nistP256;
            case "secp384r1":
                return ECCurve.NamedCurves.nistP384;
            case "secp521r1":
                return ECCurve.NamedCurves.nistP521;
            default:
                throw new ArgumentException("Invalid curve name");
        }
    }

    public object signMessageString(object str, object privateKey = null)
    {
        return (string)str; // stub
    }

    public object eddsa(object request, object secret, object alg = null)
    {
        // ECDsa key = ECDsa.Create(ECCurve.NamedCurves.nistP256);
        alg ??= "EdDSA";
        return null;
        // stub
    }

    public int crc32(object str, object signed2 = null) => Crc32(str, signed2);

    public static int Crc32(object str, object signed2 = null)
    {
        var signed = (signed2 == null) ? false : (bool)signed2;
        // var data = Encoding.UTF8.GetBytes((string)str);
        var crc = CalculateCrc32((string)str);
        return crc;
    }

    public static int CalculateCrc32(string data, int? bound = null)
    {
        // https://gist.github.com/martin31821/6a4736521043233bf7cdc05aa785149d
        var s_generator = 0xEDB88320;
        var m_checksumTable = Enumerable.Range(0, 256).Select(i =>
        {
            var tableEntry = (uint)i;
            for (var j = 0; j < 8; ++j)
            {
                tableEntry = ((tableEntry & 1) != 0)
                    ? (s_generator ^ (tableEntry >> 1))
                    : (tableEntry >> 1);
            }
            return tableEntry;
        }).ToArray();


        var arrayOfBytes = Encoding.ASCII.GetBytes(data);
        var result = ~arrayOfBytes.Aggregate(0xFFFFFFFF, (checksumRegister, currentByte) =>
                      (m_checksumTable[(checksumRegister & 0xFF) ^ Convert.ToByte(currentByte)] ^ (checksumRegister >> 8)));
        return (int)result;
    }

    private static RSACryptoServiceProvider DecodeRSAPrivateKey(byte[] privkey)
    {
        byte[] MODULUS, E, D, P, Q, DP, DQ, IQ;

        // ---------  Set up stream to decode the asn.1 encoded RSA private key  ------
        MemoryStream mem = new MemoryStream(privkey);
        BinaryReader binr = new BinaryReader(mem);    //wrap Memory Stream with BinaryReader for easy reading
        byte bt = 0;
        ushort twobytes = 0;
        int elems = 0;
        try
        {
            twobytes = binr.ReadUInt16();
            if (twobytes == 0x8130) //data read as little endian order (actual data order for Sequence is 30 81)
                binr.ReadByte();    //advance 1 byte
            else if (twobytes == 0x8230)
                binr.ReadInt16();   //advance 2 bytes
            else
                return null;

            twobytes = binr.ReadUInt16();
            if (twobytes != 0x0102) //version number
                return null;
            bt = binr.ReadByte();
            if (bt != 0x00)
                return null;


            //------  all private key components are Integer sequences ----
            elems = GetIntegerSize(binr);
            MODULUS = binr.ReadBytes(elems);

            elems = GetIntegerSize(binr);
            E = binr.ReadBytes(elems);

            elems = GetIntegerSize(binr);
            D = binr.ReadBytes(elems);

            elems = GetIntegerSize(binr);
            P = binr.ReadBytes(elems);

            elems = GetIntegerSize(binr);
            Q = binr.ReadBytes(elems);

            elems = GetIntegerSize(binr);
            DP = binr.ReadBytes(elems);

            elems = GetIntegerSize(binr);
            DQ = binr.ReadBytes(elems);

            elems = GetIntegerSize(binr);
            IQ = binr.ReadBytes(elems);

            // ------- create RSACryptoServiceProvider instance and initialize with public key -----
            RSACryptoServiceProvider RSA = new RSACryptoServiceProvider();
            RSAParameters RSAparams = new RSAParameters();
            RSAparams.Modulus = MODULUS;
            RSAparams.Exponent = E;
            RSAparams.D = D;
            RSAparams.P = P;
            RSAparams.Q = Q;
            RSAparams.DP = DP;
            RSAparams.DQ = DQ;
            RSAparams.InverseQ = IQ;
            RSA.ImportParameters(RSAparams);
            return RSA;
        }
        catch (Exception)
        {
            return null;
        }
        finally { binr.Close(); }
    }

    private static int GetIntegerSize(BinaryReader binr)
    {
        byte bt = 0;
        byte lowbyte = 0x00;
        byte highbyte = 0x00;
        int count = 0;
        bt = binr.ReadByte();
        if (bt != 0x02)     //expect integer
            return 0;
        bt = binr.ReadByte();

        if (bt == 0x81)
            count = binr.ReadByte();    // data size in next byte
        else
            if (bt == 0x82)
        {
            highbyte = binr.ReadByte(); // data size in next 2 bytes
            lowbyte = binr.ReadByte();
            byte[] modint = { lowbyte, highbyte, 0x00, 0x00 };
            count = BitConverter.ToInt32(modint, 0);
        }
        else
        {
            count = bt;     // we already have the data size
        }



        while (binr.ReadByte() == 0x00)
        {   //remove high order zeros in data
            count -= 1;
        }
        binr.BaseStream.Seek(-1, SeekOrigin.Current);       //last ReadByte wasn't a removed zero, so back up a byte
        return count;
    }

    public object axolotl(object a, object b, object c)
    {
        return ""; // to be implemented
    }

    public static object inflate(object data)
    {
        var compressedMessage = Encoding.UTF8.GetBytes((string)data);
        using (var compressedStream = new MemoryStream(compressedMessage))
        using (var deflateStream = new DeflateStream(compressedStream, CompressionMode.Decompress))
        using (var resultStream = new MemoryStream())
        {
            deflateStream.CopyTo(resultStream);
            return resultStream.ToArray();
        }
    }
}
