/**
 * Created by slowsay on 2018/2/28.
 */
'use strict';
var Sequelize = require('sequelize'), config = require('./config'),
    _us = require('underscore');


var sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
    host: config.mysql.host,
    port: config.mysql.port,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00',
    logging: null
    //storage: __dirname + '/storage/database.sqlite'
});
//清空数据
console.log('drop database all schemas')
sequelize.drop();

console.log('sync database all schemas');
sequelize.sync({force: true}).then(function () {
    console.log('complete done');
})['catch'](function (err) {
    console.log(err)
});
//用户表
var Users = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    openid: {
        type: Sequelize.STRING(256),
        allowNull: false,
    },
    region: {
        type: Sequelize.STRING(5),
        allowNull: true,
        validate: {
            isInt: true
        }
    },
    phone: {
        type: Sequelize.STRING(11),
        allowNull: true,
        validate: {
            isInt: true
        }
    },
    username: {
        type: Sequelize.STRING(32),
        allowNull: true
    },
    city: {
        type: Sequelize.STRING(32),
        allowNull: true
    },
    country: {
        type: Sequelize.STRING(32),
        allowNull: true
    },
    province: {
        type: Sequelize.STRING(32),
        allowNull: true
    },
    nickname: {
        type: Sequelize.STRING(32),
        allowNull: false
    },
    sex: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    },
    portraitUrl: {
        type: Sequelize.STRING(256),
        allowNull: true,
        defaultValue: ''
    },
    floor: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    },
    canplay: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    }

});
//验证码
var Friends = sequelize.define('friends', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    openid: {
        type: Sequelize.STRING(256),
        allowNull: false
    },
    fopenid: {
        type: Sequelize.STRING(256),
        allowNull: false
    },
    flag: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    }
})

module.exports = [sequelize, Users, Friends];