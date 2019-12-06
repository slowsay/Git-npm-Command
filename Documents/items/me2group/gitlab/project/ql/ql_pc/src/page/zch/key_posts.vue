<template>
  <div class="keyposts">
    <div class="top_nav">
      <h4 class="name">发表新帖</h4>
    </div>
    <div class="inputbox">
      <div class="top">
        <el-input type="text" placeholder="请输入内容" v-model="text" maxlength="30" show-word-limit></el-input>
      </div>
      <div class="content">
        <div class="top">
          <div class="image" v-for="(item,i) of image" :key="i">
            <img :src="item.img" alt />
            <p class="name">{{item.name}}</p>
          </div>
        </div>
        <div class="text">
          <!-- <el-input
            type="textarea"
            :autosize="{ minRows: 20}"
            placeholder="文本输入"
            v-model="textarea"
          ></el-input>-->
          <!-- <div class="textarea">
            <textarea class="area" rows="30" v-model="textarea"></textarea>
          </div>-->
          <div class="container">
            <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
            <!-- <el-button class="editor-btn" type="primary" @click="submit">提交</el-button> -->
          </div>
          <p class="btn">发表</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      text: "",
      textarea: "",
      image: [
        {
          img: require("../../assets/image/zch/posts/image.png"),
          name: "插入图片"
        },
        {
          img: require("../../assets/image/zch/posts/raio.png"),
          name: "插入视频"
        },
        {
          img: require("../../assets/image/zch/posts/bq.png"),
          name: "插入表情"
        },
        {
          img: require("../../assets/image/zch/posts/add.png"),
          name: "选择地址"
        },
        {
          img: require("../../assets/image/zch/posts/title.png"),
          name: "选择标签"
        }
      ],
      content: "",
      editorOption: {
        placeholder: "Hello World"
      }
    };
  },
  components: {
    quillEditor
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },
    submit() {
      console.log(this.content);
      this.$message.success("提交成功！");
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
  /deep/.ql-editor{
    height: 400px;
    background: #fff;
  }
}
</style>