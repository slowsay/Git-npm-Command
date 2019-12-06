<template>
  <div>
    <div class="top">
      <div>
        <van-icon name="arrow-left"></van-icon>
      </div>
      <p>商品详情</p>
      <div></div>
    </div>
    <div style="height:.88rem"></div>
    <van-swipe :autoplay="3000" :show-indicators="false" @change="onChange">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" />
      </van-swipe-item>
      <div class="custom-indicator" slot="indicator">{{ current + 1 }}/4</div>
    </van-swipe>
    <div class="head">
      <p>
        <span>¥</span>
        <span>{{money_0}}</span>
        <span>{{'原件:¥'+money_1}}</span>
      </p>
      <p>{{title}}</p>
      <p>{{'累计评价:'+assess}}</p>
      <p>{{'成交数量:'+number}}</p>
    </div>
    <div class="address">
      <div>
        <p>发货</p>
        <img src="../../assets/image/gw/47.png" />
        <p>{{address}}</p>
        <p>{{'快递:'+express}}</p>
      </div>
      <div>
        <p>优惠</p>
        <p>优惠卷</p>
        <div v-for="(value,key) in coupon" :key="key">
          <img src="../../assets/image/gw/48.png" />
          <p>{{value}}</p>
        </div>
        <p @click="show=true">领券</p>
        <img src="../../assets/image/gw/46.png" />
      </div>
    </div>
    <div class="select">
      <div>
        <p>选择</p>
        <p>{{'已选'+select}}</p>
      </div>
      <div>
        <p>参数</p>
        <p>型号 材质...</p>
        <img src="../../assets/image/gw/46.png" />
      </div>
    </div>
    <div class="comment">
      <div>
        <p>{{'用户理论('+number_0+')'}}</p>
        <p>{{'好评率'+probability}}</p>
        <img src="../../assets/image/gw/44.png" />
      </div>
      <div>
        <img :src="img" />
        <p>{{name}}</p>
        <p>{{time}}</p>
      </div>
      <p>{{evaluate}}</p>
    </div>
    <div class="title">
      <div></div>
      <p>商品详情</p>
      <div></div>
    </div>
    <div class="image">
      <img :src="image" />
    </div>
    <div class="title">
      <div></div>
      <p>新品上市</p>
      <div></div>
    </div>
    <!-- swiper -->
    <swiper :options="swiperOption">
      <swiper-slide v-for="(value,key) in suit" :key="key" class="suite">
        <img :src="value.src" />
        <p>
          <span>{{'￥'+value.amount}}</span>
          <span>{{'￥'+value.amount_0}}</span>
        </p>
        <p>{{value.title}}</p>
        <div>
          <p>{{'销量:'+value.sala}}</p>
          <p>{{'收藏:'+value.collect}}</p>
        </div>
      </swiper-slide>
    </swiper>
    <div class="bottom">
      <div>
        <img src="../../assets/image/gw/49.png" />
        <p>收藏</p>
      </div>
      <van-button>加入购物车</van-button>
      <van-button>立即购买</van-button>
    </div>
    <van-popup v-model="show" position="bottom">
      <div class="popup">
        <div>
          <div>
            <img src="../../assets/image/gw/4.png" @click="show=false" />
          </div>
          <p>领取红包</p>
          <div></div>
        </div>
        <div>
          <div v-for="(value,key) in coupon_0" :key="key">
            <img src="../../assets/image/gw/50.png" />
            <p>{{value.name}}</p>
            <p>{{'有效期:'+value.time}}</p>
            <p>{{value.title}}</p>
            <p>立即领取</p>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图
      images: [
        require("../../assets/image/gw/15.png"),
        require("../../assets/image/gw/15.png"),
        require("../../assets/image/gw/15.png")
      ],
      current: null,
      money_0: "1888",
      money_1: "1888",
      title: "砂锅耐高温瓦罐汤煲陶瓷小沙锅煲汤锅炖锅明火家用燃气煲仔饭汤锅",
      assess: "5234",
      number: "5234",
      address: "浙江杭州",
      express: "免运费",
      coupon: ["满999减300", "满999减300"],
      select: "零秒活力锅 5.5l 无组合",
      number_0: "5423",
      probability: "98%",
      img: require("../../assets/image/gw/15.png"),
      name: "用户昵称",
      time: "2018.10.10",
      evaluate:
        "这里是客户输入的评价，很好非常好很nice。棒棒哒！这里是客户输入的评价，很好非常好很nice。棒棒哒！这里是客户输入的评价，很好非常好很nice。棒棒哒！",
      image: require("../../assets/image/gw/15.png"),
      //swiper
      swiperOption: {
        freeMode: true,
        slidesPerView: "auto",
        spaceBetween: 0
      },

      suit: [
        {
          src: require("../../assets/image/gw/22.png"),
          amount: "1888.88",
          amount_0: "2888.88",
          title: "不锈钢蒸锅三层多3层蒸馒头的",
          sala: "271",
          collect: "211"
        },
        {
          src: require("../../assets/image/gw/22.png"),
          amount: "1888.88",
          amount_0: "2888.88",
          title: "不锈钢蒸锅三层多3层蒸馒头的",
          sala: "271",
          collect: "211"
        },
        {
          src: require("../../assets/image/gw/22.png"),
          amount: "1888.88",
          amount_0: "2888.88",
          title: "不锈钢蒸锅三层多3层蒸馒头的大苏打是撒啊的",
          sala: "271",
          collect: "211"
        },
        {
          src: require("../../assets/image/gw/22.png"),
          amount: "1888.88",
          amount_0: "2888.88",
          title: "不锈钢蒸锅三层多3层蒸馒头的",
          sala: "271",
          collect: "211"
        },
        {
          src: require("../../assets/image/gw/22.png"),
          amount: "1888.88",
          amount_0: "2888.88",
          title: "不锈钢蒸锅三层多3层蒸馒头的",
          sala: "271",
          collect: "211"
        }
      ],
      //弹窗
      show: false,
      coupon_0: [
        {
          name: "满999减300",
          time: "有效期：2019.08.09 - 2019.11.09",
          title: "仅限本产品"
        },
        {
          name: "满999减300",
          time: "有效期：2019.08.09 - 2019.11.09",
          title: "仅限本产品"
        },
        {
          name: "满999减300",
          time: "有效期：2019.08.09 - 2019.11.09",
          title: "仅限本产品"
        },
        {
          name: "满999减300",
          time: "有效期：2019.08.09 - 2019.11.09",
          title: "仅限本产品"
        },
        {
          name: "满999减300",
          time: "有效期：2019.08.09 - 2019.11.09",
          title: "仅限本产品"
        }
      ]
    };
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    click(index) {
      this.active.splice(index, 1, !this.active[index]);
      if (this.active[index] == true) {
        document.getElementsByClassName("drop-down")[index].style.height =
          this.Label[index].label.length * 0.54 + "rem";
      } else {
        document.getElementsByClassName("drop-down")[index].style.height = 0;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.top {
  height: 0.88rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background: #fff;
  z-index: 99;
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
/deep/.van-swipe {
  img {
    width: 100%;
    height: 8rem;
  }
  .custom-indicator {
    width: 0.7rem;
    height: 0.34rem;
    background: rgba(0, 0, 0, 0.26);
    border-radius: 0.17rem;
    position: absolute;
    bottom: 0.2rem;
    right: 0.2rem;
    font-size: 0.2rem;
    font-weight: 300;
    color: rgba(255, 255, 255, 1);
    line-height: 0.34rem;
    text-align: center;
  }
}
.head {
  height: 2.7rem;
  padding: 0.3rem;
  box-sizing: border-box;
  border-bottom: 0.1rem solid #f0f0f0;
  position: relative;
  p:nth-child(1) {
    font-size: 0;
    span:nth-child(1) {
      font-size: 0.26rem;
      font-weight: 500;
      color: rgba(255, 45, 38, 1);
    }
    span:nth-child(2) {
      font-size: 0.46rem;
      font-weight: bold;
      color: rgba(255, 45, 38, 1);
    }
    span:nth-child(3) {
      font-size: 0.26rem;
      font-weight: 400;
      text-decoration: line-through;
      color: rgba(102, 102, 102, 1);
      margin-left: 0.3rem;
    }
  }
  p:nth-child(2) {
    font-size: 0.28rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 0.42rem;
  }
  p:nth-child(3),
  p:nth-child(4) {
    font-size: 0.24rem;
    font-weight: 300;
    color: rgba(153, 153, 153, 1);
    position: absolute;
    bottom: 0.3rem;
    left: 1.2rem;
  }
  p:nth-child(4) {
    left: 4.65rem;
  }
}
.address {
  > div {
    display: flex;
    height: 0.75rem;
    align-items: center;
    padding: 0 0.3rem;
    > p:nth-child(1) {
      font-size: 0.26rem;
      font-weight: 300;
      color: rgba(153, 153, 153, 1);
      margin-right: 0.3rem;
    }
  }
  > div:nth-child(1) {
    img {
      width: 0.2rem;
    }
    > p:nth-of-type(2) {
      width: 1.2rem;
      border-right: 0.01rem solid #f0f0f0;
      margin: 0 0.2rem 0 0.1rem;
    }
    p:nth-of-type(2),
    p:nth-of-type(3) {
      font-size: 0.26rem;
      font-weight: 300;
      color: rgba(51, 51, 51, 1);
    }
  }
  > div:nth-child(2) {
    > p:nth-child(2) {
      width: 0.7rem;
      height: 0.3rem;
      background: #fff1e5;
      border-radius: 0.15rem;
      font-size: 0.16rem;
      font-weight: 300;
      color: #f27201;
      line-height: 0.3rem;
      text-align: center;
    }
    div {
      width: 1.4rem;
      height: 0.36rem;
      position: relative;
      margin-left: 0.05rem;
      img {
        position: absolute;
        width: 1.4rem;
        height: 0.36rem;
        top: 0;
        left: 0;
      }
      p {
        position: relative;
        font-size: 0.18rem;
        font-weight: 300;
        color: rgba(255, 45, 38, 1);
        line-height: 0.36rem;
        text-align: center;
      }
    }
    > p:nth-of-type(3) {
      font-size: 0.26rem;
      font-weight: 300;
      color: rgba(153, 153, 153, 1);
      margin-left: auto;
    }
    > img {
      width: 0.12rem;
      margin-left: 0.24rem;
    }
  }
}
.select {
  border-top: 0.1rem solid #f0f0f0;
  border-bottom: 0.1rem solid #f0f0f0;
  > div {
    display: flex;
    height: 0.75rem;
    align-items: center;
    padding: 0 0.3rem;
    > p:nth-child(1) {
      font-size: 0.26rem;
      font-weight: 300;
      color: rgba(153, 153, 153, 1);
      margin-right: 0.3rem;
    }
    > p:nth-child(2) {
      font-size: 0.26rem;
      font-weight: 300;
      color: rgba(51, 51, 51, 1);
    }
    img {
      width: 0.12rem;
      margin-left: auto;
    }
  }
}
.comment {
  padding-bottom: 0.2rem;
  > div:nth-child(1) {
    display: flex;
    height: 0.75rem;
    align-items: center;
    padding: 0 0.3rem;
    p:nth-child(1) {
      font-size: 0.3rem;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    p:nth-child(2) {
      font-size: 0.26rem;
      font-weight: 300;
      color: rgba(224, 18, 32, 1);
      margin: 0 0.23rem 0 auto;
    }
    img {
      width: 0.12rem;
    }
  }
  > div:nth-child(2) {
    display: flex;
    height: 0.6rem;
    align-items: center;
    padding: 0 0.3rem;
    img {
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 50%;
      margin-right: 0.2rem;
    }
    p:nth-of-type(1) {
      font-size: 0.28rem;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    p:nth-of-type(2) {
      font-size: 0.24rem;
      font-weight: 400;
      color: rgba(204, 204, 204, 1);
      margin-left: auto;
    }
  }
  > p {
    margin: 0 0.3rem;
    font-size: 0.22rem;
    font-weight: 300;
    color: rgba(77, 77, 77, 1);
    line-height: 0.3rem;
  }
}
.title {
  height: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  div:nth-child(1),
  div:nth-child(3) {
    width: 0.8rem;
    border-bottom: 0.01rem solid #b3b3b3;
  }
  p {
    font-size: 0.26rem;
    font-weight: 300;
    color: #b3b3b3;
    margin: 0 0.2rem;
  }
}
.image {
  img {
    width: 100%;
  }
}
.suite {
  flex-shrink: 0;
  width: 3.96rem;
  height: 5.36rem;
  background: rgba(255, 255, 255, 1);
  border: 0.02rem solid rgba(0, 0, 0, 0.08);
  border-radius: 0.06rem;
  margin-bottom: 0.2rem;
  overflow: hidden;
  margin-left: 0.2rem;
  &:last-of-type {
    margin-right: 0.4rem;
  }
  img {
    width: 100%;
    height: 3.96rem;
  }
  > p:nth-of-type(1) {
    padding-left: 0.2rem;
    line-height: 0.28rem;
    margin: 0.1rem 0;
    span:nth-child(1) {
      font-size: 0.28rem;
      font-weight: 400;
      color: rgba(224, 18, 32, 1);
    }
    span:nth-child(2) {
      font-size: 0.2rem;
      font-weight: 400;
      text-decoration: line-through;
      color: rgba(102, 102, 102, 1);
    }
  }
  > p:nth-of-type(2) {
    padding: 0 0.2rem;
    font-size: 0.2rem;
    font-weight: 400;
    line-height: 0.2rem;
    color: rgba(51, 51, 51, 1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  > div {
    display: flex;
    padding-top: 0.2rem;
    p {
      padding-left: 0.2rem;
      font-size: 0.2rem;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 0.2rem;
      width: 1rem;
    }
    p:nth-child(2) {
      margin-left: auto;
    }
  }
}

.contact {
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    background: url("../../assets/image/gw/5.png");
    background-size: 100%;
    background-repeat: no-repeat;
    width: 3.3rem;
    height: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 0.3rem;
      margin-right: 0.3rem;
    }
    p {
      font-size: 0.3rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}
.address_0 {
  background: #fff;
  height: 3rem;
  overflow: hidden;
  margin: 0 -0.3rem;
  img {
    width: 2.1rem;
    display: block;
    margin: 0.6rem auto;
  }
  p {
    font-size: 0;
    text-align: center;
    span {
      font-size: 0.24rem;
      font-weight: 400;
      color: rgba(179, 179, 179, 1);
      line-height: 0.24rem;
    }
  }
}
.bottom {
  width: 7.5rem;
  height: 1rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem -0.01rem 0rem 0rem rgba(240, 240, 240, 1);
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 99;
  display: flex;
  align-items: center;
  > div {
    margin: 0 0.7rem;
    img {
      width: 0.42rem;
    }
    p {
      font-size: 0.2rem;
      font-weight: 300;
      color: rgba(77, 77, 77, 1);
    }
  }
  .van-button {
    width: 2.7rem;
    height: 0.8rem;
    border: none;
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 0.8rem;
  }
  .van-button:nth-of-type(1) {
    background: linear-gradient(
      90deg,
      rgba(77, 77, 77, 1),
      rgba(51, 51, 51, 1)
    );
    border-radius: 0.4rem 0rem 0rem 0.4rem;
  }
  .van-button:nth-of-type(2) {
    background: linear-gradient(
      90deg,
      rgba(218, 50, 62, 1),
      rgba(224, 18, 32, 1)
    );
    border-radius: 0rem 0.4rem 0.4rem 0rem;
  }
}
.van-popup {
  border-radius: 0.3rem 0.3rem 0rem 0rem;
}
.popup {
  margin: 0 0.3rem;
  > div:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.3rem 0rem 0.4rem;
    div {
      width: 0.28rem;
      img {
        width: 0.28rem;
      }
    }
  }
  > div:nth-child(2) {
    max-height: 5.4rem;
    overflow: auto;
  }
  > div:nth-child(2) > div {
    overflow: hidden;
    position: relative;
    padding-left: 0.37rem;
    margin-bottom: 0.2rem;
    width: 6.9rem;
    height: 1.6rem;
    box-sizing: border-box;
    img {
      position: absolute;
      width: 6.9rem;
      height: 1.6rem;
      top: 0;
      left: 0;
    }
    p:nth-of-type(1) {
      font-size: 0.36rem;
      font-weight: 400;
      color: rgba(255, 45, 38, 1);
      line-height: 0.34rem;
      margin: 0.36rem 0 0.2rem;
    }
    p:nth-of-type(2),
    p:nth-of-type(3) {
      font-size: 0.18rem;
      font-weight: 300;
      color: rgba(51, 51, 51, 1);
      line-height: 0.18rem;
      margin-bottom: 0.1rem;
    }
    p:nth-of-type(4) {
      position: absolute;
      right: 0.25rem;
      top: 50%;
      width: fit-content;
      transform: translateY(-50%);
      font-size: 0.26rem;
      font-weight: 300;
      color: rgba(224, 18, 32, 1);
    }
  }
}
</style>