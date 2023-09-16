/**
 * 判断数据类型
 * @author ydr.me
 * @create 2014-11-15 12:54
 * @update 2014年11月19日10:20:51
 */


var udf = 'undefined';
var REG_URL = /^https?:\/\/([a-z\d-]+\.)+[a-z]{2,5}(:[1-9]\d{0,4})?(\/|\/[\w#!:.?+=&%@!\-\/]+)?$/i;
var REG_EMAIL = /^\w+[-+.\w]*@([a-z\d-]+\.)+[a-z]{2,5}$/i;
var REG_MOMGODB_ID = /^[\da-z]{24}$/;
var REG_INVALID = /invalid/i;
var REG_DATE_DMY = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
var REG_DATE_YMD = /^(\d{4})[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
var REG_DATE_DMYHm = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4} ([012]{0,1}[0-9]:[0-6][0-9])$/;
var REG_DATE_YMDHm = /^(\d{4})[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01]) ([012]{0,1}[0-9]:[0-6][0-9])$/;
// var fs = require('fs');


/**
 * 判断数据类型，结果全部为小写<br>
 * 原始数据类型：boolean、number、string、undefined、symbol
 * @param {*} object 任何对象
 * @returns {string}
 *
 * @example
 * typeis();
 * // => "undefined"
 *
 * typeis(null);
 * // => "null"
 *
 * typeis(1);
 * // => "number"
 *
 * typeis("1");
 * // => "string"
 *
 * typeis(!1);
 * // => "boolean"
 *
 * typeis({});
 * // => "object"
 *
 * typeis([]);
 * // => "array"
 *
 * typeis(/./);
 * // => "regexp"
 *
 * typeis(window);
 * // => "window"
 *
 * typeis(document);
 * // => "document"
 *
 * typeis(document);
 * // => "document"
 *
 * typeis(NaN);
 * // => "nan"
 *
 * typeis(Infinity);
 * // => "number"
 *
 * typeis(function(){});
 * // => "function"
 *
 * typeis(new Image);
 * // => "element"
 *
 * typeis(new Date);
 * // => "date"
 *
 * typeis(document.links);
 * // => "htmlcollection"
 *
 * typeis(document.body.dataset);
 * // => "domstringmap"
 *
 * typeis(document.body.classList);
 * // => "domtokenlist"
 *
 * typeis(document.body.childNodes);
 * // => "nodelist"
 *
 * typeis(document.createAttribute('abc'));
 * // => "attr"
 *
 * typeis(document.createComment('abc'));
 * // => "comment"
 *
 * typeis(new Event('abc'));
 * // => "event"
 *
 * typeis(document.createExpression());
 * // => "xpathexpression"
 *
 * typeis(document.createRange());
 * // => "range"
 *
 * typeis(document.createTextNode(''));
 * // => "text"
 */
var typeis = function (object) {
    if (object !== object) {
        return 'nan';
    } else if (typeof object === udf) {
        return udf;
    } else if (typeof window !== udf && object === window) {
        return 'window';
    } else if (typeof global !== udf && object === global) {
        return 'global';
    } else if (typeof document !== udf && object === document) {
        return 'document';
    } else if (object === null) {
        return 'null';
    }

    var ret = Object.prototype.toString.call(object).slice(8, -1).toLowerCase();

    if (/element/.test(ret)) {
        return 'element';
    }
    return ret;
};
var i = 0;
var jud = 'string number function object undefined null nan element regexp boolean array window document global'.split(' ');
var makeStatic = function (tp) {
    var tp2 = tp.replace(/^\w/, function (w) {
        return w.toUpperCase();
    });
    /**
     * 快捷判断
     * @name typeis
     * @property string {Function}
     * @property String {Function}
     * @property number {Function}
     * @property Number {Function}
     * @property function {Function}
     * @property Function {Function}
     * @property object {Function}
     * @property Object {Function}
     * @property undefined {Function}
     * @property Undefined {Function}
     * @property null {Function}
     * @property Null {Function}
     * @property nan {Function}
     * @property Nan {Function}
     * @property element {Function}
     * @property Element {Function}
     * @property regexp {Function}
     * @property Regexp {Function}
     * @property boolean {Function}
     * @property Boolean {Function}
     * @property array {Function}
     * @property Array {Function}
     * @property window {Function}
     * @property Window {Function}
     * @property document {Function}
     * @property Document {Function}
     * @property global {Function}
     * @property Global {Function}
     * @returns {boolean}
     */
    typeis[tp] = typeis[tp2] = function (obj) {
        return typeis(obj) === tp;
    };
};


/**
 * 复制静态方法
 */
for (; i < jud.length; i++) {
    makeStatic(jud[i]);
}


/**
 * 判断是否为纯对象
 * @param obj {*}
 * @returns {Boolean}
 *
 * @example
 * type.isPlainObject({a:1});
 * // => true
 */
typeis.plainObject = function (obj) {
    return typeis(obj) === 'object' && Object.getPrototypeOf(obj) === Object.prototype;
};


/**
 * 判断是否为空对象
 * @param obj {*}
 */
typeis.emptyObject = function (obj) {
    return typeis.plainObject(obj) && Object.keys(obj).length === 0;
};


/**
 * 判断是否为 undefine 或 null
 * @param obj
 * @returns {Boolean}
 */
typeis.empty = function (obj) {
    return typeof obj === udf || typeis.null(obj);
};


/**
 * 判断是否为 URL 格式
 * @param string
 * @returns {Boolean}
 *
 * @example
 * typeis.url('http://123.com/123/456/?a=3#00');
 * // => true
 */
typeis.url = function (string) {
    return typeis(string) === 'string' && REG_URL.test(string);
};


/**
 * 判断是否为 email 格式
 * @param string
 * @returns {Boolean}
 *
 * @example
 * typeis.email('abc@def.com');
 * // => true
 */
typeis.email = function (string) {
    return typeis(string) === 'string' && REG_EMAIL.test(string);
};


/**
 * 判断能否转换为合法Date
 * @param  anything
 * @return {Boolean}
 * @version 1.0
 * 2014年5月2日21:07:33
 */
typeis.validDate = function (anything) {
    return !REG_INVALID.test(new Date(anything).toString());
};


/**
 * 判断对象是否为 Error 实例
 * @param anything
 * @returns {boolean}
 *
 * @example
 * typeis.error(new TypeError());
 * // => true
 */
typeis.error = function (anything) {
    return anything && (anything instanceof Error);
};


/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
//////////////////////////////[ ONLY NODEJS ]////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////


/**
 * 判断是否为合法的mongodbID
 * @param  anything
 * @return {Boolean}
 * @version 1.0
 * 2014年5月3日23:11:37
 */
typeis.mongoId = function (anything) {
    return typeof (anything !== udf && typeof anything._bsontype !== udf &&
        anything._bsontype === 'ObjectId') || REG_MOMGODB_ID.test(anything.toString());
};


/**
 * 判断对象是否为空,null/undefined/""
 * @param  any {*} 任何对象
 * @return {Boolean}
 * @version 1.0
 * 2014年5月27日21:33:04
 */
typeis.emptyData = function (any) {
    return typeis.empty(any) || any === '';
};


/**
 * 判断路径是否为目录
 * @param _path
 * @returns {Boolean}
 */
// typeis.directory = function (_path) {
//     var stat;

//     try {
//         stat = fs.statSync(_path);
//     } catch (err) {
//         return !1;
//     }

//     return stat.isDirectory();
// };


/**
 * 判断路径是否为文件
 * @param _path
 * @returns {Boolean}
 */
// typeis.file = function (_path) {
//     var stat;

//     try {
//         stat = fs.statSync(_path);
//     } catch (err) {
//         return !1;
//     }

//     return stat.isFile();
// };


// @link: https://www.zhihu.com/question/19813460/answer/13042143
// A类地址：10.0.0.0--10.255.255.255
// B类地址：172.16.0.0--172.31.255.255
// C类地址：192.168.0.0--192.168.255.255
/**
 * 判断是否为局域网 IP
 * @param ip
 * @returns {boolean}
 */
typeis.localIP = function (ip) {
    ip = String(ip).toUpperCase().trim();

    if (ip.indexOf('::') > -1 || ip === 'localhost' || ip.indexOf('127.0.0.1') > -1) {
        return true;
    }

    var ipList = ip.split('.');
    var part0 = Number(ipList[0]);
    var part1 = Number(ipList[1]);
    //var part2 = Number(ipList[2]);
    //var part3 = Number(ipList[3]);

    // A 类
    if (part0 === 10) {
        return true;
    }

    // B 类
    if (part0 === 172 && part1 > 15 && part1 < 32) {
        return true;
    }

    return part0 === 192 && part1 === 168;
};

/**
 * Check valid date
 * @param {String} date 
 * @param {Boolean} format 
 */
typeis.date = function (date, format) {
    var dateformat = REG_DATE_DMY;
    if (typeof format !== 'undefined' && format === true) {
        dateformat = REG_DATE_YMD;
    }

    // Match the date format through regular expression
    if (date.match(dateformat)) {
        //Test which seperator is used '/' or '-'
        var opera1 = date.split('/');
        var opera2 = date.split('-');
        var lopera1 = opera1.length;
        var lopera2 = opera2.length;
        // Extract the string into month, date and year
        var pdate= '';
        if (lopera1 > 1) {
            pdate = date.split('/');
        }
        else if (lopera2 > 1) {
            pdate = date.split('-');
        }
        var dd = parseInt(pdate[0]);
        var mm = parseInt(pdate[1]);
        var yy = parseInt(pdate[2]);

        if (format) {
            dd = parseInt(pdate[2]);
            mm = parseInt(pdate[1]);
            yy = parseInt(pdate[0]);
        }

        // Create list of days of a month [assume there is no leap year by default]
        var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (mm === 1 || mm > 2) {
            if (dd > ListofDays[mm - 1]) {
                return false;
            }
            return true;
        }
        if (mm === 2) {
            var lyear = false;
            if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                lyear = true;
            }
            if ((lyear === false) && (dd >= 29)) {
                return false;
            }
            if ((lyear === true) && (dd > 29)) {
                return false;
            }
            return true;
        }
    }
    else {
        return false;
    }
}

typeis.dateTimeToMinute = function (date, format) {
    var dateformat = REG_DATE_DMYHm;
    if (typeof format !== 'undefined' && format === true) {
        dateformat = REG_DATE_YMDHm;
    }

    // Match the date format through regular expression
    if (date.match(dateformat)) {
        //Test which seperator is used '/' or '-'
        var opera1 = date.split('/'),
            opera2 = date.split('-'),
            lopera1 = opera1.length,
            lopera2 = opera2.length,
            time = "";
        // Extract the string into month, date and year
        var pdate = '';
        if (lopera1 > 1) {
            pdate = date.split('/');
            
        }
        else if (lopera2 > 1) {
            pdate = date.split('-');
        }
        var split = (pdate[2]).split(" ");
        time = split[1];
        var dd = parseInt(pdate[0]),
            mm = parseInt(pdate[1]),
            yy = parseInt(split[0]),
            hh = parseInt(time[1].split(":")[0]),
            m = parseInt(time[1].split(":")[1]);

        if (format) {
            dd = parseInt(split[0]);
            mm = parseInt(pdate[1]);
            yy = parseInt(pdate[0]);
        }

        var isValid = checkValidDate(dd, mm, yy);
        if (!isValid) {
            return false;
        }
        if (hh > 24) {
            return false;
        }
        if (m > 60) {
            return false;
        }
        return true;
    }
    else {
        return false;
    }
}

var checkValidDate = function (dd, mm, yy) {
    // Create list of days of a month [assume there is no leap year by default]
    var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (mm === 1 || mm > 2) {
        if (dd > ListofDays[mm - 1]) {
            return false;
        }
        return true;
    }
    if (mm === 2) {
        var lyear = false;
        if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
            lyear = true;
        }
        if ((lyear === false) && (dd >= 29)) {
            return false;
        }
        if ((lyear === true) && (dd > 29)) {
            return false;
        }
        return true;
    }
}


/**
 * @name string
 * @name number
 * @name function
 * @name object
 * @name undefined
 * @name null
 * @name nan
 * @name element
 * @name regexp
 * @name boolean
 * @name array
 * @name window
 * @name document
 * @name global
 * @type {Function}
 */
module.exports = typeis;
