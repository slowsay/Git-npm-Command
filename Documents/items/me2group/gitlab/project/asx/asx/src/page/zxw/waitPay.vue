<template>
  <div class="waitPay">
    <div class="top">
      <navbar></navbar>
    </div>
    <div class="contain">
      <div class="wait">
        <p class="title">待支付</p>
        <div class="info">暂无物流信息</div>
        <span class="item">运单号码：{{infoForm.number}}</span>
        <span class="item">物流公司：{{infoForm.company}}</span>
        <span class="item">客服电话：{{infoForm.phone}}</span>
        <br />
        <span class="item">创立时间：{{infoForm.create}}</span>
        <br />
        <span class="item">收货地址：{{infoForm.address}}</span>
      </div>
      <!-- //商品信息模块 -->
      <!-- 表格模块 -->
      <div class="form" style="margin-top:40px;">
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
        <div class="btnBox">
          <button class="btn1" @click="$router.push('shopDetail')">取消订单</button>
          <button class="btn2" @click="$router.push('pay')">立即付款</button>
        </div>
      </div>
      <div class="shop">
        <div class="shopTop">
          <div>热卖商品</div>
          <div>
            <img src="../../assets/img/zxw/right.png" alt />
          </div>
        </div>
        <div class="shopContain">
          <div v-for="(item,index) in shopData" :key="index" class="shopBox" @click="$router.push('shopDetail')">
            <img :src="item.img" alt />
            <div style="padding:14px">
              <p class="moneyBox">
                <span>￥{{item.money}}</span>
                <span>￥{{item.moneyDel}}</span>
              </p>
              <p class="title">{{item.title}}</p>
              <div class="boxBottom">
                <span>销量：{{item.number}}</span>
                <span>收藏：{{item.save}}</span>
              </div>
            </div>
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
      infoForm: {
        number: 723214231423,
        company: "中通快递",
        phone: "95311",
        create: "2019-08-03 21:09:30",
        address: "浙江杭州市"
      },
      shopData: [
        {
          img: require("../../assets/img/zxw/shopimg.png"),
          money: 1888.88,
          moneyDel: 2888.88,
          title: "不透明蒸锅客户打款警方很快黄金卡还是短发",
          number: "271",
          save: "542"
        },
        {
          img: require("../../assets/img/zxw/shopimg.png"),
          money: 1888.88,
          moneyDel: 2888.88,
          title: "不透明蒸锅客户打款警方很快黄金卡还是短发",
          number: "271",
          save: "542"
        },
        {
          img: require("../../assets/img/zxw/shopimg.png"),
          money: 1888.88,
          moneyDel: 2888.88,
          title: "不透明蒸锅客户打款警方很快黄金卡还是短发",
          number: "271",
          save: "542"
        },
        {
          img: require("../../assets/img/zxw/shopimg.png"),
          money: 1888.88,
          moneyDel: 2888.88,
          title: "不透明蒸锅客户打款警方很快黄金卡还是短发",
          number: "271",
          save: "542"
        }
      ],
      tableData: [
        {
          title:
            "专柜洋风二代陶瓷锅煲汤炖煮砂锅耐高温健康煮qereqwrwerwerwqerqwer饭粥锅陶锅",
          color: "红色",
          size: "5.5L",
          type: "配餐具",
          img: require("../../assets/img/zxw/guo.png"),
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
          img: require("../../assets/img/zxw/guo.png"),
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
    }
  }
};
</script>
<style lang="less" scoped>
.waitPay {

  margin: 0 auto;
  .top {
    width: 1280px;
    margin: 40px auto;
  }
  .contain {
    width: 1280px;
    margin: 20px auto;
    .wait {
      width: 1280px;
      height: 286px;
      padding: 29px 28px;
      border: 4px solid rgba(0, 0, 0, 0.08);
      border-radius: 10px;
      box-sizing: border-box;
    }
    .title {
      font-size: 24px;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .info {
      width: 1220px;
      height: 75px;
      background: rgba(245, 245, 245, 1);
      border-radius: 4px;
      font-size: 16px;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 75px;
      padding: 0px 40px;
      box-sizing: border-box;
      margin-top: 20px;
    }
    .item {
      font-size: 16px;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-right: 20px;
    }
  }
  .form {
    border: 4px solid rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    box-sizing: border-box;
    .btnBox {
      margin: 20px 0 20px 1060px;
    }
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
  .btn1 {
    width: 90px;
    height: 36px;
    background: #fff;
    border-radius: 4px;
    font-size: 16px;
    font-family: DFYuanW5-GB;
    font-weight: 400;
    color: rgba(27, 125, 219, 1);
    line-height: 22px;
    border: none;
    margin-right: 20px;
  }
  .btn2 {
    width: 90px;
    height: 36px;
    background: rgba(224, 18, 32, 1);
    border-radius: 4px;
    font-size: 16px;
    font-family: DFYuanW5-GB;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 22px;
    border: none;
  }
  .shop {
    .shopTop {
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
      border-bottom: 4px dotted #666666;
    }
    .shopContain {
      display: flex;

      .shopBox {
        width: 306px;
        height: 427px;
        border: 4px solid rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        box-sizing: border-box;
        margin-right: 15px;
        img {
          width: 298px;
          height: 298px;
        }
        .moneyBox {
          > span:nth-child(1) {
            font-size: 22px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(224, 18, 32, 1);
          }
          > span:nth-child(2) {
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            text-decoration: line-through;
            color: rgba(102, 102, 102, 1);
          }
        }
        .title {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 16px;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          margin: 10px 0;
        }
        .boxBottom {
          display: flex;
          font-size: 16px;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          justify-content: space-between;
        }
      }
    }
  }
}
</style>