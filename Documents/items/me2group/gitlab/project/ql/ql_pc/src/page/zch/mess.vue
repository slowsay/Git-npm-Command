<template>
  <div class="mess">
    <div class="content">
      <!-- 订单通知 -->
      <div class="inform" v-for="(items,i) of inform" :key="i">
        <h4 class="title">{{items.title}}</h4>
        <div class="cont">
          <p class="name">{{items.name}}</p>
          <div class="shop" v-for="(item,j) of items.shop" :key="j" @click="jump(i,j)">
            <div>
              <img :src="item.img" alt />
            </div>
            <p class="self">{{item.self}}</p>
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
      inform: [
        {
          title: "订单通知",
          name: "您的订单待支付",
          shop: [
            {
              img: require("../../assets/image/zch/mg1.png"),
              self:
                "订单【正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣腰带】还没有付款，别忘记您的宝贝哦。"
            },
            {
              img: require("../../assets/image/zch/mg1.png"),
              self:
                "订单【正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣腰带】还没有付款，别忘记您的宝贝哦。"
            },
            {
              img: require("../../assets/image/zch/mg1.png"),
              self:
                "订单【正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣腰带】还没有付款，别忘记您的宝贝哦。"
            },
            {
              img: require("../../assets/image/zch/mg1.png"),
              self:
                "订单【正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣腰带】还没有付款，别忘记您的宝贝哦。"
            }
          ]
        },
        {
          title: "系统通知",
          shop: [
            {
              img: require("../../assets/image/zch/1.png"),
              self:
                "平台2019/08/30-2019/09/30期间全场商品8折，满20000送精美礼品。"
            },
            {
              img: require("../../assets/image/zch/1.png"),
              self:
                "平台2019/08/30-2019/09/30期间全场商品8折，满20000送精美礼品。"
            },
            {
              img: require("../../assets/image/zch/1.png"),
              self:
                "平台2019/08/30-2019/09/30期间全场商品8折，满20000送精美礼品。"
            },
            {
              img: require("../../assets/image/zch/1.png"),
              self:
                "平台2019/08/30-2019/09/30期间全场商品8折，满20000送精美礼品。"
            }
          ]
        }
      ]
    };
  },
  methods: {
    jump(a, b) {
      if (a == 1) {
        this.$router.push("/mess_details");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.mess {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  .content {
    width: 1280px;
    .inform {
      width: 1280px;
      padding:30px;
      box-sizing: border-box;
      .title {
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        line-height: 40px;
      }
      .cont {
        margin-top: 20px;
        border: 4px solid rgba(245, 245, 245, 1);
        padding: 47px 30px 0;
        .name {
          font-size: 20px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
          line-height: 28px;
          margin-left: 26px;
        }
        .shop {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #F5F5F5;
          img {
            width: 103px;
            height: 103px;
          }
          p.self {
            font-size: 20px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(74, 74, 74, 1);
            line-height: 28px;
            margin-left: 30px;
          }
        }
      }
    }
    .inform:nth-child(2) {
      margin-bottom: 298px;
      .cont {
        .shop {
          margin-bottom: 57px;
          img {
            width: 80px;
            height: 36px;
          }
        }
      }
    }
  }
}
</style>