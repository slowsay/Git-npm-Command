<template>
  <div id="Collection_0">
    <div class="top">
      <div>
        <p>我的收藏</p>
        <p v-if="state==0" @click="state=1">编辑收藏</p>
        <p v-else @click="state=0">取消编辑</p>
      </div>
      <div></div>
    </div>
    <div class="card">
      <div
        v-for="(item,index) in data"
        :key="index"
        :class="{three:(index+1)%3==0}"
        @click="item.state=!item.state"
      >
        <img :src="item.img" />
        <p>{{item.title}}</p>
        <div>
          <img :src="item.src" />
          <p>{{item.name}}</p>
          <img src="../../assets/image/gw/25.png" />
          <p>{{item.number}}</p>
        </div>
        <img v-if="state==1&&item.state==false" src="../../assets/image/gw/24.png" />
        <img v-if="state==1&&item.state==true" src="../../assets/image/gw/23.png" />
      </div>
    </div>
    <div class="button" v-if="state==1">
      <el-button>删除选择项</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 编辑状态 0关 1开
      state: 0,
      data: [
        {
          img: require("../../assets/image/gw/con1.jpg"),
          title: "分享一只好看的小姐姐",
          src: require("../../assets/image/gw/goutou.jpg"),
          name: "不会飞的发福蝶",
          number: "2250",
          state: false
        },    {
          img: require("../../assets/image/gw/con1.jpg"),
          title: "分享一只好看的小姐姐",
          src: require("../../assets/image/gw/goutou.jpg"),
          name: "不会飞的发福蝶",
          number: "2250",
          state: false
        },    {
          img: require("../../assets/image/gw/con1.jpg"),
          title: "分享一只好看的小姐姐",
          src: require("../../assets/image/gw/goutou.jpg"),
          name: "不会飞的发福蝶",
          number: "2250",
          state: false
        },
        {
          img: require("../../assets/image/gw/con1.jpg"),
          title: "分享一只好看的小姐姐",
          src: require("../../assets/image/gw/goutou.jpg"),
          name: "不会飞的发福蝶",
          number: "2250",
          state: false
        },
        {
          img: require("../../assets/image/gw/con1.jpg"),
          title: "分享一只好看的小姐姐",
          src: require("../../assets/image/gw/goutou.jpg"),
          name: "不会飞的发福蝶",
          number: "2250",
          state: false
        },
        {
          img: require("../../assets/image/gw/con1.jpg"),
          title: "分享一只好看的小姐姐",
          src: require("../../assets/image/gw/goutou.jpg"),
          name: "不会飞的发福蝶",
          number: "2250",
          state: false
        },
        {
          img: require("../../assets/image/gw/con1.jpg"),
          title: "分享一只好看的小姐姐",
          src: require("../../assets/image/gw/goutou.jpg"),
          name: "不会飞的发福蝶",
          number: "2250",
          state: false
        },
        {
          img: require("../../assets/image/gw/con1.jpg"),
          title: "分享一只好看的小姐姐",
          src: require("../../assets/image/gw/goutou.jpg"),
          name: "不会飞的发福蝶",
          number: "2250",
          state: false
        },
        {
          img: require("../../assets/image/gw/con1.jpg"),
          title: "分享一只好看的小姐姐",
          src: require("../../assets/image/gw/goutou.jpg"),
          name: "不会飞的发福蝶",
          number: "2250",
          state: false
        },
        {
          img: require("../../assets/image/gw/con1.jpg"),
          title: "分享一只好看的小姐姐",
          src: require("../../assets/image/gw/goutou.jpg"),
          name: "不会飞的发福蝶",
          number: "2250",
          state: false
        },
        {
          img: require("../../assets/image/gw/con1.jpg"),
          title: "分享一只好看的小姐姐",
          src: require("../../assets/image/gw/goutou.jpg"),
          name: "不会飞的发福蝶",
          number: "2250",
          state: false
        },
        {
          img: require("../../assets/image/gw/con1.jpg"),
          title: "分享一只好看的小姐姐",
          src: require("../../assets/image/gw/goutou.jpg"),
          name: "不会飞的发福蝶",
          number: "2250",
          state: false
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
#Collection_0 {
  .top {
    > div:nth-child(1) {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin: 30px 0 10px;
      p:nth-child(1) {
        font-size: 28px;
        font-weight: 500;
        color: rgba(74, 74, 74, 1);
        line-height: 40px;
      }
      p:nth-child(2) {
        font-size: 22px;
        font-weight: 400;
        color: rgba(12, 118, 216, 1);
        line-height: 30px;
      }
    }
    > div:nth-child(2) {
      border-bottom: 5px dotted #4a4a4a;
    }
  }
  .card {
    padding-left: 10px;
    overflow: hidden;
  }
  .card > div {
    width: 290px;
    height: 410px;
    margin: 30px 40px 0 0;
    position: relative;
    float: left;
    > img:nth-of-type(1) {
      width: 290px;
      height: 320px;
      background: rgba(255, 255, 255, 1);
      border-radius: 6px 6px 0px 0px;
    }
    > p {
      font-size: 16px;
      font-weight: 400;
      color: rgba(47, 47, 47, 1);
      line-height: 22px;
      margin: 10px 0 20px 10px;
    }
    > div {
      display: flex;
      align-items: center;
      img:nth-of-type(1) {
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }
      img:nth-of-type(2) {
        margin-left: auto;
        width: 18px;
        height: 15px;
      }
      p:nth-of-type(1) {
        font-size: 14px;
        font-weight: 300;
        color: rgba(130, 130, 130, 1);
        line-height: 20px;
        margin-left: 10px;
      }
      p:nth-of-type(2) {
        font-size: 17px;
        font-weight: 300;
        color: rgba(130, 130, 130, 1);
        margin: 0 20px 0 3px;
        line-height: 25px;
      }
    }
    > img:nth-of-type(2) {
      position: absolute;
      top: -10px;
      right: -10px;
      width: 20px;
    }
  }
  .three {
    margin-right: 0 !important;
  }
  .button {
    text-align: right;
    .el-button {
      width: 180px;
      height: 60px;
      border-radius: 4px;
      border: 1px solid rgba(204, 204, 204, 1);
      font-size: 22px;
      font-weight: 400;
      color: rgba(74, 74, 74, 1);
      margin:30px 0;
    }
  }
}
</style>