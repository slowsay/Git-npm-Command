
<template>
  <!--个人中心页面 -->
  <div id="personCenter">
    <div class="contain">
      <div class="user">
        <div class="userimg">
          <img :src="form.userimg" alt />
        </div>
        <div class="username">
          <p class="name">{{form.name}}</p>
          <div class="pross">
            <span>LV:{{form.vip}}</span>
            <van-progress
              :percentage="100"
              stroke-width="6"
              style="width:5rem"
              :show-pivot="false"
              color="#E60013"
            />
          </div>
        </div>
      </div>
      <div class="myOrder">
        <div class="orderTop">
          <p>我的订单</p>
          <p @click="$router.push('/myOrder')">查看全部订单></p>
        </div>
        <div class="orderBottom">
          <div class="box" @click="$router.push({path:'/myOrder',query:{active:2}})">
            <img style="height:.51rem" src="../../assets/image/zxw/shouhuo.png" alt />
            <p>待发货</p>
          </div>
          <div class="box" @click="$router.push({path:'/myOrder',query:{active:3}})">
            <img src="../../assets/image/zxw/daishouhuo.png" alt />
            <p >待收货</p>
          </div>
          <div class="box" @click="$router.push({path:'/myOrder',query:{active:4}})">
            <img src="../../assets/image/zxw/pingjia.png" alt />
            <p>待评价</p>
          </div>
          <div class="box" @click="$router.push({path:'/myOrder',query:{active:5}})">
            <img src="../../assets/image/zxw/wancheng.png" alt />
            <p>已完成</p>
          </div>
        </div>
      </div>
      <div class="tools">
        <p class="toolTitle">必备工具</p>
        <div class="toolsBottom">
          <div v-for="(item,index) in data" :key="index" class="toolBox" @click="goto(item.path)">
            <img :src="item.img" alt />
            <p >{{item.title}}</p>
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
      form: {
        userimg: require("../../assets/image/zxw/user.png"),
        name: "用户昵称",
        vip: "12"
      },
      data: [
        {
          path:'myTie',
          img: require("../../assets/image/zxw/shoucang-5@2x.png"),
          title: "我的收藏"
        },
        {
          img: require("../../assets/image/zxw/zuji@2x.png"),
          title: "我的足迹"
        },
        {
          img: require("../../assets/image/zxw/jifen-3@2x.png"),
          title: "我的积分"
        },
        { 
          path:'myInfo',
          img: require("../../assets/image/zxw/shezhi-3@2x.png"),
          title: "个人设置"
        },
        { 
          path:"Mail",
          img: require("../../assets/image/zxw/zhanneixin.png"),
          title: "站内信"
        },
        {
          img: require("../../assets/image/zxw/youhuiquan@2x.png"),
          title: "优惠券"
        }
      ]
    };
  },
  methods:{
    goto(a){
      this.$router.push({path:a,query:{active:1}});
    }
  }
  
};
</script>

<style lang="less" scoped>
#personCenter {
  width: 7.5rem;
  .contain {
    position: absolute;
    left: 0;
    top:0;
    bottom: 0;
    width: 7.5rem;
    background: url("../../assets/image/zxw/bg1.png") no-repeat #fafafa;
    background-size: 7.5rem;
    .user {
      width: 7.5rem;
      display: flex;

      margin-top: 0.6rem;
      .userimg {
        width: 0.8rem;
        height: 0.8rem;
        margin: 0 0.3rem;
        img {
          width: 0.8rem;
          height: 0.8rem;
        }
      }
      .username {
        width: 5rem;
        float: right;
        .name {
          font-size: 0.36rem;
          color: rgba(0, 0, 0, 1);
        }
        .pross {
          display: flex;
          margin-top: 0.12rem;
          span {
            font-size: 0.18rem;
            color: rgba(0, 0, 0, 1);
            line-height: 0.36rem;
          }
          .van-progress {
            margin: 0.12rem;
            width: 5rem;
          }
        }
      }
    }
    .myOrder {
      width: 6.9rem;
      height: 2.28rem;
      background-color: #fff;
      margin: 0.6rem 0.3rem 0.3rem;
      box-shadow: 0px 0.02rem 0.1rem 0px rgba(0, 0, 0, 0.09);
      border-radius: 0.2rem;
      padding: 0.2rem;
      box-sizing: border-box;
      .orderTop {
        display: flex;
        justify-content: space-between;
        height: 0.54rem;
        border-bottom: 0.01rem solid #f0f0f0;
        > p:nth-child(1) {
          font-size: 0.28rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          line-height: 0.36rem;
        }
        > p:nth-child(2) {
          font-size: 0.24rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 0.36rem;
        }
      }
      .orderBottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        padding: 0 0.3rem;
        .box {
          margin-top: 0.32rem;

          img {
            height: 0.48rem;
          }
          p {
            font-size: 0.24rem;
            font-family: PingFang SC;
            font-weight: 300;
            color: rgba(51, 51, 51, 1);
            margin-top: 0.12rem;
          }
        }
      }
    }
    .tools {
      width: 6.9rem;
      height: 4.18rem;
      box-shadow: 0px 0.02rem 0.1rem 0px rgba(0, 0, 0, 0.09);
      border-radius: 0.2rem;
      padding: 0.2rem;
      margin-left: 0.3rem;
      box-sizing: border-box;
      background-color: #fff;
      .toolTitle {
        font-size: 0.28rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 0.36rem;
        height: 0.54rem;
        border-bottom: 0.01rem solid #f0f0f0;
      }
      .toolsBottom {
        .toolBox {
          width: 1.5rem;
          margin:.4rem .12rem .2rem 0;
          text-align: center;
          float: left;
          img {
            height: 0.48rem;
          }
          p{
            font-size: 0.24rem;
            font-family: PingFang SC;
            font-weight: 300;
            color: rgba(51, 51, 51, 1);
            margin-top: 0.2rem;
          }
        }
      }
    }
  }
}
</style>