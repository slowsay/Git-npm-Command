/**
 * Created by slowsay on 2018/5/16.
 */
'use strict';
var config = require('../../config');
module.exports = {
    setAuthToken: function (res, token) {
        return res.cookie(config.cookie_name, token, {httpOnly: true, domain: config.acrossdomain});
    }
}