<template>
  <div id="Login">
    <!--<img src="../assets/image/loginbg.png"/>-->

    <div class="top">
      <!--<van-icon name="arrow-left" @click="backHandle"/>-->
    </div>
    <div class="middle">
      <p>买货街后台管理</p>

      <p>欢迎使用</p>

      <p></p>

      <div>
        <van-field left-icon="user-circle-o" v-model="account" placeholder="请输入账号" maxlength="25" :border="false"/>
      </div>
      <div>
        <van-field left-icon="bag-o" v-model="password" type="password" placeholder="请输入密码" maxlength="50"
                   :border="false"/>
      </div>
      <div>
        <van-field left-icon="info-o" v-model="vcode" maxlength="4" placeholder="请输入验证码" :border="false"/>
        <p><img @click="verification" :src="imgcode"/></p>
      </div>
      <van-button @click="login">登录</van-button>
    </div>
  </div>
</template>
<script>
  import API from "../api/index";
  import {publicFn} from "../utils/util";
  export default {
    data: function () {
      return {
        vcode: '',
        token: "asfsaf",
        userId: "3",
        imgcode: 'https://api.me2group.com/maihuo/captcha.jpg',
        account: "",
        password: '',
      };
    },
    //初始化数据
    created: function () {
      if (publicFn.getStore("userInfo")) {
        this.$router.push({path: '/index'});
      }
      else {
        this.init();
      }
    },
    mounted: function () {
    },
    methods: {
      init: function () {
//        localStorage.clear();
//        this.imgcode = API.getCaptcha + "?t=" + Date.now();
      },
      //登录
      login: function () {
        let _number = this.account, _password = this.password, _code = this.vcode, _this = this;
        if (_number.length < 1) {
          API.dialog({message: API.msg.ERROR_ACCOUNT});
        }
        else if (_password.length < 1) {
          API.dialog({message: API.msg.ERROR_PASSWORD});
        }
        else if (_code.length < 4 || _code.length > 4) {
          API.dialog({message: API.msg.ERROR_VERIFYCODE});
        }
        else {
          API.request({
            url: API.login,
            method: "post",
            data: API.qs.stringify({
              username: _number,
              password: _password,
              captcha: _code
            })
          }).then(function (e) {
            console.log(e)
            if (e.data.code == 0) {
              if (e.data.success) {
                publicFn.setStore("userInfo", JSON.stringify(e.data.data));
                _this.$router.push({path: '/index'});
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
        }
      },
      //获取用户信息
      getUserInfo: function (id) {
        var _this = this;
        API.request({
          url: API.userInfo,
          method: "post",
          headers: {token: this.token, userId: id}
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              localStorage.setItem("userInfo", JSON.stringify(e.data.data));
              _this.$router.push('/index');
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
      //获取验证码
      verification: function () {
        this.imgcode = API.getCaptcha + "?t=" + new Date().getTime();
      },
      //验证码
      getVerifyOfPhone: function (v) {
        var _this = this;
        API.request({
          method: "post",
          url: API.getVerifyOfPhone,
          headers: {token: "1243", userId: this.userId},
          data: API.qs.stringify({phone: v})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              //todo
            }
            else {
              API.dialog({message: JSON.stringify(e.data.msg)});
              _this.repeatTime();
            }
          }
          else {
            API.dialog({message: JSON.stringify(e.data.msg)});
            _this.repeatTime();
          }
        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
      },
    }
  }
  ;
</script>
<style lang="less" scoped>
  #Login {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    color: #333;
    /*background: rgba(0, 0, 0, 0.6);*/
    background: url('../assets/image/loginbg.png') no-repeat;
    background-size: cover;
    background-attachment: fixed;
    > img {
      position: absolute;
      top: 0;
      left: 0;
      opacity: .3;
      height: 100%;
      width: 100%;
      z-index: -1;
    }
    .top {
      height: 1.2rem;
      line-height: 1.2rem;
      font-size: 0.45rem;
      margin-left: 0.3rem;
    }
    .middle {
      padding: 0 0.75rem;
      text-align: center;
      > p:nth-child(1) {
        font-size: 0.48rem;
        font-weight: 500;
        line-height: 0.67rem;
        margin: 0.3rem 0 0.2rem;
      }
      > p:nth-child(2) {
        font-size: 0.32rem;
        font-weight: 300;
        line-height: 0.45rem;
      }
      > p:nth-child(3) {
        font-size: 0.18rem;
        font-weight: 300;
        line-height: 0.25rem;
        margin: 1rem 0 0.2rem;
      }
      .van-field {
        background: transparent;
        padding: 0;
        /deep/ input {
          font-size: 0.28rem;
          font-weight: 400;
          line-height: 0.4rem;
          padding: 0 0.20rem;
        }
        ::-webkit-input-placeholder {
          /* WebKit browsers */
          font-size: 0.28rem;
          font-family: Noto Sans S Chinese;
          font-weight: normal;
        }
        ::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          font-size: 0.28rem;
          font-family: Noto Sans S Chinese;
          font-weight: normal;
        }
        ::-ms-input-placeholder {
          /* Internet Explorer 10+ */
          font-size: 0.28rem;
          font-family: Noto Sans S Chinese;
          font-weight: normal;
          /*color: rgba(255, 255, 255, 1);*/
        }
      }
      > div:nth-child(4) {
        display: flex;
        align-items: center;
        width: 6rem;
        height: 0.8rem;
        border-bottom: 0.01rem solid #ccc;
        /*border-radius: 0.4rem;*/
        //   opacity: 0.3;
        p {
          font-size: 0.24rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 0.33rem;
          margin: 0 0.15rem 0 0.3rem;
        }
      }
      > div:nth-child(5) {
        display: flex;
        align-items: center;
        width: 6rem;
        height: 0.8rem;
        margin: 0.3rem 0 0rem;
        /*border-radius: 0.4rem;*/
        border-bottom: 0.01rem solid #ccc;
        //   opacity: 0.3;
        p {
          font-size: 0.24rem;
          font-weight: 400;
          line-height: 0.33rem;
          margin: 0 0.15rem 0 0.3rem;
        }
      }
      > div:nth-child(6) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 6rem;
        height: 0.8rem;
        /*border-radius: 0.4rem;*/
        border-bottom: 0.01rem solid #ccc;
        padding: 0 0.4rem 0 0rem;
        box-sizing: border-box;
        margin: 0.3rem 0 0.6rem;
        p {
          width: 1.5rem;
          flex-shrink: 0;
          text-align: center;
          font-size: 0.24rem;
          font-weight: 400;
          color: #333;
          line-height: 0.33rem;
        }
        img {
          width: 2.0rem;
          height: 0.7rem;
          border-radius: .3rem;
        }
        .active {
          pointer-events: none;
          color: #9b9b9b;
        }
      }
      > .van-button {
        width: 6rem;
        height: 0.8rem;
        background: rgba(82, 189, 242, 1);
        border-radius: 0.4rem;
        border: none;
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #fff;
        line-height: 0.45rem;
      }
      > p:nth-child(7) {
        line-height: 0.3rem;
        margin: 0.6rem 0 1rem;
        font-size: 0;
        img {
          width: 0.3rem;
          margin-right: 0.3rem;
          vertical-align: middle;
        }
        span {
          font-size: 0.18rem;
          font-weight: 400;
          color: rgba(155, 155, 155, 1);
          line-height: 0.18rem;
          vertical-align: middle;
        }
      }
    }
    .bottom {
      width: 5.5rem;
      margin: auto;
      > div:nth-child(1) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        div {
          width: 2rem;
          height: 0.04rem;
          background: rgba(155, 155, 155, 0.5);
        }
        p {
          font-size: .18rem;
          font-weight: 400;
          color: rgba(155, 155, 155, 1);
          line-height: .25rem;
        }
      }
      > div:nth-child(2) {
        padding-top: .3rem;
        display: flex;
        justify-content: space-around;
        img {
          height: 0.37rem;
        }
      }
    }
  }
</style>
