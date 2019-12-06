<template>
  <div>
    <van-tabs v-model="active" swipeable>
      <van-tab title="首页">
        <van-swipe :autoplay="3000" indicator-color="white" class="swipe_0">
          <van-swipe-item v-for="(image, index) in images_0" :key="index">
            <img :src="image" />
          </van-swipe-item>
        </van-swipe>
        <div class="title">精选套组</div>
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
        <van-swipe :autoplay="3000" indicator-color="white" class="swipe_1">
          <van-swipe-item v-for="(image, index) in images_1" :key="index">
            <img :src="image" />
          </van-swipe-item>
        </van-swipe>
        <div class="title">明星单品</div>
        <div v-for="(value,key) in star" :key="key" class="star">
          <div>
            <img :src="value.src" />
          </div>
          <div>
            <p>{{value.title}}</p>
            <p>了解更多</p>
            <img src="../../assets/image/gw/20.png" />
          </div>
        </div>
        <div class="title">配件专栏</div>
        <van-tabs v-model="active_0" swipeable class="tabs_0">
          <van-tab v-for="(value,key) in parts" :title="value.title" :key="key">
            <!-- swiper -->
            <swiper :options="swiperOption">
              <swiper-slide v-for="(value,key) in value.data" :key="key" class="suite">
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
          </van-tab>
        </van-tabs>
      </van-tab>
      <van-tab title="商品库">
        <Goods />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Goods from "./Goods";
export default {
  components: {
    Goods
  },
  data() {
    return {
      active: 0,
      // 轮播图
      images_0: [
        require("../../assets/image/gw/15.png"),
        require("../../assets/image/gw/15.png"),
        require("../../assets/image/gw/15.png")
      ],
      swiperOption: {
        freeMode: true,
        slidesPerView: "auto",
        spaceBetween: 0
      },
      //精选套组
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
      images_1: [
        require("../../assets/image/gw/21.png"),
        require("../../assets/image/gw/21.png"),
        require("../../assets/image/gw/21.png")
      ],
      // 明星产品
      star: [
        {
          title: "全能锅系列",
          src: require("../../assets/image/gw/19.png")
        },
        {
          title: "全能锅系列",
          src: require("../../assets/image/gw/19.png")
        }
      ],
      //配件专栏
      active_0: 0,
      parts: [
        {
          title: "筷子",
          data: [
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
          ]
        },
        {
          title: "筷子",
          data: [
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
          ]
        },
        {
          title: "筷子",
          data: [
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
          ]
        },
        {
          title: "筷子",
          data: [
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
          ]
        }
      ]
    };
  },
  watch: {
    //修改tab栏下划线宽带
    active(o, n) {
      let position = document.getElementsByClassName("van-tabs__line")[0].style;
      if (position.transform == "translateX(27.5px) translateX(-50%)") {
        position.width = "0.9rem";
      } else position.width = "0.6rem";
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.van-tabs:nth-child(1) {
  > .van-tabs__wrap {
    height: 0.9rem;

    .van-tabs__nav {
      margin-right: 5.3rem;
    }
    .van-tab {
      font-size: 0.26rem;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 0.9rem;
    }
    .van-tab--active {
      font-size: 0.3rem;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
    }
    .van-tabs__line {
      // width: .90rem;
      height: 0.14rem;
      background: rgba(224, 18, 32, 1);
      opacity: 0.2;
      border-radius: 0.7rem;
      bottom: 0.6rem;
    }
  }
}
.swipe_0 {
  img {
    width: 100%;
    height: 4.2rem;
  }
  .van-swipe__indicators {
    left: 6.8rem;
    bottom: 0.35rem;
  }
}
.title {
  width: 2.88rem;
  height: 0.58rem;
  margin: 0.4rem auto 0.3rem;
  background: url("../../assets/image/gw/16.png");
  background-size: 100%;
  background-repeat: no-repeat;
  text-align: center;
  font-size: 0.3rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 0.5rem;
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
.swipe_1 {
  img {
    width: 100%;
    height: 2.35rem;
  }
}
.star {
  > div:nth-child(1) {
    width: 7.1rem;
    height: 3.5rem;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(230, 230, 230, 1);
    border-radius: 0.2rem;
    margin: auto;
    text-align: center;
    line-height: 3.5rem;
    img {
      height: 1.8rem;
      vertical-align: middle;
    }
  }
  > div:nth-child(2) {
    height: 0.3rem;
    margin: 0.25rem 0 0.4rem;
    padding: 0 0.2rem;
    display: flex;
    align-items: center;
    p:nth-child(1) {
      font-size: 0.3rem;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }
    p:nth-child(2) {
      margin-left: auto;
      font-size: 0.24rem;
      font-weight: 400;
      color: rgba(224, 18, 32, 1);
    }
    img {
      width: 0.24rem;
    }
  }
}
/deep/.tabs_0 {
  .van-tabs__wrap {
    height: 0.6rem;
    margin: 0 0.2rem 0.3rem 0.2rem;

    .van-tab {
      font-size: 0.28rem;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 0.6rem;
    }
  }
  .van-tabs__line {
    width: 1.78rem !important;
  }
  .van-tabs__wrap::after {
    border-top: none;
  }
}
</style>