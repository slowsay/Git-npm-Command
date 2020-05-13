<template>
  <div class="keyposts">
    <div class="top_nav">
      <h4 class="name">发表新帖</h4>
    </div>
    <div class="inputbox">
      <div class="top">
        <el-input type="text" placeholder="请输入内容" v-model="title" maxlength="30" show-word-limit></el-input>
      </div>
      <div class="content">
        <!--<el-select v-model="type" placeholder="请选择" @change="typeHandle">-->
        <!--<el-option-->
        <!--v-for="item in typeData"-->
        <!--:key="item.id"-->
        <!--:label="item.name"-->
        <!--:value="item.id"-->
        <!--&gt;</el-option>-->
        <!--</el-select>-->
        <!--<el-row style="margin-bottom:20px;">-->
        <!--<el-col :span="8">-->
        <!--<el-upload-->
        <!--class="upload-demo"-->
        <!--list-type="picture-card"-->
        <!--:action="aliupload"-->
        <!--:data="uploadtype"-->
        <!--:on-success="onsuccessHandle"-->
        <!--:limit="1"-->
        <!--:on-exceed="handleExceed"-->
        <!--:file-list="fileList"-->
        <!--&gt;-->
        <!--<el-button size="small" type="primary">视频上传</el-button>-->
        <!--</el-upload>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <el-upload
          class="ivu-upload"
          :action="aliupload"
          :data="uploadtype"
          :on-success="handleSuccess"
        >
          <el-button style="width:50%" class="upfile" size="small" type="primary">图片上传</el-button>
        </el-upload>
        <el-upload
          class="ivu-video-upload"
          :action="aliupload"
          :data="uploadvtype"
          :on-success="videohandleSuccess"
        >
          <el-button style="width:50%" class="upfile" size="small" type="primary">视频上传</el-button>
        </el-upload>
        <div class="top">
          <div class="image" @click="insertPicHandle">
            <img src="../../assets/image/zch/posts/image.png"/>

            <p class="name">插入图片</p>
          </div>
          <div class="image" @click="insertVideohandle">
            <img src="../../assets/image/zch/posts/image.png"/>

            <p class="name">插入视频</p>
          </div>
          <div class="image">
            <img src="../../assets/image/zch/posts/title.png"/>

            <p class="name">选择标签</p>

            <!--标签列表-->
            <div class="taglist">
            </div>
          </div>
        </div>
        <div class="text">
          <el-input
            type="textarea"
            :autosize="{ minRows: 20}"
            placeholder="文本输入"
            v-model="content"
          ></el-input>
          <!--<div class="textarea">-->
          <!--<textarea class="area" rows="30" v-model="content"></textarea>-->
          <!--</div>-->
          <!--<div class="container">-->
          <!--<el-upload-->
          <!--class="ivu-upload"-->
          <!--list-type="picture-card"-->
          <!--:action="aliupload"-->
          <!--:on-success="handleSuccess"-->
          <!--&gt;-->
          <!--<el-button style="width:50%" class="upfile" size="small" type="primary">点击上传</el-button>-->
          <!--</el-upload>-->
          <!--<quill-editor ref="QuillEditor" v-model="content" :options="editorOption"></quill-editor>-->
          <!--<el-button class="editor-btn" type="primary" @click="submit">提交</el-button>-->
          <!--</div>-->
          <p class="btn" @click="issueHandle">发表</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  //  import "quill/dist/quill.core.css";
  //  import "quill/dist/quill.snow.css";
  //  import "quill/dist/quill.bubble.css";
  ////  import { quillEditor } from "vue-quill-editor";
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  //  const toolbarOptions = [
  //    ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
  //    ["blockquote", "code-block"], // 引用  代码块
  //    [{header: 1}, {header: 2}], // 1、2 级标题
  //    [{list: "ordered"}, {list: "bullet"}], // 有序、无序列表
  //    [{script: "sub"}, {script: "super"}], // 上标/下标
  //    [{indent: "-1"}, {indent: "+1"}], // 缩进
  //    [{'direction': 'rtl'}],                         // 文本方向
  //    [{size: ["small", false, "large", "huge"]}], // 字体大小
  //    [{header: [1, 2, 3, 4, 5, 6, false]}], // 标题
  //    [{color: []}, {background: []}], // 字体颜色、字体背景颜色
  //    [{font: []}], // 字体种类
  //    [{align: []}], // 对齐方式
  //    ["clean"], // 清除文本格式
  //    ["link", "image", "video"] // 链接、图片、视频
  //  ];
  export default {
    data: function () {
      return {
        userinfo: '',
        headerobj: '',
        title: "",
        textarea: "",
        aliupload: '',
        fileList: [],
        uploadvtype: {
          type: 2
        },
        uploadtype: {
          type: 1,
        },
        type: 1,
        typeData: [{id: 1, name: '文章'}, {id: 2, name: '视频'}],
        tabType: "",
        tabTypeData: [],
        picurl: '',
        videourl: '',
        image: [],
        //富文本
        content: "",
        editorOption: {}
      };
    },
//    components: {
//      quillEditor: quillEditor
//    },
    created: function () {
      if (publicFn.getStore("qluserInfo")) {
        this.userinfo = JSON.parse(publicFn.getStore("qluserInfo"));
        this.init();
      }
      else {
        this.$router.push('/Login');
      }
    },
    methods: {
      init: function () {
        this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id};
        this.aliupload = API.aliUpload;
//        this.editorOption = {
//          placeholder: "您想写点什么",
//          modules: {
//            toolbar: {
//              container: toolbarOptions,
//              handlers: {
//                image: function (value) {
//                  if (value) {
//                    //调用图片上传
//                    document.querySelector('.ivu-upload .upfile').click()
//                  } else {
//                    this.quill.format('image', false);
//                  }
//                }
//              }
//            }
//          }
//        }
        //选择标签
        this.advisedLabelList()
      },
      insertPicHandle: function () {
        document.querySelector('.ivu-upload .upfile').click();
      },
      insertVideohandle: function () {
        document.querySelector('.ivu-video-upload .upfile').click();
      },
      advisedLabelList: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.advisedLabelList,
          headers: this.headerobj,
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
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
      typeHandle: function (val) {
        this.uploadtype = {type: val};
      },
//      上传成功
//      onsuccessHandle: function (res, files) {
//        this.fileList = [{n: '', url: res}];
//      },
//      handleExceed: function (files, fileList) {
//        this.$message.warning('请先删除图片，再上传文件');
//      },
      //图片上传成功
      handleSuccess: function (res, files) {
        this.picurl = res;
        this.$message.success("图片上传成功");
      },
      //视频上传成功
      videohandleSuccess: function (res, files) {
        this.videourl = res;
        this.$message.success("视频上传成功");
      },
      //富文本
      onEditorChange: function ({ editor, html, text }) {
        this.content = html;
      },
      //提交
      issueHandle: function () {
        var _this = this, _title = this.title, _content = this.content,
          _labelId = '1,2',
          _pic = this.picurl, _video = this.videourl, _type = this.type;
        if (_title.length < 1) {
          _this.$message.error("请输入标题");
        }
        else if (_pic.length < 1) {
          _this.$message.error("请上传图片");
        }
        else if (_video.len < 1) {
          _this.$message.error("请上传头视频");
        }
        else if (_content.length < 1) {
          _this.$message.error("请输入内容");
        }
        else {
          var params = {
            title: _title,
            pic: _pic,
            video: _video,
            type: 2,//视频
            content: _content,
            labelId: _labelId
          }
          this.publishOnePosting(params);
        }
      },
      //发布
      publishOnePosting: function (params) {
        var _this = this;
        API.request({
          method: "post",
          url: API.publishOnePosting,
          headers: this.headerobj,
          data: API.qs.stringify(params)
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success(API.msg.SUCCESS_ISSUE);
              _this.$router.push('/Personal/Release');
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
  };
</script>
<style lang="less" scoped>
  .keyposts {
    overflow: hidden;
    .top_nav {
      width: 1280px;
      margin: auto;
      .name {
        font-size: 28px;
        padding-top: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        line-height: 40px;
        border-bottom: 5px dotted #000;
        padding-bottom: 10px;
      }
    }
    .inputbox {
      width: 1280px;
      margin: auto;
      .top {
        margin-top: 30px;
      }
    }
    .content {
      .top {
        display: flex;
        align-items: center;
        .image {
          display: flex;
          align-items: center;
          margin-left: 20px;
          img {
            width: 20px;
            height: 20px;
          }
          .name {
            font-size: 20px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(74, 74, 74, 1);
            line-height: 28px;
            margin-left: 5px;
          }
        }
        .image:not(:first-child) {
          margin-left: 55px;
        }
        .image:first-child {
          img {
            height: 18px;
          }
        }
        .image:nth-child(4) {
          img {
            width: 17px;
          }
        }
      }
      .text {
        margin-top: 15px;
        width: 100%;
        //   .textarea {
        //     .area {
        //       width: 100%;
        //       font-size: 24px;
        //     }
        //     width: 100%;
        //     input {
        //       width: 100%;
        //       height: 500px;
        //     }
        //   }
        .btn {
          margin-top: 27px;
          background: rgba(255, 148, 148, 1);
          border-radius: 10px;
          width: 130px;
          height: 60px;
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 33px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 30px;

        }
      }
    }
    /deep/ .ql-editor {
      height: 400px;
      background: #fff;
    }
    .ivu-upload {
      display: none;
    }
    .ivu-video-upload {
      display: none;
    }

  }
</style>
