<template>
  <div id="Bottom">
    <div class="gray">
      <div class="top">
        <div v-for="(item,index) in one" :key="index">
          <img :src="item.src" />
          <p>{{item.p1}}</p>
          <p>{{item.p2}}</p>
        </div>
      </div>
      <img src="../../assets/img/gw/13.png" />
      <div class="bottom">
        <div class="left" v-for="(item,index) in two" :key="index">
          <p v-for="(item1,index1) in (two[index])" :key="index1">{{item1}}</p>
        </div>
        <div class="right">
          <p>{{number_0}}</p>
          <p>周一至周五 08:30~17:00</p>
          <p>(免费电话)</p>
          <p>{{'紧急服务热线：'+number_1}}</p>
          <p>
            联系我们
            <i class="el-icon-arrow-right"></i>
          </p>
        </div>
      </div>
    </div>
    <div class="black">
      <div>
        <div class="left">
          <p>
            <img :src="logo" />
            <span>{{name}}</span>
          </p>
          <p>
            環境保護
            <br />に焦点を当てる
          </p>
          <p>阿莎希专注于环保</p>
        </div>
        <div class="right">
          <p>
            Lopx*$size ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
            <br />Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.
          </p>
          <div>
            <div v-for="(item,index) in three" :key="index">
              <img :src="item.src" />
              <p>{{item.p1}}</p>
              <p>{{item.p2}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      one: [
        {
          src: require("../../assets/img/gw/10.png"),
          p1: "72小时发货",
          p2: "今日下单3天内出货不含当天，节假日"
        },
        {
          src: require("../../assets/img/gw/11.png"),
          p1: "满1000包邮",
          p2: "全场1000包邮"
        },
        {
          src: require("../../assets/img/gw/12.png"),
          p1: "电子发票",
          p2: "关爱地球，保护环境，全场使用电子发票"
        }
      ],
      two: [
        ["帮助中心", "帐户管理", "购物指南", "订单操作"],
        ["产品中心", "零秒活力锅", "全能锅", "配件", "全能锅系列", "活动专区"],
        ["明星产品", "全能平底锅", "零秒活力锅"],
        ["料理教室", "料理教室", "零秒活力锅菜谱栏", "全能平底锅菜谱栏"],
        ["锅友说", "今日推荐", "一键发帖", "与我有关"],
        ["关于我们", "公司简介", "公司摘要", "历史事件", "新闻中心", "联系我们"]
      ],
      number_0: "400-828-8385",
      number_1: "189-6256-9156",
      logo: require("../../assets/img/gw/goutou.jpg"),
      name: "中文名",
      three: [
        {
          src: require("../../assets/img/gw/goutou.jpg"),
          p1: "文本标签",
          p2: "文本标签"
        },
        {
          src: require("../../assets/img/gw/goutou.jpg"),
          p1: "文本标签",
          p2: "文本标签"
        },
        {
          src: require("../../assets/img/gw/goutou.jpg"),
          p1: "文本标签",
          p2: "文本标签"
        },
        {
          src: require("../../assets/img/gw/goutou.jpg"),
          p1: "文本标签",
          p2: "文本标签"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>$size: 0.8;
#Bottom {
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    > div {
      width: 1275px*$size;
    }
  }
  .gray {
    padding-top: 38px*$size;
    background: rgba(240, 240, 240, 1);

    > img {
      display: block;
      width: 1275px*$size;
      height: 4px*$size;
      margin-bottom: 38px*$size;
    }
  }
  .gray .top {
    display: flex;
    justify-content: space-between;
    > div {
      width: 350px*$size;
      img {
        float: left;
        height: 46px*$size;
        margin: 0 18px*$size 20px*$size 0;
      }
      p:nth-of-type(1) {
        font-size: 32px*$size;
        font-weight: 800;
        color: rgba(79, 87, 92, 1);
        line-height: 46px*$size;
      }
      p:nth-of-type(2) {
        font-size: 16px*$size;
        font-weight: bold;
        color: rgba(119, 127, 132, 1);
        line-height: 30px*$size;
        margin-bottom: 30px*$size;
      }
    }
  }
  .gray .bottom {
    display: flex;
    justify-content: space-between;
    .left {
      width: 400px*$size;
      p {
        font-size: 16px*$size;
        font-family: PingFang;
        font-weight: bold;
        color: rgba(119, 127, 132, 1);
        line-height: 40px*$size;
      }
      p:nth-of-type(1) {
        font-size: 20px*$size;
        font-family: PingFang;
        font-weight: 800;
        color: rgba(79, 87, 92, 1);
        line-height: 20px*$size;
        margin-bottom: 25px*$size;
      }
    }
    .right {
      flex-shrink: 0;
      text-align: center;
      p {
        font-size: 16px*$size;
        font-weight: bold;
        color: rgba(119, 127, 132, 1);
        line-height: 30px*$size;
      }
      p:nth-of-type(1) {
        font-size: 32px*$size;
        font-family: PingFang;
        font-weight: 800;
        color: rgba(224, 18, 32, 1);
        line-height: 32px*$size;
        margin-bottom: 20px*$size;
      }
      p:nth-of-type(4) {
        margin: 20px*$size 0;
      }
      p:nth-of-type(5) {
        width: 256px*$size;
        height: 56px*$size;
        background: rgba(255, 255, 255, 1);
        border: 1px*$size solid rgba(79, 87, 92, 1);
        border-radius: 10px*$size;
        margin-bottom: 40px*$size;
        line-height: 56px*$size;
        text-align: left;
        padding: 0 24px*$size;
        font-size: 16px*$size;
        font-family: PingFang;
        font-weight: 500;
        color: rgba(79, 87, 92, 1);
      }
      i {
        float: right;
        line-height: 56px*$size;
      }
    }
  }
  .black {
    background: rgba(79, 87, 92, 1);
    padding: 60px*$size 0 80px*$size;
    > div {
      display: flex;
      justify-content: space-between;
    }
  }
  .black .left {
    p:nth-of-type(1) {
      font-size: 24px*$size;
      font-family: PingFang;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 48px*$size;
      margin-bottom: 40px*$size;
      img {
        width: 48px*$size;
        height: 48px*$size;
        background: rgba(255, 255, 255, 1);
        border-radius: 24px*$size;
        margin-right: 20px*$size;
        vertical-align: middle;
      }
    }
    p:nth-of-type(2) {
      font-size: 24px*$size;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 32px*$size;
      margin-bottom: 20px*$size;
    }
    p:nth-of-type(3) {
      font-size: 12px*$size;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 13px*$size;
    }
  }
  .black .right {
    > p {
      font-size: 16px*$size;
      font-weight: normal;
      color: rgba(255, 255, 255, 1);
      line-height: 18px*$size;
      width: fit-content;
      margin: 0 0 90px*$size auto;
    }
    > div {
      display: flex;
      justify-content: space-between;
    }
    > div div {
      width: 200px*$size;
      img {
        width: 64px*$size;
        height: 64px*$size;
        background: rgba(255, 255, 255, 1);
        opacity: 0.3;
        border-radius: 8px*$size;
        float: left;
        margin-right: 20px*$size;
      }
      p {
        font-size: 14px*$size;
        font-family: PingFang;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 30px*$size;
      }
    }
    >div div:nth-last-child(1){
      width: 160px*$size;
    }
  }
}
</style>