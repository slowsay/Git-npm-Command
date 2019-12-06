/**
 * Created by slowsay on 2018/9/8.
 */
'use strict';
var Home = require('page/home'),
    Cases = require('page/case'),
    conf = require('config/config_project'),
    $ = require('jquery'),
    storage = localStorage,
    userinfo = null,
    mflag = !1, ua = navigator.userAgent;
if (/AppleWebKit.*Mobile/i.test(ua) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(ua))) {
    //mobile
    mflag = !0;
} else {
    //pc
}
if (getUrlParam('code')) {
    if (storage.getItem('getUserInfo')) {
        userinfo = JSON.parse(storage.getItem('getUserInfo'));
        //$.ajax({
        //    url: conf.apiurl + conf.userInfo,
        //    type: 'post',
        //    dataType: 'json',
        //    data: {
        //        openid: userinfo.openid,
        //        nickname: userinfo.nickname,
        //        sex: userinfo.sex,
        //        city: userinfo.city,
        //        province: userinfo.province,
        //        country: userinfo.country,
        //        headimgurl: userinfo.headimgurl
        //    },
        //    success: function (e) {
        //        if (e.status) {
        //            Home.init(e.data);
        //        }
        //        else {
        //            //todo
        //        }
        //    }
        //});
        rankslist()

    } else {
        $.ajax({
            url: conf.url + conf.getOpenid,
            type: 'post',
            dataType: 'json',
            data: {code: getUrlParam('code')},
            success: function (e) {
                storage.setItem('openid', e.data.openid), storage.setItem('token', e.data.access_token);
                var openid = e.data.openid, token = e.data.access_token
                if (e.status == 1) {
                    if (e.data.errcode) {
                        location.href = 'https://api.taoring.com/';
                    } else {
                        $.ajax({
                            url: conf.url + conf.getUserInfo,
                            type: 'post',
                            dataType: 'json',
                            data: {token: token, openid: openid},
                            success: function (e) {
                                storage.setItem('getUserInfo', JSON.stringify(e.data));
                                rankslist()
                            }
                        })
                    }
                }
            }
        })
    }

}
else {
    location.href = 'https://api.taoring.com?url=http://www.taoring.com/h5game';
}

$('.play').on('touchend', function (e) {
    $('.play').fadeOut();
    $('.ranks').fadeIn();
    //_hmt.push(["_trackEvent", "nav", "click", tabName[$(this).index()]]);
});

function rankslist() {
    //rank
    $.ajax({
        url: conf.apiurl + conf.userlist, type: 'post', dataType: 'json', data: {}, success: function (e) {
            if (e.status) {
                for (var i = 0, arr = e.data, s = ''; i < arr.length; i++) {
                    s += '<li>' + (i + 1) + '</li><li><img src=' + arr[i].portraitUrl + ' height="30" />' + arr[i].nickname + '</li><li>' + arr[i].floor + '</li>';
                }
                $('.ranks .list').html(s);
            }
        }
    })

}