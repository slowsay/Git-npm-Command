<template>
  <div class="waitPay">
    <div class="contain">
      <div class="wait">
        <p v-if="state==0" class="title">待支付</p>

        <p v-if="state==1" class="title">待发货</p>

        <p v-if="state==2" class="title">待收货</p>

        <p v-if="state==3||state==4" class="title">已完成</p>

        <p v-if="state==5" class="title">已关闭</p>

        <p v-if="state==6" class="title">售后</p>

        <div class="info" v-if="state==0">暂无物流信息</div>
        <div class="info" v-if="state==1">等待揽件</div>
        <div class="info" v-if="state==2">
          <div v-for="(item,index) in stateData" :key="index" class="stateData">
            <el-row :gutter="20">
              <el-col :span="3">{{item.date}}</el-col>
              <el-col :span="2">{{item.week}}</el-col>
              <el-col :span="3">{{item.time}}</el-col>
              <el-col :span="16">{{item.address}}</el-col>
            </el-row>
          </div>
        </div>
        <div class="info" v-if="state==3">
          <div v-for="(item,index) in stateData" :key="index" class="stateData">
            <el-row :gutter="20">
              <el-col :span="3">{{item.date}}</el-col>
              <el-col :span="2">{{item.week}}</el-col>
              <el-col :span="3">{{item.time}}</el-col>
              <el-col :span="16">{{item.address}}</el-col>
            </el-row>
          </div>
        </div>
        <div class="info" v-if="state==4">
          <div v-for="(item,index) in stateData" :key="index" class="stateData">
            <el-row :gutter="20">
              <el-col :span="3">{{item.date}}</el-col>
              <el-col :span="2">{{item.week}}</el-col>
              <el-col :span="3">{{item.time}}</el-col>
              <el-col :span="16">{{item.address}}</el-col>
            </el-row>
          </div>
        </div>
        <div class="info" v-if="state==5">
          <div v-for="(item,index) in stateData" :key="index" class="stateData">
            <el-row :gutter="20">
              <el-col :span="3">{{item.date}}</el-col>
              <el-col :span="2">{{item.week}}</el-col>
              <el-col :span="3">{{item.time}}</el-col>
              <el-col :span="16">{{item.address}}</el-col>
            </el-row>
          </div>
        </div>
        <div class="info" v-if="state==6">
          <div v-for="(item,index) in stateData" :key="index" class="stateData">
            <el-row :gutter="20">
              <el-col :span="3">{{item.date}}</el-col>
              <el-col :span="2">{{item.week}}</el-col>
              <el-col :span="3">{{item.time}}</el-col>
              <el-col :span="16">{{item.address}}</el-col>
            </el-row>
          </div>
        </div>
        <span class="item">运单号码：{{infoForm.number}}</span>
        <span class="item">物流公司：{{infoForm.company}}</span>
        <span class="item">客服电话：{{infoForm.phone}}<br/></span>

        <span class="item" v-if="state!=0">发货时间：{{infoForm.create}}<br/></span>
        <span class="item">创立时间：{{infoForm.create}}<br/></span>

        <span class="item" v-if="state!=0">付款时间：{{infoForm.create}} <br/></span>
        <span class="item" v-if="state!=0">成交时间：{{infoForm.create}} <br/></span>


        <span class="item">收货地址：{{infoForm.address}}</span>
      </div>
      <!-- //商品信息模块 -->
      <!-- 表格模块 -->
      <div class="form" style="margin-top:40px; ">
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column prop="info" label="商品信息" width="400">
            <template slot-scope="scope">
              <img class="shopImg" :src="scope.row.img" alt/>

              <div class="infoBox">
                <p class="title">{{scope.row.title}}</p>

                <p class="type">{{scope.row.color+'/'+scope.row.size+'/'+scope.row.type}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="单价" :formatter="add"></el-table-column>
          <el-table-column prop="account" label="数量"></el-table-column>
          <el-table-column prop="email" label="邮费" :formatter="email"></el-table-column>
          <el-table-column prop="coypon" label="优惠券" :formatter="coypon"></el-table-column>
          <el-table-column prop="sum" label="合计" :formatter="sum"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
        </el-table>
        <div class="btnBox" v-if="state==0">
          <button class="btn1" @click="$router.push('shopDetail')">取消订单</button>
          <button class="btn2" @click="$router.push('pay')">立即付款</button>
        </div>
        <div class="btnBox" v-if="state==1">
          <button class="btn1">售后</button>
          <button class="btn2">提醒发货</button>
        </div>
        <div class="btnBox" v-if="state==2">
          <button class="btn1">申请售后</button>
        </div>
        <div class="btnBox" v-if="state==3">
          <button class="btn1">申请售后</button>
          <button class="btn2">立即评价</button>
        </div>
        <div class="btnBox" v-if="state==4">
          <button class="btn1">删除订单</button>
          <button class="btn2">追加评价</button>
        </div>
        <div class="btnBox" v-if="state==5">
          <button class="btn1">删除订单</button>
        </div>
        <div class="btnBox" v-if="state==6">
          <button class="btn1">联系客服</button>
          <button class="btn2">取消售后</button>
        </div>
      </div>
      <div class="shop">
        <div class="shopTop">
          <div>热卖商品</div>
        </div>
        <div class="shopContain">
          <div v-for="(item,index) in shopData" :key="index" class="shopBox" @click="$router.push('shopDetail')">
            <img :src="item.img" alt/>

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
  </div>
</template>
<script>
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    data: function () {
      return {
        state: 3,
        stateData: [
          {
            date: '2019-08-03',
            week: '周六',
            time: '23:13:22',
            address: '商品已下单',
          },
          {
            date: '2019-08-03',
            week: '周六',
            time: '23:13:22',
            address: '商品已下单',
          },
          {
            date: '2019-08-03',
            week: '周六',
            time: '23:13:22',
            address: '【代收点】您的快件已送达【丰巢的北城天地10幢（丰巢智能快递柜）】保管 地址：湖州街567号，如有疑问请电联：0571-88927362/17273628164，您的快递已经妥投。风里雨里，只为客官您满意。上有老下有小，赏个好评好不好？【请在评价快递员处帮忙点亮5颗星星哦～】',
          },
          {
            date: '2019-08-03',
            week: '周六',
            time: '23:13:22',
            address: '商品已下单',
          }
        ],
        infoForm: {
          number: 723214231423,
          company: "中通快递",
          phone: "95311",
          create: "2019-08-03 21:09:30",
          address: "浙江杭州市"
        },
        shopData: [
          {
            img: require("../../assets/image/zxw/typeImg1.png"),
            money: 1888.88,
            moneyDel: 2888.88,
            title: "不透明蒸锅客户打款警方很快黄金卡还是短发",
            number: "271",
            save: "542"
          },
          {
            img: require("../../assets/image/zxw/typeImg1.png"),
            money: 1888.88,
            moneyDel: 2888.88,
            title: "不透明蒸锅客户打款警方很快黄金卡还是短发",
            number: "271",
            save: "542"
          },
          {
            img: require("../../assets/image/zxw/typeImg1.png"),
            money: 1888.88,
            moneyDel: 2888.88,
            title: "不透明蒸锅客户打款警方很快黄金卡还是短发",
            number: "271",
            save: "542"
          },
          {
            img: require("../../assets/image/zxw/typeImg1.png"),
            money: 1888.88,
            moneyDel: 2888.88,
            title: "不透明蒸锅客户打款警方很快黄金卡还是短发",
            number: "271",
            save: "542"
          }
        ],
        tableData: [
          {
            title: "专柜洋风二代陶瓷锅煲汤炖煮砂锅耐高温健康煮qereqwrwerwerwqerqwer饭粥锅陶锅",
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
    mounted: function () {
      this.getstate();
    },
    methods: {
      add: function (row, column) {
        return "￥" + row.price;
      },
      email: function (row, column) {
        return "￥" + row.email;
      },
      coypon: function (row, column) {
        return "￥" + row.coypon;
      },
      sum: function (row, column) {
        return "￥" + row.sum;
      },
      getstate: function () {
        this.state = this.$route.query.type;
      }
    }
  };
</script>
<style lang="less" scoped>
  .waitPay {
    margin: 0 auto;
    .contain {
      width: 1280px;
      margin: 20px auto;
      .wait {
        width: 1280px;
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
        background: rgba(245, 245, 245, 1);
        border-radius: 4px;
        font-size: 16px;
        font-family: DFYuanW5-GB;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 30px;
        padding: 20px 40px;
        box-sizing: border-box;
        margin-top: 20px;
        .stateData {
          .el-row {

          }
        }
      }
      .item {
        font-size: 16px;
        font-family: DFYuanW5-GB;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-right: 20px;
        line-height: 30px;
      }
    }
    .form {
      border: 4px solid rgba(0, 0, 0, 0.08);
      border-radius: 10px;
      box-sizing: border-box;
      .btnBox {

        height: 60px;

        text-align: right;
        margin: 20px 0 0 0;

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
      color: #4A4A4A;
      line-height: 22px;
      border: 1px solid rgba(230, 230, 230, 1);
      margin-right: 20px;
    }
    .btn2 {
      width: 90px;
      height: 36px;
      background: #FF9494;
      border-radius: 4px;
      font-size: 16px;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
      border: none;
      margin-right: 20px;
    }
    .shop {
      margin-top: 20px;
      .shopTop {
        display: flex;
        margin-bottom: 20px;
        border-bottom: 4px dotted #666666;
        div {
          font-size: 28px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
          line-height: 60px;

        }
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
