<template>
  <div class="background">
    <div class="top">
      <div>
        <van-icon name="arrow-left" @click="$router.go(-1)"/>
      </div>
      <p>站内信</p>
      <p @click="show=true">
        <span>{{state}}</span>
        <van-icon name="arrow-down" />
      </p>
    </div>
    <div class="all">
      <img src="../../assets/image/gw/38.png" v-if="state_0==true" @click="select(false)" />
      <img src="../../assets/image/gw/37.png" v-else @click="select(true)" />
      <p>全选</p>
    </div>
    <div></div>
    <div class="down" v-if="show==true" @click="show=false">
      <div>
        <p @click="state='已收件'">已收件</p>
        <p @click="state='已发送'">已发送</p>
        <p @click="state='已删除'">已删除</p>
      </div>
    </div>
    <div>
      <div class="card" v-for="(value,key) in mail" :key="key" @click="$router.push('/MailDetail')">
        <div>
          <img
            src="../../assets/image/gw/38.png"
            v-if="value.checked==true"
            @click="value.checked=false"
          />
          <img src="../../assets/image/gw/37.png" v-else @click="value.checked=true" />
        </div>
        <div>
          <p>{{value.name}}</p>
          <p>{{value.detail}}</p>
        </div>
        <p>{{value.time}}</p>
      </div>
    </div>
    <div class="bottom">
      <p>
        <img src="../../assets/image/gw/38.png" v-if="state_0==true" @click="select(false)" />
        <img src="../../assets/image/gw/37.png" v-else @click="select(true)" />
        <span>全选</span>
      </p>
      <van-button>删除</van-button>
      <van-button v-if="state=='已收件'">标记为已读</van-button>
      <van-button v-else-if="state=='已发送'" class="short">转发</van-button>
      <van-button v-else class="short">恢复</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      state: "已收件",
      mail: [
        {
          name: "发件人昵称",
          detail: "ashaxi官网使用满意度调查，内容显示巴拉巴拉～",
          time: "2019年7月18日",
          checked: false
        },
        {
          name: "发件人昵称",
          detail:
            "ashaxi官网使用满意度调查，内容显示巴拉巴拉ashaxi官网使用满意度调查，内容显示巴拉巴拉～",
          time: "2019年7月18日",
          checked: false
        },
        {
          name: "发件人昵称",
          detail: "ashaxi官网使用满意度调查，内容显示巴拉巴拉～",
          time: "2019年7月18日",
          checked: false
        }
      ]
    };
  },
  methods: {
    // 全选
    select(value) {
      if (value === true) {
        for (let x in this.mail) {
          this.mail[x].checked = true;
        }
      } else {
        for (let x in this.mail) {
          this.mail[x].checked = false;
        }
      }
    }
  },
  computed: {
    state_0() {
      let checked = true;
      for (let x in this.mail) {
        if (this.mail[x].checked == false) checked = false;
      }
      if (checked == true) return true;
      else return false;
    }
  }
};
</script>

<style lang="less" scoped>
.background {
  position: absolute;
  top: 0.88rem;
  bottom: 0.9rem;
  width: 100%;
  background: #fafafa;
  overflow: auto;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 0.88rem;
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  div {
    width: 2rem;
    .van-icon {
      font-size: 0.32rem;
      color: black;
    }
  }
  p:nth-of-type(1) {
    font-size: 0.3rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  p:nth-of-type(2) {
    text-align: right;
    width: 2rem;
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    .van-icon {
      font-size: 0.22rem;
    }
  }
}
.all {
  height: 0.88rem;
  background: #fff;
  border-bottom: 0.01rem solid #f0f0f0;
  margin-top: 0.1rem;
  display: flex;
  align-items: center;
  img {
    width: 0.28rem;
    margin: 0 0.2rem 0 0.3rem;
  }
  p {
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
}
.card {
  display: flex;
  align-items: center;
  height: 1.3rem;
  background: #fff;
  position: relative;
  overflow: hidden;
  &:not(:last-child)::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0.78rem;
    border-bottom: 0.01rem solid #f0f0f0;
  }
  div:nth-child(1) {
    img {
      width: 0.28rem;
      margin: 0 0.2rem 0 0.3rem;
    }
  }
  div:nth-child(2) {
    p:nth-child(1) {
      font-size: 0.26rem;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      width: 4.4rem;
      line-height: 0.26rem;
      margin-bottom: 0.2rem;
    }
    p:nth-child(2) {
      font-size: 0.24rem;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 0.24rem;
      width: 6.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  > p {
    position: absolute;
    font-size: 0.24rem;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 0.24rem;
    bottom: 0.7rem;
    right: 0.3rem;
  }
}
.down {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  > div {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0rem 0.01rem 0.1rem 0rem rgba(0, 0, 0, 0.09);
    border-radius: 0.1rem;
    position: absolute;
    right: 0.1rem;
    top: 0.76rem;
    height: 3rem;
    overflow: hidden;

    p {
      font-size: 0.26rem;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 1rem;
      width: 1.6rem;
      text-align: center;
      margin: 0 0.2rem;
      &:not(:last-child) {
        border-bottom: 0.01rem solid #f0f0f0;
      }
    }
  }
}
.bottom {
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 0.9rem;
  width: 100%;
  > p {
    line-height: 0.28rem;
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    img {
      width: 0.28rem;
      margin: 0 0.1rem 0 0.3rem;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
  }
  .van-button {
    width: 1.6rem;
    height: 0.6rem;
    background: transparent;
    border: 0.01rem solid #e01220;
    border-radius: 0.3rem;
    font-size: 0.26rem;
    font-weight: 400;
    color: #e01220;
    line-height: 0.6rem;
    margin-left: auto;
  }
  .van-button:nth-of-type(2) {
    width: 2rem;
    margin: 0 0.3rem 0 0.2rem;
    color: #fff;
    background: #e01220;
    border: 0.01rem solid rgba(224, 18, 32, 1);
  }
  .short {
    width: 1.6rem !important;
  }
}
</style>