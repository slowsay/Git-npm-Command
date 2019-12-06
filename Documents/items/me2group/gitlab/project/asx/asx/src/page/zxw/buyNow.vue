<template>
  <div class="buyNow">
    <div class="top">
      <navbar></navbar>
    </div>
    <div class="contain">
      <div class="payType">
        <div class="titleBox">
          <div class="payTitle">确认收获地址</div>
          <div class="change">管理收获地址</div>
        </div>
        <div class="itemBox">
          <div
            v-for="(item,index) in payData"
            :key="index"
            class="payBox"
            :class="{red : changeRed ==index}"
            @click="reds(index)"
          >
            <div class="payLeft">
              <span class="sendTo" :class="{send: changeRed==index}" @click="reds(index)">
                <i class="el-icon-location"></i>寄送至
              </span>
            </div>
            <div class="payMiddle">
              <span class="radio">
                <el-radio size="small" v-model="radio" :label="item.index">&nbsp;</el-radio>
              </span>
              <span
                class="address"
                :class="{onAddress : changeRed ==index}"
                @click="reds(index)"
              >{{item.address+' ('+(item.name+'收')+') '+item.phone}}</span>
               <button class="btn" :class="{showBtn: changeRed==index}" @click="reds(index)">默认地址</button>
            </div>
           
            <div class="payMoney" :class="{showMoney: changeRed==index}" @click="reds(index)">
              修改本地址
            </div>
               
          </div>
        <p class="useOther">使用其他地址</p>
        </div>
       
      </div>

          <div class="orderInfo">确认订单信息</div>
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
      <div class="center">
        <div class="allSum">合计（含运费）<span class="all"><span style="font-size:24px">￥</span>{{form.all}}</span></div>
        <div class="box" >
          <div class="fanhui"><img src="../../assets/img/zxw/fanhui.png" alt=""><span @click="$router.go(-1)">返回购物车</span></div>
          <button class="payContent" @click="$router.push('/pay')">确认付款</button>
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
        money: "20",
        all:'1000',
      },
      payData: [
        {
          index: 0,
          address: "浙江省 杭州市 拱墅区 祥符街道 北城天地9幢1701",
          name: "潘老大",
          phone: "18887987987"
        },
        {
          index: 1,
          address: "浙江省 杭州市 拱墅区 祥符街道 北城天地9幢1701",
          name: "潘老大",
          phone: "18887987987"
        },
        {
          index: 2,
          address: "浙江省 杭州市 拱墅区 祥符街道 北城天地9幢1701",
          name: "潘老大",
          phone: "18887987987"
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
    },
    reds(index) {
      this.changeRed = index;
      this.radio = index;
      console.log(this.payData[index].index);
    }
  },
 
  
};
</script>
<style lang="less" scoped>
.buyNow {
  height: 70px;
  margin: 0 auto;
  .top {

    width: 1280px;
    margin: 40px auto;
  }
  .contain {
    width: 1280px;
    margin: 0 auto;
    box-sizing: border-box;
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
    //确认收获地址模块样式
    .payType {
      font-size: 30px;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 60px;
      margin-top: 20px;
      .titleBox {
        display: flex;
        justify-content: space-between;
        border-bottom: 4px dotted #ccc;
        margin-bottom: 20px;
        .change {
          font-size: 18px;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(27, 125, 219, 1);
          margin-top: 5px;
        }
      }
      .payBox {
        width: 1280px;
        box-sizing: border-box;
        height: 84px;
        padding: 10px 32px;
        display: flex;
        align-items: center;
        border: 1px solid #fff;
        .payLeft{
          width: 100px;
        }
        .payMiddle{
          margin-right:auto;
        }
        .sendTo {
          // font-size:18px;
          // font-family:DFYuanW5-GB;
          // font-weight:400;
          // color:rgba(223,18,32,1);
          display: none;
        }
        .send {
          display: block;
          font-size: 18px;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(223, 18, 32, 1);
        }
        .address {
          font-size: 18px;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        .onAddress {
          font-size: 20px;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
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
 
  .red {
    border: 1px solid red !important;
    background-color: #fff;
    background:rgba(252,231,232,1);
    box-sizing: border-box;
    border-radius: 10px;
  }
  .payMoney {
    display: none;
  }
  .showMoney {
    display: block;
    font-size:18px;
font-family:DFYuanW5-GB;
font-weight:400;
color:rgba(27,125,219,1);

  }
  .btn{
    display: none;
    float: right;
    margin-top:20px;
  }
  .showBtn{
      display: block;
    width:87px;
height:28px;
background:rgba(224,18,32,1);
border-radius:4px;
border:none;
font-size:14px;
font-family:DFYuanW5-GB;
font-weight:400;
color:rgba(255,255,255,1);
margin-left: 20px;
  }

  .center {
   
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .allSum{
      font-size:18px;
font-family:DFYuanW5-GB;
font-weight:400;
color:rgba(51,51,51,1);
margin:20px;
.all{
  font-size:36px;
font-family:PingFang SC;
font-weight:400;
color:rgba(224,18,32,1)
}
    }
    .box{
margin:20px;
      .fanhui{
        float: left;
        margin:20px 100px;
        font-size:20px;
        font-family:DFYuanW5-GB;
        font-weight:400;
        color:rgba(27,125,219,1);
      }
       .payContent {
          width: 260px;
          height: 70px;
          background: rgba(224, 18, 32, 1);
          border-radius: 4px;
          font-size: 24px;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          border: none;
    
  }
    }
  }
  .useOther{
    font-size:18px;
font-family:DFYuanW5-GB;
font-weight:400;
color:rgba(27,125,219,1);
margin-left: 150px;
  }
  .orderInfo{
    font-size:30px;
font-family:DFYuanW5-GB;
font-weight:400;
color:rgba(51,51,51,1);
border-bottom: 4px dotted #ccc;
  line-height: 60px;
  }
}
.form{
  border:4px solid rgba(0, 0, 0, 0.08);
border-radius:10px;
margin-top:40px;
}
.allSum{
  font-size:18px;
font-family:DFYuanW5-GB;
font-weight:400;
color:rgba(51,51,51,1);
}
</style>