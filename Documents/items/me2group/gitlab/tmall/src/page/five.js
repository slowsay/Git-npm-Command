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
    sceneOne: $('.five'),
    sceneTwo: $('.two'),
    init: function () {
        this.sceneOne.addClass('hide');
    },
    render: function () {
    },
    addDownGolden: function () {
        for (var i = 0, arr = this.golden.find('li'); i < arr.length; i++) {
            arr.eq(i).addClass('alphaDown');
        }
    },
    replayGame: function () {
        var _this = this;
        _this.popbox.addClass('hide');
        _this.pig.addClass('pigmotion');
        $('.pig i').removeClass('hide');
        $('.pig li').eq(0).removeClass('pigLbroken');
        $('.pig li').eq(1).removeClass('pigRbroken');
        _this.golden.addClass('hide');
        _this.golden.removeClass('alphaDown');
        $('.l0').addClass('hide');
        $('.l2').addClass('hide');
        $('.power b').css({width: '0px'});
        _dis = 0;
        flag = !1, initmx = 0, initmy = 0, mx = 0, my = 0, emx = 0, emy = 0;
        initmx1 = 0, initmy1 = 0, mx1 = 0, my1 = 0, emx1 = 0, emy1 = 0;
        stepspeed = 0;
        closeflag = !0;
        hero.setY(_hei - 320);
    },
    addListener: function () {
        var _this = this;
        this.replay.on('mousedown touchstart', function () {
            _this.replayGame();
        })
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
    },
    transitionOut: function () {
        this.removeListener();
    }
}