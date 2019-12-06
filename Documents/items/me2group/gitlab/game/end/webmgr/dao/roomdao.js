/**
 * Created by slowsay on 2018/2/28.
 * 数据访问层
 */
'use strict';
var logger = require('../common/logger'),
    roomsql = require('../sql/room'),
    pool = require('../common/sqltool').Sqltool;


module.exports = {
    add: function () {

    },
    getById: function (params, callback) {
        var sql = roomsql.user_getByOpenid_sql;
        logger.info(sql, [params.phone]);
        pool.query(sql, [params.phone], function (err, rows, fields) {
            if (err) {
                logger.error(err);
                return callback('信息获取失败!');
            }
            if (rows && rows.length > 0) {
                return callback(null, rows);
            }
            return callback(err, null);
        })
    }

};