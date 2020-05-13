<template>
  <div id="Register">
    <div class="body">
      <!-- 注册状态栏 -->
      <div class="state">
        <div class="active">
          <img src="../../assets/image/gw/20.png"/>

          <p>1</p>

          <p>填写账号</p>
        </div>
        <div class="hr" :class="{active_hr:state!=1}"></div>
        <div :class="{active:state!=1}">
          <img src="../../assets/image/gw/20.png" v-if="state!=1"/>
          <img src="../../assets/image/gw/21.png" v-else/>

          <p>2</p>

          <p>基本资料</p>
        </div>
        <div class="hr" :class="{active_hr:state==3}"></div>
        <div :class="{active:state==3}">
          <img src="../../assets/image/gw/20.png" v-if="state==3"/>
          <img src="../../assets/image/gw/21.png" v-else/>

          <p>3</p>

          <p>注册成功</p>
        </div>
      </div>
      <!-- 内容栏 -->
      <div>
        <Register1 v-if="state==1" @submit="one" @dialog="dialog" ref="register1"/>
        <Register2 v-else-if="state==2" @submit="two"/>
        <div class="Register3" v-else>
          <p>恭喜你注册成功!</p>

          <p>感觉去看看你感兴趣的东西吧~</p>
          <el-button @click="three">跳转到首页</el-button>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="show" center :modal="false" :show-close="false">
      <p>用户协议</p>

      <div>
        <div>
          《小米商城用户协议》（以下简称“本协议”）是您（或称“用户”，指注册、登录、使用、浏览小米商城的个人或组织）与小米科技有限责任公司（平台运营主体）及其关联公司（包括但不限于小米通讯技术有限公司，以下简称“小米”）及其合作单位（包括但不限于第三方商家）之间关于小米商城网站（域名为www.mi.com，简称本网站）与小米产品、程序及服务所订立的协议。小米和合作单位分别就您在本网站接受服务的过程中享受的权利和承担的义务，与您签订本协议，并独立向您承担责任，互不承担保证、连带或共同责任等。<br>
          <br>小米在此特别提醒用户认真阅读
          、充分理解---本协议中各条款。您对本协议的接受即自愿接受全部条款的约束，请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款，尤此类条款将以加粗的形式提示您注意。如您同意本协议并完成全部注册程序，即表示您已充分阅读、理解并接受本协议的全部内容，并与小米达成一致，成为小米商城平台用户。阅读本协议的过程中，如果您不同意本协议或其中任何条款约定，您应立即停止注册程序。
          <br><br>一、协议范围<br>
          <br>1.1【主体范围】<br><br>
          小米商城平台运营主体为小米科技有限责任公司，自营商品的销售主体以小米商城网站页面公示的证照信息为准（包括但不限于小米通讯技术有限公司）。本协议项下，小米商城平台运营主体可能根据平台业务调整而发生变更，变更后的小米商城平台运营主体与您共同履行本协议并向您提供服务，小米商城平台运营主体的变更不会影响您本协议项下的权益。
          <br><br>1.2【协议补充】<br><br>
          小米隐私政策（http://www.mi.com/about/new-privacy/）、小米帐号使用协议均为本协议不可分割的一部分，与本协议具有同等法律效力。
          考虑到互联网业务的高速发展，本协议条款并不能完整覆盖您与小米的所有权利和义务，也不能保证完全符合发展的需求。小米商城平台的法律声明、隐私政策、平台规范、规则、通知、公告、操作规则、帮助文档、温馨提示等均为本协议的补充协议，与本协议不可分割且具有同等法律效力。如您使用本平台服务，视为您同意上述补充协议。
        </div>
      </div>
      <el-button @click="agree">同意</el-button>
    </el-dialog>
  </div>
</template>
<script>
  import Register1 from "./Register1";
  import Register2 from "./Register2";
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    components: {
      Register1: Register1,
      Register2: Register2
    },
    data: function () {
      return {
        state: 1, //注册状态
        dialogVisible: false,
        // 弹窗
        show: false,
      }
    },
    created: function () {
      if (publicFn.getStore("qluserInfo")) {
        this.userinfo = JSON.parse(publicFn.getStore("qluserInfo"));
      }
      else {
        this.userinfo = {token: "qltoken", id: '1'};
      }
      this.init();
    },
    methods: {
      init: function () {

      },
      //   窗口关闭的回调函数
      handleClose: function () {

      },
      //第一步完成的回调，
      one: function (res) {
        if (res == true) this.state = 2;
      },
      //第二布完成的回调
      two: function (res) {
        if (res == true) this.state = 3;
      },
      three: function () {
        this.dialogVisible = false;
        this.$router.push("/index");
      },
      dialog: function (val) {
        this.show = val;
      },
      agree: function (val) {
        this.show = false;
        this.$refs.register1.Form.checked = true
      }
    }
  };
</script>
<style lang="less" scoped>
  #Register {
    .body {
      width: 570px;
      background: rgba(255, 255, 255, 1);
      border-radius: 20px;
      border: 4px solid rgba(230, 230, 230, 1);
      box-sizing: border-box;
      padding: 56px;
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .state {
        position: relative;
        padding: 0 24px 50px;
        display: flex;
        justify-content: space-between;
        .hr {
          width: 104px;
          height: 32px;
          border-bottom: 4px dotted #e6e6e6;
        }
        .active_hr {
          border-bottom: 4px dotted #ff9494;
        }
      }
      .state div {
        flex-shrink: 0;
        width: 64px;
        img {
          position: absolute;
          width: 48px;
          height: 48px;
          padding: 8px;
        }
        p:nth-of-type(1) {
          position: relative;
          text-align: center;
          line-height: 64px;
          vertical-align: middle;
          font-size: 24px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
        p:nth-of-type(2) {
          padding-top: 5px;
          font-size: 14px;
          font-weight: 400;
          text-align: center;
          color: rgba(153, 153, 153, 1);
        }
      }
      .state .active {
        img {
          width: 60px;
          height: 60px;
          padding: 2px;
        }
        p:nth-of-type(1) {
          color: rgba(255, 255, 255, 1);
        }
        p:nth-of-type(2) {
          color: rgba(51, 51, 51, 1);
        }
      }
    }
    .Register3 {
      text-align: center;
      p:nth-child(1) {
        font-size: 32px;
        font-weight: 400;
        color: rgba(255, 0, 0, 1);
        line-height: 45px;
        margin-top: 20px;
      }
      p:nth-child(2) {
        font-size: 20px;
        font-weight: 400;
        color: rgba(255, 0, 0, 1);
        line-height: 28px;
        margin: 10px 0 87px;
      }
      .el-button {
        width: 450px;
        height: 56px;
        background: #ff9494;
        border: none;
        border-radius: 28px;
        font-size: 18px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
    /deep/ .el-dialog {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0 !important;
      width: 1000px;
      background: rgba(255, 255, 255, 1);
      border-radius: 20px;
      border: 4px solid rgba(230, 230, 230, 1);
      .el-dialog__header {
        padding: 0;
      }
      .el-dialog__body {
        padding: 30px;
        p {
          font-size: 30px;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          line-height: 42px;
          text-align: center;
          margin-bottom: 30px;
        }
        > div {
          overflow: hidden;
          height: 700px;
          font-size: 16px;
          font-weight: 400;
          color: rgba(74, 74, 74, 1);
          line-height: 30px;
          width: 100%;
          margin-bottom: 30px;
        }
        > div > div {
          width: calc(100% + 22px);
          height: 100%;
          overflow: auto;
        }
        .el-button {
          display: block;
          margin: auto;
          width: 300px;
          height: 56px;
          background: rgba(255, 148, 148, 1);
          border-radius: 28px;
          font-size: 18px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
</style>
