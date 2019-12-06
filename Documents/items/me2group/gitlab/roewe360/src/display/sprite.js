/**
 * Created by slowsay on 2018/9/18.
 */
'use strict';
module.exports = {
    create(div, bydiv){
        var _div = document.createElement('div');
        _div.setAttribute('name', bydiv);
        _div.setAttribute('position', 'absolute');
        $(div).append(bydiv);
    },
    setxy(obj, x, y, w, h) {
        obj.css({
            position:'absolute',
            width: w + 'px',
            height: h + 'px',
            transform: 'translate(' + x + 'px,' + y + 'px)'
        })
    },
    /**
     * @description 填图定位
     * @method posxy
     *
     */
    posxy(obj, path, x, y, w, h, sx, sy) {
        obj.css({
            position:'absolute',
            width: w + 'px',
            height: h + 'px',
            transform: 'translate(' + x + 'px,' + y + 'px)',
            background: 'url(' + path + ') no-repeat ' + sx * -1 + 'px ' + sy * -1 + 'px'
        })
    },
}