<template>
  <div id="Login">
    <div>
      <p class="login1">用户登录</p>
      <el-input placeholder="请输入手机号" v-model="phone">
        <img class="shouji" slot="prefix" src="../../assets/image/gw/12.png" />
      </el-input>
      <el-input placeholder="请输入密码" type="password" v-model="pwd">
        <img class="shouji" slot="prefix" src="../../assets/image/gw/10.png" />
      </el-input>
      <div class="forget">
        <el-checkbox v-model="checked" text-color="red">记住我的登录状态</el-checkbox>
        <p @click="$router.push({path:'/Forget',query:{name:'忘记密码'}})">忘记密码</p>
        <p style="margin-left:18px" @click="$router.push('/Register')">快速注册</p>
      </div>
      <button class="btn" @click="login">立即登录</button>
      <div class="bottom">
        <span style="float:left">其他登录方式</span>
        <img class="qq" src="../../assets/image/gw/11.png" alt />
        <img class="wechat" src="../../assets/image/gw/13.png" alt />
        <span style="float:right" @click="$router.push({path:'/Forget',query:{name:'快速登录'}})">快速登录></span>
      </div>
    </div>
  </div>
</template>
<script>
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
  }
};
</script>
<style lang="less" scoped>
#Login {
  > div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 570px;
    height: 591px;
    border-radius: 20px;
    border: 4px solid rgba(230, 230, 230, 1);
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
      display: flex;
      align-items: center;
      font-size: 16px;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      .el-checkbox {
        font-size: 16px;
      }

      p:nth-child(2) {
        margin-left: auto;
      }
    }
    .btn {
      width: 450px;
      height: 56px;
      background: #ff9494;
      border-radius: 28px;
      border: none;
      font-size: 18px;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-top: 30px;
    }
    .bottom {
      font-size: 16px;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-top: 35px;
      height: 40px;
      line-height: 40px;
      .qq {
        width: 22px;
        height: 25px;
        margin-left: 80px;
        vertical-align: middle;
      }
      .wechat {
        height: 23px;
        margin-left: 40px;
        vertical-align: middle;
      }
    }
  }
}
</style>