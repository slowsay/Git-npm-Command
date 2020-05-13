<template>
  <div class="box">
    <div class="nav">
      <img class="logo" src="../assets/img/zxw/logo.png" alt />
      <router-link to="company">
        <div class="us">
          <i class="el-icon-arrow-left"></i>了解我们
        </div>
      </router-link>
      <div class="star" @click="dsfd('/start')">
        <img class="starImg" src="../assets/img/zxw/rexiao-huangguan.png" alt />
        <div>
          <div class="title">明星产品</div>
          <div class="Etitle">STAR</div>
        </div>
      </div>
      <div class="star">
        <img class="starImg" src="../assets/img/zxw/liaotianjilu.png" alt />
        <div @click="$router.push('friends')">
          <div class="title">锅友说</div>
          <div class="Etitle">BBS</div>
        </div>
      </div>
      <div class="star">
        <img class="starImg" src="../assets/img/zxw/ziyuan-4.png" alt />
        <div @click="$router.push('/Classroom')">
          <div class="title">料理</div>
          <div class="Etitle">COOK</div>
        </div>
      </div>
      <div class="star" @mouseenter="showDown" @click="$router.push('shop')">
        <img class="starImg" src="../assets/img/zxw/shangchengkuaizhuang.png" alt />
        <div>
          <div class="title">商城</div>
          <div class="Etitle">STORE</div>
        </div>
      </div>
      <img class="line" src="../assets/img/zxw/xian.png" alt />
      <img class="cus" src="../assets/img/zxw/wode-5.png" alt />
      <img class="message" src="../assets/img/zxw/xiaoxi-11.png" alt @click="dsfd('/inmail')" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    dsfd(a) {
      this.$router.push(a);
    },
    //鼠标移动到商城上的事件
    showDown() {
      console.log(1);
    }
  }
};
</script>
<style lang="scss" scoped>$size: 0.8;
.nav {
  background-color: #fff;
  width: 1280px*$size;
  height: 70px*$size;
  border-radius: 20px*$size;
  box-shadow: 0px*$size 4px*$size 4px*$size rgba(0, 0, 0, 0.15);
  display: flex;
  margin-top: 40px*$size;
  .logo {
    width: 253px*$size;
    height: 40px*$size;
    margin: 13px*$size 0 0 60px*$size;
  }
  .us {
    font-size: 12px*$size;
    font-family: DFYuanW5-GB;
    font-weight: 400;
    text-decoration: underline;
    color: rgba(51, 51, 51, 1);
    margin: 28px*$size 69px*$size 0 40px*$size;
  }
  .star {
    margin-left: 40px*$size;
    width: 110px*$size;
    .starImg {
      height: 30px*$size;
      margin-right: 8px*$size;
      margin-top: 22px*$size;
      float: left;
    }
    .title {
      font-size: 16px*$size;
      font-family: PingFang;
      font-weight: 800;
      color: rgba(50, 60, 65, 1);
      margin-top: 19px*$size;
    }
    .Etitle {
      font-size: 14px*$size;
      font-family: PingFang;
      font-weight: 500;
      color: rgba(112, 119, 123, 1);
    }
  }
  .line {
    height: 58px*$size;
    margin: 6px*$size 34px*$size 6px*$size 30px*$size;
  }
  .cus {
    height: 30px*$size;
    margin-right: 40px*$size;
    margin-top: 20px*$size;
  }
  .message {
    height: 30px*$size;
    margin-top: 20px*$size;
  }
}
</style>