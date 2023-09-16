// import React from 'react';
var formatNum = require('format-number');
const roundTo = require('round-to');
const moment = require("moment");
// import { toast } from 'react-toastify';
var Libs = {};

/**
 * trim string
 * @param str
 * @returns
 */
Libs.safeTrim = (str) => {
	try {
		return (typeof str === 'string') ? str.trim() : str.toString();
	} catch (e) {
		return "";
	}
};

/**
 * check blank object or string
 * @param str
 * @returns {Boolean}
 */
Libs.isBlank = (str) => {
	if (typeof str === undefined || str === null || Libs.safeTrim(str) === "") {
		return true;
	}

	return false;
};


/**
 * Check valid object
 * @param {*} obj 
 */
Libs.isObjectEmpty = (obj) => {
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	if (obj == null) return true;
	if (obj.length > 0) return false;
	if (obj.length === 0) return true;
	if (typeof obj !== "object") return true;
	for (var key in obj) {
		if (hasOwnProperty.call(obj, key)) return false;
	}
	return true;
}

/**
 * Find objects in arrays by value and field
 * @param items
 * @param field
 * @param value
 * @returns
 */
Libs.find = function (items, field, value) {
	if (!items)
		return null;
	for (var i = 0; i < items.length; i++) {
		if (value === items[i][field]) {
			return items[i];
		}
	}
	return null;
};

/**
 * @description Check the array data 
 * @param Array arr
 * @author: Luyen Nguyen
 * @return boolean
 */
Libs.isArrayData = function (arr) {
	if (Libs.isBlank(arr)) return false;
	if (!Array.isArray(arr) || arr.length <= 0) return false;
	return true;
}

Libs.isNumber = function (value) {
	try {
		var val = value;
		if (typeof val === 'undefined' || val === null) return false;
		if (typeof val === 'number') {
			val = val.toString();
		}
		val = val.replace(/^-/, '');
		return /^[0-9\b]+$/.test(val);
	} catch (err) {
		return false;
	}
}

/**
* @description Check ext file upload
* @author Long.Pham 10/05/2021
* @param  String file_name: file name
* @param  {int} ext_type: undefined: all file, 1: only image, 2: only file, 3: video
*/
Libs.checkExtensionFile = function (file_name, ext_type) {
	if (file_name === 'undefined' || file_name === null) return;
	var extImg = ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG', 'gif', 'GIF'];
	var extFile = ['xlsx', 'xls', 'XLSX', 'XLS', 'doc', 'DOC', 'docs', 'DOCS', 'pdf', 'PDF'];
	var extAll = ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG', 'gif', 'GIF', 'doc', 'DOC', 'docs', 'DOCS', 'docx', 'DOCX', 'pdf', 'PDF', 'mp4', 'MP4', 'avi', 'AVI'];
	var extVideo = ['mp4', 'MP4', 'avi', 'AVI'];
	var ext = file_name.substr((file_name.lastIndexOf('.') + 1));
	if (ext_type === 'undefined' || ext_type === null) {
		for (let i = 0; i < extAll.length; i++) {
			if (ext === extAll[i]) {
				return true;
			}
		}
	}
	else if (ext_type === 1) {
		for (let i = 0; i < extImg.length; i++) {
			if (ext === extImg[i]) {
				return true;
			}
		}
	}
	else if (ext_type === 2) {
		for (let i = 0; i < extFile.length; i++) {
			if (ext === extFile[i]) {
				return true;
			}
		}
	}
	else if (ext_type === 3) {
		for (let i = 0; i < extVideo.length; i++) {
			if (ext === extVideo[i]) {
				return true;
			}
		}
	}
	return false;
}

Libs.convertStringToNumber = function (value) {
	try {
		var val = value;
		if (typeof val === 'undefined' || val == null) return null;
		if (typeof val === 'number') {
			val = val.toString();
		}
		return Number(val.replace(/[^0-9]+/g, ""));
	} catch (err) {
		return null;
	}
}

/**
* Format number according to the format option in formatNum format of the library
* By default #, ###. ## separated by commas, spread after decimal 2 digits
*
* @param {String} val
* @param {String} pattern default #,###.##
* @param {int} round default 0: Default rounding -1: rounding down, 1: rounding up
* @author:  MinhPham 2018-11-18 11:16:34 
*/
Libs.formatNum = function (val, pattern = "#,###.##", round = 0) {
	if (Libs.isBlank(val) || isNaN(val)) {
		return "";
	}
	val = val * 1;
	let comma = ','
	let decimal = '.'
	let afterDecimalNum = 0;//After the decimal point take some numbers
	if (Libs.isBlank(pattern)) {
		pattern = "#,###.##";
	}
	const regex = new RegExp("[,.]+", "ig");
	let myArray;
	let index = 0;
	let afterDecimal = "";
	while ((myArray = regex.exec(pattern)) !== null) {
		//The first time is the comma
		if (index === 0) {
			comma = myArray[0];
		} else if (comma !== myArray[0]) {
			//The last time is the decimal separator
			afterDecimal = myArray[0];
		}
		index++;
	}
	if (afterDecimal !== "") {
		decimal = afterDecimal;
		afterDecimalNum = pattern.length - (pattern.lastIndexOf(decimal) + 1)
	}

	var opts = {
		"negativeType": 'left',
		"prefix": '',
		"suffix": '',
		"integerSeparator": comma,
		"decimalsSeparator": '',
		"decimal": decimal,
		"padLeft": -1,
		"round": afterDecimalNum
	};
	if (round === 1) {
		val = roundTo.up(val, afterDecimalNum);
	} else if (round === 0) {
		val = roundTo(val, afterDecimalNum);
	} else {
		val = roundTo.down(val, afterDecimalNum);
	}

	return formatNum(opts)(val);
}

/**
 * string format
 * ex: let a = Libs.stringAssign("hello $<0> $<1>", ["world","rrr"])
 * @param {string template} str 
 * @param {Array} data 
 * @param {regex} REG_ASSIGN_VARIBLE 
 */
Libs.stringAssign = function (str, data, REG_ASSIGN_VARIBLE) {
	if (Libs.isBlank(REG_ASSIGN_VARIBLE)) {
		REG_ASSIGN_VARIBLE = /\$\<([^{}]*?)\>/g;
	}
	return str.replace(REG_ASSIGN_VARIBLE, function ($0, $1) {
		return String(data[$1]);
	});
};


Libs.convertStrtoDate = (_date, format) => {
	if (null === _date || typeof _date === 'undefined' || _date === '') {
		return '';
	}
	let date = _date;
	if (typeof format === "undefined" || Libs.isBlank(format)) {
		let arrFormat = ["YYYY/MM/DD HH:mm:ss", "YYYY-MM-DD HH:mm:ss", "DD/MM/YYYY HH:mm:ss", "DD-MM-YYYY HH:mm:ss", "MM/DD/YYYY HH:mm:ss", "MM-DD-YYYY HH:mm:ss"]
		for (let i = 0; i < arrFormat.length; i++) {
			date = moment(_date, arrFormat[i]);
			if (date._isValid) {
				return date._d;
			}
		}
	} else {
		if (format.toLowerCase() === 'utc') {
			date = moment(_date);
		} else date = moment(_date, format);
		if (!date._isValid) {
			return _date;
		}
		return date._d;
	}
	return _date;
}


/**
  * format date to another format
  * @param {String} _date 
  * @param {String} format 
  * @param {String} from_format 
  */
Libs.dateFormat = (_date, format = "DD/MM/YYYY HH:mm:ss", from_format) => {
	if (null === _date || typeof _date === 'undefined' || _date === '') {
		return '';
	}
	let date = _date;
	if (typeof from_format === "undefined" || Libs.isBlank(from_format)) {
		let arrFormat = ["YYYY/MM/DD HH:mm:ss", "YYYY-MM-DD HH:mm:ss", "DD/MM/YYYY HH:mm:ss", "DD-MM-YYYY HH:mm:ss", "MM/DD/YYYY HH:mm:ss", "MM-DD-YYYY HH:mm:ss"]
		for (let i = 0; i < arrFormat.length; i++) {
			date = moment(_date, arrFormat[i]);
			if (date._isValid) {
				return date.format(format);
			}
		}
	} else {
		if (from_format.toLowerCase() === 'utc') {
			date = moment(_date);
		} else date = moment(_date, from_format);
		if (!date._isValid) {
			return _date;
		}
		return date.format(format);
	}
	return _date;
}

/**
 * Check input on/off 111111111 : nByte _________ 000000100 : bitIndex:2
 * =>pow(2,2){base 10}= 000000100{base 2} =========== 000000100=>input 3 is
 * on.
 *
 * @param nByte
 * @param bitIndex
 * @return
 */
Libs.checkBitOnOff = (nByte, bitIndex) => {
	let result = nByte & parseInt(Math.pow(2, bitIndex));
	return result != 0 ? true : false;
}

Libs.getCurrentDDMMYYYY = function () {
	let date = new Date();
	let year = date.getFullYear().toString();
	let month = (date.getMonth() + 1).toString().padStart(2, "0");
	let day = date.getDate().toString().padStart(2, "0");
	return day + "/" + month + "/" + year;
}


Libs.SHA3 = function (plainText) {
	if (typeof plainText === 'undefined') {
		return plainText;
	}
	var CryptoLib = require('./Crypto.js');
	return CryptoLib.SHA3(plainText);
}


/**
 * encrypt text to base64
 * @param plaintext 
 * @return string
 */
Libs.base64Encrypt = function (plaintext) {
	if (Libs.isBlank(plaintext)) {
		return plaintext;
	}
	var CryptoLib = require('./Crypto.js');
	return CryptoLib.base64Encrypt(plaintext);
}
/**
 * decrypt to plain text from base64
 * @param {*} ciph 
 * @return string
 */
Libs.base64Decrypt = function (ciph) {
	if (Libs.isBlank(ciph)) {
		return ciph;
	}
	var CryptoLib = require('./Crypto.js');
	return CryptoLib.base64Decrypt(ciph);
}
/**
 * @description Generate sku
 * @author: Long.Pham
 * @return str
 */
Libs.generateSKU = function (id_company, lenUpper) {

	var uniqId = Math.round(new Date().getTime() + (Math.random() * 100));
	var d = new Date();
	var n = d.getTime();
	var randomString = '';
	var uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	for (var i = 0; i < lenUpper; i++) {
		var randomUppercase = Math.floor(Math.random() * uppercase.length);
		randomString += uppercase.substring(randomUppercase, randomUppercase + 1);
	}

	return !Libs.isBlank(id_company) ? (id_company + randomString + uniqId) : (randomString + uniqId);
};

/**
 * @description Generate random string chữ hoa, chữ thường, số, ký tự đặc biệt
 * @author: Long.Pham
 * @return str
 */

Libs.generateStrRandom = function (lenUpper, lenLower, lenSpec, lenNumber) {
	var uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var lowercase = 'abcdefghijklmnopqrstuvwxyz';
	var specialChar = '!@#$%^&*(){}<>?';
	var charNumber = '0123456789';
	var randomString = '';
	for (let i = 0; i < lenUpper; i++) {
		var randomUppercase = Math.floor(Math.random() * uppercase.length);
		randomString += uppercase.substring(randomUppercase, randomUppercase + 1);
	}
	for (let i = 0; i < lenLower; i++) {
		var randomLowercase = Math.floor(Math.random() * lowercase.length);
		randomString += lowercase.substring(randomLowercase, randomLowercase + 1);
	}
	for (let i = 0; i < lenSpec; i++) {
		var randomSpecialChar = Math.floor(Math.random() * specialChar.length);
		randomString += specialChar.substring(randomSpecialChar, randomSpecialChar + 1);
	}
	for (let i = 0; i < lenNumber; i++) {
		var randomCharNumber = Math.floor(Math.random() * charNumber.length);
		randomString += charNumber.substring(randomCharNumber, randomCharNumber + 1);
	}
	var str = randomString.split("");
	return str.sort(function () { return 0.5 - Math.random() }).join("");
}

/**
 * Compare date
 * @author Long.Pham 2018-11-21
 * @param from_date  from date
 * @param format date format
 * @param to_date to date, default is current date
 * @returns -1: less, 0: equal, 1: bigger
 */
Libs.compareDate = function (from_date, format, to_date = null) {
	from_date = moment(from_date, format.toUpperCase());
	if (to_date == null) {
		to_date = moment(new Date()).startOf('day');;
	} else {
		to_date = moment(to_date, format);
	}
	if (from_date.isAfter(to_date)) {
		return 1;
	}
	if (from_date.isBefore(to_date)) {
		return -1;
	}
	return 0;
}

Libs.checkIfImageExists = function (url, callback) {
	const img = new Image();
	img.src = url;
	if (img.complete) {
		callback(true);
	} else {
		img.onload = () => {
			callback(true);
		};
		img.onerror = () => {
			callback(false);
		};
	}
};

Libs.checkImageExists = function (url) {
	this.checkIfImageExists(url, (exists) => {
		return exists ? true : false;
	});
}

/**
 * @description get current date
 * @author Long.Pham 2020-10-26
 * @return string date
 */
Libs.getCurrentMMDDYYYYHI = function () {
	let date = new Date();
	let year = date.getFullYear().toString();
	let month = (date.getMonth() + 1).toString().padStart(2, "0");
	let day = date.getDate().toString().padStart(2, "0");
	let hour = date.getHours().toString().padStart(2, "0");
	let mi = date.getMinutes().toString().padStart(2, "0");
	return month + "/" + day + "/" + year + " " + hour + ":" + mi;
}

/**
 * Add Minutes
 * @author Long.Pham 2020-10-26
 * @param date 
 * @param months
 * @returns date
 */
Libs.addMinutes = function (date, minutes) {
	var result = new Date(date);
	result.setMinutes(result.getMinutes() + minutes);
	return result;
}

/**
 * Add Days
 * @author Long.Pham 2020-10-26
 * @param date 
 * @param days
 * @returns date
 */
Libs.addDays = function (date, days) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

/**
 * Add Months
 * @author Long.Pham 2020-10-26
 * @param date 
 * @param months
 * @returns date
 */
Libs.addMonths = function (date, months) {
	var result = new Date(date);
	result.setMonth(result.getMonth() + months);
	return result;
}

/**
 * Add Years
 * @author Long.Pham 2020-10-26
 * @param date 
 * @param years
 * @returns date
 */
Libs.addYears = function (date, years) {
	var result = new Date(date);
	result.setFullYear(result.getFullYear() + years);
	return result;
}


/**
 * @description Convert Data to DB
 * @author Long.Pham 2020-10-26
 * @param {String} _date 
 * @param {String} format 
 * @param {String} from_format
 */
Libs.convertAllFormatDate = (_date, from_format = "MM/DD/YYYY HH:mm:ss", to_format = "YYYY-MM-DD HH:mm:ss") => {
	if (null == _date || typeof _date === 'undefined' || _date == '') {
		return '';
	}
	let date = moment(_date, from_format);
	if (!date._isValid) {
		return _date;
	}
	return date.format(to_format);
}


/**
 * Format electrical unit 
 * @author Long.Pham 2020-10-26
 * @param {double} data: data
 * @return {string}: format data
 */

Libs.formatElectricalUnit = function (data, prefix = '') {
	if (Libs.isBlank(data) || data <= 0) return "0 kW" + prefix;

	if (data < 1000) {
		return Number.parseFloat(data).toFixed(2) + " w" + prefix;
	} else if (data >= 1000 && data < 1000000) {
		return Number.parseFloat(data / 1000).toFixed(2) + " kW" + prefix;
	} else if (data >= 1000000 && data < 1000000000) {
		return Number.parseFloat(data / 1000000).toFixed(2) + " MW" + prefix;
	} else if (data >= 1000000000 && data < 1000000000000) {
		return Number.parseFloat(data / 1000000000).toFixed(2) + " GW" + prefix;
	}
	else if (data >= 1000000000000 && data < 1000000000000000) {
		return Number.parseFloat(data / 1000000000000).toFixed(2) + " TW" + prefix;
	}
}


Libs.getStringMonthNumber = function (number) {
	if (number <= 0 || number > 12) return null;
	var monthNameList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	return monthNameList[number - 1];
}

Libs.getUnique = function (arr, comp) {
	const unique = arr
		.map(e => e[comp])
		.map((e, i, final) => final.indexOf(e) === i && i)
		.filter(e => arr[e]).map(e => arr[e]);

	return unique;
}




/**
 * @description Generate random string
 * @author: Luyen Nguyen
 * @return str
 */
// Libs.generateStrRandom = function (len, charSet) {
// 	charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*?';
//     var randomString = '';
//     for (var i = 0; i < len; i++) {
//         var randomPoz = Math.floor(Math.random() * charSet.length);
//         randomString += charSet.substring(randomPoz,randomPoz+1);
//     }
//     return randomString;
// }


// Libs.baseUrl = function () {
// 	let url = "";
// 	const protocol = location.protocol;
// 	const API_HOST = process.api_host || Constants.API_HOST;
// 	const API_HTTP_PORT = process.api_http_port || Constants.API_HTTP_PORT;
// 	const API_HTTPS_PORT = process.api_https_port || Constants.API_HTTPS_PORT;
// 	if (protocol == 'https:') {
// 		url = protocol + "//" + API_HOST + ":" + API_HTTPS_PORT;
// 	} else {
// 		url = protocol + "//" + API_HOST + ":" + API_HTTP_PORT;
// 	}
// 	return url; 
// }


/**
 * @description Get file url
 * @author Long.Pham 14/06/2021
 * @param {string} filePath: file path
 */
Libs.getFileUrl = function (filePath, server_data) {
	if (Libs.isBlank(filePath)) return;
	return server_data + "/" + filePath;
}

// Libs.rEnter = (event) => {
// 	var _this = $(event.target);
// 	if (event.which === 13) {
// 		var sign = event.shiftKey ? -1 : 1;
// 		event.preventDefault();
// 		var fields = _this.parents('form:eq(0),body').find('input,textarea');
// 		var index = fields.index(_this);
// 		if (index > -1 && (index + 1 * sign) < fields.length)
// 			fields.eq(index + 1 * sign).focus();
// 	}
// }




// /**
//  * return json result
//  * @param unknown $status
//  * @param unknown $mess
//  * @param unknown $data
//  */
// Libs.returnJsonResult = (status, mess, data, total_row) => {
// 	var result = {};
// 	result.status = status;
// 	result.mess = mess ? mess : "";
// 	result.data = data ? data : "";
// 	result.total_row = total_row ? total_row : 0;
// 	return result;
// }

// Libs.convertObjectToJson = (object) => {
// 	return JSON.stringify(object);
// }




// /**
//  * Convert date to milisecond
//  */
// Libs.convertDateToMilliseconds = (date, char) => {
// 	var date = $("#datepicker").val().split("-");
// 	var f = new Date(date[2], date[1] - 1, date[0]);
// 	if (null == f || "undefined" === typeof f)
// 		return 0;
// 	return f.getTime();
// }

// Libs.convertMillisecondsToDataFormat = (milliseconds, isShowHour = true) => {
// 	milliseconds = parseInt(milliseconds);
// 	if (milliseconds == null || milliseconds == 0) return "";
// 	var dateObj = new Date(milliseconds);
// 	var day = (dateObj.getDate() < 10) ? ("0" + dateObj.getDate()) : dateObj.getDate();
// 	var month = (dateObj.getMonth() + 1 < 10) ? ("0" + (dateObj.getMonth() + 1)) : (dateObj.getMonth() + 1);
// 	var year = dateObj.getFullYear();
// 	var hour = (dateObj.getHours() < 10) ? ("0" + dateObj.getHours()) : dateObj.getHours();
// 	var minute = (dateObj.getMinutes() < 10) ? ("0" + dateObj.getMinutes()) : dateObj.getMinutes();
// 	var second = (dateObj.getSeconds() < 10) ? ("0" + dateObj.getSeconds()) : dateObj.getSeconds();
// 	if (isShowHour)
// 		return day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second;
// 	else
// 		return day + "/" + month + "/" + year
// }
// Libs.convertMillisecondsToDate = (time) => {
// 	var date = new Date(time);
// 	return date;
// }
// Libs.scrollToBottom = (your_div) => {

// 	var objDiv = your_div;
// 	//console.log("objDiv.scrollTop :" + objDiv.scrollTop);
// 	//console.log("objDiv.scrollHeight - objDiv.offsetHeight :" + (objDiv.scrollHeight - objDiv.offsetHeight));
// 	if (objDiv.scrollTop >= (objDiv.scrollHeight - objDiv.offsetHeight)) {
// 		return true;
// 	}
// 	return false;
// }
// Libs.convertStr2Date = (_date, _format, _delimiter) => {
// 	if (null == _date || typeof _date === 'undefined' || _date == '') {
// 		;
// 		return null;
// 	}
// 	var formatLowerCase = _format.toLowerCase();
// 	var formatItems = formatLowerCase.split(_delimiter);
// 	var dateItems = _date.split(_delimiter);
// 	var monthIndex = formatItems.indexOf("mm");
// 	var dayIndex = formatItems.indexOf("dd");
// 	var yearIndex = formatItems.indexOf("yyyy");
// 	var month = parseInt(dateItems[monthIndex]);
// 	month -= 1;
// 	var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
// 	return formatedDate;
// }
// Libs.getMillisecondsFromDataPickerFrom = (date, format) => {
// 	if (null == date || typeof date === "undefined") {
// 		return 0;
// 	}
// 	return new Date(date).getTime();
// }
// Libs.getMillisecondsFromDataPickerTo = (date, format) => {
// 	if (null == date || typeof date === "undefined") {
// 		return new Date().getTime() + 86400000;
// 	}
// 	return new Date(date).getTime() + 86400000;
// }


// Libs.getCurrentDDMMYYYY = function () {
// 	let date = new Date();
// 	let year = date.getFullYear().toString();
// 	let month = (date.getMonth() + 1).toString().padStart(2, "0");
// 	let day = date.getDate().toString().padStart(2, "0");
// 	return day + "/" + month + "/" + year;
// }

// Libs.getCurrentMMYYYY = function () {
// 	let date = new Date();
// 	let year = date.getFullYear().toString();
// 	let month = (date.getMonth() + 1).toString().padStart(2, "0");
// 	let day = date.getDate().toString().padStart(2, "0");
// 	return  month + "/" + year;
// }

// Libs.getCurrentDDMMYYYYHI = function () {
// 	let date = new Date();
// 	let year = date.getFullYear().toString();
// 	let month = (date.getMonth() + 1).toString().padStart(2, "0");
// 	let day = date.getDate().toString().padStart(2, "0");
// 	let hour = date.getHours().toString().padStart(2, "0");
// 	let mi = date.getMinutes().toString().padStart(2, "0");
// 	let ss = date.getSeconds().toString().padStart(2, "0");
// 	return day + "/" + month + "/" + year + " " + hour + ":" + mi;
// }


// 	return str.replace(REG_ASSIGN_VARIBLE, function ($0, $1) {
// 		return String(data[$1]);
// 	});
// };
// Libs.printError = (messages) => {
// 	if (!(messages instanceof Array)) {
// 		return "";
// 	}
// 	var str = "";
// 	if (messages.length > 0) {
// 		for (var me in messages) {
// 			var message = messages[me];
// 			for (var k in message) {
// 				str += message[k];
// 			}
// 		}
// 	}

// 	return str;
// }

// Libs.md5 = function (plainText) {
// 	if (typeof plainText === 'undefined') {
// 		return plainText;
// 	}
// 	var CryptoLib = require('./Crypto.js');
// 	return CryptoLib.md5(plainText);
// }


// Libs.AESEncrypt = function (plainText, secretKey) {
// 	if (typeof plainText === 'undefined' || typeof secretKey === 'undefined') {
// 		return plainText;
// 	}
// 	var CryptoLib = require('./Crypto.js');
// 	return CryptoLib.AESEncrypt(plainText, secretKey);
// }


// Libs.AESDecrypt = function (plainText, secretKey) {
// 	if (typeof plainText === 'undefined' || typeof secretKey === 'undefined') {
// 		return plainText;
// 	}
// 	var CryptoLib = require('./Crypto.js');
// 	return CryptoLib.AESDecrypt(plainText, secretKey);
// }


// /**
//  * encrypt
//  * @param plaintext 
//  * @return string
//  */
// Libs.encrypt = function (plaintext) {
// 	if (Libs.isBlank(plaintext)) {
// 		return plaintext;
// 	}
// 	var CryptoLib = require('./Crypto.js');
// 	return CryptoLib.encrypt(plaintext);
// }

// /**
//  * Taka Encode
//  * @param plaintext 
//  * @return string
//  */

// Libs.takaEncode = function (text) {
// 	if (Libs.isBlank(text)) {
// 		return text;
// 	}

// 	var chars = text.split('');
// 	let str = '';
// 	for (var i = 0; i < chars.length; i++) {
// 		var find = Libs.find(tableCode, 'id', chars[i]);
// 		if(find){
// 			str += find.value;
// 		}
// 	}
// 	return str;
// }


// /**
//  * Taka Decode
//  * @param plaintext 
//  * @return string
//  */

// Libs.takaDecode = function (text) {
// 	if (Libs.isBlank(text)) {
// 		return text;
// 	}
// 	let chars = [], str = '';
// 	var start = 0;
// 	for(var i = 0; i< text.length/ 3; i++){
// 		chars.push(text.substr(start, 3));
// 		start +=3;
// 	}

// 	for (var i = 0; i < chars.length; i++) {
// 		var find = Libs.find(tableCode, 'value', chars[i]);
// 		if(find){
// 			str += find.id;
// 		}
// 	}
// 	return str;
// }




// Libs.convertEmptyPropToNullProp = function (object) {
// 	if (typeof object != 'object') return {};
// 	for (var key in object) {
// 		object[key] = (object[key] === '') ? null : object[key];
// 	}
// 	return object;
// }







// Libs.isInteger = function (value) {
// 	try {
// 		var val = value;
// 		if (typeof val === 'undefined' || val == null) return false;
// 		if (typeof val === 'number') {
// 			val = val.toString();
// 		}
// 		val = val.replace(/^-/, '');
// 		return /^(0|[1-9]\d*)$/.test(val);
// 	} catch (err) {
// 		console.log(err)
// 		return false;
// 	}
// }

// /**
//  * Custom css to select tag using for compoent react-select
//  */
// Libs.customSelectStyles = {
// 	placeholder: styles => ({
// 		...styles,
// 		color: '#ccc'
// 	}),
// 	control: (styles, { data, isDisabled, isFocused, isSelected }) => {
// 		return {
// 			...styles,
// 			minHeight: '34px',
// 			borderColor: '#ccc !important',
// 			boxShadow: 'unset',
// 			backgroundColor: isDisabled ? '#e9ecef' : '#fff'
// 		}
// 	},
// 	clearIndicator: styles => ({
// 		...styles,
// 		padding: '4px 6px'
// 	}),
// 	dropdownIndicator: styles => ({
// 		...styles,
// 		padding: '4px 6px'
// 	}),
// 	container: styles => ({
// 		...styles,
// 		'z-index': '2000',
// 		'position': 'relative'
// 	})
// }

// Libs.buildPathValidateMessage = function (path, message) {
// 	if (typeof path !== 'string' || typeof message !== 'string')
// 		return null;
// 	if (path.length <= 0) return null;
// 	var validate = {};
// 	validate[path] = message;
// 	return validate;
// }

// /**
// * @description get content height
// * If passing classname, height will be calculated by screen height except offset top of first name class
// * The remaining classnames are deducted for the remaining classname's height
// * ex: Libs.getContentHeight("className1","className2",...)
// * @author Luyen Nguyen 2018-09-24 16:10
// */
// Libs.getContentHeight = function () {

// 	var contentInner = $('#main-container .content-inner');
// 	if (contentInner === 'undefined' || contentInner == null && contentInner === '') {
// 		return;
// 	}
// 	let contentInnerHeight = (contentInner.innerHeight() ? contentInner.height() : 0)
// 	if (!arguments || arguments.length <= 0) {
// 		return contentInnerHeight;
// 	}
// 	var footerGroup = $('.fl-btn-group');
// 	if (!footerGroup || footerGroup.length <= 0) {
// 		return contentInnerHeight;
// 	}

// 	var footerOffsetTop = $(footerGroup[footerGroup.length - 1]).offset().top * 1
// 	var minHeight = null;
// 	var elementHeight = 0;
// 	for (let i = 0; i < arguments.length; i++) {
// 		let className = arguments[i];
// 		if (!Libs.isBlank(className) && !Libs.isInteger(className)) {
// 			//ưu tiên className
// 			var elements = $('.' + className);
// 			if (!elements || elements.length <= 0) {
// 				//tiến hành lấy theo id
// 				elements = $('#' + className);
// 			}
// 			if (elements !== 'undefined' && elements != null && elements != '') {
// 				elements.each(function () {
// 					if (elementHeight == 0) {
// 						elementHeight += $(this).offset().top * 1;// - 46;//trừ cho header
// 					} else
// 						elementHeight += $(this).outerHeight() * 1;
// 				});
// 			}
// 		} else {
// 			minHeight = className * 1;
// 		}
// 	}

// 	var height = 0;
// 	//height = contentInnerHeight - (elementHeight + 5);
// 	height = footerOffsetTop - (elementHeight + 10);//mặc định cách footer là 10px
// 	if (minHeight == null) {
// 		minHeight = 250;
// 	}
// 	return height < minHeight ? minHeight : height;
// }
// /**
// * @description get height by classname
// * @author Luyen Nguyen 2018-09-24 16:10
// */
// Libs.getHeightByClassName = function (className) {
// 	if (className === 'undefined' || className == null && className === '') {
// 		return 0;
// 	}
// 	var elementHeight = 0;
// 	var elements = $('.' + className);
// 	if (elements !== 'undefined' && elements != null && elements != '') {
// 		elements.each(function () {
// 			elementHeight += $(this).outerHeight() * 1;
// 		});
// 	}
// 	return elementHeight;
// }
// /**
//  * Round the number after a comma
//  * @author thanh.bay 2018-09-27 11:24
//  * @param  {string | float | int} value
//  * @param  {int} fixed=1 : round to n numbers based on fixed value
//  */
// Libs.fixNumber = function (value, fixed = 1) {
// 	if (typeof value === 'undefined' || value == null) return null;
// 	return parseFloat(Number.parseFloat(value).toFixed(fixed));
// }


// /**
// * @description Get the element index in the array according to the field and value
// * @author Luyen Nguyen 2018-09-28 16:10
// * @param  array items
// * @param String field: object you want to find in the array
// * @param String value: compare value
// * @param boolean isIndex: false return index, true: return object
// * @return int|object
// */
// Libs.findIndex = (items, field, value, isIndex) => {
// 	var result = -1;
// 	for (var i = 0; i < items.length; i++) {
// 		value = value + "";
// 		value = (value) ? value.toLowerCase().trim() : "";
// 		var itemValue = items[i][field] + "";
// 		var itemName = (itemValue) ? itemValue.toLowerCase().trim() : "";
// 		if (value == itemName) {
// 			if (Libs.isBlank(isIndex)) {
// 				result = i;
// 			}
// 			else {
// 				result = items[i];
// 			}
// 		}
// 	}
// 	return result;
// }
// /**
// * @description clear date input file
// * @author Luyen Nguyen 2018-09-28 16:10
// */
// Libs.clearAllInputFile = function () {
// 	if ($('input[type="file"]').length) {
// 		$('input[type="file"]').val('');
// 	}
// 	if ($('.custom-file-label').length) {
// 		$('.custom-file-label').html('');
// 	}
// }
// /**
// * @description Default configuration for tinymce
// * @author Luyen Nguyen 2018-09-28 16:10
// */
// Libs.tinymceConfig = function (selector, readonly, height) {
// 	if (!height) {
// 		height = 150;
// 	}
// 	if (!selector) {
// 		selector = 'textarea';
// 	}
// 	if (!readonly) {
// 		readonly = false;
// 	}
// 	return {
// 		selector: selector,
// 		theme: 'modern',
// 		readonly: readonly,
// 		height: height,
// 		plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern'
// 	}
// }

// /**
//  * @description Set select selected
//  * @param {array} data 
//  * @author: thanh.bay
//  */
// Libs.setSelectSelected = function (selector, value) {
// 	if (!selector || selector === 'undefined' && selector == null) return;
// 	$(selector).val(value);
// 	$(selector).trigger('change.select2');
// }

// /**
//  * @description convert date to string
//  * @param {array} data 
//  * @author: Minh.Pham
//  */
// Libs.convertSQLDateToStr = (_date, _format) => {
// 	if (null == _date || typeof _date === 'undefined' || _date == '') {
// 		return null;
// 	}
// 	var date = new Date(_date);
// 	var result = Libs.convertDateToStr(date, _format);
// 	return result;
// }
// Libs.convertDateToStr = (_date, _format) => {
// 	if (null == _date || typeof _date === 'undefined' || _date == '') {
// 		return null;
// 	}
// 	var day = _date.getDate();
// 	var month = _date.getMonth();
// 	var year = _date.getFullYear() + '';
// 	month += 1;
// 	if (day < 10) {
// 		day = '0' + day;
// 	}
// 	if (month < 10) {
// 		month = '0' + month;
// 	}
// 	var result = _format.toLowerCase();
// 	result = result.replace('dd', day);
// 	result = result.replace('mm', month);
// 	result = result.replace('yyyy', year);
// 	return result;
// }
// /**
//  * Get current year
//  * @author Minh.Pham 2018-11-28
//  */ 

// Libs.getCurrentYear = () => {
// 	var year = new Date().getFullYear();
// 	return year;
// }
// /**
//  * Get days in month
//  * @author Minh.Pham 2018-11-28
//  */ 
// Libs.getDaysOfMonth = (year, month) => {
// 	var d = new Date(year, month, 0);
// 	return d.getDate();
// }
// /**
//  * Convert date to YYYY-MM-DD
//  * @author Minh.Pham 2018-10-20
//  */
// Libs.convertStr2DateV01 = (date, format, _delimiter) => {
// 	if (null == date || typeof date === 'undefined' || date == '') {
// 		return null;
// 	}
// 	var formatLowerCase = format.toLowerCase();
// 	var formatItems = formatLowerCase.split(_delimiter);
// 	var dateItems = date.split(_delimiter);
// 	var monthIndex = formatItems.indexOf("mm");
// 	var dayIndex = formatItems.indexOf("dd");
// 	var yearIndex = formatItems.indexOf("yyyy");
// 	//var month = parseInt(dateItems[monthIndex]);
// 	var month = dateItems[monthIndex];
// 	return dateItems[yearIndex] + '-' + (month) + '-' + dateItems[dayIndex];
// }

// /**
//  * Convert date to YYYYMMDD
//  * @author Minh.Pham 2018-10-20
//  */
// Libs.convertStr2DateV02 = (date, format, _delimiter) => {
// 	if (null == date || typeof date === 'undefined' || date == '') {
// 		return null;
// 	}
// 	var formatLowerCase = format.toLowerCase();
// 	var formatItems = formatLowerCase.split(_delimiter);
// 	var dateItems = date.split(_delimiter);
// 	var monthIndex = formatItems.indexOf("mm");
// 	var dayIndex = formatItems.indexOf("dd");
// 	var yearIndex = formatItems.indexOf("yyyy");
// 	var month = parseInt(dateItems[monthIndex]);
// 	return dateItems[yearIndex] + (month) + dateItems[dayIndex];
// }


// /**
//  * Convert date to YYYY-MM-DD
//  * @author Minh.Pham 2018-10-20
//  */
// Libs.convertStrYearMonth = (date, format, _delimiter) => {
// 	if (null == date || typeof date === 'undefined' || date == '') {
// 		return null;
// 	}
// 	var formatLowerCase = format.toLowerCase();
// 	var formatItems = formatLowerCase.split(_delimiter);
// 	var dateItems = date.split(_delimiter);
// 	var monthIndex = formatItems.indexOf("mm");
// 	var yearIndex = formatItems.indexOf("yyyy");
// 	return dateItems[yearIndex] + '-' + dateItems[monthIndex];
// }


// /**
//  * Convert date to 'YYYY-MM-DD'
//  * @author Minh.Pham 2018-10-20
//  */
// Libs.convertYYYYMMDDDateToStr = (date, _format) => {
// 	if (null == date || typeof date === 'undefined' || date == '') {
// 		return null;
// 	}
// 	var dateItems = date.split('-');
// 	var result = _format.toLowerCase();
// 	result = result.replace('dd', dateItems[2]);
// 	result = result.replace('mm', dateItems[1]);
// 	result = result.replace('yyyy', dateItems[0]);
// 	return result;
// }

// /**
//  * @description Delete special characters
//  * @param {String} str 
//  * @return string
//  * @author: minh.pham
//  */
// Libs.removeWildcard = (str) => {
// 	str = str.replace(/!|@|%|\^|\\|\/|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'||\"|\&|\#|\[|\]|~|$|_/g, "");
// 	return str;

// }
// /**
//  * @description Search for characters in the string
//  * @param {array} data 
//  * @return true
//  * @author: lam.nguyen
//  */
// Libs.searchLikeString = (str, strSearch) => {
// 	if (Libs.isBlank(str)) {
// 		return false;
// 	}
// 	str = Libs.removeUnicode(str).toLowerCase().trim();
// 	if (!Libs.isBlank(strSearch)) {
// 		strSearch = Libs.removeUnicode(strSearch).toLowerCase().trim();
// 	}
// 	if (str.indexOf(strSearch) != -1) {
// 		return true;
// 	}
// 	return false;
// }
// /**
//  * @description Remove duplicate elements in the array
//  * @param Array arr
//  * @author: Luyen Nguyen
//  * @return Array
//  */
// Libs.removeDuplicatesSafe = function (arr) {
// 	var seen = {};
// 	var retArr = [];
// 	for (var i = 0; i < arr.length; i++) {
// 		if (!(arr[i] in seen)) {
// 			retArr.push(arr[i]);
// 			seen[arr[i]] = true;
// 		}
// 	}
// 	return retArr;
// }


// /*
//  * call await method
//  * ex: let users = await Libs.callWithPromise((resolve, reject)=>{
//  * UserService.instance.getDropDownList({}, (arrData) => {
//  * 		if(arrData){ resolve(arrData)}
//  * 		else{ reject(false)}
//  *    }, false);
//  * });
//  * @param {func} func 
//  */
// Libs.callWithPromise = (func) => {
// 	return new Promise(function (resolve, reject) {
// 		func(resolve, reject)
// 	})
// }






// /**
// * Auto generate key from name
// *
// * @param {string} name
// * @author:  minh.pham 2018-10-20 15:37:34 
// * */
// Libs.generateKeyFromName = function (name) {
// 	if (Libs.isBlank(name)) return "";
// 	//replace all wildchar
// 	var regex1 = /\w+/;

// 	// const regex = new RegExp("([a-zA-Z0-9 ]+)", "ig");
// 	// let myArray = regex.exec(name);
// 	// if(myArray!=null){
// 	// 	name = myArray.join("");
// 	// }
// 	name = Libs.removeUnicode(name);
// 	name = Libs.removeWildcard(name);
// 	let nameArr = name.split(" ");
// 	if (nameArr.length <= 1) {
// 		return nameArr[0].substring(0, 4).toUpperCase();
// 	}
// 	let newName = "";
// 	for (let i = 0; i < nameArr.length; i++) {
// 		newName += nameArr[i].substring(0, 1).toUpperCase();
// 	}
// 	return newName;
// }

// Libs.groupByProps = function (objectArray, property) {
// 	return objectArray.reduce(function (acc, obj) {
// 		var key = obj[property];
// 		if (!acc[key]) {
// 			acc[key] = [];
// 		}
// 		acc[key].push(obj);
// 		return acc;
// 	}, {});
// }

// /**
//  * 
//  * @param {*} inputDate format dd/MM/yyyy
//  * @returns string yyyy-MM-dd
//  */
// Libs.inputDateToDBDate = function (inputDate) {
// 	if (inputDate === undefined || inputDate == null || inputDate === '' || typeof inputDate !== 'string') {
// 		return null;
// 	}
// 	var division = inputDate.split('/');
// 	if (division <= 1) return null;
// 	if (inputDate.length != 10) return null;
// 	let day = inputDate.substring(0, 2);
// 	let month = inputDate.substring(3, 5);
// 	let year = inputDate.substring(6, 10);
// 	return year + "-" + month + "-" + day;
// }
// /**
//  * Display toast message
//  * @param String message: content
//  * @param String type: "error": red background, "success": blue background
//  * @returns {*}
//  */
// Libs.toast = function (message, type, pos = "top-right") {
// 	let posistion = "top-right";
// 	if (typeof pos != 'undefined') {
// 		posistion = pos;
// 	}
// 	switch (type) {
// 		case "info":
// 			toast.info(message, {
// 				position: posistion,
// 				autoClose: true,
// 				hideProgressBar: false,
// 				closeOnClick: true,
// 				pauseOnHover: true,
// 				draggable: true,
// 				draggablePercent: 10
// 			});
// 			break;
// 		case "error":
// 			toast.error(message, {
// 				position: posistion,
// 				autoClose: true,
// 				hideProgressBar: false,
// 				closeOnClick: true,
// 				pauseOnHover: true,
// 				draggable: true,
// 				draggablePercent: 10
// 			});
// 			break;
// 		case "warn":
// 			toast.warn(message, {
// 				position: posistion,
// 				autoClose: true,
// 				hideProgressBar: false,
// 				closeOnClick: true,
// 				pauseOnHover: true,
// 				draggable: true,
// 				draggablePercent: 10
// 			});
// 			break;
// 	}

// }


// /**
//  * Image url from API
//  * @author thanh.bay 2018-10-30
//  * @param  {string} file_path
//  * @param  {string} headquarter_id
//  */
// Libs.linkShowImageAction = function (file_path, headquarter_id) {
// 	let host = Libs.baseUrl();
// 	let url = Constants.URL.SYSTEM.SHOW_IMAGE;
// 	file_path = encodeURI(file_path);
// 	return host + "/" + url + "?file_path=" + file_path + "&headquarter_id=" + headquarter_id;
// }
// Libs.convertAllFormatDateToStr = (_date, _format) => {
// 	if (null == _date || typeof _date === 'undefined' || _date == '') {
// 		return '';
// 	}
// 	if (_date.includes('/')) {
// 		return _date;
// 	}
// 	let date = moment(_date);
// 	if (!date._isValid) {
// 		return _date;
// 	}
// 	return date.format(_format.toUpperCase());
// }
// /**
//  * Convert Data to DB
//  */
// Libs.convertAllFormatDate = (_date, from_format = "DD/MM/YYYY hh:mm", to_format = "YYYY-MM-DD hh:mm") => {
// 	if (null == _date || typeof _date === 'undefined' || _date == '') {
// 		return '';
// 	}
// 	let date = moment(_date, from_format);
// 	if (!date._isValid) {
// 		return _date;
// 	}
// 	return date.format(to_format);
// }

// /**
//  * Validate date 0000-00-00 
//  * @author Minh.Pham 2018-10-20
//  */
// Libs.validateDateNull = (date) => {
// 	let arrFormat = ["0000-00-00", "0000/00/00", "0000-00-00 00:00:00","0000/00/00 00:00:00", "00/00/0000", "00-00-0000", "00/00/0000 00:00:00", "00-00-0000 00:00:00"];
// 	for (let i = 0; i < arrFormat.length; i++) {
// 		if(date == arrFormat[i]){
// 			return false;
// 		}
// 	}
// 	return true;
// }





// /**
//  * @description synchronize data
//  * @author LuyenNguyen 2018-11-03
//  * @param oldItems
//  * @param newItems
//  * @param field_key_name
//  * @param unUpdateFields ex: "field1,field2,...,fieldn"
//  * @returns {Array} 
//  */
// Libs.synchronizeData = function (oldItems, newItems, field_key_name, unUpdateFields) {
// 	if (!oldItems)
// 		oldItems = [];
// 	if (!newItems) {
// 		return;
// 	}
// 	var deletedList = [];
// 	var unUpdateFieldArr = null;
// 	if (unUpdateFields && unUpdateFields != "") {
// 		unUpdateFieldArr = unUpdateFields.split(",");
// 	}
// 	// add and update new item
// 	newItems.some(function (el) {
// 		var new_key_val = el[field_key_name];
// 		var oldItem = Libs.findIndex(oldItems, field_key_name, new_key_val, true);
// 		if (oldItem == -1) {
// 			oldItems.push(el);
// 		} else {
// 			for (var key in el) {
// 				var is_update = true;
// 				if (unUpdateFieldArr && unUpdateFieldArr.length > 0
// 					&& unUpdateFieldArr.indexOf(key) >= 0) {
// 					is_update = false;
// 				}
// 				if (is_update) {
// 					oldItem[key] = el[key];
// 				}
// 			}
// 		}
// 	});
// 	// remove item not in new items
// 	for (var index = oldItems.length - 1; index >= 0; index--) {
// 		var item = oldItems[index];
// 		var new_key_val = item[field_key_name];
// 		// update
// 		var newItem = Libs.findIndex(newItems, field_key_name, new_key_val, true);
// 		if (newItem == -1) {
// 			deletedList.push(item);
// 			oldItems.splice(index, 1);
// 		}
// 	}
// 	return deletedList;
// };

// /**
//  * @description Check editor data
//  * @author LuyenNguyen 2018-11-04
//  * @param string str
//  * @returns boolean
//  */
// Libs.checkEditorEmpty = function (str) {
// 	if (Libs.isBlank(str)) return false;
// 	str = str.replace(/<\/?p[^>]*>/g, "");
// 	str = str.replace(/\s|\&nbsp;|\(|\)|\（|\）/g, '');
// 	if (!str) return false;
// 	return true;
// }
// /**
//  * @description Check onClick or doubleClick
//  * @author LuyenNguyen 2018-11-04
//  * @param func onClick
//  * @param func onDblClick
//  * @param int delay: time delay
//  */
// Libs.getClickHandler = function (onClick, onDblClick, delay) {
// 	var timeoutID = null;
// 	delay = delay || 250;
// 	return function (event) {
// 		if (!timeoutID) {
// 			timeoutID = setTimeout(function () {
// 				onClick(event);
// 				timeoutID = null
// 			}, delay);
// 		} else {
// 			timeoutID = clearTimeout(timeoutID);
// 			onDblClick(event);
// 		}
// 	};
// }
// Libs.padLeft = function (str, number, digit) {
// 	return Array(number - String(str).length + 1).join(digit || '0') + str;
// }

// /**
// * @description Rounding
//  * (0.55 -> 0.6, 0.54 -> 0.5)
//  * @author LuyenNguyen 2018-11-04
//  */
// Libs.round = function (number, decimals) {
// 	if (decimals == null)
// 		decimals = 0;
// 	return Number((Math.round(number + "e" + decimals) + "e-" + decimals));
// };
// Libs.getCurrentDate = function (format) {
// 	format = (!format || typeof format !== 'string') ? 'DD/MM/YYYY' : format;
// 	return moment().format(format);
// }
// /**
//  * Add Days
//  */
// Libs.addDays = function (date, days) {
// 	var result = new Date(date);
// 	result.setDate(result.getDate() + days);
// 	return result;
// }

// /**
//  * Valid date checks
//  * @author Minh.Pham 2019-02-19
//  * @param from_date  từ ngày
//  * @param format định dạng kiểu ngày truyền vào
//  * @returns bool
//  */
// Libs.isValidDate = function (from_date, format) {
// 	from_date = moment(from_date, format.toUpperCase());
// 	return from_date.isValid();

// }

// /**
// * @description Gọi lại sự kiện sau khi gọi collapse cho element bootstrap
// * @param function callback: nhận một tham số là status nếu true collapse là show và ngược lại
// * @param string selector: tên id hoặc class
// * @author Luyen Nguyen 2018-11-23
// */
// Libs.collapseCallback = function (func, selector) {
// 	if (Libs.isBlank(selector)) {
// 		selector = $('#group-advance-search');
// 	}
// 	else {
// 		selector = $('.' + selector);
// 		if (!selector || selector.length <= 0) {
// 			selector = $('#' + selector);
// 		}
// 	}
// 	if (!selector || selector.length <= 0 || !func || typeof func !== 'function') return;
// 	selector.on('hidden.bs.collapse', function () {
// 		func(false);
// 	});
// 	selector.on('show.bs.collapse', function () {
// 		func(true);
// 	});
// }
// /**
// * @description Thêm class để tính lại chiều cao của màn hình bên phải luôn full trong trường hợp không có button dưới footer
// * @param boolean|string isRemove: Nếu có giá trị sẽ remove class content-full và trả về trạng thái ban đầu
// * @author Luyen Nguyen 2018-11-23
// */
// Libs.addClassContentFull = function (isRemove) {
// 	let content = $('#main-container>.content');
// 	if (!content || content.length <= 0) return;
// 	if (!Libs.isBlank(isRemove)) {
// 		content.removeClass('content-full');
// 	}
// 	else {
// 		content.addClass('content-full');
// 	}
// }
// /**
// * @description Làm tròn số
// * @author Minh.Pham 2018-12-04
// * @param number giá trị cần làm tròn
// * @param decimal số thập phân
// * @type cách làm tròn: -1 làm tròn xuống, 0 làm tòn tự nhiên, 1: làm tròn lên
//  */
// Libs.roundNumber = function (number, decimals = 0, type = 0) {
// 	if (decimals == null)
// 		decimals = 0;
// 	type = type * 1;
// 	switch(type){
// 		case -1:
// 			return roundTo.down(number, decimals);
// 		case 1:
// 			return roundTo.up(number, decimals);
// 		default:
// 			return roundTo(number, decimals);
// 	}
// };
// /**
// * @description Làm tròn số theo format
// * @author Minh.Pham 2018-12-04
// * @param number giá trị cần làm tròn
// * @param format #,###.## 
// * @type cách làm tròn: -1 làm tròn xuống, 0 làm tòn tự nhiên, 1: làm tròn lên
//  */
// Libs.roundByFormat = function (number, format, type = 0) {
// 	return Libs.roundNumber(number, Libs.getDecimalsOfFomat(format), type);
// };

// /**
// * @description Lấy số decimals(phần thập phân) của format
// * @author Minh.Pham 2018-12-04
// * @param format #,###.## 
//  */
// Libs.getDecimalsOfFomat = function (format) {
// 	let decimals = 0;
// 	if(!Libs.isBlank(format)){
// 		try{
// 			let arr = format.split('.');
// 			if(arr.length >= 2){
// 				decimals = arr[arr.length -1].length;
// 			}
// 		}catch(ex){

// 		}
// 	}
// 	return decimals;
// };
// /**
// * @description insert 1 item tới array
// * ex: insertAt(arr, 1, "x", "y", "z");
// * @author TichNguyen 2018-12-04
// * @param array mãng
// * @param index insert tại index 
//  */
// Libs.insertAt=function(array, index) {
//     var arrayToInsert = Array.prototype.splice.apply(arguments, [2]);
//     return Libs.insertArrayAt(array, index, arrayToInsert);
// };
// /**
// * @description insert 1 array to array
// * ex: var arrToInsert = ["x", "y", "z"];
// * 	  insertArrayAt(arr, 1, arrToInsert);
// * @author TichNguyen 2018-12-04
// * @param array
// * @param index insert tại index 
// * @param arrayToInsert
//  */
// Libs.insertArrayAt=function(array, index, arrayToInsert) {
// 	if(!arrayToInsert || arrayToInsert.length<=0) return array;
//     Array.prototype.splice.apply(array, [index, 0].concat(arrayToInsert));
//     return array;
// }

// /**
//  * Move the element in the array
//  */
// Libs.arrayMove = function(arr, old_index, new_index) {
//     if (new_index >= arr.length) {
//         var k = new_index - arr.length + 1;
//         while (k--) {
//             arr.push(undefined);
//         }
//     }
//     arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
//     return arr; // for testing
// };

// /**
//  * Hàm resize image 
//  * @param {image}: Image() hình cần resize
//  * @param {maxWidth}: decimal chiều rộng tối đa
//  * @param {maxHeight}: decimal chiều cao tối đa
//  * @param {quality}: decimal chất lượng hình từ 0 => 1
//  */
// Libs.resizeImage = function(image, maxWidth, maxHeight, quality) {
//     var canvas = document.createElement('canvas');

//     var width = image.width;
//     var height = image.height;

//     if (width > height) {
//         if (width > maxWidth) {
//             height = Math.round(height * maxWidth / width);
//             width = maxWidth;
//         }
//     } else {
//         if (height > maxHeight) {
//             width = Math.round(width * maxHeight / height);
//             height = maxHeight;
//         }
//     }

//     canvas.width = width;
//     canvas.height = height;

//     var ctx = canvas.getContext("2d");
//     ctx.drawImage(image, 0, 0, width, height);
//     return canvas.toDataURL("image/jpeg", quality);
// }

// /**
//  * @description Check the array data 
//  * @param Array arr
//  * @author: Minh.Pham
//  * @return boolean
//  */
// Libs.isArray = function (arr) {
// 	if (arr == null) return true;
// 	if (!Array.isArray(arr)) return false;
// 	return true;
// }

// String.prototype.format = function() {
// 	a = this;
// 	for (k in arguments) {
// 	  a = a.replace("{" + k + "}", arguments[k])
// 	}
// 	return a
//   }
// Libs.getMonths = function(startDate, endDate){
//     var resultList = [];
//     var date = new Date(startDate);
//     var endDate = new Date(endDate);
//     var monthNameList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//     while (date <= endDate)
//     {
//         var stringDate = monthNameList[date.getMonth()] + " " + date.getFullYear();

//         //get first and last day of month
//         var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
//         var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

//         resultList.push({
//             str:stringDate,
//             first:firstDay,
//             last:lastDay,
//         });
//         date.setMonth(date.getMonth() + 1);
//     }

//     return resultList;
// };
// Libs.getStringMonths = function(startDate, endDate){
//     var resultList = [];
//     var date = new Date(startDate);
//     var endDate = new Date(endDate);
//     var monthNameList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//     while (date <= endDate)
//     {
// 		var stringDate = monthNameList[date.getMonth()];

//         //get first and last day of month
//         var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
//         var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
// 		resultList.push(stringDate)
//         date.setMonth(date.getMonth() + 1);
//     }

//     return resultList;
// };

// /**
// * @description get from_date, to_date from year ago to current year
//  * @author Minh.Pham 2019-06-21
//  */
// Libs.getParamDayByYear =  function(numerOfYear, format){
// 	let currentDate = moment().toDate();
// 	let month = currentDate.getMonth();
// 	let day = currentDate.getDate();
// 	let year  = currentDate.getFullYear();
// 	return {
// 		from_date: moment().date(1).month(month).year(year - numerOfYear).format(format),
// 		to_date: moment().date(day).month(month).year(year).format(format),
// 	};
// }

// // 
// /**
// * @description date array from start_date -> end_date
//  * @author Long.Pham 2019-06-21
//  * @param start,  end new Date('2019-12-12')
//  */
// Libs.getDateArray =  function(start, end){
// 	var arr = new Array();
// 	var dt = new Date(start);
//     while (dt <= end) {
//         arr.push(moment(new Date(dt)).format('DD/MM/YYYY'));
//         dt.setDate(dt.getDate() + 1);
//     }
//     return arr;
// }



export default Libs;
