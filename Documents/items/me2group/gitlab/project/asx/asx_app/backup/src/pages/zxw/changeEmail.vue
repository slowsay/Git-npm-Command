<template>
  <div class="changePhone1">
    <navbar></navbar>
    <div class="contain">
      <p>修改/添加邮箱</p>
      <p>输入验证码进行修改/添加邮箱</p>
      <p>邮箱号</p>
      <van-field v-model="form.email" placeholder="请输入要绑定的邮箱" :border="false" />
      <p class="code">验证码</p>
      <van-cell-group>
        <van-field v-model="form.sms" center clearable placeholder="请输入短信验证码" :border="false">
          <van-button @click="send" v-if="state==1" slot="button" size="small" type="primary">发送验证码</van-button>
          <van-button v-if="state==2" slot="button" size="small" type="primary">
            <van-count-down :time="time" @finish="finish">
              <template v-slot="timeData">
                <span class="item">{{ timeData.seconds }}</span>
              </template>
            </van-count-down>
          </van-button>
          <van-button
            @click="sendAgain"
            v-if="state==3"
            slot="button"
            size="small"
            type="primary"
          >重新发送</van-button>
        </van-field>
      </van-cell-group>
    </div>
    <button class="btn" @click="confirm">确认绑定</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: 60 * 1000,
      state: 1,
      sms: "1111",
      form: {
        email: "",
        sms: ""
      }
    };
  },
  methods: {
    send() {
      this.state = 2;
    },
    //倒计时结束时
    finish() {
      this.state = 3;
    },
    //点击重新获取验证码
    sendAgain() {
      this.state = 2;
    },
    //点击确认绑定时
    confirm() {
      var regBox = {
        regEmail: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ //....邮箱验证
      };
      if (this.form.email == "") {
        this.$toast("邮箱地址不能为空");
      } else if (regBox.regEmail.test(this.form.email) == false) {
        this.$toast("请输入有效的邮箱");
      } else if (regBox.regEmail.test(this.form.email) == true) {
        if (this.form.sms == this.sms) {
          this.$router.push("/myInfo");
          this.$toast("邮箱号绑定成功");
        } else {
          this.$toast("请输入正确的验证码");
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.changePhone1 {
  width: 7.5rem;
  .contain {
    width: 7.5rem;
    padding: 0 0.6rem;
    box-sizing: border-box;
    > p:nth-child(1) {
      font-size: 0.48rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 0.53rem;
      margin-top: 0.4rem;
    }
    > p:nth-child(2) {
      font-size: 0.26rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(179, 179, 179, 1);
      line-height: 0.52rem;

      margin-top: 0.24rem;
    }
    > p:nth-child(3) {
      font-size: 0.22rem;
      font-family: PingFang SC;
      font-weight: 300;
      color: rgba(153, 153, 153, 1);
      line-height: 0.52rem;

      margin-top: 1.3rem;
    }
    .code {
      font-size: 0.22rem;
      font-family: PingFang SC;
      font-weight: 300;
      color: rgba(153, 153, 153, 1);
      line-height: 0.52rem;
      margin-top: 0.2rem;
    }
    .van-cell {
      padding: 0.2rem 0;
      border-bottom: 0.01rem solid #cccccc;
    }
    /deep/.van-field__label {
      width: 1rem;
    }
    /deep/.van-button--primary {
      background-color: #fff;
      border: 1px solid #fff;
      color: #e01523;
    }
  }
  .btn {
    width: 6.9rem;
    height: 0.8rem;
    background: rgba(224, 21, 35, 1);
    border-radius: 0.4rem;
    font-size: 0.28rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    border: none;
    position: absolute;
    bottom: 1.7rem;
    margin-left: 0.3rem;
  }
  .item {
    display: inline-block;
    width: 22px;
    margin-right: 5px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background-color: #e01523;
    border-radius: 50%;
  }
}
</style>