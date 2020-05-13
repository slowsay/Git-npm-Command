<template>
  <!-- 注册页     -->
  <el-form :model="Form" :rules="rules" ref="ruleForm">
    <el-form-item prop="number">
      <el-input type="text" v-model="Form.number" placeholder="请输入手机号码" maxlength="11">
        <img src="../../assets/image/gw/12.png" slot="prefix"/>
      </el-input>
    </el-form-item>
    <el-form-item prop="test">
      <el-input type="text" v-model="Form.test" placeholder="短信验证码" maxlength="6">
        <img src="../../assets/image/gw/16.png" slot="prefix"/>
      </el-input>
      <el-button @click="getCode" :class="{disable:time!=61}">{{codetext}}</el-button>
    </el-form-item>
    <el-form-item prop="password1">
      <el-input type="password" v-model="Form.password1" placeholder="设置登录密码">
        <img src="../../assets/image/gw/10.png" slot="prefix"/>
      </el-input>
    </el-form-item>
    <el-form-item prop="password2">
      <el-input type="password" v-model="Form.password2" placeholder="再次输入密码">
        <img src="../../assets/image/gw/10.png" slot="prefix"/>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="Form.checked"></el-checkbox>
      <p @click="dialog">已阅读并同意用户协议</p>

      <p @click="$router.push('/Login')">
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
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    data: function () {
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
            {required: true, message: "手机号不能为空"},
            {
              pattern: /^1[3456789]\d{9}$/,
              message: "请输入正确的手机号"
            }
          ],
          test: [
            {required: true, message: "短信验证码不能为空"},
            {
              pattern: /^\d{6}$/,
              message: "请输入正确的短信验证码"
            }
          ],
          password1: [{required: true, message: "登录密码不能为空"}, {}],
          password2: [
            {required: true, message: "登录密码不能为空"},
            {
              validator: this.validatepassword,
              trigger: "blur"
            }
          ]
        },
        //弹窗
        show: true
      };
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
        this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id};

      },
      // 获取验证码
      getCode: function () {
        var _this = this;
        this.$refs.ruleForm.validateField("number", function (res) {
          if (res == "") {
            _this.time = 60;
            _this.codetext = "重新获取(" + _this.time + ")";
            //调用验证码接口
            _this.getVerificationCode();
            _this.returnTime()
          }
        });
      },
      //调用验证码接口
      getVerificationCode: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.forgetCode,
          headers: this.headerobj,
          data: API.qs.stringify({phone: this.Form.number})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
            }
            else {
              _this.$message.error(JSON.stringify(e.data.msg));
              _this.repeatTime();
            }
          }
          else {
            _this.$message.error(JSON.stringify(e.data.msg));
            _this.repeatTime();
          }

        }).catch(function (e) {
          _this.$message.error(JSON.stringify(e));
        })
      },
      //验证码复位
      repeatTime: function () {
        _this.time = 60;
        _this.codetext = "重新获取(" + _this.time + ")";
        clearTimeout(this.times);
      },
      returnTime: function () {
        var _this = this;
        _this.times = setTimeout(function () {
          if (_this.time != 0) {
            _this.time--;
            _this.codetext = "重新获取(" + _this.time + ")";
            _this.returnTime()
          } else {
            _this.time = 61;
            _this.codetext = "重新获取";
            clearTimeout(this.times);
          }
        }, 1000);
      },
      // 注册
      onSubmit: function () {
        var _this = this;
        this.$refs.ruleForm.validate(function (res) {
          if (res == true) {
            if (_this.Form.checked) {
              //验证成功
              _this.regist();

            } else {
              _this.$message.error("请阅读并同意用户协议");
            }
          }
        });
      },
      //注册接口
      regist: function () {
        var _this = this;
        var params = {phone: this.Form.number, message: this.Form.test, password: this.Form.password1};
        API.request({
          method: "post",
          url: API.regist,
          headers: this.headerobj,
          data: API.qs.stringify(params)
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              //获取用户信息
              _this.getUserInfo(e.data.data);
              _this.$emit("submit", true);
            }
            else {
              API.dialog({message: JSON.stringify(e.data.msg)});
            }
          }
          else {
            API.dialog({message: JSON.stringify(e.data.msg)});
          }

        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
      },
      //获取用户信息
      getUserInfo: function (id) {

      },
      // 第二次输入密码验证规则
      validatepassword: function (rule, value, callback) {

        if (value != this.Form.password1)
          callback(new Error("两次密码输入不一致"));
        else {
          callback();
        }
      },
      dialog: function () {
        this.$emit("dialog", true);
      }
    }
  };
</script>
<style lang="less" scoped>
  .el-form {
    .el-input {
      /deep/ input {
        height: 56px;
        background: rgba(250, 250, 250, 1);
        border: 1px solid rgba(230, 230, 230, 1);
        border-radius: 28px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        padding-left: 70px;
      }
      /deep/ .el-input__prefix {
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
      /deep/ .el-form-item__error {
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
      /deep/ .el-form-item__content {
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
    }
    .el-form-item:nth-of-type(5) {
      /deep/ .el-form-item__content {
        line-height: 16px;
        display: flex;
        align-items: center;
      }

      /deep/ .el-checkbox__input {
        vertical-align: bottom;
        line-height: 0;
      }
      p:nth-of-type(1) {
        margin-left: 10px;
      }
      p:nth-of-type(2) {
        margin-left: auto;
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
        background: #ff9494;
        border: none;
        border-radius: 28px;
        font-size: 18px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
    .disable {
      background: #ff9494 !important;
      pointer-events: none;
    }
  }
</style>
