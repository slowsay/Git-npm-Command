<template>
  <div id="Wallet">
    <div class="top">
      <div>
        <p>我的积分</p>
      </div>
      <div></div>
    </div>
    <div class="body">
      <p>账户余额(元)</p>
      <p>{{amount}}</p>
      <el-button @click="$router.push('/pay')">充值</el-button>
      <p>明细</p>
      <div>
        <p @click="state=0" :class="{active:state==0}">全部</p>
        <p @click="state=1" :class="{active:state==1}">收入</p>
        <p @click="state=2" :class="{active:state==2}">支出</p>
      </div>
      <div class="card">
        <div v-for="(item,index) in data" :key="index">
          <div v-if="item.state==state||state==0">
            <p>
              <span>{{item.title}}</span>
              <span>{{item.amount}}</span>
            </p>
            <p>
              <span>{{item.time}}</span>
              <span>{{item.status}}</span>
            </p>
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
      amount: 800,
      state: 0, //0全部 1收入 2支出
      data: [
        {
          title: "购买500积分",
          amount: "-100元",
          time: "2019.08.20 12:21",
          status: "支付成功",
          state: 1 //1收入 2支出
        },
        {
          title: "购买500积分",
          amount: "-100元",
          time: "2019.08.20 12:21",
          status: "支付成功",
          state: 2 //1收入 2支出
        },
        {
          title: "购买500积分",
          amount: "-100元",
          time: "2019.08.20 12:21",
          status: "支付成功",
          state: 1 //1收入 2支出
        }
      ]
    };
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
    padding:0 30px;
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
      span:nth-child(2){
        float: right;
      }
    }
  }
}
</style>