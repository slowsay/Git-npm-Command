<template>
  <div class="pay">
    <div class="bor">
      <div class="inputbox">
        <input type="text" placeholder="请输入您想充值的金额" />
        <p>元</p>
      </div>
      <div class="way" v-for="(item,i) of way" :key="i" @click="radio(item)">
        <img :src="item.yes" v-show="item.show" alt class="ico" />
        <img :src="item.no" v-show="!item.show" alt class="ico" />
        <img :src="item.img" alt class="zfb" />
        <p>{{item.name}}</p>
      </div>
      <div class="btns">
        <p @click="$router.go(-1)">取消支付</p>
        <p>立即支付</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      way: [
        {
          yes: require("../../assets/image/zch/yes.png"),
          no: require("../../assets/image/zch/no.png"),
          img: require("../../assets/image/zch/zfb.png"),
          name: "支付宝",
          show: false
        },
        {
          yes: require("../../assets/image/zch/yes.png"),
          no: require("../../assets/image/zch/no.png"),
          img: require("../../assets/image/zch/wx.png"),
          name: "微信",
          show: false
        }
      ]
    };
  },
  methods: {
    radio(item) {
      if (item.show == false) {
        for (let i of this.way) {
          i.show = false;
        }
        item.show = true;
      } else {
        item.show = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.pay {
  background: #fff;
  display: flex;
  justify-content: center;
  .bor {
    width: 1280px;
    border: 4px solid rgba(245, 245, 245, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 60px;
    .inputbox {
      width: 75%;
      position: relative;
      display: flex;
      align-items: center;
      margin-top: 30px;
      input {
        width: 100%;
        height: 40px;
        border-radius: 10px;
        border: 4px solid rgba(245, 245, 245, 1);
        outline: 0;
        padding: 0 3%;
        font-size: 24px;
      }
      p {
        position: absolute;
        right: 1%;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(155, 155, 155, 1);
        line-height: 33px;
      }
    }
    .way {
      width: 75%;
      display: flex;
      align-items: center;
      margin-top: 60px;
      .ico {
        width: 20px;
        height: 20px;
      }
      .zfb {
        width: 24px;
        height: 24px;
        margin-left: 20px;
      }
      p {
        font-size: 20px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 28px;
        margin-left: 8px;
      }
    }
    .way:nth-child(3) {
      margin-top: 26px;
    }
    .btns {
      width: 75%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 60px;
      margin-bottom: 130px;
      p {
        padding: 1% 2%;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 33px;
        border-radius: 4px;
        width: 10%;
      }
      p:first-child {
        color: rgba(74, 74, 74, 1);
        margin-right: 30px;
        border: 1px solid rgba(74, 74, 74, 1);
      }
      p:last-child {
        color: rgba(255, 255, 255, 1);
        background: rgba(255, 148, 148, 1);
      }
    }
  }
}
</style>