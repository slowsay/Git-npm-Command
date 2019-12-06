<template>
  <div>
    <van-tabs v-model="active" swipeable>
      <van-tab title="媒体报道">
        <div class="card" v-for="(value,key) in data_0" :key="key">
          <img :src="value.src" />
          <p>{{value.title}}</p>
          <p>{{'发布时间：'+value.time}}</p>
          <p>{{value.body.slice(0,45)+'...'}}</p>
          <p>查看更多</p>
        </div>
      </van-tab>
      <van-tab title="最新消息">
        <div class="card" v-for="(value,key) in data_1" :key="key">
          <img :src="value.src" />
          <p>{{value.title}}</p>
          <p>{{'发布时间：'+value.time}}</p>
          <p>{{value.body.slice(0,45)+'...'}}</p>
          <p>查看更多</p>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      data_0: [
        {
          src: require("../../assets/image/gw/15.png"),
          title: "asahi零秒活力锅，压力锅，全能平底锅媒体报道",
          time: "2019-04-26",
          body:
            "据统计，台湾人罹患癌症，有35%都是因为吃的不健康而引起，象是高油盐、大火爆火爆香的料理香的料理方式，象是高油盐、大火爆香的料理方式，象是高火爆香的料理火爆香的料理油盐、大火爆香的料理方式，象是高油盐、大火爆香的料理方式"
        },
        {
          src: require("../../assets/image/gw/15.png"),
          title: "asahi零秒活力锅，压力锅，全能平底锅媒体报道",
          time: "2019-04-26",
          body:
            "据统计，台湾人罹患癌症，有35%都是因为吃的不健康而引起，象是高油盐、大火爆火爆香的料理香的料理方式，象是高油盐、大火爆香的料理方式，象是高火爆香的料理火爆香的料理油盐、大火爆香的料理方式，象是高油盐、大火爆香的料理方式"
        },
        {
          src: require("../../assets/image/gw/15.png"),
          title: "asahi零秒活力锅，压力锅，全能平底锅媒体报道",
          time: "2019-04-26",
          body:
            "据统计，台湾人罹患癌症，有35%都是因为吃的不健康而引起，象是高油盐、大火爆火爆香的料理香的料理方式，象是高油盐、大火爆香的料理方式，象是高火爆香的料理火爆香的料理油盐、大火爆香的料理方式，象是高油盐、大火爆香的料理方式"
        }
      ],
      data_1: [
        {
          src: require("../../assets/image/gw/15.png"),
          title: "asahi零秒活力锅，压力锅，全能平底锅媒体报道",
          time: "2019-04-26",
          body:
            "据统计，台湾人罹患癌症，有35%都是因为吃的不健康而引起，象是高油盐、大火爆火爆香的料理香的料理方式，象是高油盐、大火爆香的料理方式，象是高火爆香的料理火爆香的料理油盐、大火爆香的料理方式，象是高油盐、大火爆香的料理方式"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
/deep/.van-tabs {
  border: none;
  margin-top: 0.3rem;
  .van-tabs__wrap {
    height: 0.5rem;
  }
  .van-tabs__wrap::after {
    border: none;
  }
  .van-tab {
    font-size: 0.26rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    line-height: 0.36rem;
    height: fit-content;
  }
  .van-tab--active {
    color: rgba(224, 18, 32, 1);
  }
  .van-tabs__line {
    width: 0.6rem !important;
    height: 0.06rem;
    background: rgba(224, 18, 32, 1);
    border-radius: 0.03rem;
  }
}
.card {
  width: calc(100% - 0.6rem);
  height: 5.25rem;
  margin: 0 0.3rem;
  padding: 0.3rem 0;
  box-sizing: border-box;
  border-bottom: 0.01rem solid #e6e6e6;
  position: relative;
  img {
    width: 100%;
    height: 3rem;
  }
  p:nth-of-type(1) {
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    line-height: 0.26rem;
    margin: 0.2rem 0 0.1rem;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  p:nth-of-type(2) {
    font-size: 0.22rem;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 0.22rem;
    margin: 0.15rem 0 0.1rem;
  }
  p:nth-of-type(3) {
    font-size: 0.22rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 0.36rem;
  }
  p:nth-of-type(4) {
    position: absolute;
    right: 0;
    bottom: 0.2rem;
    font-size: 0.22rem;
    font-weight: 400;
    color: rgba(27, 125, 219, 1);
    line-height: 0.36rem;
  }
}
</style>
