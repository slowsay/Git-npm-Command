<template>
  <!-- 他的信息 -->
  <div class="myTie">
    <div class="top">
      <navbar></navbar>
    </div>
    <div class="contain">
      <div class="user">
        <div class="userImg">
          <img class="userimg" :src="form.userImg" alt />
        </div>
        <div>
          <p class="userName">
            {{form.userName}}
            <img style="margin: 0 .1rem;" :src="form.dengjiImg" />
            <img :src="form.vipImg" alt />
          </p>
          <p class="dengji">
            <span>等级 {{form.dengji}}</span>
            <span>粉丝 {{form.fans}}</span>
            <span>关注 {{form.guanzhu}}</span>
          </p>
          <p class="jianjie">简介：{{form.jianjie}}</p>
        </div>
        <div class="gzBtn">
          <div class="gz" v-if="state==1" @click="state=2">关注</div>
          <div class="qxgz" v-if="state==2" @click="state=1">取消关注</div>
          <div class="xiaoxi"><img src="../../assets/image/zxw/xinxi.png" alt=""></div>
        </div>
      </div>
      <div class="kuai"></div>
    </div>
    <div class="bottom">
      <van-tabs v-model="active">
        <van-tab :title="form.title1">
          <div class="box">
            <div
              v-for="(item,index) in form.box"
              :key="index"
              class="imgBox"
              @touchstart="gotouchstart(index)"
              @touchmove="gotouchmove"
              @touchend="gotouchend"
            >
              <div :class="changered==index ?'red':'pop' ">
                <div class="delBtn">
                  <div class="del">
                    <img class="delImg" src="../../assets/image/zxw/del.png" alt />&nbsp;删除
                  </div>
                </div>
              </div>
              <img class="bgImg" :src="item.boxImg" alt />

              <div class="boxBottom">
                <p class="boxName">{{item.name}}</p>
                <p class="boxChakan">
                  <span>
                    <img style="width:.18rem" src="../../assets/image/zxw/chakan.png" alt />
                    <span>{{item.chakanNum}}</span>
                  </span>
                  <span>
                    <img style="width:.16rem" src="../../assets/image/zxw/star.png" alt />
                    <span>{{item.starNum}}</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab :title="form.title2">
          <div class="box">
            <div
              v-for="(item,index) in form.box"
              :key="index"
              class="imgBox"
              @touchstart="gotouchstart(index)"
              @touchmove="gotouchmove"
              @touchend="gotouchend"
            >
              <div :class="changered==index ?'red':'pop' ">
                <div class="delBtn">
                  <div class="del">
                    <img class="delImg" src="../../assets/image/zxw/del.png" alt />&nbsp;删除
                  </div>
                </div>
              </div>
              <img class="bgImg" :src="item.boxImg" alt />

              <div class="boxBottom">
                <p class="boxName">{{item.name}}</p>
                <p class="boxChakan">
                  <span>
                    <img style="width:.18rem" src="../../assets/image/zxw/chakan.png" alt />
                    <span>{{item.chakanNum}}</span>
                  </span>
                  <span>
                    <img style="width:.16rem" src="../../assets/image/zxw/star.png" alt />
                    <span>{{item.starNum}}</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
          </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>

export default {
  
  data() {
    return {
      state:1,
      timeOutEvent: 0,
      changered:-1,
      active: 0,
      form: {
        userImg: require("../../assets/image/zxw/shop.png"),
        dengjiImg: require("../../assets/image/zxw/nv.png"),
        vipImg: require("../../assets/image/zxw/vipimg.png"),
        userName: "用户昵称",
        dengji: "12",
        fans: "22万",
        guanzhu: "321",
        jianjie: "猫和你都留下～",
        title1: "发帖",
        title2: "收藏",
        title1Number: "222",
        title2Number: "222",
        box: [
          {
            boxImg: require("../../assets/image/zxw/shop.png"),
            name: "一口好锅的作用",
            chakanNum: 222,
            starNum: 222
          },
          {
            boxImg: require("../../assets/image/zxw/shop.png"),
            name: "一口好锅的作环境可很快就会用",
            chakanNum: 222,
            starNum: 222
          },
          {
            boxImg: require("../../assets/image/zxw/shop.png"),
            name: "一口好锅的作用",
            chakanNum: 222,
            starNum: 222
          },
          {
            boxImg: require("../../assets/image/zxw/shop.png"),
            name: "一口好锅的作用",
            chakanNum: 222,
            starNum: 222
          },
            {
            boxImg: require("../../assets/image/zxw/shop.png"),
            name: "一口好锅的作用",
            chakanNum: 222,
            starNum: 222
          },
            {
            boxImg: require("../../assets/image/zxw/shop.png"),
            name: "一口好锅的作用",
            chakanNum: 222,
            starNum: 222
          },
            {
            boxImg: require("../../assets/image/zxw/shop.png"),
            name: "一口好锅的作用",
            chakanNum: 222,
            starNum: 222
          },
            {
            boxImg: require("../../assets/image/zxw/shop.png"),
            name: "一口好锅的作用",
            chakanNum: 222,
            starNum: 222
          }
        ]
      }
    };
  },
  mounted() {
    this.title();
  },
  methods: {
    title() {
      this.form.title1 = this.form.title1 + "(" + this.form.title1Number + ")";
      this.form.title2 = this.form.title2 + "(" + this.form.title2Number + ")";
    },
    gotouchstart(index) {
      clearTimeout(this.timeOutEvent);
      this.timeOutEvent = 0;
      this.timeOutEvent = setInterval(() => {
        this.changered = index;
      }, 500);
      console.log(this.timeOutEvent);
    },
    //手释放，如果在500毫秒内释放，则取消长按事件，此时可以执行onclick应该执行的事件
    gotouchend() {
      clearTimeout(this.timeOutEvent);
      console.log(this.timeOutEvent);
      if (this.timeOutEvent != 0) {
        //跳转到详情页
        console.log(1);
      }
      return false;
    },
    //如果手指有移动，则取消所有事件，此使说明用户只是要移动而不是长按
    gotouchmove() {
      clearTimeout(this.timeOutEvent); //消除定时器
      this.timeOutEvent = 0;
      console.log(3);
    }
  }
};
</script>
<style lang="less" scoped>
.contain {
  .user {
    height: 2rem;
    padding: .2rem .3rem 0 .3rem;
    display: flex;
  }
  .userImg {
    width: 1.2rem;
    height: 1.2rem;
    margin-right: 0.2rem;
    .userimg {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
  .userName {
    font-size: 0.36rem;
    height: 0.36rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    display: flex;
    align-items: center;
  
    img {
      height: 0.36rem;
    }
  }
  .gzBtn{
    
    margin-left: auto;
    .gz{
      height: .36rem;
      line-height: .36rem;
      padding:0 .16rem;
      text-align: center;
      background-color:#E01220;
      border:.01rem solid #fff ;
      border-radius: .18rem;
      font-size: .18rem;
      color:#fff;
    }
    .qxgz{
      height: .36rem;
      line-height: .36rem;
      padding:0 .16rem;
      text-align: center;
      background-color:#fff;
      border:.01rem solid #E01220 ;
      border-radius: .18rem;
      font-size: .18rem;
      color:#E01220;
    }
    .xiaoxi{
      float: right;
      width: .6rem;
      height: .6rem;
      display: flex;
      background-color: #E01220;
      text-align: center;
      align-items: center;
      border-radius: .3rem;
      margin-top:.24rem;
      img{
        width: .32rem;
        margin-left: .14rem;
      }
    }
  }
  .dengji {
    font-size: 0.24rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 0.36rem;
    margin-top: 0.06rem;
    span {
      margin-right: 0.4rem;
    }
  }
}
.jianjie {
  font-size: 0.24rem;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 0.36rem;
  margin-top: 0.06rem;
}
.kuai {
  width: 7.5rem;
  height: 0.1rem;
  background-color: #fafafa;
}
//切换条样式
/deep/.van-tabs {
  .van-tabs__wrap {
    margin-right: 4rem;
  }
  .van-tabs__line {
    background: rgba(224, 18, 32, 0.2);
    height: 0.14rem;
    bottom: 0.5rem;
  }
  .van-tab {
    font-size: 0.26rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 0.88rem;
  }
  .van-tab--active {
    font-size: 0.3rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
  }
}
.bottom {
  .box {
    width: 7.5rem;
    padding-left: 0.3rem;
    box-sizing: border-box;
  }
  .imgBox {
    width: 2.18rem;
    height: 3rem;
    margin-right: 0.18rem;
    margin-bottom: 0.2rem;
    position: relative;
    float: left;
    .bgImg {
      width: 2.18rem;
      height: 3rem;
      position: absolute;
    }
  }
  .boxName {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 0.24rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 0.3rem;
  }
  .boxBottom {
    height: 0.64rem;
    width: 2.18rem;
    padding: 0 0.14rem;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
  }
  .boxChakan {
    font-size: 0.18rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 0.4rem;
  }
}

.del {
  position: absolute;
  font-size: 0.24rem;
  color: #fff;
  background: rgba(224, 18, 32, 1);
  border-radius: 0.24rem;
  display: flex;
  align-items: center;
  padding: 0.1rem 0.2rem;
  margin: 1.2rem 0.46rem;
}
.delImg {
  width: 0.28rem;
}
.pop {
  width: 2.18rem;
  height: 3rem;
  position: absolute;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.2);
  display: none;
}
.red{
   width: 2.18rem;
  height: 3rem;
  position: absolute;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.2);
  display: block;
}
</style>