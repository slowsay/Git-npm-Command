<template>
  <div class="sendTie">
    <div class="top">
      <navbar></navbar>
      <div @click="send" :class="value!=''&&value1!=''?'redsend':'send'">发布</div>
    </div>
    <div class="contain">
      <van-cell-group>
        <van-field v-model="value" placeholder="请输入贴子标题" size=".3rem"/>
        <van-field v-model="value1" type="textarea" autosize placeholder="请输入贴子内容 ~"
                   size=".26rem"/>
      </van-cell-group>
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
        headerobj: {},
        value: "",
        value1: ''
      }
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
      },
      //调用-发送接口
      send: function () {
        var _this = this;
        if (this.value != '' && this.value1 != '') {
          API.request({
            method: "post",
            url: API.BBSPublishPost,
            headers: this.headerobj,
            data: API.qs.stringify({keywords: this.userinfo.id})
          }).then(function (e) {
            if (e.data.code == 200) {
              if (e.data.success) {
                API.dialog({message: API.msg.SUCCESS_ISSUE});
                _this.$router.go(-1);
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
    }
  }
</script>

<style lang="less" scoped>
  .top {
    .send {
      float: right;
      margin: -.56rem .32rem 0 0;
      font-size: .28rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(204, 204, 204, 1);
      line-height: .36rem;
    }
    .redsend {
      float: right;
      margin: -.56rem .32rem 0 0;
      font-size: .28rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: #E01220;
      line-height: .36rem;
    }
  }
</style>
