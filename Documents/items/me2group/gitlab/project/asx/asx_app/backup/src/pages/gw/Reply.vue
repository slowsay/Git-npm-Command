<template>
  <div>
    <div class="top">
      <div>
        <van-icon name="arrow-left" />
      </div>
    </div>
    <div class="name">
      <van-field v-model="name" placeholder="请输入" />
      <van-field v-model="title" placeholder="请输入主题" />
    </div>
    <div class="add">
      <p>
        <img src="../../assets/image/gw/41.png" />
        <span>添加图片(网址链接)</span>
      </p>
      <van-uploader>
        <p style="border:none">
          <img src="../../assets/image/gw/40.png" />
          <span>添加图片(本地上传)</span>
        </p>
      </van-uploader>
    </div>
    <van-field v-model="body" placeholder="请输入" type="textarea" />
    <van-button>发送</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      title: "",
      body: ""
    };
  }
};
</script>

<style lang="less" scoped>
.top {
  height: 0.88rem;
  div {
    float: left;
    line-height: 0.88rem;
    margin-left: 0.3rem;
    .van-icon {
      font-size: 0.32rem;
      color: black;
      vertical-align: middle;
    }
  }
}
.name {
  /deep/.van-field {
    width: 6.9rem;
    height: 0.8rem;
    border: 0.01rem solid rgba(230, 230, 230, 1);
    border-radius: 0.08rem;
    margin: 0.2rem auto 0;
    .van-field__control {
      font-size: 0.28rem;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 0.28rem;
    }
  }
}
.add {
  display: flex;
  margin: 0.35rem 0 0.2rem 0.3rem;

  p {
    line-height: 0.2rem;
    font-size: 0.2rem;
    margin-right: 0.3rem;
    padding-right: 0.3rem;
    border-right: .01rem solid #f0f0f0;
    img {
      width: 0.2rem;
      vertical-align: middle;
    }
    span {
      font-size: 0.22rem;
      font-weight: 400;
      color: rgba(27, 125, 219, 1);
      vertical-align: middle;
    }
  }
}
.van-field {
  width: 6.9rem;
  height: 6rem;
  border: 0.01rem solid rgba(230, 230, 230, 1);
  border-radius: 0.08rem;
  margin: auto;
  font-size: 0.26rem;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 0.4rem;
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