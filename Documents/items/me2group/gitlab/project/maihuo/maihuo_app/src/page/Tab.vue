<template>
  <div id="Tab">
    <router-view></router-view>
    <div class="cushion"></div>
    <div class="bottom">
      <div @click="goHome">
        <img src="../assets/image/gw/14.png" v-if="data==1"/>
        <img src="../assets/image/gw/15.png" v-else/>

        <p :class="{active:data!=0}">工作台</p>
      </div>
      <div @click="goMy">
        <img src="../assets/image/gw/16.png" v-if="data==0"/>
        <img src="../assets/image/gw/17.png" v-else/>

        <p :class="{active:data!=1}">我的</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        data: 0
      };
    },
    mounted: function () {
      if (this.$route.path == "/index" || this.$route.path == "/placeDetail") {
        this.data = 0;
      }
      else {
        this.data = 1;
      }
    },
    methods: {
      goHome: function () {
        this.data = 0;
        this.$router.push('/index');
      },
      goMy: function () {
        this.data = 1;
        this.$router.push('/My');
      }
    }
  };
</script>
<style lang="less" scoped>
  #Tab {
    .cushion {
      width: 7.5rem;
      height: 1.2rem;
    }
    .bottom {
      width: 7.5rem;
      height: 1.2rem;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0rem -0.03rem 0.1rem 0rem rgba(199, 199, 199, 0.5);
      position: fixed;
      bottom: 0;
      display: flex;
      justify-content: space-around;
      z-index: 999;
      div {
        font-size: 0;
        img {
          width: 0.48rem;
          height: 0.48rem;
          padding: 0.2rem 0 0.1rem;
        }
        p {
          font-size: 0.24rem;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          line-height: 0.33rem;
        }
        .active {
          color: rgba(204, 204, 204, 1);
        }
      }
    }
  }
</style>
