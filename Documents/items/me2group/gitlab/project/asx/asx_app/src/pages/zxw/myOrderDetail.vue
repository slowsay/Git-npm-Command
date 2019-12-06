<template>
  <div class="myOrderDetail">
    <div class="top">
      <navbar></navbar>
      <div class="cancelOrder" v-if="state==1" @click="cancelOrder">取消订单</div>
    </div>
    <div class="contain">
      <div class="box">
        <div class="topBox">
          <div class="imgBox">
            <img :src="form.userImg" alt />
          </div>
          <div class="nameBox">
            <p style="font-size:.26rem;">
              {{form.userName}}
              <span style="color:#999999">{{form.phone}}</span>
            </p>
            <p>{{form.address}}</p>
          </div>
        </div>
        <div class="bottomBox" style="margin-bottom:.3rem">
          <div class="imgBox">
            <img src="../../assets/image/zxw/wuliu.png" alt />
          </div>
          <div class="nameBox">
            <p>运单号码：{{form.number}}</p>
            <p style="color:#999999" v-if="state==1||state==2">暂无物流信息</p>
            <div v-if="state==3||state==4||state==5||state==6">
              <p
                class="info"
                v-show="onShow==true"
                v-for="(item,index) in form.info"
                :key="index"
              >{{item}}</p>
              <p
                class="info"
                v-show="onShow==false"
                v-for="(i,index1) in form.info.slice(0,1)"
                :key="index1"
              >{{i}}</p>
            </div>
          </div>
        </div>
        <div v-if="state==3||state==4||state==5||state==6">
          <div class="rook" v-show="onShow==false" @click="onShow=true">查看全部物流信息 ▼</div>
          <div class="rook" v-show="onShow==true" @click="onShow=false">收起 ▲</div>
        </div>
      </div>
      <div class="shopBox">
        <div class="shopTop">
          <div class="shopImg">
            <img :src="form.shopImg" alt />
          </div>
          <div class="shopName">
            <p>{{form.shopName}}</p>
            <p>{{form.color+'/'+form.area+'L'+'/'+form.style}}</p>
          </div>
          <div class="boxRight">
            <p class="money">
              <span style="font-size:.2rem">￥</span>
              {{form.money}}
            </p>
            <p class="count">×{{form.count}}</p>
          </div>
        </div>
        <div class="shopBottom">
          <div>
            <span>运费</span>
            <span>￥{{form.yunfei}}</span>
          </div>
          <div>
            <span>优惠</span>
            <span>-￥{{form.youhui}}</span>
          </div>
          <p class="sum">
            共{{form.count}}件商品&nbsp;合计:
            <span style="color:#4D4D4D;font-weight:400;">￥</span>
            <span
              style="color:#4D4D4D;font-weight:400;font-size:.34rem"
            >{{ Number(form.count)*Number(form.money)+Number(form.yunfei)-Number(form.youhui)}}</span>
          </p>
        </div>
      </div>
      <div class="shopInfo">
        <p class="remark">备注信息</p>
        <p class="remarkText">{{form.remark}}</p>
        <p class="remark" style="margin-top:.24rem">订单信息</p>
        <p class="orderId">订单编号：{{form.orderId}}</p>
        <p class="orderId">创建时间：{{form.createTime}}</p>
        <div class="pay" v-if="state==2||state==3||state==4||state==5">
          <p class="orderId">支付时间：{{form.payTime}}</p>
          <p class="orderId">支付方式：{{form.payType}}</p>
        </div>
      </div>
      <div class="tuikuanBox">
        <p class="remark">退款信息</p>
        <p class="tuikuanInfo">{{form.tuikuanInfo}}</p>
        <div>
          <img
            v-for="(item2,index2) in form.imgBox"
            :src="item2"
            :key="index2"
            alt
            :class="(index2+1)%3==0 ? 'reds': 'tuikuanImg'"
          />
        </div>
      </div>
    </div>
    <div class="btnBox" v-if="state==1">
      <button class="btn" @click.stop="show=true">立即支付</button>
    </div>
    <div class="btnBox" v-if="state==2">
      <button class="btn1" @click="$router.push('/afterSale')">申请售后</button>
      <button class="btn2" @click="$toast('已提醒卖家发货')">催促发货</button>
    </div>
    <div class="btnBox" v-if="state==3">
      <button class="btn1" @click="$router.push('/afterSale')">申请售后</button>
      <button class="btn2" @click="confirmShop">确认收货</button>
    </div>
    <div class="btnBox" v-if="state==4">
      <button class="btn1" @click="$router.push('/afterSale')">申请售后</button>
      <button class="btn2" @click="$router.push('comment')">立即评价</button>
    </div>
    <div class="btnBox" v-if="state==5">
      <button class="btn" style="background:#333333" @click="delOrder">删除订单</button>
    </div>
    <div class="btnBox" v-if="state==6">
      <button class="btn1" @click="$toast('联系客服')">联系客服</button>
      <button class="btn2" @click="cancelSale">取消售后</button>
    </div>
    <!-- 点击付款时会出现弹框 -->
    <div class="pop">
      <van-popup v-model="show" round position="bottom" :style="{ height: '6.8rem'}">
        <div class="popBox">
          <div class="popTitle">
            <van-row>
              <van-col :span="2">
                <van-icon style="margin-top:.08rem" @click="show=false" name="cross"></van-icon>
              </van-col>
              <van-col :span="20">
                <p class="popname">选择支付方式</p>
              </van-col>
            </van-row>
          </div>
          <div class="popContain">
            <van-radio-group v-model="radio">
              <div class="itemBox" @click="radio='1'">
                <div>
                  <img src="../../assets/image/zxw/zhifubao.png" alt />
                </div>
                <p>支付宝</p>
                <div class="radioIcon">
                  <van-radio icon-size=".3rem" checked-color="#E01523" name="1" />
                </div>
              </div>
              <div class="itemBox" @click="radio='2'">
                <div>
                  <img src="../../assets/image/zxw/weixin.png" alt />
                </div>
                <p>微信</p>
                <div class="radioIcon">
                  <van-radio icon-size=".3rem" checked-color="#E01523"  name="2" />
                </div>
              </div>
              <div class="itemBox" @click="radio='3'">
                <div>
                  <img src="../../assets/image/zxw/yl.png" alt />
                </div>
                <p>云闪付</p>
                <div class="radioIcon">
                  <van-radio icon-size=".3rem" checked-color="#E01523" name="3" />
                </div>
              </div>
            </van-radio-group>
          </div>
          <button class="btn" @click="pay">立即支付</button>
        </div>
      </van-popup>
    </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      state: 6, //当值为1时为待支付状态，2时为待发货，3待收货，4待评价，5为已完成，6为售后
      onShow: false, //点击物流展开和收起
      show: false,
      radio: "1",
      form: {
        userImg: require("../../assets/image/zxw/user.png"),
        userName: "用户昵称",
        phone: "18878979893",
        address: "浙江省 杭州市 拱墅区 湖州街北城天地9号楼1701室",
        number: "1234234324314234",
        shopImg: require("../../assets/image/zxw/shop.png"),
        shopName:
          "专柜洋风二代陶瓷贺卡九回复客户卡合法空间哈开始的很疯狂哈萨克发a",
        color: "红色",
        area: "5.5",
        style: "配餐具",
        money: "1888.88",
        count: "2",
        yunfei: 0,
        youhui: 200,
        remark:
          "这是用户的备注信息，信息内容巴拉巴拉～噼里啪啦这是用户的备注信息，信息内容巴拉巴拉～噼里啪啦",
        orderId: "576868687887",
        createTime: "2019-08-11 12:00",
        payTime: "2019-08-11 12:00",
        payType: "支付宝",
        info: [
          "2019-08-12 10:31:56 [杭州市]快件已从下沙部分出发，准备发往杭州市",
          "2019-08-12 10:31:56 [杭州市]快件已从下沙部分出发，准备发往杭州市",
          "2019-08-12 10:31:56 [杭州市]快件已从下沙部分出发，准备发往杭州市"
        ],
        tuikuanInfo: "我就是想退",
        imgBox: [
          require("../../assets/image/zxw/shop.png"),
          require("../../assets/image/zxw/shop.png"),
          require("../../assets/image/zxw/shop.png"),
          require("../../assets/image/zxw/shop.png"),
          require("../../assets/image/zxw/shop.png"),
          require("../../assets/image/zxw/shop.png")
        ]
      }
    };
  },
  mounted(){
    this.getstate();
  },
  methods:{
    getstate(){
      //获取上一个页面的state参数
      this.state=this.$route.query.state;
      console.log(this.state)
    },
    //弹出框点击付款时
    pay(){
      this.show = false;
    },
    //点击取消订单时
    cancelOrder(){
      this.$toast('订单取消成功');
      this.$router.go(-1);
    },
    //点击取消售后
    cancelSale(){
      this.$toast('取消售后成功');
      this.$router.go(-1);
    },
    confirmShop(){
      this.$toast('订单确认收货成功');
      this.$router.go(-1);
    },
    // 点击删除订单
    delOrder(){
      this.$toast('订单已删除');
        this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.myOrderDetail {
  .top {
    .cancelOrder {
      position: absolute;
      right: 0.3rem;
      top: 0.3rem;
      font-size: 0.28rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 0.36rem;
    }
  }
  .contain {
    position: absolute;
    width: 7.5rem;
    left: 0;
    top: 0.88rem;
    bottom: 1.4rem;
    background-color: #fbfbfb;
    padding: 0.1rem 0 0 0;
    overflow: auto;
    .box {
      width: 7.5rem;
      padding: 0.3rem 0.3rem 0;
      box-sizing: border-box;
      background-color: #fff;
    }
    .topBox {
      padding-bottom: 0.3rem;
      border-bottom: 0.01rem solid #f0f0f0;
    }
    .bottomBox {
      margin-top: 0.3rem;
    }
    .topBox,
    .bottomBox {
      display: flex;
      .imgBox {
        width: 0.6rem;
        height: 0.7rem;
        margin-right: 0.2rem;
        img {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
          margin-top: 0.1rem;
        }
      }
      .nameBox {
        font-size: 0.26rem;
        > p:nth-child(2) {
          margin-top: 0.12rem;
        }
      }
    }
    .shopBox {
      width: 7.5rem;
      margin-top: 0.1rem;
      padding: 0.3rem;
      background-color: #fff;
      box-sizing: border-box;
    }
    .shopTop {
      display: flex;
      position: relative;
    }
    .shopImg {
      width: 1.4rem;
      height: 1.4rem;
      margin-right: 0.25rem;
      img {
        width: 1.4rem;
        height: 1.4rem;
      }
    }
    .shopName {
      width: 3.6rem;
      > p:nth-child(1) {
        font-size: 0.26rem;
        font-family: PingFang SC;
        color: rgba(51, 51, 51, 1);
        line-height: 0.3rem;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      > p:nth-child(2) {
        font-size: 0.24rem;
        font-family: PingFang SC;
        position: absolute;
        bottom: 0.3rem;
        font-weight: 300;
      }
    }
    .boxRight {
      margin-left: auto;
      .money {
        font-size: 0.26rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        text-align: right;
      }
      .count {
        font-size: 0.24rem;
        font-family: PingFang SC;
        font-weight: 300;
        color: rgba(153, 153, 153, 1);
        position: absolute;
        bottom: 0.3rem;
        right: 0;
      }
    }
    .shopBottom {
      margin-top: 0.3rem;
      div {
        display: flex;
        justify-content: space-between;
        font-size: 0.24rem;
        font-family: PingFang SC;
        color: #666666;
        line-height: 0.56rem;
      }
      .sum {
        text-align: right;
        font-size: 0.24rem;
        margin-top: 0.24rem;
      }
    }
    .shopInfo {
      width: 7.5rem;
      padding: 0.3rem;
      box-sizing: border-box;
      background-color: #fff;
      margin-top: 0.1rem;
      .remark {
        font-size: 0.28rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 0.24rem;
      }
      .remarkText,
      .orderId {
        font-size: 0.26rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 0.36rem;
      }
      .remarkText {
        padding-bottom: 0.24rem;
        border-bottom: 0.01rem solid #f0f0f0;
      }
    }
    .rook {
      text-align: center;
      font-size: 0.24rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(204, 204, 204, 1);
      line-height: 0.36rem;
      padding: 0.12rem 0;
      box-sizing: border-box;
      border-top: 0.01rem solid #f0f0f0;
    }
    .info {
      font-size: 0.26rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(27, 125, 219, 1);
      line-height: 0.36rem;
      margin-top: 0.1rem;
    }
    .tuikuanBox {
      width: 7.5rem;
      box-sizing: border-box;
      padding: 0.3rem;
      background-color: #fff;
      .remark {
        font-size: 0.28rem;
        font-family: PingFang SC;
        font-weight: 400;
      }
      .tuikuanInfo {
        font-size: 0.26rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 0.36rem;
        margin-top:.24rem;
      }
      .tuikuanImg{
        width: 2.16rem;
        height: 2.16rem;
        float: left;
        margin:.2rem .21rem 0 0;
      }
    }
  }
  .reds{
    width: 2.16rem;
        height: 2.16rem;
        float: left;
        margin:.2rem 0 0 0;
  }
  .btnBox {
    width: 7.5rem;
    height: 1.1rem;
    position: fixed;
    background-color: #fbfbfb;
    bottom: 0;
    padding: 0 0.3rem 0.3rem 0.3rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .btn {
      width: 6.9rem;
      height: 0.8rem;
      background: rgba(224, 21, 35, 1);
      border-radius: 0.4rem;
      font-size: 0.28rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      border: none;
    }
    .btn1 {
      width: 3.3rem;
      height: 0.8rem;
      background: #333333;
      border-radius: 0.38rem;
      font-size: 0.28rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      border: none;
    }
    .btn2 {
      width: 3.3rem;
      height: 0.8rem;
      background: rgba(224, 21, 35, 1);
      border-radius: 0.38rem;
      font-size: 0.28rem;
      color: rgba(255, 255, 255, 1);
      border: none;
    }
  }
}
//弹出层样式
.van-popup {
  padding: 0.3rem;
  box-sizing: border-box;
}
.popBox {
  .popTitle {
    .popname {
      font-size: 0.36rem;
      text-align: center;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
  .popContain {
    margin-top: 0.6rem;
  }
  .itemBox {
    display: flex;
    align-items: center;
    > div:nth-child(1) {
      width: 0.48rem;
      height: 1.08rem;
      margin-right: 0.3rem;
      display: flex;
      align-items: center;
      img {
        width: 0.48rem;
      }
    }
    .radioIcon {
      margin-left: auto;
    }
  }
  .btn {
    width: 6.9rem;
    height: 0.8rem;
    background: rgba(224, 21, 35, 1);
    border-radius: 0.4rem;
    font-size: 0.28rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    border: none;
    position: absolute;
    bottom: 0.3rem;
  }

}
</style>