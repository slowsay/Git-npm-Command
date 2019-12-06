<template>
  <div class="paySuccess">
    <div class="contain">
      <img src="../../assets/image/zxw/success.png" alt />
      <p class="success">支付成功</p>
      <p class="jifen">恭喜您获得平台赠送的100积分奖励</p>
      <p class="goto">
        {{a}}秒后返回商城首页，
        <span style="color:#0C76D8" @click="goback">立即返回>></span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.getdata();
  },
  data() {
    return {
      a: 5
    };
  },

  methods: {
    getdata() {
      var b = setInterval(() => {
        if (this.a == 0) {
          this.$router.push("shop");
          clearInterval(b);
        } else {
          this.a = this.a - 1;
        }
        console.log(this.a);
      }, 1000);
    },
    goback(){
      this.a=0;
       this.$router.push("shop");
    }
  }
};
</script>
<style lang="less" scoped>
.paySuccess {
  margin: 0 auto;
}

.contain {
  margin: 96px auto;
  width: 1280px;
  height: 589px;
  border: 4px solid rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  box-sizing: border-box;
  text-align: center;
  img {
    height: 100px;
    width: 100px;
    margin: 80px auto 20px;
  }
  .success {
    font-size: 40px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 148, 148, 1);
    line-height: 56px;
    text-align: center;
  }
  .jifen {
    font-size: 24px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    line-height: 33px;
    text-align: center;
    margin-top: 20px;
  }
  .goto {
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(74, 74, 74, 1);
    line-height: 33px;
    text-align: center;
    margin-top: 20px;
  }
}
</style>