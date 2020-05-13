<template>
  <div id="Register">
    <div class="top">
      <navbar></navbar>
    </div>
    <div class="body">
      <!-- 注册状态栏 -->
      <div class="state">
        <div class="active">
          <img src="../../assets/img/gw/1.png" />
          <p>1</p>
          <p>填写账号</p>
        </div>
        <div class="hr" :class="{active_hr:state!=1}"></div>
        <div :class="{active:state!=1}">
          <img src="../../assets/img/gw/1.png" v-if="state!=1" />
          <img src="../../assets/img/gw/2.png" v-else />
          <p>2</p>
          <p>基本资料</p>
        </div>
        <div class="hr" :class="{active_hr:state==3}"></div>
        <div :class="{active:state==3}">
          <img src="../../assets/img/gw/1.png" v-if="state==3" />
          <img src="../../assets/img/gw/2.png" v-else />
          <p>3</p>
          <p>注册成功</p>
        </div>
      </div>
      <!-- 内容栏 -->
      <div>
        <Register1 v-if="state==1" @submit="one" />
        <Register2 v-else-if="state==2" @submit="two" />
        <div class="Register3" v-else>
          <img src="../../assets/img/gw/3.png" />
          <el-button @click="three">跳转到首页</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Register1 from "./Register1";
import Register2 from "./Register2";
export default {
  components: {
    Register1,
    Register2
  },
  data() {
    return {
      state: 1, //注册状态
      dialogVisible: false
    };
  },
  methods: {
    //   窗口关闭的回调函数
    handleClose() {},
    //第一步完成的回调，
    one(res) {
      if (res == true) this.state = 2;
    },
    //第二布完成的回调
    two(res) {
      if (res == true) this.state = 3;
    },
    three() {
      this.dialogVisible = false;
      this.$router.push("/");
    }
  }
};
</script>
<style lang="scss" scoped>
$size: 0.8;
 .top {
    width: 1280px*$size;
    margin: 0 auto;
    margin-top: 40px*$size;
  }
.body {
  margin: 80px * $size auto 0;
  width: 456px * $size;
  height: 600px * $size;
  background: rgba(255, 255, 255, 1);
  border: 3px * $size solid rgba(0, 0, 0, 0.08);
  border-radius: 16px * $size;
  padding: 53px * $size 60px * $size 60px * $size;
  .state {
    position: relative;
    padding: 0 24px * $size 60px * $size;
    display: flex;
    justify-content: space-between;
    .hr {
      width: 104px * $size;
      height: 28px * $size;
      border-bottom: 4px * $size dotted #e6e6e6;
    }
    .active_hr {
      border-bottom: 4px * $size dotted #e01220;
    }
  }
  .state div {
    flex-shrink: 0;
    img {
      position: absolute;
      width: 48px * $size;
      height: 48px * $size;
      padding: 8px * $size;
    }
    p:nth-of-type(1) {
      position: relative;
      text-align: center;
      line-height: 64px * $size;
      width: 64px * $size;
      vertical-align: middle;
      font-size: 24px * $size;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    p:nth-of-type(2) {
      font-size: 14px * $size;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }
  .state .active {
    img {
      width: 60px * $size;
      height: 60px * $size;
      padding: 2px * $size;
    }
    p:nth-of-type(1) {
      color: rgba(255, 255, 255, 1);
    }
    p:nth-of-type(2) {
      color: rgba(51, 51, 51, 1);
    }
  }
}
.Register3 {
  text-align: center;
  img {
    width: 223px * $size;
    margin: 20px * $size 0 160px * $size;
  }
  .el-button {
    width: 450px * $size;
    height: 56px * $size;
    background: rgba(224, 18, 32, 1);
    border: none;
    border-radius: 28px * $size;
    font-size: 18px * $size;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
