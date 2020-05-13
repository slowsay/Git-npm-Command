<template>
  <div id="Collection">
    <div class="top">
      <van-icon name="arrow-left" @click="$router.go(-1)"/>
      <p @click="state=1" v-if="data.length>0&&state==0">管理</p>

      <p @click="state=0" v-else-if="data.length>0&&state==1">完成</p>

      <p v-else>&nbsp;</p>

      <p>我的收藏</p>
    </div>
    <div style="height:1.5rem"></div>
    <div v-if="data!=''">
      <div class="middle" v-for="(item_1,index_1) in data" :key="index_1">
        <div class="check" v-if="state==1">
          <img
            v-if="item_1.check==undefined||item_1.check==0 "
            @click="item_1.check=1,$forceUpdate(),yesHandle(item_1)"
            src="../../assets/image/gw/20.png"
          />
          <img v-else @click="item_1.check=0,$forceUpdate(),noHandle(item_1)" src="../../assets/image/gw/19.png"/>
        </div>
        <div class="cards" :class="{active_0:state==1}">
          <img :src="item_1.image" @click="goDiving(item_1)"/>

          <p @click="goDiving(item_1)">{{item_1.title}}</p>

          <p @click="goDiving(item_1)">
            <span>{{item_1.diveName}}</span>
            <span>{{item_1.times}}</span>
          </p>
        </div>
      </div>
    </div>
    <p class="black" v-else>暂无收藏</p>

    <div class="bottom" :class="{active_1:state==1}">
      <img v-if="checked==0" @click="SelectAll(0)" src="../../assets/image/gw/20.png"/>
      <img v-else @click="SelectAll(1)" src="../../assets/image/gw/19.png"/>

      <p>全选</p>
      <van-button @click="delHandle">删除</van-button>
    </div>
  </div>
</template>
<script>
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    data: function () {
      return {
        userinfo: null,
        state: 0,
        checked: 0,
        data: [
//          {
//            collectId: 0,
//            diveName: "诗巴丹",
//            title: "它和它的附属海岛就像是一个现实世界中的梦境之岛。",
//            times: "2019/07/12",
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
        //收藏列表
        this.collectList();
      },
      yesHandle: function (row) {
        for (var i = 0, p = [], arr = this.data; i < arr.length; i++) {
          if (arr[i].check == 1) {
            p.push(arr[i]);
          }
        }
        if (this.data.length == p.length) {
          this.checked = 1;
        }
      },
      noHandle: function (row) {
        for (var i = 0, p = [], arr = this.data; i < arr.length; i++) {
          if (arr[i].check == 1) {
            p.push(arr[i]);
          }
        }
        if (p.length < this.data.length) {
          this.checked = 0;
        }
      },
      //收藏列表
      collectList: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.collectList,
          headers: {token: this.userinfo.token, userId: this.userinfo.id}
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              //todo
              _this.data = _this.exchangeData(e.data.data);
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
      //删除
      delHandle: function () {
        for (var i = 0, conid = [], arr = this.data; i < arr.length; i++) {
          if (arr[i].check) {
            conid.push(arr[i].collectId)
          }
        }
        if (conid.length < 1) {
          API.dialog({message: "没有可删除项"});
        } else {
          conid = conid.join(',');
          this.cancelCollect(conid);
        }
      },
      //调用-取消收藏接口
      cancelCollect: function (conid) {
        var _this = this;
        API.request({
          method: "post",
          url: API.cancelCollect,
          headers: {token: this.userinfo.token, userId: this.userinfo.id},
          data: API.qs.stringify({collectIds: conid})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              API.dialog({message: "删除成功"});
              _this.$router.go(0);
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
      //去潜点详情
      goDiving: function (row) {
        this.$router.push({path: "/Diving", query: {id: row.contentId}})
      },
      //数据转换
      exchangeData: function (v) {
        for (var i = 0, arr = v; i < arr.length; i++) {
          arr[i].times = publicFn.dateYMD(publicFn.Time2Timestamps(arr[i].time));
        }
        return arr;
      },
      //全选
      SelectAll: function (val) {
        if (val == 0) {
          for (let a = 0; a < this.data.length; a++) {
            this.data[a].check = 1;
          }
          this.checked = 1;
        } else {
          for (let a = 0; a < this.data.length; a++) {
            this.data[a].check = 0;
          }
          this.checked = 0;
        }
      }
    }
  };
</script>
<style lang="less" scoped>
  #Collection {
    width: 7.5rem;
    overflow: hidden;
    .top {
      height: 1.2rem;
      line-height: 1.2rem;
      position: fixed;
      top: 0;
      width: 100%;
      background: #fff;
      z-index: 999;
      .van-icon {
        float: left;
        margin-left: 0.3rem;
        font-size: 0.45rem;
        line-height: 1.2rem;
      }
      p:nth-child(2) {
        float: right;
        font-size: 0.28rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        line-height: 1.2rem;
        margin-right: 0.3rem;
      }
      p:nth-child(3) {
        width: fit-content;
        margin: auto;
        font-size: 0.32rem;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
    }
    .check {
      float: left;
      width: 0.6rem;
      height: 2.4rem;
      margin-left: 0.3rem;
      line-height: 2.4rem;
      img {
        width: 0.3rem;
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
      margin-bottom: 0.2rem;
      position: relative;
      transition: margin-left 0.3s;
      img {
        position: absolute;
        width: 2.5rem;
        height: 2rem;
        left: 0.2rem;
      }
      p:nth-of-type(1) {
        font-size: 0.24rem;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        line-height: 0.4rem;
        height: 1.7rem;
        margin-left: 2.7rem;
      }
      p:nth-of-type(2) {
        font-size: 0;
        font-weight: 400;
        line-height: 0.33rem;
        margin-left: 2.7rem;
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
    .active_0 {
      margin-left: 0.9rem;
    }
    .black {
      font-size: 0.32rem;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
      line-height: 0.45rem;
      margin: 4.85rem auto 0;
      width: fit-content;
    }

    .bottom {
      position: fixed;
      bottom: 1.2rem;
      display: flex;
      width: 7.5rem;
      height: 0rem;
      overflow: hidden;
      box-sizing: border-box;
      background: rgba(242, 242, 242, 1);
      z-index: 1000;
      padding: 0 0.3rem;
      align-items: center;
      transition: height 0.3s;
      img {
        width: 0.3rem;
        padding-right: 0.2rem;
      }
      p {
        font-size: 0.28rem;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        line-height: 0.4rem;
      }
      .van-button {
        width: 1.64rem;
        height: 0.6rem;
        background: linear-gradient(
          180deg,
          rgba(138, 224, 250, 1) 0%,
          rgba(82, 189, 242, 1) 100%
        );
        border-radius: 0.3rem;
        border: none;
        font-size: 0.28rem;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 0.6rem;
        margin-left: auto;
      }
    }
    .active_1 {
      height: 1rem;
    }
  }
</style>
