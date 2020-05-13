<template>
  <div class="pay">
    <div class="top">
      <!--<navbar></navbar>-->
    </div>
    <div class="contain">
      <!-- 表格模块 -->
      <div class="form">
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column prop="info" label="商品信息" width="400">
            <template slot-scope="scope">
              <img class="shopImg" :src="scope.row.photo"/>

              <div class="infoBox">
                <p class="title">{{scope.row.name}}</p>

                <p class="type">{{scope.row.normName}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="单价" width="180" :formatter="add"></el-table-column>
          <el-table-column prop="buyCount" label="数量"></el-table-column>
          <el-table-column prop="email" label="邮费" :formatter="email"></el-table-column>
          <el-table-column prop="couponPirce" label="优惠券" :formatter="coypon"></el-table-column>
          <el-table-column prop="sum" label="合计" :formatter="sum">
            <template slot-scope="scope">
              {{scope.row.price*scope.row.buyCount+scope.row.email-scope.row.couponPirce}}
            </template>
          </el-table-column>
          <el-table-column prop="desc" label="备注"></el-table-column>
        </el-table>
      </div>
      <div class="payType">
        <div class="payTitle">选择支付方式</div>
        <div class="itemBox">
          <div
            v-for="(item,index) in payData"
            :key="index"
            class="payBox"
            :class="{red : changeRed ==index}"
            @click="payHandle(item,index)"
          >
            <div>
              <el-radio size="medium" v-model="radio" :label="item.index">&nbsp;</el-radio>
              <img class="iconImg" :src="item.img" alt/>
              <span>{{item.payname}}</span>
            </div>
            <div class="payMoney" :class="{showMoney: changeRed==index}" @click="payHandle(item,index)">
              支付
              <span class="money">{{item.money}}</span>元
            </div>
          </div>
          <div class="center">
            <button @click="confirmPay" class="payContent">确认付款</button>
            <button @click="$router.go(-1)" class="canclePay">取消付款</button>

          </div>
        </div>
      </div>
    </div>
    <!--<rightNav></rightNav>-->
    <!--<Bottom></Bottom>-->
  </div>
</template>
<script>
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    data: function () {
      return {
        changeRed: 0,
        radio: 0,
        //支付类型数据
        form: {
          money: "0"
        },
        payData: [
          {
            index: 0,
            img: require("../../assets/image/zxw/zhifubao.png"),
            payname: "支付宝",
            money: "0"
          },
          {
            index: 1,
            img: require("../../assets/image/zxw/chat.png"),
            payname: "微信支付",
            money: "0"
          }
        ],
        tableData: [
//          {
//            title: "专柜洋风二代陶瓷锅煲汤炖煮砂锅耐高温健康煮qereqwrwerwerwqerqwer饭粥锅陶锅",
//            color: "红色",
//            size: "5.5L",
//            type: "配餐具",
//            img: require("../../assets/image/zxw/typeImg1.png"),
//            info: "夸奖哈首付款",
//            price: 200,
//            account: 10,
//            email: 20,
//            coypon: 200,
//            sum: 3000,
//            remark: "空间和付款计划哈快捷回复卡后即可"
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
        //订单内商品信息列表
        this.payShoplist();
      },
      //汇总
      summaryData: function () {
        for (var i = 0, summSum = 0, couponSum = 0, arr = this.tableData; i < arr.length; i++) {
          summSum += arr[i].price * arr[i].buyCount + arr[i].email;
          couponSum += arr[i].couponPirce;
        }
        this.form.originMomey = summSum;
        this.form.youhui = couponSum;
        this.form.all = summSum - couponSum;
        this.payStyleSum(this.form.all);
      },
      confirmPay: function () {
        var _type = this.changeRed, params = {};
        if (_type == 0) {
          //支付宝
          params = {contactId: this.$route.query.id, amount: this.form.all, type: 1};
          this.payAli(params);
        }
        else if (_type == 1) {
          //微信
          params = {contactId: this.$route.query.id, amount: this.form.all, type: 1};
          this.payWexin(params);
        }
      },
      //支付宝支付
      payAli: function (params) {
        var _this = this;
        API.request({
          method: "post",
          url: API.payAli,
          headers: this.headerobj,
          data: API.qs.stringify(params)
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success("支付成功");
              _this.$router.push('/paySuccess');
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
      //微信支付
      payWexin: function (params) {
        var _this = this;
        API.request({
          method: "post",
          url: API.payWexin,
          headers: this.headerobj,
          data: API.qs.stringify(params)
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success("支付成功");
              _this.$router.push('/paySuccess');
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
      //选择支付方式
      payHandle: function (row, index) {
        this.changeRed = index;
        this.radio = index;
      },
      payStyleSum: function (v) {
        for (var i = 0, arr = this.payData; i < arr.length; i++) {
          arr[i].money = v;
        }
      },
      //订单内商品信息列表
      payShoplist: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.payShoplist,
          headers: this.headerobj,
          data: API.qs.stringify({ordId: this.$route.query.id})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.tableData = _this.exchangeData(e.data.data);
              _this.summaryData();
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
      add: function (row, column) {
        return "￥" + row.price;
      },
      email: function (row, column) {
        return "￥" + row.email;
      },
      coypon: function (row, column) {
        return "￥" + row.couponPirce || 0;
      },
      sum: function (row, column) {
        return "￥" + (row.price * row.buyCount + row.email - row.couponPirce);
      },
      exchangeData: function (v) {
        for (var i = 0, arr = v; i < arr.length; i++) {
          arr[i].email = arr[i].email || 0;
        }
        return arr;
      }

    }
  };
</script>
<style lang="less" scoped>
  .pay {
    margin: 0 auto;
    .top {
      width: 1280px;
      margin: 40px auto;
    }
    .contain {
      width: 1280px;
      margin: 0 auto;
      box-sizing: border-box;
      /deep/ .el-table_1_column_6 {
        color: red;
      }
      /deep/ .el-table_1_column_5 {
        color: red;
      }
      /deep/ .is-leaf {
        color: #000000;
      }
      .shopImg {
        width: 100px;
        height: 100px;
        border-radius: 4px;
      }
      .infoBox {
        float: right;
        width: 250px;
        height: 100px;
        // border: 1px solid red;
        .title {
          font-size: 16px;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 24px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .type {
          font-size: 16px;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 24px;
          margin-top: 30px;
        }
      }
      .payType {
        font-size: 30px;
        font-family: DFYuanW5-GB;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 60px;
        margin-top: 20px;
        /deep/ .el-radio__input {
          line-height: 3;
        }
        /deep/ .el-radio__inner {
          width: 20px;
          height: 20px;
        }
        .payTitle {
          border-bottom: 4px dotted #ccc;
          margin-bottom: 20px;
        }
        .payBox {
          width: 1280px;
          box-sizing: border-box;
          height: 84px;
          padding: 10px 32px;
          display: flex;
          align-items: center;
          border: 4px solid #fff;
          justify-content: space-between;
          img {
            margin: 0 10px;
          }
        }
        .payMoney {
          float: right;
          .money {
            font-size: 30px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(224, 18, 32, 1);
          }
        }
      }
    }
    .canclePay {
      width: 260px;
      height: 70px;
      border-radius: 4px;
      border: 1px solid rgba(74, 74, 74, 1);
      font-size: 24px;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: #4A4A4A;
      float: right;
      margin: 40px 0;
      background-color: #fff;
      box-sizing: border-box;
      margin-right: 20px;
    }
    .payContent {
      width: 260px;
      height: 70px;
      background: #FF9494;
      border-radius: 4px;
      font-size: 24px;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      border: none;
      float: right;
      margin: 40px 0;
    }
    .red {
      border: 4px solid #FF0000 !important;
      box-sizing: border-box;
      border-radius: 10px;
    }
    .payMoney {
      display: none;
    }
    .showMoney {
      display: block;
    }
    .center {
      overflow: auto;
    }
  }
</style>
