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
        <button class="btn" v-if="gzbtn==1" @click="gzbtn=2">关注</button>
         <button class="btn1" v-if="gzbtn==2" @click="gzbtn=1">取消关注</button>
      </div>
      <p class="title">{{form.title}}</p>
      <p class="context">{{form.context}}</p>
      <div class="textImg"></div>
      <p class="share">
        <span @click="show=true">
          <img src="../../assets/image/zxw/fx.png" alt />
          <span style="margin-left:.1rem">{{form.shareNumber}}</span>
        </span>
        <span style="margin:.3rem">
          <img src="../../assets/image/zxw/chatIcon.png" alt />
          <span style="margin-left:.1rem">{{form.messageNumber}}</span>
        </span>
        <img style="margin-left:auto" v-if="form.star==1" @click="form.star=2" src="../../assets/image/zxw/xin.png" alt />
        <img style="margin-left:auto" v-if="form.star==2" @click="form.star=1"  src="../../assets/image/zxw/hongxin.png" alt />
      </p>
    </div>
    <div class="kuai"></div>
    <div class="bottom">
      <van-tabs v-model="active" color="#000000" title-active-color="#000000"	>
        <van-tab title="全部回帖">
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
            <div style="margin-left:.82rem">
              <p class="context" style="margin-top:.24rem">{{item.context}}</p>
              <div class="textImg1"></div>
              <div class="toupiao" v-if="item.toupiao==true">
                <p class="tpTitle">投票选项（单选投票/多选投票）</p>
                <div v-for="(i,index) in data[index].toupiaoData" :key="index">
                  <p class="tpName">{{i.name}}</p>
                  <div class="tpBox">
                    <div class="progress">
                      <van-progress
                        :percentage="50"
                        stroke-width="6"
                        color="#E60013"
                        :show-pivot="false"
                      />
                    </div>
                    <button class="tpBtn" v-if="i.btn==0">取消</button>
                    <button class="tpBtn1" v-if="i.btn==1">投票</button>
                  </div>
                </div>
              </div>
              <p class="share">
                <span @click="show=true">
                  <img src="../../assets/image/zxw/fx.png" alt />
                  <span style="margin-left:.1rem">{{item.shareNumber}}</span>
                </span>
                <span style="margin:.3rem">
                  <img src="../../assets/image/zxw/chatIcon.png" alt />
                  <span style="margin-left:.1rem">{{item.messageNumber}}</span>
                </span>
                  <img style="margin-left:auto" v-if="item.xin==1" @click="item.xin=2" src="../../assets/image/zxw/xin.png" alt />
        <img style="margin-left:auto" v-if="item.xin==2" @click="item.xin=1"  src="../../assets/image/zxw/hongxin.png" alt />
              </p>
              <div class="cmt" v-if="item.cmt==true">
                <p v-for="(item1,i) in data[index].message" :key="i">
                  <span style="color:#E01220" v-if="item1.state==1">{{item1.name}}:</span>
                  <span v-if="item1.state==2">
                    <span style="color:#E01220">{{item1.name1}}：</span>回复
                    <span style="color:#E01220">{{item1.name2}}：</span>
                  </span>
                  <span>你咋回事</span>
                </p>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="只看楼主">
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

            <div style="margin-left:.82rem">
              <p class="context" style="margin-top:.24rem">{{item.context}}</p>
              <div class="textImg1"></div>
              <div class="toupiao" v-if="item.toupiao==true">
                <p class="tpTitle">投票选项（单选投票/多选投票）</p>
                <div v-for="(i,index) in data[index].toupiaoData" :key="index">
                  <p class="tpName">{{i.name}}</p>
                  <div class="tpBox">
                    <div class="progress">
                      <van-progress
                        :percentage="50"
                        stroke-width="6"
                        color="#E60013"
                        :show-pivot="false"
                      />
                    </div>
                    <button class="tpBtn" v-if="i.btn==0">取消</button>
                    <button class="tpBtn1" v-if="i.btn==1">投票</button>
                  </div>
                </div>
              </div>
              <div class="cmt" v-if="item.cmt==true">
                <p v-for="(item1,i) in data[index].message" :key="i">
                  <span style="color:#E01220" v-if="item1.state==1">{{item1.name}}:</span>
                  <span v-if="item1.state==2">
                    <span style="color:#E01220">{{item1.name1}}：</span>回复
                    <span style="color:#E01220">{{item1.name2}}：</span>
                  </span>
                  <span>你咋回事</span>
                </p>
              </div>
              <p class="share">
                <span @click="show=true">
                  <img src="../../assets/image/zxw/fx.png" alt />
                  <span style="margin-left:.1rem">{{item.shareNumber}}</span>
                </span>
                <span style="margin:.3rem">
                  <img src="../../assets/image/zxw/chatIcon.png" alt />
                  <span style="margin-left:.1rem">{{item.messageNumber}}</span>
                </span>
                <img style="margin-left:auto" v-if="item.xin==1" @click="item.xin=2" src="../../assets/image/zxw/xin.png" alt />
        <img style="margin-left:auto" v-if="item.xin==2" @click="item.xin=1"  src="../../assets/image/zxw/hongxin.png" alt />
              </p>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="input">
      <van-field v-model="input" placeholder="说说你的看法..." />
    </div>
    <div class="pop">
      <van-popup v-model="show" position="bottom" :style="{ height: '4.28rem' }">
        <div class="popTop">
          <p class="popTitle">分享至</p>
          <div class="popShare">
            <div class="popBox">
              <div class="popicon">
                <img src="../../assets/image/zxw/haoyou.png" alt />
              </div>
              <p class="friend">好友</p>
            </div>
            <div class="popBox">
              <div class="popicon">
                <img src="../../assets/image/zxw/wx.png" alt />
              </div>
              <p class="friend">微信</p>
            </div>
            <div class="popBox">
              <div class="popicon">
                <img src="../../assets/image/zxw/qq.png" alt />
              </div>
              <p class="friend">QQ</p>
            </div>
            <div class="popBox">
              <div class="popicon">
                <img src="../../assets/image/zxw/link.png" alt />
              </div>
              <p class="friend">链接</p>
            </div>
          </div>
        </div>
        <div class="popBottom" @click="show=false">
          <p class="cancel">取消</p>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      gzbtn:1,
      active:0,
      input: "",
      form: {
        userImg: require("../../assets/image/zxw/user.png"),
        date: "20分钟前/7月21日 14:00",
        vip: "3",
        title: "这是帖子标题",
        context: "这是帖子被贺卡收到flask活动反馈回来",
        shareNumber: "222",
        messageNumber: "234",
        star:1,
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
          cmt: true,
          toupiao: false,
          xin:1,
          message: [
            {
              name: "哇哈哈",
              state: 1,
              name1: "行天下",
              name2: "曾加简"
            },
            {
              name: "哇哈哈",
              state: 2,
              name1: "行天下",
              name2: "曾加简"
            }
          ]
        },
        {
          userImg: require("../../assets/image/zxw/user.png"),
          date: "20分钟前/7月21日 14:00",
          vip: "3",
          title: "这是帖子标题",
          context: "这是帖子被贺卡收到flask活动反馈回来",
          shareNumber: "222",
          messageNumber: "234",
          cmt: false,
          toupiao: true,
          xin:1,
          toupiaoData: [
            {
              name: "喜不喜欢",
              btn: 0
            },
            {
              name: "喜不喜欢",
              btn: 1
            },
            {
              name: "喜不喜欢",
              btn: 1
            }
          ]
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
  border: .01rem solid rgba(224, 18, 32, 1);
  font-size: 0.18rem;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  padding: 0 0.2rem;
  margin-top: 0.2rem;
}
.btn1{
  margin-left: auto;
  background: #fff;
  border-radius: 0.18rem;
  height: 0.36rem;
  border: .01rem solid rgba(224, 18, 32, 1);
  font-size: 0.18rem;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(224, 18, 32, 1);
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
.textImg1 {
  width: 6.08rem;
  height: 3.43rem;
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
  position: fixed;
  background-color: #fff;
  bottom: 0;
  box-sizing: border-box;
  .van-cell {
    width: 6.9rem;
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
.pop {
  .van-popup{
    background-color: rgba(0,0,0,0);
    
  }
  .popTop {
    width: 6.9rem;
    height: 2.85rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.2rem;
    padding: 0.3rem;
    box-sizing: border-box;
    margin-left: .3rem;
    background-color: #fff;
  }
  .popTitle {
    font-size: 0.28rem;
    font-family: PingFang SC;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
    text-align: center;
  }
  .popShare{
    display: flex;
    justify-content: space-between;
    margin-top:.3rem;
  }
  .popBox {
    width: 0.9rem;
    text-align: center;
    .popicon {
      width: 0.9rem;
      height: 0.9rem;
      background: #fff;
      border: 0.01rem solid #e6e6e6;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        height: 0.4rem;
      }
    }
    .friend {
      font-size: 0.2rem;
      font-family: PingFang SC;
      font-weight: 300;
      color: rgba(51, 51, 51, 1);
      text-align: center;
      margin-top: 0.24rem;
    }
    
  }
}
.popBottom{
  width:6.9rem;
height:.98rem;
background:rgba(255,255,255,1);
border-radius:.2rem;
margin:.2rem .3rem .25rem .3rem;
}
.cancel{
  line-height: .98rem;
  text-align: center;
  font-size:.28rem;
font-family:PingFang SC;
font-weight:300;
color:rgba(51,51,51,1)
}
</style>