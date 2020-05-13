<template>
  <div id="Set">
    <div class="top">
      <van-icon name="arrow-left" @click="$router.go(-1)"/>
      <p>设置</p>
    </div>
    <div class="middle">
      <p>消息提醒设置</p>
      <van-switch v-model="checked" active-color="#52BDF2" @change="setHandle" inactive-color="#E6E6E6"/>
    </div>
    <div class="footer">
      <van-button @click="quitHandle">退出</van-button>
    </div>
  </div>
</template>

<script>
  import API from '../../api/index';
  export default {
    data: function () {
      return {
        headerobj: {},
        checked: true
      };
    },
    created: function () {
      if (localStorage.getItem("userInfo")) {
        this.userinfo = JSON.parse(localStorage.getItem("userInfo"));
        this.init();
      }
      else {
        this.$router.push('/Login');
      }
    },
    methods: {
      init: function () {
        this.headerobj = {
          token: this.userinfo.token,
          userId: this.userinfo.id
        };
        //msgOpen  1 开启 2 关闭
        this.checked = this.userinfo.msgOpen == 1 ? true : false;

      },
      //消息列表
      selectNotice: function () {
        var _this = this;
        API.request({
          url: API.selectNotice,
          method: 'post',
          headers: this.headerobj,
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
            }
          }
        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
      },
      setHandle: function (val) {
        console.log(val);
        var params = {type: val ? 1 : 2};
        this.noticeSet(params)
      },
      noticeSet: function (params) {
        var _this = this;
        API.request({
          url: API.noticeSet,
          method: 'post',
          headers: this.headerobj,
          data: API.qs.stringify(params)
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.userinfo.msgOpen = params.type;
              localStorage.setItem("userInfo", JSON.stringify(_this.userinfo))
              _this.init();
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
      //退出
      quitHandle: function () {
        var _this = this;
        API.request({
          url: API.loginOut,
          method: 'post',
          headers: this.headerobj,
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              localStorage.clear();
              _this.$router.push({path: '/My'});
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
  #Set {
    .top {
      height: 1.2rem;
      line-height: 1.2rem;
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
      height: 1rem;
      display: flex;
      align-items: center;
      padding: 0 0.3rem;
      p {
        font-size: 0.28rem;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        line-height: 0.4rem;
      }
      .van-switch {
        margin-left: auto;
        font-size: 0.46rem !important;
      }
    }
    .footer {
      .van-button {
        width: 100%;
      }
    }
  }
</style>
