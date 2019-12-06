/**
 * Created by slowsay on 2018/2/28.
 */
'use strict';
var config = require('../../config').mysql, mysqlDump = require('mysqldump'), mysql = require('mysql');
var Sqltool = mysql.createPool(config);

exports.Sqltool = Sqltool;


//mysql backup

mysqlDump({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    dest: config.dest
}, function (err) {
})