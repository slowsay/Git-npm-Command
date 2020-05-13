<template>
  <div>
    <van-swipe :autoplay="3000" indicator-color="white" class="swipe_0">
      <van-swipe-item v-for="(image, index) in images_0" :key="index">
        <img :src="image.photo" @click="$router.push('/RecipeDetails')"/>
      </van-swipe-item>
    </van-swipe>
    <img :src="image" @click="$router.push('/Recipe')"/>

    <div class="title">今日食谱</div>
    <div class="today">
      <div>
        <div @click="findRecipesByStatus(0)" :class="{active:today.checked==0}">
          <p>早餐</p>

          <p>Breakfast</p>
        </div>
        <div @click="findRecipesByStatus(1)" :class="{active:today.checked==1}">
          <p>午餐</p>

          <p>Lunch</p>
        </div>
        <div @click="findRecipesByStatus(2)" :class="{active:today.checked==2}">
          <p>晚餐</p>

          <p>Dinner</p>
        </div>
      </div>
      <div>
        <div v-for="(value,key) in today.data" :key="key">
          <img :src="value.precipes" @click="goDetailHandle(value.recipesId)"/>

          <p>{{value.recipes}}</p>
        </div>
      </div>
    </div>
    <div class="title">网红菜谱</div>
    <van-swipe :autoplay="3000" indicator-color="white" class="swipe_1">
      <van-swipe-item v-for="(value, index) in images_1" :key="index">
        <img :src="value.src"/>

        <p>{{value.title}}</p>

        <p>{{value.person}}</p>
      </van-swipe-item>
    </van-swipe>
    <div class="title">TOP20</div>
    <div class="swiper_o">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(value,index) in swiper" :key="index">
          <div class="swiper">
            <img :src="value.img"/>

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
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    data: function () {
      return {
        userinfo: {},
        images_0: [
//          require("../../assets/image/gw/15.png"),
//          require("../../assets/image/gw/15.png"),
//          require("../../assets/image/gw/15.png")
        ],
        image: require("../../assets/image/gw/15.png"),
        today: {
          checked: 0,
          data: []
        },
        images_1: [
//          {
//            name: "蔓越莓曲奇",
//            people: "达人：Tinrry甜悦",
//            img: require("../../assets/image/gw/15.png")
//          }
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
//          {
//            name: "蔓越莓曲奇",
//            img: require("../../assets/image/gw/15.png")
//          }
        ]
      };
    },
    created: function () {
      if (publicFn.getStore("asxUserInfo")) {
        this.userinfo = JSON.parse(publicFn.getStore("asxUserInfo"));
      }
      else {
        this.userinfo = {token: "asxtoken", id: '1'};
      }
      this.init();
    },
    methods: {
      init: function () {
        this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id};
        //每日推荐食谱查询
        this.findRecipesByStatus(0);
        //网红分类查询
        this.findPerson()
        //轮播图
        this.getBannerData();
        //top20
        this.cookList();
      },
      //进入菜谱详情页
      goDetailHandle: function (id) {
        this.$router.push({path: "/RecipeDetails", query: {id: id}});
      },
      //网红分类查询
      findPerson: function () {
        var _this = this;
        API.request({
          method: "get",
          url: API.findPerson,
          headers: this.headerobj,
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.images_1 = _this.exchangefindPersonData(e.data.data);
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
      //每日推荐食谱查询
      findRecipesByStatus: function (status) {
        this.today.checked = status;
        var _this = this;
        API.request({
          method: "post",
          url: API.findRecipesByStatus,
          headers: this.headerobj,
          data: API.qs.stringify({recipesStatus: (status + 1)})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.today.data = _this.exchangeData(e.data.data);
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
      //Top20
      cookList: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.cookList,
          headers: this.headerobj,
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.swiper = e.data.data || [];
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
      //轮播图
      getBannerData: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.cookBanner,
          headers: this.headerobj,
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.images_0 = e.data.data || [];
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
      exchangefindPersonData: function (v) {
        for (var i = 0, arr = v; i < arr.length; i++) {
          arr[i].src = "http://qiandian.oss-cn-hangzhou.aliyuncs.com/image/2019-11-29/4efb422d-2b3d-4c79-ac85-a08999f46244.jpg";
          arr[i].title = "没有标题字段,没有图片字段";
          arr[i].updateTime = publicFn.dateYMD(arr[i].updateTime);
        }
        return arr;
      },
      //数据转变
      exchangeData: function (v) {
        for (var i = 0, arr = v; i < arr.length; i++) {
          arr[i].updateTime = publicFn.dateYMD(arr[i].updateTime);
        }
        return arr;
      }
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
        margin: 0.2rem 0 0.02rem 0.3rem;
      }
      p:nth-child(2) {
        font-size: 0.12rem;
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

  /deep/ .swipe_1 {
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
      /deep/ .swiper-wrapper {
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
    /deep/ .swiper-pagination-bullet {
      width: 0.1rem;
      height: 0.1rem;
      border-radius: 50%;
      margin: 0 0.05rem;
    }

  }
</style>
