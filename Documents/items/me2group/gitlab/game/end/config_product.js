/**
 * Created by slowsay on 2017/9/8.
 */
'use strict';
const path = require('path');
module.exports = {
    env: 'product',
    port: 8199,
    sinal_server: '127.0.0.1:9090',
    appid: 'wxcfc899509163894d',//taoring
    appsecret: 'cf20250d89aae6f3e757ebee39325518',
    acrossdomain: 'https://api.taoring.com',
    session_secret: '',
    cookie_name: 'ayapost',
    TOKEN: 'token',
    log_path: path.join(__dirname, './logs'),
    UPLOADURL: 'https://api.taoring.com/upload',
    UPLOADTOKEN: '',
    weixin_url: 'https://api.weixin.qq.com/sns/jscode2session',
    weixin: {
        TokenURL: 'https://api.weixin.qq.com/cgi-bin/token',//直接获取access_token
        OauthAuthorizeURL: 'https://open.weixin.qq.com/connect/oauth2/authorize',//1用户同意授权,获取code
        AccessTokenURL: 'https://api.weixin.qq.com/sns/oauth2/access_token',//2网页授权access_token,用code获取openid
        OauthFreshURL: 'https://api.weixin.qq.com/sns/oauth2/refresh_token',//3刷新access_token
        UserInfoURL: 'https://api.weixin.qq.com/sns/userinfo',//4拉取用户信息
        AuthURL: 'https://api.weixin.qq.com/sns/auth',//检验授权凭证
        GetTicket:'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
        testappid:'wx9297f12e686d533a',//test
        testappsecret:'8b7c5eaf0aa26b528387da44df68d03c',
        appid: 'wxfbe0c4b86a354089',//me2group
        appsecret: '29d9adf321296e2652d49c688000bb53',
    },
    socket: {
        ssl: true,
        port: 9092,
        ssl_key: '/etc/nginx/api/214543376920990.key',
        ssl_cert: '/etc/nginx/api/214543376920990.pem'
    },
    mysql: {
        host: '127.0.0.1',
        user: 'root',
        password: 'XK2SKJAMD',
        database: 'h5game',
        port: 3306,
        connectionLimit: 20,
        connectTimeout: 10000,
        debug: false,
        dest: __dirname + '/schema/data.sql'
    },
    redis: {
        host: '127.0.0.1',
        port: 6379,
        options: {auth_pass: 'ayaim_2017_jacktao'}
    },
    sns: {
        host: 'http://cowsms.market.alicloudapi.com/intf/smsapi',
        appkey: '24899145',
        appsecret: '849039e06de14606ef55de6292f7895e',
        appcode: '77e8d71da17c41fa842440ba9ad69c7e'
    }
}