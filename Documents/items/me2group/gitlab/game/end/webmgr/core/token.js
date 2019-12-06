/**
 * Created by slowsay on 2018/3/6.
 * Token
 *
 * iss：Issuer，发行者
 sub：Subject，主题
 aud：Audience，观众
 exp：Expiration time，过期时间
 nbf：Not before
 iat：Issued at，发行时间
 jti：JWT ID

 * {
    "iss": "ninghao.net",//发行者
    "exp": "1438955445",//过期时间\
    "name": "wanghao",
    "admin": true
}
 */
'use strict';
var crypto = require('crypto');


module.exports = {
    create: function (params, timeout) {
        var _base64 = Buffer.from(JSON.stringify({
            data: params,//payload
            created: parseInt(Date.now() / 1000)
        }), 'utf8').toString('base64');
        //签名
        var secret = 'api.taoring.com';
        return _base64 + '.' + crypto.createHmac('sha256', secret).update(_base64).digest('base64');
    },
    /**
     * @description 解码token
     * @param token
     * @returns {*}
     */
    decode: function (token) {
        var _arr = token.split('.');
        if (_arr.length < 2) {
            return false;
        }
        var _payload = {};
        try {
            _payload = JSON.parse(Buffer.from(_arr[0], 'base64').toString('utf8'));
        }
        catch (e) {
            return false;
        }
        var secret = 'api.taoring.com';
        return {
            payload: _payload,
            signature: _arr[1],
            checkSignature: crypto.createHmac('sha256', secret).update(_arr[0]).digest('base64')
        }

    },
    checkToken: function (token) {
        var _decode = this.decode(token);
        if (!_decode) {
            return false;
        }
        //是否过期
        var expstate = (parseInt(Date.now() / 1000) - parseInt(_decode.payload.created)) > parseInt(_decode).exp ? false : true;
        if (_decode.signature === _decode.checkSignature && expstate) {
            return true;
        }
        return false;
    }
}