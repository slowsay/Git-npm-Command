<template>
  <div class="car_shop">
    <div class="content">
      <!-- 购物车logo -->
      <div class="top">
        <img src="../../assets/image/zch/car/car.png" alt class="logo"/>
      </div>
      <!-- table表格头部 -->
      <div class="table_top">
        <div class="left">
          <img
            src="../../assets/image/zch/car/125.png"
            alt
            v-show="!all"
            @click="trigger"
            class="swite"
          />
          <img
            src="../../assets/image/zch/car/@3x.png"
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
        <div class="content_left" @click="gotoDetail(item)">
          <div class="text_img">
            <div v-if="item.dis==true">
              <p class="disbtn">失效</p>
            </div>
            <div v-else>
              <img src="../../assets/image/zch/car/125.png" alt class="swite" v-show="!item.show"
                   @click.stop="radio(item)"/>
              <img src="../../assets/image/zch/car/@3x.png" class="swite" v-show="item.show" @click.stop="radio(item)"/>
            </div>
            <img :src="item.photo" alt class="sp"/>
          </div>
          <div class="text">
            <h4>{{item.name}}</h4>

            <p>{{item.desc}}</p>

            <p>{{item.normName}}</p>
          </div>
        </div>
        <div class="price">
          <p>¥{{item.price}}</p>
        </div>
        <el-input-number
          v-model="item.buyCount"
          :min="1"
          size="small"
          :disabled="item.dis"
          @change="pedometer"
        ></el-input-number>
        <p class="policy">¥{{item.coupon}}</p>

        <p class="total">¥{{(item.buyCount*item.price).toFixed(2)}}</p>

        <div class="con_right">
          <p @click="moveCollect(item)">移到收藏夹</p>

          <p @click="delOrderHandle(item)">删除</p>
        </div>
      </div>
      <!-- 结算 -->
      <div class="button_close">
        <div class="close">
          <div class="close_left">
            <div class="left">
              <img
                src="../../assets/image/zch/car/125.png"
                alt
                v-show="!all"
                @click="trigger"
                class="swite"
              />
              <img
                src="../../assets/image/zch/car/@3x.png"
                v-show="all"
                alt
                @click="trigger"
                class="swite"
              />

              <p @click="trigger">全选</p>
            </div>
            <p class="del" @click="allDelHandle">删除</p>

            <p class="clear" @click="clearEffectHandle">清除失效商品</p>

            <p class="favor" @click="allMoveHandle">移入收藏夹</p>
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
        <div class="clear_btn" @click="accountHandle">
          <p class="china">结算</p>

          <p class="jupan">勘定を締める</p>
        </div>
      </div>
      <!-- 弹窗 -->
      <div class="poop" v-show="block">
        <div v-for="(items,i) of poop" :key="i">
          <div class="poop_top fixe_border">
            <h4>{{items.title}}</h4>
            <img :src="items.down" alt/>
          </div>
          <div class="poop_con" v-for="(item,i) of items.con" :key="i">
            <p :class="{'select_red':item.none==false}">{{item.name}}</p>
            <img :src="item.no" alt class="trigger" v-show="item.none" @click="tri(items,item)"/>
            <img :src="item.yes" alt class="trigger" v-show="!item.none" @click="tri(items,item)"/>
          </div>
        </div>
        <div class="poop_button">
          <p>添加优惠码：</p>

          <div class="input_box">
            <input type="text" placeholder="请输入优惠码"/>
            <button @click="confirm">确认</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    data: function () {
      return {
        // 弹出框的显示隐藏
        block: false,
        // 总合计
        total: 0,
        // 选中几个
        sum: 0,
        // 单选时选中的状态
        number: 0,
        //所选商品
        carbox: [],
        // 全选
        all: false,
        // 商品
        car_sp: [
//          {
//            show: false,
//            photo: require("../../assets/image/zch/car/sp.png"),
//            name: "正品七匹狼男士真皮皮带韩版纯牛皮中年青年",
//            title: "尊贵咖色",
//            price: 1888.88,
//            buyCount: 1,
//            coupon: "¥288",
//            dis: false
//          }
        ],
        // 弹出框
        poop: [
          {
            title: "全场优惠",
            down: require("../../assets/image/zch/car/down.png"),
            con: [
              {
                name: "满 2000 减 100",
                no: require("../../assets/image/zch/car/125.png"),
                yes: require("../../assets/image/zch/car/@3x.png"),
                none: true
              },
            ]
          }
        ]
      };
    },
    created: function () {
      if (publicFn.getStore("qluserInfo")) {
        this.userinfo = JSON.parse(publicFn.getStore("qluserInfo"));
        this.init();
      }
      else {
//        this.userinfo = {token: "qltoken", id: '1'};
        this.$router.push('/Login');
      }

    },
    methods: {
      init: function () {
        this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id};

        //订单列表
        this.buycarList()
      },
      //删除订单
      delOrderHandle: function (row) {
        var params = {recId: row.id};
        this.buycarDel(params);
      },
      //批量删除
      allDelHandle: function () {
        var arr = this.carbox;
        for (var i = 0, ids = [], sids = []; i < arr.length; i++) {
          sids.push(arr[i].shopId)
          ids.push(arr[i].id);
        }
        var params = {shopId: sids.join(','), recId: ids.join(',')};
        this.buycarDel(params);
      },
      //结算
      accountHandle: function () {
        var arr = this.carbox;
        for (var i = 0, ids = [], sids = []; i < arr.length; i++) {
          sids.push(arr[i].shopId)
          ids.push(arr[i].id);
        }
        if (ids.length < 1) {
          this.$message.error("还没有选择订单");
        }
        else {
          //结算
          var params = {shopId: sids.join(','), recId: ids.join(',')};
          this.buycarOrd(params);
        }
      },
      //结算
      buycarOrd: function (params) {
        var _this = this;
        API.request({
          method: "post",
          url: API.buycarOrd,
          headers: this.headerobj,
          data: API.qs.stringify(params)
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success("提交订单");
              _this.$router.push({path: '/submitOrder', query: {id: e.data.data || 1}})
            }
            else {
              _this.$message.error(JSON.stringify(e.data.msg));
            }
          }
          else {
            _this.$message.error(JSON.stringify(e.data.msg));
          }

        }).catch(function (e) {
          _this.$message.error(JSON.stringify(e));
        })
      },
      //清除失效商品
      clearEffectHandle: function () {

      },
      //调用删除接口
      buycarDel: function (params) {
        var _this = this;
        API.request({
          method: "post",
          url: API.buycarDel,
          headers: this.headerobj,
          data: API.qs.stringify(params)
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success("订单删除成功");
              _this.init();
            }
            else {
              _this.$message.error(JSON.stringify(e.data.msg));
            }
          }
          else {
            _this.$message.error(JSON.stringify(e.data.msg));
          }

        }).catch(function (e) {
          _this.$message.error(JSON.stringify(e));
        })
      },
      //批量移动到收藏夹
      allMoveHandle: function () {
        var arr = this.carbox;
        for (var i = 0, ids = [], sids = []; i < arr.length; i++) {
          sids.push(arr[i].shopId)
          ids.push(arr[i].id);
        }
        var params = {shopId: sids.join(','), recId: ids.join(','), isCollect: 2};
        //收藏/取消收藏
        this.shopBuycarCollect(params)
      },
      //移动到收藏夹
      moveCollect: function (row) {
        var params = {shopId: row.shopId, recId: row.id, isCollect: 2};
        //收藏/取消收藏
        this.shopBuycarCollect(params)
      },
      //收藏/取消收藏
      shopBuycarCollect: function (params) {
        var _this = this;
        API.request({
          method: "post",
          url: API.shopBuycarCollect,
          headers: this.headerobj,
          data: API.qs.stringify(params)
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success("收藏成功");
            }
            else {
              _this.$message.error(JSON.stringify(e.data.msg));
            }
          }
          else {
            _this.$message.error(JSON.stringify(e.data.msg));
          }

        }).catch(function (e) {
          _this.$message.error(JSON.stringify(e));
        })
      },
      //订单列表
      buycarList: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.buycarList,
          headers: this.headerobj,
//          data: API.qs.stringify({shopId: this.$route.query.id})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.car_sp = _this.exchangeData(e.data.data);
            }
            else {
              _this.$message.error(JSON.stringify(e.data.msg));
            }
          }
          else {
            _this.$message.error(JSON.stringify(e.data.msg));
          }

        }).catch(function (e) {
          _this.$message.error(JSON.stringify(e));
        })
      },
      // 全选
      trigger: function () {
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
      radio: function (a) {
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
      pedometer: function () {
        var sum = 0;
        for (var i = 0, arr = []; i < this.car_sp.length; i++) {
          if (this.car_sp[i].show == true) {
            arr.push(this.car_sp[i]);
            sum += this.car_sp[i].price * this.car_sp[i].buyCount;
          }
        }
        this.carbox = arr;
        this.total = sum.toFixed(2);
      },
      // 优惠券的弹窗
      look: function () {
        if (this.block == false) {
          this.block = true;
        } else {
          this.block = false;
        }
      },
      // 优惠券的使用
      tri: function (a, b) {
        if (b.none == true) {
          for (let i of a.con) {
            i.none = true;
          }
          b.none = false;
        } else {
          b.none = true;
        }
      },
      //点击弹出框的确定按钮
      confirm: function () {
        this.block = false;
      },
      //点击框跳转到详情页
      gotoDetail: function (row) {
        this.$router.push({path: 'shopDetail', query: {id: row.shopId}});
      },
      exchangeData: function (v) {
        for (var i = 0, arr = v; i < arr.length; i++) {
          arr[i].coupon = arr[i].coupon || 0
          arr[i].dis = false;
          arr[i].show = false;
        }
        return arr;
      }
    }
  };
</script>

<style scoped>
  .car_shop {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 1280px;
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
    border-bottom: 5px dotted rgba(102, 102, 102, 1);
    padding-bottom: 1%;
    margin-bottom: 2%;
  }

  .content .top .logo {
    width: 54px;
    height: 50px;
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
    width: 20px;
    height: 20px;
  }

  .con {
    background: rgba(255, 255, 255, 1);
    border: 4px solid rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    margin: 17px 0;
    padding: 30px;
    display: flex;
    justify-content: space-between;
  }

  .con .text_img .sp {
    width: 100px;
    height: 100px;
    margin-left: 3%;
  }

  .con .text_img .disbtn {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    background: rgba(219, 219, 219, 1);
    border-radius: 4px;
    width: 44px;
    height: 26px;
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
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(74, 74, 74, 1);
    line-height: 24px;
  }

  .con .content_left .text p {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(74, 74, 74, 1);
    line-height: 20px;
    margin-top: 7%;
  }

  .con .price {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    width: 14%;
    text-align: center;
  }

  .con .policy {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(224, 18, 32, 1);
    width: 14%;
    text-align: center;
  }

  .con .total {
    font-size: 16px;
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
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  .con .con_right p:last-child {
    margin-top: 11%;
  }

  .gray {
    background: #dbdbdb;
    border: 4px solid rgba(0, 0, 0, 0.08);
  }

  .button_close {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    align-items: center;
  }

  .close {
    width: 70%;
    height: 60px;
    border: 4px solid rgba(230, 230, 230, 1);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .close_left {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 40%;
    margin-left: 18px;
  }

  .close_left .left {
    display: flex;
  }

  .close_left > p {
    font-size: 16px;
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
    font-size: 16px;
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
    font-size: 16px;
    font-family: DFYuanW5-GB;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    width: 65%;
  }

  .button_close .view {
    display: flex;
    align-items: center;
    border: 4px solid rgba(230, 230, 230, 1);
    border-radius: 10px;
    width: 12%;
    justify-content: space-around;
    height: 60px;
  }

  .button_close .view h4 {
    font-size: 16px;
    font-family: DFYuanW5-GB;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  .button_close .view p {
    width: 16px;
    height: 16px;
    background: rgba(224, 18, 32, 1);
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }

  .clear_btn {
    width: 12%;
    height: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(224, 18, 32, 1);
    box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.08);
    border-radius: 10px;
  }

  .clear_btn .china {
    font-size: 20px;
    font-family: DFYuanW5-GB;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }

  .clear_btn .jupan {
    font-size: 12px;
    font-family: DFYuanW5-GB;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }

  .poop {
    border: 4px solid rgba(230, 230, 230, 1);
    border-radius: 10px;
    width: 25%;
    position: absolute;
    right: 1%;
    bottom: 16%;
    background: #fff;
    padding: 24px 20px;
  }

  .poop .poop_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .poop .poop_top h4 {
    font-size: 20px;
    font-family: DFYuanW5-GB;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
  }

  .fixe_border {
    border-bottom: 2px dotted rgb(102, 102, 102);
    padding-bottom: 2%;
  }

  .fixe_border img {
    width: 12px;
    height: 10px;
  }

  .poop_con {
    display: flex;
    justify-content: space-between;
    margin-top: 4%;
    margin-bottom: 4%;
  }

  .trigger {
    width: 20px;
    height: 20px;
  }

  .select_red {
    color: red;
  }

  .poop_button p {
    font-size: 18px;
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
    height: 40px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
  }

  .poop_button .input_box button {
    width: 15%;
    height: 40px;
    margin-left: 1%;
    border: 0;
    outline: 0;
    background: rgba(224, 18, 32, 1);
    border-radius: 4px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
</style>
