/**
 * 验证语法
 * @author ydr.me
 * @create 2015-08-20 15:30
 */

var lang = {
    minLength: {
        input: `'${1}không được nhỏ hơn ${2} ký tự'`,
        select: `'${1} ít nhất phải chọn ${2} mục'`
    },
    maxLength: {
        input: `'${1} không được lớn hơn ${2} ký tự'`,
        select: `'${1} nhiều nhất chỉ có thể chọn ${2} mục '`
    },
    least: `'${1} ít nhất phải chọn ${2} mục'`,
    most: `'${1}nhiều nhất chỉ có thể chọn ${2} mục'`,
    type: {
        array: `'${1} bắt buộc phải là giá trị Array '`,
        number: `'${1} phải là số '`,
        integer: `'${1} phải là số chẳn.'`,
        mobile: `'${1} phải là format số điện thoại '`,
        email: `'${1}phải là format email '`,
        url: `'${1} phải là địa chỉ website '`,
        date: `'${1} invalid date'`,
        numreicAllowZero: `'${1} invalid'`
    },
    required: `'${1} không được rỗng.'`,
    equal: `'${1} và ${2} phải giống nhau.'`,
    min: `'${1} không nhỏ hơn ${2}'`,
    max: `'${1} không lớn hơn ${2}'`,
    step: `'${1} giá trị kế tiếp là ${2}'`
};


/**
 * 获取 lang
 * @param type
 * @param [category]
 * @returns {*}
 */
exports.get = function (type, category) {
    var la = lang[type];

    if (!category) {
        return la;
    }

    return ((la && la[category]) || '');
};


/**
 * 设置 lang
 * @param type
 * @param msg
 * @param [category]
 */
exports.set = function (type, msg, category) {
    if (category) {
        lang[type] = lang[type] || {};
        lang[type][category] = msg;
    } else {
        lang[type] = msg;
    }
};
