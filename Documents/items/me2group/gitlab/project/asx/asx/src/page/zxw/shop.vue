<template>
  <div>
    <div class="shop">
      <div class="top">
        <div class="navbar">
          <navbar></navbar>
          <div class="detail">
          了解详情&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▶
        </div>
        </div>
        
        <!-- 轮播图 -->
        <el-carousel height="600px">
          <el-carousel-item v-for="item in img" :key="item">
            <img :src="item.img" alt />
          </el-carousel-item>
        </el-carousel>
        <!-- <div class="detail">
          了解详情
        </div> -->
      </div>

      <div class="contain">
        <div class="middle">
        <div class="contain_middle">
          <div style="height:50px">
            <div class="guoyouSay">精选套餐</div>
            <img class="sayImg" src="../../assets/img/zxw/jinxuan.png" alt />
          </div>
          <img class="line2" src="../../assets/img/zxw/line2.png" alt />
          <div class="shopContain">
            <div v-for="(item,index) in shopData" :key="index" class="shopBox"  @click="$router.push('shopDetail')">
              <img :src="item.img" alt />
              <div style="padding:14px">
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
            <img class="sayImg" src="../../assets/img/zxw/left2.png" alt />
            <img class="line2" src="../../assets/img/zxw/line2.png" alt />
            <div class="shopContain">
              <div v-for="(item,index) in shopData1" :key="index" class="shopBox"  @click="$router.push('shopDetail')">
                <img :src="item.img" alt />
                <div style="padding:14px">
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
            <img class="sayImg" src="../../assets/img/zxw/left2.png" alt />
            <img class="line2" src="../../assets/img/zxw/line2.png" alt />
          </div>
          <div class="bottomcontain">
              <div class="bottomLeft">
                <p>选择你需要的分类</p>
                  <div v-for="(item,index) in typeData" :key="index">
                    {{item.type}}
                  </div>
              </div>
              <div class="shopright">
                <div v-for="(item,index) in shopData" :key="index" class="shopBox"  @click="$router.push('shopDetail')">
                  <img :src="item.img" alt />
                  <div style="padding:14px">
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
      form: {
        img: require("../../assets/img/zxw/img.png")
      },
      typeData:[
        {type:"筷子"},
        {type:"调羹"},
        {type:"碗"},
        {type:"菜刀"},
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
  components: {
    navbar,
    rightNav
  }
};
</script>
<style lang="less" scoped>
.shop {
  margin: 0 auto;
 
  .top {
    width: 100%;
    height: 600px;
    margin:0 auto;
  }
  /deep/.el-carousel{
    z-index: 200;
    margin:-150px auto;
    position: none;
    width: 1920px;
  }
  .navbar {
    width: 1280px;
    position: relative;
    margin:40px  auto;
    z-index: 1000;
    .detail{
width:140px;
height:44px;
background:rgba(255,255,255,1);
border-radius:10px;
position: absolute;
padding: 0 20px ;
margin:320px 920px;
font-size:16px;
font-family:DFYuanW5-GB;
font-weight:400;
color:rgba(225,0,32,1);
line-height: 44px;
    }
  }
  
  .contain {
    width: 100%;
    padding: 130px 0 0 0;
    box-sizing: border-box;
    background-image: url("../../assets/img/zxw/bg.png");
    margin:0 auto;
     .middle{
    width: 1280px;
    margin: 0 auto;
  }
    .contain_top {
      height: 600px;
       margin:0 auto;
    }
    .contain_bottom{
      margin-bottom: 20px;
    }
    .shopContain {
      display: flex;
      flex-wrap: wrap;
      width: 1280px;
      margin: 0 auto;
      .shopBox {
        width: 306px;
        height: 427px;
        border: 4px solid rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        box-sizing: border-box;
        margin:9px 6px ;
        img {
          width: 298px;
          height: 298px;
        }
        .moneyBox {
          > span:nth-child(1) {
            font-size: 22px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(224, 18, 32, 1);
          }
          > span:nth-child(2) {
            font-size: 16px;
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
          font-size: 16px;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          margin: 10px 0;
        }
        .boxBottom {
          display: flex;
          font-size: 16px;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          justify-content: space-between;
        }
      }
      .imgBoxs {
        width: 1280px;
        height: 360px;
        margin: 40px 0;
        img {
          width: 1280px;
          height: 360px;
        }
      }
    }
    .bottomcontain {
    
      width: 1280px;
      margin: 20px auto 0;
    }
    .bottomLeft {
      width: 306px;
      height: 872px;
      float: left;
      margin-top:9px;
      background-color: #f5f5f5;
      p{
        font-size:22px;
        font-family:DFYuanW5-GB;
        font-weight:400;
        color:rgba(51,51,51,1);
        margin:39px 30px;
      }
      div{
        font-size:16px;
        font-family:DFYuanW5-GB;
        font-weight:400;
        color:rgba(51,51,51,1);
        padding:20px 30px;
         box-sizing: border-box;
      }
    }
    .shopright {
      display: flex;
      flex-wrap: wrap;
      margin: 0 320px;
      width: 960px;
      .shopBox {
        width: 306px;
        height: 427px;
        border: 4px solid rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        box-sizing: border-box;
        margin:9px 6px;
        img {
          width: 298px;
          height: 298px;
        }
        .moneyBox {
          > span:nth-child(1) {
            font-size: 22px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(224, 18, 32, 1);
          }
          > span:nth-child(2) {
            font-size: 16px;
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
          font-size: 16px;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          margin: 10px 0;
        }
        .boxBottom {
          display: flex;
          font-size: 16px;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          justify-content: space-between;
        }
      }
      .imgBoxs {
        width: 1280px;
        height: 360px;
        margin: 40px 0;
        img {
          width: 1280px;
          height: 360px;
        }
      }
    }
    .contain_middle {
      width: 1280px;
      .guoyouSay {
        font-size: 30px;
        font-family: DFYuanW5-GB;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        float: left;
      
      }
      .sayImg {
        float: right;
      
      }
      .line2 {
        margin: 20px auto;
      }
    }
  }
}
</style>