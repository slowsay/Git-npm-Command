<template>
  <div id="Understand">
    <div :class="{card:state==0}" @click="state=0">
      <div class="title">
        <div></div>
        <p>公司简介</p>
        <p>会社の概要</p>
        <img src="../../assets/image/gw/29.png" />
      </div>
      <div class="one">
        <img :src="img_0" />
        <p>ASAHI</p>
        <p>{{introduce}}</p>
      </div>
    </div>
    <div :class="{card:state==1}" @click="state=1">
      <div class="title">
        <div></div>
        <p>公司摘要</p>
        <p>会社概要</p>
        <img src="../../assets/image/gw/29.png" />
      </div>
      <div class="two">
        <p>{{title_0}}</p>
        <img :src="img_1" />
      </div>
    </div>
    <div :class="{card:state==2}" @click="state=2">
      <div class="title">
        <div></div>
        <p>历史新闻</p>
        <p>歴史的事件</p>
        <img src="../../assets/image/gw/29.png" />
      </div>
      <div class="three">
        <history />
      </div>
    </div>
    <div :class="{card:state==3}" @click="state=3">
      <div class="title">
        <div></div>
        <p>新闻中心</p>
        <p>ニュース</p>
        <img src="../../assets/image/gw/29.png" />
      </div>
      <div class="three">
        <news />
      </div>
    </div>
    <div :class="{card_0:state==4}" @click="state=4" >
      <div class="title">
        <div></div>
        <p>联系我们</p>
        <p>連絡します</p>
        <img src="../../assets/image/gw/29.png" />
      </div>
      <maps v-if="state==4"></maps>
    </div>
  </div>
</template>

<script>
import history from "./History";
import news from "./News";
import maps from './Map'
export default {
  components: {
    history,
    news,
    maps
  },
  data() {
    return {
      state: 0,
      // 第一部分
      img_0: require("../../assets/image/gw/15.png"),
      introduce:
        "杭州田丁科技有限公司是一家专注于中高端APP开发和网站建设的公司，同样也是一家致力于行业软件及解决方案的公司。坐落于有着“上有天堂，下有苏杭”美誉之称并且已高度化互联网的杭州，公司从创业初期只有几个人的团队发展到如今有60+的大型团队。",
      //第二部分
      img_1: require("../../assets/image/gw/15.png"),
      title_0:
        "アサヒ以「质量第一」为创业的第一步，制作出当时唯一获得符合日本工业标准JIS（Japanese Industrial Standards）要求的「アサヒ 釜 （朝日ASAHI饭锅）」，二次大战时，日本陆军使用的煮饭盒以及二次大战后的瓦斯自动煮饭器、电子锅等优质产品陆续问世。创社七十多年来，不断地努力研发，以「最高质量、最符合顾客需求」为最高指导原则，将「对饮食生活有帮助」的家庭烹饪调理器呈现给大家。"
    };
  }
};
</script>

<style lang="less" scoped>
#Understand {
  position: absolute;
  top: 0.88rem;
  bottom: 0;
  width: 100%;
  background: #fafafa;
  padding: 0.2rem 0 0.1rem;
  .title {
    width: 7.1rem;
    height: 0.8rem;
    background: rgba(26, 26, 26, 1);
    border-radius: 0.4rem;
    margin: 0 auto 0.1rem;
    display: flex;
    align-items: center;
    > div {
      width: 0.6rem;
      height: 0.6rem;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0rem 0.02rem 0.06rem 0rem rgba(0, 0, 0, 0.1);
      border-radius: 0.3rem;
      margin: 0.1rem;
    }
    p:nth-of-type(1) {
      font-size: 0.28rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-left: 0.2rem;
    }
    p:nth-of-type(2) {
      font-size: 0.18rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 0.36rem;
      opacity: 0.5;
      margin-left: auto;
    }
    img {
      width: 0.18rem;
      margin: 0 0.4rem 0 0.2rem;
    }
  }
  > div {
    overflow: hidden;
    transition: height 0.3s linear;
    height: 0.8rem;
    margin: 0 0.2rem 0.1rem;
    border-radius: 0.4rem;
    border: 0.02rem solid #fafafa;
  }
  .card {
    height: calc(100% - 3.816rem);
    background: #fff;
    border: 0.02rem solid rgba(230, 230, 230, 1);
    .title {
      background-color: #fff;
      > div {
        background: black;
      }
      p:nth-of-type(1) {
        color: #000;
      }
      img {
        display: none;
      }
    }
  }
  .one {
    padding: 0.4rem 0.3rem 0;
    img {
      float: right;
      width: 2.84rem;
      height: 6rem;
      margin-left: 0.3rem;
    }
    p:nth-of-type(1) {
      font-size: 0.8rem;
      font-weight: 300;
      color: rgba(224, 18, 32, 1);
      line-height: 0.8rem;
      margin: 0.7rem 0 0.85rem;
    }
    p:nth-of-type(2) {
      font-size: 0.24rem;
      font-family: PingFang SC;
      font-weight: 300;
      color: rgba(0, 0, 0, 1);
      line-height: 0.4rem;
    }
  }
  .two {
    padding: 0.4rem 0.3rem 0;
    p {
      font-size: 0.24rem;
      font-family: PingFang SC;
      font-weight: 300;
      color: rgba(0, 0, 0, 1);
      line-height: 0.4rem;
    }
    img {
      margin-top: 0.3rem;
      width: 100%;
      height: 3.1rem;
    }
  }
  .three {
    height: calc(100% - 0.9rem);
    overflow: auto;
  }
  .card_0 {
    height: calc(100% - 3.816rem);
    background: #fff;
    border: 0.02rem solid rgba(230, 230, 230, 1);
    position: relative;
    .title {
      background: transparent;
      position: absolute;
      top:0;
      z-index: 10;
      p:nth-of-type(2),
      img {
        display: none;
      }
    }
  }
}
</style>