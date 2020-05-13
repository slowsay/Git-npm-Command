<template>
  <div class="diving">
    <div class="top">
      <img :src="form.image" width="100%"/>

      <div class="icon" @click="$router.go(-1)">
        <van-icon name="arrow-left" style="font-size:.45rem;margin:.3rem;"></van-icon>
      </div>
    </div>
    <div class="contain">
      <p>{{form.title}}</p>

      <p class="place">
        <img src="../../assets/image/zxw/dizhi.png" alt/>
        {{form.destination}}
      </p>

      <!--<div class="type">-->
      <!--<img src="../../assets/image/zxw/shijian.png" alt/>-->
      <!--<span>出行时间：{{form.travelTime}}</span>-->
      <!--<img style="margin-left:.32rem" src="../../assets/image/zxw/rili.png" alt/>-->
      <!--<span>出行天数：{{form.travelDay}}天</span>-->
      <!--</div>-->
      <!--<div class="type">-->
      <!--<img src="../../assets/image/zxw/feiyong.png" alt/>-->
      <!--<span>平均费用：</span>-->
      <!--<span style="color:#52BDF2;font-size:.32rem">{{form.cost}}元</span>-->
      <!--</div>-->
      <div class="type" style="margin-bottom:.1rem">
        <img src="../../assets/image/zxw/yu.png"/>
        <span>亮点：</span>

        <div class="stars">
          <div v-for="(item,index) in form.brightSpotName" :key="index" class="star">{{item}}</div>
        </div>
      </div>
      <div class="props">
        <div v-for="(items,index) in propertyData" :key="index">
          <span>{{items.keyss}}</span> : <span>{{items.valuess}}</span>
        </div>
      </div>

      <p class="decripe">{{form.diveName}}</p>

      <p class="decripe" v-html="form.diveContent">{{form.diveContent}}</p>
    </div>
    <div class="kuai"></div>
    <div class="bottom">
      <div>
        <div class="kuai"></div>
        <p>子潜点</p>
      </div>
      <div v-for="(item,index) in boxData" :key="index" @click="subHandle(index)" class="qiandian">
        <div>
          <img :src="item.image"/>
        </div>
        <div class="right">
          <p>{{item.title}}</p>

          <div class="rightBox">
            <span v-for="(item,indexs) in boxData[index].brightSpotName" :key="indexs">{{item}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bottomNav">
      <div class="navitem">
        <van-icon @click="goods" :info="goodnum" v-if="good==false" name="good-job-o"></van-icon>
        <van-icon @click="goods" :info="goodnum" v-else-if="good==true" name="good-job"></van-icon>
      </div>
      <div class="navitem">
        <van-icon @click="stars" :info="starnum" v-if="star==false" name="star-o"></van-icon>
        <van-icon @click="stars" :info="starnum" v-else-if="star==true" name="star"></van-icon>
      </div>
      <div class="navitem">
        <van-icon name="share" :info="sharenum" @click="wxShowMenu"></van-icon>
      </div>
    </div>
    <div class="clearh"></div>
  </div>
</template>
<script>
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  //  import {Wechat} from '@ionic-native/wechat/ngx';
  export default {
    data: function () {
      return {
        loading: true,
        good: false,
        goodnum: 0,
        sharenum: 0,
        star: false,
        starnum: 0,
        propertyData: [],
        form: {
          image: '',
          title: "",
          diveName: "",
          travelTime: "",
          travelDay: "",
          collection: 0,
          likeCount: 0,
          cost: "0",
          brightSpot: '',
          brightSpotName: '',
          destination: "",
          diveContent: "",
        },
        boxData: [
//          {
//            image: require("../../assets/image/zxw/bg2.png"),
//            title: "它和它的附属海岛就像是一个现实世界中的梦境之岛。哈哈哈哈哈哈哈",
//            brightSpot: ["大白鲨", "锤头鲨"]
//          }
        ]
      };
    },
    //初始化数据
    created: function () {
      if (localStorage.getItem("userInfo")) {
        this.userinfo = JSON.parse(localStorage.getItem("userInfo"));
      }
      else {
        this.userinfo = {token: 'qianwatoken', id: '1'}
//        this.$router.push({path: '/Login'});
      }
      this.init();
    },
    activated: function () {
      this.init();
    },
    methods: {
      init: function () {
        var _this = this;
        //根据潜点详情id查询潜点详情
        this.getDivingDetail();
        //调用-根据查询出的潜点详情id去查询其下的子潜点列表接口
        this.getSubDiving();
        //添加浏览历史
        if (localStorage.getItem("userInfo")) {
          this.browerHistory()
        }
        //获取动态属性
        this.selectMsg();
      },
      isLogin: function () {
        if (localStorage.getItem("userInfo")) {
          return true;
        }
        else {
          return false;
        }
      },
      //获取动态属性
      selectMsg: function () {
        var _this = this;
        API.request({
          url: API.selectMsg,
          method: 'post',
          headers: {token: this.userinfo.token, userId: this.userinfo.id},
          data: API.qs.stringify({contentId: this.$route.query.id})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.propertyData = e.data.data.data;
            }
            else {
              API.dialog({message: e.data.msg})
            }
          }
          else {
            API.dialog({message: e.data.msg})
          }
        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
      },
//      test:function(){
//        // 微信分享
//        shareMsg(json){
//
//          this.$cordova.wechatShare(datas);
//        },
//        wechatShareTof(){
//          var that = this;
//          var datas = {
//            title: that.info.mission_name,
//            description: that.info.mission_remark,
//            thumb: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAASCAYAAAC9+TVUAAACKklEQVQ4T7WSu2uTURjG39sXMii0laJW0LrpoovQwaUOoYN4mUSXoq01RaR2CNKApV9LEwiCF6poSXRRUHRSBxEd/Avq4FB0qaBGNLVJqmD7Jee8chKSptpSL3iW95z38jvneTg43lOcQdZ2YgUmhaUIDXsFIgXmWqzWqjn7FkdPFiJCcJ5I24hhnBmAwICLTK7ZNuwNgMvXawaETRYBAJJ9hQyy7ozfaN7rzn+6/glyN/W+f+F76d4ySDnAERJIiVhiAfdU8ERBPAWuRAvivPP0m1XtQcU3JHBgGaS0QIMS0iFmpdpQBeJ8CSmIOH/UgefV8IiSmUGwh/5azq3kx9Ywm8//B2ICPEsCcSdHxGm3VU+cDG9JTsjToi2zv6KcYJHGxNPkWsaKZ+ehhH2W4XVdTuJUIc0Iu4Ymmzp+94/cTuQ2syxmmczBqrHRQi8hpAnVP3e9eWwt0M1Ubn3Ylh4j290E3p4KpALqzw8I6WVCvRi7tiG2Gijjv2sJefyEUbcTQtex+JaXdYgbunAmf4JQ00SaKV6ZOO2Dbxth6cSnjZ6xz4i0BTSIdA+3T7v6MkgFNPDliKDeIYb7+alXx/0X+8ouP+nPbfU0eE6sRIiR7uFNM7ULfoG4wqXBuf1E5gEhPNWgcDS8rmkbsnGArwAS6R1tzTa+cEWIa5iI5ToR4RGxTjHpDiT4oGK6on7b7M9+rQpxjVdjsx0s9iEjTKuVw9FUS3Elw38Agj4GZzE/jUEAAAAASUVORK5CYII=",
//            mediaTagName: "TEST-TAG-001",
//            messageExt: "这是第三方带的测试字段",
//          }
//          var urlData='?mission_id='+this.$route.query.mission_id;
//          urlData=urlData+'&uidList='+this.uidList + '&share_tree='+ storage.getItem('userInfo').user_id;
//          this.$cordova.wechatShareTof(datas,urlData);
//        }
//      },
      //第三方分享
      wxShowMenu: function () {
        if (!this.isLogin()) {
          publicFn.setStore('diving', '1');
          this.$router.push({path: '/Login'});
        }
        else {
          Wechat.isInstalled(function (installed) {
            if (!installed) {
              API.dialog({message: "微信客户端未安装"});
            }
            Wechat.share({
              message: {
                title: this.form.title,
                description: this.form.brightSpotName,
                thumb: this.form.image,
                media: {
                  type: Wechat.Type.WEBPAGE,
                  webpageUrl: location.href + '&shareid=' + this.userinfo.id
                }
              },
              scene: Wechat.Scene.TIMELINE   // share to Timeline
            }, function () {
              API.dialog({message: "分享成功" + JSON.stringify(location.href)});
            }, function (reason) {
              API.dialog({message: "Failed: " + JSON.stringify(reason)});
            });
          }, function (reason) {
            API.dialog({message: "Failed: " + JSON.stringify(reason)});
          });
        }
//        API.request({
//          url: API.weixinShare,
//          method: 'post',
//        }).then(function (e) {
//          if (e.data.code == 200) {
//            if (e.data.success) {
//              wx.config({
//                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//                appId: '', // 必填，公众号的唯一标识
//                timestamp: "", // 必填，生成签名的时间戳
//                nonceStr: '', // 必填，生成签名的随机串
//                signature: '',// 必填，签名
//                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo',] // 必填，需要使用的JS接口列表
//              });
//            }
//            else {
//              API.dialog({message: e.data.msg})
//            }
//          }
//          else {
//            API.dialog({message: e.data.msg})
//          }
//        }).catch(function (e) {
//          API.dialog({message: JSON.stringify(e)});
//        })
      },
      //根据潜点详情id查询潜点详情
      getDivingDetail: function () {
        var _this = this;
        API.request({
          url: API.selectDiveById,
          method: 'post',
          headers: {token: this.userinfo.token, userId: this.userinfo.id},
          data: API.qs.stringify({contentId: this.$route.query.id})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.form = _this.exchangeData(e.data.data || []);
              //点赞，收藏
              _this.goodnum = _this.form.likeCount;
              _this.starnum = _this.form.collection || 0;
              _this.good = _this.form.isLike ? true : false;
              _this.star = _this.form.isCollect ? true : false;
              _this.sharenum = _this.form.share;
            }
            else {
              API.dialog({message: e.data.msg})
            }
          }
          else {
            API.dialog({message: e.data.msg})
          }
        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
      },
      //调用-根据查询出的潜点详情id去查询其下的子潜点列表接口
      getSubDiving: function () {
        var _this = this;
        API.request({
          url: API.selectDiveByFId,
          method: 'post',
          headers: {token: this.userinfo.token, userId: this.userinfo.id},
          data: API.qs.stringify({contentId: this.$route.query.id})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.boxData = _this.exchangeDatas(e.data.data);
            }
            else {
              API.dialog({message: e.data.msg})
            }
          }
          else {
            API.dialog({message: e.data.msg})
          }
        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
      },
      //进入子潜点页面
      subHandle: function (index) {
        this.$router.push({path: "/Diving", query: {id: this.boxData[index].contentId}});
        this.init();
      },
      //添加浏览历史
      browerHistory: function () {
        API.request({
          url: API.addBrowserHistory,
          method: 'post',
          headers: {token: this.userinfo.token, userId: this.userinfo.id},
          data: API.qs.stringify({contentId: this.$route.query.id, type: 1})
        }).then(function (e) {
        }).catch(function (e) {
        })
      },
      goods: function () {
        var _this = this;
        if (!this.isLogin()) {
          publicFn.setStore('diving', '1');
          this.$router.push({path: '/Login'});
        }
        else {
          if (this.good == false) {
            if (this.loading) {
              this.loading = false;
              this.likeDive();
            }
            this.good = true;
          } else if (this.good == true) {
            if (this.loading) {
              this.loading = false;
              this.disLikeDive();
            }
            this.good = false;
          }
        }
      },
      disLikeDive: function () {
        var _this = this;
        API.request({
          url: API.disLikeDive,
          method: 'post',
          headers: {token: this.userinfo.token, userId: this.userinfo.id},
          data: API.qs.stringify({contentId: this.$route.query.id})
        }).then(function (e) {
          _this.loading = true;
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.getDivingDetail();
            }
            else {
              API.dialog({message: e.data.msg})
            }
          }
          else {
            API.dialog({message: e.data.msg})
          }
        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
      },
      likeDive: function () {
        var _this = this;
        API.request({
          url: API.likeDive,
          method: 'post',
          headers: {token: this.userinfo.token, userId: this.userinfo.id},
          data: API.qs.stringify({contentId: this.$route.query.id})
        }).then(function (e) {
          _this.loading = true;
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.getDivingDetail();
            }
            else {
              API.dialog({message: e.data.msg})
            }
          }
          else {
            API.dialog({message: e.data.msg})
          }
        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
      },
      stars: function () {
        var _this = this;
        if (!this.isLogin()) {
          publicFn.setStore('diving', '1');
          this.$router.push({path: '/Login'});
        }
        else {
          if (this.star == false) {
            if (this.loading) {
              this.loading = false;
              this.addCollect();
            }
            this.star = true;
          } else if (this.star == true) {
            if (this.loading) {
              this.loading = false;
              this.cancelCollect();
            }
            this.star = false;
          }
        }
      },
      //取消收藏潜点内容
      cancelCollect: function () {
        var _this = this;
        API.request({
          url: API.collectCancel,
          method: 'post',
          headers: {token: this.userinfo.token, userId: this.userinfo.id},
          data: API.qs.stringify({contentId: this.$route.query.id})
        }).then(function (e) {
          _this.loading = true;
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.getDivingDetail();
            }
            else {
              API.dialog({message: e.data.msg})
            }
          }
          else {
            API.dialog({message: e.data.msg})
          }
        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
      },
      //收藏
      addCollect: function () {
        var _this = this;
        API.request({
          url: API.addCollect,
          method: 'post',
          headers: {token: this.userinfo.token, userId: this.userinfo.id},
          data: API.qs.stringify({contentId: this.$route.query.id})
        }).then(function (e) {
          _this.loading = true;
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.getDivingDetail();
            }
            else {
              API.dialog({message: e.data.msg})
            }
          }
          else {
            API.dialog({message: e.data.msg})
          }
        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
      },
      exchangeDatas: function (v) {
        for (var i = 0, arr = v; i < arr.length; i++) {
          arr[i].updateTime = publicFn.dateYMD(arr[i].updateTime);
          if (arr[i].brightSpotName) {
            arr[i].brightSpotName = arr[i].brightSpotName.split(',');
          }
        }
        return arr;
      },
      //转换数据
      exchangeData: function (v) {
        v.updateTime = publicFn.dateYMD(v.updateTime);
        v.destination = v.destination || "";
        v.brightSpotName = v.brightSpotName.split(',');
        return v;
      }
    }
  }
  ;
</script>

<style lang="less" scoped>
  .diving {
    width: 7.5rem;
    overflow: hidden;
    .top {
      width: 7.5rem;
      height: 4.7rem;
      overflow: hidden;
      /*img {*/
      /*width: 100%;*/
      /*}*/

      .icon {
        position: fixed;
        top: 0;
        color: #fff;
        font-size: .45rem;
      }
    }
    .contain {
      width: 7.5rem;
      padding: 0.1rem 0.3rem;
      box-sizing: border-box;
      > p:nth-child(1) {
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 0.5rem;
      }

      .place {
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #4a4a4a;
        line-height: 0.32rem;
        margin-top: 0.3rem;
        img {
          width: 0.24rem;
          margin-right: 0.2rem;
        }
      }
      .props {
        float: left;
        width: 100%;
        margin: 0.3rem 0;
      }
      .props div {
        float: left;
        width: 50%;
        height: 0.5rem;
        line-height: 0.5rem;

      }
      .type {
        font-size: 0.24rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        line-height: 0.32rem;
        margin-top: 0.3rem;
        overflow: auto;
        .stars {
          width: 5.5rem;
          float: right;
          .star {
            border-radius: 0.1rem;
            padding: 0.04rem 0.24rem;
            background-color: rgba(82, 189, 242, 0.1);
            margin: 0 0.1rem 0.1rem 0;
            float: left;
          }
        }
        span {
          line-height: 0.32rem;
        }
        img {
          width: 0.24rem;
          margin-right: 0.2rem;
        }
      }
      .img2 {
        width: 6.9rem;
        height: 3rem;
      }
      .decripe {
        /*font-size: 0.24rem;*/
        /*font-family: PingFangSC-Regular, PingFang SC;*/
        /*font-weight: 400;*/
        /*color: rgba(0, 0, 0, 1);*/
        /*line-height: 0.4rem;*/
        /*margin: 0.2em;*/
        /*p img{width:100%}*/
      }
    }
    .kuai {
      width: 7.5rem;
      height: 0.1rem;
      background-color: #f5f5f5;
    }
    .bottom {
      width: 7.5rem;
      padding: 0.3rem;
      box-sizing: border-box;
      div:nth-child(1) {
        display: flex;
        width: 6.9rem;
        margin-bottom: 0.2rem;
        .kuai {
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
      .qiandian {
        width: 6.9rem;
        height: 2.4rem;
        margin: 0 0 0.5rem 0;
        background: rgba(255, 255, 255, 1);
        box-shadow: 1px 1px 20px 0px rgba(230, 230, 230, 1);
        border-radius: 0.1rem;
        padding: 0.2rem;
        box-sizing: border-box;
        display: flex;
        img {
          width: 2.5rem;
          height: 2rem;
          border-radius: 0.1rem;
          margin-right: 0.2rem;
        }
        .right {
          position: relative;
          width: 100%;
          p {
            font-size: 0.24rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(74, 74, 74, 1);
            line-height: 0.4rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .rightBox {
            position: absolute;
            bottom: 0;
            display: flex;
            flex-wrap: wrap;
            span {
              padding: 0.08rem 0.1rem;
              font-size: 0.18rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(74, 74, 74, 1);
              line-height: 0.25rem;
              background-color: rgba(82, 189, 242, 0.1);
              border-radius: 0.1rem;
              margin: 0.1rem 0.2rem 0 0;
            }
          }
        }
      }
    }
    .bottomNav {
      width: 7.5rem;
      height: 1rem;
      position: fixed;
      left: 0;
      bottom: 0;
      background-color: #fff;
      background: rgba(255, 255, 255, 1);
      display: flex;

      .navitem {
        text-align: center;
        width: 2.5rem;
        line-height: 1rem;
        font-size: 0.4rem;
        color: #52bdf2;
        .van-info {
          font-size: 0.24rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(74, 74, 74, 1);
          line-height: 0.33rem;
          background-color: transparent;
          border: none;
          text-align: right;
        }
      }
    }
    .clearh {
      height: 200px;
    }
  }
</style>
