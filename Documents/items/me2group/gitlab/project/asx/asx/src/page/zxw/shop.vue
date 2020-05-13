<template>
  <div>
    <div class="shop">
      <div class="top">
        <div class="navbar">
          <navbar></navbar>
          <div
            class="detail"
            @click="$router.push('/shopDetail')"
          >了解详情&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▶</div>
        </div>

        <!-- 轮播图 -->
        <el-carousel height="480px">
          <el-carousel-item v-for="(item,index) in img" :key="index">
            <img :src="item.img" alt />
          </el-carousel-item>
        </el-carousel>
        <!-- <div class="detail">
          了解详情
        </div>-->
      </div>

      <div class="contain">
        <div class="middle">
          <div class="contain_middle">
            <div style="height:40px">
              <div class="guoyouSay">精选套餐</div>
              <img class="sayImg" src="../../assets/img/zxw/shangcheng.png" alt />
            </div>
            <img class="line2" src="../../assets/img/zxw/line2.png" alt />
            <div class="shopContain">
              <div
                v-for="(item,index) in shopData"
                :key="index"
                @click="$router.push('shopDetail')"
                :class="(index+1)%4!=0?'shopBox':'shopBox1'"
              >
                <img :src="item.img" alt />
                <div style="padding:12px">
                  <p class="moneyBox">
                    <span>￥{{item.money}}</span>
                    <span>￥{{item.moneyDel}}</span>
                  </p>
                  <p class="title">{{item.title}}</p>
                  <div class="boxBottom">
                    <span>销量：{{item.number}}</span>
                    <span>收藏：{{item.save}}</span>
                  </div>
                </div>
              </div>
              <div class="imgBoxs">
                <img :src="form.img" alt />
              </div>
            </div>
            <div class="contain_bottom">
              <div class="guoyouSay">明星单品</div>
              <img class="sayImg1" src="../../assets/img/zxw/you1.png" alt />
              <img class="sayImg1" src="../../assets/img/zxw/zuo.png" alt />

              <img class="line2" src="../../assets/img/zxw/line2.png" alt />
              <div class="shopContain">
                <div
                  v-for="(item,index) in shopData1"
                  :key="index"
                  class="shopBox"
                  @click="$router.push('shopDetail')"
                   :class="(index+1)%4!=0?'shopBox':'shopBox1'"
                >
                  <img :src="item.img" alt />
                  <div style="padding:12px">
                    <p class="moneyBox">
                      <span>￥{{item.money}}</span>
                      <span>￥{{item.moneyDel}}</span>
                    </p>
                    <p class="title">{{item.title}}</p>
                    <div class="boxBottom">
                      <span>销量：{{item.number}}</span>
                      <span>收藏：{{item.save}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 配件专栏部分 -->
            <div class="bottomBox">
              <div class="guoyouSay">配件专栏</div>
              <img class="sayImg" src="../../assets/img/zxw/shangcheng.png" alt />
              <img class="line2" src="../../assets/img/zxw/line2.png" alt />
            </div>
            <div class="bottomcontain">
              <div class="bottomLeft">
                <p>选择你需要的分类</p>
                <div v-for="(item,index) in typeData" :key="index" @click="reds(index)" :class="{red:changeRed == index}" >{{item.type}}
                  <img class="sanjiao" :class="{red:changeRed == index}" src="../../assets/img/zxw/sanjiao.png" alt="">
                </div>
                
              </div>
              <div class="shopright">
                <div
                  v-for="(item,i) in shopData2"
                  :key="i"
                  class="shopBox"
                  @click="$router.push('shopDetail')"
                   :class="{shopBox1:(i+1)%3==0}"
                >
                  <img :src="item.img" alt />
                  <div style="padding:12px">
                    <p class="moneyBox">
                      <span>￥{{item.money}}</span>
                      <span>￥{{item.moneyDel}}</span>
                    </p>
                    <p class="title">{{item.title}}</p>
                    <div class="boxBottom">
                      <span>销量：{{item.number}}</span>
                      <span>收藏：{{item.save}}</span>
                    </div>
                  </div>
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
      changeRed:0,
      form: {
        img: require("../../assets/img/zxw/img.png")
      },
      typeData: [
        { type: "筷子" },
        { type: "调羹" },
        { type: "碗" },
        { type: "菜刀" }
      ],
      shopData1: [
        {
          img: require("../../assets/img/zxw/shopimg.png"),
          money: 1888.88,
          moneyDel: 2888.88,
          title: "不透明蒸锅客户打款警方很快黄金卡还是短发",
          number: "271",
          save: "542"
        },
        {
          img: require("../../assets/img/zxw/shopimg.png"),
          money: 1888.88,
          moneyDel: 2888.88,
          title: "不透明蒸锅客户打款警方很快黄金卡还是短发",
          number: "271",
          save: "542"
        },
        {
          img: require("../../assets/img/zxw/shopimg.png"),
          money: 1888.88,
          moneyDel: 2888.88,
          title: "不透明蒸锅客户打款警方很快黄金卡还是短发",
          number: "271",
          save: "542"
        },
        {
          img: require("../../assets/img/zxw/shopimg.png"),
          money: 1888.88,
          moneyDel: 2888.88,
          title: "不透明蒸锅客户打款警方很快黄金卡还是短发",
          number: "271",
          save: "542"
        }
      ],
       shopData2: [
        {
          img: require("../../assets/img/zxw/shopimg.png"),
          money: 1888.88,
          moneyDel: 2888.88,
          title: "不透明蒸锅客户打款警方很快黄金卡还是短发",
          number: "271",
          save: "542"
        },
        {
          img: require("../../assets/img/zxw/shopimg.png"),
          money: 1888.88,
          moneyDel: 2888.88,
          title: "不透明蒸锅客户打款警方很快黄金卡还是短发",
          number: "271",
          save: "542"
        },
        {
          img: require("../../assets/img/zxw/shopimg.png"),
          money: 1888.88,
          moneyDel: 2888.88,
          title: "不透明蒸锅客户打款警方很快黄金卡还是短发",
          number: "271",
          save: "542"
        },
        {
          img: require("../../assets/img/zxw/shopimg.png"),
          money: 1888.88,
          moneyDel: 2888.88,
          title: "不透明蒸锅客户打款警方很快黄金卡还是短发",
          number: "271",
          save: "542"
        }
      ],
      shopData: [
        {
          img: require("../../assets/img/zxw/shopimg.png"),
          money: 1888.88,
          moneyDel: 2888.88,
          title: "不透明蒸锅客户打款警方很快黄金卡还是短发",
          number: "271",
          save: "542"
        },
        {
          img: require("../../assets/img/zxw/shopimg.png"),
          money: 1888.88,
          moneyDel: 2888.88,
          title: "不透明蒸锅客户打款警方很快黄金卡还是短发",
          number: "271",
          save: "542"
        },
        {
          img: require("../../assets/img/zxw/shopimg.png"),
          money: 1888.88,
          moneyDel: 2888.88,
          title: "不透明蒸锅客户打款警方很快黄金卡还是短发",
          number: "271",
          save: "542"
        },
        {
          img: require("../../assets/img/zxw/shopimg.png"),
          money: 1888.88,
          moneyDel: 2888.88,
          title: "不透明蒸锅客户打款警方很快黄金卡还是短发",
          number: "271",
          save: "542"
        },
        {
          img: require("../../assets/img/zxw/shopimg.png"),
          money: 1888.88,
          moneyDel: 2888.88,
          title: "不透明蒸锅客户打款警方很快黄金卡还是短发",
          number: "271",
          save: "542"
        },
        {
          img: require("../../assets/img/zxw/shopimg.png"),
          money: 1888.88,
          moneyDel: 2888.88,
          title: "不透明蒸锅客户打款警方很快黄金卡还是短发",
          number: "271",
          save: "542"
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
  methods:{
    reds(index){
      this.changeRed = index;
      console.log(this.changeRed);
    }
  },
  components: {
    navbar,
    rightNav
  }
};
</script>
<style lang="scss" scoped>
$size: 0.8;
.shop {
  margin: 0 auto;

  .top {
    width: 100%;
    height: 560px * $size;
    margin: 0 auto;
  }
  .el-carousel {
    z-index: 1;
    margin: -150px * $size auto;
    position: none;
    width: 1920px * $size;
  }
  .navbar {
    width: 1280px * $size;
    position: relative;
    margin: 40px * $size auto;
    z-index: 2;
    .detail {
      width: 140px * $size;
      height: 44px * $size;
      background: rgba(255, 255, 255, 1);
      border-radius: 10px * $size;
      position: absolute;
      padding: 0 20px * $size;
      margin: 400px * $size 1200px * $size;
      font-size: 16px * $size;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(225, 0, 32, 1);
      line-height: 44px * $size;
    }
  }

  .contain {
    width: 1920px * $size;
    padding: 130px * $size 0 120px 0;
    box-sizing: border-box;
    background-image: url("../../assets/img/zxw/bg.png");
    background-size: contain;
    margin: 0 auto;
    .middle {
      width: 1280px * $size;
      margin: 0 auto;
    }
    .contain_top {
      height: 600px * $size;
      margin: 0 auto;
    }
    .contain_bottom {
      margin-bottom: 20px * $size;
      margin-top:32px;
      overflow: auto;
    }
    .shopContain {
      // display: flex;
      // flex-wrap: wrap;
      width: 1280px * $size;
      margin: 0 auto;
      .shopBox {
        width: 306px * $size;
        height: 427px * $size;
        border: 4px * $size solid rgba(0, 0, 0, 0.08);
        border-radius: 6px * $size;
        box-sizing: border-box;
        margin: 9px * $size 0;
        margin-right: 18px * $size;
        float: left;
        img {
          width: 298px * $size;
          height: 298px * $size;
        }
          .moneyBox {
          > span:nth-child(1) {
            font-size: 22px * $size;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(224, 18, 32, 1);
          }
          > span:nth-child(2) {
            font-size: 16px * $size;
            font-family: PingFang SC;
            font-weight: 400;
            text-decoration: line-through;
            color: rgba(102, 102, 102, 1);
          }}
           .title {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 16px * $size;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          margin: 10px * $size 0;
        }
        .boxBottom {
          display: flex;
          font-size: 16px * $size;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          justify-content: space-between;
        }
      }
      .shopBox1 {
        width: 306px * $size;
        height: 427px * $size;
        border: 4px * $size solid rgba(0, 0, 0, 0.08);
        border-radius: 6px * $size;
        box-sizing: border-box;
        margin: 9px * $size 0;
        float: right;
        // background-color: #ccc;
        img {
          width: 298px * $size;
          height: 298px * $size;
        }
        .moneyBox {
          > span:nth-child(1) {
            font-size: 22px * $size;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(224, 18, 32, 1);
          }
          > span:nth-child(2) {
            font-size: 16px * $size;
            font-family: PingFang SC;
            font-weight: 400;
            text-decoration: line-through;
            color: rgba(102, 102, 102, 1);
          }
        }
        .title {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 16px * $size;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          margin: 10px * $size 0;
        }
        .boxBottom {
          display: flex;
          font-size: 16px * $size;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          justify-content: space-between;
        }
      }
      .imgBoxs {
        width: 1280px * $size;
        // height: 360px * $size;
        // margin: 40px * $size 0;
        img {
          width: 1280px * $size;
          height: 360px * $size;
          margin-top: 20px;
        }
      }
    }
    .bottomcontain {
      width: 1280px * $size;
      margin: 0 auto 0;
    }
    .bottomLeft {
      width: 306px * $size;
      height: 872px * $size;
      float: left;
      // margin-top: 9px * $size;
      background-color: #f5f5f5;
      p {
        font-size: 22px * $size;
        font-family: DFYuanW5-GB;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin: 39px * $size 30px * $size;
      }
      div {
        font-size: 16px * $size;
        font-family: DFYuanW5-GB;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        padding: 20px * $size 30px * $size;
        box-sizing: border-box;
      }
    }
    .shopright {
      // display: flex;
      // flex-wrap: wrap;
      margin: 0 320px * $size;
      width: 960px * $size;
      overflow: auto;
     
      .shopBox {
        width: 306px * $size;
        height: 427px * $size;
        border: 4px * $size solid rgba(0, 0, 0, 0.08);
        border-radius: 6px * $size;
        box-sizing: border-box;
        margin: 9px * $size 0;
        margin-right:16px;
        float: left;
        img {
          width: 298px * $size;
          height: 298px * $size;
        }
        .moneyBox {
          > span:nth-child(1) {
            font-size: 22px * $size;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(224, 18, 32, 1);
          }
          > span:nth-child(2) {
            font-size: 16px * $size;
            font-family: PingFang SC;
            font-weight: 400;
            text-decoration: line-through;
            color: rgba(102, 102, 102, 1);
          }
        }
        .title {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 16px * $size;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          margin: 10px * $size 0;
        }
        .boxBottom {
          display: flex;
          font-size: 16px * $size;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          justify-content: space-between;
        }
      }
       .shopBox1{
        margin-right: 0;
      }
      .imgBoxs {
        width: 1280px * $size;
        height: 360px * $size;
        // margin: 40px * $size 0;
        img {
          width: 1280px * $size;
          height: 360px * $size;
        }
      }
    }
    .contain_middle {
      width: 1280px * $size;
      .guoyouSay {
        font-size: 30px * $size;
        font-family: DFYuanW5-GB;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        float: left;
      }
      .sayImg {
        float: right;
        width: 176px * $size;
        height: 28px * $size;
        margin-top: 10px;
      }
      .sayImg1 {
        float: right;
        margin-left: 10px;
        height: 28px * $size;
        width: 28px * $size;
      }
      .line2 {
        margin: 20px * $size auto;
        width: 1280px * $size;
      }
    }
  }
}
.bottomBox{
  margin-top:16px;
}

.sanjiao{
  float: right;
  width: 8px;
  height: 10px;
  margin-top:3px;
  display: none;
}
.red{
  color:red !important;
  display: block;
}
</style>