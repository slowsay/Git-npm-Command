<template>
  <div id="Popup">
    <div v-show="state==0">
      <div style="height:.6rem"></div>
      <div class="icon">
        <div v-for="(value,key) in data" :key="key" @click="jump(key)">
          <img :src="value.src" />
          <p>{{value.title}}</p>
        </div>
      </div>
    </div>
    <div v-show="state==1" class="star">
      <div v-for="(value,key) in data_0" :key="key" @click="jump(7)">
        <div>
          <img :src="value.src" />
        </div>
        <p>{{value.title}}</p>
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
          src: require("../../assets/image/gw/8.png"),
          title: "首页"
        },
        {
          src: require("../../assets/image/gw/9.png"),
          title: "明星产品"
        },
        {
          src: require("../../assets/image/gw/10.png"),
          title: "健康食谱"
        },
        {
          src: require("../../assets/image/gw/11.png"),
          title: "我要购买"
        },
        {
          src: require("../../assets/image/gw/12.png"),
          title: "锅友说"
        },
        {
          src: require("../../assets/image/gw/13.png"),
          title: "联系我们"
        },
        {
          src: require("../../assets/image/gw/14.png"),
          title: "了解阿莎希"
        }
      ],
      state: 0,
      data_0: [
        { src: require("../../assets/image/gw/35.png"), title: "全能锅系列" },
        { src: require("../../assets/image/gw/19.png"), title: "零秒活力锅" }
      ],
      path: ["/Home", "", "/ClassRoom", "/Mall", "/friendSay", "", "/Understand",'/Star']
    };
  },
  methods: {
    jump(index) {
      if (index == 1) this.state = 1;
      else {
        this.$router.push(this.path[index]);

        //收起弹窗
        this.$emit("popup");
      }
    }
  }
};
</script>

<style lang="less" scoped>
#Popup {
  overflow: hidden;
  .icon {
    div {
      float: left;
      width: 25%;
      text-align: center;
      img {
        width: 1.24rem;
      }
      p {
        font-size: 0.24rem;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 0.24rem;
        margin-bottom: 0.6rem;
      }
    }
  }
  .star {
    padding: 0 0.3rem;
    border-top: 0.01rem solid #f5f5f5;
    > div {
      width: 100%;
      height: 1.4rem;
      display: flex;

      border-bottom: 0.01rem solid #f5f5f5;

      > div {
        width: 1.6rem;
        text-align: center;
        line-height: 1.4rem;
        font-size: 0.2rem;
      }
    }
    img {
      height: 0.8rem;
      vertical-align: middle;
    }
    p {
      font-size: 0.3rem;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 1.4rem;
      margin-left: auto;
    }
  }
}
</style>