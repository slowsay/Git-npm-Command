<template>
  <div class="star">
    <navbar></navbar>
    <div class="content" :class="{left:show}">
      <!-- 左侧导航 -->
      <div class="left_nav" >
        <h4 class="name">全能平底锅</h4>
        <h4 class="name">介绍栏</h4>
        <ul style="margin-top:8px;">
          <li
            class="trol"
            @click="netbeans(item)"
            v-for="(item,i) of left_nav"
            :key="i"
            :class="{'back_red':item.show}"
          >
            <p>{{item.name}}</p>
            <img :src="item.img" alt v-show="item.show" />
          </li>
        </ul>
      </div>
      <div></div>
      <!-- 右侧商品 -->
      <div class="right" :class="{right_0:show}">
        <div class="top">
          <img src="../../assets/img/zch/start/block.png" alt @click="show=!show" />
          <img src="../../assets/img/zch/start/left.png" alt />
          <img src="../../assets/img/zch/start/right.png" alt />
        </div>
        <h4 class="title">全能健康锅功能简介</h4>
        <div class="shop">
          <img src="../../assets/img/zch/start/sp.png" alt class="sp" />
          <img src="../../assets/img/zch/start/bofang-3@3x.png" alt class="play" />
        </div>
      </div>
    </div>
    <rightnav></rightnav>
  </div>
</template>
<script>
import navbar from "../../components/nav";
import rightnav from "../../components/right_nav";
export default {
  components: {
    navbar,
    rightnav
  },
  data() {
    return {
      // 左侧导航栏显示隐藏
      show: false,
      // 左侧导航栏
      left_nav: [
        {
          name: "全能健康锅功能简介",
          img: require("../../assets/img/zch/start/go.png"),
          show: true
        },
        {
          name: "页面标题",
          img: require("../../assets/img/zch/start/go.png"),
          show: false
        },
        {
          name: "页面标题",
          img: require("../../assets/img/zch/start/go.png"),
          show: false
        },
        {
          name: "页面标题",
          img: require("../../assets/img/zch/start/go.png"),
          show: false
        },
        {
          name: "页面标题",
          img: require("../../assets/img/zch/start/go.png"),
          show: false
        }
      ]
    };
  },
  methods: {
    netbeans(a) {
      for (var i in this.left_nav) {
        this.left_nav[i].show = false;
      }
      a.show = true;
    }
    // 左侧导航栏显示隐藏
  }
};
</script>

<style lang="scss" scoped>
$size: 0.8;
.star {
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1280px * $size;
  margin: auto;
}
.content {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 40px * $size;
  transition: all 0.5s;
}
.content .left_nav {
  flex-shrink: 0;
  margin-right: 45px;
  width: 192px;
  background: url("../../assets/img/zch/start/3x.png") no-repeat;
  background-size: 100%;
}
.content .left_nav .name {
  font-size: 30px * $size;
  padding-left: 19px * $size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 36px * $size;
  text-align: left;
  margin-left: 3px * $size;
}
.content .left_nav .name:first-child {
  padding-top: 19px * $size;
}
.back_red {
  background: url("../../assets/img/zch/start/red.png");
  width: 100%;
}
.trol {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px * $size;
}
.trol p {
  font-size: 18px * $size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 36px * $size;
  margin-left: 7%;
}
.trol img {
  width: 8px * $size;
  height: 10px * $size;
  margin-right: 7%;
}
.content .right {
  flex-shrink: 0;
  width: 785px;
  transition: all 0.5s
}
.right .top img {
  width: 28px * $size;
  height: 28px * $size;
  margin-right: 20px * $size;
}
.right .title {
  font-size: 30px * $size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 36px * $size;
  margin-top: 38px * $size;
  padding-bottom: 20px * $size;
  border-bottom: 5px * $size dotted rgba(102, 102, 102, 1);
}
.shop {
  margin-top: 40px * $size;
  display: flex;
  align-items: center;
  justify-content: center;
}
.shop .sp {
  width: 100%;
}
.shop .play {
  width: 48px * $size;
  height: 49px * $size;
  position: absolute;
}

.left {
  transform: translateX(-237px);
}
.right_0 {
  width: 1024px !important;
}
</style>