/**
 * Created by slowsay on 2018/11/28.
 */
'use strict';
var conf = require('../../config'),
    redisTool = require('../common/redistool'),
    randkey = require("random-key"),
    utils = require("../core/utils"),
    sha1=require('sha1'),
    crypto = require('crypto'),
    superagent = require('superagent'),
    logger = require('../common/logger');
/**
 * @description 微信登录授权
 * step 1
 * @param req
 * @param res
 * @returns {*}
 */
async function login(req, res) {
    if (!req.body) return res.status(404).send('Not Found');
    res.header("Content-Type", "text/html; charset=utf-8");
    var result = {status: 0}, app_id = conf.weixin.appid, URL = req.body.url || 'https://www.me2group.com',
        responseType = 'code', scope = 'snsapi_userinfo', state = '123#wechat_redirect';
    try {
        var _codes = await superagent.get(conf.weixin.OauthAuthorizeURL).query({
            redirect_uri: URL,
            response_type: responseType,
            scope: scope,
            state: state,
            appid: app_id
        })
        logger.info('weixinAPI[login]', _codes.text);
        result.status = 1;
        result.html = _codes.text;
        return res.send(result);
    }
    catch (e) {
        logger.error('weixinAPI[login]', e);
        return res.send(result);
    }

}
/**
 * @descripton 获取openid
 * step 2
 * @param req
 * @param res
 * @returns {*}
 */
async function getOpenId(req, res) {
    if (!req.body) return res.status(404).send('Not Found');
    var result = {status: 0}, _code = req.body.code;
    try {
        var weixinOpenid = await superagent.get(conf.weixin.AccessTokenURL).query({
            appid: conf.weixin.appid,
            secret: conf.weixin.appsecret,
            code: _code,
            grant_type: 'authorization_code'
        })
        weixinOpenid = JSON.parse(weixinOpenid.text);
        logger.info('weixinAPI[getOpenId]', weixinOpenid);
        result.data = weixinOpenid;
        result.status = 1;
        return res.send(result);

    } catch (e) {
        logger.error('weixinAPI[getOpenId]', e);
        return res.send(result);
    }
};

/**
 * @descripton 获取accesstoken
 * step 3
 * @param req
 * @param res
 */
async function getAccessToken(req, res) {
    if (!req.body) return res.status(404).send('Not Found');
    var result = {status: 0}, client_type = 'client_credential', app_id = conf.weixin.appid, app_secret = conf.weixin.appsecret;
    try {
        var _codes = await
            superagent.get(conf.weixin.TokenUrl).query({
                grant_type: client_type,
                appid: app_id,
                secret: app_secret
            })
        logger.info('weixinAPI[getAccessToken]', _codes.text);
        result.status = 1;
        result.access_token = JSON.parse(_codes.text).access_token;
        return res.send(result);
    }
    catch (e) {
        logger.error('weixinAPI[getAccessToken]', e);
        return res.send(result);
    }
}
/**
 * @description 获取用户信息
 * step 4
 * @param req
 * @param res
 */
async function getUserInfo(req, res) {
    if (!req.body) return res.status(404).send('Not Found');
    var result = {status: 0}, lang = 'zh_CN', openid = req.body.openid, token = req.body.token;
    try {
        var _codes = await
            superagent.get(conf.weixin.UserInfoURL).query({
                access_token: token,
                openid: openid,
                lang: lang
            })
        logger.info('weixinAPI[getUserInfo]', _codes.text);
        result.status = 1;
        result.data = JSON.parse(_codes.text);
        return res.send(result);
    }
    catch (e) {
        logger.error('weixinAPI[getUserInfo]', e);
        return res.send(result);
    }
}
/**
 * @description weixin getAccessToken
 * @return accesstoken
 */
async function getToken(req, res) {
    if (!req.body) return res.status(404).send('Not Found');
    var result = {status: 0}, client_type = 'client_credential', app_id = conf.weixin.appid, app_secret = conf.weixin.appsecret;
    try {
        var _codes = await
            superagent.get(conf.weixin.TokenURL).query({
                grant_type: client_type,
                appid: app_id,
                secret: app_secret
            })
        result.status = 1;
        result.access_token = JSON.parse(_codes.text).access_token;
        logger.info('weixinAPI:request accessToken', app_id);
        return res.send(result);
    }
    catch (e) {
        logger.error('weixinAPI[getToken]', e);
        return res.send(result);
    }
}
/**
 * @description 获取
 * @param req
 * @param res
 * @returns {*}
 */
async function getWeiXinSDK(req, res) {
    if (!req.body) return res.status(404).send('Not Found');
    var result = {status: 0}, client_type = 'client_credential', url = req.body.hrefUrl, app_id = conf.weixin.appid, app_secret = conf.weixin.appsecret;
    if (req.cookies.token) return res.send(result);
    try {
        var _codes = await
            superagent.get(conf.weixin.TokenURL).query({
                grant_type: client_type,
                appid: app_id,
                secret: app_secret
            })
        logger.info('weixinAPI[getWeiXinSDK]', JSON.parse(_codes.text));
        result.access_token = JSON.parse(_codes.text).access_token;
        res.cookie('token', result.access_token);
        getTicket(res, result.access_token, url);
    } catch (e) {
        logger.error('weixinAPI[getWeiXinSDK]', e);
        return res.send(result);
    }
}

async function getTicket(res, token, url) {
    var result = {status: 0}, type = 'jsapi';
    try {
        var _codes = await
            superagent.get(conf.weixin.GetTicket).query({
                access_token: token,
                type: type
            })
        result.status = 1;

        var _ticket = JSON.parse(_codes.text).ticket;
        result.appid = conf.weixin.appid;
        result.timestamp = Date.now();
        result.nonceStr = 'welcomeme2group' + randkey.generateDigits(4);
        var str = 'jsapi_ticket=' + _ticket;
        str += '&noncestr=' + result.nonceStr;
        str += '&timestamp=' + result.timestamp;
        str += '&url=' + url;
        result.signature = sha1(str);
        logger.info('weixinAPI[getTicket]', {ticket:_ticket,signature:str});
        return res.send(result);
    } catch (e) {
        logger.error('weixinAPI[getTicket]', e);
        return res.send(result);
    }

}
module.exports = {
    login: login,
    getOpenId: getOpenId,
    getToken: getToken,
    getAccessToken: getAccessToken,
    getUserInfo: getUserInfo,
    getWeiXinSDK: getWeiXinSDK,
}