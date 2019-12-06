<template>
  <div id="Home">
    <van-swipe :autoplay="3000" indicator-color="white" class="swipe_0">
      <van-swipe-item v-for="(image, index) in images_0" :key="index">
        <img :src="image.photo"/>
      </van-swipe-item>
    </van-swipe>
    <div class="title">健康食谱</div>
    <!-- swiper -->
    <swiper :options="swiperOption">
      <swiper-slide v-for="(value,key) in sort" :key="key">
        <div class="sort">
          <div>
            <img :src="value.img"/>
          </div>
          <p>{{value.title}}</p>

          <p>{{value.name}}</p>
        </div>
      </swiper-slide>
    </swiper>
    <div class="title">明星产品</div>
    <div v-for="(value,key) in star" :key="key" class="star">
      <div>
        <img :src="value.src"/>
      </div>
      <div>
        <p>{{value.title}}</p>

        <p>了解更多</p>
        <img src="../../assets/image/gw/20.png"/>
      </div>
    </div>
    <van-swipe :autoplay="3000" indicator-color="white" class="swipe_1">
      <van-swipe-item v-for="(image, index) in images_1" :key="index">
        <img :src="image"/>
      </van-swipe-item>
    </van-swipe>
    <div class="title">精选套组</div>
    <div class="suite">
      <div v-for="(value,key) in suite" :key="key">
        <img :src="value.src"/>

        <p>
          <span>{{'￥'+value.amount}}</span>
          <span>{{'￥'+value.amount_0}}</span>
        </p>

        <p>{{value.title}}</p>

        <div>
          <p>{{'销量:'+value.sala}}</p>

          <p>{{'收藏:'+value.collect}}</p>
        </div>
      </div>
    </div>
    <div>
      <p>
        <span>查看更多</span>
        <img src="../../assets/image/gw/23.png"/>
      </p>
    </div>
    <div class="title">锅友说</div>
    <!-- swiper -->
    <swiper :options="swiperOption">
      <swiper-slide v-for="(value,key) in friend" :key="key">
        <div class="friend">
          <img :src="value.src"/>

          <p>{{value.title}}</p>

          <div>
            <p>
              <img src="../../assets/image/gw/25.png"/>
              <span>{{value.views}}</span>
            </p>

            <p>
              <img src="../../assets/image/gw/26.png" v-if="value.status==0"/>
              <img src="../../assets/image/gw/27.png" v-else/>
              <span :class="{red:value.status!=0}">{{value.viewCount}}</span>
            </p>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div class="friend_0">
      <div v-for="(value,key) in friend_0" :key="key">
        <p v-html="value"></p>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    data: function () {
      return {
        headerobj: {},
        userinfo: "",
        pageindex: 1,
        pagesize: 10,
        pagecount: 1,
        // 轮播图
        images_0: [
//          {photo: require("../../assets/image/gw/15.png")},
//          {photo: require("../../assets/image/gw/15.png")},
//          {photo: require("../../assets/image/gw/15.png")}
        ],
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
        images_1: [
          require("../../assets/image/gw/21.png"),
          require("../../assets/image/gw/21.png"),
          require("../../assets/image/gw/21.png")
        ],
        //精选套组
        suite: [
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
        //锅友说
        friend: [
          {
            src: require("../../assets/image/gw/24.png"),
            title: "一口好锅的重要性大撒大撒大撒大你知",
            views: "272",
            viewCount: "321",
            status: 1
          }
        ],
        friend_0: [
          "当季主题<br>料理专栏",
          "汉堡的猪妈妈<br>料理专栏",
          "网红<br>料理专栏",
          "网红<br>料理专栏"
        ]
      };
    },
    created: function () {
      publicFn.setStore("asxUserInfo", JSON.stringify({token: "asxtoken", userId: "asx001"}))
      if (publicFn.getStore("asxUserInfo")) {
        this.userinfo = JSON.parse(publicFn.getStore("asxUserInfo"));
        this.init();
      }
    },
    methods: {
      init: function () {
        this.headerobj = {token: this.userinfo.token, userId: this.userinfo.userId};
        //首页轮播图
        this.getBannerData();
        //锅友说BBS控制类
        this.BBSIndexList();
      },
      //锅友说BBS控制类
      BBSIndexList: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.BBSIndexList,
          headers: this.headerobj,
          data: API.qs.stringify({page: this.pageindex, num: this.pagesize})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
//              _this.friend = _this.exchangeData(e.data.data);
            }
            else {
              API.dialog({message: JSON.stringify(e.data.msg)});
            }
          }
          else {
            API.dialog({message: JSON.stringify(e.data.msg)});
          }

        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
      },
      //首页轮播图
      getBannerData: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.bannerIndex,
          headers: this.headerobj,
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.images_0 = e.data.data;
            }
            else {
              API.dialog({message: JSON.stringify(e.data.msg)});
            }
          }
          else {
            API.dialog({message: JSON.stringify(e.data.msg)});
          }

        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
      },
      //数据转变
      exchangeData: function (v) {
        for (var i = 0, arr = v; i < arr.length; i++) {
          arr[i].status = arr[i].status || 0;
        }
        return arr;
      }
    }
  };
</script>

<style lang="less" scoped>
  #Home {
    .swipe_0 {
      img {
        width: 100%;
        height: 7.2rem;
      }
      /deep/ .van-swipe__indicators {
        left: 6.8rem;
        bottom: 0.35rem;
      }
    }
    .swiper-container {
      padding-left: 0.2rem;
      box-sizing: border-box;
      .swiper-slide {
        width: fit-content;
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

    .sort {
      width: 1.9rem;
      height: 2.6rem;
      margin-right: 0.2rem;
      background: url("../../assets/image/gw/17.png");
      background-size: 100% 99%;
      background-repeat: no-repeat;
      div {
        height: 1.75rem;
        padding-top: 0.08rem;
        box-sizing: border-box;
        position: relative;
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 1.3rem;
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
    .swipe_1 {
      img {
        width: 100%;
        height: 2.35rem;
      }
    }
    .suite {
      display: flex;
      flex-wrap: wrap;
      padding: 0 0.2rem;
      justify-content: space-between;
    }
    .suite > div {
      flex-shrink: 0;
      width: 3.45rem;
      height: 4.8rem;
      background: rgba(255, 255, 255, 1);
      border: 0.02rem solid rgba(0, 0, 0, 0.08);
      border-radius: 0.06rem;
      margin-bottom: 0.2rem;
      overflow: hidden;
      img {
        width: 100%;
        height: 3.4rem;
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
    .suite + div {
      width: 7.1rem;
      height: 0.64rem;
      margin: auto;
      background: #393939;
      border-radius: 0.06rem;
      p {
        text-align: center;
        line-height: 0.6rem;
        font-size: 0.2rem;
        span {
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          vertical-align: middle;
        }
        img {
          width: 0.2rem;
          vertical-align: middle;
        }
      }
    }
    .friend {
      width: 3.17rem;
      height: 1.96rem;
      border-radius: 0.08rem;
      position: relative;
      margin-right: 0.2rem;
      overflow: hidden;
      > img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
      }
      > p {
        font-size: 0.24rem;
        font-weight: 400;
        padding: 0 0.2rem;
        margin: 0.18rem 0 1.1rem;
        color: rgba(255, 255, 255, 1);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      > div {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        p {
          font-size: 0.18rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          width: 0.8rem;
          margin-left: 0.2rem;
        }
        img {
          height: 0.16rem;
        }
        .red {
          color: red;
        }
      }
    }
    .friend_0 {
      display: flex;
      padding: 0 0.2rem;
      justify-content: space-between;
      margin: 0.3rem 0 0.6rem;
      div {
        width: 1.64rem;
        height: 0.8rem;
        background: rgba(255, 255, 255, 1);
        border-radius: 0.08rem;
        background: url("../../assets/image/gw/28.png");
        background-repeat: no-repeat;
        background-size: 100%;
        p {
          margin-top: 0.15rem;
          text-align: center;
          font-size: 0.18rem;
          font-weight: 400;
          color: rgba(56, 57, 59, 1);
          line-height: 0.26rem;
        }
      }
    }
  }
</style>
