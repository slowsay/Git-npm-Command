/**
 * Created by slowsay on 2017/9/8.
 */
'use strict';
module.exports = require('./config_product');
if (!process.env.NODE_ENV || process.env.NODE_ENV == 'development') {
    module.exports = require('./config_test')
}