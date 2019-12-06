<template>
  <div class="sayDetail">
    <div class="top">
      <navbar></navbar>
      <img class="shouye" src="../../assets/image/zxw/shouye.png" alt />
    </div>
    <div class="contain">
      <div class="user">
        <div class="userImg">
          <img :src="form.userImg" alt />
        </div>
        <div class="userName">
          <div>
            <div>用户昵称</div>
            <div class="vipBox">
              <img src="../../assets/image/zxw/vip.png" alt />
              <div class="dengji">{{form.vip}}</div>
            </div>
          </div>
          <p class="date">发布于{{form.date}}</p>
        </div>
        <button class="btn">关注</button>
      </div>
      <p class="title">{{form.title}}</p>
      <p class="context">{{form.context}}</p>
      <div class="textImg"></div>
    </div>
    <div class="kuai"></div>

    <div class="bottom">
      <p class="huifu">{{form.number}}条回复</p>
      <div class="contain" v-for="(item,index) in data" :key="index">
        <div class="user">
          <div class="userImg">
            <img :src="item.userImg" alt />
          </div>
          <div class="userName">
            <div>
              <div>用户昵称</div>
              <div class="vipBox">
                <img src="../../assets/image/zxw/vip.png" alt />
                <div class="dengji">{{item.vip}}</div>
              </div>
            </div>
            <p class="date">发布于{{item.date}}</p>
          </div>
        </div>
        <div class="huifu">
          <p class="context" style="margin-top:.24rem">
            回复
            <span style="color:#E01220">{{item.user}}：</span>
            {{item.context}}
          </p>
        </div>
      </div>
    </div>
    <div class="input">
      <van-field v-model="input" placeholder="说说你的看法..." />
      <button class="fbBtn">发表</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      input: "",
      form: {
        userImg: require("../../assets/image/zxw/user.png"),
        date: "20分钟前/7月21日 14:00",
        vip: "3",
        title: "这是帖子标题",
        context: "这是帖子被贺卡收到flask活动反馈回来",
        shareNumber: "222",
        messageNumber: "234",
        number: "222"
      },
      data: [
        {
          userImg: require("../../assets/image/zxw/user.png"),
          date: "20分钟前/7月21日 14:00",
          vip: "3",
          title: "这是帖子标题",
          context: "这是帖子被贺卡收到flask活动反馈回来",
          shareNumber: "222",
          messageNumber: "234",
          user: "哈哈哈"
        },
        {
          userImg: require("../../assets/image/zxw/user.png"),
          date: "20分钟前/7月21日 14:00",
          vip: "3",
          title: "这是帖子标题",
          context: "这是帖子被贺卡收到flask活动反馈回来",
          shareNumber: "222",
          messageNumber: "234",
          user: "哈哈哈"
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.top {
  .shouye {
    width: 0.41rem;
    height: 0.42rem;
    float: right;
    margin: -0.64rem 0.3rem 0 0;
  }
}
.contain {
  width: 7.5rem;
  padding: 0.2rem 0.3rem 0.3rem 0.3rem;
  box-sizing: border-box;
}
.user {
  display: flex;
}
.userImg {
  width: 0.6rem;
  height: 0.6rem;
  margin-right: 0.2rem;
  img {
    width: 0.6rem;
    height: 0.6rem;
  }
}
.userName {
  div:nth-child(1) {
    font-size: 0.28rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    display: flex;
    line-height: 0.28rem;
    img {
      height: 0.28rem;
    }
    .vipBox {
      height: 0.28rem;
      width: 0.24rem;
      position: relative;
      .dengji {
        position: absolute;
        font-size: 0.14rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 0.28rem;
        margin: -0.28rem 0 0 0.06rem;
      }
    }
  }
  .date {
    font-size: 0.22rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(179, 179, 179, 1);
    margin-top: 0.08rem;
  }
}
.btn {
  margin-left: auto;
  background: rgba(224, 18, 32, 1);
  border-radius: 0.18rem;
  height: 0.36rem;
  border: none;
  font-size: 0.18rem;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  padding: 0 0.2rem;
  margin-top: 0.2rem;
}
.title {
  font-size: 0.3rem;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  margin: 0.3rem 0 0.2rem;
}
.context {
  font-size: 0.24rem;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 0.36rem;
}
.textImg {
  width: 6.9rem;
  height: 3.89rem;
  background-color: #ccc;
  margin-top: 0.3rem;
}

.cmt {
  width: 6.08rem;
  background-color: #fafafa;
  padding: 0.2rem;
  box-sizing: border-box;
  margin-top: 0.2rem;
  font-size: 0.18rem;
  color: #000000;
}
.tpTitle {
  font-size: 0.26rem;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 0.24rem;
  margin: 0.3rem 0;
}
.tpName {
  font-size: 0.22rem;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 0.24rem;
}
.tpBox {
  height: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.progress {
  width: 4.5rem;
}
.tpBtn {
  width: 1rem;
  height: 0.4rem;
  background: rgba(224, 18, 32, 1);
  border: 0.01rem solid rgba(224, 18, 32, 1);
  border-radius: 0.04rem;
  font-size: 0.18rem;
  color: #fff;
}
.tpBtn1 {
  width: 1rem;
  height: 0.4rem;
  background: #fff;
  border: 0.01rem solid rgba(224, 18, 32, 1);
  border-radius: 0.04rem;
  font-size: 0.18rem;
  color: rgba(224, 18, 32, 1);
}
/deep/.van-tabs {
  .van-tabs__wrap {
    margin-right: 3rem;
  }
}
.share {
  font-size: 0.22rem;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  height: 0.3rem;
  display: flex;
  align-items: center;
  margin-top: 0.3rem;
  span {
    display: flex;
    align-items: center;
  }
  img {
    height: 0.3rem;
  }
}
.input {
  width: 7.5rem;
  height: 0.9rem;
  padding: 0.1rem 0.3rem;
  box-sizing: border-box;
  position: fixed;
  display: flex;
  bottom: 0;
  .fbBtn {
    width: 1.6rem;
    height: 0.7rem;
    background: rgba(224, 18, 32, 1);
    border-radius: 0.1rem;
    border:none;
    margin-left: .2rem;
    font-size:.26rem;
font-family:Microsoft YaHei;
font-weight:400;
color:rgba(255,255,255,1);
  }
  .van-cell {
    width: 5.1rem;
    height: 0.7rem;
    background: rgba(245, 245, 245, 1);
    border-radius: 0.1rem;
    background-color: #f5f5f5;
    font-size: 0.26rem;
    line-height: 0.7rem;
    padding: 0 0.28rem;
    box-sizing: border-box;
  }
}
.kuai {
  width: 7.5rem;
  height: 0.1rem;
  background: rgba(250, 250, 250, 1);
}
.huifu {
  font-size: 0.26rem;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 0.6rem;
  margin-left: 0.83rem;
}
</style>