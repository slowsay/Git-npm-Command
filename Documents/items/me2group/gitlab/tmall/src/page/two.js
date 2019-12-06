/**
 * Created by slowsay on 2018/9/19.
 */
'use strict';
var hero = require('./../component/box'), Utils = require('./../component/utils');
var touchspeeds = 2, sx = 0, sy = 0, _dis = 0, roundspeeds = 0, closeflag = !0, powerlen = 180, powerflag = !1,
    _wid = window.innerWidth, _hei = window.innerHeight, stopflag = !1, stepspeed = 0, setime = 0, bounce = 0.08,
    flag = !1, initmx = 0, initmy = 0, mx = 0, my = 0, emx = 0, emy = 0,
    initmx1 = 0, initmy1 = 0, mx1 = 0, my1 = 0, emx1 = 0, emy1 = 0;
module.exports = {
    sceneOne: $('.two'),
    sceneTwo: $('.three'),
    pigfly:$('.pigfly'),
    hero: $('.circlefly'),
    init: function () {
        this.sceneOne.addClass('hide');
        Utils.setX(this.hero, _wid / 2);
        Utils.setY(this.hero, _hei - 320);
    },
    render: function () {

    },
    addListener: function () {
        document.addEventListener('touchstart', this.touchHandle, {passive: false});
        document.addEventListener('touchend', this.touchHandle, {passive: false});
        document.addEventListener('touchmove', this.touchHandle, {passive: false});
    },
    removeListener: function () {
        this.replay.off();
        document.removeEventListener('touchstart', this.touchHandle, {passive: false});
        document.removeEventListener('touchend', this.touchHandle, {passive: false});
        document.removeEventListener('touchmove', this.touchHandle, {passive: false});
    },
    touchHandle: function (e) {
        switch (e.type) {
            case 'touchend':
                e.preventDefault();
                flag = !1;
                break;
            case 'touchstart':
                e.preventDefault();
                powerflag = !0;
                flag = !0;
                //if (e.touches.length == 2) {
                $('.hand').addClass('hide');
                initmx = e.touches[0].clientX, initmy = e.touches[0].clientY, emx = e.touches[0].clientX, emy = e.touches[0].clientY;
                //initmx1 = e.touches[1].clientX, initmy1 = e.touches[1].clientY, initmy1 = e.touches[1].clientY, emy1 = e.touches[1].clientY;
                //}
                break;
            case 'touchmove':
                e.preventDefault();
                if (flag) {
                    //if (e.touches.length == 2) {
                    emx = e.touches[0].clientX, emy = e.touches[0].clientY;
                    //emx1 = e.touches[1].clientX, emy1 = e.touches[1].clientY;
                    //}
                }
                break;
        }
    },
    transitionIn: function () {
        this.addListener();
        this.pigfly.addClass('pigmotion')
    },
    transitionOut: function () {
        this.removeListener();
    }
}