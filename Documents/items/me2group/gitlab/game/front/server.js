/**
 * Created by slowsay on 17/7/24.
 */
'use strict';

const webpack = require('webpack');
const webdev = require('webpack-dev-server');
const config = require('./webpack.config');
const server = new webdev(webpack(config), {
    publicPath: config.output.publicPath, noInfo: false, hot: true, historyApiFallback: true,
    stats: {colors: true}
}).listen(3013, '127.0.0.1', function (err, result) {
    if (err)
        console.log(err.log);
    console.log('connection success localhost:3013');
});