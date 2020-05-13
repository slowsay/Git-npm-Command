<template>
  <div class="pay">
    <div class="bor">
      <div class="inputbox">
        <input type="text" v-model="price" placeholder="请输入您想充值的金额"/>

        <p>元</p>
      </div>
      <div class="way" v-for="(item,index) in way" :key="index" @click="channelPayHandle(item,index)">
        <img src="../../assets/image/zch/yes.png" v-show="item.show" class="ico"/>
        <img src="../../assets/image/zch/no.png" v-show="!item.show" class="ico"/>
        <img :src="item.img" class="zfb"/>

        <p>{{item.name}}</p>
      </div>
      <div class="btns">
        <p @click="$router.go(-1)">取消支付</p>

        <p @click="justHandle">立即支付</p>
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
        cutinex: 0,
        price: '',
        way: [
          {
            img: require("../../assets/image/zch/zfb.png"),
            name: "支付宝",
            show: false
          },
          {
            img: require("../../assets/image/zch/wx.png"),
            name: "微信",
            show: false
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
        this.$router.push('/Login');
      }
    },
    methods: {
      init: function () {
        this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id};
      },
      //
      channelPayHandle: function (item, index) {
        this.cutindex = index;
        this.exchangeData(index);
      },
      justHandle: function () {
        var params = {}, _amount = this.price;
        if (_amount.length < 1) {
          _this.$message.error("请输入充值金额");
        } else {
          params = {contactId: this.userinfo.id, amount: _amount, type: 3}
          if (this.cutindex == 0) {
            //支付宝
            this.payAli(params);
          }
          else {
            //微信
            this.payWexin(params);
          }
        }
      },
      //支付宝支付
      payAli: function (params) {
        var _this = this;
        API.request({
          method: "post",
          url: API.payAli,
          headers: this.headerobj,
          data: API.qs.stringify(params)
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success("支付成功");
              _this.$router.push('/Personal/Wallet');
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
      //微信支付
      payWexin: function (params) {
        var _this = this;
        API.request({
          method: "post",
          url: API.payWexin,
          headers: this.headerobj,
          data: API.qs.stringify(params)
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success("支付成功");
              _this.$router.push('/Personal/Wallet');
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
      exchangeData: function (index) {
        for (var i = 0, arr = this.way; i < arr.length; i++) {
          if (i == index) {
            arr[i].show = true;
          }
          else {
            arr[i].show = false;
          }
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
