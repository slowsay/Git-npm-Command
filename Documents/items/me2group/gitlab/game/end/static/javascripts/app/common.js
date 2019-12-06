/**
 * Created by Feil.Wang(wangfeilong@xuexibao.cn) on 2015/10/27.
 */
define(['dialog', 'config'], function (Dialog, Config) {


    /**
     * base64加密解密
     */
    (function ($) {
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            a256 = '',
            r64 = [256],
            r256 = [256],
            i = 0;

        var UTF8 = {
            encode: function (strUni) {
                var strUtf = strUni.replace(/[\u0080-\u07ff]/g,
                    function (c) {
                        var cc = c.charCodeAt(0);
                        return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
                    })
                    .replace(/[\u0800-\uffff]/g,
                        function (c) {
                            var cc = c.charCodeAt(0);
                            return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f);
                        });
                return strUtf;
            },
            decode: function (strUtf) {
                var strUni = strUtf.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,
                    function (c) {
                        var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f);
                        return String.fromCharCode(cc);
                    })
                    .replace(/[\u00c0-\u00df][\u0080-\u00bf]/g,
                        function (c) {
                            var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
                            return String.fromCharCode(cc);
                        });
                return strUni;
            }
        };

        while (i < 256) {
            var c = String.fromCharCode(i);
            a256 += c;
            r256[i] = i;
            r64[i] = b64.indexOf(c);
            ++i;
        }

        function code(s, discard, alpha, beta, w1, w2) {
            s = String(s);
            var buffer = 0,
                i = 0,
                length = s.length,
                result = '',
                bitsInBuffer = 0;

            while (i < length) {
                var c = s.charCodeAt(i);
                c = c < 256 ? alpha[c] : -1;

                buffer = (buffer << w1) + c;
                bitsInBuffer += w1;

                while (bitsInBuffer >= w2) {
                    bitsInBuffer -= w2;
                    var tmp = buffer >> bitsInBuffer;
                    result += beta.charAt(tmp);
                    buffer ^= tmp << bitsInBuffer;
                }
                ++i;
            }
            if (!discard && bitsInBuffer > 0) result += beta.charAt(buffer << (w2 - bitsInBuffer));
            return result;
        }

        var Plugin = $.base64 = function (dir, input, encode) {
            return input ? Plugin[dir](input, encode) : dir ? null : this;
        };

        Plugin.btoa = Plugin.encode = function (plain, utf8encode) {
            plain = Plugin.raw === false || Plugin.utf8encode || utf8encode ? UTF8.encode(plain) : plain;
            plain = code(plain, false, r256, b64, 8, 6);
            return plain + '===='.slice((plain.length % 4) || 4);
        };

        Plugin.atob = Plugin.decode = function (coded, utf8decode) {
            coded = coded.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            coded = String(coded).split('=');
            var i = coded.length;
            do {
                --i;
                coded[i] = code(coded[i], true, r64, a256, 6, 8);
            } while (i > 0);
            coded = coded.join('');
            return Plugin.raw === false || Plugin.utf8decode || utf8decode ? UTF8.decode(coded) : coded;
        };
    }(jQuery));
    $.base64.utf8encode = true;
    $.base64.utf8decode = true;

    return {
        dialog: Dialog,

        getQueryString: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
            var r = window.location.search.substr(1).match(reg);
            if (r!=null) return (r[2]); return null;
        },

        toast: function (content, fn, time) {
            var duration = time || 1500;
            var d = Dialog({
                id: 'dialogToast',
                content: content
            }).show();
            setTimeout(function () {
                d.close().remove();
                if (typeof fn === "function") fn();
            }, duration);
        },
        tips: {
            show: function ($obj, type, content, callback) {
                var alertClass;
                switch (type) {
                    case 'warning':
                        alertClass = 'alert alert-danger';
                        break;
                    case 'success':
                        alertClass = 'alert alert-success';
                        break;
                    default:
                        break;
                }
                $obj.text(content)
                    .attr('class', alertClass)
                    .slideDown(function () {
                        if (typeof callback == 'function') {
                            callback();
                        }
                    });
            },
            hide: function ($obj, callback) {
                $obj.fadeOut(function () {
                    if (typeof callback == 'function') {
                        callback();
                    }
                });
            }
        },
        isPhone: function (val) {
            return /^1[3|4|5|7|8][0-9]{9}$/.test(val)
        },
        getField: function (name) {
            return $('[name="' + name + '"]');
        },
        getFieldVal: function (name) {
            return $.trim(this.getField(name).val());
        },
        //这是有设定过期时间的使用示例：
        //s20是代表20秒
        //h是指小时，如12小时则是：h12
        //d是天数，30天则：d30
        //m是分钟
        setCookie: function (name, value, time) {
            var strsec = this.getsec(time);
            var exp = new Date();
            exp.setTime(exp.getTime() + strsec * 1);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();

        },
        getsec: function (str) {
            var str1 = str.substring(1, str.length) * 1;
            var str2 = str.substring(0, 1);
            if (str2 == "s") {
                return str1 * 1000;
            } else if (str2 == "m") {
                return str1 * 60 * 1000;
            } else if (str2 == "h") {
                return str1 * 60 * 60 * 1000;
            } else if (str2 == "d") {
                return str1 * 24 * 60 * 60 * 1000;
            }
        },
        getCookie: function (name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

            if (arr = document.cookie.match(reg)) return (arr[2]);
            else return null;
        },
        delCookie: function (name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = this.getCookie(name);
            if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        },
        getClientRunParams: function (roomId, roomName, creatorName, userType,callback) {
            var innerthis = this;

             this.proxy('POST', 'webmgr/config/getConfig', {}, function (err,res) {
                var cts_ip = res.cts_ip;
                var cts_port = res.cts_port;
                var dts_ip = res.dts_ip;
                var dts_port = res.dts_port;
                var userName = innerthis.getCookie('onlineroom.userName'),
                    nickName = innerthis.getCookie('onlineroom.nickName');
                 var userId = innerthis.getCookie('onlineroom.userId');
                var runParams = 'cts_ip=' + cts_ip
                    + '&cts_port=' + cts_port
                    + '&dts_ip=' + dts_ip
                    + '&dts_port=' + dts_port
                    + '&roomid=' + roomId
                    + '&roomname=' + roomName
                    + '&creatorname=' + creatorName
                    //username 唯一性
                    + '&username=' + userId
                    + '&nickname=' + nickName
                    + '&type=' + userType
                    + '&token=pass';
                callback(null,$.base64('encode', runParams));

            });
        },
        proxy: function (method, url, param, cb) {
            $.ajax({
                type: method,
                url: '/' + url,
                dataType: 'json',
                data: param,
                success: function (res) {
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
        }
    }
});