<template>
  <div id="My">
    <div class="top">
      <img src="../../assets/image/gw/8.png"/>
      <img :src="headpic"  />

      <p>{{name}}</p>

      <div>
        <p @click="$router.push('/Personal')">
          <span>个人介绍：{{introduce}}</span>
          <img src="../../assets/image/gw/13.png"/>
        </p>
      </div>
    </div>
    <div class="gray"></div>
    <div class="middle">
      <div @click="$router.push('/Collection')">
        <img src="../../assets/image/gw/9.png"/>

        <p>收藏</p>
      </div>
      <div @click="$router.push('/FootPrint')">
        <img src="../../assets/image/gw/10.png"/>

        <p>足迹</p>
      </div>
    </div>
    <div class="gray"></div>
    <div class="bottom">
      <div @click="$router.push('/Set')">
        <img src="../../assets/image/gw/11.png"/>

        <p>设置</p>
        <img src="../../assets/image/gw/18.png"/>
      </div>
      <div @click="$router.push('/Feedback')">
        <img src="../../assets/image/gw/12.png"/>

        <p>用户反馈</p>
        <img src="../../assets/image/gw/18.png"/>
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
        userinfo: null,
        headpic: require("../../assets/image/gw/goutou.jpg"),
        name: "未注册/未登录",
        introduce: ""
      };
    },
    //初始化数据
    created: function () {
      if (localStorage.getItem("userInfo")) {
        this.userinfo = JSON.parse(localStorage.getItem("userInfo"));
      }
      else {
        this.userinfo = {id: "1234", token: "afasfsdf"};
      }
      this.init();
    },
    methods: {
      init: function () {
        if (localStorage.getItem("userInfo")) {
          this.headpic = this.userinfo.headPic;
          this.name = this.userinfo.userName.substr(0, 20) || "";
          this.introduce = this.userinfo.personalProfile.substr(0, 35) || "";
        }
      },
//      goLogin: function () {
//        publicFn.setStore('diving', '1');
//        this.$router.push({path: '/Login'});
//      }
    }
  };
</script>
<style lang="less" scoped>
  #My {
    position: relative;
    .top {
      .intro {
        width: 80%;
      }
      height: 3.7rem;
      > img:nth-child(1) {
        position: absolute;
        width: 100%;
        top: -0.4rem;
        z-index: 0;
      }
      > img:nth-child(2) {
        width: 1.62rem;
        height: 1.62rem;
        border-radius: 50%;
        position: absolute;
        top: 1.48rem;
        left: 0.29rem;
        z-index: 2;
      }
      > p {
        font-size: 0.4rem;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 0.56rem;
        padding: 1.5rem 0 0.22rem 2.08rem;
        position: relative;
      }
      > div {
        height: 1.42rem;
        background: rgba(255, 255, 255, 1);
        border-radius: 0.2rem 0.2rem 0rem 0rem;
        position: relative;
        p {
          font-size: 0.24rem;
          font-weight: 400;
          color: rgba(74, 74, 74, 1);
          line-height: 0.33rem;
          padding: 0.42rem 0.3rem 0 2.08rem;
        }
        img {
          float: right;
          width: 0.14rem;
          margin-top: 0.04rem;
        }
      }
    }
    .gray {
      width: 7.5rem;
      height: 0.1rem;
      background: rgba(245, 245, 245, 1);
    }
    .middle {
      padding: 0 0 0 0.3rem;
      div {
        display: flex;
        height: 0.99rem;
        align-items: center;
        img {
          width: 0.36rem;
          margin-right: 0.34rem;
        }
        p {
          font-size: 0.32rem;
          font-weight: 400;
          color: rgba(74, 74, 74, 1);
        }
      }
      div:nth-child(1) {
        border-bottom: 0.02rem solid #f5f5f5;
      }
    }
    .bottom {
      padding: 0 0 0 0.3rem;
      div {
        display: flex;
        height: 0.99rem;
        align-items: center;
        img:nth-child(1) {
          width: 0.36rem;
          margin-right: 0.4rem;
        }
        p {
          font-size: 0.32rem;
          font-weight: 400;
          color: rgba(74, 74, 74, 1);
        }
        img:nth-child(3) {
          width: 0.17rem;
          margin: 0 0.3rem 0 auto;
        }
      }
      div:nth-child(1) {
        border-bottom: 0.02rem solid #f5f5f5;
      }
    }
  }
</style>
