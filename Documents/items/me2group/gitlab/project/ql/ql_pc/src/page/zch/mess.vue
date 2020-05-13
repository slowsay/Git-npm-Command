<template>
  <div class="mess">
    <div class="content">
      <!-- 订单通知 -->
      <div class="inform">
        <h4 class="title">订单通知</h4>

        <div class="cont">
          <p class="name">您的订单待支付</p>

          <div class="shop" v-for="(item,j) of shop" :key="j" @click="orderHandle(item)">
            <div>
              <img :src="item.photo" alt/>
            </div>
            <p class="self">{{item.name}}</p>
          </div>
        </div>
      </div>
      <!-- 系统通知 -->
      <div class="inform">
        <h4 class="title">系统通知</h4>

        <div class="cont">
          <div class="shop" v-for="(item,j) of inform" :key="j" @click="systemHandle(item)">
            <div>
              <img :src="item.photo" alt/>
            </div>
            <p class="self">{{item.name}}</p>
          </div>
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
        shop: [],
        inform: []
      };
    },
    created: function () {
      if (publicFn.getStore("qluserInfo")) {
        this.userinfo = JSON.parse(publicFn.getStore("qluserInfo"));
        this.init();
      }
      else {
        this.$router.push('/Login')
      }
    },
    methods: {
      init: function () {
        this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id};

        //订单列表
        this.orderMessageList();

        //系统列表
        this.systemMessageList();
      },
      //订单列表
      orderMessageList: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.myMsglist,
          headers: this.headerobj,
          data: API.qs.stringify({type: 1})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.shop = e.data.data;
            }
            else {
              _this.$message.error(JSON.stringify(e.data.msg));
            }
          }
          else {
            _this.$message.error(JSON.stringify(e.data.msg));
          }

        }).catch(function (e) {
          console.log(e)
          _this.$message.error(JSON.stringify(e));
        })
      },
      //系统列表
      systemMessageList: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.myMsglist,
          headers: this.headerobj,
          data: API.qs.stringify({type: 2})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.inform = e.data.data;
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
      },
      orderHandle: function (row) {
        this.$router.push({path: "/mess_details", query: {id: row.id}});
      },
      systemHandle: function (row) {
        this.$router.push({path: "/mess_details", query: {id: row.id}});
      }
    }
  }
  ;
</script>

<style lang="less" scoped>
  .mess {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    .content {
      width: 1280px;
      .inform {
        width: 1280px;
        padding: 30px;
        box-sizing: border-box;
        .title {
          font-size: 28px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
          line-height: 40px;
        }
        .cont {
          margin-top: 20px;
          border: 4px solid rgba(245, 245, 245, 1);
          padding: 47px 30px 0;
          .name {
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(0, 0, 0, 1);
            line-height: 28px;
            margin-left: 26px;
          }
          .shop {
            display: flex;
            align-items: center;
            border-bottom: 1px solid #F5F5F5;
            img {
              width: 103px;
              height: 103px;
            }
            p.self {
              font-size: 20px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(74, 74, 74, 1);
              line-height: 28px;
              margin-left: 30px;
            }
          }
        }
      }
      .inform:nth-child(2) {
        margin-bottom: 298px;
        .cont {
          .shop {
            margin-bottom: 57px;
            img {
              width: 80px;
              height: 36px;
            }
          }
        }
      }
    }
  }
</style>
