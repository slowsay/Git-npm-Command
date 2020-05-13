<template>
  <div id="Login">
    <img src="../../assets/image/gw/1.png"/>

    <div class="top">
      <van-icon name="arrow-left" @click="backHandle"/>
    </div>
    <div class="middle">
      <p>登录后更精彩</p>

      <p>更多美好生活期待与您相遇</p>

      <p>未注册手机验证后完成注册</p>

      <div>
        <p>+86</p>
        <img src="../../assets/image/gw/2.png"/>
        <van-field v-model="number" placeholder="请输入手机号" maxlength="11" @input="phoneExchange" :border="false"/>
      </div>
      <div>
        <van-field v-model="code" maxlength="6" @input="codeExchange" placeholder="请输入验证码" :border="false"/>
        <keep-alive>
          <p @click="verification" :class="{active:time!=61}">{{test}}</p>
        </keep-alive>
      </div>
      <van-button @click="login">登录</van-button>
      <p @click="readHandle">
        <img src="../../assets/image/gw/3.png" v-if="check==false"/>
        <img src="../../assets/image/gw/4.png" v-else/>
        <span>已阅读并同意《潜蛙服务协议》和《用户隐私保护政策》</span>
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
        <img @click="otherLogin(1)" src="../../assets/image/gw/6.png"/>
        <!--<img @click="otherLogin(3)" src="../../assets/image/gw/7.png"/>-->
      </div>
    </div>
  </div>
</template>
<script>
  import API from "../../api/index";
  import {publicFn} from "../../utils/util";
  import MobileDetect from 'mobile-detect'
  //  import {Wechat} from '@ionic-native/wechat/ngx';
  export default {
    data: function () {
      return {
        code: '',
        urlcode: null,
        token: "asfsaf",
        userId: "3",
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
      if (localStorage.getItem("userInfo")) {
        this.$router.push({path: '/index'});
      }
      else {
        this.init();
      }
    },
    mounted: function () {
      if (publicFn.getStore("backtime")) {
        clearTimeout(this.test_0);
        this.time = publicFn.getStore("backtime")
        this.returnTime();
      }
    },
    methods: {
      init: function () {
//        localStorage.clear();
        if (publicFn.getStore('loginNumber')) {
          this.number = publicFn.getStore('loginNumber');
        }
        if (publicFn.getStore('logincode')) {
          this.code = publicFn.getStore('logincode');
        }
        if (publicFn.getStore('loginread')) {
          this.check = publicFn.getStore('loginread');
        }
//        clearTimeout(this.test_0);
      },
      phoneExchange: function (val) {
        publicFn.setStore('loginNumber', val);
      },
      codeExchange: function (val) {
        publicFn.setStore('logincode', val);
      },
      readHandle: function () {
        this.check = !this.check;
        publicFn.setStore('loginread', this.check);
      },
      backHandle: function () {
        if (publicFn.getStore('diving')) {
          this.$router.go(-1);
          publicFn.removeStore('diving');
        }
        else {
          this.$router.go(-2);
        }
      },
      getAuthorizeInfoLogin: function (params) {
        var _this = this;
        API.request({
          url: API.getAuthorizeInfoLogin,
          method: "post",
          headers: {token: this.token, userId: this.userId},
          data: API.qs.stringify(params)
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              localStorage.setItem("userInfo", JSON.stringify(e.data.data));
              _this.$router.go(-1);
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
                localStorage.setItem("userInfo", JSON.stringify(e.data.data));
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
//      registerUser: function (phone, code) {
//        var _this = this;
//        API.request({
//          url: API.phoneRegister,
//          method: "post",
//          headers: {token: this.token, userId: this.userId},
//          data: API.qs.stringify({phone: phone, message: code, pas: "123456"})
//        }).then(function (e) {
//          if (e.data.code == 200) {
//            if (e.data.success) {
//              _this.getUserInfo(e.data.data.userId);
//            }
//            else {
//              API.dialog({message: JSON.stringify(e.data.msg)});
//            }
//          }
//          else {
//            API.dialog({message: JSON.stringify(e.data.msg)});
//          }
//
//        }).catch(function (e) {
//          API.dialog({message: JSON.stringify(e)});
//        })
//      },
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
        var _this = this, _number = this.number;
        if (_number.length < 11) {
          API.dialog({message: API.msg.ERROR_PHONE});
        }
        else {
          //只调用一次
          if (this.time == 61) {
            _this.returnTime();
            _this.getVerifyOfPhone(_number);
          }
        }
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
      repeatTime: function () {
        var _this = this;
        clearTimeout(_this.test_0);
        _this.time = 61;
        _this.test = "重新发送";

      },
      returnTime: function () {
        var _this = this;
        this.time--;
        this.test = "重新发送(" + this.time + ")";
        publicFn.setStore('backtime', this.time);
        this.test_0 = setTimeout(function () {
          clearTimeout(_this.test_0);
          if (_this.time > 0) {
            _this.returnTime();
          } else {
            _this.time = 61;
            _this.test = "重新发送";
          }
        }, 1000);
      },
      //第三方登录   微信:1，qq:2，新浪:3,
      otherLogin: function (id) {
        var _this = this, _openid = 12423, _regId = 1241234;
        var ua = navigator.userAgent;
        var md = new MobileDetect(ua);
        var os = md.os();//获取系统
        var model = "";
        if (os == "iOS") {//ios系统的处理
          os = md.os() + md.version("iPhone");
          model = md.mobile();
        } else if (os == "AndroidOS") {
          //Android系统的处理
          os = md.os() + md.version("Android");
        }
        _this.regId = os + '_' + model;
        //来检测微信客户端是否安装
        Wechat.isInstalled(function (installed) {
          if (!installed) {
            API.dialog({message: "微信客户端未安装"});
          }
        }, function (reason) {
          API.dialog({message: "Failed: " + JSON.stringify(reason)});
        });
        var scope = "snsapi_userinfo",
          state = "_" + (+new Date());
        Wechat.auth(scope, state, function (res) {
//            API.dialog({message: JSON.stringify(res)});
          var params = {
            registerType: 1,
            regId: _this.regId,
            phone: '',
            message: '',
            code: res.code
          }
          _this.getAuthorizeInfoLogin(params);
        }, function (e) {
          API.dialog({message: "Failed: " + JSON.stringify(e)});
        });
//        if (id == 1) {
//          //公众号 wx3e50b1a319a20084
//          window.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8e053134467c4fd2&redirect_uri=http://wx.me2group.com/qianwa/&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect')
//        }
//        else {
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
