<template>
  <div id="Forget">
    <p>{{name}}</p>
    <div>
      <el-input type="text" v-model="Form.number" placeholder="请输入手机号码" maxlength="11">
        <img src="../../assets/image/gw/12.png" slot="prefix" />
      </el-input>
    </div>
    <div>
      <el-input type="text" v-model="Form.test" placeholder="短信验证码" maxlength="4">
        <img src="../../assets/image/gw/16.png" slot="prefix" />
      </el-input>
      <el-button @click="code" :class="{disable:time!=61}">{{codetext}}</el-button>
    </div>
    <el-button>下一步</el-button>
    <div>
      <p @click="$router.push('/Login')">账号登陆</p>
      <p @click="$router.push('/Register')">
        <span>快速注册</span>
        <img src="../../assets/image/gw/14.png" />
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Form: {
        number: null,
        test: null
      },
      // 验证码计时
      time: 61,
      times: null,
      codetext: "获取验证码",
      name:this.$route.query.name
    };
  },
  methods: {
    // 获取验证码
    code() {
      this.time = 60;
      this.codetext = "重新获取(" + this.time + ")";
      this.times = setInterval(() => {
        if (this.time != 0) {
          this.time--;
          this.codetext = "重新获取(" + this.time + ")";
        } else {
          this.time = 61;
          this.codetext = "重新获取";
          clearInterval(this.times);
        }
      }, 1000);
    }
  }
};
</script>
<style lang="less" scoped>
#Forget {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 570px;
  height: 540px;
  padding: 60px 60px 0;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  border-radius: 20px;
  border: 4px solid rgba(230, 230, 230, 1);
  .el-input {
    /deep/input {
      height: 56px;
      background: rgba(250, 250, 250, 1);
      border: 1px solid rgba(230, 230, 230, 1);
      border-radius: 28px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      padding-left: 70px;
    }
    /deep/.el-input__prefix {
      width: 70px;
      line-height: 52px;
      img {
        width: 20px;
        vertical-align: middle;
      }
    }
  }
  > p {
    font-size: 30px;
    font-weight: 400;
    color: rgba(74, 74, 74, 1);
    line-height: 42px;
    margin-bottom: 55px;
  }
  > div:nth-child(2) {
    margin-bottom: 40px;
  }
  > div:nth-child(3) {
    .el-input {
      width: 310px;
    }
    .el-button {
      float: right;
      width: 130px;
      height: 56px;
      background: #ff9494;
      border-radius: 28px;
      border: none;
      font-size: 18px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      padding: 0;
      text-align: center;
      line-height: 56px;
    }
  }
  > .el-button {
    width: 450px;
    height: 56px;
    background: #ff9494;
    border: none;
    border-radius: 28px;
    font-size: 18px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    margin: 60px 0 37px;
  }
  > div:nth-child(5) {
    display: flex;
    font-size: 16px;
    font-weight: 400;
    color: rgba(74, 74, 74, 1);
    line-height: 30px;
    p:nth-child(2){
      margin-left: auto;
    }
    span{
      vertical-align: middle;
    }
    img{
      vertical-align: middle;
      height: 12px;
    }
  }
   .disable {
    background: #FF9494 !important;
    pointer-events: none;
  }
}
</style>