/**
 * Created by slowsay on 2017/8/8.
 */
'use strict';
var crypto = require('crypto');

/**
 * @decription 随机取值,在一定范围内
 * @param max
 * @param min
 * @returns {*}
 */
function random(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}
/**
 * @description 哈希值+随机值
 * @param text
 * @param salt
 * @returns {Buffer|any|string}
 */
function hash(text, salt) {
    return crypto.createHash('sha1').update(text + '|' + salt, 'utf8').digest('hex');
}

/**
 * @description 原型null
 * @param value
 * @param msg
 * @returns {{status: number}}
 */

function valiDateNulls(value, msg) {
    var result = {status: 0};
    if (!value) {
        result.status = -1;
        result.code = 10411;
        result.msg = msg;
    }
    return result;
}

/**
 * @description 手机号验证
 * @param value
 * @returns {boolean}
 */
function checkPhone(value) {
    return /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value);
}
/**
 * @description 邮箱验证
 * @param value
 * @returns {boolean}
 */
function checkMail(value) {
    return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value);
}
/**
 * @description 容量转换
 * @param bytes
 * @returns {*}
 */

function sizeOf(bytes) {
    if (bytes == 0) {
        return "0.00 B";
    }
    var e = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, e)).toFixed(2) + ' ' + ' KMGTP'.charAt(e) + 'B';
}
/**
 * @descripton md5
 * @param str
 * @param key
 * @returns {Buffer|any|string}
 */
function md5(str, key) {
    var decipher = crypto.createHash('md5', key);
    if (key) {
        return decipher.update(str).digest();
    }
    return decipher.update(str).digest('hex')
}

exports.checkMail = checkMail;
exports.checkPhone = checkPhone;
exports.valiDateNulls = valiDateNulls;
exports.md5 = md5;
exports.random = random;
exports.hash = hash;
exports.sizeOf = sizeOf;