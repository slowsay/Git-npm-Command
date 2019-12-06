<template>
  <div>
    <div class="top">
      <div>
        <van-icon name="arrow-left"></van-icon>
      </div>
      <p>支付成功</p>
      <div></div>
    </div>
    <img class="img" src="../../assets/image/gw/51.png" />
    <div class="bottom">
      <van-button>查看订单详情</van-button>
      <van-button>返回首页</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.top {
  height: 0.88rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.01rem solid #f0f0f0;
  .van-icon {
    font-size: 0.32rem;
    color: black;
    margin-left: 0.3rem;
  }
  p {
    font-size: 0.32rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  div {
    width: 1rem;
  }
}
.img {
  display: block;
  margin: 3.4rem auto;
  width: 3.88rem;
}
.bottom {
  position: fixed;
  bottom: 0.3rem;
  width: 100%;
  font-size: 0;
  .van-button {
    width: 3.3rem;
    height: 0.8rem;
    background: rgba(224, 21, 35, 1);
    border-radius: 0.38rem;
    border: none;
    font-size: 0.28rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 0.8rem;
    margin-left: 0.3rem;
  }
}
</style>