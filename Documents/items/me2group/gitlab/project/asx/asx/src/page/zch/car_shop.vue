<template>
  <div class="car_shop">
    <navbar></navbar>
    <div class="content">
      <!-- 购物车logo -->
      <div class="top">
        <img src="../../assets/img/zch/car/cars.png" alt class="image" />
        <div class="cash" @click="look">
          <p>优惠券</p>
          <img src="../../assets/img/zch/car/111.png" alt />
          <h4 class="right_top">3</h4>
        </div>
      </div>
      <!-- table表格头部 -->
      <div class="table_top">
        <div class="left">
          <img
            src="../../assets/img/zch/car/125.png"
            alt
            v-show="!all"
            @click="trigger"
            class="swite"
          />
          <img
            src="../../assets/img/zch/car/@3x.png"
            v-show="all"
            alt
            @click="trigger"
            class="swite"
          />
          <p @click="trigger">全选</p>
        </div>
        <p>单价</p>
        <p>数量</p>
        <p>优惠券</p>
        <p>合计</p>
        <p>操作</p>
      </div>
      <div class="con" v-for="(item,i) of car_sp" :key="i" :class="{'gray':item.dis==true}">
        <div class="content_left">
          <div class="text_img">
            <div v-if="item.dis==true">
              <p class="disbtn">失效</p>
            </div>
            <div v-else>
              <img :src="item.no" alt class="swite" v-show="!item.show" @click="radio(item)" />
              <img :src="item.yes" class="swite" v-show="item.show" @click="radio(item)" />
            </div>
            <img :src="item.sp" alt class="sp" />
          </div>
          <div class="text">
            <h4>{{item.name}}</h4>
            <p>{{item.title}}</p>
          </div>
        </div>
        <div class="price">
          <p>¥{{item.price}}</p>
        </div>
        <el-input-number
          v-model="item.num"
          :min="1"
          size="small"
          :disabled="item.dis"
          @change="pedometer"
        ></el-input-number>
        <p class="policy">{{item.policy}}</p>
        <p class="total">¥{{(item.num*item.price).toFixed(2)}}</p>
        <div class="con_right">
          <p>移到收藏夹</p>
          <p>删除</p>
        </div>
      </div>
      <!-- 结算 -->
      <div class="button_close">
        <div class="close">
          <div class="close_left">
            <div class="left">
              <img
                src="../../assets/img/zch/car/125.png"
                alt
                v-show="!all"
                @click="trigger"
                class="swite"
              />
              <img
                src="../../assets/img/zch/car/@3x.png"
                v-show="all"
                alt
                @click="trigger"
                class="swite"
              />
              <p @click="trigger">全选</p>
            </div>
            <p class="del">删除</p>
            <p class="clear">清除失效商品</p>
            <p class="favor">移入收藏夹</p>
          </div>
          <div class="close_right">
            <div class="pitch">
              已选商品&nbsp;
              <p>{{number}}</p>&nbsp;件
            </div>
            <div class="total_price">
              合计（不含运费）：
              <p>{{total}}</p>
            </div>
          </div>
        </div>
        <div class="view" @click="look">
          <h4>查看可用优惠</h4>
          <p>3</p>
        </div>
        <div class="clear_btn">
          <p class="china">结算</p>
          <p class="jupan">勘定を締める</p>
        </div>
      </div>
      <!-- 弹窗 -->
      <div class="poop" v-show="block">
        <div v-for="(items,i) of poop" :key="i">
          <div class="poop_top fixe_border">
            <h4>{{items.title}}</h4>
            <img :src="items.down" alt />
          </div>
          <div class="poop_con" v-for="(item,i) of items.con" :key="i">
            <p :class="{'select_red':item.none==false}">{{item.name}}</p>
            <img :src="item.no" alt class="trigger" v-show="item.none" @click="tri(items,item)" />
            <img :src="item.yes" alt class="trigger" v-show="!item.none" @click="tri(items,item)" />
          </div>
        </div>
        <div class="poop_button">
          <p>添加优惠码：</p>
          <div class="input_box">
            <input type="text" placeholder="请输入优惠码" />
            <button>确认</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "../../components/nav";
export default {
  components: {
    navbar
  },
  data() {
    return {
      // 弹出框的显示隐藏
      block: false,
      // 总合计
      total: 0,
      // 选中几个
      sum: 0,
      // 单选时选中的状态
      number: 0,
      // 全选
      all: false,
      // 商品
      car_sp: [
        {
          no: require("../../assets/img/zch/car/125.png"),
          yes: require("../../assets/img/zch/car/@3x.png"),
          show: false,
          sp: require("../../assets/img/zch/start/sp.png"),
          name: "专柜洋风二代陶瓷锅煲汤炖煮砂 锅耐高温健康煮饭粥锅陶锅",
          title: "红色 / 5.5l / 配餐具",
          price: 1888.88,
          num: 1,
          policy: "满1000减100",
          dis: false
        },
        {
          no: require("../../assets/img/zch/car/125.png"),
          yes: require("../../assets/img/zch/car/@3x.png"),
          show: false,
          sp: require("../../assets/img/zch/start/sp.png"),
          name: "专柜洋风二代陶瓷锅煲汤炖煮砂 锅耐高温健康煮饭粥锅陶锅",
          title: "红色 / 5.5l / 配餐具",
          price: 1888.88,
          num: 1,
          policy: "",
          dis: false
        },
        {
          no: require("../../assets/img/zch/car/125.png"),
          yes: require("../../assets/img/zch/car/@3x.png"),
          show: false,
          sp: require("../../assets/img/zch/start/sp.png"),
          name: "专柜洋风二代陶瓷锅煲汤炖煮砂 锅耐高温健康煮饭粥锅陶锅",
          title: "红色 / 5.5l / 配餐具",
          price: 1888.88,
          num: 1,
          policy: "满1000减100",
          dis: false
        },
        {
          no: require("../../assets/img/zch/car/125.png"),
          yes: require("../../assets/img/zch/car/@3x.png"),
          show: false,
          sp: require("../../assets/img/zch/start/sp.png"),
          name: "专柜洋风二代陶瓷锅煲汤炖煮砂 锅耐高温健康煮饭粥锅陶锅",
          title: "红色 / 5.5l / 配餐具",
          price: 1888.88,
          num: 1,
          policy: "满1000减100",
          dis: false
        }
      ],
      // 弹出框
      poop: [
        {
          title: "全场优惠",
          down: require("../../assets/img/zch/car/down.png"),
          con: [
            {
              name: "满 2000 减 100",
              no: require("../../assets/img/zch/car/126.png"),
              yes: require("../../assets/img/zch/car/@3x.png"),
              none: true
            },
            {
              name: "满 5000 减 500",
              no: require("../../assets/img/zch/car/126.png"),
              yes: require("../../assets/img/zch/car/@3x.png"),
              none: true
            }
          ]
        },
        {
          title: "优惠券",
          down: require("../../assets/img/zch/car/down.png"),
          con: [
            {
              name: "¥180（满1000可使用）",
              no: require("../../assets/img/zch/car/126.png"),
              yes: require("../../assets/img/zch/car/@3x.png"),
              none: true
            },
            {
              name: "¥300（满3000可使用）",
              no: require("../../assets/img/zch/car/126.png"),
              yes: require("../../assets/img/zch/car/@3x.png"),
              none: true
            },
            {
              name: "¥500（满5000可使用）",
              no: require("../../assets/img/zch/car/126.png"),
              yes: require("../../assets/img/zch/car/@3x.png"),
              none: true
            }
          ]
        },
        {
          title: "优惠码",
          down: require("../../assets/img/zch/car/down.png"),
          con: [
            {
              name: "¥300",
              no: require("../../assets/img/zch/car/126.png"),
              yes: require("../../assets/img/zch/car/@3x.png"),
              none: true
            }
          ]
        }
      ]
    };
  },
  methods: {
    // 全选
    trigger() {
      if (this.all == false) {
        this.all = true;
        if (this.all == true) {
          for (let i of this.car_sp) {
            i.show = true;
            this.number++;
            if (this.number >= this.car_sp.length) {
              this.number = this.car_sp.length;
            }
          }
        }
      } else {
        this.all = false;
        if (this.all == false) {
          for (let i of this.car_sp) {
            i.show = false;
            this.number--;
          }
        }
      }
      this.pedometer();
    },
    // 单选
    radio(a) {
      if (a.show == false) {
        a.show = true;
        if (a.show == true) {
          this.number++;
          if (this.number == this.car_sp.length) {
            this.all = true;
          }
        }
      } else {
        a.show = false;
        if (a.show == false) {
          this.number--;
          if (this.number != this.car_sp.length) {
            this.all = false;
          }
        }
      }
      this.pedometer();
    },
    // 计算总合计
    pedometer() {
      let sum = 0;
      for (let i = 0; i < this.car_sp.length; i++) {
        console.log("a");
        if (this.car_sp[i].show == true) {
          sum += this.car_sp[i].price * this.car_sp[i].num;
        }
      }
      this.total = sum.toFixed(2);
    },
    // 优惠券的弹窗
    look() {
      if (this.block == false) {
        this.block = true;
      } else {
        this.block = false;
      }
    },
    // 优惠券的使用
    tri(a, b) {
      if (b.none == true) {
        for (let i of a.con) {
          i.none = true;
        }
        b.none = false;
      } else {
        b.none = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>$size: 0.8;
.car_shop {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 1280px*$size;
  margin: auto;
}
.content {
  width: 100%;
  margin-top: 2%;
}
.content .top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px*$size dotted rgba(102, 102, 102, 1);
  padding-bottom: 1%;
  margin-bottom: 2%;
}
.content .top .image {
  width: 153px*$size;
  height: 51px*$size;
}
.content .top .cash {
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("../../assets/img/zch/car/666.png") no-repeat;
  background-size: 100%;
  margin-right: 10px*$size;
  width: 100px*$size;
  height: 40px*$size;
  position: relative;
}
.content .top .cash p {
  font-size: 16px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 36px*$size;
  margin-right: 5px*$size;
}
.content .top .cash img {
  width: 10px*$size;
  height: 7px*$size;
}
.content .top .cash .right_top {
  position: absolute;
  top: -9px*$size;
  right: -3px*$size;
  width: 16px*$size;
  height: 16px*$size;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(224, 18, 32, 1);
  border: 1px*$size solid rgba(255, 255, 255, 1);
  border-radius: 50%;
  font-size: 12px*$size;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.table_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.table_top p:nth-child(2) {
  margin-left: 22%;
}
.table_top > p:last-child {
  margin-right: 8%;
}
.table_top > p:nth-child(5) {
  margin-right: 2%;
}
.table_top .left {
  display: flex;
  align-items: center;
}
.swite {
  width: 20px*$size;
  height: 20px*$size;
}
.con {
  background: rgba(255, 255, 255, 1);
  border: 4px*$size solid rgba(0, 0, 0, 0.08);
  border-radius: 10px*$size;
  margin: 17px*$size 0;
  padding: 30px*$size;
  display: flex;
  justify-content: space-between;
}
.con .text_img .sp {
  width: 100px*$size;
  height: 100px*$size;
  margin-left: 3%;
}
.con .text_img .disbtn {
  font-size: 14px*$size;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  background: rgba(219, 219, 219, 1);
  border-radius: 4px*$size;
  width: 44px*$size;
  height: 26px*$size;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -1%;
}
.con .content_left {
  display: flex;
  width: 30%;
}
.con .content_left .text_img {
  display: flex;
  align-items: center;
}
.con .content_left .text {
  width: 100%;
  margin-left: 3%;
}
.con .content_left .text h4 {
  font-size: 16px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.con .content_left .text p {
  font-size: 16px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 24px*$size;
  margin-top: 7%;
}
.con .price {
  font-size: 16px*$size;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  width: 14%;
  text-align: center;
}
.con .policy {
  font-size: 16px*$size;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(224, 18, 32, 1);
  width: 14%;
  text-align: center;
}
.con .total {
  font-size: 16px*$size;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  width: 14%;
  text-align: center;
}
.con .con_right {
  width: 14%;
  text-align: center;
}
.con .con_right p {
  font-size: 16px*$size;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.con .con_right p:last-child {
  margin-top: 11%;
}
.gray {
  background: #dbdbdb;
  border: 4px*$size solid rgba(0, 0, 0, 0.08);
}
.button_close {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px*$size;
  align-items: center;
}
.close {
  width: 70%;
  height: 60px*$size;
  border: 4px*$size solid rgba(230, 230, 230, 1);
  border-radius: 10px*$size;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.close_left {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 40%;
  margin-left: 18px*$size;
}
.close_left .left {
  display: flex;
}
.close_left > p {
  font-size: 16px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.close_right {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 40%;
}
.close_right .pitch {
  display: flex;
  font-size: 16px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  width: 35%;
}
.close_right .pitch p,
.close_right .total_price p {
  color: red;
}
.close_right .total_price {
  display: flex;
  font-size: 16px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  width: 65%;
}
.button_close .view {
  display: flex;
  align-items: center;
  border: 4px*$size solid rgba(230, 230, 230, 1);
  border-radius: 10px*$size;
  width: 12%;
  justify-content: space-around;
  height: 60px*$size;
}
.button_close .view h4 {
  font-size: 16px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.button_close .view p {
  width: 16px*$size;
  height: 16px*$size;
  background: rgba(224, 18, 32, 1);
  border: 1px*$size solid rgba(255, 255, 255, 1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px*$size;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.clear_btn {
  width: 12%;
  height: 60px*$size;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(224, 18, 32, 1);
  box-shadow: 0px*$size -1px*$size 0px*$size 0px*$size rgba(0, 0, 0, 0.08);
  border-radius: 10px*$size;
}
.clear_btn .china {
  font-size: 20px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.clear_btn .jupan {
  font-size: 12px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.poop {
  border: 4px*$size solid rgba(230, 230, 230, 1);
  border-radius: 10px*$size;
  width: 25%;
  position: absolute;
  right: 1%;
  bottom: 10%;
  background: #fff;
  padding: 24px*$size 20px*$size;
}
.poop .poop_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.poop .poop_top h4 {
  font-size: 20px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
}
.fixe_border {
  border-bottom: 2px*$size dotted rgb(102, 102, 102);
  padding-bottom: 2%;
}
.fixe_border img {
  width: 12px*$size;
  height: 10px*$size;
}
.poop_con {
  display: flex;
  justify-content: space-between;
  margin-top: 4%;
  margin-bottom: 4%;
}
.trigger {
  width: 20px*$size;
  height: 20px*$size;
}
.select_red {
  color: red;
}
.poop_button p {
  font-size: 18px*$size;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.poop_button .input_box {
  display: flex;
  align-items: center;
}
.poop_button .input_box input {
  width: 80%;
  height: 40px*$size;
  font-size: 18px*$size;
  font-family: PingFang SC;
  font-weight: 400;
}
.poop_button .input_box button {
  width: 15%;
  height: 40px*$size;
  margin-left: 1%;
  border: 0;
  outline: 0;
  background: rgba(224, 18, 32, 1);
  border-radius: 4px*$size;
  font-size: 18px*$size;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
</style>