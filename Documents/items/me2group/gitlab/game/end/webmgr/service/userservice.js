/**
 * Created by slowsay on 2018/2/28.
 * 业务层
 */
'use strict';
var logger = require('../common/logger'),
    userDao = require('../dao/userdao'),
    token = require('../core/token'),
    http = require('http');

/**
 * @description 添加user
 * @param params
 * @param callback
 */
function add(params, callback) {
    userDao.add(params, callback)
}

/**
 * @description 获取openid
 * @param params
 * @param callback
 */
function getByOpenid(params, callback) {
    userDao.getByOpenid(params, callback);
}
/**
 * @description 用户list
 * @param params
 * @param callback
 */
function userList(params, callback) {
    userDao.userList(params, callback);
}
module.exports = {
    add: add,
    getByOpenid: getByOpenid,
    userList: userList
}

