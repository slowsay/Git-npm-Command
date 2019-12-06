/**
 * Created by slowsay on 2018/2/26.
 * 上传功能
 */
'use strict';
var log = require('../common/logger'),
    conf = require('../../config'),
    utils = require('../core/utils'),
    superagent = require('superagent');
var support_type = ['pdf', 'doc', 'docx', 'rtf', 'jpg', 'JPG', 'txt', 'wps', 'ppt', 'pptx', 'xls', 'xlsx', 'csv'];
module.exports = {
    uploadfile: async function (req, res) {
        if (req.jfum.error) {
            return res.send({status: 0, msg: req.jfum.error, errcode: 10501});
        }
        else {
            for (var i = 0, arr = req.jfum.files, uploadfile = '', result = {status: 0}; i < arr.length; i++) {
                uploadfile = arr[i];
                result = utils.valiDateNulls(uploadfile, '上传的文件不能为空');
                if (result.status != 0) {
                    return res.send(result);
                }
                //check uploadfile
                if (uploadfile.errors.length > 0) {
                    log.info('错误报告 ', uploadfile);
                    for (var j = 0, objerr = uploadfile.errors; j < objerr.length; j++) {
                        return res.send({
                            status: -1,
                            msg: objerr[j].message,
                            errcode: objerr[j].code
                        });
                    }
                }
                else {
                    log.info('上传文件', uploadfile);
                    if (support_type.indexOf(uploadfile.name.split('.').pop()) < 0) {
                        result.status = -1, result.msg = '不支持该文件类型', result.errcode = 10413;
                        return res.send(result);
                    }
                    try {
                        var uploadRes = await superagent.post(conf.UPLOADURL).set('token', conf.UPLOADTOKEN).attach('path', uploadfile.path);
                        result.data = JSON.parse(uploadRes.text).files[0];
                        result.data = {
                            name: result.data.name,
                            url: result.data.url.replace('http', 'https'),
                            size: result.data.size,
                            type: result.data.type
                        };
                        result.status = 1;
                        return res.send(result)
                    } catch (e) {
                        result.status = -1;
                        result.msg = '上传失败';
                        return res.send(result);
                    }
                }
            }
        }
    }
}