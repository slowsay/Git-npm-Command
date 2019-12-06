/**
 * Created by slowsay on 2017/9/2.
 * 配置
 */
'use strict';
var express = require('express'), http = require('http'), https = require('https'), path = require('path'), fs = require('fs'),
    expressValidator = require('express-validator'),
    ejs = require('ejs'),
    events = require('events'),
    logger = require('morgan'),
    winston = require('winston'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    redisClient = require('./webmgr/common/redistool'),
    upload = require('jquery-file-upload-middleware'),
    cookieParser = require('cookie-parser');
var config = require('./config');
var app = express(), servers = https.createServer({
        key: fs.readFileSync(config.socket.ssl_key),
        cert: fs.readFileSync(config.socket.ssl_cert)
    }),
    server = http.createServer(app), WebSocketServer = require('ws').Server, upload_config = null, loggerEvent = null;
var wss = new WebSocketServer({
    server: servers
})


//port
server.listen(config.port);

//websocket
wss.on('connection', function (ws) {
    require('./websocket/router')(ws);
})
servers.listen(config.socket.port, function () {
    console.log('listening on' + servers.address().port);
})


//html render   login.html==> app.get(/login)
app.engine('.html', ejs.__express);
//配置html路径
app.set('views', __dirname + '/html');
app.set('view engine', 'html');
//Access-Control-Allow-Origin
if (process.env.NODE_ENV != 'product') {
    app.use(cors());
}

//upload config
upload_config = {
    hostname: 'api.taoring.com',
    maxFileSize: 5 * 1024 * 1024,
    maxPostSize: 5 * 1024 * 1024,
    uploadDir: __dirname + '/static/uploads/',
    uploadUrl: '/uploads'
};
upload.configure(upload_config);

//request日志记录
app.use(logger('dev'));
//req表单变量检测
app.use(expressValidator());
//cookies管理
app.use(cookieParser());
//静态资源路径
app.use(express.static(path.join(__dirname + '/static')));

//express configuration
//app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//事件日志记录
loggerEvent = new events.EventEmitter();
loggerEvent.on('newEvent', function (e, data) {
    console.log(e, JSON.stringify(data));
});
loggerEvent.on('debug', function (e, data) {
    console.log(e, JSON.stringify(data));
})


require('./webmgr/router')(app);

//room data set into redis
redisClient.setRoomInfo('all');