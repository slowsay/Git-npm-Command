/**
 * Created by slowsay on 2018/9/19.
 */
'use strict';
var config = require('./../config'),
    Sprite = require('./../display/sprite'),
    Utils = require('./../core/utils');
var touchspeeds = 2, fication = 4, sy = 0, setime = 0, tanH = 0, fixY = 0,
    _wid = window.innerWidth, _hei = window.innerHeight, _scale = 1, maxw = 750, maxh = 1170, speeds = 10, pigspeeds = 10,
    cutdis = 0, countdowns = 10, _dis = 0, countplate = 0, stepspeed = 0, touchdis = 0,
    _pigx = 0, _pigy = 0, _distance = 0, _canh = 0, _this = null, h_dis = 0,
    flag = !1, stopflag = !0, closeflag = !0, bounceflag = !0, amflag = !0, countdownflag = !0, onceflag = !0,
    initmx = 0, initmy = 0, mx = 0, my = 0, emx = 0, emy = 0, powerw = 0, powerli = 3, stepvalue = 20,
    initmx1 = 0, initmy1 = 0, mx1 = 0, my1 = 0, emx1 = 0, emy1 = 0;
module.exports = {
    msg: $('.msg'),
    scene: $('.one'),
    tree: $('.tree'),
    island: $('.island'),
    hotball: $('.hotball'),
    tree0: $('.tree0'),
    leaf: $('.leaf'),
    every: $('.every'),
    title: $('.one .t'), car: $('.homeCar'),
    startBottom: $('.startBottom'), startCastle: $('.startCastle'), startTop: $('.startTop'), sun: $('.one .sun'),
    cloude: $('.cloude'),
    cloudearr: [{x: 50, y: -100}, {x: -50, y: -700}, {x: _wid - 50, y: -900}, {x: _wid - 100, y: -500}],
    init () {
        _scale = _wid / maxw;

        this.scene.append('<div class=sun></div>');
        this.scene.append('<div class=startCastle></div>');
        this.scene.append('<div class=st_0></div>');
        this.scene.append('<div class=st_1></div>');
        this.scene.append('<div class=st_2></div>');
        this.scene.append('<div class=st_3></div>');
        this.scene.append('<div class=startBottom></div>');
        this.scene.append('<div class=startTop></div>');
        this.createEvery()
        this.size();
        //tweener
        TweenMax.from(this.title, .2, {width: 0});
    },
    createEvery(){
        for (var i = 0, s = ''; i < 6; i++) {
            s += '<li><img src=./roewe360/images/body/hide_' + i + '.png /></li>';
        }
        this.every.append(s);
    },
    render () {
    },
    renderMoveCloude () {
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
    addListener() {
        document.addEventListener('touchstart', this.touchHandle, {passive: false});
        document.addEventListener('touchend', this.touchHandle, {passive: false});
        document.addEventListener('touchmove', this.touchHandle, {passive: false});
    },
    removeListener () {
        document.removeEventListener('touchstart', this.touchHandle, {passive: false});
        document.removeEventListener('touchend', this.touchHandle, {passive: false});
        document.removeEventListener('touchmove', this.touchHandle, {passive: false});
    },
    touchHandle (e) {
        var _h = $('.tan i').height(), _dis1 = 0;
        switch (e.type) {
            case 'touchend':
                e.preventDefault();
                if (e.touches.length == 0) {
                    setime = setTimeout(function () {
                        //只要松手就发射
                        flag = !1;
                    }, 30);
                }
                break;
            case 'touchstart':
                e.preventDefault();
                flag = !0,
                    initmx = e.touches[0].clientX, initmy = e.touches[0].clientY, emx = e.touches[0].clientX, emy = e.touches[0].clientY;
                if (e.touches.length == 2) {
                    initmx1 = e.touches[1].clientX, initmy1 = e.touches[1].clientY, emx1 = e.touches[1].clientX, emy1 = e.touches[1].clientY;
                }

                break;
            case 'touchmove':
                e.preventDefault();
                if (flag) {
                    mx += (e.touches[0].clientX - emx) * touchspeeds, my += (e.touches[0].clientY - emy) * touchspeeds;
                    emx = e.touches[0].clientX, emy = e.touches[0].clientY;
                    _dis = Math.floor(emy - initmy);
                }
                break;
        }
    },
    resizeEvery(){
        var xy = [{x: 180, y: 120, w: 158, h: 80}, {x: _wid - 180, y: 120, w: 116, h: 95}, {
            x: 0,
            y: _hei / 2,
            w: 132,
            h: 162
        }, {
            x: 0,
            y: _hei - 150,
            w: 223,
            h: 215
        }, {
            x: 0,
            y: _hei / 3, w: 181, h: 163
        }, {x: _wid, y: _hei / 3, w: 212, h: 207}];
        for (var i = 0, arr = this.every.find('li'); i < arr.length; i++) {
            Sprite.setxy(arr.eq(i), xy[i].x, xy[i].y, xy[i].w * _scale, xy[i].h * _scale);
        }
    },
    resizeTree(){

    },
    size(){
        Sprite.setxy(this.hotball, _wid / 1.5, 0, 88 * _scale, 128 * _scale);
        Sprite.setxy(this.tree, -50, _hei / 2 - 483 * _scale / 4, 298 * _scale, 483 * _scale);
        Sprite.setxy(this.tree0, 10, 0, 298 * _scale, 152 * _scale);
        Sprite.setxy(this.title, _wid / 2, 338 * _scale / 2, 658 * _scale, 338 * _scale);
        Sprite.setxy(this.sun, _wid / 2, _hei / 2, 493 * _scale, 483 * _scale);
        Sprite.setxy(this.car, _wid / 2, _hei - 321 * _scale, 429 * _scale, 321 * _scale);
        Sprite.setxy(this.startBottom, _wid / 2, _hei - 425 * _scale, 1000 * _scale, 425 * _scale);
        Sprite.setxy(this.startCastle, _wid / 2, this.startBottom.offset().top - 425 * _scale + 80 * _scale, 245 * _scale, 318 * _scale);
        Sprite.setxy(this.startTop, _wid / 2, _hei - 400 * _scale / 3, 1200 * _scale, 400 * _scale);
        Sprite.setxy($('.hide6'), _wid, _hei / 1.5, 218 * _scale, 385 * _scale);
        Sprite.setxy($('.leaf li').eq(0), 108 * _scale / 2, _hei - 195 * _scale / 2, 108 * _scale, 195 * _scale);
        Sprite.setxy($('.leaf li').eq(1), 202 * _scale / 2, _hei-129 * _scale/2, 202 * _scale, 129 * _scale);
        Sprite.setxy($('.leaf li').eq(2), _wid - 40, _hei - 232 * _scale / 2, 80 * _scale, 232 * _scale);
        Sprite.setxy($('.leaf li').eq(3), _wid - 50, 148 * _scale / 2, 98 * _scale, 148 * _scale);
        Sprite.setxy($('.leaf li').eq(4), 50, 93 * _scale / 2, 103 * _scale, 93 * _scale);
        this.resizeTree();
        this.resizeEvery();
    },
    transitionIn () {
        this.addListener();
    },
    transitionOut () {
        this.removeListener();
    }
}