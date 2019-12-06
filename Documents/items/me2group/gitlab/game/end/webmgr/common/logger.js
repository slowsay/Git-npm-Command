/**
 * Created by slowsay on 2017/12/19.
 */
'use strict';
var winston = require('winston'),
    moment = require('moment'),
    config = require('../../config');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: '0',
            level: 'info',
            json: false,
            filename: config.log_path + '/success.log',
            timestamp: function () {
                return moment().format('YYYY-MM-DD HH:mm');
            }
        }),
        new (winston.transports.File)({
            name: '1',
            level: 'error',
            json: false,
            filename: config.log_path + '/error.log',
            maxSize: 1024 * 1024 * 60,
            timestamp: function () {
                return moment().format('YYYY-MM-DD HH:mm:ss');
            }
        })
    ]
});
logger.add(winston.transports.Console, {
    level: 'debug',
    timestamp: function () {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    }
})
module.exports = logger;