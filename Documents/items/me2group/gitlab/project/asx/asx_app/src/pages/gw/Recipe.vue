<template>
  <div>
    <div class="top">
      <div>
        <van-icon name="arrow-left"></van-icon>
      </div>
      <p>菜谱分类</p>
      <div></div>
    </div>
    <div style="height:0.88rem"></div>
    <div class="swiper">
      <swiper :options="swiperOption">
        <swiper-slide>
          <img src="../../assets/image/gw/53.png" />
        </swiper-slide>
        <swiper-slide v-for="(value,key) in sort" :key="key">
          <div class="sort">
            <div>
              <img :src="value.img" />
            </div>
            <p>{{value.title}}</p>
            <p>{{value.name}}</p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="head">
      <img :src="menu.src" />
      <div>
        <p>{{menu.name}}</p>
        <p>
          <span v-for="(value,key) in menu.pot" :key="key">{{value}}</span>
        </p>
        <div>
          <p v-for="(value,key) in menu.main" :key="key">{{value}}</p>
        </div>
      </div>
      <div>
        <img src="../../assets/image/gw/54.png" />
        <span>筛选</span>
      </div>
    </div>
    <div class="body">
      <div v-for="(value,key) in body" :key="key">
        <img :src="value.src" />
        <p>{{value.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 食谱栏
      swiperOption: {
        freeMode: false,
        slidesPerView: "auto"
      },
      sort: [
        {
          img: require("../../assets/image/gw/18.png"),
          title: "家常菜",
          name: "家庭料理"
        },
        {
          img: require("../../assets/image/gw/18.png"),
          title: "家常菜",
          name: "家庭料理"
        },
        {
          img: require("../../assets/image/gw/18.png"),
          title: "家常菜",
          name: "家庭料理"
        },
        {
          img: require("../../assets/image/gw/18.png"),
          title: "家常菜",
          name: "家庭料理"
        },
        {
          img: require("../../assets/image/gw/18.png"),
          title: "家常菜",
          name: "家庭料理"
        },
        {
          img: require("../../assets/image/gw/18.png"),
          title: "家常菜",
          name: "家庭料理"
        }
      ],
      menu: {
        src: require("../../assets/image/gw/22.png"),
        name: "家常菜",
        pot: ["锅", "锅", "锅"],
        main: ["五花肉", "葱", "姜", "蒜", "香菜"]
      },
      body: [
        {
          name: "123",
          src: require("../../assets/image/gw/22.png")
        },
        {
          name: "123",
          src: require("../../assets/image/gw/22.png")
        },
        {
          name: "123",
          src: require("../../assets/image/gw/22.png")
        },
        {
          name: "123",
          src: require("../../assets/image/gw/22.png")
        },
        {
          name: "123",
          src: require("../../assets/image/gw/22.png")
        },
        {
          name: "123",
          src: require("../../assets/image/gw/22.png")
        },
        {
          name: "123",
          src: require("../../assets/image/gw/22.png")
        },
        {
          name: "123",
          src: require("../../assets/image/gw/22.png")
        },
        {
          name: "123",
          src: require("../../assets/image/gw/22.png")
        },
        {
          name: "123",
          src: require("../../assets/image/gw/22.png")
        },
        {
          name: "123",
          src: require("../../assets/image/gw/22.png")
        },
        {
          name: "123",
          src: require("../../assets/image/gw/22.png")
        },
        {
          name: "123",
          src: require("../../assets/image/gw/22.png")
        },
        {
          name: "123",
          src: require("../../assets/image/gw/22.png")
        },
        {
          name: "123",
          src: require("../../assets/image/gw/22.png")
        },
        {
          name: "123",
          src: require("../../assets/image/gw/22.png")
        }
      ]
    };
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
.swiper {
  padding: 0 0.2rem;
  .swiper-slide {
    width: fit-content;
    > img {
      width: 1.94rem;
      height: 1.94rem;
    }
  }
}
.sort {
  width: 1.94rem;
  height: 1.94rem;
  background: url("../../assets/image/gw/17.png");
  background-size: 100% 99%;
  background-repeat: no-repeat;
  div {
    height: 1.2rem;
    padding-top: 0.08rem;
    box-sizing: border-box;
    position: relative;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1.1rem;
      transform: translate(-50%, -50%);
    }
  }
  p:nth-of-type(1) {
    font-size: 0.28rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 0.28rem;
    text-align: center;
  }
  p:nth-of-type(2) {
    font-size: 0.16rem;
    font-weight: 400;
    color: rgba(179, 179, 179, 1);
    line-height: 0.34rem;
    text-align: center;
  }
}
.head {
  display: flex;
  align-items: center;
  padding: 0.4rem 0.2rem 0;
  > img {
    width: 1.4rem;
    height: 1.4rem;
    margin-right: 0.2rem;
  }
  > div:nth-child(2) {
    > p:nth-child(1) {
      font-size: 0.28rem;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }
    > p:nth-child(2) {
      font-size: 0.26rem;
      font-weight: 400;
      color: #666666;
      margin: 0.1rem 0;
      span {
        margin-right: 0.2rem;
      }
    }
    > div:nth-child(3) {
      font-size: 0.26rem;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 0.4rem;
      display: flex;
      p {
        margin-right: 0.2rem;
        border-bottom: 0.02rem solid #e01220;
      }
    }
  }
  > div:nth-child(3) {
    margin-left: auto;
    width: 1rem;
    height: 0.44rem;
    background: #f0f0f0;
    border-radius: 0.04rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.9rem;
    img {
      width: 0.18rem;
      margin-right: 0.1rem;
    }
    span {
      font-size: 0.24rem;
      font-weight: 400;
      color: rgba(179, 179, 179, 1);
    }
  }
}
.body {
  > div {
    float: left;
    width: 2.24rem;
    margin: 0.3rem 0 0 0.2rem;
    img {
      width: 2.24rem;
      height: 2.24rem;
    }
    p {
      font-size: 0.2rem;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 0.2rem;
      margin-top: 0.2rem;
    }
  }
}
</style>