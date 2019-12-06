<template>
  <div class="changePhone">
    <navbar></navbar>
    <div class="contain">
      <p class="title">验证码已发送至手机：</p>
      <p class="phone">+{{form.number}}-{{form.phone}}</p>
      <p class="code">请输入验证码</p>
      <van-password-input
        :value="value"
        :length="4"
        :gutter="15"
        :mask="false"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
      <!-- //弹出键盘 -->
      <van-number-keyboard
        :show="showKeyboard"
        theme="custom"
        extra-key="."
        close-button-text="完成"
        @blur="showKeyboard = false"
        @input="onInput"
        @delete="onDelete"
      />
    </div>
    <button class="btn" @click="next">下一步</button>
    <!-- 当输入的验证码不正确时弹框 -->
    <div class="pop">
      <van-popup v-model="show">
        <p class="codeTitle">
          验证码不正确，
          <br />请输入正确的验证码
        </p>
        <p class="know" @click="show=false">我知道了</p>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showKeyboard: false,
      show: false,
      value: "",
      form: {
        number: "86",
        phone: "18868793260",
        code: "1111"
      }
    };
  },
  methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 4);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    next() {
      if (this.value != this.form.code) {
        this.show = true;
        console.log('这里设置的测试验证码1111')
      }else{
        this.$router.push('changePhone1')
      }
    }
  }
};
</script>

<style lang="less" scoped>
.changePhone {
  .contain {
    width: 7.5rem;
    .title {
      margin-left: 0.6rem;
      font-size: 0.48rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 0.53rem;
      margin-top: 0.4rem;
    }
    .phone {
      font-size: 0.42rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: #e01523;
      line-height: 0.52rem;
      margin-left: 0.6rem;
    }
    .code {
      font-size: 0.22rem;
      font-family: PingFang SC;
      font-weight: 300;
      color: rgba(153, 153, 153, 1);
      line-height: 0.52rem;
      margin-top: 1.2rem;
      margin-left: 0.6rem;
    }
    /deep/.van-password-input__security li {
      border-bottom: 0.01rem solid rgba(0, 0, 0, 0.1);
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
  .pop {
    .van-popup {
      width: 4.7rem;
      height: 2.59rem;
      background: rgba(255, 255, 255, 1);
      border-radius: 0.1rem;
      .codeTitle {
        font-size: 0.3rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 0.48rem;
        text-align: center;
        margin-top: 0.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 0.01rem solid #e6e6e6;
      }
      .know {
        font-size: 0.26rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(224, 21, 35, 1);
        line-height: .64rem;
        text-align:center;
      }
    }
  }
}
</style>