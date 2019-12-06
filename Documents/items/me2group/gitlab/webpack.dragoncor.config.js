/**
 * Created by slowsay on 17/7/24.
 */
'use strict';
const path = require('path');
const webpack = require('webpack');
const Htmltpl = require('html-webpack-plugin');
const CssPlugin = require('extract-text-webpack-plugin');
const uglify = new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    output: {comments: false},
    compress: {drop_console: false, warnings: false}
})

const node_modules = path.resolve(__dirname, 'node_modules');
const dirinput = './dragoncor/';
const output = './dist/dragoncor';
process.noDeprecation = true;
module.exports = {
    devtool: false,
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: CssPlugin.extract({
                    fallback: 'style-loader',
                    use: [{loader: 'css-loader', options: {minimize: true}}]
                })
            },
            {
                test: /\.js|jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react'],
                    }
                }]
            }, {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'url-loader?limit=8192'
                }]
            }
        ]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.ProvidePlugin({$: 'jquery'}),
        new Htmltpl({
            title: '龙地官网',
            filename: 'index.html',
            inject: true,
            template: dirinput + './tpl/index.html',
            minify: {
                removeComments: false,
                collapseWhitespace: false
            }
        }),uglify,
        new CssPlugin('./main.min.css')
    ],
    entry: {
        index: [dirinput + './src/', dirinput + './css/main.css']
    },
    output: {
        path: path.resolve(__dirname, output),
        filename: '[name].min.js',
        //assetsRoot: path.resolve(__dirname, '../dist'),
        //assetsSubDirectory: 'static',
        //assetsPublicPath: '/m',// ==>/m/static/xxx.xx
        publicPath: '/'

    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src')]
    }
}