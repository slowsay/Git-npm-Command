<template>
  <div id="Integral">
    <div class="top">
      <div>
        <p>我的积分</p>
      </div>
      <div></div>
    </div>
    <div class="head">
      <div>
        <p>可用积分</p>
        <p>{{amount}}</p>
      </div>
      <div>
        <p>积分明细</p>
        <div v-for="(item,index) in data" :key="index">
          <p>{{item.time}}</p>
          <p>{{item.title}}</p>
          <p>{{item.amount}}</p>
        </div>
      </div>
    </div>
    <div class="purchase">
      <p>购买积分</p>
      <div>
        <div
          v-for="(item,index) in price"
          :key="index"
          @click="state=index"
          :class="{active:state==index}"
        >
          <p>{{item.money}}</p>
          <p>{{item.amount}}</p>
        </div>
      </div>
      <el-button>立即购买</el-button>
    </div>
    <div class="record">
      <p>购买记录:</p>
      <div>
        <div v-for="(item,index) in record" :key="index">
          <p>
            <span>{{item.title}}</span>
            <span>{{item.amount}}</span>
          </p>
          <p>{{item.time}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      amount: "192192",
      data: [
        {
          time: "2019.06.12",
          title: "兑换正品七匹狼男士真皮皮带韩版纯牛皮中年青年…",
          amount: "-28000"
        },
        {
          time: "2019.06.12",
          title: "兑换正品七匹狼男士真皮皮带韩版纯牛皮中年青年…",
          amount: "-28000"
        },
        {
          time: "2019.06.12",
          title: "兑换正品七匹狼男士真皮皮带韩版纯牛皮中年青年…",
          amount: "-28000"
        },
        {
          time: "2019.06.12",
          title: "兑换正品七匹狼男士真皮皮带韩版纯牛皮中年青年…",
          amount: "-28000"
        },
        {
          time: "2019.06.12",
          title: "兑换正品七匹狼男士真皮皮带韩版纯牛皮中年青年…",
          amount: "-28000"
        }
      ],
      state: 0,
      price: [
        {
          money: "50元",
          amount: "1000积分"
        },
        {
          money: "100元",
          amount: "5000积分"
        },
        {
          money: "200元",
          amount: "10000积分"
        },
        {
          money: "280元",
          amount: "15000积分"
        }
      ],
      record: [
        {
          title: "购买500积分",
          time: "2019.08.20",
          amount: "-100元"
        },
        {
          title: "购买500积分",
          time: "2019.08.20",
          amount: "-100元"
        },
        {
          title: "购买500积分",
          time: "2019.08.20",
          amount: "-100元"
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
#Integral {
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
  .head {
    display: flex;
    width: 980px;
    padding: 27px 72px 27px 0;
    box-sizing: border-box;
    margin-top: 30px;
    background: rgba(245, 245, 245, 1);
    border-radius: 4px;
    > div:nth-child(1) {
      width: 293px;
      text-align: center;
      border-right: 1px solid #cccccc;
      p:nth-child(1) {
        font-size: 22px;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        line-height: 30px;
        margin-bottom: 10px;
      }
      p:nth-child(2) {
        font-size: 48px;
        font-weight: 500;
        color: rgba(255, 0, 0, 1);
        line-height: 67px;
      }
    }
    > div:nth-child(2) {
      width: calc(100% - 325px);
      margin-left: 30px;
      > p {
        font-size: 22px;
        font-weight: 500;
        color: rgba(255, 0, 0, 1);
        line-height: 30px;
        margin-bottom: 25px;
      }
    }
    > div:nth-child(2) > div {
      display: flex;
      margin-top: 10px;

      p:nth-child(1) {
        width: 100px;
        font-size: 16px;
        font-weight: 500;
        color: rgba(74, 74, 74, 1);
        line-height: 22px;
      }
      p:nth-child(2) {
        font-size: 16px;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        line-height: 22px;
      }
      p:nth-child(3) {
        font-size: 16px;
        font-weight: 500;
        color: rgba(74, 74, 74, 1);
        line-height: 22px;
        margin-left: auto;
      }
    }
  }
  .purchase {
    > p:nth-child(1) {
      font-size: 22px;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
      line-height: 30px;
      margin: 30px 0;
    }
    > div {
      width: 980px;
      display: flex;
      justify-content: space-between;
      div {
        width: 200px;
        height: 100px;
        text-align: center;
        border: 1px solid rgba(255, 148, 148, 1);
      }
      p:nth-child(1) {
        font-size: 22px;
        font-weight: 500;
        color: rgba(255, 148, 148, 1);
        line-height: 30px;
        margin-top: 20px;
      }
      p:nth-child(2) {
        font-size: 22px;
        font-weight: 400;
        color: rgba(255, 148, 148, 1);
        line-height: 30px;
      }
      .active {
        background: rgba(255, 148, 148, 1);
      }
      .active p {
        color: #fff;
      }
    }
    .el-button {
      display: block;
      margin: 60px auto 30px;
      width: 200px;
      height: 60px;
      background: rgba(255, 148, 148, 1);
      font-size: 22px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 30px;
    }
  }
  .record {
    display: flex;
    > p {
      font-size: 22px;
      font-weight: 500;
      color: rgba(74, 74, 74, 1);
      line-height: 30px;
      width: 120px;
      flex-shrink: 0;
    }
    > div {
      width: 100%;
      border-radius: 4px;
      padding: 0 30px;
      border: 4px solid rgba(204, 204, 204, 1);
      p:nth-child(1) {
        font-size: 20px;
        font-weight: 500;
        color: rgba(74, 74, 74, 1);
        line-height: 28px;
        margin-top: 10px;
      }
      p span:nth-child(2) {
        float: right;
      }
      p:nth-child(2) {
        padding: 4px 0 19px;
        font-size: 14px;
        font-weight: 500;
        color: rgba(155, 155, 155, 1);
        line-height: 20px;
        border-bottom: 1px solid #f5f5f5;
      }
    }
  }
}
</style>