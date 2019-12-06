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
const dirinput = './';
const output = './dist';
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
            title: 'tmall',
            filename: 'index.html',
            inject: true,
            template: dirinput + './tpl/index.html',
            minify: {
                removeComments: false,
                collapseWhitespace: false
            }
        }),
        new CssPlugin('./main.min.css'), uglify
    ],
    entry: {
        index: [dirinput + './src/', dirinput + './css/main.css']
    },
    output: {
        path: path.resolve(__dirname, output),
        filename: '[name].min.js',
        publicPath: ''

    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src')]
    }
}