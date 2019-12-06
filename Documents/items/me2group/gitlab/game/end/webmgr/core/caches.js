/**
 * Created by slowsay on 2018/3/5.
 */
'use strict';
var lruCache = require('lru-cache'), logger = require('../common/logger');
var lru = lruCache({max: 100000, minAge: 100 * 3600});

function setCache(key, value) {
    return Promise.resolve(lru.set(key, value));
}
function getCache(key, value) {
    return Promise.resolve(lru.get(key, value));
}
function delCache(key, value) {
    return Promise.resolve(lru.del(key, value));
}
module.exports = {
    set: setCache,
    get: getCache,
    del: delCache
}