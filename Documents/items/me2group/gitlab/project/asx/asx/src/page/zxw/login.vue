<template>
  <div class="login">
    <div class="top">
      <navbar></navbar>
    </div>
    <div class="contain">
      <p class="login1">用户登录</p>
      <el-input placeholder="请输入手机号" v-model="phone">
        <img class="shouji" slot="prefix" src="../../assets/img/zxw/shouji.png" alt />
      </el-input>
      <el-input placeholder="请输入密码" type="password" v-model="pwd">
        <img class="shouji" slot="prefix" src="../../assets/img/zxw/mima.png" alt />
      </el-input>
      <el-checkbox v-model="checked" text-color="red"></el-checkbox>
      <span style="font-size:12px;margin-left:8px">记住我的登录状态</span>
      <div class="forget">
        <span @click="$router.push('ret_pass')">忘记密码</span>
        <span style="margin-left:14px" @click="$router.push('/Register')">快速注册</span>
      </div>
      <button class="btn" @click="login">立即登录</button>
      <div class="bottom">
        <span style="float:left">其他登录方式</span>
        <img class="qq" src="../../assets/img/zxw/qq.png" alt />
        <img class="wechat" src="../../assets/img/zxw/wechat.png" alt />
        <span style="float:right" @click="$router.push('/rapid_pass')">快速登录></span>
      </div>
    </div>
  </div>
</template>
<script>
import navbar from "../../components/nav";
export default {
  data() {
    return {
      phone: "",
      pwd: "",
      checked: ""
    };
  },
  methods: {
    login() {
      this.$router.push("/index");
    }
  },
  components: {
    navbar,
  }
};
</script>
<style lang="scss" scoped>
$size: 0.8;
.login {
  .top {
    width: 1280px * $size;
    margin: 0 auto;
    margin-top: 40px * $size;
  }
  .contain {
    width: 570px * $size;
    height: 591px * $size;
    background: rgba(255, 255, 255, 1);
    border: 4px * $size solid rgba(0, 0, 0, 0.08);
    border-radius: 20px * $size;
    margin: 145px * $size auto 0;
    padding: 69px * $size 60px * $size 0 60px * $size;
    box-sizing: border-box;
    .login1 {
      font-size: 30px * $size;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 60px * $size;
      width: 200px * $size;
    }
    >>> .el-input__inner {
      display: flex;
      align-items: center;
      height: 56px * $size;
      border-radius: 28px * $size;
      margin-bottom: 40px * $size;
      padding-left: 70px * $size;
      font-size: 16px * $size;
    }
    .shouji {
      height: 24px * $size;
      margin: 15px * $size 20px * $size;
    }
    .forget {
      float: right;
      font-size: 16px * $size;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .btn {
      width: 450px * $size;
      height: 56px * $size;
      background: rgba(224, 18, 32, 1);
      border-radius: 28px * $size;
      border: none;
      font-size: 18px * $size;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-top: 30px * $size;
    }
    .bottom {
      font-size: 16px * $size;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-top: 35px * $size;
      height: 40px * $size;
      .qq {
        width: 22px * $size;
        height: 25px * $size;
        margin-left: 80px * $size;
      }
      .wechat {
        height: 23px * $size;
        margin-left: 40px * $size;
      }
    }
  }
}
</style>