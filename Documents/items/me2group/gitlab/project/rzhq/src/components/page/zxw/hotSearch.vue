<template>
    <div class="hotSearch">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 系统设置
                </el-breadcrumb-item>
                <el-breadcrumb-item>热搜设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="hot">
            <el-row>
                <el-col :span="2">
                    <p class="hotitle">热搜词</p>
                </el-col>
                <el-col :span='22'>
                    <el-tag
                        :key="tag.hotId"
                        v-for="tag in dynamicTags"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)"
                    >{{tag.hotWordName}}
                    </el-tag>
                    <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                    ></el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
                </el-col>
            </el-row>

        </div>
    </div>
</template>

<script>
    import API from '../../../api/index';
    import {publicFn} from '../../../utils/util';
    export default {
        data: function () {
            return {
                dynamicTags: [],
                inputVisible: false,
                inputValue: ''
            };
        },
        created: function () {
            if (localStorage.getItem("userInfo")) {
                this.userinfo = JSON.parse(localStorage.getItem("userInfo"));
                this.init();
            }
            else {
                this.$router.push({path: '/'});
            }
        },
        methods: {
            init: function () {
                this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id};
                var _this = this;
                API.request({
                    method: "post",
                    url: API.hotWordList,
                    headers: this.headerobj
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.dynamicTags = e.data.data;
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
            },
            //删除热搜词
            handleClose: function (tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
                //删除热搜接口
                this.delHandle(tag);
            },
            //删除热搜接口
            delHandle: function (v) {
                var _this = this, params = {
                    hotId: v.hotId
                }
                API.request({
                    method: "post",
                    url: API.deleteHotWord,
                    headers: this.headerobj,
                    data: API.qs.stringify(params)
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.$message.success("删除成功");
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
            },
            //添加热搜接口
            addHandle: function (v) {
                var _this = this, params = {
                    hotWordName: v
                }
                API.request({
                    method: "post",
                    url: API.addHotWord,
                    headers: this.headerobj,
                    data: API.qs.stringify(params)
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.$message.success("添加成功");
                            _this.init();
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
            },
            showInput: function () {
                var _this = this;
                this.inputVisible = true;
                this.$nextTick(function (_) {
                    _this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm: function () {
                var inputValue = this.inputValue;
                if (inputValue) {
                    //添加热搜接口
                    this.addHandle(inputValue);
                    this.dynamicTags.push(inputValue);

                }
                this.inputVisible = false;
                this.inputValue = '';
            }
        }
    }
</script>

<style scoped>
    .el-tag + .el-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 32px;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 32px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

    .el-tag--small {
        height: 32px;
        line-height: 32px;
    }

    .hotitle {

        line-height: 32px;
        font-size: 16px;
    }

    .hot {
        margin: 20px;
    }
</style>
