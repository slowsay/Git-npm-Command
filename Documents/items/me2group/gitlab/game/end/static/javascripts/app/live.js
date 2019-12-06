/**
 * Created by bisheng on 2016/11/2.
 */

require(['jquery', 'common', 'config', 'service', 'bootstrap'], function ($, Common, Config, Service, Bootstrap) {
    $('#home_button').on('click', function (e) {
        window.location.href = 'http://www.abcpen.com';
    });

    $('#enter_room_button').on('click', function(e) {
        Room.enter_room($('#room_id').val());
    });

    var Room = {
        init: function () {
        },
        enter_room: function () {
            room_id = this.getQueryString('room_id');
            if (navigator.userAgent.match(/android/i)) {
                this.enter_android(room_id);
            } else if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
                this.enter_ios(room_id);
            } else {
                this.enter_pc(room_id);
            }
        },

        enter_ios: function (room_id) {
            var appstore = "https://itunes.apple.com/us/app/bi-sheng/id1169271807?l=zh&ls=1&mt=8";  //IOS下载地址
            var enter_url = "didaonline://Dida/startcourse?roomId=" + room_id;

            var loadDateTime = new Date();
            window.setTimeout(function() {
                    var timeOutDateTime = new Date();
                    if (timeOutDateTime - loadDateTime < 5000) {
                        window.location = appstore;
                    } else {
                        window.close();
                    }
                },
                2000);
            window.location = enter_url;
        },

        enter_android: function (room_id) {
            var appstore = "http://a.app.qq.com/o/simple.jsp?pkgname=com.dida.liveclassroom";
            var enter_url = "didaonline://Dida/startcourse?roomId=" + room_id;

            if(this.is_qq() || this.is_weibo() || this.is_weixin()){
                window.location.href = appstore;
            } else {
                window.location.href = enter_url;
                window.setTimeout(function(){
                    window.location.href = appstore;
                },2000);
            }
        },

        enter_pc: function (room_id) {
            window.location = "https://www.abcpen.com/app/ibeelive-release.exe";
        },

        is_weixin: function () {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return true;
            } else {
                return false;
            }
        },

        is_weibo: function () {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/weibo/i) == "weibo") {
                return true;
            } else {
                return false;
            }
        },

        is_qq: function () {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/QQ/i) == 'qq') {
                return true;
            } else {
                return false;
            }
        },

        getQueryString: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
            var r = window.location.search.substr(1).match(reg);
            if (r!=null) return (r[2]); return null;
        }
    };
});