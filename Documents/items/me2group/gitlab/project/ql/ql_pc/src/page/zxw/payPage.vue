<template>
  <div class="pay">
    <div class="top">
      <navbar></navbar>
    </div>
    <div class="contain">
      <!-- 表格模块 -->
      <div class="form">
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column prop="info" label="商品信息" width="400">
            <template slot-scope="scope">
              <img class="shopImg" :src="scope.row.img" alt />
              <div class="infoBox">
                <p class="title">{{scope.row.title}}</p>
                <p class="type">{{scope.row.color+'/'+scope.row.size+'/'+scope.row.type}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="单价" width="180" :formatter="add"></el-table-column>
          <el-table-column prop="account" label="数量"></el-table-column>
          <el-table-column prop="email" label="邮费" :formatter="email"></el-table-column>
          <el-table-column prop="coypon" label="优惠券" :formatter="coypon"></el-table-column>
          <el-table-column prop="sum" label="合计" :formatter="sum"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
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
            @click="reds(index)"
          >
            <div>
              <el-radio size="medium" v-model="radio" :label="item.index">&nbsp;</el-radio>
              <img class="iconImg" :src="item.img" alt />
              <span>{{item.payname}}</span>
            </div>
            <div class="payMoney" :class="{showMoney: changeRed==index}" @click="reds(index)">
              支付
              <span class="money">{{item.money}}</span>元
            </div>
          </div>
          <div class="center">
            <button @click="$router.push('/paySuccess')" class="payContent">确认付款</button>
            <button @click="$router.go(-1)" class="canclePay">取消付款</button>
            
          </div>
        </div>
      </div>
    </div>
    <rightNav></rightNav>
    <Bottom></Bottom>
  </div>
</template>
<script>
export default {
  data() {
    return {
      changeRed: 0,
      radio: 0,
      //支付类型数据
      form: {
        money: "20"
      },
      payData: [
        {
          index: 0,
          img: require("../../assets/image/zxw/zhifubao.png"),
          payname: "支付宝",
          money: "20"
        },
        {
          index: 1,
          img: require("../../assets/image/zxw/chat.png"),
          payname: "微信支付",
          money: "30"
        }
      ],
      tableData: [
        {
          title:
            "专柜洋风二代陶瓷锅煲汤炖煮砂锅耐高温健康煮qereqwrwerwerwqerqwer饭粥锅陶锅",
          color: "红色",
          size: "5.5L",
          type: "配餐具",
          img: require("../../assets/image/zxw/typeImg1.png"),
          info: "夸奖哈首付款",
          price: 200,
          account: 10,
          email: 20,
          coypon: 200,
          sum: 3000,
          remark: "空间和付款计划哈快捷回复卡后即可"
        },
        {
          title: "专柜洋风二代陶瓷锅煲汤炖煮砂锅耐高温健康煮饭粥锅陶锅",
          color: "红色",
          size: "5.5L",
          type: "配餐具",
          img: require("../../assets/image/zxw/typeImg1.png"),
          info: "夸奖哈首付款",
          price: 200,
          account: 10,
          email: 20,
          coypon: 200,
          sum: 3000,
          remark: "空间和付款计划哈快捷回复卡后即可"
        }
      ]
    };
  },
  methods: {
    add(row, column) {
      return "￥" + row.price;
    },
    email(row, column) {
      return "￥" + row.email;
    },
    coypon(row, column) {
      return "￥" + row.coypon;
    },
    sum(row, column) {
      return "￥" + row.sum;
    },
    reds(index) {
      this.changeRed = index;
      this.radio = index;
      console.log(this.payData[index].index);
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
    /deep/.el-table_1_column_6 {
    color: red;
  }
  /deep/.el-table_1_column_5 {
    color: red;
  }
  /deep/.is-leaf {
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
      /deep/.el-radio__input{
        line-height: 3;
      }
      /deep/.el-radio__inner{
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
  .canclePay{
    width:260px;
    height:70px;
    border-radius:4px;
    border:1px solid rgba(74,74,74,1);
    font-size: 24px;
    font-family: DFYuanW5-GB;
    font-weight: 400;
    color: #4A4A4A;
    float: right;
    margin: 40px 0;
    background-color: #fff;
    box-sizing: border-box;
    margin-right:20px;
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