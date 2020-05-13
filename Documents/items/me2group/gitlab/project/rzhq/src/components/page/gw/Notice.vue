<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 用户管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>用户通知</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row class="handle-box">
                <el-col :span="2">
                    <p>收件人:</p>
                </el-col>
                <el-col :span="15">
                    <el-col :span="15">
                        <el-radio v-model="receiverc" @change="receivercHandle" label="1">全部用户</el-radio>
                        <el-radio v-model="receiverc" @change="receivercHandle" label="2">全部商家</el-radio>
                        <el-radio v-model="receiverc" @change="receivercHandle" label="3">指定用户ID</el-radio>
                    </el-col>
                    <el-col :span="5" v-if="receiverflag==true">
                        <el-input v-model="receiver" placeholder="请输入用户ID"></el-input>
                    </el-col>
                </el-col>
            </el-row>
            <el-row class="handle-box">
                <el-col :span="2">
                    <p>主题:</p>
                </el-col>
                <el-col :span="15">
                    <el-input v-model="subject" placeholder="请输入内容"></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="2">
                    <p style="line-height:32px">正文:</p>
                </el-col>
                <el-col :span="15">
                    <el-upload
                        class="ivu-upload"
                        list-type="picture-card"
                        :action="aliupload"
                        :on-success="handleSuccess"
                    >
                        <el-button style="width:50%" class="upfile" size="small" type="primary">点击上传</el-button>
                    </el-upload>
                    <quill-editor ref="QuillEditor" v-model="content" :options="editorOption"></quill-editor>
                </el-col>
            </el-row>
            <el-row class="handle-box editor-btn">
                <el-col :span="2">
                    <p>写信方:</p>
                </el-col>
                <el-col :span="13">
                    <p>潜蛙官方</p>
                </el-col>
                <el-col :span="2">
                    <el-button style="width:100%" type="primary" @click="onHandle">提交</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import "quill/dist/quill.core.css";
    import "quill/dist/quill.snow.css";
    import "quill/dist/quill.bubble.css";
    import { quillEditor } from "vue-quill-editor";
    import API from '../../../api/index';
    import {publicFn} from '../../../utils/util';
    const toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
        ["blockquote", "code-block"], // 引用  代码块
        [{header: 1}, {header: 2}], // 1、2 级标题
        [{list: "ordered"}, {list: "bullet"}], // 有序、无序列表
        [{script: "sub"}, {script: "super"}], // 上标/下标
        [{indent: "-1"}, {indent: "+1"}], // 缩进
        [{'direction': 'rtl'}],                         // 文本方向
        [{size: ["small", false, "large", "huge"]}], // 字体大小
        [{header: [1, 2, 3, 4, 5, 6, false]}], // 标题
        [{color: []}, {background: []}], // 字体颜色、字体背景颜色
        [{font: []}], // 字体种类
        [{align: []}], // 对齐方式
        ["clean"], // 清除文本格式
        ["link", "image", "video"] // 链接、图片、视频
    ];
    export default {
        name: "editor",
        data: function () {
            return {
                receiverflag: !1,
                receiverc: '1',
                aliupload: '',
                userinfo: '',
                content: "",
                receiver: '',
                subject: '',
                editorOption: {
                    placeholder: "请输入内容"
                }
            };
        },
        components: {
            quillEditor: quillEditor
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
                this.content = "",
                    this.receiver = '',
                    this.subject = '';
                this.aliupload = API.aliUpload;
                this.editorOption = {
                    placeholder: "您想写点什么",
                    modules: {
                        toolbar: {
                            container: toolbarOptions,
                            handlers: {
                                image: function (value) {
                                    if (value) {
                                        //调用图片上传
                                        document.querySelector('.ivu-upload .upfile').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    }
                }
            },
            receivercHandle: function (val) {
                if (val == 3) {
                    this.receiverflag = !0;
                }
                else {
                    this.receiverflag = !1;
                }
            },
            handleSuccess: function (res) {
                // 获取富文本组件实例
                let quill = this.$refs.QuillEditor.quill;
                if (res) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片，res为服务器返回的图片链接地址
                    quill.insertEmbed(length, 'image', res)
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    // 提示信息，需引入Message
                    Message.error('图片插入失败')
                }
            },
            onEditorChange: function ({ editor, html, text }) {
                this.content = html;
            },
            onHandle: function () {
                var _this = this, _content = this.content, _receiver = this.receiver, _subject = this.subject;
                if (_subject.length < 1) {
                    this.$message.error("请输入标题！");
                }
                else if (_content.length < 1) {
                    this.$message.error("请输入内容！");
                }
                else {
                    var params = {
                        userIds: _receiver,
                        type: this.receiverc,
                        title: _subject,
                        content: _content
                    };
                    API.request({
                        url: API.noticeUsers,
                        method: 'post',
                        headers: this.headerobj,
                        data: API.qs.stringify(params)
                    }).then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.success) {
                                _this.$message.success("提交成功！");
                                _this.$router.push({path: '/Noticelist'});
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
        }
    };
</script>
<style scoped>
    .editor-btn {
        margin-top: 20px;
    }

    .handle-box {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
    }

    .ivu-upload {
        display: none;
    }
</style>
