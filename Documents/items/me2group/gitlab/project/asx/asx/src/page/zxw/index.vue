<template>
  <div>
    <div class="index">
      <div class="top">
        <div class="navbar">
          <navbar></navbar>
          <div
            class="detail"
            @click="$router.push('/shopDetail')"
          >了解详情&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▶</div>
        </div>
        <div style="height:480px">
          <el-carousel height="480px">
            <el-carousel-item v-for="item in img" :key="item">
              <img :src="item.img" alt />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="contain">
        <div class="middle">
          <div class="contain_top">
            <img class="guo" src="../../assets/img/zxw/guo.png" alt />
            <img class="guo1" src="../../assets/img/zxw/guo.png" alt />
            <div class="guoBox">
              <img class="guo3" src="../../assets/img/zxw/guo.png" alt />
              <img class="guo4" src="../../assets/img/zxw/guo.png" alt />
            </div>
          </div>
          <div class="contain_middle">
            <div style="height:40px">
              <div class="guoyouSay">锅友有话说</div>
              <img class="sayImg" src="../../assets/img/zxw/left.png" alt />
            </div>
            <img class="line2" src="../../assets/img/zxw/line2.png" alt />

            <div class="img1">
              <img class="say1" src="../../assets/img/zxw/guo.png" alt />
              <div class="img2">
                <img class="say2" src="../../assets/img/zxw/guo.png" alt />
                <img class="say3" src="../../assets/img/zxw/guo.png" alt />
              </div>
              <div class="img3">
                <img class="say4" src="../../assets/img/zxw/guo.png" alt />
                <img class="say5" src="../../assets/img/zxw/guo.png" alt />
              </div>
            </div>
            <div class="zhuti">
              <div v-for="(item,index) in zhutiData" :key="index" class="kuangBox">
                <div class="text">{{item.text}}</div>
              </div>
            </div>
            <div class="contain_bottom">
              <div class="guoyouSay">产品系列</div>
              <img class="sayImg" src="../../assets/img/zxw/left2.png" alt />
              <img class="line2" src="../../assets/img/zxw/line2.png" alt />
              <div class="cp">
                <div v-for="(item,index) in data" :key="index" class="cpBox">
                  <img class="cpimg" :src="item.img" alt />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <rightNav></rightNav>
    </div>
    <Bottom></Bottom>
  </div>
</template>
<script>
import navbar from "../../components/nav";
import rightNav from "../../components/right_nav";
export default {
  data() {
    return {
      data: [
        {
          img: require("../../assets/img/zxw/bao.png")
        },
        {
          img: require("../../assets/img/zxw/bao1.png")
        },
        {
          img: require("../../assets/img/zxw/bao2.png")
        }
      ],
      zhutiData: [
        {
          text: "当季主题料理专题"
        },
        {
          text: "当季主题料理专题"
        },
        {
          text: "当季主题料理专题"
        },
        {
          text: "当季主题料理专题"
        }
      ],
      img: [
        {
          img: require("../../assets/img/zxw/banner1.jpg")
        },
        {
          img: require("../../assets/img/zxw/banner1.jpg")
        },
        {
          img: require("../../assets/img/zxw/banner1.jpg")
        },
        {
          img: require("../../assets/img/zxw/banner1.jpg")
        }
      ]
    };
  },
  components: {
    navbar,
    rightNav
  }
};
</script>
<style lang="scss" scoped>$size: 0.8;
.index {
  .top {
    width: 100%;
    height: 560px*$size;
    margin: 0 auto;
  }
 .el-carousel {
    z-index: 200;
    margin: -150px*$size auto;
    position: none;
    width: 1920px*$size;
  }
  .navbar {
    width: 1280px*$size;
    position: relative;
    margin: 40px*$size auto;
    z-index: 1000;
    .detail {
      width: 140px*$size;
      height: 44px*$size;
      background: rgba(255, 255, 255, 1);
      border-radius: 10px*$size;
      position: absolute;
      padding: 0 20px*$size;
      margin: 400px*$size 1200px*$size;
      font-size: 16px*$size;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(225, 0, 32, 1);
      line-height: 44px*$size;
    }
  }
  .contain {
    padding: 130px*$size 0;
    width: 1920px*$size;
    height: 1983px*$size;
    box-sizing: border-box;
    background-image: url("../../assets/img/zxw/bg.png");
    margin: 0 auto;
    .middle {
      width: 1280px*$size;
      margin: 0 auto;
    }
    .contain_top {
      height: 600px*$size;
      .guo {
        height: 550px*$size;
        width: 430px*$size;
        border-radius: 8px*$size;
        float: left;
      }
      .guo1 {
        height: 550px*$size;
        width: 430px*$size;
        border-radius: 8px*$size;
        float: left;
        margin: 0 18px*$size;
      }
      .guoBox {
        width: 383px*$size;
        height: 550px*$size;
        float: left;
        .guo3 {
          width: 383px*$size;
          height: 266px*$size;
          border-radius: 8px*$size;
        }
        .guo4 {
          width: 383px*$size;
          height: 266px*$size;
          border-radius: 8px*$size;
          margin-top: 14px*$size;
        }
      }
    }
    .contain_middle {
      .guoyouSay {
        font-size: 30px*$size;
        font-family: DFYuanW5-GB;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        float: left;
      }
      .sayImg {
        float: right;
      }
      .line2 {
        margin: 20px*$size auto;
        width: 1280px * $size;
      }
      .img1 {
        height: 480px*$size;
        margin-top: 40px*$size;
        .say1 {
          float: left;

          width: 610px*$size;
          height: 410px*$size;
        }
      }
      .img2 {
        float: left;
        width: 317px*$size;
        height: 410px*$size;
        margin-left: 18px*$size;
        .say2 {
          width: 317px*$size;
          height: 196px*$size;
        }
        .say3 {
          width: 317px*$size;
          height: 196px*$size;
          margin-top: 20px*$size;
        }
      }
      .img3 {
        float: left;
        width: 317px*$size;
        height: 410px*$size;
        margin-left: 18px*$size;
        .say4 {
          width: 317px*$size;
          height: 196px*$size;
        }
        .say5 {
          width: 317px*$size;
          height: 196px*$size;
          margin-top: 20px*$size;
        }
      }
    }
  }
  .zhuti {
    height: 150px*$size;
    .kuangBox {
      width: 300px*$size;
      height: 130px*$size;
      border-radius: 8px*$size;
      background-image: url("../../assets/img/zxw/kuang.png");
      background-size: 306px*$size 130px*$size;
      float: left;
      margin: 10px*$size;
      .text {
        font-size: 20px*$size;
        font-family: DFYuanW5-GB;
        font-weight: 400;
        color: rgba(56, 57, 59, 1);
        text-align: center;
        line-height: 130px*$size;
      }
    }
  }

  .cp {
    width: 1274px*$size;
    height: 200px*$size;
    display: flex;
    .cpBox {
      width: 414px*$size;
      height: 320px*$size;
      background: rgba(255, 255, 255, 1);
      border: 6px*$size solid rgba(0, 0, 0, 0.08);
      border-radius: 20px*$size;
      box-sizing: border-box;
      margin: 8px*$size;
      .cpimg {
        width: 400px*$size;
        height: 310px*$size;
      }
    }
  }
}
.contain_bottom{
  margin-top:30px*$size;
}
</style>