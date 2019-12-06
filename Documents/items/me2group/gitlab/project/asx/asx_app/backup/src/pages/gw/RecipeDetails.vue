<template>
  <div>
    <div class="top">
      <div>
        <van-icon name="arrow-left" @click="$router.go(-1)"></van-icon>
      </div>
      <p>菜谱详情</p>
      <div></div>
    </div>
    <div style="height:0.88rem"></div>
    <video src="movie.ogg" controls="controls"></video>
    <div class="name">
      <p>{{name}}</p>
      <img src="../../assets/image/gw/55.png" />
      <p>{{watch}}</p>
      <img src="../../assets/image/gw/56.png" />
      <p>点击收藏</p>
    </div>
    <div class="tab">
      <div v-for="(value,key) in tab" :key="key">{{value}}</div>
    </div>
    <div class="makings">
      <p>主要食材</p>
      <div>
        <div v-for="(value,key) in pot" :key="key">{{value}}</div>
      </div>
    </div>
    <div class="makings">
      <p>辅料</p>
      <div>
        <div v-for="(value,key) in main" :key="key">{{value}}</div>
      </div>
    </div>
    <div class="introduce">
      <p v-if="state==false">{{introduce.slice(0,60)+'...'}}</p>
      <div v-else><p>{{introduce}}</p><br></div>
      <p @click="state=!state" v-if="state==false">
        <span>查看全部</span>
        <img src="../../assets/image/gw/57.png" />
      </p>
      <p @click="state=!state" v-else>
        <span>收起全部</span>
        <img src="../../assets/image/gw/57.png" />
      </p>
    </div>
    <div class="detail">
      <div v-for="(value,key) in detail" :key="key">
        <img :src="value.src" />
        <p>{{value.name}}</p>
        <p>{{value.introduce}}</p>
      </div>
    </div>
    <van-button>收藏起来把,下次找我更方便</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "东坡肉-苏轼",
      watch: "2980",
      tab: ["#标签内容", "#标签内容", "#标签内容", "#标签内容"],
      pot: ["五花肉", "五花肉", "五花肉"],
      main: ["葱", "姜", "蒜", "香菜"],
      introduce:
        "菜品介绍：东坡肉，又名红烧肉、滚菜品介绍：东坡肉，又名红烧肉、滚肉、东坡焖肉，是眉山和江南地区特色传统名肉、东坡焖肉，是眉山和江南地菜品介绍：东坡肉，又名红烧肉、滚肉、东坡焖肉，是眉山和江南地区特色传统名区特色传统名菜。东坡肉在浙菜、川菜、鄂菜等菜系中都有，且各地做法也...",
      state: false,
      detail: [
        {
          src: require("../../assets/image/gw/22.png"),
          name: "第一步",
          introduce:
            "这道菜的至关重要的地方就是选料，要选五花三层的肉，有肉皮哦~就是白色的脂肪层要有三层，而红肉部分也要三层。特别是肉皮下的第一层脂肪要厚一些。这点是成败的关键，只有选这样的肉，经过长时间的炖煮，做出来的肉才能层次分明，口感丰富不会变得干巴巴的"
        },
        {
          src: require("../../assets/image/gw/22.png"),
          name: "第一步",
          introduce:
            "这道菜的至关重要的地方就是选料，要选五花三层的肉，有肉皮哦~就是白色的脂肪层要有三层，而红肉部分也要三层。特别是肉皮下的第一层脂肪要厚一些。这点是成败的关键，只有选这样的肉，经过长时间的炖煮，做出来的肉才能层次分明，口感丰富不会变得干巴巴的"
        },
        {
          src: require("../../assets/image/gw/22.png"),
          name: "第一步",
          introduce:
            "这道菜的至关重要的地方就是选料，要选五花三层的肉，有肉皮哦~就是白色的脂肪层要有三层，而红肉部分也要三层。特别是肉皮下的第一层脂肪要厚一些。这点是成败的关键，只有选这样的肉，经过长时间的炖煮，做出来的肉才能层次分明，口感丰富不会变得干巴巴的"
        },
        {
          src: require("../../assets/image/gw/22.png"),
          name: "第一步",
          introduce:
            "这道菜的至关重要的地方就是选料，要选五花三层的肉，有肉皮哦~就是白色的脂肪层要有三层，而红肉部分也要三层。特别是肉皮下的第一层脂肪要厚一些。这点是成败的关键，只有选这样的肉，经过长时间的炖煮，做出来的肉才能层次分明，口感丰富不会变得干巴巴的"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.top {
  height: 0.88rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background: #fff;
  z-index: 99;
  .van-icon {
    font-size: 0.32rem;
    color: black;
    margin-left: 0.3rem;
  }
  p {
    font-size: 0.32rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  div {
    width: 1rem;
  }
}
video {
  width: 100%;
  height: 4.6rem;
}
.name {
  display: flex;
  align-items: center;
  padding: 0.3rem 0.3rem 0.2rem;
  p {
    font-size: 0.2rem;
    font-weight: 400;
    color: rgba(179, 179, 179, 1);
  }
  p:nth-child(1) {
    font-size: 0.34rem;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
  }
  img {
    height: 0.18rem;
    margin: 0 0.1rem 0 0.4rem;
  }
  img:nth-of-type(1) {
    margin-left: auto;
  }
}
.tab {
  display: flex;
  padding: 0 0.3rem;
  div {
    padding: 0 0.1rem;
    height: 0.28rem;
    background: rgba(224, 18, 32, 1);
    border-radius: 0.14rem;
    font-size: 0.18rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    margin-right: 0.1rem;
  }
}
.makings {
  padding: 0 0.3rem;
  > p {
    font-size: 0.28rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 0.28rem;
    margin: 0.3rem 0 0.2rem;
  }
  > div {
    width: 5rem;
    overflow: hidden;
    > div {
      float: left;
      height: 0.4rem;
      background: rgba(209, 69, 71, 0);
      border: 0.01rem solid rgba(102, 102, 102, 1);
      border-radius: 0.04rem;
      padding: 0 0.2rem;
      margin-right: 0.1rem;
      margin-bottom: 0.1rem;
      font-size: 0.22rem;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 0.38rem;
    }
  }
}
.introduce {
  margin-top: 0.2rem;
  padding: 0.15rem 0.2rem;
  background: rgba(245, 245, 245, 1);
  position: relative;
  p {
    font-size: 0.2rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 0.36rem;
  }
  p:last-child {
    font-size: 0.2rem;
    font-weight: 400;
    color: rgba(27, 125, 219, 1);
    line-height: 0.2rem;
    position: absolute;
    right: 0.3rem;
    bottom: 0.22rem;
    img {
      width: 0.12rem;
      vertical-align: middle;
    }
  }
}
.detail {
  > div {
    padding: 0.3rem 0.3rem 0;
    img {
      width: 6.9rem;
      height: 3.8rem;
    }
    p:nth-child(2) {
      font-size: 0.28rem;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 0.8rem;
    }
    p:nth-child(3) {
      font-size: 0.24rem;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 0.36rem;
    }
  }
}
.van-button {
  display: block;
  margin: 0.6rem auto;
  width: 6.9rem;
  height: 0.7rem;
  background: rgba(224, 18, 32, 1);
  border-radius: 0.04rem;
  font-size: 0.24rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 0.65rem;
}
</style>