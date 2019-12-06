/**
 * Created by slowsay on 2018/3/7.
 * 数据层
 */
'use strict';
var logger = require('../common/logger'),
    pool = require('../common/sqltool').Sqltool,
    postsql = require('../sql/posts');

module.exports = {
    add: function (params, callback) {
        var sql = postsql.post_add_sql;

        logger.info(sql);
        pool.query(sql, [params.title, params.maparea, params.price, params.pic, params.content, params.userid], function (err, rows, fields) {
            if (err) {
                logger.error(err);
                return callback(err, null);
            }
            callback(null, rows);
        })
    },
    getByOpenid: function (params, callback) {
        var sql = postsql.post_getById_Info;
        logger.info(sql);
        pool.query(sql, [params.userId], function (err, rows, fields) {
            if (err) {
                logger.error(err);
                return callback(err, null);
            }
            if (rows && rows.length > 0) {
                return callback(null, rows);
            }
            callback(null, rows);
        })
    },
    getByTitle: function (params, callback) {
        var sql = postsql.post_getByTitle;
        pool.query(sql, [params.title], function (err, rows, fields) {
            if (err) {
                logger.error(err);
                return callback(err, null);
            }
            if (rows && rows.length > 0) {
                return callback(null, rows);
            }
            callback(null, rows);
        })
    },
    getList: function (params, callback) {
        var sql = postsql.post_getAllList;
        logger.info(sql);
        pool.query(sql, [0], function (err, rows, fields) {
            if (err) {
                logger.error(err);
                return callback(err, null);
            }
            if (rows && rows.length > 0) {
                return callback(null, rows);
            }
            callback(null, rows);
        })
    },
    updatePost: function (params, callback) {
        var sql = postsql.post_update_sql;
        logger.info(sql);
        pool.query(sql, [params.title, params.maparea, params.price, params.pic, params.content, params.id], function (err, rows, fields) {
            if (err) {
                logger.error(err);
                return callback(err, null);
            }
            callback(null, rows);
        })
    },
    deletePost: function (params, callback) {
        var sql = postsql.post_delete_sql;
        pool.query(sql, [params.id], function (err, rows, fields) {
            if (err) {
                logger.error(err);
                return callback(err, null);
            }
            callback(null, rows);
        })
    }
}