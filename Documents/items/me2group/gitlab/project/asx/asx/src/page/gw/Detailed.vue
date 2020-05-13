<template>
  <div id="Detailed">
    <div>
      <navbar></navbar>
      <div class="one">
        <img src="../../assets/img/gw/36.png" />
        <p>{{title}}</p>
      </div>
      <div class="two">
        <img :src="img" />
        <div>
          <div class="title">
            <p>{{title+'-'+name}}</p>
            <div>
              <img src="../../assets/img/gw/33.png" />
              <p>{{number_0}}</p>
            </div>
            <div>
              <img src="../../assets/img/gw/35.png" />
              <p>{{number_1}}</p>
            </div>
          </div>
          <div class="label">
            <p v-for="(item,index) in label" :key="index">{{item}}</p>
          </div>
          <div class="block">
            <div>主要食材</div>
            <p v-for="(item,index) in foods" :key="index">{{item}}</p>
          </div>
          <div class="block">
            <div>辅料</div>
            <p v-for="(item,index) in seasoning" :key="index">{{item}}</p>
          </div>
        </div>
      </div>
      <div class="three">
        <p :class="{active:state==1}">{{body_0}}</p>
        <div @click="state=1" v-if="state==0">
          查看全部
          <i class="el-icon-arrow-down"></i>
        </div>
        <div @click="state=0" v-else>
          收起
          <i class="el-icon-arrow-up"></i>
        </div>
      </div>
      <div class="four">
        <div v-for="(item,index) in data" :key="index">
          <img :src="item.src" />
          <p>{{item.title}}</p>
          <p>{{item.body}}</p>
        </div>
        <el-button>收藏起来吧，下次找我更方便</el-button>
      </div>
    </div>
    <Bottom></Bottom>
    <!-- 侧边栏 -->
    <rightNav></rightNav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "东坡肉",
      img: require("../../assets/img/gw/goutou.jpg"),
      name: "苏轼",
      number_0: 29820,
      number_1: 9136,
      label: ["#标签内容", "#标签内容", "#标签内容", "#标签内容"],
      foods: ["五花肉", "五花肉", "五花肉", "五花肉", "五花肉", "五花肉"],
      seasoning: [
        "五花肉肉肉肉",
        "五花肉",
        "五花肉",
        "五花肉",
        "五肉花肉",
        "五肉肉肉肉花肉"
      ],
      body: `菜品介绍：东坡肉，又名红烧肉、滚肉、东坡焖肉，是眉山和江南地区特色传统名菜。东坡肉在浙菜、川菜、鄂菜等菜系中都有，且各地做法也有不同，有先煮后烧的，有先煮后蒸的，有直接焖煮收汁的。东坡肉的主料和造型大同小异，主料都是半肥半瘦的猪肉，成品菜都是码得整整齐齐的麻将块儿，红得透亮，色如玛瑙，夹起一块尝尝，软而不烂，肥而不腻。`,
      //   菜品介绍 收起状态
      state: 0,
      data: [
        {
          title: "第一步",
          body: `
                            这道菜的至关重要的地方就是选料，要选五花三层的肉，有肉皮哦~
就是白色的脂肪层要有三层，而红肉部分也要三层。特别是肉皮下的
第一层脂肪要厚一些。这点是成败的关键，只有选这样的肉，经过长
时间的炖煮，做出来的肉才能层次分明，口感丰富不会变得干巴巴的
                        `,
          src: require("../../assets/img/gw/goutou.jpg")
        },
        {
          title: "第一步",
          body: `
                            这道菜的至关重要的地方就是选料，要选五花三层的肉，有肉皮哦~
就是白色的脂肪层要有三层，而红肉部分也要三层。特别是肉皮下的
第一层脂肪要厚一些。这点是成败的关键，只有选这样的肉，经过长
时间的炖煮，做出来的肉才能层次分明，口感丰富不会变得干巴巴的
                        `,
          src: require("../../assets/img/gw/goutou.jpg")
        },
        {
          title: "第一步",
          body: `
                            这道菜的至关重要的地方就是选料，要选五花三层的肉，有肉皮哦~
就是白色的脂肪层要有三层，而红肉部分也要三层。特别是肉皮下的
第一层脂肪要厚一些。这点是成败的关键，只有选这样的肉，经过长
时间的炖煮，做出来的肉才能层次分明，口感丰富不会变得干巴巴的
                        `,
          src: require("../../assets/img/gw/goutou.jpg")
        },
        {
          title: "第一步",
          body: `
                            这道菜的至关重要的地方就是选料，要选五花三层的肉，有肉皮哦~
就是白色的脂肪层要有三层，而红肉部分也要三层。特别是肉皮下的
第一层脂肪要厚一些。这点是成败的关键，只有选这样的肉，经过长
时间的炖煮，做出来的肉才能层次分明，口感丰富不会变得干巴巴的
                        `,
          src: require("../../assets/img/gw/goutou.jpg")
        },
        {
          title: "第一步",
          body: `
                            这道菜的至关重要的地方就是选料，要选五花三层的肉，有肉皮哦~
就是白色的脂肪层要有三层，而红肉部分也要三层。特别是肉皮下的
第一层脂肪要厚一些。这点是成败的关键，只有选这样的肉，经过长
时间的炖煮，做出来的肉才能层次分明，口感丰富不会变得干巴巴的
                        `,
          src: require("../../assets/img/gw/goutou.jpg")
        }
      ]
    };
  },
  computed: {
    body_0() {
      if (this.state == 1) {
        return this.body;
      } else {
        return this.body.substring(0, 113) + "...";
      }
    }
  }
};
</script>
<style lang="scss" scoped>$size: 0.8;
#Detailed {
  > div:nth-child(1) {
    width: 1280px*$size;
    margin: auto;
  }
  .one {
    margin: 38px*$size 0 0px*$size;
    padding-bottom: 18px*$size;
    height: 28px*$size;
    border-bottom: 4px*$size #666666 dotted;
    img {
      height: 28px*$size;
      float: right;
    }
    p {
      font-size: 30px*$size;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 28px*$size;
    }
  }
  .two {
    overflow: hidden;
    padding: 40px*$size 0 18px*$size;
    font-size: 0;
    > img {
      width: 680px*$size;
      height: 430px*$size;
      border-radius: 4px*$size;
      margin-right: 30px*$size;
    }
    > div {
      vertical-align: top;
      display: inline-block;
      width: 570px*$size;
    }
    .title {
      display: flex;
      margin-bottom: 20px*$size;
      p {
        font-size: 28px*$size;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        width: 378px*$size;
        line-height: 30px*$size;
      }
      div {
        width: 92px*$size;
        line-height: 30px*$size;
        display: flex;
        align-items: center;
      }
      div:nth-child(2) img {
        width: 19px*$size;
        vertical-align: middle;
        margin-right: 5px*$size;
      }
      div:nth-child(3) img {
        width: 16px*$size;
        margin-right: 5px*$size;
      }
      div p {
        font-size: 18px*$size;
        font-weight: 400;
        color: rgba(179, 179, 179, 1);
      }
    }
    .label {
      height: 67px*$size;
      p {
        float: left;
        height: 28px*$size;
        background: rgba(224, 18, 32, 1);
        border-radius: 14px*$size;
        font-size: 14px*$size;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 28px*$size;
        text-align: center;
        padding: 0 10px*$size;
        margin-right: 10px*$size;
      }
    }
    .block {
      overflow: hidden;
      div:nth-child(1) {
        clear: both;
        font-size: 20px*$size;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin: 20px*$size 0 10px*$size 0;
        line-height: 20px*$size;
      }
      p {
        float: left;
        font-size: 16px*$size;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        height: 40px*$size;
        background: rgba(209, 69, 71, 0);
        border: 1px*$size solid rgba(102, 102, 102, 1);
        border-radius: 4px*$size;
        line-height: 40px*$size;
        padding: 0 25px*$size;
        margin: 0 10px*$size 10px*$size 0;
        box-sizing: border-box;
      }
    }
  }
  .three {
    width: 1280px*$size;
    padding: 10px*$size 20px*$size;
    background: rgba(245, 245, 245, 1);
    border-radius: 4px*$size;
    position: relative;
    margin-bottom: 18px*$size;
    box-sizing: border-box;
    p {
      font-size: 20px*$size;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 30px*$size;
    }
    div {
      font-size: 20px*$size;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(27, 125, 219, 1);
      line-height: 28px*$size;
      position: absolute;
      bottom: 10px*$size;
      right: 10px*$size;
    }
    .active {
      margin-bottom: 30px*$size;
    }
  }
  .four {
    div {
      overflow: hidden;
      margin-bottom: 18px*$size;
      img {
        width: 680px*$size;
        height: 376px*$size;
        background: rgba(255, 255, 255, 1);
        border: 1px*$size solid rgba(230, 230, 230, 1);
        border-radius: 4px*$size;
        float: left;
        margin-right: 30px*$size;
      }
      p:nth-of-type(1) {
        font-size: 28px*$size;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 36px*$size;
        margin: 20px*$size 0 40px*$size;
      }
      p:nth-of-type(2) {
        font-size: 18px*$size;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 30px*$size;
      }
    }
    .el-button {
      width: 400px*$size;
      height: 70px*$size;
      background: rgba(224, 18, 32, 1);
      border-radius: 4px*$size;
      font-size: 24px*$size;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin: 23px*$size 0 160px*$size 935px*$size;
    }
  }
}
</style>