/**
 * Created by slowsay on 2018/2/28.
 * 数据访问层
 */
'use strict';
var logger = require('../common/logger'),
    usersql = require('../sql/users'),
    utils = require('../core/utils'),
    pool = require('../common/sqltool').Sqltool;

/**
 * @description sql add
 * @param params
 * @param callback
 */
function add(params, callback) {
    var sql = usersql.user_add_sql;
    logger.info(sql);
    pool.query(sql, [params.openid, params.city, params.country, params.province, params.nickname, params.sex, params.headimgurl], function (err, rows, fields) {
        if (err) {
            logger.error(err, sql)
            return callback(err, '添加失败!');
        }
        callback(null, rows);
    })
}
/**
 * @description sql getByOpenid
 * @param params
 * @param callback
 */
function getByOpenid(params, callback) {
    var sql = usersql.user_getByOpenid_sql;
    logger.info(sql);
    pool.query(sql, [params.openid], function (err, rows, fields) {
        if (err) {
            logger.error(err, sql);
            return callback(err, '获取信息失败!');
        }
        if (rows && rows.length > 0) {
            return callback(null, rows[0]);
        }
        callback();
    })
}
/**
 * @description sql userlist
 * @param params
 * @param callback
 */
function userList(params, callback) {
    var sql = usersql.user_getByOpenid_sql;
    logger.info(sql);
    pool.query(sql, [params.pageindex, params.pagesize], function (err, rows, fields) {
        if (err) {
            logger.error(err, sql);
            return callback(err, '获取用户列表失败!');
        }
        if (rows && rows.length > 0) {
            return callback(null, rows);
        }
        callback();
    })
}
module.exports = {
    add: add,
    getByOpenid: getByOpenid,
    userList: userList,
}