<template>
  <div id="Login">
    <img src="../../assets/image/gw/login/1.png"/>

    <div class="top">
      <van-icon name="arrow-left" @click="$router.push('/index')"/>
    </div>
    <div class="middle">
      <p>登录后更精彩</p>

      <p>更多美好生活期待与您相遇</p>

      <p>未注册手机验证后完成注册</p>

      <div>
        <p>+86</p>
        <img src="../../assets/image/gw/login/2.png"/>
        <van-field v-model="number" placeholder="请输入手机号" :border="false"/>
      </div>
      <div>
        <van-field v-model="code" maxlength="6" placeholder="请输入验证码" :border="false"/>
        <p @click="verification" :class="{active:time!=61}">{{test}}</p>
      </div>
      <van-button @click="login">登录</van-button>
      <p @click="check=!check">
        <img src="../../assets/image/gw/login/3.png" v-if="check==false"/>
        <img src="../../assets/image/gw/login/4.png" v-else/>
        <span>已阅读并同意《阿莎希服务协议》和《用户隐私保护政策》</span>
      </p>
    </div>
    <div class="bottom">
      <div>
        <div></div>
        <p>其他登录方式</p>

        <div></div>
      </div>
      <div>
        <!--<img @click="otherLogin(2)" src="../../assets/image/gw/5.png"/>-->
        <img @click="otherLogin(1)" src="../../assets/image/gw/login/6.png"/>
        <!--<img @click="otherLogin(3)" src="../../assets/image/gw/7.png"/>-->
      </div>
    </div>
  </div>
</template>
<script>
  import API from "../../api/index";
  import {publicFn} from "../../utils/util";
  export default {
    data: function () {
      return {
        code: '',
        token: "asfsaf",
        userId: 1243,
        number: "",
        check: false,
        test: "获取验证码", //验证码计时
        test_0: "",
        time: 61,
        regId: ''
      };
    },
    //初始化数据
    created: function () {
      if (localStorage.getItem("asxUserInfo")) {
        this.$router.push({path: '/'});
      }
      else {
        this.init();
      }
    },
    methods: {
      init: function () {
        var _this = this;
        this.code = this.$route.query.code;
        var ua = navigator.userAgent;
        this.regId = ua;
        if (this.code) {
          //微信code
          var params = {
            registerType: 1,
            regId: this.regId,
            phone: '',
            message: '',
            code: this.code
          }
          API.request({
            url: API.getAuthorizeInfoLogin,
            method: "post",
            headers: {token: this.token, userId: id},
            data: API.qs.stringify(params)
          }).then(function (e) {
            if (e.data.code == 200) {
              if (e.data.success) {
                API.dialog({message: JSON.stringify(e.data.msg)});
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
      //登录
      login: function () {
        var _number = this.number, _code = this.code, _ruleflag = this.check, _this = this;
        if (_number.length < 11 || _number.length > 11) {
          API.dialog({message: API.msg.ERROR_PHONE});
        }
        else if (!publicFn.isPoneAvailable(_number)) {
          API.dialog({message: API.msg.ERROR_PHONECHECK});
        }
        else if (_code.length < 6 || _code.length > 6) {
          API.dialog({message: API.msg.ERROR_VERIFYCODE});
        }
        else if (_ruleflag == false) {
          API.dialog({message: API.msg.ERROR_RULE});
        }
        else {
          API.request({
            url: API.login,
            method: "post",
            headers: {
              token: this.token,
              userId: this.userId
            },
            data: API.qs.stringify({
              account: _number,
              message: _code,
              regId: this.regId,
              pwd: "123456"
            })
          }).then(function (e) {
            if (e.data.code == 200) {
              if (e.data.success) {
                localStorage.setItem("asxUserInfo", JSON.stringify(e.data.data));
                _this.$router.go(-1);
              }
              else {
                API.dialog({message: JSON.stringify(e.data.msg)});
              }
            }
//            else if (e.data.code == 1000) {
//              _this.registerUser(_number, _code)
//            }
            else {
              API.dialog({message: JSON.stringify(e.data.msg)});
            }
          }).catch(function (e) {
            API.dialog({message: JSON.stringify(e)});
          })
        }
      },
      //用户注册
      registerUser: function (phone, code) {
        var _this = this;
        API.request({
          url: API.phoneRegister,
          method: "post",
          headers: {token: this.token, userId: this.userId},
          data: API.qs.stringify({phone: phone, message: code, pas: "123456"})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.getUserInfo(e.data.data.userId);
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
        var _this = this;
        API.request({
          url: API.userInfo,
          method: "post",
          headers: {token: this.token, userId: id}
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              localStorage.setItem("asxUserInfo", JSON.stringify(e.data.data));
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
        var _this = this, _number = this.number;
        if (_number.length == 11) {
          //只调用一次
          if (this.time == 61) {
            API.request({
              method: "post",
              url: API.getVerifyOfPhone,
              headers: {token: "1243", userId: 123424},
              data: API.qs.stringify({phone: _number})
            }).then(function (e) {
              if (e.data.code == 200) {
                if (e.data.success) {
                  //todo
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
          this.time--;
          this.test = "重新发送(" + this.time + ")";
          this.test_0 = setTimeout(function () {
            clearTimeout(_this.test_0);
            if (_this.time > 0) {
              _this.verification();
            } else {
              _this.time = 61;
              _this.test = "重新发送";
            }
          }, 1000);
        }
        else {
          API.dialog({message: API.msg.ERROR_PHONE});
        }
      },
      //第三方登录   微信:1，qq:2，新浪:3,
      otherLogin: function (id) {
        var _this = this, _openid = 12423, _regId = 1241234;
//        if (id == 1) {
//          //公众号 wx3e50b1a319a20084
//          window.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8e053134467c4fd2&redirect_uri=http://wx.me2group.com/qianwa/&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect')
//        }
//        else {
        API.request({
          method: "post",
          url: API.weixinOrQQOrWinbologin,
          headers: {token: this.token, userId: this.userId},
          data: API.qs.stringify({id: _openid, registerType: id, regId: _regId})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              //更新微信，qq，新浪登录接口
              _this.updateUserInfo(e.data.data);
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
//        }
      },
      //更新微信，qq，新浪登录接口
      updateUserInfo: function (data) {
        var _this = this;
        API.request({
          method: "post",
          url: API.weixinOrQQOrWeiboRegister,
          headers: {token: this.token, userId: this.userId},
          data: API.qs.stringify({id: 1234, registerType: v, regId: 2143})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              //todo
              _this.getUserInfo(e.data.data.id);
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
    background: rgba(0, 0, 0, 0.6);
    > img {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: -1;
    }
    .top {
      height: 1.2rem;
      line-height: 1.2rem;
      font-size: 0.45rem;
      color: #ffffff;
      margin-left: 0.3rem;
    }
    .middle {
      padding: 0 0.75rem;
      > p:nth-child(1) {
        font-size: 0.48rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 0.67rem;
        margin: 0.3rem 0 0.2rem;
      }
      > p:nth-child(2) {
        font-size: 0.32rem;
        font-weight: 300;
        color: rgba(255, 255, 255, 1);
        line-height: 0.45rem;
      }
      > p:nth-child(3) {
        font-size: 0.18rem;
        font-weight: 300;
        color: rgba(255, 255, 255, 0.5);
        line-height: 0.25rem;
        margin: 1rem 0 0.2rem;
      }
      // 输入框统一样式
      .van-field {
        background: transparent;
        padding: 0;
        /deep/ input {
          font-size: 0.28rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 0.4rem;
        }
        ::-webkit-input-placeholder {
          /* WebKit browsers */
          font-size: 0.28rem;
          font-family: Noto Sans S Chinese;
          font-weight: normal;
          color: rgba(255, 255, 255, 1);
        }
        ::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          font-size: 0.28rem;
          font-family: Noto Sans S Chinese;
          font-weight: normal;
          color: rgba(255, 255, 255, 1);
        }
        ::-ms-input-placeholder {
          /* Internet Explorer 10+ */
          font-size: 0.28rem;
          font-family: Noto Sans S Chinese;
          font-weight: normal;
          color: rgba(255, 255, 255, 1);
        }
      }
      > div:nth-child(4) {
        display: flex;
        align-items: center;
        width: 6rem;
        height: 0.8rem;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 0.4rem;
        //   opacity: 0.3;
        p {
          font-size: 0.24rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 0.33rem;
          margin: 0 0.15rem 0 0.3rem;
        }
        img {
          width: 0.14rem;
          margin-right: 0.3rem;
        }
      }
      > div:nth-child(5) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 6rem;
        height: 0.8rem;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 0.4rem;
        padding: 0 0.4rem 0 0.3rem;
        box-sizing: border-box;
        margin: 0.3rem 0 0.6rem;
        p {
          width: 1.5rem;
          flex-shrink: 0;
          text-align: center;
          font-size: 0.24rem;
          font-weight: 400;
          color: rgba(82, 189, 242, 1);
          line-height: 0.33rem;
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
        color: rgba(255, 255, 255, 1);
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
