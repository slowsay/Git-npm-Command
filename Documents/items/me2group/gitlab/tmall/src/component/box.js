/**
 * Created by slowsay on 2018/9/18.
 */
'use strict';
module.exports = {
    div: $('.circle'),
    width: 0, height: 0,
    x: 0, y: 0,
    init: function () {
        this.width = this.div.width();
        this.height = this.div.height();
    },
    setX: function (v) {
        this.x = v;
        this.div.css({left: v + 'px'});
    },
    setY: function (v) {
        this.y = v;
        this.div.css({top: v + 'px'})
    }
}