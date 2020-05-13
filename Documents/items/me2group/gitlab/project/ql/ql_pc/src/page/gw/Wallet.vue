<template>
  <div id="Wallet">
    <div class="top">
      <div>
        <p>我的钱包</p>
      </div>
      <div></div>
    </div>
    <div class="body">
      <p>账户余额(元)</p>

      <p>{{amount}}</p>
      <el-button @click="$router.push('/pay')">充值</el-button>
      <p>明细</p>

      <div>
        <p @click="viewHandle(0)" :class="{active:state==0}">全部</p>

        <p @click="viewHandle(1)" :class="{active:state==1}">收入</p>

        <p @click="viewHandle(2)" :class="{active:state==2}">支出</p>
      </div>
      <div class="card">
        <div v-for="(item,index) in data" :key="index">
          <div v-if="item.state==state||state==0">
            <p>
              <span>{{item.desc}}</span>
              <span>{{item.amount}}</span>
            </p>

            <p>
              <span>{{item.createTime}}</span>
              <span>{{item.status}}</span>
            </p>
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
        amount: 0,
        state: 0, //0全部 1收入 2支出
        data: [
//          {
//            title: "购买500积分",
//            amount: "-100元",
//            time: "2019.08.20 12:21",
//            status: "支付成功",
//            state: 1 //1收入 2支出
//          },
        ]
      };
    },
    created: function () {
      if (publicFn.getStore("qluserInfo")) {
        this.userinfo = JSON.parse(publicFn.getStore("qluserInfo"));
        this.init();
      }
      else {
        this.$router.push('/Login');
      }
    },
    methods: {
      init: function () {
        this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id};

        //余额
        this.walletQuery(0);
        //明细
        this.walletDetails();
      },
      viewHandle: function (state) {
        this.state = state;
        this.walletDetails(state);
      },
      //余额
      walletQuery: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.walletQuery,
          headers: this.headerobj,
          data: API.qs.stringify({userId: this.userinfo.id})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.amount = e.data.data || 0;
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
      //明细
      walletDetails: function (state) {
        var _this = this;
        API.request({
          method: "post",
          url: API.walletDetails,
          headers: this.headerobj,
          data: API.qs.stringify({state: state})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.data = e.data.data || 0;
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
  #Wallet {
    .top {
      > div:nth-child(1) {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin: 30px 0 10px;
        p:nth-child(1) {
          font-size: 28px;
          font-weight: 500;
          color: rgba(74, 74, 74, 1);
          line-height: 40px;
        }
      }
      > div:nth-child(2) {
        border-bottom: 5px dotted #4a4a4a;
      }
    }
    .body {
      width: 980px;
      margin-top: 30px;
      box-sizing: border-box;
      border: 4px solid rgba(245, 245, 245, 1);
      > p:nth-child(1) {
        font-size: 22px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(74, 74, 74, 1);
        line-height: 30px;
        margin: 16px 0 0 30px;
      }
      > p:nth-child(2) {
        margin-top: 28px;
        text-align: center;
        font-size: 48px;
        font-weight: 500;
        color: rgba(74, 74, 74, 1);
        line-height: 67px;
      }
      .el-button {
        display: block;
        margin: 30px auto;
        width: 275px;
        height: 69px;
        background: rgba(255, 148, 148, 1);
        font-size: 28px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
      > p:nth-child(4) {
        font-size: 22px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(74, 74, 74, 1);
        line-height: 40px;
        padding-left: 30px;
        background: rgba(230, 230, 230, 1);
      }
      > div:nth-child(5) {
        padding: 10px 30px;
        display: flex;
        p {
          width: 55px;
          height: 30px;
          border-radius: 4px;
          border: 1px solid rgba(151, 151, 151, 1);
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(74, 74, 74, 1);
          line-height: 30px;
          text-align: center;
          margin-right: 20px;
        }
        .active {
          color: rgba(255, 255, 255, 1);
          background: rgba(74, 74, 74, 1);
        }
      }
    }
    .card {
      padding: 0 30px;
      > div > div {
        p:nth-child(1) {
          font-size: 20px;
          font-weight: 500;
          color: rgba(74, 74, 74, 1);
          line-height: 28px;
          margin: 19px 0 6px;
        }
        p:nth-child(2) {
          font-size: 14px;
          font-weight: 500;
          color: rgba(155, 155, 155, 1);
          line-height: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #f5f5f5;
        }
        span:nth-child(2) {
          float: right;
        }
      }
    }
  }
</style>
