<template>
  <div id="Classroom_middle">
    <!-- 自上到下 第一部分 -->
    <div class="one">
      <el-carousel>
        <el-carousel-item v-for="(item,index) in picture" :key="index">
          <img :src="item" />
        </el-carousel-item>
      </el-carousel>
      <div>
        <div>
          <img src="../../assets/img/gw/28.png" />
          <p>活力锅菜谱</p>
        </div>
        <div>
          <img src="../../assets/img/gw/29.png" />
          <p>全能锅菜谱</p>
        </div>
      </div>
    </div>
    <!-- 第二部分 -->
    <div class="two">
      <div>
        <div>
          <p>今日食谱</p>
          <p>不知道吃什么？</p>
        </div>
        <img src="../../assets/img/gw/30.png" />
      </div>
      <div>
        <div @click="state=0" :class="{active:state==0}">
          <p>早餐</p>
          <p>BREAKFAST</p>
        </div>
        <div @click="state=1" :class="{active:state==1}">
          <p>午餐</p>
          <p>LUNCH</p>
        </div>
        <div @click="state=2" :class="{active:state==2}">
          <p>晚餐</p>
          <p>DINNER</p>
        </div>
      </div>
      <div>
        <div v-for="(item,index) in picture_0" :key="index">
          <img :src="item.src" />
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
    <!-- 第三部分 -->
    <div class="three">
      <p>网红菜</p>
      <img src="../../assets/img/gw/31.png" />
      <div>
        <p>< Tinrry甜悦 >< Tinrry甜悦 >专栏< Tinrry甜悦 >专栏< Tinrry甜悦 >专栏< Tinrry甜悦 >专栏</p>
      </div>
      <img src="../../assets/img/gw/32.png" />
    </div>
    <!-- 第四部分 -->
    <div class="four">
      <i class="el-icon-arrow-left"></i>
      <div>
        <div v-for="(item,index) in picture_1" :key="index">
          <img :src="item.src" />
          <div>
            <p>{{item.name}}</p>
            <p>:达人</p>
            <p>{{item.name_0}}</p>
          </div>
        </div>
      </div>
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //轮播图
      picture: [
        require("../../assets/img/gw/25.jpg"),
        require("../../assets/img/gw/25.jpg"),
        require("../../assets/img/gw/25.jpg"),
        require("../../assets/img/gw/25.jpg")
      ],
      //食谱状态控制
      state: 0,
      //食谱图片,名称
      picture_0: [
        {
          name: "韭菜盒子",
          src: require("../../assets/img/gw/goutou.jpg")
        },
        {
          name: "美味蛋包饭",
          src: require("../../assets/img/gw/goutou.jpg")
        },
        {
          name: "皮蛋瘦肉粥",
          src: require("../../assets/img/gw/goutou.jpg")
        }
      ],
      //甜点图片
      picture_1: [
        {
          name: "韭菜盒子",
          name_0: "Tinrry甜悦",
          src: require("../../assets/img/gw/goutou.jpg")
        },
        {
          name: "美味蛋包饭",
          name_0: "Tinrry甜悦",
          src: require("../../assets/img/gw/goutou.jpg")
        },
        {
          name: "皮蛋瘦肉粥",
          name_0: "Tinrry甜悦",
          src: require("../../assets/img/gw/goutou.jpg")
        },
        {
          name: "皮蛋瘦肉粥",
          name_0: "Tinrry甜悦",
          src: require("../../assets/img/gw/goutou.jpg")
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
$size: 0.8;
#Classroom_middle {
  .one {
    display: flex;
    justify-content: space-between;
    .el-carousel {
      width: 600px * $size;
      height: 352px * $size;
      border-radius: 20px * $size;
      >>>.el-carousel__container {
        width: 100%;
        height: 100%;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    div:nth-child(2) {
      width: 167px * $size;
      > div:nth-child(1) {
        margin-bottom: 18px * $size;
      }
    }
    div:nth-child(2) > div {
      position: relative;
      width: 167px * $size;
      height: 167px * $size;
      border: 1px * $size solid rgba(230, 230, 230, 1);
      border-radius: 20px * $size;
      img {
        position: absolute;
        width: 132px * $size;
        left: 50%;
        transform: translate(-50%, 10%);
      }
      p {
        text-align: center;
        width: 140px * $size;
        height: 26px * $size;
        background: rgba(224, 18, 32, 1);
        border-radius: 13px * $size;
        margin: 130px * $size auto 0;
        font-size: 14px * $size;
        font-weight: 400;
        line-height: 26px * $size;
        color: rgba(255, 255, 255, 1);
      }
    }
    div:nth-child(2) > div:nth-child(1) {
      img {
        transform: translate(-50%, 30%);
      }
    }
  }
  .two {
    display: flex;
    justify-content: space-between;
    margin: 30px * $size 0 30px * $size;
    > div:nth-child(1) {
      width: 194px * $size;
      height: 220px * $size;
      display: flex;
      align-items: center;
      > div {
        width: 136px * $size;
        text-align: right;
      }
      > div > p:nth-child(1) {
        font-size: 24px * $size;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 45px * $size;
      }
      > div > p:nth-child(2) {
        font-size: 16px * $size;
        font-weight: 400;
        line-height: 16px * $size;
        color: rgba(51, 51, 51, 1);
      }
      img {
        width: 10px * $size;
        margin-left: 29px * $size;
      }
    }
    > div:nth-child(2) {
      width: 120px * $size;
      height: 220px * $size;
      div {
        width: 120px * $size;
        height: 68px * $size;
        border: 1px * $size solid rgba(179, 179, 179, 0.8);
        border-radius: 10px * $size;
        margin-bottom: 8px * $size;
        padding-right: 19px * $size;
        box-sizing: border-box;
      }
      div > p:nth-child(1) {
        font-size: 16px * $size;
        font-weight: 400;
        margin: 19px * $size 0 7px * $size;
        text-align: right;
        line-height: 16px * $size;
      }
      div > p:nth-child(2) {
        font-size: 14px * $size;
        font-weight: 400;
        text-align: right;
        line-height: 14px * $size;
      }
      .active {
        color: #fff;
        background-color: #e31423;
      }
    }
    > div:nth-child(3) {
      width: 455px * $size;
      height: 220px * $size;
      border: 1px * $size solid rgba(230, 230, 230, 1);
      border-radius: 10px * $size;
      padding: 10px * $size;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      > div {
        width: 138px * $size;
        height: 200px * $size;
        border-radius: 5px * $size;
        overflow: hidden;
        position: relative;
      }
      > div img {
        width: 138px * $size;
        height: 200px * $size;
      }
      > div p {
        position: absolute;
        left: 10px * $size;
        bottom: 10px * $size;
        font-size: 16px * $size;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .three {
    width: 785px * $size;
    height: 26px * $size;
    background: rgba(240, 240, 240, 1);
    border-radius: 13px * $size;
    display: flex;
    > p {
      width: 120px * $size;
      height: 26px * $size;
      background: rgba(224, 18, 32, 1);
      border-radius: 13px * $size;
      text-align: center;
      font-size: 16px * $size;
      font-weight: 400;
      line-height: 26px * $size;
      color: rgba(255, 255, 255, 1);
      vertical-align: top;
      margin-right: 10px * $size;
    }
    img {
      width: 20px * $size;
      margin: 3px * $size 0;
    }
    div {
      width: 572px * $size;
      margin: 5px * $size 20px * $size;
      overflow: hidden;
      p {
        font-size: 16px * $size;
        font-family: DFYuanW5-GB;
        font-weight: 400;
        line-height: 16px * $size;
        color: rgba(51, 51, 51, 1);
        white-space: nowrap;
      }
    }
  }
  .four {
    margin-top: 16px * $size;
    width: 785px * $size;
    height: 213px * $size;
    background: rgba(250, 250, 250, 1);
    border-radius: 10px * $size;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      margin: 0 8px * $size;
      font-size: 50px * $size;
      font-weight: bold;
      color: #e1e1e1;
    }
    > div {
      width: 665px * $size;
      display: flex;
      justify-content: space-between;
    }
    > div > div {
      position: relative;
      img {
        position: absolute;
        right: 0;
        left: 0;
        width: 158px * $size;
        height: 173px * $size;
        border-radius: 10px * $size;
      }
    }
    > div > div > div {
      width: 158px * $size;
      height: 173px * $size;
      border-radius: 10px * $size;
      background: rgba(0, 0, 0, 1);
      opacity: 0;
      border-radius: 10px * $size;
      overflow: hidden;
      p {
        font-size: 16px * $size;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 24px * $size;
        margin-left: 14px * $size;
      }
      p:nth-child(1) {
        margin-top: 20px * $size;
      }
      p:nth-child(2) {
        margin-top: 65px * $size;
      }
    }
    > div > div > div:hover {
      opacity: 0.5;
    }
  }
}
</style>