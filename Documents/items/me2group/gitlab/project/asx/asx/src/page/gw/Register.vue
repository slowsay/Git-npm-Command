<template>
  <div id="Register">
    <el-dialog
      :visible.sync="dialogVisible"
      :modal="false"
      :show-close="false"
      :before-close="handleClose"
    >
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
            <el-button @click="three" >跳转到首页</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
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
    three(){
this.dialogVisible=false
this.$router.push('/index')
    }
  }
};
</script>
<style lang="less" scoped>
#Register {
  /deep/.el-dialog {
    width: 570px;
    height: 750px;
    box-sizing: content-box;
    background: rgba(255, 255, 255, 1);
    border: 4px solid rgba(0, 0, 0, 0.08);
    border-radius: 20px;
    margin-top: 215px !important ;
    .el-dialog__header {
      margin: 0;
      padding: 0;
    }
    .el-dialog__body {
      margin: 0;
      padding: 0;
    }
  }
  .body {
    padding: 53px 60px 60px;
    .state {
      position: relative;
      padding: 0 24px 60px;
      display: flex;
      justify-content: space-between;
      .hr {
        width: 104px;
        height: 28px;
        border-bottom: 4px dotted #e6e6e6;
      }
      .active_hr {
        border-bottom: 4px dotted #e01220;
      }
    }
    .state div {
      flex-shrink: 0;
      img {
        position: absolute;
        width: 48px;
        height: 48px;
        padding: 8px;
      }
      p:nth-of-type(1) {
        position: relative;
        text-align: center;
        line-height: 64px;
        vertical-align: middle;
        font-size: 24px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
      p:nth-of-type(2) {
        font-size: 14px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
    .state .active {
      img {
        width: 60px;
        height: 60px;
        padding: 2px;
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
      width: 223px;
      margin: 20px 0 160px;
    }
    .el-button {
      width: 450px;
      height: 56px;
      background: rgba(224, 18, 32, 1);
      border: none;
      border-radius: 28px;
      font-size: 18px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
