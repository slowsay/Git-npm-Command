<template>
  <div class="star">
    <navbar></navbar>
    <div class="content">
      <!-- 左侧导航 -->
      <div class="left_nav" v-show="show">
        <h4 class="name">全能平底锅</h4>
        <h4 class="name">介绍栏</h4>
        <ul style="margin-top:10px;">
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
      <!-- 右侧商品 -->
      <div class="right">
        <div class="top">
          <img src="../../assets/img/zch/start/block.png" alt @click="menu_nav" />
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
      show: true,
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
    },
    // 左侧导航栏显示隐藏
    menu_nav() {
      let right = document.querySelector(".right");
      if (this.show == true) {
        this.show = false;
        right.style.width = "100%";
      } else {
        this.show = true;
        right.style.width = "75%";
      }
    }
  }
};
</script>

<style scoped>
.star {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1280px;
  margin: auto;
}
.content {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 40px;
}
.content .left_nav {
  width: 25%;
  background: url("../../assets/img/zch/start/3x.png") no-repeat;
  background-size: 100%;
}
.content .left_nav .name {
  font-size: 30px;
  padding-left: 19px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 36px;
  text-align: left;
  margin-left: 3px;
}
.content .left_nav .name:first-child {
  padding-top: 19px;
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
  height: 60px;
}
.trol p {
  font-size: 18px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 36px;
  margin-left: 7%;
}
.trol img {
  width: 8px;
  height: 10px;
  margin-right: 7%;
}
.content .right {
  width: 73%;
  margin-left: 2%;
}
.right .top img {
  width: 28px;
  height: 28px;
  margin-right: 20px;
}
.right .title {
  font-size: 30px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 36px;
  margin-top: 38px;
  padding-bottom: 20px;
  border-bottom: 5px dotted rgba(102, 102, 102, 1);
}
.shop {
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.shop .sp {
  width: 100%;
}
.shop .play {
  width: 48px;
  height: 49px;
  position: absolute;
}
</style>