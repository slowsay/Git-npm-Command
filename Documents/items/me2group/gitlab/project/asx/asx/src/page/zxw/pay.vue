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
          <el-table-column prop="sizerk" label="备注"></el-table-column>
        </el-table>
      </div>
      <div class="payType">
        <div class="payTitle">选择支付方式</div>
        <div class="itemBox">
          <div v-for="(item,index) in payData" :key = index class="payBox" :class="{red : changeRed ==index}" @click ="reds(index)">
            <div>
                <el-radio size="small" v-model="radio" :label="item.index" >&nbsp;</el-radio>
                <img class="iconImg" :src="item.img" alt=""><span>{{item.name}}</span>
            </div>
                <div class="payMoney" :class="{showMoney: changeRed==index}" @click ="reds(index)">
                  支付<span class="money">{{item.money}}</span>元
                </div>
          </div>
         <div class="center"><button @click="$router.push('/paySuccess')" class="payContent">确认付款</button></div> 
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
      changeRed:0,
      radio:0,
      //支付类型数据
      form:{
        money:'20'
      },
      payData:[
        {
          index:0,
          img:require('../../assets/img/zxw/zhifubao.png'),
          name:'支付宝',
          money:"20"
        },
         {
          index:1,
          img:require('../../assets/img/zxw/chat.png'),
          name:'微信支付',
          money:"30"
        },
         {
          index:2,
          img:require('../../assets/img/zxw/yunpay.png'),
          name:'云闪付',
          money:"40"
        }
      ],
      tableData: [
        {
          title: "专柜洋风二代陶瓷锅煲汤炖煮砂锅耐高温健康煮qereqwrwerwerwqerqwer饭粥锅陶锅",
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
          sizerk: "空间和付款计划哈快捷回复卡后即可"
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
          sizerk: "空间和付款计划哈快捷回复卡后即可"
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
    reds(index){
      this.changeRed = index;
      this.radio= index;
      console.log(this.payData[index].index)
    }

  }
};
</script>
<style lang="scss" scoped>$size: 0.8;
.pay {
  height: 70px*$size;
  margin: 0 auto;
  .top {
    width: 1280px*$size;
    margin: 40px*$size auto;
  }
  .contain {
    width: 1280px*$size;
    margin: 0 auto;
    box-sizing: border-box;
    .shopImg {
      width: 100px*$size;
      height: 100px*$size;
      border-radius: 4px*$size;
    }
    .infoBox {
      float: right;
      width: 250px*$size;
      height: 100px*$size;
      // border: 1px*$size solid red;
      .title {
        font-size: 16px*$size;
        font-family: DFYuanW5-GB;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 24px*$size;  
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .type {
        font-size: 16px*$size;
        font-family: DFYuanW5-GB;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 24px*$size;
        margin-top:30px*$size;
      }
    }
    .payType{
      font-size:30px*$size;
      font-family:DFYuanW5-GB;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height: 60px*$size;
      margin-top:20px*$size;
        .payTitle{
          border-bottom: 4px*$size dotted #ccc;
          margin-bottom: 20px*$size;
        }
      .payBox{
        width: 1280px*$size;
          box-sizing:border-box;
        height: 84px*$size;
        padding:10px*$size 32px*$size;
        display: flex;
        align-items: center;
        border:4px*$size solid #fff;
        justify-content: space-between;
        img{
          margin:0 10px*$size;

        }
      }
      .payMoney{
        float: right;
        .money{
          font-size:30px*$size;
font-family:PingFang SC;
font-weight:400;
color:rgba(224,18,32,1);
        }
      }
    }
  };
  .payContent{
    width:260px*$size;
    height:70px*$size;
    background:rgba(224,18,32,1);
    border-radius:4px*$size;
    font-size:24px*$size;
    font-family:DFYuanW5-GB;
    font-weight:400;
    color:rgba(255,255,255,1);
    border:none;
    float: right;
    margin:40px*$size 0;
  }
  .red{
    border:4px*$size solid red !important;
    box-sizing: border-box;
    border-radius: 10px*$size;
  
  }
  .payMoney{
    display: none;
  }
  .showMoney{
    display: block;
  }
  .center{
    overflow: auto;
  }
}
</style>