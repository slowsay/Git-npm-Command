<template>
  <div>
    <van-swipe :autoplay="3000" indicator-color="white" class="swipe_0">
      <van-swipe-item v-for="(image, index) in images_0" :key="index">
        <img :src="image" @click="$router.push('/RecipeDetails')"/>
      </van-swipe-item>
    </van-swipe>
    <img :src="image" />
    <div class="title">今日食谱</div>
    <div class="today">
      <div>
        <div @click="today.checked=0" :class="{active:today.checked==0}">
          <p>早餐</p>
          <p>BREAKFAST</p>
        </div>
        <div @click="today.checked=1" :class="{active:today.checked==1}">
          <p>午餐</p>
          <p>BREAKFAST</p>
        </div>
        <div @click="today.checked=2" :class="{active:today.checked==2}">
          <p>晚餐</p>
          <p>DINNER</p>
        </div>
      </div>
      <div>
        <div v-for="(value,key) in today.data[today.checked]" :key="key">
          <img :src="value.img" />
          <p>{{value.title}}</p>
        </div>
      </div>
    </div>
    <div class="title">网红菜谱</div>
    <van-swipe :autoplay="3000" indicator-color="white" class="swipe_1">
      <van-swipe-item v-for="(value, index) in images_1" :key="index">
        <img :src="value.img" />
        <p>{{value.name}}</p>
        <p>{{value.people}}</p>
      </van-swipe-item>
    </van-swipe>
    <div class="title">TOP20</div>
    <div class="swiper_o">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(value,index) in swiper" :key="index">
          <div class="swiper">
            <img :src="value.img" />
            <p>{{'TOP'+(index+1)}}</p>
            <p>{{value.name}}</p>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images_0: [
        require("../../assets/image/gw/15.png"),
        require("../../assets/image/gw/15.png"),
        require("../../assets/image/gw/15.png")
      ],
      image: require("../../assets/image/gw/15.png"),
      today: {
        checked: 0,
        data: [
          [
            {
              title: "韭菜盒子1",
              img: require("../../assets/image/gw/15.png")
            },
            {
              title: "韭菜盒子",
              img: require("../../assets/image/gw/15.png")
            },
            {
              title: "韭菜盒子",
              img: require("../../assets/image/gw/15.png")
            }
          ],
          [
            {
              title: "韭菜盒子2",
              img: require("../../assets/image/gw/15.png")
            },
            {
              title: "韭菜盒子",
              img: require("../../assets/image/gw/15.png")
            },
            {
              title: "韭菜盒子",
              img: require("../../assets/image/gw/15.png")
            }
          ],
          [
            {
              title: "韭菜盒子",
              img: require("../../assets/image/gw/15.png")
            },
            {
              title: "韭菜盒子3",
              img: require("../../assets/image/gw/15.png")
            },
            {
              title: "韭菜盒子",
              img: require("../../assets/image/gw/15.png")
            }
          ]
        ]
      },
      images_1: [
        {
          name: "蔓越莓曲奇",
          people: "达人：Tinrry甜悦",
          img: require("../../assets/image/gw/15.png")
        },
        {
          name: "蔓越莓曲奇",
          people: "达人：Tinrry甜悦",
          img: require("../../assets/image/gw/15.png")
        },
        {
          name: "蔓越莓曲奇",
          people: "达人：Tinrry甜悦",
          img: require("../../assets/image/gw/15.png")
        }
      ],
      swiperOption: {
        slidesPerView: 2,
        slidesPerColumn: 2,
        spaceBetween: 0,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      swiper: [
        {
          name: "蔓越莓曲奇",
          img: require("../../assets/image/gw/15.png")
        },
        {
          name: "蔓越莓曲奇",
          img: require("../../assets/image/gw/15.png")
        },
        {
          name: "蔓越莓曲奇",
          img: require("../../assets/image/gw/15.png")
        },
        {
          name: "蔓越莓曲奇",
          img: require("../../assets/image/gw/15.png")
        },
        {
          name: "蔓越莓曲奇",
          img: require("../../assets/image/gw/15.png")
        },
        {
          name: "蔓越莓曲奇",
          img: require("../../assets/image/gw/15.png")
        },
        {
          name: "蔓越莓曲奇",
          img: require("../../assets/image/gw/15.png")
        },
        {
          name: "蔓越莓曲奇",
          img: require("../../assets/image/gw/15.png")
        },
        {
          name: "蔓越莓曲奇",
          img: require("../../assets/image/gw/15.png")
        },
        {
          name: "蔓越莓曲奇",
          img: require("../../assets/image/gw/15.png")
        },
        {
          name: "蔓越莓曲奇",
          img: require("../../assets/image/gw/15.png")
        },
        {
          name: "蔓越莓曲奇",
          img: require("../../assets/image/gw/15.png")
        },
        {
          name: "蔓越莓曲奇",
          img: require("../../assets/image/gw/15.png")
        },
        {
          name: "蔓越莓曲奇",
          img: require("../../assets/image/gw/15.png")
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
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
.swipe_0 {
  img {
    width: 100%;
    height: 3.5rem;
  }
}
.swipe_0 + img {
  width: 7.1rem;
  height: 2rem;
  display: block;
  margin: 0.25rem auto 0;
}
.today {
  display: flex;
  > div:nth-child(1) {
    padding: 0 0.2rem;
    div {
      width: 1.4rem;
      height: 0.77rem;
      //  background:rgba(224,18,32,1);
      border: 0.01rem solid rgba(179, 179, 179, 0.8);
      border-radius: 0.1rem;
      &:not(:last-child) {
        margin-bottom: 0.1rem;
      }
    }
    p:nth-child(1) {
      font-size: 0.2rem;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 0.2rem;
      margin: 0.2rem 0 0.07rem 0.3rem;
    }
    p:nth-child(2) {
      font-size: 0.14rem;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-left: 0.3rem;
    }
  }
  > div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    > div {
      width: 1.7rem;
      height: 2.5rem;
      position: relative;
      border-radius: 0.06rem;
      overflow: hidden;
      &:not(:last-child) {
        margin-right: 0.2rem;
      }
      img {
        width: 1.7rem;
        height: 2.5rem;
        position: absolute;
        left: 0;
        right: 0;
      }
      p {
        position: relative;
        font-size: 0.24rem;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin: 2.1rem 0 0 0.15rem;
      }
    }
  }
  .active {
    border: 0.01rem solid #e01220;
    background: #e01220;
    p {
      color: #fff !important;
    }
  }
}
/deep/.swipe_1 {
  .van-swipe-item {
    height: 3.5rem !important;
    img {
      top: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 3.5rem;
    }
    p {
      margin-left: 0.2rem;
      position: relative;
      font-size: 0.28rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 0.28rem;
      &:nth-of-type(1) {
        margin-top: 2.5rem;
        margin-bottom: 0.2rem;
      }
    }
  }
  .van-swipe__indicators {
    left: 7rem;
    bottom: 0.2rem;
  }
}
.swiper_o {
  padding: 0 0.1rem;
  .swiper-container {
    height: 8.1rem;
    /deep/.swiper-wrapper {
      height: 3.65rem;
    }
  }
}
.swiper {
  width: 3.65rem;
  height: 3.65rem;
  position: relative;
  margin: 0;
  img {
    width: 3.45rem;
    height: 3.45rem;
    position: absolute;
    top: 0;
    left: 0.1rem;
  }
  p:nth-child(2) {
    height: 0.36rem;
    background: rgba(224, 18, 32, 1);
    border-radius: 0.18rem;
    padding: 0 0.1rem;
    font-size: 0.18rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 0.36rem;
    position: absolute;
    top: 2.9rem;
    left: 0.3rem;
  }
  p:nth-child(3) {
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 0.36rem;
    position: absolute;
    top: 2.9rem;
    left: 1.1rem;
  }
}
.swiper-pagination {
  bottom: 0.5rem;
  /deep/.swiper-pagination-bullet{
    width: 0.1rem;
    height: 0.1rem;
    border-radius: 50%;
    margin: 0 0.05rem;
  }
  
}
</style>