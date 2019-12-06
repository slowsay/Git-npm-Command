<template>
  <div id="Release">
    <div class="top">
      <div>
        <p>我的发布</p>
      </div>
      <div></div>
    </div>
    <div class="body" v-for="(item,index) in data" :key="index">
      <p>{{item.time}}</p>
      <div
        class="card"
        v-for="(item_0,index_0) in item.data"
        :key="index_0"
        :class="{three:(index_0+1)%3==0}"
      >
        <img :src="item_0.img" />
        <p>{{item_0.title}}</p>
        <div>
          <img :src="item_0.src" />
          <p>{{item_0.name}}</p>
          <img src="../../assets/image/gw/25.png" />
          <p>{{item_0.number}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          time: "2019.06.12 12：21",
          data: [
            {
              img: require("../../assets/image/gw/con1.jpg"),
              title: "分享一只好看的小姐姐",
              src: require("../../assets/image/gw/goutou.jpg"),
              name: "不会飞的发福蝶",
              number: "2250"
            },
            {
              img: require("../../assets/image/gw/con1.jpg"),
              title: "分享一只好看的小姐姐",
              src: require("../../assets/image/gw/goutou.jpg"),
              name: "不会飞的发福蝶",
              number: "2250"
            },
            {
              img: require("../../assets/image/gw/con1.jpg"),
              title: "分享一只好看的小姐姐",
              src: require("../../assets/image/gw/goutou.jpg"),
              name: "不会飞的发福蝶",
              number: "2250"
            },
            {
              img: require("../../assets/image/gw/con1.jpg"),
              title: "分享一只好看的小姐姐",
              src: require("../../assets/image/gw/goutou.jpg"),
              name: "不会飞的发福蝶",
              number: "2250"
            }
          ]
        },
        {
          time: "2019.06.12 12：21",
          data: [
            {
              img: require("../../assets/image/gw/con1.jpg"),
              title: "分享一只好看的小姐姐",
              src: require("../../assets/image/gw/goutou.jpg"),
              name: "不会飞的发福蝶",
              number: "2250"
            },
            {
              img: require("../../assets/image/gw/con1.jpg"),
              title: "分享一只好看的小姐姐",
              src: require("../../assets/image/gw/goutou.jpg"),
              name: "不会飞的发福蝶",
              number: "2250"
            }
          ]
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
#Release {
  .top {
    > div:nth-child(1) {
      margin: 30px 0 10px;
      p {
        font-size: 28px;
        font-weight: 500;
        color: rgba(74, 74, 74, 1);
        line-height: 40px;
      }
    }
    > div:nth-child(2) {
      border-bottom: 5px dotted #4a4a4a;
    }
  }
  .body {
    overflow: hidden;

    > p {
      font-size: 28px;
      font-weight: 500;
      color: rgba(74, 74, 74, 1);
      line-height: 40px;
      margin: 20px 0 -10px;
    }
  }
  .card {
    width: 290px;
    height: 410px;
    margin: 30px 40px 0 0;
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
  }
  .three {
    margin-right: 0 !important;
  }
}
</style>