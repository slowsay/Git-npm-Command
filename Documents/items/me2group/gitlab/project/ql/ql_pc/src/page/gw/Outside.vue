<template>
  <div id="Outside">
    <!-- 头部 -->
    <div>
      <div class="top">
        <img src="../../assets/image/gw/1.png" />
        <div>
          <!-- 首页,发布,商城 -->
          <div>
            <div @click="jump(0)">
              <img src="../../assets/image/gw/2.png" />
              <div>
                <p>首页</p>
                <p>FIRST</p>
              </div>
            </div>
            <div @click="jump(1)">
              <img src="../../assets/image/gw/3.png" />
              <div>
                <p>发布</p>
                <p>ISSUE</p>
              </div>
            </div>
            <div @click="jump(2)">
              <img src="../../assets/image/gw/4.png" />
              <div>
                <p>商城</p>
                <p>STORE</p>
              </div>
            </div>
            <div @click="jump(3)">
              <img src="../../assets/image/gw/30.png" />
              <div>
                <p>购物车</p>
                <p>SHOP</p>
              </div>
            </div>
          </div>
          <!-- 我的,通知 -->
          <div>
            <div @click="jump(4)">
              <img src="../../assets/image/gw/5.png" />
              <p>我的</p>
            </div>
            <div @click="jump(5)">
              <img src="../../assets/image/gw/6.png" />
              <p>通知</p>
            </div>
          </div>
          <!-- 通知数量 -->
          <p>{{number}}</p>
        </div>
      </div>
    </div>
    <!-- 头部衬垫 -->
    <div class="pad_0"></div>
    <div :class="{background:white}">
      <router-view></router-view>
    </div>
    <!-- 底部1 -->
    <div v-if="show">
      <div class="bottom_0">
        <div>
          <img src="../../assets/image/gw/7.png" />
          <p>72小时发货</p>
          <p>今日下单3天内出货不含当天、节假日</p>
        </div>
        <div>
          <img src="../../assets/image/gw/8.png" />
          <p>满1000包邮</p>
          <p>全场满1000包邮</p>
        </div>
        <div>
          <img src="../../assets/image/gw/9.png" />
          <p>电子发票</p>
          <p>关爱地球，保护环境，全场使用电子发票</p>
        </div>
      </div>
    </div>
    <!-- 底部2 -->
    <div v-if="show">
      <div class="bottom_1">
        <div>
          <p>精选社区</p>
          <p>产品中心</p>
          <p>明星产品</p>
          <p>关于我们</p>
        </div>
        <div>
          <div>
            <div></div>
            <p>扫码下载APP</p>
          </div>
          <p>田丁科技是一家专注于中高端APP开发和网站建设的公司，同样也是一家致力于行业软件及解决方案的公司。坐落于有着“上有天堂，下有苏杭”美誉之称并且已高度化互联网的杭州，公司从创业初期只有几个人的团队发展到如今有60+的大型团队。我们拥有一支年轻充满朝气的团队，我们是一个在战斗中的团队，我们是一群狂热的技术人员。我们团队的核心人员曾就职于爱奇艺、国美在线、易车等大型互联网公司，大多数有着5年以上丰富的开发实践经验，为政府企业及个人提供基于移动终端的客户端平台开发等各种服务。我们始终秉承以品质为生存，以信誉求发展的服务宗旨，只为用心做好每一件事。</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      number: 2,
      white: false,
      show: true,
      path: ["/index", "/key_posts","/shop",  '/car_shop',"/Personal", "/mess"]
    };
  },
  methods: {
    jump(val) {
      this.$router.push(this.path[val]);
    },
    judge(val) {
      //   if (val == "/index/shop") {
      //     this.white = true;
      //   }

      if (
        val == "/shopDetail" ||
        val == "/pay" ||
        val == "/payPage" ||
        val == "/waitPay" ||
        val == "/submitOrder" ||
        val == "/paySuccess" ||
        val.search("/Personal") != -1
      )
        this.white = true;
      else {
        if (val == "/Login" || val == "/Register" || val == "/Forget") {
          this.white = true;
          this.show = false;
        } else {
          this.white = false;
          this.show = true;
        }
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.judge(to.path);
    next();
  },
  mounted() {
    this.judge(this.$route.path);
  }
};
</script>
<style lang="less" scoped>
#Outside {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  > div:nth-child(1) {
    border: 1px solid #f6f6f6;
    box-shadow: 0 0px 2px 2px #f6f6f6;
    position: fixed;
    top: 0;
    width: 100%;
    background: #ffffff;
    z-index: 999;
  }
  .top {
    width: 1280px;
    height: 80px;
    margin: auto;
    display: flex;
    align-items: center;
    > img {
      width: 80px;
    }
    > div {
      margin-left: auto;
      display: flex;
      align-items: center;
      position: relative;
    }
    > div > div:nth-child(1) {
      display: flex;
      padding-right: 5px;
      border-right: 1px solid #e6e6e6;
    }
    > div > div:nth-child(1) > div {
      width: 105px;
      height: 36px;
      display: flex;
      align-items: center;
      img {
        width: 28px;
        margin-right: 10px;
      }
      p:nth-child(1) {
        font-size: 14px;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        line-height: 20px;
      }
      p:nth-child(2) {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        line-height: 17px;
      }
    }

    > div > div:nth-child(2) {
      display: flex;
      padding-right: 10px;
    }
    > div > div:nth-child(2) > div {
      display: flex;
      align-items: center;
      img {
        width: 28px;
        margin: 0 10px 0 30px;
      }
      p {
        font-size: 16px;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        line-height: 22px;
      }
    }
    > div > p:nth-child(3) {
      position: absolute;
      top: 2px;
      right: 2px;
      width: 12px;
      height: 12px;
      background: rgba(255, 0, 0, 1);
      border-radius:50%;
      font-size: 10px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 13px;
      text-align: center;
    }
  }
  .pad_0 {
    width: 100%;
    height: 80px;
  }
  > div:nth-child(3) {
    position: relative;
    width: 100%;
    background: #f5f5f5;
    min-height: calc(100% - 550px);
  }
  > div:nth-child(4) {
    width: 100%;
    background: #e6e6e6;
  }
  .bottom_0 {
    width: 1280px;
    height: 170px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    > div {
      width: 400px;
      height: 115px;
      img {
        float: left;
        height: 55px;
        margin: 20px 30px 15px 85px;
      }
      p:nth-of-type(1) {
        margin: 28px 0;
        font-size: 28px;
        font-weight: 300;
        color: rgba(0, 0, 0, 1);
        line-height: 40px;
      }
      p:nth-of-type(2) {
        text-align: center;
        font-size: 14px;
        font-weight: 300;
        color: rgba(130, 130, 130, 1);
        line-height: 20px;
      }
    }
    > div:not(:nth-last-child(1)) {
      border-right: 1px solid #d9d9d9;
    }
  }
  > div:nth-child(5) {
    width: 100%;
    height: 300px;
    background: #232323;
  }
  .bottom_1 {
    width: 1050px;
    padding: 0 115px;
    margin: auto;
    > div:nth-of-type(1) {
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #4a4a4a;
    }
    > div:nth-of-type(1) p {
      font-size: 28px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 40px;
    }
    > div:nth-of-type(2) {
      padding-top: 30px;
      display: flex;
    }
    > div:nth-of-type(2) > div {
      width: 90px;
      height: 120px;
      padding-right: 75px;
      border-right: 1px solid #ffffff;
      div {
        width: 90px;
        height: 90px;
        border: 1px solid #ffffff;
      }
      p {
        font-size: 14px;
        text-align: center;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 30px;
      }
    }
    > div:nth-of-type(2) > p {
      margin-left: 30px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
    }
  }
  .background {
    background: #ffffff !important;
  }
}
</style>