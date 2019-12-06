/**
 * Created by slowsay on 2018/9/19.
 */
'use strict';
module.exports = {
    distanceAB: function (vx, vy, rx, ry) {
        return Math.sqrt(Math.pow(vx - rx, 2) + Math.pow(vy - ry, 2));
    },
    setX: function (obj, v) {
        obj.css({left: v + 'px'});
    },
    setY: function (obj, v) {
        obj.css({top: v + 'px'})
    },
    getX: function (obj) {
        return obj.offset().left;
    },
    getY: function (obj) {
        return obj.offset().top;
    },
    ismobile: function () {
        var ua = navigator.userAgent;
        if (/AppleWebKit.*Mobile/i.test(ua) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(ua))) {
            //mobile
            return true;
        } else {
            //pc
            return false;
        }
    }

}