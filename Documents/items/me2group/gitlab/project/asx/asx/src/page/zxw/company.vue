<template>
  <div class="company">
    <div class="top">
      <navbar></navbar>
    </div>
    <div class="contain">
      <!-- 公司简介展开模块 -->
      
      <div  @click="jianjie" :class="show1==1 ? 'hinder':'box'">
        <div class="quan"></div>
        <p class="jianjie">公司简介</p>
        <p class="textBottom">会社の概要</p>
        <img class="icon" src="../../assets/img/zxw/icon.png" alt />
      </div>
      <div class="bigBox" v-show="show1==1" >
        <div class="blackQuan"></div>
        <p class="title">公司简介</p>
        <div class="boxMiddle">
          <div class="boxLeft">
            <p class="name">ASAHI</p>
            <p
              class="text"
            >杭州田丁科技有限公司是一家专注于中高端APP开发和网站建设的公司，同样也是一家致力于行业软件及解决方案的公司。坐落于有着“上有天堂，下有苏杭”美誉之称并且已高度化互联网的杭州，公司从创业初期只有几个人的团队发展到如今有60+的大型团队</p>
          </div>
          <div class="boxRight">
            <img class="img1" src="../../assets/img/zxw/company.png" alt />
            <img class="img2" src="../../assets/img/zxw/company.png" alt />
          </div>
        </div>
      </div>
      <!-- 公司摘要展开模块 -->
     
      <div  @click="company" :class="show1==2 ? 'hinder':'box'">
        <div class="quan"></div>
        <p class="jianjie">公司概要</p>
        <p class="textBottom">会社概要</p>
        <img class="icon" src="../../assets/img/zxw/icon.png" alt />
      </div>
       <div class="bigBox" v-show="show1==2">
        <div class="blackQuan"></div>
        <p class="title">公司摘要</p>
        <div class="boxMiddle">
          <div class="boxLeft1">
            <p class="name">持续传递丰富的生活</p>
            <p
              class="text"
            >以「质量第一」为创业的第一步，制作出当时唯一获得符合日本工业标准JIS（Japanese Industrial Standards）要求的「アサヒ 釜 （朝日ASAHI饭锅）」，二次大战时，日本陆军使用的煮饭盒以及二次大战后的瓦斯自动煮饭器、电子锅等优质产品陆续问世。创社七十多年来，不断地努力研发，以「最高质量、最符合顾客需求」为最高指导原则，将「对饮食生活有帮助」的家庭烹饪调理器呈现给大家+的大型团队</p>
          </div>
          <div class="boxRight1">
            <img class="img1" src="../../assets/img/zxw/company.png" alt />
          </div>
        </div>
      </div>
      <!-- 历史事件 -->
     
      <div  @click="lishi" :class="show1==3 ? 'hinder':'box'">
        <div class="quan"></div>
        <p class="jianjie">历史事件</p>
        <p class="textBottom">歴史的事件</p>
        <img class="icon" src="../../assets/img/zxw/icon.png" alt />
      </div>

       <div class="bigBox" v-show="show1==3">
        <div class="blackQuan"></div>
        <p class="title">历史事件</p>
        <div class="boxMiddle">
          <div class="boxLeft2">
            <p style="color:#E53631">2011年</p>
            <div>2月 可以达到0秒料理※的活力锅「零秒活力锅」5.5L/3.0L/2.8L开始贩卖 2月 IH电磁炉专用、多孔质铝铸调理器「Wide Oven」开始贩</div>
            <p style="margin-top:90px">2006年</p>
            <div>8月 IH电磁炉专用、多孔质铝铸调理器「Super Dinner PAN」开始贩</div>
          </div>
          <div class="boxMiddle2">
            <div class="line"></div>
            <img src="../../assets/img/zxw/quan.png" alt />
            <img src="../../assets/img/zxw/quan.png" alt />
            <img src="../../assets/img/zxw/quan.png" alt />
            <img src="../../assets/img/zxw/quan.png" alt />
          </div>
          <div class="boxRight2">
            <div>
              2月 IH电磁炉专用、多孔质铝铸调理器、手掌大小的「Double PAN」开始贩卖 2月 IH电磁炉专用、手掌大小的「零秒活力锅2.5L型」开始贩
            </div>
            <p style="margin-top:40px">2009年</p>
            <div style="margin-top:140px">
              5月 四角形平底锅「Roast PAN」开始贩
            </div>
            <p style="margin-top:130px">2005年</p>
          </div>
        </div>
      </div>
      <!-- 新闻中心 -->
      <div  @click="news" :class="show1==4 ? 'hinder':'box'">
        <div class="quan"></div>
        <p class="jianjie">新闻中心</p>
        <p class="textBottom">ニュース</p>
        <img class="icon" src="../../assets/img/zxw/icon.png" alt />
      </div>
       <div class="bigBox" v-show="show1==4">
        <div class="blackQuan"></div>
        <p class="title">新闻中心</p>
        <div class="boxMiddle1">
          <div class="boxTop">
              <div>新闻报道</div>
              <div>最新消息</div>
          </div>
          <div class="boxContain" v-for="(item,index) in data" :key="index">
            <img src="../../assets/img/zxw/news.png" alt="">
            <div class="rightBox">
            <p class="boxTitle">ASAHI零秒活力锅,压力锅,全能平底锅媒…</p>
          <div class="boxText">
            据统计，台湾人罹患癌症，有35%都是因为吃的不健康而引起，象是高油盐、大火爆香的料理方式… 
          </div>
          <p class="more">查看更多>></p>
          </div>
          <p class="date">发布日期：{{item.date}}</p>
          </div>
        </div>
      </div>
      <!-- 联系我们 -->
      <div  @click="lianxi" :class="show1==5 ? 'hinder':'box'" >
        <div class="quan"></div>
        <p class="jianjie">联系我们</p>
        <p class="textBottom">連絡します</p>
        <img class="icon" src="../../assets/img/zxw/icon.png" alt />
      </div>
      <div class="bigBox" v-show="show1==5" >

        <div class="blackQuan"></div>
        <p class="title">联系我们</p>
      </div>
    </div>
    <div class="rightIcon">
      <rightNav></rightNav>
    </div>
  </div>
</template>
<script>
import navbar from "../../components/nav";
import rightNav from "../../components/right_nav";
export default {
  data() {
    return {
      show1:1,
     data:[
       {
         date:'2019-10-30',
       },
       {
         date:'2019-10-30',
       }
     ]
    };
  },
  methods:{
    jianjie(){
      this.show1=1;
    },
    company(){
      this.show1=2;
    },
    lishi(){
      this.show1=3;
    },
    news(){
      this.show1=4;
    },
    lianxi(){
      this.show1=5;
    }


  },
  components: {
    navbar,rightNav
  }
};
</script>
<style lang="less" scoped>
.company {
  .top {
    width: 1280px;
    height: 70px;
    z-index: 1000;
    margin: 40px auto;
  }
  .contain {
    width: 1280px;
    margin:0 auto;
    display: flex;
    .hinder{
      display: none;
    }
    .bigBox {
      width: 922px;
      height: 890px;
      border-radius: 20px;
      border: 4px solid rgba(151, 151, 151, 1);
      box-sizing: border-box;
      .blackQuan {
        width: 60px;
        height: 60px;
        margin: 30px 22px 0 30px;
        background-color: #1c1c1c;
        border-radius: 30px;
        float: left;
      }
      .title {
        font-size: 30px;
        font-family: DFYuanW5;
        color: rgba(26, 26, 26, 1);
        line-height: 30px;
        margin-top: 30px;
        line-height: 60px;
      }
      .boxMiddle {
        width: 922px;
        display: flex;
        //公司简介
        .boxLeft {
          width: 350px;
          height: 500px;
          margin-left: 47px;
          .name {
            font-size: 100px;
            font-family: PingFangSC-Regular, PingFangSC;
            font-weight: 400;
            color: rgba(221, 51, 47, 1);
            line-height: 140px;
            margin-top: 40px;
          }
          .text {
            font-size: 20px;
            font-family: PingFangSC-Regular, PingFangSC;
            font-weight: 400;
            color: rgba(74, 74, 74, 1);
            line-height: 30px;
            letter-spacing: 2px;
            margin-top: 40px;
          }
        }
        .boxRight {
          float: right;
          width: 472px;
          .img1 {
            width: 270px;
            height: 466px;
            float: left;
          }
          .img2 {
            width: 270px;
            height: 466px;
            position: absolute;
            margin: 213px 0 0 -68px;
          }
        }
        //公司摘要
        .boxLeft1 {
          width: 394px;
          height: 700px;
          margin: 0 18px 0 47px;
          .name {
            font-size: 30px;
            font-family: DFYuanW5;
            color: rgba(26, 26, 26, 1);
            line-height: 30px;
            margin-top: 80px;
          }
          .text {
            font-size: 20px;
            font-family: DFYuanW5;
            color: rgba(74, 74, 74, 1);
            line-height: 30px;
            letter-spacing: 2px;
            margin-top: 30px;
          }
        }
        .boxRight1 {
          .img1 {
            width: 400px;
            height: 456px;
            margin-top: 80px;
          }
        }
        //历史事件
        .boxLeft2 {
          width: 400px;
          p {
            font-size: 60px;
            font-family: PingFangSC-Regular, PingFangSC;
            font-weight: 400;
            color: #1b1b1b;
            line-height: 84px;
            text-align: right;
          }
          div {
            width: 350px;
            margin-left: 58px;
            padding: 19px 20px 11px 20px;
            box-sizing: border-box;
            font-size: 20px;
            font-family: PingFangSC-Regular, PingFangSC;
            font-weight: 400;
            color: rgba(74, 74, 74, 1);
            line-height: 30px;
            letter-spacing: 2p;
            border:1px solid #ccc;
            margin-top:120px;
          }
        }
        .boxMiddle2 {
          width: 96px;
          .line {
            border-right: 3px solid #e53631;
            height: 670px;
            position: absolute;
            margin: 47px;
          }
          img {
            border-radius: 48px;
            width: 96px;
            margin-bottom: 122px;
          }
        }
        .boxRight2{
           p {
            font-size: 60px;
            font-family: PingFangSC-Regular, PingFangSC;
            font-weight: 400;
            color: #1b1b1b;
            line-height: 84px;
            text-align: left;
          }
          div {
            width: 350px;
            padding: 19px 20px 11px 20px;
            box-sizing: border-box;
            font-size: 20px;
            font-family: PingFangSC-Regular, PingFangSC;
            font-weight: 400;
            color: rgba(74, 74, 74, 1);
            line-height: 30px;
            letter-spacing: 2p;
            border:1px solid #ccc;
          }
          
        }
        
      }
      .boxMiddle1{
        width: 922px;
        .boxTop{
          margin-top:57px;
          width: 922px;
          display: flex;
          text-align: center;
          font-size:30px;
          font-family:DFYuanW5;
          color:rgba(26,26,26,1);
          line-height:30px;
        div{
          flex:1;
        }
        }
        .boxContain{
          box-shadow:0px 4px 12px 0px rgba(204,204,204,0.5);
          border-radius:10px;
          margin:30px 30px 0 30px;
          width: 862px;
          height: 278px;
          padding:30px 10px 30px 10px;
          box-sizing: border-box;
          img{
            height: 180px;
            width: 360px;
            float: left;
            margin-right: 10px;
            display: block;
          }
          .rightBox{
            width: 464px;
            height: 180px;
            float: right;
          }
          .boxTitle{
            font-size:24px;
            font-family:DFYuanW5;
            color:rgba(28,28,28,1);
            line-height:24px;

          }
          .boxText{
            font-size:20px;
            font-family:DFYuanW5;
            color:rgba(155,155,155,1);
            line-height:30px;
            margin-top:20px;
          }
          .more{
            font-size:18px;
          font-family:DFYuanW5;
          color:rgba(155,155,155,1);
            margin-top:50px;
          }
        }
        .date{
          font-size:18px;
font-family:DFYuanW5;
color:rgba(155,155,155,1);
line-height:50px;

        }
      }
    }
    .box {
      display: block;
      width: 80px;
      height: 890px;
      background-color: #1c1c1c;
      border-radius: 40px;
      margin-left: 6px;
      .quan {
        height: 60px;
        width: 60px;
        background-color: #fff;
        border-radius: 30px;
        margin: 10px;
      }
      .jianjie {
        font-size: 24px;
        font-family: DFYuanW5;
        color: rgba(255, 255, 255, 1);
        line-height: 29px;
        letter-spacing: 6px;
        width: 24px;
        margin-left: 28px;
        margin-top: 25px;
      }
      .textBottom {
        font-size: 18px;
        font-family: STHeitiTC-Medium, STHeitiTC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 18px;
        letter-spacing: 4px;
        width: 18px;
        text-align: center;
        margin-left: 31px;
        margin-top: 500px;
      }
      .icon {
        width: 18px;
        height: 18px;
        margin: 18px 31px;
      }
    }
  }
}
</style>
