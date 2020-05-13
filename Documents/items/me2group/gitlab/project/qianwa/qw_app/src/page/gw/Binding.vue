<template>
  <div id="Binding">
    <div class="top">
      <van-icon name="arrow-left" @click="$router.go(-1)"/>
      <p>绑定手机号</p>
    </div>
    <img :src="src"/>

    <p>{{name}}</p>

    <div>
      <van-field v-model="number" placeholder="请输入手机号" maxlength="12" :border="false"/>
    </div>
    <div>
      <van-field v-model="code" placeholder="请输入验证码" maxlength="6" :border="false"/>
      <p @click="verification" :class="{active:time!=61}">{{test}}</p>
    </div>
    <van-button @click="onHandle">提交</van-button>
  </div>
</template>
<script>
  import API from "../../api/index";
  import {publicFn} from "../../utils/util";
  export default {
    data: function () {
      return {
        src: require("../../assets/image/gw/goutou.jpg"),
        name: "不会飞的发福蝶",
        number: "",
        code: "",
        //验证码计时
        test: "获取验证码",
        test_0: "",
        time: 61
      };
    },
    //初始化数据
    created: function () {
      if (localStorage.getItem("userInfo")) {
        this.userinfo = JSON.parse(localStorage.getItem("userInfo"));
        this.init();
      }
      else {
        this.$router.push({path: '/Login'});
      }

    },
    methods: {
      init: function () {
        this.name = this.userinfo.userName;
        this.number = this.userinfo.phone;
      },
      //更改手机号
      onHandle: function () {
        var _this = this, _phone = this.number,_code=this.code;
        if (_phone.length < 11) {
          API.dialog({message: API.msg.ERROR_PHONE});
        }
        else if (!publicFn.isPoneAvailable(_phone)) {
          API.dialog({message: API.msg.ERROR_PHONECHECK});
        }
        else if (_code.length < 6 || _code.length > 6) {
          API.dialog({message: API.msg.ERROR_VERIFYCODE});
        }
        else {
          API.request({
            url: API.updatePhone,
            method: 'post',
            headers: {
              token: this.userinfo.token,
              userId: this.userinfo.id
            },
            data: API.qs.stringify({
              phone: _phone,
              message:_code
            })
          }).then(function (e) {
            if (e.data.code == 200) {
              if (e.data.success) {
                _this.getUserInfo(_this.userinfo.id);
              }
              else {
                API.dialog({message: e.data.msg});
              }
            }
            else {
              API.dialog({message: e.data.msg});
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
              _this.$router.push('/Personal');
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
          headers: {token: "1243", userId: 123424},
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
        this.test_0 = setTimeout(function () {
          clearTimeout(_this.test_0);
          if (_this.time > 0) {
            _this.returnTime();
          } else {
            _this.time = 61;
            _this.test = "重新发送";
          }
        }, 1000);
      }
    }
  };
</script>
<style lang="less" scoped>
  #Binding {
    .top {
      height: 1.2rem;
      line-height: 1.2rem;
      .van-icon {
        float: left;
        margin-left: 0.3rem;
        font-size: 0.45rem;
        line-height: 1.2rem;
      }
      p {
        width: fit-content;
        margin: auto;
        font-size: 0.32rem;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
    }
    > img {
      display: block;
      margin: 0.3rem auto;
      width: 1.6rem;
      height: 1.6rem;
      border-radius: 50%;
    }
    > p {
      text-align: center;
      font-size: 0.32rem;
      font-weight: 500;
      color: rgba(74, 74, 74, 1);
      line-height: 0.45rem;
    }
    // 输入框统一样式
    .van-field {
      background: transparent;
      padding: 0;
      /deep/ input {
        font-size: 0.28rem;
        font-weight: 400;
        line-height: 0.4rem;
      }
    }
    > div:nth-child(4) {
      display: flex;
      align-items: center;
      width: 6rem;
      height: 0.8rem;
      background: rgba(245, 245, 245, 1);
      border-radius: 0.4rem;
      margin: 0.6rem auto 0;
      padding-left: 0.3rem;
      box-sizing: border-box;
    }
    > div:nth-child(5) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 6rem;
      height: 0.8rem;
      background: rgba(245, 245, 245, 1);
      border-radius: 0.4rem;
      padding: 0 0.4rem 0 0.3rem;
      box-sizing: border-box;
      margin: 0.3rem auto 0.6rem;
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
      display: block;
      margin: auto;
      width: 6rem;
      height: 0.8rem;
      background: linear-gradient(180deg, rgba(138, 224, 250, 1) 0%, rgba(82, 189, 242, 1) 100%);
      border-radius: 0.4rem;
      border: none;
      font-size: 0.32rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 0.45rem;
    }
  }
</style>
