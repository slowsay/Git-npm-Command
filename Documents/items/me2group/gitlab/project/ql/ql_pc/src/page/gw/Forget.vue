<template>
  <div id="Forget">
    <p v-if="step==1">忘记密码</p>

    <p v-else>修改密码</p>

    <div v-if="step==1">
      <el-input type="text" v-model="Form.number" placeholder="请输入手机号码" maxlength="11">
        <img src="../../assets/image/gw/12.png" slot="prefix"/>
      </el-input>
    </div>
    <div v-else>
      <el-input type="text" v-model="Form.password" placeholder="请输入新密码" maxlength="20"/>
      <el-input type="text" v-model="Form.epassword" placeholder="请再次输入新密码" maxlength="20"/>
    </div>
    <div v-if="step==1">
      <el-input type="text" v-model="Form.test" placeholder="短信验证码" maxlength="6">
        <img src="../../assets/image/gw/16.png" slot="prefix"/>
      </el-input>
      <el-button @click="getCode" :class="{disable:time!=61}">{{codetext}}</el-button>
    </div>
    <el-button v-if="step==1" @click="stepHandle">下一步</el-button>
    <el-button v-else @click="editPSHandle">提交</el-button>
    <div v-if="step==1">
      <p @click="$router.push('/Login')">账号登陆</p>

      <p @click="$router.push('/Register')">
        <span>快速注册</span>
        <img src="../../assets/image/gw/14.png"/>
      </p>
    </div>
  </div>
</template>
<script>
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    data: function () {
      return {
        step: 1,
        Form: {
          number: '',
          test: '',
          password: '',
          epassword: ''
        },
        // 验证码计时
        time: 61,
        times: 0,
        codetext: "获取验证码",
        name: this.$route.query.name
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
      stepHandle: function () {
        this.step = 2;
      },
      //修改密码
      editPSHandle: function () {
        var _this = this, _account = this.Form.number, _pwd = this.Form.password, _pwds = this.Form.epassword;
        if (_pwd.length < 6) {
          _this.$message.success("请输入6位或以上密码");
        }
        else if (_pwd != _pwds) {
          _this.$message.success("密码不一致");
        }
        else {
          API.request({
            method: "post",
            url: API.updatePass,
            headers: this.headerobj,
            data: API.qs.stringify({phone: _account, password: _pwd})
          }).then(function (e) {
            if (e.data.code == 200) {
              if (e.data.success) {
                _this.$message.success("修改成功");
                _this.$router.push("/Login");
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
      },
      // 获取验证码
      getCode: function () {
        var _this = this, _account = this.Form.number;
        //
        if (_account.length < 11) {
          _this.$message.error(API.msg.ERROR_PHONE);
        }
        else if (!publicFn.isPoneAvailable(_account)) {
          _this.$message.error(API.msg.ERROR_PHONEERROR);
        }
        else {
          if (this.time == 61) {
            this.getVerificationCode(_account);
            this.returnTime();
          }
        }
      },
      //验证码
      getVerificationCode: function (v) {
        var _this = this;
        API.request({
          method: "post",
          url: API.forgetCode,
          headers: this.headerobj,
          data: API.qs.stringify({phone: v})
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
      repeatTime: function () {
        this.time = 61;
        this.codetext = "重新获取(" + this.time + ")";
      },
      returnTime: function () {
        var _this = this;
        _this.time--;
        _this.codetext = "重新获取(" + _this.time + ")";
        this.times = setTimeout(function () {
          clearTimeout(_this.times);
          if (_this.time > 0) {
            _this.returnTime();
          } else {
            _this.time = 61;
            _this.codetext = "重新获取";
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
      p:nth-child(2) {
        margin-left: auto;
      }
      span {
        vertical-align: middle;
      }
      img {
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
