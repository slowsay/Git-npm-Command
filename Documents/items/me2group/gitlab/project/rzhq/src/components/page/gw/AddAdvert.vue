<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i>内容管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">广告名称&nbsp;:</el-col>
                <el-col :span="8">
                    <el-input v-model="form.advertName" placeholder="请输入内容" maxlength="16"></el-input>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">广告位置&nbsp;:</el-col>
                <el-col :span="8">
                    <el-select v-model="form.advertPosition" placeholder="请选择" class="handle-select mr10">
                        <el-option v-for="(item,index) in Choice" :key="index" :label=item :value=item></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">开始时间&nbsp;:</el-col>
                <el-col :span="8">
                    <el-date-picker v-model="form.beginTime" @change="beginHandle" type="datetime"
                                    placeholder="选择日期"></el-date-picker>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">结束时间&nbsp;:</el-col>
                <el-col :span="8">
                    <el-date-picker v-model="form.endTime" @change="endHandle" type="datetime"
                                    placeholder="选择日期"></el-date-picker>
                </el-col>
            </el-row>

            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">状态&nbsp;:</el-col>
                <el-col :span="8">
                    <el-select v-model="form.advertStatus" placeholder="请选择" class="handle-select mr10">
                        <el-option key="1" label="上架" value="上架"></el-option>
                        <el-option key="2" label="下架" value="下架"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">广告图片&nbsp;:</el-col>
                <el-col :span="8">
                    <el-upload
                        class="upload-demo"
                        list-type="picture-card"
                        :action="aliupload"
                        :on-preview="handlePreview"
                        :on-success="onsuccessHandle"
                        multiple
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                    >
                        <el-button style="width:50%" size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-col>
            </el-row>


            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">跳转方向&nbsp;:</el-col>
                <el-col :span="8">
                    <el-select v-model="form.linkName" placeholder="请选择" @change="linkHandle"
                               class="handle-select mr10">
                        <el-option key="目的地" label="目的地" value="目的地"></el-option>
                        <el-option key="潜点" label="潜点" value="潜点"></el-option>
                        <el-option key="链接" label="链接" value="链接"></el-option>
                    </el-select>
                </el-col>
            </el-row>

            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">{{linkName}}&nbsp;:</el-col>
                <el-col :span="8">
                    <el-input v-model="form.linkId" placeholder="请输入内容"></el-input>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">广告备注&nbsp;:</el-col>
                <el-col :span="8">
                    <el-input v-model="form.advertRemarks" placeholder="请输入内容" type="textarea" :rows="2"></el-input>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">&nbsp;</el-col>
                <el-col :span="8">
                    <el-button style="width:25%" size="small" @click="addHandle" type="primary">提交</el-button>
                    <el-button style="width:25%" size="small" @click="backHandle" type="primary">返回</el-button>
                </el-col>
            </el-row>
        </div>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
    import API from '../../../api/index';
    import {publicFn} from '../../../utils/util';
    export default {
        data: function () {
            return {
                //缩略图
                dialogVisible:false,
                dialogImageUrl:'',
                headerobj: '',
                title: "",
                status: 0,
                linkName: '目的地ID',
                form: {
                    advertName: "",
                    advertPosition: "",
                    linkName: "目的地",
                    beginTime: "",
                    endTime: "",
                    advertStatus: "",
                    linkId: "",
                    advertRemarks: ""
                },
                Choice: ['首页'],
                fileList: [],
            };
        },
        created: function () {
            if (localStorage.getItem("userInfo")) {
                this.userinfo = JSON.parse(localStorage.getItem("userInfo"));
                this.init();
            }
            else {
                this.$route.push('/login');
            }
        },
        methods: {
            init: function () {
                this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id}
                var _this = this;
                this.aliupload = API.aliUpload;
                this.status = this.$route.query.status;
                if (this.status == "1") {
                    //编辑
                    this.title = "编辑";
                    API.request({
                        url: API.advertDes,
                        method: 'post',
                        headers: this.headerobj,
                        data: API.qs.stringify({advertId: this.$route.query.id})
                    }).then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.success) {
                                _this.fileList = [{n: '', url: e.data.data.advertImage}];
                                _this.form = _this.exchangeData(e.data.data);
                            }
                            else {
                                _this.$message.error(JSON.stringify(e.data.msg));
                            }
                        }
                        else {
                            _this.$message.error(JSON.stringify(e.data.msg));
                        }
                    }).catch(function (e) {
                        _this.$message.error(JSON.stringify(e));
                    })
                } else {
                    //新增
                    this.title = "添加";
                }
            },
            linkHandle: function (val) {
                if (val == "目的地") {
                    this.linkName = "目的地ID";
                }
                else if (val == "潜点") {
                    this.linkName = "潜点ID";
                }
                else {
                    this.linkName = "链接";
                }
            },
            // 分页导航
            handleCurrentChange: function (val) {
            },
            search: function () {
            },
            //添加
            addHandle: function () {
                var _this = this, _advertName = this.form.advertName || "", _advertPosition = this.form.advertPosition || "",
                    _beginTime = this.form.beginTime || "", _linkName = this.form.linkName || '',
                    _endTime = this.form.endTime || "", _advertStatus = this.form.advertStatus || "",
                    _advertRemarks = this.form.advertRemarks || "",
                    _advertImage = this.form.advertImage || "", _linkId = this.form.linkId || "";
                //调用-添加广告接口
                var _params = {};
                if (_advertName.length < 1) {
                    _this.$message.warning(API.msg.ERROR_BANNERTITLE);
                }
                else if (_advertPosition.length < 1) {
                    _this.$message.warning(API.msg.ERROR_BANNERPOSITION);
                }
                else if (_beginTime.length < 1) {
                    _this.$message.warning(API.msg.ERROR_STARTTIME);
                }
                else if (_endTime.length < 1) {
                    _this.$message.warning(API.msg.ERROR_ENDTIME);
                }
                else if (_advertImage.length < 1) {
                    _this.$message.warning(API.msg.ERROR_BANNERUPLOAD);
                }
                else if (_linkId.length < 1) {
                    _this.$message.warning(API.msg.ERROR_BANNERLINK);
                }
//                else if (_advertRemarks.length < 1) {
//                    _this.$message.warning(API.msg.ERROR_BANNERCON);
//                }
                else {
                    if (this.status == 1) {
                        _params = {
                            advertName: _advertName,
                            advertPosition: _advertPosition,
                            beginTime: _beginTime,
                            endTime: _endTime,
                            advertStatus: _advertStatus == '上架' ? 1 : 2,
                            advertImage: _advertImage,
                            linkId: _linkId,
                            linkName: _linkName,
                            advertRemarks: _advertRemarks
                        };
                        _params.advertId = _this.$route.query.id;
                        API.request({
                            url: API.updateAdvert,
                            method: 'post',
                            headers: this.headerobj,
                            data: API.qs.stringify(_params)
                        }).then(function (e) {
                            if (e.data.code == 200) {
                                if (e.data.success) {
                                    _this.$message.success("更新成功");
                                    _this.$router.push("/Advert");
                                }
                                else {
                                    _this.$message.error(JSON.stringify(e.data.msg));
                                }
                            }
                            else {
                                _this.$message.error(JSON.stringify(e.data.msg));
                            }
                        }).catch(function (e) {
                            _this.$message.error(JSON.stringify(e));
                        })
                    }
                    else {
                        _params = {
                            advertName: _advertName,
                            advertPosition: _advertPosition,
                            beginTime: _beginTime,
                            endTime: _endTime,
                            advertStatus: _advertStatus == '上架' ? 1 : 2,
                            advertImage: _advertImage,
                            linkId: _linkId,
                            linkName: _linkName,
                            advertRemarks: _advertRemarks
                        };
                        API.request({
                            url: API.addAdvert,
                            method: 'post',
                            headers: this.headerobj,
                            data: API.qs.stringify(_params)
                        }).then(function (e) {
                            if (e.data.code == 200) {
                                if (e.data.success) {
                                    _this.$message.success("添加成功")
                                    _this.$router.push("/Advert");
                                }
                                else {
                                    _this.$message.error(JSON.stringify(e.data.msg));
                                }
                            }
                            else {
                                _this.$message.error(JSON.stringify(e.data.msg));
                            }
                        }).catch(function (e) {
                            _this.$message.error(JSON.stringify(e));
                        })
                    }
                }
            },
            beginHandle: function (date) {
                if (date) {
                    this.form.beginTime = publicFn.dateFormat(date.getTime());
                }
            },
            endHandle: function (date) {
                if (date) {
                    this.form.endTime = publicFn.dateFormat(date.getTime());
                }
            },
            handleDelete: function (index, row) {
                this.delVisible = true;
            },
            // 确定删除
            deleteRow: function () {
                this.$message.success("删除成功");
                this.delVisible = false;
            },
            //上传成功
            onsuccessHandle: function (res, files) {
                this.form.advertImage = res;
                this.fileList = [{n: '', url: res}];
            },
            //图片预览
            handlePreview: function (file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            //检测图片上传限制
            handleExceed: function (files, fileList) {
                this.$message.warning('请先删除图片，再上传文件');
            },
            beforeRemove: function (file, fileList) {
                return this.$confirm('确定移除' + file.name + '?');
            },
            //返回列表
            backHandle: function () {
                this.$router.push("/Advert")
            },
            exchangeData: function (v) {
                v.advertStatus = v.advertStatus == 1 ? "上架" : "下架";
                return v;
            }

        }
    };
</script>

<style scoped>
    .upload-demo > > > .el-upload--text {
        text-align: left;
        border: none;
        width: 100%;
        height: 100%;
    }

    .el-input, .el-select {
        width: 100%;
    }

</style>
