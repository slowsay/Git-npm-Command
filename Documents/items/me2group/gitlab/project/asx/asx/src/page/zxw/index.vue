<template>
<div>
  <div class="index">
      
    <div class="top">
      <div class="navbar">
        <navbar></navbar>
         <div class="detail">
          了解详情&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▶
        </div>
      </div>
      <div style="height:600px">
      <el-carousel height="600px">
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
        <div style="height:50px">
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
          text:"当季主题料理专题"
      },
       {
          text:"当季主题料理专题"
      },
       {
          text:"当季主题料理专题"
      }, {
          text:"当季主题料理专题"
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
    navbar,rightNav
  }
};
</script>
<style lang="less" scoped>
.index {
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
    padding: 130px 0;
    width: 100%;
    height: 1983px;
    box-sizing: border-box;
    background-image: url("../../assets/img/zxw/bg.png");
    margin:0 auto;
    .middle{
      width: 1280px;
      margin: 0 auto;
    }
    .contain_top {
      height: 600px;
      .guo {
        height: 550px;
        width: 430px;
        border-radius: 8px;
        float: left;
    
      }
      .guo1 {
        height: 550px;
        width: 430px;
        border-radius: 8px;
        float: left;
        margin: 0 18px;
      }
      .guoBox {
        width: 383px;
        height: 550px;
        float: left;
        .guo3 {
          width: 383px;
          height: 266px;
          border-radius: 8px;
        }
        .guo4 {
          width: 383px;
          height: 266px;
          border-radius: 8px;
          margin-top: 14px;
        }
      }
    }
    .contain_middle {
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
      .img1 {
        height: 480px;
        margin-top: 40px;
        .say1 {
          float: left;
       
          width: 610px;
          height: 410px;
        }
      }
      .img2 {
        float: left;
        width: 317px;
        height: 410px;
        margin-left: 18px;
        .say2 {
          width: 317px;
          height: 196px;
        }
        .say3 {
          width: 317px;
          height: 196px;
          margin-top: 20px;
        }
      }
      .img3 {
        float: left;
        width: 317px;
        height: 410px;
        margin-left: 18px;
        .say4 {
          width: 317px;
          height: 196px;
        }
        .say5 {
          width: 317px;
          height: 196px;
          margin-top: 20px;
        }
      }
    }
  }
  .zhuti {
    height: 150px;
    .kuangBox {
      width: 300px;
      height: 130px;
      border-radius: 8px;
      background-image: url("../../assets/img/zxw/kuang.png");
      background-size: 306px 130px;
      float: left;
      margin: 10px;
       .text{
      font-size:20px;
      font-family:DFYuanW5-GB;
      font-weight:400;
      color:rgba(56,57,59,1);
      text-align: center;
      line-height: 130px;
    }
    }
   
  }

  .cp {
    width: 1274px;
    height: 200px;
    display: flex;
    .cpBox {
      width: 414px;
      height: 320px;
      background: rgba(255, 255, 255, 1);
      border: 6px solid rgba(0, 0, 0, 0.08);
      border-radius: 20px;
      box-sizing: border-box;
      margin: 8px;
      .cpimg {
        width: 400px;
        height: 310px;
      }
    }
  }
}
</style>