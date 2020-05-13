<template>
  <div>
    <!-- 右侧导航 -->
    <div class="car">
      <div class="car_img" @click="pop_car">
        <img src="../assets/img/zch/start/gouwuchekong.png" />
        <p class="text">
          购
          <br />物
          <br />车
        </p>
      </div>
      <!-- 置顶 -->
      <div class="stick">
        <a href="#app">
          <img src="../assets/img/zch/start/zd.png" alt />
        </a>
      </div>
      <div class="stick">
        <img src="../assets/img/zch/start/kf.png" alt />
      </div>
    </div>
    <!-- 购物车弹出框 -->
    <div class="pop_car" v-show="car">
      <div class="image">
        <div class="car_text" @click="pop_car">
          <img src="../assets/img/zch/start/gouwuchekong.png" alt />
          <p>
            购
            <br />物
            <br />车
          </p>
        </div>
      </div>
      <div class="content">
        <div class="content_top">
          <div class="left">
            <img src="../assets/img/zch/car/126.png" v-show="!all" alt @click="allchexd(all)" />
            <img src="../assets/img/zch/car/@3x.png" v-show="all" alt @click="allchexd(all)" />
            <p>全选</p>
          </div>
          <p @click="jump('/car_shop')">查看全部</p>
        </div>
        <div class="shop" v-for="(item,i) of car_sp" :key="i">
          <div class="left_img">
            <img :src="item.no" alt class="trigger" v-show="!item.show" @click="trigger(item)" />
            <img :src="item.yes" alt class="trigger" v-show="item.show" @click="trigger(item)" />
            <img :src="item.sp" alt class="trade" />
          </div>
          <div class="right">
            <div class="right_top">
              <p>{{item.name}}</p>
              <img :src="item.del" alt />
            </div>
            <div class="right_buttom">
              <el-input-number v-model="item.num" @change="pedometer" :min="1" size="small"></el-input-number>
              <p>
                <span>¥</span>
                <span>{{item.num*item.price}}</span>
              </p>
            </div>
          </div>
        </div>
        <!-- 总计 -->
        <div class="total">
          <div class="total_top">
            <p>已选 {{number}} 件</p>
            <h4>¥{{total}}</h4>
          </div>
          <div class="but">
            <button class="btn">结算</button>
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
      // 总价
      total: 0,
      // 选中个数
      number: 0,
      // 是否全选中
      all: false,
      // 弹出框是否显示
      car: false,
      // 商品
      car_sp: [
        {
          no: require("../assets/img/zch/car/125.png"),
          yes: require("../assets/img/zch/car/@3x.png"),
          show: false,
          sp: require("../assets/img/zch/start/sp.png"),
          name: "多功能...",
          del: require("../assets/img/zch/car/3x.png"),
          num: 1,
          price: 10000
        },
        {
          no: require("../assets/img/zch/car/125.png"),
          yes: require("../assets/img/zch/car/@3x.png"),
          show: false,
          sp: require("../assets/img/zch/start/sp.png"),
          name: "多功能...",
          del: require("../assets/img/zch/car/3x.png"),
          num: 1,
          price: 10000
        },
        {
          no: require("../assets/img/zch/car/125.png"),
          yes: require("../assets/img/zch/car/@3x.png"),
          show: false,
          sp: require("../assets/img/zch/start/sp.png"),
          name: "多功能...",
          del: require("../assets/img/zch/car/3x.png"),
          num: 1,
          price: 10000
        }
      ]
    };
  },
  mounted() {
    this.pedometer();
  },
  methods: {
    // 购物车弹出框
    pop_car() {
      if (this.car == false) {
        this.car = true;
      } else {
        this.car = false;
      }
    },
    // 计算单个商品的价格
    pedometer() {
      let sum = 0;
      for (let i = 0; i < this.car_sp.length; i++) {
        if (this.car_sp[i].show == true) {
          sum += this.car_sp[i].price * this.car_sp[i].num;
        }
      }
      this.total = sum;
    },
    // 是否选中
    trigger(i) {
      if (i.show == false) {
        i.show = true;
        this.number++;
        if (this.number == this.car_sp.length) {
          this.all = true;
        }
      } else {
        i.show = false;
        this.number--;
        if (this.number != this.car_sp.length) {
          this.all = false;
        }
      }
      this.pedometer();
    },
    // 全选
    allchexd(all) {
      if (all == false) {
        this.all = true;
        for (let i of this.car_sp) {
          i.show = true;
          this.number++;
          if (this.number >= this.car_sp.length) {
            this.number = this.car_sp.length;
          }
        }
      } else {
        this.all = false;
        for (let i of this.car_sp) {
          i.show = false;
          this.number--;
        }
      }
      this.pedometer();
    },
    // 查看全部按钮
    jump(a) {
      this.$router.push(a);
    }
  }
};
</script>

<style lang="scss" scoped>$size: 1;
.car {
  position: fixed;
  right: 5px*$size;
  bottom: 100px*$size;
  z-index:9999;
}
.car_img {
  background: url("../assets/img/zch/start/86.png") no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 44px*$size;
  align-items: center;
  height: 130px*$size;
}
.car_img img {
  width: 22px*$size;
  height: 20px*$size;
}
.car_img .text {
  font-size: 16px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.stick {
  background: url("../assets/img/zch/start/868.png");
  width: 44px*$size;
  height: 46px*$size;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px*$size;
}
.stick img {
  width: 18px*$size;
  height: 23px*$size;
}
.stick:last-child img {
  width: 22px*$size;
  height: 22px*$size;
}
.pop_car {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9999;
  width: 317px*$size;
  display: flex;
}
.pop_car .image {
  background: rgba(26, 26, 26, 1);
  box-shadow: -1px*$size 0px*$size 0px*$size 0px*$size rgba(245, 245, 245, 0.3);
  display: flex;
  align-items: center;
}
.pop_car .image .car_text img {
  width: 22px*$size;
  height: 20px*$size;
}
.pop_car .image .car_text {
  background: rgba(224, 18, 32, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px*$size 14px*$size;
  font-size: 16px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.pop_car .content {
  width: 100%;
  background: #fff;
}
.pop_car .content .content_top {
  display: flex;
  background: rgba(240, 240, 240, 1);
  justify-content: space-between;
  align-items: center;
  padding: 11px*$size 19px*$size 11px*$size 7px*$size;
}
.pop_car .content .content_top p {
  font-size: 16px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.pop_car .content .content_top .left {
  display: flex;
  align-items: center;
}
.pop_car .content .content_top .left img {
  width: 20px*$size;
  height: 20px*$size;
}
.shop {
  display: flex;
  margin-top: 4%;
}
.shop .left_img {
  display: flex;
  align-items: center;
}
.shop .left_img .trigger {
  width: 20px*$size;
  height: 20px*$size;
}
.shop .left_img .trade {
  width: 60px*$size;
  height: 60px*$size;
  margin-left: 10%;
}
.shop .right {
  width: 100%;
  margin-left: 7%;
}
.shop .right_top {
  display: flex;
  justify-content: space-between;
  width: 80%;
}
.shop .right_top p {
  font-size: 14px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.shop .right_top img {
  width: 18px*$size;
  height: 18px*$size;
}
.right_buttom {
  display: flex;
  align-items: center;
  width: 80%;
  margin-top: 4%;
}
.right_buttom p {
  display: flex;
  align-items: center;
  width: 42%;
}
.right_buttom >>> .el-input-number--small .el-input__inner {
  padding-left: 22px*$size;
  padding-right: 22px*$size;
  width: 76%;
}
.right_buttom >>> .el-input-number__decrease {
  width: 23px*$size;
}
.right_buttom >>> .el-input-number__increase {
  width: 23px*$size;
  right: 24px*$size;
}
.total {
  position: fixed;
  z-index:9999;
  bottom: 0;
  width: 270px;
  height: 100px*$size;
  background: rgba(240, 240, 240, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.total_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.total_top p {
  font-size: 16px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  margin-left: 19px*$size;
}
.total_top h4 {
  font-size: 16px*$size;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(224, 18, 32, 1);
  margin-right: 25px*$size;
}
.total .but {
  display: flex;
  align-items: center;
  justify-content: center;
}
.total .but .btn {
  font-size: 16px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  background: rgba(224, 18, 32, 1);
  border-radius: 6px*$size;
  outline: 0;
  border: 0;
  width: 250px;
  height: 44px*$size;
}
</style>