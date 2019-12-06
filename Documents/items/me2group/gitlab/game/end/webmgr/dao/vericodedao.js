/**
 * Created by slowsay on 2018/3/8.
 * 数据访问层
 */
'use strict';
var logger = require('../common/logger'),
    pool = require('../common/sqltool').Sqltool,
    vericodesql = require('../sql/vericode');

module.exports = {
    add: function (params, callback) {
        var sql = vericodesql.vericode_add_sql;
        logger.info(sql);
        pool.query(sql, [params.region, params.phone, params.code, params.token], function (err, rows, fields) {
            if (err) {
                logger.error(err);
                return callback(err, null);
            }
            if (rows && rows.length > 0) {
                return callback(null, rows[0]);
            }
            callback(err,rows);
        })
    },
    getByOpenid: function (params, callback) {
        var sql = vericodesql.vericode_getByphone_sql;
        logger.info(sql);
        pool.query(sql, [params.phone, params.code], function (err, rows, fields) {
            if (err) {
                logger.error(err);
                return callback(err, null);
            }
            if (rows && rows.length > 0) {
                return callback(null, rows[0]);
            }
            callback(err,rows);
        })
    },
    getByid: function (params, callback) {
        var sql = vericodesql.vericode_getByid_sql;
        logger.info(sql);
        pool.query(sql, [params.phone], function (err, rows, fields) {
            if (err) {
                logger.error(err);
                return callback(err, null);
            }
            if (rows && rows.length > 0) {
                return callback(null, rows[0]);
            }
            callback();
        })
    },
    update: function (params, callback) {
        var sql = vericodesql.vericode_updateCode_sql;
        logger.info(sql);
        pool.query(sql, [params.code, params.id], function (err, rows, fields) {
            if (err) {
                logger.error(err);
                return callback(err, null);
            }
            callback(err, rows);
        })

    }

}