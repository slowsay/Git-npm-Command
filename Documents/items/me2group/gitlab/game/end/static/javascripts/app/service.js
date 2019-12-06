/**
 * Created by Feil.Wang(wangfeilong@xuexibao.cn) on 2015/10/27.
 */
define(['jquery', 'config'], function ($, Conf) {
    function Service() {
        this.basePath = '/';
    }

    Service.prototype = {
        constructor: Service,
        proxy: function (method, url, param, cb) {
            $.ajax({
                type: method,
                url: this.basePath + url,
                dataType: 'json',
                data: param,
                success: function (res) {
                    console.info("res:",res)
                    if (typeof cb === 'function') {
                        if (res.status == 0) {
                            console.info('API [' + url + '] success:', res);
                            cb(null, res)
                        } else {
                            console.warn('API [' + url + '] error:', res.msg, ',status:', res.status);
                            cb(res);
                        }
                    } else {
                        console.info('no callback, Server Proxy result', res);
                    }
                }
            })
        },
        //登录
        login: function (param, cb) {
            this.proxy('POST', 'webmgr/login', param, cb)
        },
        //获取验证码
        getVCode: function (param, cb) {
            this.proxy('POST', 'webmgr/sendVerifyCode', param, cb)
        },
        //注册
        register: function (param, cb) {
            this.proxy('POST', 'webmgr/register', param, cb)
        },
        //修改密码
        changePwd: function (param, cb) {
            this.proxy('POST', 'webmgr/changePasswordByVerifyCode', param, cb)
        },
        //创建房间
        createRoom: function (param, cb) {
            this.proxy('POST', 'api/room/add', param, cb)
        },
        //修改房间
        updateRoom: function (param, cb) {
            this.proxy('POST', 'api/room/update', param, cb)
        },
        //删除房间
        deleteRoom: function (param, cb) {
            this.proxy('POST', 'webmgr/room/del', param, cb)
        },
        //我的房间列表
        getRoomList: function (param, cb) {
            this.proxy('POST', 'webmgr/room/listMy', param, cb)
        },
        //其他房间列表
        getRoomListOther: function (param, cb) {
            console.info("getRoomListOther--:",param)
            this.proxy('POST', 'webmgr/room/listOther', param, cb)
        },
        //获取当前环境配置信息
        getConfig: function (param, cb) {
            console.info("webmgr/config/getConfig--:",param)
            this.proxy('POST', 'webmgr/config/getConfig', param, cb)
        },
        //获取房间信息
        getRoomInfo:function(param,cb){
            this.proxy('POST', 'webmgr/room/getRoomByRoomId', param, cb)
        }


    };
    return new Service();
});