<template>
  <div class="afterSale">
    <navbar></navbar>
    <div class="contain">
      <div class="topBox">
        <p class="title">订单信息</p>
        <p class="orderId">订单编号{{form.number}}</p>
        <div class="shopBox">
          <div class="imgBox">
            <img :src="form.img" alt />
          </div>
          <div class="boxRight">
            <p class="shopName">{{form.shopName}}</p>
            <p class="color">{{form.color+'/'+form.area+'L'+'/'+form.type}}</p>
            <p class="money">￥{{form.money}}</p>
          </div>
        </div>
      </div>
      <div class="middleBox">
        <p class="title">退款理由</p>
        <van-radio-group v-model="radio">
          <van-radio
            icon-size=".26rem"
            checked-color="#E01220"
            v-for="(item,index) in form.reason"
            :key="index"
            :name="index"
          >{{item}}</van-radio>
        </van-radio-group>
      </div>
      <div class="reasonMoneyBox">
        <p class="title">退款金额</p>
        <p class="reasonMoney">退款金额：￥{{form.reasonMoney}}</p>
      </div>
      <div class="detail">
        <p class="title">描述详情</p>
        <van-cell-group>
          <van-field :border="false"  v-model="message" rows="1" autosize type="textarea" placeholder="描述详情" />
        </van-cell-group>
      </div>
      <div class="updateImg">
        <p class="title">上传图片(最多9张)</p>
        <div class="imgsBox">
          <van-uploader :after-read="afterRead" v-model="fileList" multiple  :max-count="9" >
            <img src="../../assets/image/zxw/update.png" alt="">
            
          </van-uploader>
        </div>
        <button class="btn">确认提交</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "1",
      fileList: [
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        // { url: "https://cloud-image", isImage: true }
      ],

      message: "",
      form: {
        number: "12423142134",
        shopName: "安徽接口返回大口径爱上开发哈克斯的话费卡很少看到发",
        color: "红色",
        area: "3",
        img: require("../../assets/image/zxw/shop.png"),
        type: "配餐具",
        money: "22",
        reason: ["交换机卡号发", "夸奖哈开始减肥", "我就是想退款"],
        reasonMoney: "22"
      }
    };
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    }
  }
};
</script>

<style lang="less" scoped>
.contain {
  width: 7.5rem;
  padding: 0.1rem 0 0 0;
  background-color: #fafafa;
  .topBox,
  .middleBox,
  .reasonMoneyBox,
  .detail,
  .updateImg {
    width: 7.5rem;
    padding: 0.3rem;
    margin-bottom: 0.1rem;
    box-sizing: border-box;
    background-color: #fff;
  }
  .title {
    font-size: 0.28rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 0.24rem;
  }
  .orderId {
    font-size: 0.26rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 0.36rem;
  }
  .shopBox {
    width: 6.9rem;
    height: 2rem;
    background: rgba(250, 250, 250, 1);
    border-radius: 0.1rem;
    margin-top: 0.24rem;
    display: flex;
    padding: 0.2rem;
    box-sizing: border-box;
  }
  .imgBox {
    width: 1.4rem;
    height: 1.4rem;
    margin-right: 0.25rem;
    img {
      width: 1.4rem;
      height: 1.4rem;
    }
  }
  .boxRight {
    .shopName {
      font-size: 0.26rem;
      font-family: PingFang SC;
      color: rgba(51, 51, 51, 1);
      line-height: 0.3rem;
      height: 0.6rem;
    }
    .color {
      font-size: 0.24rem;
      font-family: PingFang SC;
      font-weight: 300;
      color: rgba(153, 153, 153, 1);
      margin: 0.12rem 0;
    }
    .money {
      font-size: 0.24rem;
      font-family: PingFang SC;
      font-weight: 300;
      color: rgba(224, 21, 35, 1);
    }
  }
  .middleBox {
    font-size: 0.26rem;
  }
  .reasonMoney {
    font-size: 0.26rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(224, 21, 35, 1);
  }
  .van-cell {
    padding: 0.24rem 0;
  }
  .updateImg{
    width: 7.5rem;
    padding:.3rem 0 .3rem .3rem;
    .imgsBox{
      img{
        width: 2.16rem;
        height: 2.16rem;
      }
      /deep/.van-uploader__preview-image{
        width: 2.16rem;
        height: 2.16rem;
        float: left;
      }
      /deep/.van-uploader__preview{
        margin:0 .21rem .21rem 0;
      }
      /deep/.van-uploader__preview-delete{
        top:-.16rem;
        right: -.16rem;
        font-size:.36rem;
      }
    }
  }

  .btn{
      width: 6.9rem;
      height: 0.8rem;
      background: rgba(224, 21, 35, 1);
      border-radius: 0.4rem;
      font-size: 0.28rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      border: none;
      margin-top:.6rem;
  }
}
</style>