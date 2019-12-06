<template>
  <div id="Order">
    <div class="tab">
      <p @click="state=-1" :class="{active:state==-1}">全部订单</p>
      <p @click="state=0" :class="{active:state==0}">待付款</p>
      <p @click="state=1" :class="{active:state==1}">待发货</p>
      <p @click="state=2" :class="{active:state==2}">待收货</p>
      <p @click="state=3" :class="{active:state==3}">待评价</p>
      <p @click="state=4" :class="{active:state==4}">已完成</p>
      <p @click="state=5" :class="{active:state==5}">已关闭</p>
      <p @click="state=6" :class="{active:state==6}">售后</p>
    </div>
    <div>
      <div v-for="(item,index) in data" :key="index">
        <div class="card" v-if="item.state==state||state==-1">
          <div>
            <div>
              <span>{{item.time}}</span>
              <span>订单号:</span>
              <span>{{item.number}}</span>
            </div>
            <div>
              <img src="../../assets/image/gw/goutou.jpg" />
              <div>
                <p>{{item.title}}</p>
                <p>{{item.type}}</p>
              </div>
            </div>
          </div>
          <div>
            <div>单价</div>
            <div>
              <p>{{'￥'+item.price}}</p>
            </div>
          </div>
          <div>
            <div>数量</div>
            <div>
              <p>{{item.amount}}</p>
            </div>
          </div>
          <div>
            <div>邮费</div>
            <div>
              <p>{{'￥'+item.postage}}</p>
            </div>
          </div>
          <div>
            <div>优惠卷</div>
            <div>
              <p class="red">{{'￥'+item.coupon}}</p>
            </div>
          </div>
          <div>
            <div>合计</div>
            <div>
              <p class="red">{{'￥'+item.all}}</p>
            </div>
          </div>
          <div style="width:100px">
            <div>状态</div>
            <div>
              <p class="red" v-if="item.state==4">已完成</p>
              <p class="red" v-else-if="item.state==0">待支付</p>
              <p class="red" v-else-if="item.state==1">待发货</p>
              <p class="red" v-else-if="item.state==2">待收货</p>
              <p class="red" v-else-if="item.state==3">待评价</p>
              <p class="red" v-else-if="item.state==5">已关闭</p>
              <p class="red" v-else-if="item.state==6">售后</p>
              <p @click="$router.push({path:'/waitPay',query:{type:item.state}})">订单详情</p>
              <p v-if="item.state!=0">查看物流</p>
            </div>
          </div>
          <div style="width:120px">
            <div>操作</div>
            <div v-if="item.state==4">
              <p>追加评价</p>
              <p>删除订单</p>
            </div>
            <div v-else-if="item.state==0">
              <div>立即付款</div>
              <p>取消订单</p>
            </div>
            <div v-else-if="item.state==1">
              <p>催卖家发货</p>
              <p>售后</p>
            </div>
            <div v-else-if="item.state==2">
              <div>确认收货</div>
              <p>售后</p>
            </div>
            <div v-else-if="item.state==3">
              <div>立即评价</div>
              <p>删除订单</p>
            </div>
            <div v-else-if="item.state==5">
              <p>重新购买</p>
              <p>取消订单</p>
            </div>
            <div v-else-if="item.state==6">
              <div>取消售后</div>
              <p>联系客服</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      state: -1,
      data: [
        {
          state: 0,
          time: "2019-07-28",
          number: "218721732161221312",
          title: "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣…",
          type: "尊贵咖色",
          price: "28000",
          amount: "1",
          postage: "15.00",
          coupon: "200",
          all: "2703.00"
        },
        {
          state: 1,
          time: "2019-07-28",
          number: "218721732161221312",
          title: "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣…",
          type: "尊贵咖色",
          price: "28000",
          amount: "1",
          postage: "15.00",
          coupon: "200",
          all: "2703.00"
        },
        {
          state: 2,
          time: "2019-07-28",
          number: "218721732161221312",
          title: "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣…",
          type: "尊贵咖色",
          price: "28000",
          amount: "1",
          postage: "15.00",
          coupon: "200",
          all: "2703.00"
        },
        {
          state: 3,
          time: "2019-07-28",
          number: "218721732161221312",
          title: "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣…",
          type: "尊贵咖色",
          price: "28000",
          amount: "1",
          postage: "15.00",
          coupon: "200",
          all: "2703.00"
        },
        {
          state: 4,
          time: "2019-07-28",
          number: "218721732161221312",
          title: "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣…",
          type: "尊贵咖色",
          price: "28000",
          amount: "1",
          postage: "15.00",
          coupon: "200",
          all: "2703.00"
        },
        {
          state: 5,
          time: "2019-07-28",
          number: "218721732161221312",
          title: "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣…",
          type: "尊贵咖色",
          price: "28000",
          amount: "1",
          postage: "15.00",
          coupon: "200",
          all: "2703.00"
        },
        {
          state: 6,
          time: "2019-07-28",
          number: "218721732161221312",
          title: "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣…",
          type: "尊贵咖色",
          price: "28000",
          amount: "1",
          postage: "15.00",
          coupon: "200",
          all: "2703.00"
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
#Order {
  .tab {
    display: flex;
    margin: 30px 0 24px;
    p {
      font-size: 20px;
      font-weight: 400;
      color: rgba(74, 74, 74, 1);
      line-height: 28px;
      margin-right: 60px;
    }
    .active {
      font-weight: bold;
    }
  }
  .card {
    display: flex;
    width: 980px;
    padding: 5px;
    box-sizing: border-box;
    background: #f5f5f5;
    text-align: center;
    margin-bottom: 20px;
    > div {
      flex-shrink: 0;
    }
    > div > div:nth-child(1) {
      font-size: 14px;
      font-weight: 400;
      color: rgba(74, 74, 74, 1);
      line-height: 45px;
    }
    > div > div:nth-child(2) {
      padding: 25px 15px 0;
      background: #fff;
      height: 125px;
      overflow: hidden;
      p {
        font-size: 14px;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        line-height: 24px;
      }
    }
    > div:nth-child(1) {
      text-align: left;
      font-size: 16px;
      flex-shrink: 1;
    }
    > div:nth-child(1) > div:nth-child(2) {
      img {
        float: left;
        width: 100px;
        height: 100px;
        margin: 5px 20px 0 15px;
      }
      p:nth-child(1) {
        margin: 0 0 22px;
      }
    }
    > div:nth-child(7) > div:nth-child(2) {
      p {
        margin-bottom: 2px;
      }
    }
    > div:nth-child(8) > div:nth-child(2) {
      div {
        width: 88px;
        height: 30px;
        background: rgba(255, 148, 148, 1);
        border-radius: 4px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 30px;
        margin-bottom: 10px;
      }
      p:nth-child(1) {
        font-size: 16px;
        line-height: 22px;
        margin-bottom: 10px;
      }
      p:nth-child(1) + p {
        font-size: 16px;
        line-height: 22px;
      }
    }
    .red {
      color: red !important;
    }
  }
}
</style>