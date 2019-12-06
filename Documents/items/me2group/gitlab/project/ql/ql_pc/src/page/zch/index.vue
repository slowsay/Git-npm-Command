<template>
  <div class="index">
    <div class="back">
      <div class="nav">
        <ul class="tab">
          <li v-for="(item,i) of tab" :key="i" @click="tabs(i)" :class="{'active':type==i}">{{item}}</li>
        </ul>
        <div class="right">
          <div class="input_box">
            <img src="../../assets/image/zch/fang.png" alt />
            <input type="text" placeholder="输入帖子标题或标签" />
          </div>
          <div class="updata">
            <img src="../../assets/image/zch/updata.png" alt />
            <p class="name">换一批</p>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="cycle" v-for="(item,i) of content" :key="i" @click="jump('/details')">
        <div class="image">
          <img :src="item.img" alt />
          <img src="../../assets/image/zch/play.png" alt class="play" />
        </div>
        <div class="text">
          <p class="title">{{item.name}}</p>
          <div class="bottom">
            <div class="left">
              <img :src="item.poto" alt />
              <p class="name">{{item.name}}</p>
            </div>
            <div class="right" @click.stop="collect(item)">
              <img :src="item.no" v-show="!item.show" alt />
              <img :src="item.yes" v-show="item.show" alt />
              <p class="number">{{item.number}}</p>
            </div>
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
      tab: ["关注", "发现", "本周最佳", "本月最佳", "年度最佳"],
      type: 0,
      content: [
        {
          img: require("../../assets/image/zch/con1.jpg"),
          title: "分享一只好看的小姐姐",
          poto: require("../../assets/image/zch/con1.jpg"),
          name: "不会飞的发福蝶",
          no: require("../../assets/image/zch/3x.png"),
          yes: require("../../assets/image/zch/x.png"),
          number: 2332,
          show: false
        },
        {
          img: require("../../assets/image/zch/con1.jpg"),
          title: "分享一只好看的小姐姐",
          poto: require("../../assets/image/zch/con1.jpg"),
          name: "不会飞的发福蝶",
          no: require("../../assets/image/zch/3x.png"),
          yes: require("../../assets/image/zch/x.png"),
          number: 2332,
          show: false
        },
        {
          img: require("../../assets/image/zch/con1.jpg"),
          title: "分享一只好看的小姐姐",
          poto: require("../../assets/image/zch/con1.jpg"),
          name: "不会飞的发福蝶",
          no: require("../../assets/image/zch/3x.png"),
          yes: require("../../assets/image/zch/x.png"),
          number: 2332,
          show: false
        },
        {
          img: require("../../assets/image/zch/con1.jpg"),
          title: "分享一只好看的小姐姐",
          poto: require("../../assets/image/zch/con1.jpg"),
          name: "不会飞的发福蝶",
          no: require("../../assets/image/zch/3x.png"),
          yes: require("../../assets/image/zch/x.png"),
          number: 2332,
          show: false
        },
        {
          img: require("../../assets/image/zch/con1.jpg"),
          title: "分享一只好看的小姐姐",
          poto: require("../../assets/image/zch/con1.jpg"),
          name: "不会飞的发福蝶",
          no: require("../../assets/image/zch/3x.png"),
          yes: require("../../assets/image/zch/x.png"),
          number: 2332,
          show: false
        },
        {
          img: require("../../assets/image/zch/con1.jpg"),
          title: "分享一只好看的小姐姐",
          poto: require("../../assets/image/zch/con1.jpg"),
          name: "不会飞的发福蝶",
          no: require("../../assets/image/zch/3x.png"),
          yes: require("../../assets/image/zch/x.png"),
          number: 2332,
          show: false
        },
        {
          img: require("../../assets/image/zch/con1.jpg"),
          title: "分享一只好看的小姐姐",
          poto: require("../../assets/image/zch/con1.jpg"),
          name: "不会飞的发福蝶",
          no: require("../../assets/image/zch/3x.png"),
          yes: require("../../assets/image/zch/x.png"),
          number: 2332,
          show: false
        },
        {
          img: require("../../assets/image/zch/con1.jpg"),
          title: "分享一只好看的小姐姐",
          poto: require("../../assets/image/zch/con1.jpg"),
          name: "不会飞的发福蝶",
          no: require("../../assets/image/zch/3x.png"),
          yes: require("../../assets/image/zch/x.png"),
          number: 2332,
          show: false
        },
        {
          img: require("../../assets/image/zch/con1.jpg"),
          title: "分享一只好看的小姐姐",
          poto: require("../../assets/image/zch/con1.jpg"),
          name: "不会飞的发福蝶",
          no: require("../../assets/image/zch/3x.png"),
          yes: require("../../assets/image/zch/x.png"),
          number: 2332,
          show: false
        },
        {
          img: require("../../assets/image/zch/con1.jpg"),
          title: "分享一只好看的小姐姐",
          poto: require("../../assets/image/zch/con1.jpg"),
          name: "不会飞的发福蝶",
          no: require("../../assets/image/zch/3x.png"),
          yes: require("../../assets/image/zch/x.png"),
          number: 2332,
          show: false
        }
      ]
    };
  },
  methods: {
    tabs(a) {
      this.type = a;
    },
    collect(a) {
      if (a.show == false) {
        a.show = true;
      } else {
        a.show = false;
      }
    },
    jump(a) {
      this.$router.push(a);
    }
  }
};
</script>

<style lang="less" scoped>
.index {
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div.back {
    background: #fff;
    width: 100%;
    display: flex;
    justify-content: center;
    .nav {
      display: flex;
      height: 100px;
      align-items: center;
      justify-content: space-between;
      width: 1280px;
      .tab {
        display: flex;
        li {
          font-size: 22px;
          font-family: PingFangSC-Light, PingFang SC;
          font-weight: 300;
          color: rgba(74, 74, 74, 1);
          line-height: 30px;
          position: relative;
          cursor: pointer;
        }
        li:not(:first-child) {
          margin-left: 38px;
        }
        .active:after {
          content: "";
          display: inline-block;
          width: 100%;
          height: 2px;
          background: red;
          position: absolute;
          top: 35px;
          right: 0;
        }
      }
      .right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 40%;
        .input_box {
          display: flex;
          align-items: center;
          position: relative;
          margin-right: 32px;
          width: 70%;
          input {
            padding-left: 65px;
            height: 40px;
            border-radius: 30px;
            border: 1px solid rgba(151, 151, 151, 1);
            outline: 0;
            width: 100%;
          }
          img {
            position: absolute;
            width: 20px;
            height: 20px;
            left: 33px;
          }
        }
        .updata {
          display: flex;
          align-items: center;
          img {
            width: 17px;
            height: 18px;
          }
          .name {
            font-size: 18px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(74, 74, 74, 1);
            line-height: 25px;
            margin-left: 10px;
          }
        }
      }
    }
  }
  .content {
    width: 1280px;
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0 60px;
    .cycle:not(:nth-child(4n + 1)) {
      margin-left: 3.2%;
    }
    .cycle:nth-child(n + 5) {
      margin-top: 40px;
    }
    .cycle {
      width: 22.6%;
      .image {
        width: 290px;
        height: 320px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .play {
          width: 50px;
          height: 50px;
          position: absolute;
          right: 1px;
          top: 1px;
        }
      }
      .text {
        background: #fff;
        .title {
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(47, 47, 47, 1);
          line-height: 22px;
          margin-bottom: 22px;
          padding: 10px 10px 0;
        }
        .bottom {
          display: flex;
          justify-content: space-between;
          padding: 0 10px 16px;
          .left {
            display: flex;
            align-items: center;
            img {
              width: 24px;
              height: 24px;
              border-radius: 50%;
            }
            .name {
              font-size: 14px;
              font-family: PingFangSC-Light, PingFang SC;
              font-weight: 300;
              color: rgba(130, 130, 130, 1);
              line-height: 20px;
              margin-left: 10px;
            }
          }
          .right {
            display: flex;
            align-items: center;
            img {
              width: 20px;
              height: 19px;
              margin-right: 3px;
            }
            p {
              font-size: 17px;
              font-family: PingFangSC-Light, PingFang SC;
              font-weight: 300;
              color: rgba(130, 130, 130, 1);
              line-height: 24px;
            }
          }
        }
      }
    }
  }
}
</style>