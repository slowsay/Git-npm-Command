<template>
  <div class="system">
    <div class="image">
      <img src="../../assets/image/zch/mess.png" alt/>
    </div>
    <div class="text">
      <h4 class="title">{{data.title}}</h4>
      <img :src="data.pic"/>

      <p class="name" v-html="data.content"></p>
    </div>
  </div>
</template>

<script>
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    data: function () {
      return {
        data: {
          title: '',
          content: '',
          pic: '',
        }
      };
    },
    created: function () {
      if (publicFn.getStore("qluserInfo")) {
        this.userinfo = JSON.parse(publicFn.getStore("qluserInfo"));
      }
      else {
        this.userinfo = {token: "qltoken", id: '1'};
      }
      this.init();
    },
    methods: {
      init: function () {
        this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id};
        //系统通知详情页面
        this.systemDesc();
      },
      //系统通知详情页面
      systemDesc: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.systemDesc,
          headers: this.headerobj,
          data: API.qs.stringify({id: this.$route.query.id})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.data = e.data.data;
            }
            else {
              _this.$message.error(JSON.stringify(e.data.msg));
            }
          }
          else {
            _this.$message.error(JSON.stringify(e.data.msg));
          }

        }).catch(function (e) {
          _this.$message.error(JSON.stringify(e));
        })
      }
    }
  };
</script>

<style lang="less" scoped>
  .system {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    .image {
      width: 1280px;
      height: 400px;
      margin: 20px 0 30px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .text {
      width: 1280px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 180px;
      .title {
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(74, 74, 74, 1);
        line-height: 40px;
      }
      .name {
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(74, 74, 74, 1);
        line-height: 40px;
        margin-top: 23px;
      }
    }
  }
</style>
