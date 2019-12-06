/**
 * Created by slowsay on 2018/9/10.
 */
'use strict';
var $ = require('jquery');
module.exports = {
    data: [{n: '路虎LandRover-L550 Launch', des: '互动营销', src: 'images/case/0.jpg'},
        {
            n: '芬达-玩的节奏',
            des: '互动营销',
            src: 'images/case/1.jpg'
        },
        {
            n: '康师傅冰红茶-冰力十足',
            des: '互动营销',
            src: 'images/case/2.jpg'
        },
        {n: '美汁源-人人爱果粒', des: '互动营销', src: 'images/case/3.jpg'}, {
            n: '哈啤-释放冰爽',
            des: '互动营销',
            src: 'images/case/4.jpg'
        }, {
            n: '阿迪达斯-冬天动起来',
            des: '互动营销',
            src: 'images/case/5.jpg'
        }, {
            n: '百威-相约新年见',
            des: '互动营销',
            src: 'images/case/6.jpg'
        }, {
            n: '百事可乐-百事挑赞',
            des: '互动营销',
            src: 'images/case/7.jpg'
        }, {
            n: '比亚迪-宋DM',
            des: '互动营销',
            src: 'images/case/8.jpg'
        }, {
            n: '碧桂园-凯旋华府',
            des: '互动营销',
            src: 'images/case/9.jpg'
        }, {
            n: '滨江保利-钱江新城',
            des: '互动营销',
            src: 'images/case/10.jpg'
        }, {
            n: '老板吸油烟机-速度与激情',
            des: '互动营销',
            src: 'images/case/11.jpg'
        }, {
            n: '新天地-金色时光',
            des: '互动营销',
            src: 'images/case/12.jpg'
        }, {
            n: '浅盏-茶叶包装',
            des: '平面&包装',
            src: 'images/case/13.jpg'
        }, {
            n: '墨房文房四包-vi设计',
            des: '平面&包装',
            src: 'images/case/14.jpg'
        }, {
            n: '青海盐业-会展',
            des: '平面&包装',
            src: 'images/case/15.jpg'
        }
    ],
    init: function () {
        for (var i = 0, arr = this.data; i < arr.length; i++) {
            $('.case .list').append('<li><div class="listcon">' +
                '<div class="bg"></div><div class="des"><h3>' + arr[i].n + '</h3>' + arr[i].des + '</div>' +
                '</div><img src=' + arr[i].src + ' /> </li>');
            //$('.case .list li').eq(i).find('.listcon').hide();
        }
        this.addListener();
        this.size();
    },
    addListener: function () {
        var _this = this;
        //$('.case .list').on('mouseover', 'li', function () {
        //    $(this).find('.listcon').show();
        //})
        //$('.case .list').on('mouseout', 'li', function () {
        //    $(this).find('.listcon').hide();
        //})
    },
    fadeOutDown: function () {
        for (var i = 0, arr = $('.case .list li').length; i < arr; i++) {
            $('.case .list li').eq(i).find('.listcon').hide();
        }
    },
    size: function () {

    }
}