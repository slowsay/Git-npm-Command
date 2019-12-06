<template>
  <div id="Classification_0">
    <navbar />
    <div class="top">
      <img :src="src" />
      <p>{{name}}</p>
      <p>
        逛逛其他
        <i class="el-icon-arrow-right"></i>
      </p>
      <p>
        <span v-for="(item,index) in type" :key="index">{{item}}</span>
      </p>
      <el-input v-model="input" placeholder="输入内容按回车键搜索" prefix-icon="el-icon-search"></el-input>
      <div class="type">
        <div
          v-for="(item,index) in select"
          :key="index"
          @mouseover="mouseover(index)"
          @mouseout="mouseout(index)"
        >
          <p>{{item}}</p>
          <i class="el-icon-error type_0" @click="out(index)"></i>
        </div>
        <div @click="show=true">
          <i class="el-icon-plus"></i>
        </div>
      </div>
    </div>
    <div class="body">
      <div>
        <div v-for="(item,index) in data" :key="index" @click="$router.push('/Detailed')">
          <img :src="item.src" />
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
    <el-dialog title="所有分类" :visible.sync="show" :modal="false">
      <div class="dialog">
        <div>
          <div
            v-for="(item,index) in data_0"
            :key="index"
            @click="active_0=index,active_1=0"
            :class="{active:active_0==index}"
          >
            <img src="../../assets/img/gw/30.png" v-if="active_0==index" />
            <p>{{item.name}}</p>
          </div>
        </div>
        <div>
          <div
            v-for="(item,index) in data_0[active_0].detailed"
            :key="index"
            @click="active_1=index"
            :class="{active:active_1==index}"
          >{{item}}</div>
        </div>
        <el-button @click="confirm">确认</el-button>
      </div>
    </el-dialog>
    <bottom />
    <!-- 侧边栏 -->
    <rightNav></rightNav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "家常菜",
      src: require("../../assets/img/gw/goutou.jpg"),
      type: ["蒸锅", "蒸锅", "蒸锅", "蒸锅"],
      select: ["蒸锅", "蒸锅"],
      input: "",
      data: [
        {
          name: "家常菜",
          src: require("../../assets/img/gw/goutou.jpg")
        },
        {
          name: "家常菜",
          src: require("../../assets/img/gw/goutou.jpg")
        },
        {
          name: "家常菜",
          src: require("../../assets/img/gw/goutou.jpg")
        },
        {
          name: "家常菜",
          src: require("../../assets/img/gw/goutou.jpg")
        },
        {
          name: "家常菜",
          src: require("../../assets/img/gw/goutou.jpg")
        },
        {
          name: "家常菜",
          src: require("../../assets/img/gw/goutou.jpg")
        },
        {
          name: "家常菜",
          src: require("../../assets/img/gw/goutou.jpg")
        },
        {
          name: "家常菜",
          src: require("../../assets/img/gw/goutou.jpg")
        },
        {
          name: "家常菜",
          src: require("../../assets/img/gw/goutou.jpg")
        },
        {
          name: "家常菜",
          src: require("../../assets/img/gw/goutou.jpg")
        },
        {
          name: "家常菜",
          src: require("../../assets/img/gw/goutou.jpg")
        },
        {
          name: "家常菜",
          src: require("../../assets/img/gw/goutou.jpg")
        }
      ],
      //   弹窗数据
      show: false,
      data_0: [
        { name: "烹饪厨具", detailed: ["镇锅", "碗", "瓢", "盆"] },
        { name: "烹饪厨具", detailed: ["锅", "碗"] },
        { name: "烹饪厨具", detailed: ["锅", "碗", "盆"] }
      ],
      state: 0,
      active_0: 0,
      active_1: 0
    };
  },
  methods: {
    mouseover(val) {
      let obj = document.getElementsByClassName("type_0");
      obj[val].style.visibility = "visible";
    },
    mouseout(val) {
      let obj = document.getElementsByClassName("type_0");
      obj[val].style.visibility = "hidden";
    },
    out(val) {
      this.select.splice(val, 1);
    },
    confirm() {
      this.show = false;
      this.select.push(this.data_0[this.active_0].detailed[this.active_1]);
    }
  }
};
</script>
<style lang="less" scoped>
#Classification_0 {
  .box {
    width: 1280px;
    margin: auto;
  }
  .top {
    width: 1280px;
    margin: 40px auto;
    img {
      width: 160px;
      height: 160px;
      border-radius: 5px;
      float: left;
      margin-right: 30px;
    }
    > p:nth-of-type(1) {
      font-size: 28px;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
      line-height: 28px;
      margin: 9px 0 18px;
    }
    p:nth-of-type(2) {
      font-size: 18px;
      font-weight: 400;
      color: rgba(27, 125, 219, 1);
    }
    p:nth-of-type(3) {
      font-size: 18px;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin: 15px 0;
      span {
        margin-right: 18px;
      }
    }
    .el-input {
      float: right;
      width: 240px;
      height: 28px;
      /deep/input {
        height: 28px;
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 14px;
        font-size: 16px;
      }
      /deep/i {
        line-height: 28px;
      }
    }
  }
  .type {
    > div {
      display: inline-block;
      position: relative;
      p {
        height: 28px;
        background: rgba(224, 18, 32, 1);
        border-radius: 14px;
        font-size: 14px;
        font-weight: 400;
        line-height: 28px;
        text-align: center;
        padding: 0 22px;
        margin-right: 10px;
        color: rgba(255, 255, 255, 1);
      }
      i {
        position: absolute;
        font-size: 20px;
        color: #333333;
        border-radius: 50%;
        border: 1px solid #fff;
        top: -10px;
        right: 0px;
        visibility: hidden;
      }
    }
    > div:nth-last-child(1) {
      width: 56px;
      height: 28px;
      border-radius: 14px;
      box-sizing: border-box;
      vertical-align: bottom;
      border: 1px solid #ccc;
      text-align: center;
      line-height: 26px;
      i {
        position: static;
        border: none;
        font-weight: bold;
        color: #ccc;
        font-size: 12px;
        visibility: visible;
      }
    }
  }
  .body {
    width: 1280px;
    margin: auto;
    overflow: hidden;
    > div {
      width: 1300px;
    }
    > div > div {
      float: left;
      img {
        width: 305px;
        height: 305px;
        border-radius: 10px;
        margin-right: 20px;
      }
      p {
        font-size: 20px;
        font-weight: 400;
        line-height: 19px;
        margin: 18px 0 30px;
        color: rgba(51, 51, 51, 1);
      }
    }
    > div > div:nth-last-child(1) {
      margin-bottom: 130px;
    }
  }
  /deep/.el-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    margin: 0!important;
    width: 404px;
    border: 4px solid rgba(230, 230, 230, 1);
    border-radius: 10px;
    .el-dialog__header {
      padding: 30px;
      font-size: 20px;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      border-bottom: 1px solid #e6e6e6;
    }
    .el-dialog__headerbtn {
      right: 30px;
      top: 30px;
      font-size: 20px;
    }
    .el-dialog__body {
      padding: 0;
    }
  }
  .dialog {
    font-size: 0;
    > div {
      display: inline-block;
      height: 454px;
      border-bottom: 1px solid #ccc;
      vertical-align: top;
      padding: 30px 0 0 30px;
      box-sizing: border-box;
    }
    > div:nth-of-type(1) {
      width: 40%;
      border-right: 1px solid #ccc;
      box-sizing: border-box;
      img {
        float: right;
        width: 6px;
        margin: 4px 30px 0 0;
      }
      p {
        font-size: 18px;
        line-height: 18px;
        font-weight: 400;
        color: #333333;
        margin-bottom: 30px;
      }
      .active {
        p {
          color: #e01220;
        }
      }
    }
    > div:nth-of-type(2) {
      width: 60%;
      div {
        width: 66px;
        height: 28px;
        border: 1px solid rgba(179, 179, 179, 1);
        border-radius: 14px;
        text-align: center;
        line-height: 28px;
        font-size: 14px;
        font-family: DFYuanW5-GB;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        margin-bottom: 20px;
      }
      .active {
        color: #fff;
        background: #e01220;
        border: 1px solid #e01220;
      }
    }
    .el-button {
      display: block;
      width: 264px;
      height: 40px;
      background: rgba(224, 18, 32, 1);
      border-radius: 4px;
      font-size: 16px;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin: 10px auto 10px;
    }
  }
}
</style>