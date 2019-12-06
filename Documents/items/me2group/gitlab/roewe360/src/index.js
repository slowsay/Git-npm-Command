/**
 * Created by slowsay on 2018/9/8.
 */
'use strict';
var OneScene = require('./page/one'),
    config = require('./config'),
    utils = require('./core/utils'),
    {Howl,Howler} = require('howler');
var setime = 0,
    _wid = window.innerWidth, _hei = window.innerHeight,

    mflag = !1, tflag = !1;

if(utils.ismobile()){
    console.log('mobile')
}
function listener() {
    //音乐
    $('.music').on('mousedown tap', function () {
        if (mflag) {
            mflag = !1
            sound.stop();
        }
        else {
            mflag = !0;
            sound.play();
        }
    })
}
function render() {
    requestAnimationFrame(render);
    OneScene.render();
}
function goldenBox() {
    for (var i = 0, arr = $('.golden li'); i < arr.length; i++) {
        arr.eq(i).css({left: (Math.random() * 300 / 2) + 'px', top: (Math.random() * 100) + 'px'})
    }
}
function Size() {
}


$(function () {
    //var sound = new Howl({src: ['bgsound.mp3']});
    //sound.play();
    var queue = new createjs.LoadQueue();
    queue.on("complete", function (e) {
        $('.loading').addClass('hide');
        $('.games').removeClass('hide');
        OneScene.transitionIn();
        goldenBox();
        OneScene.init();
        listener();
        //render
        render();
    });
    queue.on('progress', function (e) {
        $('.loading .con p').text(Math.ceil(e.progress * 100) + '%');
    });
    queue.loadManifest(config.imgbox);
})