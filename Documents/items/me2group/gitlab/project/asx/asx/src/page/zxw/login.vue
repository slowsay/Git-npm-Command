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
      <span>记住我的登录状态</span>
      <div class="forget">
        <span @click="$router.push('ret_pass')">忘记密码</span>
        <span  style="margin-left:18px" @click="$refs.Register.dialogVisible=true">快速注册</span>
      </div>
      <button class="btn" @click="login">立即登录</button>
      <div class="bottom">
        <span style="float:left">其他登录方式</span>
        <img class="qq" src="../../assets/img/zxw/qq.png" alt="">
        <img class="wechat" src="../../assets/img/zxw/wechat.png" alt="">
        <span style="float:right" @click="$router.push('/rapid_pass')">快速登录></span>
      </div>
    </div>
    
    <Register ref="Register"></Register>
  </div>
</template>
<script>
import Register from '../gw/Register'
import navbar from "../../components/nav";
export default {
  data() {
    return {
      phone: "",
      pwd: "",
      checked: ""
    };
  },
  methods:{
    login(){
      this.$router.push('/index')
    }
  },
  components: {
    navbar,
    Register
  }
};
</script>
<style lang="less" scoped>
.login {
  .top {
    width: 1280px;
    margin: 0 auto;
    margin-top: 40px;
  }
  .contain {
    width: 570px;
    height: 591px;
    background: rgba(255, 255, 255, 1);
    border: 4px solid rgba(0, 0, 0, 0.08);
    border-radius: 20px;
    margin: 145px auto;
    padding: 69px 60px 0 60px;
    box-sizing: border-box;
    .login1 {
      font-size: 30px;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 60px;
      width: 200px;
    }
    /deep/.el-input__inner {
      width: 450px;
      height: 56px;
      border-radius: 28px;
      margin-bottom: 40px;
      padding-left: 70px;
      font-size: 16px;
    }
    .shouji {
      height: 24px;
      margin: 16px 30px;
    }
    .forget {
      float: right;
      font-size: 16px;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .btn{
      width:450px;
      height:56px;
      background:rgba(224,18,32,1);
      border-radius:28px;
      border:none;
      font-size:18px;
font-family:DFYuanW5-GB;
font-weight:400;
color:rgba(255,255,255,1);
margin-top:30px;
    }
    .bottom{
      font-size:16px;
      font-family:DFYuanW5-GB;
      font-weight:400;
      color:rgba(51,51,51,1);
      margin-top:35px;
      height: 40px;
   .qq{
     width: 22px;
     height: 25px;
     margin-left: 80px;
   }
   .wechat{
     height: 23px;
     margin-left: 40px;
     
   }
    }

  }
}
</style>