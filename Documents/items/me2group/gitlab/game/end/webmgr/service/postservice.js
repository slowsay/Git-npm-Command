/**
 * Created by slowsay on 2018/2/28.
 * 业务逻辑层
 */
'use strict';
var logger = require('../common/logger'),
    postDao = require('../dao/postdao');
/**
 * @description 添加车位信息
 * @param params
 * @param callback
 */
function add(params, callback) {

    postDao.add(params, callback)
}
/**
 * @description 获取发布者车位信息
 * @param params
 * @param callback
 */
function getByid(params, callback) {

    postDao.getByOpenid(params, callback);
}
/**
 * @description 搜索车位信息
 * @param params
 * @param callback
 */
function getAllList(params, callback) {
    postDao.getList(params, callback);
}

function getByTitle(params, callback) {
    postDao.getByTitle(params, callback);
}

function updatePost(params, callback) {
    postDao.updatePost(params, callback)
}

function deletePost(params, callback) {
    postDao.deletePost(params, callback);
}

module.exports = {
    add: add,
    getByTitle: getByTitle,
    getByid: getByid,
    getAllList: getAllList,
    updatePost: updatePost,
    deletePost: deletePost

}

