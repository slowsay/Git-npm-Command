<template>
  <div class="background">
    <div class="title">
      <div></div>
      <p>{{title}}</p>
    </div>
    <div class="card" v-for="(value,key) in data" :key="key">
      <p>{{value.title}}</p>
      <video controls="controls">
        <source src="movie.mp4" type="video/mp4" />
        <!-- <source src="movie.ogg" type="video/ogg" />
        <source src="movie.webm" type="video/webm" />
        <object data="movie.mp4" width="320" height="240">
          <embed src="movie.swf" width="320" height="240" />
        </object>-->
      </video>
      <img :src="value.src" />
    </div>
    <div class="bottom">
      <div @click="returntop">
        <img src="../../assets/image/gw/36.png" />
        <p>返回顶部</p>
      </div>
      <div>相关套餐</div>
      <div @click="$router.push('/ShopCar')">立即购买</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "明星全能锅",
      data: [
        {
          title: "全能健康锅功能介绍",
          src: require("../../assets/image/gw/15.png")
        },
           {
          title: "全能健康锅功能介绍",
          src: require("../../assets/image/gw/15.png")
        }
      ]
    };
  },
  methods: {
    returntop() {
    document.getElementsByClassName('background')[0].scrollTop=0
    }
  }
};
</script>

<style lang="less" scoped>
.background {
  position: absolute;
  top: 0.88rem;
  bottom: 1rem;
  width: 100%;
  background: #fafafa;
  padding: 0 0.2rem;
  box-sizing: border-box;
  overflow: auto;
}
.title {
  display: flex;
  height: 0.9rem;
  align-items: center;
  > div {
    margin: 0 0.1rem;
    width: 0.08rem;
    height: 0.3rem;
    background: rgba(224, 18, 32, 1);
    border-radius: 0.04rem;
  }
  p {
    font-size: 0.3rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
  }
}
.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  display: flex;
  div:nth-child(1) {
    width: 2.3rem;
    height: 100%;
    text-align: center;
    background: rgb(255, 255, 255);
    img {
      width: 0.36rem;
      margin: 0.15rem 0 0.05rem;
    }
    p {
      font-size: 0.18rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 0.18rem;
    }
  }
  div:nth-child(2) {
    width: 2.7rem;
    height: 100%;
    background: rgba(29, 29, 29, 1);
    font-size: 0.28rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 1rem;
    text-align: center;
  }
  div:nth-child(3) {
    width: 2.7rem;
    height: 100%;
    background: rgba(224, 18, 32, 1);
    font-size: 0.28rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 1rem;
    text-align: center;
  }
}
.card {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0.02rem 0.1rem 0rem rgba(0, 0, 0, 0.1);
  border-radius: 0.2rem;
  padding: 0.3rem 0.2rem;
  margin-bottom:.2rem ;
  p {
    font-size: 0.28rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 0.28rem;
    margin-bottom: 0.1rem;
  }
  video {
    width: 100%;
    height: 4.2rem;
    margin-bottom: 0.1rem;
  }
  img {
    width: 100%;
  }
}
</style>