/**
 * Created by slowsay on 2017/9/2.
 * 接口路由
 */
'use strict';
var JFum = require('jfum'),
    log = require('./common/logger'),
    config = require('../config'),
    Login = require('./control/loginController'),
    Posts = require('./control/postController'),
    WeixinController = require('./control/weixinController'),
    uploadController = require('./control/uploadfileController'),
    upload = require('jquery-file-upload-middleware'),
    types = require('./core/types');

function checkWebLogin(req, res, next) {
    checkLogin(req, res, function (status) {
        next()
    })
}

function checkLogin(req, res, callback) {
    var _cookies = req.cookies[config.cookie_name] || req.query.cookies || req.body.cookies || req.heads.cookies || '';
    var result = {status: 0};
    if (!_cookies) {
        log.info(types.INVALIDCOOKIE.msg + req.path);
        return callback(-1);
    }
    if (_cookies.length <= 0) {
        result = {errorcode: types.INVALIDLOGIN.code, errormsg: types.INVALIDLOGIN.msg};
        return callback(-1);
    }
}


var jfum = new JFum({
    minFileSize: 10,//1kb
    maxFileSize: 50 * 1024 * 1024,//50mb
    //acceptFileTypes: /\.(.*?)$/i
    accessFileTypes: /\.(gif|png|jpe?g|bmp)$/i
})


module.exports = function (app) {
    app.all('*', function (req, res, next) {
        res.header("Content-Type", "text/html; charset=utf-8");
        next();
    })
    /**
     * @description 路由
     */
    app.get('/', function (req, res) {
        res.redirect('/');
    })
    //upload
    app.get('/upload', function (req, res) {
        res.redirect('/');
    });
    app.put('/upload', function (req, res) {
        res.redirect('/');
    });
    app.delete('/upload', function (req, res) {
        res.redirect('/');
    });

    /**
     * @description 接口
     */
    app.post('/user/getUserInfo', Login.getUserInfo);
    app.post('/user/userList',Login.userList)


    //upload file
    //app.post('/upload', upload.fileHandler());
    //app.options('/user/upload', jfum.optionsHandler.bind(jfum));
    //app.post('/user/upload', jfum.postHandler.bind(jfum), uploadController.uploadfile);

    //weixin
    //app.post('/weixin/login', WeixinController.login);
    //app.post('/weixin/getOpenId', WeixinController.getOpenId);
    //app.post('/weixin/getToken', WeixinController.getToken);
    //app.post('/weixin/getUserInfo', WeixinController.getUserInfo);
    //app.post('/weixin/getWeiXinSDK',WeixinController.getWeiXinSDK)
}