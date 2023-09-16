// var crypto = require('crypto');
var CryptoJS = require('crypto-js');

var CryptoLib = function () { };
module.exports = CryptoLib;

/**
 * Encrypt plain string to md5 string
 * @param {*} str 
 * @return string
 */
CryptoLib.SHA3 = function SHA3(plainText) {
    // var sha256 = crypto.createHash("sha256");
    return CryptoJS.SHA3(plainText, { outputLength: 512 }).toString(CryptoJS.enc.Hex);
    // sha256.update(str);
    // var str = sha256.digest('hex');
    // return str;
}

// CryptoLib.generateSalt = function (nChar) {
//     return crypto.randomBytes(nChar).toString('hex');
// };



/**
 * encrypt text to base64
 * @param plaintext 
 * @return string
 */
CryptoLib.base64Encrypt = function (plaintext) {
    var base64Txt = Buffer.from(plaintext).toString('base64');
    return base64Txt;
}
/**
 * decrypt to plain text from base64
 * @param {*} ciph 
 * @return string
 */
CryptoLib.base64Decrypt = function (ciph) {
    var txt = Buffer.from(ciph, 'base64').toString('utf-8');
    return txt;
}
/**
 * Encrypt plain string to md5 string
 * @param {*} str 
 * @return string
 */
// CryptoLib.md5 = function md5(str) {
//     var md5 = crypto.createHash("md5");
//     md5.update(str);
//     var str = md5.digest('hex');
//     return str.toUpperCase();  //32 ký tự viết hoa  
// }

/**
 * AES Encrypt plain string to AES string
 * @param {*} str 
 * @return string
 */
// CryptoLib.AESEncrypt = function AESEncrypt(str, secretKey) {
//     var string = CryptoJS.AES.encrypt(str, secretKey).toString();
//     return string;
// }


/**
 * AES Decrypt plain string to AES string
 * @param {*} str 
 * @return string
 */
// CryptoLib.AESDecrypt = function AESDecrypt(str, secretKey) {
//     var bytes = CryptoJS.AES.decrypt(str.toString(), secretKey);
//     var plaintext = bytes.toString(CryptoJS.enc.Utf8);
//     return plaintext;
// }



// var md5 = md5('hello world','test');
// console.log(md5);
// var hw = encrypt("hello world")
// console.log(hw);
// // outputs hello world
// console.log(decrypt(hw));