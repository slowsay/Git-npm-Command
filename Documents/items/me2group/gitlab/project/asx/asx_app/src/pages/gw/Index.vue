<template>
  <div id="Index">
    <div v-if="show_0==true">
      <div class="top">
        <img src="../../assets/image/gw/1.png" @click="click_left"/>
        <img src="../../assets/image/gw/2.png"/>
        <img src="../../assets/image/gw/3.png" @click="click_right"/>
      </div>
      <div style="height:.88rem"></div>
    </div>
    <router-view></router-view>
    <div class="bottom" v-if="show_1==true">
      <div v-for="(value,key) in Label" :key="key" class="menu" @click="click(key)">
        <div>
          <p>{{value.title}}</p>
          <img src="../../assets/image/gw/4.png" :class="{rotate:active[key]==true}"/>
        </div>
        <div class="drop-down">
          <p v-for="(value,key) in value.label" :key="key">{{value.name}}</p>
        </div>
      </div>
      <div class="contact">
        <div>
          <img src="../../assets/image/gw/6.png"/>

          <p>{{phone}}</p>
        </div>
        <div>
          <img src="../../assets/image/gw/7.png"/>

          <p>在线客服</p>
        </div>
      </div>
      <div class="address">
        <img src="../../assets/image/gw/2.png"/>

        <p>
          <span>地址:</span>
          <span>{{address}}</span>
        </p>
      </div>
    </div>
    <div class="popup" :class="{popup_0:left==true,popup_1:show=='left'}">
      <left ref="left" @popup="TakeBack"></left>
    </div>
    <div class="popup" :class="{popup_0:right==true,popup_1:show=='right'}">
      <right @popup="TakeBack"></right>
    </div>
  </div>
</template>

<script>
  import left from "./Popup";
  import right from "../zxw/personCenter";
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    components: {
      left: left,
      right: right
    },
    data: function () {
      return {
        headerobj: {},
        userinfo: "",
        left: false,
        right: false,
        show: null,
        Label: [
          {
            title: "帮助中心",
            label: [
              {name: "账户管理", site: ""},
              {name: "账户管理", site: ""},
              {name: "账户管理", site: ""}
            ]
          },
          {
            title: "产品中心",
            label: [
              {name: "账户管理", site: ""},
              {name: "账户管理", site: ""},
              {name: "账户管理", site: ""}
            ]
          },
          {
            title: "明星产品",
            label: [
              {name: "账户管理", site: ""},
              {name: "账户管理", site: ""},
              {name: "账户管理", site: ""}
            ]
          },
          {
            title: "科理教室",
            label: [
              {name: "账户管理", site: ""},
              {name: "账户管理", site: ""},
              {name: "账户管理", site: ""}
            ]
          },
          {
            title: "锅友说",
            label: [
              {name: "账户管理", site: ""},
              {name: "账户管理", site: ""},
              {name: "账户管理", site: ""}
            ]
          },
          {
            title: "关于我们",
            label: [
              {name: "账户管理", site: ""},
              {name: "账户管理", site: ""}
            ]
          }
        ],
        active: [false, false, false, false, false, false],
        phone: "400-828-8385",
        address: "江苏省苏州市吴江区云创路512商会大厦1206室",
        //动态显示顶部
        show_0: true,
        // 动态显示底部
        show_1: false
      };
    },
    created: function () {
      this.init();
    },
    methods: {
      init: function () {
      },
      click_left: function () {
        var _this = this;
        if (this.$refs.left.state == 1) this.$refs.left.state = 0;
        else {
          this.left = !this.left;
          this.show = "left";
          setTimeout(function () {
            _this.right = false;
          }, 300);
        }
      },
      click_right: function () {
        var _this = this;
        if (publicFn.getStore("asxUserInfo")) {
          this.userinfo = JSON.parse(publicFn.getStore("asxUserInfo"));
          this.right = !this.right;
          this.show = "right";

          setTimeout(function () {
            _this.left = false;
          }, 300);
        }
        else {
          this.$router.push('/Login');
        }

      },
      click: function (index) {
        var _this = this;
        this.active.splice(index, 1, !this.active[index]);
        if (this.active[index] == true) {
          document.getElementsByClassName("drop-down")[index].style.height =
            this.Label[index].label.length * 0.54 + "rem";
        } else {
          document.getElementsByClassName("drop-down")[index].style.height = 0;
        }
      },
      //弹窗收回
      TakeBack: function () {
        this.left = false;
        this.right = false;
      },
      judge: function (value) {
        if (value == "/Wares" || value == "/RecipeDetails") this.show_0 = false;
        else this.show_0 = true;
        if (
          value == "/Home" ||
          value == "/Mall" ||
          value == "/Wares" ||
          value == "/ClassRoom" ||
          value == "/RecipeDetails"
        )
          this.show_1 = true;
        else this.show_1 = false;
      }
    },
    beforeRouteUpdate: function (to, from, next) {
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
      this.judge(to.path);
      next();
    },
    mounted: function () {
      this.judge(this.$route.path);
    }
  };
</script>

<style lang="less" scoped>
  #Index {
    .top {
      position: fixed;
      top: 0;
      width: 100%;
      height: 0.88rem;
      padding: 0 0.3rem;
      background: #fff;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0px 1px 0px 0px rgba(240, 240, 240, 1);
      z-index: 3;
      img:nth-child(1) {
        width: 0.36rem;
        height: 0.29rem;
      }
      img:nth-child(2) {
        width: 1.15rem;
        height: 0.54rem;
      }
      img:nth-child(3) {
        width: 0.34rem;
        height: 0.4rem;
      }
    }
    .bottom {
      background: #f0f0f0;
      padding: 0.1rem 0.3rem 0rem;
    }
    .menu {
      border-bottom: 0.01rem solid rgba(230, 230, 230, 1);
      > div:nth-child(1) {
        display: flex;
        height: 0.85rem;
        align-items: center;
        p {
          font-size: 0.28rem;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
        }
        img {
          margin-left: auto;
          width: 0.2rem;
          line-height: 0.85rem;
          transition: all 0.3s;
          transform: rotate(45deg);
        }
        .rotate {
          transform: rotate(180deg);
        }
      }
      > div:nth-child(2) {
        height: 0;
        overflow: hidden;
        transition: all 0.3s;
        p {
          font-size: 0.24rem;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 0.24rem;
          padding: 0 0 0.3rem 0.3rem;
        }
      }
    }
    .contact {
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > div {
        background: url("../../assets/image/gw/5.png");
        background-size: 100%;
        background-repeat: no-repeat;
        width: 3.3rem;
        height: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 0.3rem;
          margin-right: 0.3rem;
        }
        p {
          font-size: 0.3rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
    .address {
      background: #fff;
      height: 3rem;
      overflow: hidden;
      margin: 0 -0.3rem;
      img {
        width: 2.1rem;
        display: block;
        margin: 0.6rem auto;
      }
      p {
        font-size: 0;
        text-align: center;
        span {
          font-size: 0.24rem;
          font-weight: 400;
          color: rgba(179, 179, 179, 1);
          line-height: 0.24rem;
        }
      }
    }
    .popup {
      position: fixed;
      top: 0.88rem;
      height: 0;
      overflow: hidden;
      background: #fff;
      transition: all 0.3s linear;
      z-index: 98;
      width: 100%;
    }
    .popup_0 {
      height: calc(100% - 0.88rem);
    }
    .popup_1 {
      z-index: 99;
    }
  }
</style>
