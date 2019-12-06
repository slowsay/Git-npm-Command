<template>
  <div class="atme">
    <div class="top">
      <navbar></navbar>
    </div>
    <div class="contain">
      <div class="box" v-for="(item,index) in form" :key="index">
        <div class="imgbox">
          <img :src="item.userImg" alt/>
        </div>
        <div class="user">
          <p class="userName">{{item.username}}</p>

          <p class="title">{{item.title}}</p>

          <p class="date">{{item.date}} @了你</p>
        </div>
        <div class="shopImg">
          <img :src="item.shopImg" alt/>
        </div>
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
        form: [
//          {
//            userImg: require("../../assets/image/zxw/user.png"),
//            username: "用户昵称",
//            title: "哈哈哈哈哈，你咋回事呢？",
//            date: "2019-12-11",
//            shopImg: require("../../assets/image/zxw/shop.png")
//          }
        ]
      };
    },
    created: function () {
      if (publicFn.getStore('asxUserInfo')) {
        this.userinfo = JSON.parse(publicFn.getStore('asxUserInfo'));
        this.init();
      }
      else {
        this.$router.push('/Login');
      }
    },
    methods: {
      init: function () {
        this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id};
        //获取我的系统通知列表
        this.toMyInfoList();
      },
      //获取我的系统通知列表
      toMyInfoList: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.toMyInfoList,
          headers: this.headerobj,
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.form = e.data.data || [];
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
      }
    }
  };
</script>

<style lang="less" scoped>
  .contain {
    background-color: #fafafa;
    position: absolute;
    width: 7.5rem;
    left: 0;
    bottom: 0;
    top: 0.88rem;
    box-sizing: border-box;
  }

  .box {
    width: 7.5rem;
    padding: 0.3rem .3rem 0.3rem .3rem;
    box-sizing: border-box;
    display: flex;
    border-bottom: .01rem solid #F0F0F0;
    background-color: #fff;
  }

  .imgbox {
    margin-right: .2rem;
    img {
      width: 0.8rem;
      height: 0.8rem;
    }
  }

  .user {
    width: 4rem;
    .userName {
      font-size: 0.3rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 0.36rem;
    }
    .title {
      font-size: 0.26rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 0.36rem;
      margin-top: .16rem;
    }
    .date {
      font-size: 0.26rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(204, 204, 204, 1);
      line-height: 0.36rem;
      margin-top: .12rem;
    }
  }

  .shopImg {
    width: 1.2rem;
    height: 1.2rem;
    margin-left: auto;
    img {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
</style>
