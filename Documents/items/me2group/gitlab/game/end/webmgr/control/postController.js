/**
 * Created by slowsay on 2018/3/7.
 */
'use strict';
var logger = require('../common/logger'),
    types = require('../core/types'),
    Utils = require('../core/utils'),
    redisTool = require('../common/redistool'),
    postService = require("../service/postservice");


module.exports = {
    getPostList: function (req, res) {
        var _token = '', result = {};
        postService.getAllList({token: _token}, function (err, data) {
            if (err) {
                result.errorcode = err.code;
                result.msg = types.INVALIDSEARCH.msg;
                return res.send(result);
            }
            if (data) {
                result.data = data;
                result.msg = types.SUCCESS.msg;
                result.status = 1;
                return res.send(result);
            }

        });
    },
    editPost: function (req, res) {
        var _token = '', result = {};
        req.getValidationResult().then(function (vresult) {
            var _id = req.body.id, _title = req.body.title, _maparea = req.body.maparea, _pic = req.body.pic, _price = req.body.price, _des = req.body.des;
            postService.updatePost({
                id: _id,
                title: _title,
                maparea: _maparea,
                pic: _pic,
                price: _price,
                content: _des
            }, function (err, data) {
                if (err) {
                    result.errorcode = err.code;
                    result.msg = types.INVALIDUPDATE.msg;
                    return res.send(result);
                }
                if (data) {
                    result.msg = '更新成功';
                    result.status = 1;
                    return res.send(result);
                }

            })
        })
    },
    deletePost: function (req, res) {
        var _id = req.body.id, result = {};
        postService.deletePost({id: _id}, function (err, data) {
            if (err) {
                result.status = 0;
                result.errorcode = err.code;
                result.msg = types.INVALIDDELETE.msg;
                return res.send(result);
            }
            if (data) {
                result.msg = '删除成功';
                result.status = 1;
                return res.send(result);
            }
        })
    },
    addPost: function (req, res) {
        var _token = '', result = {};
        req.getValidationResult().then(function (vresult) {
            var _title = req.body.title, _maparea = req.body.maparea, _pic = req.body.pic, _price = req.body.price, _des = req.body.des, _userid = req.body.userid;
            postService.getByTitle({title: _title}, function (err, data) {
                if (err) {
                    result.errorcode = err.code;
                    result.msg = types.INVALIDSEARCH.msg;
                    return res.send(result);
                }
                if (data.length > 0) {
                    result.msg = types.ALREADYEXSIT.msg;
                    result.status = 0;
                    return res.send(result);
                }
                else {
                    //add
                    postService.add({
                        title: _title,
                        maparea: _maparea,
                        pic: _pic,
                        price: _price,
                        content: _des,
                        userid: _userid
                    }, function (err, data) {
                        if (err) {
                            result.errorcode = err.code;
                            result.msg = types.INVALIDADD.msg;
                            return res.send(result)
                        }
                        if (data) {
                            result.msg = '添加成功';
                            result.status = 1;
                            return res.send(result);
                        }
                    })
                }
            })


        })
    },
    getByIdList: function (req, res) {
        var result = {};
        postService.getByid({userId: req.body.userId}, function (err, data) {
            if (err) {
                result.status = 0;
                result.errorcode = types.INVALIDSEARCH.code;
                result.msg = types.INVALIDSEARCH.msg;
                return res.send(result);
            }
            if (data) {
                result.status = 1;
                result.data = data;
                return res.send(result);
            }
        })
    }
}
