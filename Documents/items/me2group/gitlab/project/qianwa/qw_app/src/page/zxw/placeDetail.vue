<template>
  <div class="placeDetail">
    <div class="top">
      <img class="bgImg" :src="form.destinationImage" alt/>

      <div class="topText">
        <div style="color:#fff;font-size:.45rem">
          <van-icon @click="$router.go(-1)" name="arrow-left" style="font-size:.45rem;margin:.3rem;"></van-icon>
        </div>
        <p class="name">{{form.destinationName}}</p>

        <p class="EnglishName">{{form.EnglishName}}</p>

        <p class="decripe">{{form.destinationInfo.substr(0,170)}}</p>
      </div>
    </div>
    <div class="contain">
      <div>
        <div class="kuai"></div>
        <p>潜点</p>
      </div>
      <van-list v-model="loading" :finished="finished" finished-text="抱歉,没有更多信息了" @load="onLoad">
        <div v-for="(item,index) in data" :key="index" class="hotBox" @click="goto(index)">
          <div class="imgBox">
            <img :src="item.image"/>
          </div>
          <div>
            <p class="title">{{item.title}}</p>

            <p class="nameBox">
              <span>{{item.diveName}}</span>
              <span style="color:rgba(204,204,204,1);margin-left:.2rem">{{item.updateTime}}</span>
            </p>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    data: function () {
      return {
        setime: 0,
        loading: false,
        finished: false,
        //详细内容
        form: {
          destinationImage: '',
          destinationName: "",
          EnglishName: "",
          destinationInfo: ""
        },
        //其他潜点
        data: [
//          {
//            destinationImage: require("../../assets/image/zxw/bg2.png"),
//            destinationInfo: "它和它的附属海岛就像是一个现实世界中的梦境之岛。",
//            destinationName: "诗巴丹",
//            updateTime: "2019/07/12"
//          }
        ]
      };
    },
//   mounted: function () {
//     this.getdata();
//   },
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
    methods: {
      init: function () {
        //添加浏览历史
        if (localStorage.getItem("userInfo")) {
          this.addBrowserHistory();
        }
        //显示目的地详细内容
        this.selectDestinationByDestinationId();
      },
      //添加浏览历史
      addBrowserHistory: function () {
        var _this = this;
        API.request({
          url: API.addBrowserHistory,
          method: 'post',
          headers: {token: this.userinfo.token, userId: this.userinfo.id},
          data: API.qs.stringify({
            contentId: this.$route.query.id, type: 2
          })
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
            }
            else {
              API.dialog({message: JSON.stringify(e.data.msg)})
            }
          }
          else {
            API.dialog({message: JSON.stringify(e.data.msg)})
          }
        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
      },
      //显示目的地详细内容
      selectDestinationByDestinationId: function () {
        var _this = this;
        API.request({
          url: API.selectDestinationByDestinationId,
          method: 'post',
          headers: {token: this.userinfo.token, userId: this.userinfo.id},
          data: API.qs.stringify({
            destinationId: this.$route.query.id
          })
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.form = e.data.data;
              _this.getSubPlace(e.data.data.destinationName);
            }
            else {
              API.dialog({message: JSON.stringify(e.data.msg)})
            }
          }
          else {
            API.dialog({message: JSON.stringify(e.data.msg)})
          }
        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
      },
      isLogin: function () {
        if (localStorage.getItem("userInfo")) {
          return true;
        }
        else {
          return false;
        }
      },
      //根据目的地名称查询出对应的潜点，按照推荐查询出10个
      getSubPlace: function (v) {
        var _this = this;
        API.request({
          url: API.selectDiveByDestinationName,
          method: 'post',
          headers: {token: this.userinfo.token, userId: this.userinfo.id},
          data: API.qs.stringify({
            destinationName: v
          })
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              //todo
              //目的地的潜点
              _this.data = _this.exchangeData(e.data.data);
            }
            else {
              API.dialog({message: JSON.stringify(e.data.msg)})
            }
          }
          else {
            API.dialog({message: JSON.stringify(e.data.msg)})
          }
        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
      },
      getdata: function () {
        this.$refs.top.style.backgroundImage = this.form.img;
      },
      //瀑布流滚动加载
      onLoad: function () {
        var _this = this;
        if (this.data.length > 1) {
          this.setime = setTimeout(function () {
            for (let i = 0; i < 5; i++) {
              _this.data.push(_this.data.length + 1);
            }
            // 加载状态结束
            _this.loading = false;

            // 数据全部加载完成
            if (_this.data.length >= 20) {
              _this.finished = true;
            }
            else {
              clearTimeout(_this.setime);
              _this.onLoad();
            }
          }, 1000);
        }
        else {
          _this.loading = false;
          _this.finished = true;
        }
      },
      //点击前往潜点详情页面
      goto: function (id) {
        this.$router.push({path: 'Diving', query: {id: this.data[id].contentId}})
      },
      //转换数据
      exchangeData: function (v) {
        for (var i = 0, arr = v; i < arr.length; i++) {
          arr[i].title = arr[i].title.substr(0, 30);
          arr[i].updateTime = publicFn.dateYMD(arr[i].updateTime)
        }
        return arr;
      }
    }
  };
</script>
<style lang="less" scoped>
  .placeDetail {
    .top {
      width: 7.5rem;
      height: 4.08rem;
      background-color: #ccc;
      .bgImg {
        width: 7.5rem;
        height: 4.08rem;
        position: absolute;
        z-index: 1;
      }
      .topText {
        position: absolute;
        z-index: 10;
      }
      .name {
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        color: rgba(255, 255, 255, 1);
        line-height: 0.45rem;
        margin-left: 0.3rem;
      }
      .EnglishName,
      .decripe {
        font-size: 0.24rem;
        font-family: PingFangSC-Regular, PingFang SC;
        color: rgba(255, 255, 255, 1);
        line-height: 0.33rem;
        margin: 0.1rem 0 0 0.3rem;
      }
      .decripe {
        margin: 0.2rem 0.2rem 0 0.3rem;
      }
    }
    .contain {
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
      .hotBox {
        width: 6.9rem;
        height: 2.4rem;
        background: rgba(255, 255, 255, 1);
        box-shadow: 1px 1px 20px 0px rgba(230, 230, 230, 1);
        border-radius: 0.1rem;
        padding: 0.2rem;
        box-sizing: border-box;
        margin-bottom: 0.2rem;
        display: flex;
        .imgBox {
          width: 2.55rem;
          height: 2rem;
          margin-right: 0.2rem;
          img {
            width: 2.55rem;
            height: 2rem;

            border-radius: 0.1rem;
          }
        }

        div {
          position: relative;
          width: 100%;
          .title {
            font-size: 0.24rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(74, 74, 74, 1);
            line-height: 0.4rem;
          }
          .nameBox {
            font-size: 0.24rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            width: 100%;
            color: rgba(82, 189, 242, 1);
            line-height: 0.33rem;
            position: absolute;
            bottom: 0;
          }
        }
      }
    }

  }
</style>
