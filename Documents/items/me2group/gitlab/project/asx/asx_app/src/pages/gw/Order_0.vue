<template>
  <div class="background">
    <div class="top">
      <div>
        <van-icon name="arrow-left"></van-icon>
      </div>
      <p>提交订单</p>
      <div></div>
    </div>
    <div style="height:0.88rem"></div>
    <div class="address">
      <img src="../../assets/image/gw/52.png" />
      <div>
        <p>
          <span>{{name}}</span>
          <span>{{number}}</span>
        </p>
        <p>{{address}}</p>
      </div>
      <img src="../../assets/image/gw/46.png" />
    </div>
    <div class="cards">
      <div v-for="(value,key) in cards" :key="key">
        <img :src="value.src" />
        <div>
          <p>{{value.name}}</p>
          <p>{{value.detail}}</p>
        </div>
        <div>
          <p>
            <span>¥</span>
            <span>{{value.money}}</span>
          </p>
          <p>
            <span>x</span>
            <span>{{value.amount}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="coupon">
      <div @click="show=true,state=0">
        <p>全场优惠:</p>
        <p>{{coupon_0}}</p>
        <img src="../../assets/image/gw/46.png" />
      </div>
      <div @click="show=true,state=1">
        <p>优惠券:</p>
        <p>{{coupon_1}}</p>
        <img src="../../assets/image/gw/46.png" />
      </div>
      <div @click="show=true,state=2">
        <p>满赠礼品:</p>
        <p>{{coupon_2}}</p>
        <img src="../../assets/image/gw/46.png" />
      </div>
      <div @click="show=true,state=3">
        <p>优惠码:</p>
        <p>{{coupon_3}}</p>
        <img src="../../assets/image/gw/46.png" />
      </div>
    </div>
    <div class="coupon">
      <div>
        <p>运费</p>
        <p>{{money_0}}</p>
      </div>
      <div>
        <p>商品金额</p>
        <p>{{money_1}}</p>
      </div>
    </div>
    <div class="bottom">
      <p>
        <span>{{'共计'+number_0+'件,合计:'}}</span>
        <span>¥</span>
        <span>{{amount}}</span>
      </p>
      <van-button>提交订单</van-button>
    </div>
    <van-popup v-model="show" position="bottom">
      <div>
        <img src="../../assets/image/gw/4.png" @click="show=false" />
        <p v-if="state==0">优惠选择</p>
        <p v-else-if="state==1">优惠卷</p>
        <p v-else-if="state==2">赠品选择</p>
        <p v-else>优惠码</p>
      </div>
      <div v-if="state==0" class="state_0">
        <div>
          <span>{{popup_0.title}}</span>
        </div>
        <div>
          <div v-for="(value_1,key_1) in popup_0.detail" :key="key_1">
            <p :class="{red:key_1==popup_0.checked}">{{value_1.name}}</p>
            <img
              src="../../assets/image/gw/38.png"
              v-if="key_1==popup_0.checked"
              @click="popup_0.checked=-1"
            />
            <img src="../../assets/image/gw/37.png" v-else @click="popup_0.checked=key_1" />
          </div>
        </div>
      </div>
      <div v-else-if="state==1" class="state_1">
        <div v-for="(value,key) in popup_1.data" :key="key">
          <div>
            <p>{{value.name}}</p>
            <p>{{'有效期:'+value.time}}</p>
            <p>{{value.detail}}</p>
          </div>
          <div>
            <img
              src="../../assets/image/gw/38.png"
              v-if="key==popup_1.checked"
              @click="popup_1.checked=-1"
            />
            <img src="../../assets/image/gw/37.png" v-else @click="popup_1.checked=key" />
          </div>
        </div>
      </div>
      <div v-else-if="state==2" class="state_1">
        <div v-for="(value,key) in popup_2.data" :key="key">
          <img :src="value.src" />
          <div>
            <p>{{value.name}}</p>
            <p>{{'有效期:'+value.time}}</p>
            <p>{{value.detail}}</p>
          </div>
          <div>
            <img
              src="../../assets/image/gw/38.png"
              v-if="key==popup_1.checked"
              @click="popup_1.checked=-1"
            />
            <img src="../../assets/image/gw/37.png" v-else @click="popup_1.checked=key" />
          </div>
        </div>
      </div>
      <div v-else class="state_3">
        <div class="state_0">
          <div>
            <span>{{popup_3.title}}</span>
          </div>
          <div>
            <div v-for="(value_1,key_1) in popup_3.detail" :key="key_1">
              <p :class="{red:key_1==popup_3.checked}">{{value_1.name}}</p>
              <img
                src="../../assets/image/gw/38.png"
                v-if="key_1==popup_3.checked"
                @click="popup_3.checked=-1"
              />
              <img src="../../assets/image/gw/37.png" v-else @click="popup_3.checked=key_1" />
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
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "用户昵称",
      number: "12345678910",
      address: "浙江省 杭州市 拱墅区 湖州街北城天地9号楼1701室",
      cards: [
        {
          src: require("../../assets/image/gw/22.png"),
          name: "专柜洋风二代陶瓷锅煲汤炖煮砂锅耐高温健康煮饭粥锅陶锅",
          detail: "红色 / 5.5l / 配餐具",
          money: "1888.88",
          amount: "2"
        },
        {
          src: require("../../assets/image/gw/22.png"),
          name: "专柜洋风二代陶瓷锅煲汤炖煮砂锅耐高温健康煮饭粥锅陶锅",
          detail: "红色 / 5.5l / 配餐具",
          money: "1888.88",
          amount: "2"
        },
        {
          src: require("../../assets/image/gw/22.png"),
          name: "专柜洋风二代陶瓷锅煲汤炖煮砂锅耐高温健康煮饭粥锅陶锅",
          detail: "红色 / 5.5l / 配餐具",
          money: "1888.88",
          amount: "2"
        },
        {
          src: require("../../assets/image/gw/22.png"),
          name: "专柜洋风二代陶瓷锅煲汤炖煮砂锅耐高温健康煮饭粥锅陶锅",
          detail: "红色 / 5.5l / 配餐具",
          money: "1888.88",
          amount: "2"
        }
      ],
      coupon_0: "123",
      coupon_1: "123",
      coupon_2: "123",
      coupon_3: "123",
      money_0: "123",
      money_1: "123",
      // 底部
      number_0: "2",
      amount: "3226",
      //弹窗
      show: true,
      state: 0,
      popup_0: {
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
      popup_1: {
        checked: -1,
        data: [
          {
            name: "满¥3000减¥300",
            time: "2019.08.09 - 2019.11.09",
            detail: "仅限本产品"
          },
          {
            name: "满¥3000减¥300",
            time: "2019.08.09 - 2019.11.09",
            detail: "仅限本产品"
          },
          {
            name: "满¥3000减¥300",
            time: "2019.08.09 - 2019.11.09",
            detail: "仅限本产品"
          }
        ]
      },
      popup_2: {
        checked: -1,
        data: [
          {
            src:require('../../assets/image/gw/22.png'),
            name: "满¥3000减¥300",
            time: "2019.08.09 - 2019.11.09",
            detail: "仅限本产品"
          },
          {
             src:require('../../assets/image/gw/22.png'),
            name: "满¥3000减¥300",
            time: "2019.08.09 - 2019.11.09",
            detail: "仅限本产品"
          },
          {
             src:require('../../assets/image/gw/22.png'),
            name: "满¥3000减¥300",
            time: "2019.08.09 - 2019.11.09",
            detail: "仅限本产品"
          }
        ]
      },
      popup_3: {
        title: "优惠码",
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
      value: ""
    };
  }
};
</script>

<style lang="less" scoped>
.background {
  position: absolute;
  top: 0rem;
  bottom: 1rem;
  width: 100%;
  background: #fafafa;
  overflow: auto;
}
.top {
  height: 0.88rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background: #fff;
  z-index: 99;
  .van-icon {
    font-size: 0.32rem;
    color: black;
    margin-left: 0.3rem;
  }
  p {
    font-size: 0.32rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  div {
    width: 1rem;
  }
}
.address {
  background: #fff;
  height: 1.65rem;
  border-top: 0.1rem solid #fbfbfb;
  border-bottom: 0.1rem solid #fbfbfb;
  padding: 0 0.3rem;
  display: flex;
  align-items: center;
  img:nth-child(1) {
    width: 0.6rem;
    margin-right: 0.2rem;
  }
  img:nth-child(3) {
    width: 0.12rem;
    margin-left: auto;
  }
  div {
    p:nth-child(1) {
      margin-bottom: 0.2rem;
      line-height: 0.26rem;
      span:nth-child(1) {
        font-size: 0.26rem;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-right: 0.2rem;
      }
      span:nth-child(2) {
        font-size: 0.26rem;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
    p:nth-child(2) {
      width: 5rem;
      font-size: 0.26rem;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 0.36rem;
    }
  }
}
.cards {
  background: #fff;
  padding-top: 0.3rem;
  > div {
    height: 1.4rem;
    padding: 0 0.3rem 0.3rem;
    display: flex;
    align-items: center;
    img {
      width: 1.4rem;
      height: 1.4rem;
      margin-right: 0.25rem;
    }
    > div:nth-of-type(1) {
      width: 3.6rem;
      p:nth-child(1) {
        font-size: 0.26rem;
        font-weight: 300;
        color: rgba(51, 51, 51, 1);
        line-height: 0.3rem;
        height: 0.8rem;
      }
      p:nth-child(2) {
        font-size: 0.24rem;
        font-weight: 300;
        color: rgba(153, 153, 153, 1);
        height: 0.6rem;
      }
    }
    > div:nth-of-type(2) {
      margin-left: auto;
      p:nth-child(1) {
        font-size: 0.26rem;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        height: 0.8rem;
        span:nth-child(1) {
          font-size: 0.2rem;
        }
      }
      p:nth-child(2) {
        font-size: 0.24rem;
        font-weight: 300;
        color: rgba(153, 153, 153, 1);
        text-align: right;
        height: 0.6rem;
      }
    }
  }
}
.coupon {
  background: #fff;
  border-top: 0.1rem solid #fbfbfb;
  padding: 0.15rem 0.3rem;
  > div {
    height: 0.5rem;
    display: flex;
    align-items: center;
    p:nth-child(1) {
      font-size: 0.24rem;
      font-weight: 300;
      color: rgba(51, 51, 51, 1);
    }
    p:nth-child(2) {
      margin-left: auto;
      font-size: 0.24rem;
      font-weight: 300;
      color: rgba(224, 18, 32, 1);
    }
    img {
      width: 0.12rem;
      margin-left: 0.15rem;
    }
  }
}
.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 0.24rem;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    margin-left: 0.3rem;
    span:nth-child(2) {
      color: #ff2d26;
    }
    span:nth-child(3) {
      color: #ff2d26;
      font-size: 0.36rem;
    }
  }
  .van-button {
    width: 2.6rem;
    height: 0.8rem;
    background: rgba(224, 18, 32, 1);
    border-radius: 0.4rem;
    border: none;
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 0.8rem;
  }
}
.van-popup {
  overflow: hidden;
  height: 6.8rem;
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
}
.state_0 {
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
.state_1 {
  height: 5.4rem;
  padding: 0.6rem 0.3rem 0;

  > div {
    display: flex;
    align-items: center;
    height: 1.6rem;
    background: #fef6f6;
    border-radius: 0.04rem;
    margin-bottom: 0.2rem;
    > img {
      width: 1rem;
      height: 1rem;
      margin-left: 0.2rem;
      margin-right: -0.1rem;
    }
    > div:nth-of-type(1) {
      margin-left: 0.36rem;
      p {
        font-size: 0.18rem;
        font-weight: 300;
        color: rgba(51, 51, 51, 1);
        line-height: 0.18rem;
        margin-top: 0.1rem;
      }
      p:nth-child(1) {
        font-size: 0.36rem;
        font-weight: 400;
        color: rgba(255, 45, 38, 1);
        line-height: 0.36rem;
        margin: 0;
      }
    }
    > div:nth-of-type(2) {
      margin-left: auto;
      margin-right: 0.6rem;
      img {
        width: 0.26rem;
      }
    }
  }
}
.state_3 > div:nth-last-child(1) {
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
</style>