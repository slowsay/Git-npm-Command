<template>
  <div class="paySuccess">
    <div class="top">
      <navbar></navbar>
    </div>
    <div class="contain">
      <img src="../../assets/img/zxw/thanks.png" alt />
      <router-link to="index">
        <button class="btn" style="margin:0 72px 0 284px">跳转到首页</button>
      </router-link>
      <button class="btn">查看订单详情</button>
    </div>
    <rightNav></rightNav>
  </div>
</template>
<script>
import navbar from "../../components/nav";
export default {
  data() {
    return {};
  },
  components: {
    navbar
  }
};
</script>
<style lang="scss" scoped>$size: 0.8;
.paySuccess {
  margin: 0 auto;
}
.top {
  width: 1280px*$size;
  margin: 40px*$size auto;
}
.contain {
  margin: 96px*$size auto;
  width: 1280px*$size;
  height: 589px*$size;
  border: 4px*$size solid rgba(0, 0, 0, 0.08);
  border-radius: 10px*$size;
  box-sizing: border-box;
  img {
    height: 259px*$size;
    width: 406px*$size;
    margin: 80px*$size 437px*$size;
  }
  .btn {
    width: 260px*$size;
    height: 70px*$size;
    background: rgba(224, 18, 32, 1);
    border-radius: 4px*$size;
    font-size: 24px*$size;
    font-family: DFYuanW5-GB;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    border: none;
  }
}
</style>