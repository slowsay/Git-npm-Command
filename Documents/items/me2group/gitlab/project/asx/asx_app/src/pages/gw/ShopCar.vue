<template>
  <div class="background">
    <div class="top">
      <div @click="$router.go(-1)">
        <van-icon name="arrow-left" />
      </div>
      <p>购物车</p>
      <div>
        <p v-if="state==0" @click="state=1">编辑</p>
        <p v-else @click="state=0">完成</p>
      </div>
    </div>
    <div class="all">
      <img src="../../assets/image/gw/38.png" v-if="state_0==true" @click="select(false)" />
      <img src="../../assets/image/gw/37.png" v-else @click="select(true)" />
      <p>全选</p>
    </div>
    <div>
      <div class="card" v-for="(value,key) in shop" :key="key">
        <div>
          <img
            src="../../assets/image/gw/38.png"
            v-if="value.checked==true"
            @click="value.checked=false"
          />
          <img src="../../assets/image/gw/37.png" v-else @click="value.checked=true" />
        </div>
        <div>
          <img :src="value.src" />
        </div>
        <div>
          <p>{{value.name}}</p>
          <p>{{value.detail}}</p>
          <p>{{'￥'+value.amount}}</p>
        </div>
        <p v-if="state==0">{{'x'+value.number}}</p>
        <van-stepper
          integer
          v-else
          v-model="value.numebr"
          step="1"
          button-size=".4rem"
          @change="(val)=>{value.number=val }"
        />
      </div>
    </div>
    <div class="bottom" v-if="state==0">
      <p>
        <img src="../../assets/image/gw/38.png" v-if="state_0==true" @click="select(false)" />
        <img src="../../assets/image/gw/37.png" v-else @click="select(true)" />
        <span>全选</span>
      </p>
      <div>
        <p>
          <span>不含运费</span>
          <span>合计:</span>
          <span>{{'￥'+all}}</span>
        </p>
        <p @click="show=true">
          <span>优惠明细&nbsp;</span>
          <img src="../../assets/image/gw/39.png" />
        </p>
      </div>
      <van-button>结算</van-button>
    </div>
    <div class="bottom_0" v-else>
      <p>
        <img src="../../assets/image/gw/38.png" v-if="state_0==true" @click="select(false)" />
        <img src="../../assets/image/gw/37.png" v-else @click="select(true)" />
        <span>全选</span>
      </p>
      <van-button>移入收藏夹</van-button>
      <van-button>删除</van-button>
    </div>
    <van-popup v-model="show" position="bottom">
      <div>
        <img src="../../assets/image/gw/4.png" @click="show=false" />
        <p>优惠详细</p>
      </div>
      <div>
        <div v-for="(value,key) in coupon" :key="key" class="coupon">
          <div>
            <span>{{value.title}}</span>
          </div>
          <div>
            <div v-for="(value_1,key_1) in value.detail" :key="key_1">
              <p :class="{red:key_1==value.checked}">{{value_1.name}}</p>
              <img
                src="../../assets/image/gw/38.png"
                v-if="key_1==value.checked"
                @click="value.checked=-1"
              />
              <img src="../../assets/image/gw/37.png" v-else @click="value.checked=key_1" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <p>添加优惠码</p>
        <div>
          <van-field v-model="value" placeholder="请输入用户名" />
          <van-button>确认</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: 0, //编辑状态
      shop: [
        {
          src: require("../../assets/image/gw/22.png"),
          name: "专柜洋风二代陶瓷锅煲汤炖煮砂锅专柜洋风二代陶瓷锅煲汤炖煮砂锅",
          detail: "红色 / 5.5l / 配餐具",
          amount: "1888.88",
          number: "1",
          checked: false
        },
        {
          src: require("../../assets/image/gw/22.png"),
          name: "专柜洋风二代陶瓷锅煲汤炖煮砂锅专柜洋风二代陶瓷锅煲汤炖煮砂锅",
          detail: "红色 / 5.5l / 配餐具",
          amount: "1888.88",
          number: "1",
          checked: false
        },
        {
          src: require("../../assets/image/gw/22.png"),
          name: "专柜洋风二代陶瓷锅煲汤炖煮砂锅专柜洋风二代陶瓷锅煲汤炖煮砂锅",
          detail: "红色 / 5.5l / 配餐具",
          amount: "1888.88",
          number: "1",
          checked: false
        }
      ],
      show: false,
      coupon: [
        {
          title: "全场优惠",
          checked: 0,
          detail: [
            {
              name: "¥300（满3000可使用）"
            },
            {
              name: "¥300（满3000可使用）"
            }
          ]
        },
        {
          title: "全场优惠",
          checked: 0,
          detail: [
            {
              name: "¥300（满3000可使用）"
            },
            {
              name: "¥300（满3000可使用）"
            },
            {
              name: "¥300（满3000可使用）"
            }
          ]
        },
        {
          title: "全场优惠",
          checked: 0,
          detail: [
            {
              name: "¥300（满3000可使用）"
            },
            {
              name: "¥300（满3000可使用）"
            },
            {
              name: "¥300（满3000可使用）"
            }
          ]
        }
      ],
      value: ""
    };
  },
  methods: {
    // 全选
    select(value) {
      if (value === true) {
        for (let x in this.shop) {
          this.shop[x].checked = true;
        }
      } else {
        for (let x in this.shop) {
          this.shop[x].checked = false;
        }
      }
    }
  },
  computed: {
    all() {
      let money = 0;
      for (let x in this.shop) {
        if (this.shop[x].checked == true)
          money += this.shop[x].amount * this.shop[x].number;
      }
      return money;
    },
    state_0() {
      let checked = true;
      for (let x in this.shop) {
        if (this.shop[x].checked == false) checked = false;
      }
      if (checked == true) return true;
      else return false;
    }
  }
};
</script>

<style lang="less" scoped>
.background {
  position: absolute;
  top: 0.88rem;
  bottom: 0.9rem;
  width: 100%;
  background: #fafafa;
  overflow: auto;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 0.88rem;
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;

  p:nth-of-type(1) {
    font-size: 0.3rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  div {
    width: 1rem;
    .van-icon {
      font-size: 0.32rem;
      color: black;
    }
    p {
      text-align: right;
      font-size: 0.26rem;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
}
.all {
  height: 0.88rem;
  background: #fff;
  border-bottom: 0.01rem solid #f0f0f0;
  margin-top: 0.1rem;
  display: flex;
  align-items: center;
  img {
    width: 0.28rem;
    margin: 0 0.2rem 0 0.3rem;
  }
  p {
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
}
.card {
  display: flex;
  align-items: center;
  height: 2rem;
  background: #fff;
  position: relative;
  overflow: hidden;
  &:not(:last-child)::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0.78rem;
    border-bottom: 0.01rem solid #f0f0f0;
  }
  div:nth-child(1) {
    img {
      width: 0.28rem;
      margin: 0 0.2rem 0 0.3rem;
    }
  }
  div:nth-child(2) {
    img {
      width: 1.4rem;
      height: 1.4rem;
      margin-right: 0.2rem;
    }
  }
  div:nth-child(3) {
    p:nth-child(1) {
      font-size: 0.28rem;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 0.28rem;
      width: 4.4rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p:nth-child(2) {
      font-size: 0.24rem;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 0.24rem;
      margin: 0.24rem 0 0.35rem;
    }
    p:nth-child(3) {
      font-size: 0.28rem;
      font-weight: 400;
      color: rgba(224, 18, 32, 1);
      line-height: 0.28rem;
    }
  }
  > p {
    position: absolute;
    font-size: 0.24rem;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 0.24rem;
    bottom: 0.4rem;
    right: 0.3rem;
  }
  .van-stepper {
    position: absolute;
    right: 0.3rem;
    bottom: 0.3rem;
    /deep/.van-stepper__input {
      background: #fff;
    }
  }
}
.bottom {
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 0.9rem;
  width: 100%;
  > p {
    line-height: 0.28rem;
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    img {
      width: 0.28rem;
      margin: 0 0.1rem 0 0.3rem;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
  }
  > div {
    margin-left: auto;
    p:nth-child(1) {
      font-size: 0.26rem;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 0.26rem;
      margin-bottom: 0.1rem;
      span {
        vertical-align: middle;
      }
      span:nth-child(1) {
        font-size: 0.18rem;
        color: rgba(153, 153, 153, 1);
      }
      span:nth-child(3) {
        color: #e01220;
      }
    }
    p:nth-child(2) {
      text-align: right;
      font-size: 0.18rem;
      font-weight: 400;
      color: rgba(243, 67, 13, 1);
      line-height: 0.15rem;
      img {
        width: 0.15rem;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
      }
    }
  }
  > .van-button {
    width: 1.6rem;
    height: 0.6rem;
    background: rgba(224, 18, 32, 1);
    border-radius: 0.3rem;
    margin: 0 0.3rem 0 0.17rem;
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    border: none;
    line-height: 0.6rem;
  }
}
.bottom_0 {
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 0.9rem;
  width: 100%;
  > p {
    line-height: 0.28rem;
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    img {
      width: 0.28rem;
      margin: 0 0.1rem 0 0.3rem;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
  }
  .van-button {
    width: 2rem;
    height: 0.6rem;
    background: transparent;
    border: 0.01rem solid rgba(255, 150, 0, 1);
    border-radius: 0.3rem;
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(255, 150, 0, 1);
    line-height: 0.6rem;
    margin-left: auto;
  }
  .van-button:nth-of-type(2) {
    margin: 0 0.3rem 0 0.2rem;
    color: rgba(224, 18, 32, 1);
    border: 0.01rem solid rgba(224, 18, 32, 1);
  }
}
.van-popup {
  overflow: hidden;
  border-radius: 0.3rem 0.3rem 0rem 0rem;
  > div:nth-child(1) {
    overflow: hidden;
    img {
      float: left;
      width: 0.28rem;
      margin: 0.3rem 0.3rem 0;
    }
    p {
      text-align: center;
      font-size: 0.36rem;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      width: fit-content;
      margin: 0.29rem auto 0;
      line-height: 0.34rem;
    }
  }
  > div:nth-child(3) {
    padding: 0 0.3rem;
    p {
      font-size: 0.2rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin: 0.4rem 0 0.2rem;
    }
    > div {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      .van-field {
        width: 5.5rem;
        height: 0.6rem;
        background: rgba(245, 245, 245, 1);
        border-radius: 0.04rem;
        padding: 0 0 0 0.2rem;
        font-size: 0.24rem;
        line-height: 0.6rem;
      }
      .van-button {
        width: 1.2rem;
        height: 0.6rem;
        background: rgba(224, 18, 32, 1);
        border-radius: 0.04rem;
        border: none;
        font-size: 0.24rem;
        font-weight: 400;
        line-height: 0.6rem;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
.coupon {
  padding: 0 0.3rem;
  > div:nth-child(1) {
    height: 1rem;
    line-height: 1rem;
    font-size: 0.24rem;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    border-bottom: 0.01rem dotted #e6e6e6;
    span {
      line-height: 0.6rem;
      vertical-align: bottom;
    }
  }
  > div:nth-child(2) {
    div {
      height: 0.26rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.3rem;
      p {
        font-size: 0.28rem;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      img {
        width: 0.26rem;
      }
    }
  }
}
</style>