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
    }

}