<template>
  <div id="Personal">
    <div class="left">
      <p>个人中心</p>
      <p @click="state=0,$router.push('/Personal/Order')" :class="{active:state==0}">
        <span>我的订单</span>
        <img v-if="state==0" src="../../assets/image/gw/22.png" />
      </p>
      <p @click="state=1,$router.push('/Personal/Message')" :class="{active:state==1}">
        <span>我的信息</span>
        <img v-if="state==1" src="../../assets/image/gw/22.png" />
      </p>
      <div :class="{active_1:state==2.1||state==2.2}">
        <p
          @click="state=2.1,$router.push('/Personal/Collection_0')"
          :class="{active:state==2.1||state==2.2}"
        >
          <span>我的收藏</span>
          <img v-if="state==2.1||state==2.2" src="../../assets/image/gw/22.png" />
        </p>
        <div>
          <p
            @click="state=2.1,$router.push('/Personal/Collection_0')"
            :class="{active_0:state==2.1}"
          >
            <span>收藏的帖子</span>
            <img v-if="state==2.1" src="../../assets/image/gw/22.png" />
          </p>
          <p
            @click="state=2.2,$router.push('/Personal/Collection_1')"
            :class="{active_0:state==2.2}"
          >
            <span>收藏的商品</span>
            <img v-if="state==2.2" src="../../assets/image/gw/22.png" />
          </p>
        </div>
      </div>
      <p @click="state=3 ,$router.push('/Personal/Release')" :class="{active:state==3}">
        <span>我的发布</span>
        <img v-if="state==3" src="../../assets/image/gw/22.png" />
      </p>
      <p @click="state=4 ,$router.push('/Personal/Integral')" :class="{active:state==4}">
        <span>我的积分</span>
        <img v-if="state==4" src="../../assets/image/gw/22.png" />
      </p>
      <p @click="state=5 ,$router.push('/Personal/Wallet')" :class="{active:state==5}">
        <span>我的钱包</span>
        <img v-if="state==5" src="../../assets/image/gw/22.png" />
      </p>
      <p @click="state_0=state,state=6,dialogVisible=true" :class="{active:state==6}">
        <span>消息设置</span>
        <img v-if="state==6" src="../../assets/image/gw/22.png" />
      </p>
    </div>
    <div class="right">
      <div class="head">
        <!-- 左侧头像 -->
        <img src="../../assets/image/gw/goutou.jpg" />
        <!-- 右侧内容 -->
        <div>
          <div>
            <!-- 账号安全 -->
            <div class="account">
              <p>{{data.name}}</p>
              <div>
                <p>账号安全&nbsp;:</p>
                <p>{{data.security}}</p>
                <div>
                  <div></div>
                </div>
                <p>修改密码</p>
              </div>
              <div>
                <p>手机认证</p>
                <img src="../../assets/image/gw/24.png" v-if="data.phone==0" />
                <img src="../../assets/image/gw/23.png" v-else />
                <p>邮箱设置</p>
                <img src="../../assets/image/gw/24.png" v-if="data.mailbox==0" />
                <img src="../../assets/image/gw/23.png" v-else />
                <p>立即设置</p>
              </div>
            </div>
            <!-- 数据 -->
            <div class="jump">
              <div @click="$router.push('/Personal/Follow')">
                <p>{{data.follow}}</p>
                <p>我的关注</p>
              </div>
              <div @click="$router.push('/Personal/Fans')">
                <p>{{data.fans}}</p>
                <p>我的粉丝</p>
              </div>
              <div @click="state=2.1,$router.push('/Personal/Collection_0')">
                <p>{{data.like}}</p>
                <p>我的喜欢</p>
              </div>
              <div @click="$router.push('/Personal/Coupon')">
                <p>{{data.coupon}}</p>
                <p>优惠卷</p>
              </div>
              <div @click="dialogVisible=true">
                <p>&nbsp;</p>
                <p>帮助中心</p>
              </div>
              <div @click="dialogVisible=true">
                <p>&nbsp;</p>
                <p>客服中心</p>
              </div>
            </div>
          </div>
          <!-- 地址 -->
          <div class="address">
            <p>
              <span>我的默认地址</span>
              <span  @click="$router.push('/Personal/Address')">新增收货地址</span>
            </p>
            <p>
              <span>收货人:</span>
              <span>{{data.name_0}}</span>
              <span>手机号:</span>
              <span>{{data.number}}</span>
              <span>邮编号:</span>
              <span>{{data.mail}}</span>
            </p>
            <p>
              <span>所在地:</span>
              <span>{{data.address}}</span>
              <span>详细地址:</span>
              <span>{{data.address_0}}</span>
            </p>
            <el-button @click="$router.push('/Personal/Address')">修改默认地址</el-button>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
    <el-dialog :visible.sync="dialogVisible" :show-close="false" @close='close'>
      <img :src="img" />
      <p>扫码下载轻恋APP</p>
      <p>与恋友一起分享生活吧</p>
      <el-button @click="dialogVisible=false">关闭</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      state: 0,
      data: {
        name: "不会飞的发福蝶",
        security: "中",
        phone: 0, //0未认证 1认证
        mailbox: 1,
        follow: 79,
        fans: "212312",
        like: 23,
        coupon: 9,
        //地址
        name_0: "小张",
        number: "188****2312",
        mail: "310000",
        address: "浙江省 杭州市 拱墅区 祥符街道 ",
        address_0: "北城天地9幢1701"
      },
      //弹窗
      state_0: "",
      dialogVisible: false,
      img: require("../../assets/image/gw/goutou.jpg")
    };
  },
  methods: {
    close() {
      this.dialogVisible = false;
      if (this.state_0 !== "") this.state = this.state_0;
    }
  },
  mounted() {
    if (this.$route.path == "/Personal/Order") this.state = 0;
    else if (this.$route.path == "/Personal/Message") this.state = 1;
    else if (this.$route.path == "/Personal/Collection_0") this.state = 2.1;
    else if (this.$route.path == "/Personal/Collection_1") this.state = 2.2;
    else if (this.$route.path == "/Personal/Release") this.state = 3;
    else if (this.$route.path == "/Personal/Integral") this.state = 4;
    else if (this.$route.path == "/Personal/Wallet") this.state = 5;
  }
};
</script>
<style lang="less" scoped>
#Personal {
  width: 1280px;
  margin: auto;
  padding-top: 20px;
  .left {
    display: inline-block;
    width: 235px;
    height: 700px;
    margin-bottom: 20px;
    background: rgba(245, 245, 245, 1);
    > p {
      position: relative;
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 55px;
      padding-left: 30px;
      img {
        position: absolute;
        top: 50%;
        right: 30px;
        width: 8px;
        transform: translateY(-50%);
      }
    }
    .active {
      background: rgba(255, 148, 148, 1);
      color: rgba(255, 255, 255, 1);
    }
    > p:nth-child(1) {
      font-size: 32px;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 32px;
      padding: 30px 30px 15px;
    }
    > div > p {
      position: relative;
      font-size: 24px;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 55px;
      padding-left: 30px;
      img {
        position: absolute;
        right: 30px;
        width: 8px;
        transform: translateY(-50%);
        top: 45%;
        transform: rotate(90deg);
      }
    }
    > div > div {
      p {
        position: relative;
        padding-left: 55px;
        font-size: 16px;
        font-weight: 400;
        color: #4a4a4a;
        line-height: 42px;
      }
      img {
        position: absolute;
        top: 50%;
        right: 30px;
        width: 5px;
        transform: translateY(-50%);
      }
      .active_0 {
        color: #ffffff;
        background: rgba(255, 148, 148, 0.5);
      }
    }
    > div {
      height: 55px;
      overflow: hidden;
      transition: height 0.5s ease 0s;
    }
    .active_1 {
      height: 139px;
    }
  }
  .right {
    display: inline-block;
    vertical-align: top;
    width: 980px;
    margin-left: 30px;
    padding-bottom: 100px;
  }
  .head {
    width: 980px;
    height: 328px;
    box-sizing: border-box;
    border-radius: 10px;
    border: 4px solid rgba(245, 245, 245, 1);
    padding: 30px 30px 0px;
    display: flex;
    > img {
      width: 60px;
      height: 60px;
      background: rgba(216, 216, 216, 1);
      border-radius: 50%;
      margin-right: 20px;
      margin-bottom: 230px;
    }
    > div {
      width: calc(100% - 80px);
    }
    > div > div:nth-of-type(1) {
      display: flex;
      justify-content: space-between;
      padding-bottom: 15px;
      border-bottom: 1px solid #f5f5f5;
    }
    > div > div:nth-of-type(2) {
      height: 95px;
    }
  }
  .account {
    > p:nth-child(1) {
      font-size: 24px;
      font-weight: 500;
      color: rgba(74, 74, 74, 1);
      line-height: 24px;
    }
    > div:nth-child(2) {
      margin: 15px 0 23px;
      display: flex;
      height: 22px;
      align-items: center;
      p:nth-child(1) {
        font-size: 16px;
        font-weight: 500;
        color: rgba(74, 74, 74, 1);
        line-height: 22px;
      }
      p:nth-child(2) {
        font-size: 16px;
        font-weight: 500;
        color: rgba(255, 148, 148, 1);
        line-height: 22px;
        margin: 0 10px;
      }
      div:nth-child(3) {
        position: relative;
        width: 180px;
        height: 15px;
        background: #f5f5f5;
        border-radius: 8px;
        z-index: 0;
      }
      div:nth-child(3) div {
        position: absolute;
        width: 100px;
        height: 15px;
        background: #ff9494;
        border-radius: 8px;
        left: 0;
        top: 0;
        z-index: 1;
      }
      p:nth-child(4) {
        font-size: 16px;
        font-weight: 400;
        color: rgba(12, 118, 216, 1);
        line-height: 22px;
        margin-left: 20px;
      }
    }
    > div:nth-child(3) {
      display: flex;
      align-items: center;
      p {
        font-size: 16px;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        line-height: 22px;
      }
      img {
        width: 16px;
        height: 16px;
        margin: 0 30px 0 10px;
      }
      p:nth-of-type(3) {
        color: rgba(12, 118, 216, 1);
      }
    }
  }
  .jump {
    width: 420px;
    div {
      float: left;
      width: 140px;
      p:nth-child(1) {
        font-size: 27px;
        font-weight: 400;
        color: rgba(255, 148, 148, 1);
        line-height: 38px;
        text-align: center;
      }
      p:nth-child(2) {
        font-size: 14px;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        line-height: 20px;
        margin: 4px 0 10px;
        text-align: center;
      }
    }
  }
  .address {
    margin-top: 20px;
    position: relative;
    p {
      font-size: 16px;
      font-weight: 400;
      color: rgba(74, 74, 74, 1);
      line-height: 22px;
      margin-bottom: 5px;
    }
    p:nth-child(1) {
      font-weight: 500;
      color: rgba(74, 74, 74, 1);
      line-height: 28px;
      margin-bottom: 10px;
      span:nth-child(1) {
        font-size: 20px;
      }
      span:nth-child(2) {
        float: right;
        font-size: 16px;
        color: rgba(12, 118, 216, 1);
      }
    }
    .el-button {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 240px;
      height: 60px;
      background: rgba(255, 148, 148, 1);
      border-radius: 4px;
      font-size: 24px;
      font-weight: 400;
      border: none;
      color: rgba(255, 255, 255, 1);
    }
  }
  /deep/.el-dialog {
    overflow: hidden;
    width: 310px;
    height: 460px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    > div {
      margin: 0;
      padding: 0;
    }
    img {
      width: 250px;
      height: 250px;
      padding: 30px;
    }
    p {
      font-size: 18px;
      font-weight: 400;
      color: rgba(74, 74, 74, 1);
      line-height: 25px;
      text-align: center;
    }
    p:nth-child(3) {
      padding: 4px 0 29px;
      border-bottom: 1px solid #f5f5f5;
    }
    .el-button {
      border: none;
      width: 100%;
      height: 66px;
      font-size: 20px;
      font-weight: 400;
      color: rgba(12, 118, 216, 1);
    }
  }
}
</style>