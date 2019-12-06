<template>
  <!-- 注册页     -->
  <el-form :model="Form" :rules="rules" ref="ruleForm">
    <el-form-item prop="number">
      <el-input type="text" v-model="Form.number" placeholder="请输入手机号码" maxlength="11">
        <img src="../../assets/img/gw/4.png" slot="prefix" />
      </el-input>
    </el-form-item>
    <el-form-item prop="test">
      <el-input type="text" v-model="Form.test" placeholder="短信验证码" maxlength="4">
        <img src="../../assets/img/gw/6.png" slot="prefix" />
      </el-input>
      <el-button @click="code" :class="{disable:time!=61}">{{codetext}}</el-button>
    </el-form-item>
    <el-form-item prop="password1">
      <el-input type="password" v-model="Form.password1" placeholder="设置登录密码">
        <img src="../../assets/img/gw/5.png" slot="prefix" />
      </el-input>
    </el-form-item>
    <el-form-item prop="password2">
      <el-input type="password" v-model="Form.password2" placeholder="再次输入密码">
        <img src="../../assets/img/gw/5.png" slot="prefix" />
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="Form.checked">已阅读并同意用户协议</el-checkbox>
      <p>
        已有账号，前往登录
        <i class="el-icon-arrow-right"></i>
      </p>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">注册</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      Form: {
        number: null,
        test: null,
        password1: null,
        password2: null,
        checked: false
      },
      // 验证码计时
      time: 61,
      times: null,
      codetext: "获取验证码",
      //   验证规则
      rules: {
        number: [
          { required: true, message: "手机号不能为空" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的手机号"
          }
        ],
        test: [
          { required: true, message: "短信验证码不能为空" },
          {
            pattern: /^\d{4}$/,
            message: "请输入正确的短信验证码"
          }
        ],
        password1: [{ required: true, message: "登录密码不能为空" }, {}],
        password2: [
          { required: true, message: "登录密码不能为空" },
          {
            validator: this.validatepassword,
            trigger: "blur"
          }
        ],
      }
    };
  },
  methods: {
    // 获取验证码
    code() {
      this.$refs.ruleForm.validateField("number", res => {
        if (res == "") {
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
      });
    },
    // 注册
    onSubmit() {
        this.$refs.ruleForm.validate(res=>{
            if(res==true){
                if(this.Form.checked){
                    //验证成功
                    this.$emit('submit',true)
                }
                else
                {
                   this.$message.error('请阅读并同意用户协议');
                }
            }
        })
    },
    // 第二次输入密码验证规则
    validatepassword(rule, value, callback) {
      if (value != this.Form.password1)
        callback(new Error("两次密码输入不一致"));
      else {
        callback();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.el-form {
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
  .el-form-item {
    margin-bottom: 40px;
    /deep/.el-form-item__error {
      margin-left: 70px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(224, 18, 32, 1);
    }
  }
  .el-form-item:nth-last-of-type(1) {
    margin-bottom: 0;
  }
  .el-form-item:nth-of-type(2) {
    /deep/.el-form-item__content {
      .el-input {
        width: 310px;
      }
      .el-button {
        float: right;
        width: 130px;
        height: 56px;
        background: rgba(224, 18, 32, 1);
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
  }
  .el-form-item:nth-of-type(5) {
    /deep/.el-form-item__content {
      line-height: 16px;
    }

    /deep/.el-checkbox__input {
      vertical-align: baseline;
    }
    /deep/.el-checkbox__label {
      font-size: 16px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    p {
      float: right;
      font-size: 16px;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
  .el-form-item:nth-of-type(6) {
    .el-button {
      width: 450px;
      height: 56px;
      background: rgba(224, 18, 32, 1);
      border: none;
      border-radius: 28px;
      font-size: 18px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  .disable {
    background: rgba(224, 18, 32, 0.7) !important;
    pointer-events: none;
  }
}
</style>