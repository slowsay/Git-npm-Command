<template>
  <div id="Feedback">
    <div class="top">
      <van-icon name="arrow-left" @click="$router.go(-1)"/>
      <p>用户反馈</p>
    </div>
    <div class="input">
      <p>请描述您遇到的问题：</p>
      <van-field
        v-model="feedbackContent"
        type="textarea"
        maxlength="200"
        @blur="blurHandle"
        placeholder="和我们分享您的体验，有哪些方面比较顺利？有哪些方面需要改进。"
      />
      <p>留下您的邮箱，我们会将反馈的进度同步给您</p>
      <van-field v-model="email" placeholder="请填写您的E-mail" @blur="blurHandle"/>
      <p>{{feedbackContent.length+'/200'}}</p>
    </div>
    <van-button @click="addFeedBack" :disabled="handflag">提交</van-button>
  </div>
</template>
<script>
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    data: function () {
      return {
        handflag: !0,
        feedbackContent: "",
        email: ""
      };
    },
    //初始化数据
    created: function () {
      if (localStorage.getItem("userInfo")) {
        this.userinfo = JSON.parse(localStorage.getItem("userInfo"));
      }
      else {
        this.$router.push({path: '/Login'});
      }
    },
    methods: {
      blurHandle: function () {
        if (this.feedbackContent.length > 0 || this.email.length > 0) {
          this.handflag = !1;
        }
        else {
          this.handflag = !0;
        }
      },
      addFeedBack: function () {
        var _this = this, _feedbackContent = this.feedbackContent, _email = this.email;
        if (_feedbackContent.length < 1) {
          API.dialog({message: API.msg.ERROR_FEEDBACK});
        }
        else if (_email.length < 1) {
          API.dialog({message: API.msg.ERROR_EMAIL});
        }
        else if (!publicFn.isEmail(_email)) {
          API.dialog({message: API.msg.ERROR_EMAILERROR});
        }
        else {
          //调用-浏览历史列表接口
          API.request({
            method: "post",
            url: API.addFeedback,
            headers: {
              token: this.userinfo.token,
              userId: this.userinfo.id
            },
            data: API.qs.stringify({
              feedbackContent: _feedbackContent,
              email: _email
            })
          }).then(function (e) {
            if (e.data.code == 200) {
              if (e.data.success) {
                //todo
                API.dialog({message: API.msg.SUCCESS_FEEDBACK});
                _this.feedbackContent = "", _this.email = "";
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
    }
  };
</script>
<style lang="less" scoped>
  #Feedback {
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
    .input {
      position: relative;
      overflow: hidden;
      padding: 0 0.3rem;
      p {
        font-size: 0.28rem;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        line-height: 0.4rem;
        margin: 0.3rem 0 0.2rem;
      }
      /deep/ .van-field:nth-child(2) {
        width: 6.9rem;
        height: 2.57rem;
        border-radius: 0.1rem;
        border: 0.01rem solid rgba(230, 230, 230, 1);
        padding: 0.1rem 0.2rem 0;
        .van-field__body {
          height: 100%;
        }
        .van-field__control {
          height: 100%;
        }
      }
      /deep/ .van-field:nth-child(4) {
        width: 6.9rem;
        height: 0.6rem;
        border-radius: 0.1rem;
        border: 0.01rem solid rgba(230, 230, 230, 1);
        padding: 0 0.2rem 0;
        .van-field__body {
          height: 100%;
        }
      }
      ::-webkit-input-placeholder {
        /* WebKit browsers */
        font-size: 0.24rem;
        font-weight: 400;
        line-height: 0.33rem;
        color: rgba(204, 204, 204, 1);
      }
      p:last-child {
        font-size: .24rem;
        font-weight: 400;
        color: rgba(204, 204, 204, 1);
        line-height: .33rem;
        margin: 0;
        position: absolute;
        top: 2.94rem;
        right: .47rem
      }
    }
    .van-button {
      display: block;
      margin: 0.6rem auto;
      width: 6.93rem;
      height: 0.9rem;
      background: rgba(82, 189, 242, 1);
      border-radius: 0.1rem;
      border: none;
      font-size: 0.32rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 0.45rem;
    }
  }
</style>
