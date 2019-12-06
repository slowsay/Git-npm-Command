/**
 * Created by slowsay on 9/26/18.
 * 集成类
 * @by jack
 */
'use strict';
window.Sprites = {
    extend: [],
    cuti: 0,
    /**
     * @descrption 集成类
     * @param Class
     */
    extends: function (Class) {
        if (typeof Class == 'object') {
            this.extend.push(Class);
        }
    },
    /**
     * @description 初始化类
     */
    init: function () {
        for (var i = 0, arr = this.extend; i < arr.length; i++) {
            arr[i].init();
        }
    },
    /**
     * @description 路由导航
     */
    router: function () {
        for (var i = 0, arr = this.extend; i < arr.length; i++) {
            if (i == this.cuti) {
                arr[i].transitionIn();
            }
        }
    },
    /**
     * @description 物体定位
     * @param obj
     * @param x
     * @param y
     * @param w
     * @param h
     */
    setxy: function (obj, x, y, w, h) {
        obj.css({
            position: 'absolute',
            width: w + 'px',
            height: h + 'px',
            transform: 'translate(' + x + 'px,' + y + 'px)',
        })
    },
    /**
     * @description 填图定位
     * @method posxy
     *
     */
    posxy: function (obj, path, x, y, w, h, sx, sy) {
        obj.css({
            position: 'absolute',
            width: w + 'px',
            height: h + 'px',
            transform: 'translate(' + x + 'px,' + y + 'px)',
            background: 'url(' + path + ') no-repeat ' + sx * -1 + 'px ' + sy * -1 + 'px'
        })
    },
    /**
     * @description 填图,添动画,定位
     * @param obj
     * @param path
     * @param animate
     * @param x
     * @param y
     * @param w
     * @param h
     * @param sx
     * @param sy
     */
    posxyanimate: function (obj, path, animate, x, y, w, h, sx, sy) {
        obj.css({
            position: 'absolute',
            width: w + 'px',
            height: h + 'px',
            transform: 'translate(' + x + 'px,' + y + 'px)',
            animation: animate,
            background: 'url(' + path + ') no-repeat ' + sx * -1 + 'px ' + sy * -1 + 'px'
        })
    },
    /**
     * @description 检测手机
     * @param v
     * @returns {boolean}
     */
    checkPhone: function (v) {
        var _regexp = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        return _regexp.test(v);
    }
}