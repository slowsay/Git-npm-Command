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
<style lang="less" scoped>
#Classroom_middle {
  .one {
    display: flex;
    justify-content: space-between;
    .el-carousel {
      width: 600px;
      height: 352px;
      border-radius: 20px;
      /deep/.el-carousel__container {
        width: 100%;
        height: 100%;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    div:nth-child(2) {
      width: 167px;
      > div:nth-child(1) {
        margin-bottom: 18px;
      }
    }
    div:nth-child(2) > div {
      position: relative;
      width: 167px;
      height: 167px;
      border: 1px solid rgba(230, 230, 230, 1);
      border-radius: 20px;
      img {
        position: absolute;
        width: 132px;
        left: 50%;
        transform: translate(-50%, 10%);
      }
      p {
        text-align: center;
        width: 140px;
        height: 26px;
        background: rgba(224, 18, 32, 1);
        border-radius: 13px;
        margin: 130px auto 0;
        font-size: 14px;
        font-weight: 400;
        line-height: 26px;
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
    margin: 30px 0 30px;
    > div:nth-child(1) {
      width: 194px;
      height: 220px;
      display: flex;
      align-items: center;
      > div {
        width: 136px;
        text-align: right;
      }
      > div > p:nth-child(1) {
        font-size: 24px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 45px;
      }
      > div > p:nth-child(2) {
        font-size: 16px;
        font-weight: 400;
        line-height: 16px;
        color: rgba(51, 51, 51, 1);
      }
      img {
        width: 10px;
        margin-left: 29px;
      }
    }
    > div:nth-child(2) {
      width: 120px;
      height: 220px;
      div {
        width: 120px;
        height: 68px;
        border: 1px solid rgba(179, 179, 179, 0.8);
        border-radius: 10px;
        margin-bottom: 8px;
        padding-right: 19px;
        box-sizing: border-box;
      }
      div > p:nth-child(1) {
        font-size: 16px;
        font-weight: 400;
        margin: 19px 0 7px;
        text-align: right;
        line-height: 16px;
      }
      div > p:nth-child(2) {
        font-size: 14px;
        font-weight: 400;
        text-align: right;
        line-height: 14px;
      }
      .active {
        color: #fff;
        background-color: #e31423;
      }
    }
    > div:nth-child(3) {
      width: 455px;
      height: 220px;
      border: 1px solid rgba(230, 230, 230, 1);
      border-radius: 10px;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      > div {
        width: 138px;
        height: 200px;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
      }
      > div img {
        width: 138px;
        height: 200px;
      }
      > div p {
        position: absolute;
        left: 10px;
        bottom: 10px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .three {
    width: 785px;
    height: 26px;
    background: rgba(240, 240, 240, 1);
    border-radius: 13px;
    display: flex;
    > p {
      width: 120px;
      height: 26px;
      background: rgba(224, 18, 32, 1);
      border-radius: 13px;
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
      color: rgba(255, 255, 255, 1);
      vertical-align: top;
      margin-right: 10px;
    }
    img {
      width: 20px;
      margin: 3px 0;
    }
    div {
      width: 572px;
      margin: 5px 20px;
      overflow: hidden;
      p {
        font-size: 16px;
        font-family: DFYuanW5-GB;
        font-weight: 400;
        line-height: 16px;
        color: rgba(51, 51, 51, 1);
        white-space: nowrap;
      }
    }
  }
  .four {
    margin-top: 16px;
    width: 785px;
    height: 213px;
    background: rgba(250, 250, 250, 1);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      margin: 0 8px;
      font-size: 50px;
      font-weight: bold;
      color: #e1e1e1;
    }
    > div {
      width: 665px;
      display: flex;
      justify-content: space-between;
    }
    > div > div {
      position: relative;
      img {
        position: absolute;
        right: 0;
        left: 0;
        width: 158px;
        height: 173px;
        border-radius: 10px;
      }
    }
    > div > div > div {
      width: 158px;
      height: 173px;
      border-radius: 10px;
      background: rgba(0, 0, 0, 1);
      opacity: 0;
      border-radius: 10px;
      overflow: hidden;
      p {
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 24px;
        margin-left: 14px;
      }
      p:nth-child(1) {
        margin-top: 20px;
      }
      p:nth-child(2) {
        margin-top: 65px;
      }
    }
    > div > div > div:hover {
      opacity: 0.5;
    }
  }
}
</style>