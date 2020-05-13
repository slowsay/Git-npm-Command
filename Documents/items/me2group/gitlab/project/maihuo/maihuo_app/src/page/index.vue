<template>
  <div id="index">
    <div class="top">
      <van-search @click="$router.push('/search')" placeholder="点击畅所欲言" shape="round"/>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image.advertImage" @click="replaceHandle(image)"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="contain">
      <div class="contain_top">
        <!-- 标题 -->
        <div>
          <div></div>
          <p>推荐目的地</p>
        </div>
        <!-- 右侧展示更多 -->
        <div>
          <p @click="$router.push('classify')">更多</p>
          <img src="../assets/image/zxw/you.png" alt/>
        </div>
      </div>
      <div class="contain_box">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in swiperData" :key="index">
            <div class="swiperBox" @click="addressHandle(item)">
              <img :src="item.destinationImage" alt/>

              <div>
                <p>{{item.destinationName}}</p>

                <p>{{item.destinationInfo.substr(0,27)}}</p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="contain_top">
        <!-- 标题 -->
        <div>
          <div></div>
          <p>潜点</p>
        </div>
        <!-- 右侧展示更多 -->
        <div>
          <p>热门推荐</p>
        </div>
      </div>
      <div class="box" v-for="(item,index) in data" :key="index" @click="divingHandle(item)">
        <img class="bg2" :src="item.image"/>

        <div class="boxTop">
          <img src="../assets/image/zxw/tubiao.png"/>
          <span class="name">{{item.destination}}</span>
        </div>
        <div class="boxBottom">
          <p>{{item.diveName}}</p>

          <div class="line"></div>
          <p class="miaosu">{{item.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import API from '../api/index';
  import {publicFn} from '../utils/util';
  export default {
    data: function () {
      return {
        userinfo: {token: "qwtoken", id: "3"},
        swiperOption: {
          slidesPerView: 1.7,
          spaceBetween: 30,
          freeMode: true,
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          }
        },
        //推荐目的地
        swiperData: [
          {
            destinationImage: require("../assets/image/zxw/bg1.jpg"),
            destinationName: "仙本那",
            destinationInfo: "客户工卡好可怜结案时间分厘卡拉山口决定了发",
          }
        ],
        //潜点
        data: [
          {
            diveName: "潜水圣地",
            title: "诗巴丹",
            destination: "好卡霍夫卡上的开发看到回复哈是的理发师多了几分拉萨酱豆腐立刻就阿斯利康房价",
            image: require('../assets/image/zxw/bg2.png')
          }
        ],
        //广告位
        images: [
          {
            advertImage: require("../assets/image/zxw/bg1.jpg")
          }
        ]
      };
    },
    //初始化数据
    created: function () {
//      publicFn.removeStore("userInfo");
      if (publicFn.getStore("userInfo")) {
        this.userinfo = JSON.parse(publicFn.getStore("userInfo"));
        this.init();
      }
      else {
        this.$router.push({path: '/Login'});
      }
    },
    methods: {
      init: function () {
        //重刷新
        if (this.$route.query.refresh) {
          this.$router.push('/index');
        }
        //调用广告列表接口
        this.getAdvertList();
        //调用推荐目的地接口
        this.getSelectByRecommend();
        //调用推荐潜点接口
        this.getSelectByFHotSearch();
      },
      //调用广告列表接口
      getAdvertList: function () {
        var _this = this;
        API.request({
          url: API.advertList,
          method: 'post',
          headers: {token: this.userinfo.token, userId: this.userinfo.id},
          data: API.qs.stringify({advertPosition: "首页"})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.images = _this.exchangeAData(e.data.data || []);
            }
          }
        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
      },
      //调用推荐潜点接口
      getSelectByFHotSearch: function () {
        var _this = this;
        API.request({
          url: API.selectByFHotSearch,
          method: 'post',
          headers: {token: this.userinfo.token, userId: this.userinfo.id}
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.data = e.data.data;
            }
            else {
              API.dialog({message: API.msg.ERROR})
            }
          }
          else {
            API.dialog({message: e.data.msg})
          }
        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
      },
      //调用推荐目的地接口
      getSelectByRecommend: function () {
        var _this = this;
        API.request({
          url: API.selectByRecommend,
          method: 'post',
          headers: {token: this.userinfo.token, userId: this.userinfo.id}
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.swiperData = e.data.data;
              localStorage.setItem("swiperData", JSON.stringify(_this.swiperData));
            }
            else {
              API.dialog({message: API.msg.ERROR})
            }
          }
        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
      },
      //跳转广告链接
      replaceHandle: function (row) {
        if (row.linkName == "目的地") {
          this.$router.push({path: "/placeDetail", query: {id: row.linkId}});
        }
        else if (row.linkName == "潜点") {
          this.$router.push({path: "/Diving", query: {id: row.linkId}});
        }
        else {
          window.location.href = row.linkId;
        }
      },
      //前往-地址详细页面
      addressHandle: function (row) {
        this.$router.push({path: 'placeDetail', query: {id: row.destinationId}});
      },
      //前往-潜点详细页面
      divingHandle: function (row) {
        this.$router.push({path: 'Diving', query: {id: row.contentId}});
      },
      //转换路径
      getURlImage: function (v) {
        for (var i = 0, arr = v; i < arr.length; i++) {
          arr[i].destinationImage = API.url + arr[i].destinationImage;
        }
        return arr;
      },
      exchangeAData: function (v) {
        for (var i = 0, arr = v, getarr = []; i < arr.length; i++) {
          if (arr[i].beginTime != arr[i].endTime) {
            getarr.push(arr[i]);
          }
          ;
        }
        return getarr;
      }
    }
  };
</script>
<style lang="less" scoped>
  #index {
    .top {
      width: 7.5rem;
      height: 3.6rem;
      overflow: hidden;
      img {
        width: 7.5rem;
        height: 3.6rem;
      }
      .van-search {
        padding: 0;
        background: transparent !important;
        position: absolute;
        z-index: 999;
        width: 6.3rem;
        margin: 0.3rem 0.6rem;
      }
      /deep/ .van-search__content {
        background-color: rgba(255, 255, 255, 0.6) !important;
      }
      /deep/ .van-field__control {
        color: #fff;
      }
      /deep/ .van-icon-search {
        color: #fff;
      }
    }
    .contain {
      width: 7.5rem;
      padding: 0 0.3rem .3rem;
      box-sizing: border-box;
      .contain_top {
        display: flex;
        justify-content: space-between;
        margin-top: 0.3rem;
        div:nth-child(1) {
          display: flex;
          div {
            width: 0.1rem;
            height: 0.4rem;
            background: rgba(82, 189, 242, 1);
            border-radius: 0.05rem;
          }
          p {
            font-size: 0.28rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(74, 74, 74, 1);
            line-height: 0.4rem;
            margin-left: 0.2rem;
          }
        }
        div:nth-child(2) {
          display: flex;
          p {
            font-size: 0.24rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(82, 189, 242, 1);
            line-height: 0.4rem;
            margin-right: 0.1rem;
          }
          img {
            width: 0.22rem;
            height: 0.24rem;
            display: inline-block;
            margin-top: 0.08rem;
          }
        }
      }
      .contain_box {
        margin-top: 0.3rem;
        .swiper-slide {
          width: 4rem !important;
          margin-right: 0.3rem !important;

          border-radius: 0.1rem;

        }
        .swiper-slide-active {

          width: 4rem !important;
          margin-right: 0.3rem !important;
          border-radius: 0.1rem;

        }
        .swiperBox {
          height: 3.23rem;
          width: 4rem;
          background: rgba(255, 255, 255, 1);
          border-radius: 0.1rem;
          box-shadow: 0.04rem .02rem 0.08rem .04rem #ccc;

          margin-bottom: .1rem;
          img {
            width: 4rem;
            height: 2rem;
            border-radius: 0.1rem 0.1rem 0 0;
          }
          div {
            width: 4rem;
            padding: 0 0.2rem;
            box-sizing: border-box;
            p:nth-child(1) {
              font-size: 0.24rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(74, 74, 74, 1);
              line-height: 0.4rem;
            }
            p:nth-child(2) {
              font-size: 0.18rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(155, 155, 155, 1);
              line-height: 0.28rem;
            }
          }
        }
      }
      .box {
        margin-top: 0.3rem;
        width: 6.9rem;
        height: 2.5rem;
        position: relative;

        .bg2 {
          width: 6.9rem;
          height: 2.5rem;
          position: absolute;
          top: 0;
          z-index: 1;
        }
        .boxTop {
          position: absolute;
          z-index: 999 !important;
          img {
            width: 0.14rem;
            height: 0.24rem;

            margin: 0.12rem 0.1rem;
            float: left;
          }
          .name {
            font-size: 0.18rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 0.4rem;

          }
        }
        .boxBottom {
          position: absolute;
          z-index: 999 !important;
          margin-top: .5rem;
          p:nth-child(1) {
            font-size: 0.24rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);

            text-align: center;

          }
        }

        .line {
          width: 2.86rem;
          height: 0.02rem;
          background-color: #fff;
          margin: 0.3rem 2.02rem 0.2rem;
        }
        .miaosu {
          font-size: 0.18rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 0.25rem;
          text-align: center;
          padding: 0 0.72rem;
        }
      }
    }
  }
</style>
