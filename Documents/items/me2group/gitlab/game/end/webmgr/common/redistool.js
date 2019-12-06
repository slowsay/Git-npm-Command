/**
 * Created by slowsay on 2018/3/1.
 * redis管理
 */
'use strict';
var redis = require('redis'),
    logger = require('./logger'),
    userDao = require('../dao/userdao'),
    roomDao = require('../dao/roomdao'),
    config = require('../../config').redis;


var client = redis.createClient(config.port, config.host);
client.auth(config.options.auth_pass);

var LOGIN_PROFIX = 'session_';
var TOKEN_EXPIRE_TIME = 30 * 24 * 3600;
var SCANNING_TIME_PROFIX = 'scanning_time_';
var SCANNING_EXPIRE_PROFIX = 3 * 60;
var ROOM_PROFIX = 'room_';
var USER_TIME_PROFIX = 50 * 60;

module.exports = {
    client: client,
    setUserToken: function (id, token) {
        logger.info('login_prefix', LOGIN_PROFIX + id);
        client.set(LOGIN_PROFIX + id, token);
        client.expire(LOGIN_PROFIX + id, TOKEN_EXPIRE_TIME);
    },
    setRoomInfo: function (room_id, type) {
        if (type === 'del') {
            logger.info('del redis rooms');
            client.del(ROOM_PROFIX + room_id);
        }
        else {
            roomDao.getById({phone: room_id}, function (err, data) {
                if (err) {
                    logger.error(err);
                    return;
                }
                if (data) {
                    for (var i in data) {
                        client.set(ROOM_PROFIX + String(data[i].phone), JSON.stringify(data[i]));
                        client.expire(ROOM_PROFIX + String(data[i].phone), USER_TIME_PROFIX);
                    }
                    logger.info('update room redis success');
                }
                else {
                    logger.error('update room redis failed', room_id);
                }
            })
        }
    },
    updateUserInfo: function (id) {
        userDao.getByid({phone: phone}, function (err, data) {

        })
    }
}