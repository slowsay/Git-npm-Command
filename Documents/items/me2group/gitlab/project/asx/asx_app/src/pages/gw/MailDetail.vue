<template>
  <div>
    <div class="top">
      <div>
        <van-icon name="arrow-left" @click="$router.go(-1)"/>
      </div>
      <p>信息详情</p>
    </div>
    <div class="body">
      <p>
        <span>发件人:</span>
        <span>{{name}}</span>
      </p>
      <p>{{title}}</p>
      <p>{{body}}</p>
      <p>
        <span>收件人</span>
        <span>{{name_0}}</span>
      </p>
      <p>
        <span>时间:</span>
        <span>{{time}}</span>
      </p>
    </div>
    <van-button>回复</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "阿莎系;",
      title: "这是一个站内信主题",
      body:
        "ashaxi官网使用满意度调查，内容显示巴拉巴拉～这里都是正文内容巴拉巴拉ashaxi官网使用满意度调查，内容显示巴拉巴拉～这里都是正文内容巴拉巴拉",
      name_0: "发福蝶",
      time: "2019.12.16 15:32"
    };
  }
};
</script>

<style lang="less" scoped>
.top {
  height: 0.88rem;
  background: #ffffff;
  box-shadow: 0rem 0.01rem 0rem 0rem rgba(240, 240, 240, 1);
  border-bottom: 0.1rem solid #fafafa;
  div {
    float: left;
    line-height: 0.88rem;
    .van-icon {
      font-size: 0.32rem;
      color: black;
      vertical-align: middle;
      margin-left: .3rem
    }
  }
  p {
    font-size: 0.3rem;
    font-weight: 400;
    line-height: 0.88rem;
    color: rgba(51, 51, 51, 1);
    margin: auto;
    width: fit-content;
  }
}
.body {
  p:nth-child(1) {
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 0.84rem;
    padding-left: 0.3rem;
    border-bottom: 0.01rem solid #f0f0f0;
    span:nth-child(2) {
      color: #1b7ddb;
    }
  }
  p:nth-child(2) {
    font-size: 0.3rem;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    line-height: 0.3rem;
    margin: 0.25rem 0 0.3rem 0.3rem;
  }
  p:nth-child(3) {
    width: 6.9rem;
    height: 6rem;
    background: rgba(255, 255, 255, 1);
    border: 0.01rem solid rgba(230, 230, 230, 1);
    border-radius: 0.06rem;
    margin-left: 0.3rem;
    padding: 0.2rem;
    box-sizing: border-box;
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 0.4rem;
  }
  p:nth-child(4) {
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 0.25rem;
    margin: 0.3rem 0 0.25rem 0.3rem;
  }
  p:nth-child(5) {
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 0.25rem;
    margin-left: 0.3rem;
  }
}
.van-button {
  position: absolute;
  width: 6.9rem;
  height: 0.8rem;
  background: rgba(224, 18, 32, 1);
  border-radius: 0.4rem;
  font-size: 0.28rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 0.8rem;
  left: 0.3rem;
  bottom: 0.3rem;
}
</style>