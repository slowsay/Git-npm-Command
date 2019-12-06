/**
 * Created by slowsay on 2017/9/2.
 * 用户模块
 * 1.检测登录
 * 2.用户信息
 * 3.退出系统
 *
 */
'use strict';
var types = require('../core/types'),
    conf = require('../../config'),
    userService = require('../service/userservice'),
    redisTool = require('../common/redistool'),
    superagent = require('superagent'),
    randkey = require('random-key'),
    request = require('request'),
    Utils = require('../core/utils'),
    logger = require('../common/logger');

/**
 * @description 机构登录
 * @param req
 * @param res
 */
function getUserInfo(req, res) {
    if (!req.body) return res.status(404).send('Not Found');
    var result = {status: 0}, openid = req.body.openid, nickname = req.body.nickname, province = req.body.province,
        country = req.body.country, sex = req.body.sex, city = req.body.city, headimgurl = req.body.headimgurl;
    userService.getByOpenid({openid: openid}, function (err, data) {
        if (err) {
            logger.error(err);
            result.errorcode = err;
            result.errormsg = "openid查询失败";
            return res.send(result);
        }
        logger.info('user[userLogin]', {timestamp: Date.now(), pid: process.pid, openid: openid, city: city});
        if (data) {
            result.data = data;
            result.status = 1;
            return res.send(result);
        }
        else {
            userService.add({
                openid: openid,
                nickname: nickname,
                sex: sex,
                headimgurl: headimgurl,
                country: country,
                city: city,
                province: province
            }, function (err, data) {
                if (err) {
                    logger.error(err);
                    result.errorcode = err;
                    result.errormsg = "添加失败";
                    return res.send(result);
                }
                if (data) {
                    logger.info('user[useradd]', {timestamp: Date.now(), pid: process.pid, openid: openid});
                    result.status = 1;
                    return res.send(result)
                }
            })
        }
    })
    //userService.login({phone: phone}, function (err, data) {
    //    if (err) {
    //        logger.error(err),
    //            result.errorcode = err,
    //            result.errormsg = "登录失败";
    //        return res.send(result);
    //    }
    //    if (data) {
    //        var _hash = Utils.hash(password, data.passwordSalt);
    //        if (data.passwordHash === _hash) {
    //            //redis
    //            redisTool.setRoomInfo(phone);
    //            result.data = {success: true, info: data};
    //            result.status = 1;
    //        }
    //        else {
    //            result.errorcode = 101, result.errormsg = '密码有误!';
    //        }
    //        return res.send(result);
    //    }
    //    else {
    //        result.errormsg = '用户未注册';
    //        return res.send(result);
    //    }
    //
    //})

}
/**
 * @description 用户列表
 * @param req
 * @param res
 */
function userList(req, res) {
    if (!req.body) return res.status(404).send('Not Found');
    var result = {status: 0}, pagesize = req.body.pagesize || 10;
    userService.userList({
        pageindex: 0,
        pagesize: pagesize,
    }, function (err, data) {
        if (err) {
            logger.error(err);
            result.errorcode = err;
            result.errormsg = "查询失败";
            return res.send(result);
        }
        if (data) {
            result.status = 1;
            result.data = data;
            return res.send(result)
        }
    })
}
module.exports = {
    getUserInfo: getUserInfo,
    userList: userList
}


