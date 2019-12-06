/**
 * Created by slowsay on 2018/9/19.
 */
'use strict';
var hero = require('./../component/box'),
    twoScene = require('./two'),
    Utils = require('./../component/utils');
var touchspeeds = 2, fication = 4, sy = 0, setime = 0, tanH = 0, fixY = 0,
    _wid = window.innerWidth, _hei = window.innerHeight, speeds = 10, pigspeeds = 10,
    cutdis = 0, countdowns = 10, _dis = 0, countplate = 0, stepspeed = 0, touchdis = 0,
    _pigx = 0, _pigy = 0, _distance = 0, _canh = 0, _this = null, h_dis = 0,
    flag = !1, stopflag = !0, closeflag = !0, bounceflag = !0, amflag = !0, countdownflag = !0, onceflag = !0,
    initmx = 0, initmy = 0, mx = 0, my = 0, emx = 0, emy = 0, powerw = 0, powerli = 3, stepvalue = 20,
    initmx1 = 0, initmy1 = 0, mx1 = 0, my1 = 0, emx1 = 0, emy1 = 0;
module.exports = {
    msg: $('.msg'),
    sceneOne: $('.one'),
    sceneTwo: $('.two'),
    hero: $('.circle'),
    pig: $('.pig'),
    golden: $('.golden'),
    power: $('.power'),
    popbox: $('.popbox'),
    replay: $('.replay'),
    addscore: $('.addscore'),
    cloude: $('.cloude'),
    countdown: $('.countdown'),
    tan: $('.tan'),
    cloudearr: [{x: 50, y: -100}, {x: -50, y: -700}, {x: _wid - 50, y: -900}, {x: _wid - 100, y: -500}],
    init: function () {
        TweenMax.to(this.hero, 0, {x: _wid / 2, y: _hei / 2});
        this.power.find('b').css({background: 'url(./tmall/images/power.jpg) no-repeat'});
        fixY = _hei / 2;

        tanH = this.tan.height();
        powerw = this.power.width();
        this.tan.css({top: this.hero.offset().top + tanH + 'px'});
        this.pig.css({top: '-200px'});
        //产生云
        for (var i = 0, arr = this.cloudearr; i < arr.length; i++) {
            this.cloude.append('<li></li>');
            this.cloude.find('li').eq(i).css({left: arr[i].x + 'px', top: arr[i].y + 'px'});
        }
    },
    render: function () {
        sy = this.hero.offset().top;
        var _h = this.tan.find('i').height(), cutlist = powerw / powerli;
        //能量状态值
        h_dis = Math.ceil(powerw - powerw / tanH * _h);
        $('.power b').css({width: h_dis + 'px'});
        $('.msg').text(h_dis);
        //速度值,倒时数值
        if (onceflag) {
            if (h_dis < cutlist) {
                countdowns = 5;
            }

            if (h_dis >= cutlist && h_dis < cutlist * 2) {
                countdowns = 10
            }
            if (h_dis >= cutlist * 2 && h_dis < cutlist * 3) {
                countdowns = 20
            }
            if (h_dis >= powerw) {
                countdowns = 30
            }
        }
        //if (_dis > 0) {
        //
        //    if (!flag) {
        //_dis *= fication;
        //}
        //}

        if (onceflag) {
            //回弹
            if (!flag) {
                if (sy > fixY) {
                    sy -= h_dis;
                }
                else {
                    sy = fixY;
                }
                if (_h < tanH) {
                    _h += h_dis;
                }
                else {
                    _h = tanH;
                }
                TweenMax.to(this.tan.find('i'), .2, {height: _h + 'px'});
                TweenMax.to(this.hero, .2, {y: sy});
            }

        }
        else {
            //球运动点位
            if (!flag && sy >= _hei / 2) {
                $('.l0').removeClass('hide');
                $('.l2').removeClass('hide');
                sy -= h_dis;
                TweenMax.to(this.hero, .2, {y: sy});
            }
        }
        //开始碰撞动画
        _pigy = this.pig.offset().top, _pigx = this.pig.offset().left;
        _distance = Utils.distanceAB(_pigx, _pigy, hero.x, hero.y);
        _canh = this.pig.height() / 2 + hero.height / 2, _this = this;
        if (stepspeed > 0 && _distance <= _canh && amflag) {
            amflag = !1;
            countplate += 10;
            //爆炸
            $('.sun').removeClass('hide').css({
                left: this.pig.offset().left - 240 / 2,
                top: this.pig.offset().top - 200 / 2
            }).addClass('amsun');
            $('.sun i').eq(0).addClass('amsun');
            $('.sun i').eq(1).addClass('amsun');
            $('.sun i').eq(2).addClass('amsun');
            $('.score').text(countplate);
            this.pig.find('i').addClass('hide');
            this.pig.find('li').eq(0).addClass('pigLbroken');
            this.pig.find('li').eq(1).addClass('pigRbroken');
            this.golden.css({top: this.pig.offset().top})
            this.golden.removeClass('hide');
            this.golden.addClass('alphaDown');
            this.addscore.addClass('addscoreAlphaDown');
            this.addscore.css({top: this.pig.offset().top, left: this.pig.offset().left})
            this.addscore.removeClass('hide');
        }
        //开始进入飞行动画
        if (stepspeed > 0 && closeflag && !flag && onceflag) {
            onceflag = !1;

            this.tan.find('i').animate({height: '460px'}, 200, function () {
                _this.tan.animate({top: _hei * 2 + 'px'}, 300, function () {
                    closeflag = !1;
                    _this.cloude.removeClass('hide');
                    _this.pig.removeClass('hide');
                    _this.countdown.removeClass('hide').addClass('amcountdown');
                });
            });

        }
        //倒计时
        if (countdowns > 0 && !flag) {
            if (countdownflag) {
                countdownflag = !1;
                countdowns -= 1;
                this.countdown.text(countdowns);
                this.setime = setTimeout(function () {
                    clearTimeout(_this.setime);
                    countdownflag = !0;
                }, 1000)
            }
        } else {
            //倒进时结束,弹框
            if (!onceflag) {
                closeflag = !0;
                this.countdown.addClass('hide');
                this.popbox.removeClass('hide');
            }
        }
        //cloude
        if (!closeflag) {
            this.renderMoveCloude();
        }
    },
    /**
     * @description 恢复场景
     */
    resetGameScene: function () {
        hero.setY(_hei / 2);
        cutdis = 0, countdowns = 10, _dis = 0, countplate = 0, stepspeed = 0,
            flag = !1, stopflag = !0, closeflag = !0, bounceflag = !0, amflag = !0, countdownflag = !0, onceflag = !0,
            initmx = 0, initmy = 0, mx = 0, my = 0, emx = 0, emy = 0;
        this.popbox.addClass('hide');
        $('.l0').addClass('hide');
        $('.l2').addClass('hide');
        this.countdown.removeClass('amcountdown').addClass('hide');
        this.tan.find('i').css({height: tanH + 'px'});
        this.tan.css({top: hero.y + tanH + 'px'});
        this.pig.css({top: '-200px'});
        //设置云
        for (var i = 0, arr = this.cloudearr; i < arr.length; i++) {
            this.cloude.find('li').eq(i).css({left: arr[i].x + 'px', top: arr[i].y + 'px'});
        }
        this.cloude.addClass('hide');
        $('.hand').removeClass('hide');
        this.pig.addClass('hide');
        this.pig.find('li').eq(0).removeClass('pigLbroken');
        this.pig.find('li').eq(1).removeClass('pigRbroken');
        $('.score').text(countplate);
    },
    /**
     * @description 背景云,飞猪
     */
    turnPigMotion: function () {
        amflag = !0;
        $('.sun').removeClass('amsun').addClass('hide');
        $('.sun i').eq(0).removeClass('amsun');
        $('.sun i').eq(1).removeClass('amsun');
        $('.sun i').eq(2).removeClass('amsun');
        this.pig.find('i').removeClass('hide');
        this.pig.find('li').eq(0).removeClass('pigLbroken');
        this.pig.find('li').eq(1).removeClass('pigRbroken');
        this.golden.css({top: this.pig.offset().top})
        this.golden.addClass('hide');
        this.golden.removeClass('alphaDown');
        this.addscore.removeClass('addscoreAlphaDown');
        this.addscore.css({top: this.pig.offset().top, left: this.pig.offset().left})
        this.addscore.addClass('hide');
    },
    renderMoveCloude: function () {
        var _pos = this.pig.offset().top, _posx = this.pig.offset().left;
        _pos += pigspeeds;
        if (_pos > _hei + this.pig.height()) {
            this.turnPigMotion();
            _pos = -300;
        }
        this.pig.css({top: _pos + 'px'});
        for (var i = 0, arr = this.cloude.find('li'), pos = 0; i < arr.length; i++) {
            pos = arr.eq(i).offset().top;
            pos += speeds;
            if (pos > _hei) {
                pos = -500
            }
            arr.eq(i).css({top: pos + 'px'});
        }
    },
    addDownGolden: function () {
        for (var i = 0, arr = this.golden.find('li'); i < arr.length; i++) {
            arr.eq(i).addClass('alphaDown');
        }
    },
    addListener: function () {
        this.popbox.find('a').on('mousedown touchend', function () {
            _this.resetGameScene();
        })
        document.addEventListener('touchstart', this.touchHandle, {passive: false});
        document.addEventListener('touchend', this.touchHandle, {passive: false});
        document.addEventListener('touchmove', this.touchHandle, {passive: false});
    },
    removeListener: function () {
        document.removeEventListener('touchstart', this.touchHandle, {passive: false});
        document.removeEventListener('touchend', this.touchHandle, {passive: false});
        document.removeEventListener('touchmove', this.touchHandle, {passive: false});
    },
    touchHandle: function (e) {
        var _h = $('.tan i').height(), _dis1 = 0;
        switch (e.type) {
            case 'touchend':
                e.preventDefault();
                if (e.touches.length == 0) {
                    setime = setTimeout(function () {
                        //只要松手就发射
                        flag = !1;
                        //stepspeed = h_dis * .1;

                    }, 30);
                }
                if (_dis > 0 && sy <= fixY + tanH) {
                    if (_dis > 0) {
                        _h -= stepvalue;
                        sy += stepvalue;
                    }
                }
                TweenMax.to($('.tan i'), .2, {height: _h + 'px'});
                TweenMax.to(_this.hero, .2, {y: sy});
                break;
            case 'touchstart':
                e.preventDefault();
                if (onceflag) {
                    $('.hand').addClass('hide');
                    flag = !0, bounceflag = !0;
                    initmx = e.touches[0].clientX, initmy = e.touches[0].clientY, emx = e.touches[0].clientX, emy = e.touches[0].clientY;
                    if (e.touches.length == 2) {
                        initmx1 = e.touches[1].clientX, initmy1 = e.touches[1].clientY, emx1 = e.touches[1].clientX, emy1 = e.touches[1].clientY;
                    }
                    _h = $('.tan i').height(), sy = _this.hero.offset().top;
                    TweenMax.to($('.tan i'), .2, {height: (_h - 20) + 'px'});
                    TweenMax.to(_this.hero, .2, {y: (sy + 20) + 'px'});
                }

                break;
            case 'touchmove':
                e.preventDefault();
                if (flag && onceflag) {
                    mx += (e.touches[0].clientX - emx) * touchspeeds, my += (e.touches[0].clientY - emy) * touchspeeds;
                    emx = e.touches[0].clientX, emy = e.touches[0].clientY;
                    if (e.touches.length == 2) {
                        emx1 = e.touches[1].clientX, emy1 = e.touches[1].clientY;
                        _dis1 = Math.floor(emy1 - initmy1);
                    }
                    _dis = Math.floor(emy - initmy);
                    if (e.touches.length == 2) {
                        _dis += _dis1;
                    }
                }
                if (_dis < powerw / powerli) {
                    stopflag = !0;
                    stepspeed = 0;
                }
                break;
        }
    },
    transitionIn: function () {
        this.addListener();
    },
    transitionOut: function () {
        this.removeListener();
        $('.power b').css({width: '0px'});
    }
}