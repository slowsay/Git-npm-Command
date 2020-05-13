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
<style lang="scss" scoped>$size: 0.8;
#Classification_0 {
  .box {
    width: 1280px*$size;
    margin: auto;
  }
  .top {
    width: 1280px*$size;
    margin: 40px*$size auto;
    img {
      width: 160px*$size;
      height: 160px*$size;
      border-radius: 5px*$size;
      float: left;
      margin-right: 30px*$size;
    }
    > p:nth-of-type(1) {
      font-size: 28px*$size;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
      line-height: 28px*$size;
      margin: 9px*$size 0 18px*$size;
    }
    p:nth-of-type(2) {
      font-size: 18px*$size;
      font-weight: 400;
      color: rgba(27, 125, 219, 1);
    }
    p:nth-of-type(3) {
      font-size: 18px*$size;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin: 15px*$size 0;
      span {
        margin-right: 18px*$size;
      }
    }
    .el-input {
      float: right;
      width: 240px*$size;
      height: 28px*$size;
      >>>input {
        height: 28px*$size;
        border: 1px*$size solid rgba(204, 204, 204, 1);
        border-radius: 14px*$size;
        font-size: 16px*$size;
      }
      >>>i {
        line-height: 28px*$size;
      }
    }
  }
  .type {
    > div {
      display: inline-block;
      position: relative;
      p {
        height: 28px*$size;
        background: rgba(224, 18, 32, 1);
        border-radius: 14px*$size;
        font-size: 14px*$size;
        font-weight: 400;
        line-height: 28px*$size;
        text-align: center;
        padding: 0 22px*$size;
        margin-right: 10px*$size;
        color: rgba(255, 255, 255, 1);
      }
      i {
        position: absolute;
        font-size: 20px*$size;
        color: #333333;
        border-radius: 50%;
        border: 1px*$size solid #fff;
        top: -10px*$size;
        right: 0px*$size;
        visibility: hidden;
      }
    }
    > div:nth-last-child(1) {
      width: 56px*$size;
      height: 28px*$size;
      border-radius: 14px*$size;
      box-sizing: border-box;
      vertical-align: bottom;
      border: 1px*$size solid #ccc;
      text-align: center;
      line-height: 26px*$size;
      i {
        position: static;
        border: none;
        font-weight: bold;
        color: #ccc;
        font-size: 12px*$size;
        visibility: visible;
      }
    }
  }
  .body {
    width: 1280px*$size;
    margin: auto;
    overflow: hidden;
    > div {
      width: 1300px*$size;
    }
    > div > div {
      float: left;
      img {
        width: 305px*$size;
        height: 305px*$size;
        border-radius: 10px*$size;
        margin-right: 20px*$size;
      }
      p {
        font-size: 20px*$size;
        font-weight: 400;
        line-height: 19px*$size;
        margin: 18px*$size 0 30px*$size;
        color: rgba(51, 51, 51, 1);
      }
    }
    > div > div:nth-last-child(1) {
      margin-bottom: 130px*$size;
    }
  }
  >>>.el-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    margin: 0!important;
    width: 404px*$size;
    border: 4px*$size solid rgba(230, 230, 230, 1);
    border-radius: 10px*$size;
    .el-dialog__header {
      padding: 30px*$size;
      font-size: 20px*$size;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      border-bottom: 1px*$size solid #e6e6e6;
    }
    .el-dialog__headerbtn {
      right: 30px*$size;
      top: 30px*$size;
      font-size: 20px*$size;
    }
    .el-dialog__body {
      padding: 0;
    }
  }
  .dialog {
    font-size: 0;
    > div {
      display: inline-block;
      height: 454px*$size;
      border-bottom: 1px*$size solid #ccc;
      vertical-align: top;
      padding: 30px*$size 0 0 30px*$size;
      box-sizing: border-box;
    }
    > div:nth-of-type(1) {
      width: 40%;
      border-right: 1px*$size solid #ccc;
      box-sizing: border-box;
      img {
        float: right;
        width: 6px*$size;
        margin: 4px*$size 30px*$size 0 0;
      }
      p {
        font-size: 18px*$size;
        line-height: 18px*$size;
        font-weight: 400;
        color: #333333;
        margin-bottom: 30px*$size;
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
        width: 66px*$size;
        height: 28px*$size;
        border: 1px*$size solid rgba(179, 179, 179, 1);
        border-radius: 14px*$size;
        text-align: center;
        line-height: 28px*$size;
        font-size: 14px*$size;
        font-family: DFYuanW5-GB;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        margin-bottom: 20px*$size;
      }
      .active {
        color: #fff;
        background: #e01220;
        border: 1px*$size solid #e01220;
      }
    }
    .el-button {
      display: block;
      width: 264px*$size;
      height: 40px*$size;
      background: rgba(224, 18, 32, 1);
      border-radius: 4px*$size;
      font-size: 16px*$size;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin: 10px*$size auto 10px*$size;
    }
  }
}
</style>