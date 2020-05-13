<template>
  <div id="FootPrint">
    <div class="top">
      <van-icon name="arrow-left" @click="$router.go(-1)"/>
      <p>我的足迹</p>
    </div>
    <div style="height:1.2rem"></div>
    <div class="middle" v-if="data!=''">
      <div v-for="(item_0,index_0) in data" :key="index_0" @click="goDiving(item_0)">
        <p>{{item_0.browserTime}}</p>

        <div class="cards">
          <img :src="item_0.image"/>

          <p>{{item_0.title}}</p>

          <p>
            <span>{{item_0.diveName}}</span>
            <span>{{item_0.publicationTime}}</span>
          </p>
        </div>
      </div>
    </div>
    <p class="black" v-else>记录为空</p>
  </div>
</template>
<script>
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    data: function () {
      return {
        data: [
//          {
//            browserTime: "2019年10月8日",
//            diveName: "诗巴丹",
//            title: "它和它的附属海岛就像是一个现实世界中的梦境之岛。",
//            publicationTime: "2019/07/12",
//            image: require("../../assets/image/gw/goutou.jpg")
//          }
        ]
      };
    },
    //初始化数据
    created: function () {
      if (localStorage.getItem("userInfo")) {
        this.userinfo = JSON.parse(localStorage.getItem("userInfo"));
        this.init();
      }
      else {
        this.$router.push({path: '/Login'});
      }
    },
    methods: {
      init: function () {
        var _this = this;
        //调用-浏览历史列表接口
        API.request({
          url: API.browserHistoryList,
          method: "post",
          headers: {token: this.userinfo.token, userId: this.userinfo.id}
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              //todo
              _this.data = _this.exchangeData(e.data.data || []);
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
      //去潜点/目的地详情
      goDiving: function (row) {
        if (row.type == 1) {
          //去潜点详情
          this.$router.push({path: "/Diving", query: {id: row.contentId}})
        }
        else {
          //目的地详情
          this.$router.push({path: "/placeDetail", query: {id: row.contentId}})
        }
      },
      //数据转换
      exchangeData: function (v) {
        for (var i = 0, arr = v, now = ''; i < arr.length; i++) {
          now = new Date(publicFn.Time2Timestamps(arr[i].browserTime));
          var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
          if (arr[i].browserTime) {
            arr[i].browserTime = arr[i].browserTime.split(' ')[0] + " " + weekday[now.getDay()] + " " + arr[i].browserTime.split(' ')[1];
          }
          arr[i].publicationTime = publicFn.dateYMD(publicFn.Time2Timestamps(arr[i].publicationTime));
        }
        return arr;
      }
    }
  };
</script>
<style lang="less" scoped>
  #FootPrint {
    .top {
      height: 1.2rem;
      line-height: 1.2rem;
      width: 100%;
      background: #fff;
      position: fixed;
      .van-icon {
        float: left;
        margin-left: 0.3rem;
        font-size: 0.45rem;
        line-height: 1.2rem;
      }
      p {
        width: fit-content;
        margin: auto;
        font-size: 0.32rem;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
    }
    .middle {
      margin-bottom: 0.2rem;
      > div {
        > p {
          font-size: 0.28rem;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          line-height: 0.4rem;
          margin: 0.3rem 0 0.2rem 0.3rem;
        }
      }
    }
    .cards {
      width: 6.9rem;
      height: 2.4rem;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0.01rem 0.01rem 0.2rem 0rem rgba(230, 230, 230, 1);
      border-radius: 0.1rem;
      padding: 0.2rem;
      box-sizing: border-box;
      margin-left: 0.3rem;
      &:not(:last-child) {
        margin-bottom: 0.2rem;
      }
      img {
        width: 2.5rem;
        height: 2rem;
        float: left;
        margin-right: 0.2rem;
      }
      p:nth-of-type(1) {
        font-size: 0.24rem;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        line-height: 0.4rem;
        height: 1.7rem;
      }
      p:nth-of-type(2) {
        font-size: 0;
        font-weight: 400;
        line-height: 0.33rem;
        span:nth-child(1) {
          font-size: 0.24rem;
          color: rgba(82, 189, 242, 1);
          margin-right: 0.2rem;
        }
        span:nth-child(2) {
          font-size: 0.24rem;
          color: rgba(204, 204, 204, 1);
        }
      }
    }
    .black {
      font-size: 0.32rem;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
      line-height: 0.45rem;
      margin: 4.85rem auto 0;
      width: fit-content;
    }
  }
</style>
