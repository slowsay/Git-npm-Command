<template>
  <div class="myOrder">
    <div class="top">
      <navbar></navbar>
    </div>
    <div class="contain">
      <van-tabs v-model="active" swipeable>
        <van-tab v-for="(item,index) in formData" :key="index" :title="item.name">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad(index)"
          >
            <div
              v-for="(item1,index1) in formData[index].boxData"
              :key="index1"
              class="box"
              @click="gotoDetail(index,index1)"
            >
              <!-- 当状态为待付款时 -->
              <div class="boxTop" v-if="item1.state==1">
                <div class="closeDate">
                  剩余关闭时间：
                  <van-count-down format="mm:ss" :time="item1.time"/>
                </div>
                <div>待付款</div>
              </div>
              <div class="boxTop" v-if="item1.state==2">
                <div class="right">待发货</div>
              </div>
              <!-- 当状态为待收货时 -->
              <div class="boxTop" v-if="item1.state==3">
                <div class="right">待收货</div>
              </div>

              <div class="boxTop" v-if="item1.state==4">
                <div class="right">待评价</div>
              </div>
              <div class="boxTop" v-if="item1.state==5">
                <div class="right">已完成</div>
              </div>
              <div class="boxTop" v-if="item1.state==6">
                <div class="right">售后</div>
              </div>
              <div class="boxContain">
                <div class="imgBox">
                  <img :src="item1.img" alt/>
                </div>
                <div class="shopName">
                  <p>{{item1.shopName}}</p>

                  <p>{{item1.color+'/'+item1.area+'L'+'/'+item1.style}}</p>
                </div>
                <div class="boxRight">
                  <p class="money">
                    <span style="font-size:.2rem">￥</span>
                    {{item1.money}}
                  </p>

                  <p class="count">×{{item1.count}}</p>
                </div>
              </div>
              <div class="boxBottom">
                <p class="sum">
                  共{{item1.count}}件商品&nbsp;合计:
                  <span style="color:#4D4D4D;font-weight:400;">￥</span>
                  <span
                    style="color:#4D4D4D;font-weight:400;font-size:.34rem"
                  >{{ Number(item1.count)*Number(item1.money)}}</span>
                </p>

                <div class="btnBox" v-if="item1.state==1">
                  <button class="btn1" @click.stop="cancelOrder">取消订单</button>
                  <button class="btn2" @click.stop="show=true">付款</button>
                </div>
                <div class="btnBox" v-if="item1.state==2">
                  <button class="btn1" @click.stop="$router.push('/afterSale')">申请售后</button>
                </div>
                <div class="btnBox" v-if="item1.state==3">
                  <button class="btn1" @click.stop="$router.push('/afterSale')">申请售后</button>
                  <button class="btn2" @click.stop="confirmShop(index,index1)">确认收货</button>
                </div>
                <div class="btnBox" v-if="item1.state==4">
                  <button class="btn2" @click.stop="$router.push('comment')">立即评价</button>
                </div>
                <div class="btnBox" v-if="item1.state==5">
                  <button class="btn1" @click.stop="delOrder">删除订单</button>
                </div>
                <div class="btnBox" v-if="item1.state==6">
                  <button class="btn1" @click.stop="kefu">联系客服</button>
                  <button class="btn2" @click.stop="cancelSale">取消售后</button>
                </div>
              </div>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
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
                  <img src="../../assets/image/zxw/zhifubao.png" alt/>
                </div>
                <p>支付宝</p>

                <div class="radioIcon">
                  <van-radio icon-size=".3rem" checked-color="#E01523" name="1"/>
                </div>
              </div>
              <div class="itemBox" @click="radio='2'">
                <div>
                  <img src="../../assets/image/zxw/weixin.png" alt/>
                </div>
                <p>微信</p>

                <div class="radioIcon">
                  <van-radio icon-size=".3rem" checked-color="#E01523" name="2"/>
                </div>
              </div>
              <div class="itemBox" @click="radio='3'">
                <div>
                  <img src="../../assets/image/zxw/yl.png" alt/>
                </div>
                <p>云闪付</p>

                <div class="radioIcon">
                  <van-radio icon-size=".3rem" checked-color="#E01523" name="3"/>
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
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    data: function () {
      return {
        loading: false,
        finished: false,
        show: false,
        radio: "1",
        active: "",
        formData: [
          {
            name: "全部",
            boxData: [
              {
                state: 1,
                time: 30 * 60 * 1000,
                img: require("../../assets/image/zxw/shop.png"),
                shopName: "专柜洋风二代陶瓷贺卡九回复客户卡合法空间哈开始的很疯狂哈萨克发ashkdfhkjah",
                color: "红色",
                area: "5.5",
                style: "配餐具",
                money: "1888.88",
                count: "2"
              }
            ]
          },
          {
            name: "待付款",
            boxData: [
              {
                state: 1,
                time: 30 * 60 * 1000,
                img: require("../../assets/image/zxw/shop.png"),
                shopName: "专柜洋风二代陶瓷贺卡九回复客户卡合法空间哈开始的很疯狂哈萨克发ashkdfhkjah",
                color: "红色",
                area: "5.5",
                style: "配餐具",
                money: "1888.88",
                count: "2"
              }
            ]
          },
          {
            name: "待发货",
            boxData: [
              {
                state: 2,
                time: 30 * 60 * 1000,
                img: require("../../assets/image/zxw/shop.png"),
                shopName: "专柜洋风二代陶瓷贺卡九回复客户卡合法空间哈开始的很疯狂哈萨克发ashkdfhkjah",
                color: "红色",
                area: "5.5",
                style: "配餐具",
                money: "1888.88",
                count: "2"
              },
              {
                state: 2,
                time: 30 * 60 * 1000,
                img: require("../../assets/image/zxw/shop.png"),
                shopName: "专柜洋风二代陶瓷贺卡九回复客户卡合法空间哈开始的很疯狂哈萨克发ashkdfhkjah",
                color: "红色",
                area: "5.5",
                style: "配餐具",
                money: "1888.88",
                count: "2"
              }
            ]
          },
          {
            name: "待收货",
            boxData: [
              {
                state: 3,
                time: 30 * 60 * 1000,
                img: require("../../assets/image/zxw/shop.png"),
                shopName: "专柜洋风二代陶瓷贺卡九回复客户卡合法空间哈开始的很疯狂哈萨克发ashkdfhkjah",
                color: "红色",
                area: "5.5",
                style: "配餐具",
                money: "1888.88",
                count: "2"
              },
              {
                state: 3,
                time: 30 * 60 * 1000,
                img: require("../../assets/image/zxw/shop.png"),
                shopName: "专柜洋风二代陶瓷贺卡九回复客户卡合法空间哈开始的很疯狂哈萨克发ashkdfhkjah",
                color: "红色",
                area: "5.5",
                style: "配餐具",
                money: "1888.88",
                count: "2"
              }
            ]
          },
          {
            name: "待评价",
            boxData: [
              {
                state: 4,
                time: 30 * 60 * 1000,
                img: require("../../assets/image/zxw/shop.png"),
                shopName: "专柜洋风二代陶瓷贺卡九回复客户卡合法空间哈开始的很疯狂哈萨克发ashkdfhkjah",
                color: "红色",
                area: "5.5",
                style: "配餐具",
                money: "1888.88",
                count: "2"
              }
            ]
          },
          {
            name: "已完成",
            boxData: [
              {
                state: 5,
                time: 30 * 60 * 1000,
                img: require("../../assets/image/zxw/shop.png"),
                shopName: "专柜洋风二代陶瓷贺卡九回复客户卡合法空间哈开始的很疯狂哈萨克发ashkdfhkjah",
                color: "红色",
                area: "5.5",
                style: "配餐具",
                money: "1888.88",
                count: "2"
              }
            ]
          },
          {
            name: "售后",
            boxData: [
              {
                state: 6,
                time: 30 * 60 * 1000,
                img: require("../../assets/image/zxw/shop.png"),
                shopName: "专柜洋风二代陶瓷贺卡九回复客户卡合法空间哈开始的很疯狂哈萨克发ashkdfhkjah",
                color: "红色",
                area: "5.5",
                style: "配餐具",
                money: "1888.88",
                count: "2"
              }
            ]
          }
        ]
      };
    },
    mounted: function () {
      this.getActive();
    },
    created: function () {

    },
    methods: {
      init: function () {
      },
      orderList: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.noticeList,
          headers: this.headerobj,
//          data: API.qs.stringify({page: this.pageindex, num: this.pagesize})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.data2 = _this.exchangeData(e.data.data);
            }
            else {
              API.dialog({message: JSON.stringify(e.data.msg)});
            }
          }
          else {
            API.dialog({message: JSON.stringify(e.data.msg)});
          }

        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
      },
      //获取上一页面传过来的active值
      getActive: function () {
        this.active = this.$route.query.active;
      },
      //列表的懒加载
      onLoad: function (index) {
        // console.log(index);
        // console.log(this.formData[index].boxData.length);
        // 异步更新数据
        var _this = this;
        setTimeout(function () {
            for (let i = 0; i < 10; i++) {
              _this.formData[index].boxData.push(
                _this.formData[index].boxData.length + 1
              );
            }
            // 加载状态结束
            _this.loading = false;
            // 数据全部加载完成
            if (_this.formData[index].boxData.length >= 13) {
              _this.finished = true;
            }
          }
          ,
          500
        )
      },
      //点击跳转到详情页
      gotoDetail: function (index, index1) {
        console.log(this.formData[index].boxData[index1].state)
        this.$router.push({
          path: '/myOrderDetail', query: {state: this.formData[index].boxData[index1].state}
        })

      },
      //点击付款时
      pay: function () {
        this.show = false;
      },
      //点击联系客服
      kefu: function () {
        alert('跳转到客服页面')
      },
      //点击确认收货
      confirmShop: function (index, index1) {
        this.formData[index].boxData[index1].state = 6;
      },
      //点击删除订单时
      delOrder: function () {
        this.$toast('订单删除成功')
      },
      //点击取消售后
      cancelSale: function () {
        this.$toast('取消售后成功')
      },
      //点击取消订单
      cancelOrder: function () {
        this.$toast('订单已取消')
      }
    }
  }
</script>

<style lang="less" scoped>

  .contain {
    position: absolute;
    width: 7.5rem;
    top: 0.88rem;
    left: 0;
    background-color: #fbfbfb;
  }

  .box {
    background-color: #fff;
    margin-top: 0.1rem;
    width: 7.5rem;
    padding: 0.3rem;
    box-sizing: border-box;
  }

  .boxTop {
    display: flex;
    justify-content: space-between;
    line-height: 0.32rem;
    font-size: 0.24rem;
    align-items: center;
    color: rgba(77, 77, 77, 1);
    font-weight: 300;
    font-family: PingFang SC;
    padding-bottom: 0.3rem;
    border-bottom: 0.01rem solid #f0f0f0;
    .right {
      margin-left: auto;
    }
  }

  .closeDate {
    display: flex;
    align-items: center;
    .van-count-down {
      font-size: 0.24rem;
      line-height: 0.32rem;
    }
  }

  .boxContain {
    margin-top: 0.3rem;
    display: flex;
    position: relative;
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

  .boxBottom {
    font-size: 0.24rem;
    font-family: PingFang SC;
    font-weight: 300;
    color: rgba(102, 102, 102, 1);
    text-align: right;
  }

  .btnBox {
    margin-top: 0.3rem;
    .btn1 {
      width: 1.4rem;
      height: 0.5rem;
      background: rgba(255, 255, 255, 1);
      border: 0.01rem solid rgba(153, 153, 153, 1);
      border-radius: 0.25rem;
      font-size: 0.24rem;
      font-family: PingFang SC;
      color: rgba(153, 153, 153, 1);
    }
    .btn2 {
      width: 1.4rem;
      height: 0.5rem;
      background: rgba(255, 255, 255, 1);
      border: 0.01rem solid rgba(224, 21, 35, 1);
      border-radius: 0.25rem;
      font-size: 0.24rem;
      font-family: PingFang SC;
      color: rgba(224, 21, 35, 1);
      margin-left: 0.2rem;
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
