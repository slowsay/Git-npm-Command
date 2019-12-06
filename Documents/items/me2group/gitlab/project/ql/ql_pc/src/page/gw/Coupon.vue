<template>
  <div id="Coupon">
    <div class="top">
      <div>
        <p>我的优惠卷</p>
      </div>
      <div></div>
    </div>
    <div class="navigation">
      <p @click="state_0=!state_0" :class="{active:state_0==false}">
        <span>红包</span>
        <img src="../../assets/image/gw/27.png" />
      </p>
      <p @click="state_1=!state_1" :class="{active:state_1==false}">
        <span>打折卷</span>
        <img src="../../assets/image/gw/27.png" />
      </p>
      <p @click="state_2=!state_2" :class="{active:state_2==false}">
        <span>指定优惠卷</span>
        <img src="../../assets/image/gw/27.png" />
      </p>
      <p @click="state_3=!state_3" :class="{active:state_3==false}">
        <span>优惠金额</span>
        <img src="../../assets/image/gw/26.png" />
      </p>
      <p @click="state_4=!state_4" :class="{active:state_4==false}">
        <span>到期时间</span>
        <img src="../../assets/image/gw/26.png" />
      </p>
    </div>
    <div class="cards">
      <div v-for="(item,index) in data" :key="index" :class="{two:(index+1)%2==0}">
        <p>{{'￥'+item.money}}</p>
        <p>{{item.title}}</p>
        <p>{{'有效期至:'+item.time}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      state_0: true,
      state_1: true,
      state_2: true,
      state_3: true,
      state_4: true,
      data: [
        { money: 10, title: "满100元可用", time: "2019.08.01-2019.08.20" },
        { money: 10, title: "满100元可用", time: "2019.08.01-2019.08.20" },
        { money: 10, title: "满100元可用", time: "2019.08.01-2019.08.20" },
        { money: 10, title: "满100元可用", time: "2019.08.01-2019.08.20" },
        { money: 10, title: "满100元可用", time: "2019.08.01-2019.08.20" }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
#Coupon {
  .top {
    margin-bottom: 10px;
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
  .navigation {
    margin-top: 20px;
    width: 980px;
    height: 40px;
    background: rgba(245, 245, 245, 1);
    display: flex;
    align-items: center;
    p {
      font-size: 16px;
      font-weight: 500;
      color: rgba(74, 74, 74, 1);
      line-height: 22px;
      margin-left: 60px;
      span {
        vertical-align: middle;
        margin-right: 10px;
      }
      img {
        vertical-align: middle;
        width: 13px;
      }
    }
    p:nth-child(1) {
      margin-left: 30px;
    }
    p:nth-child(4) {
      margin-left: auto;
      img {
        width: 8px;
      }
    }
    p:nth-child(5) {
      img {
        width: 8px;
        margin-right: 30px;
      }
    }
    .active {
      img {
        transform: rotate(180deg);
      }
    }
  }
  .cards > div {
    float: left;
    width: 480px;
    height: 177px;
    background: url("../../assets/image/gw/28.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: 30px 20px 0 0px;
    position: relative;
    p:nth-child(1) {
      font-size: 60px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 177px;
      position: absolute;
      top: 0;
      left: 0;
    }
    p:nth-child(2) {
      font-size: 19px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 27px;
      margin: 61px 0 6px 153px;
    }
    p:nth-child(3) {
      font-size: 19px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 27px;
      margin-left: 153px;
    }
  }
  .two {
    margin-right: 0 !important;
  }
}
</style>