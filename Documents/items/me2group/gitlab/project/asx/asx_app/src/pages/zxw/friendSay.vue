<template>
  <div class="friendSay">
    <div class="top">
      <van-tabs v-model="active" title-active-size=".36rem" :ellipsis="false" @click="introHandle">
        <van-tab title="推荐">
          <div class="contain">
            <div v-for="(item,index) in data" :key="index" class="box" @click="gotoDetail(item)">
              <p class="title">{{item.title}}</p>

              <p class="context">{{item.content}}</p>

              <div class="imgBox">
                <img
                  v-for="(item1,i) in data[index].img"
                  :key="i"
                  :src="item1"
                  :class="(i+1)%3==0 ?'red':''"
                  alt
                />
              </div>
              <div class="sayBottom">
                <img :src="item.userImg" alt/>

                <div class="userName">{{item.userName}}</div>
                <div class="date">发布于{{item.lastReplyTime}}</div>
                <div class="commentNumber" @click.stop="gotohuifu(item)">
                  <img style="width:.28rem" src="../../assets/image/zxw/chatIcon.png" alt/>

                  <div style="color:rgba(102,102,102,1);margin-left:.12rem">{{item.replyCount}}</div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="热榜">
          <div class="contain">
            <div v-for="(item,index) in data1" :key="index" class="box" @click="gotoDetail(item)">
              <div class="title">
                <div class="top">TOP{{index+1}}</div>
                <div>{{item.title}}</div>
              </div>
              <p class="context">{{item.content}}</p>

              <div class="imgBox">
                <img
                  v-for="(item1,i) in data1[index].img"
                  :key="i"
                  :src="item1"
                  :class="(i+1)%3==0 ?'red':''"
                  alt
                />
              </div>
              <div class="sayBottom">
                <img :src="item.userImg" alt/>

                <div class="userName">{{item.userName}}</div>
                <div class="date">发布于{{item.lastReplyTime}}</div>
                <div class="commentNumber" @click.stop="gotohuifu(item)">
                  <img style="width:.28rem" src="../../assets/image/zxw/chatIcon.png" alt/>

                  <div style="color:rgba(102,102,102,1);margin-left:.12rem">{{item.replyCount}}</div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="新闻公告">
          <div class="contain">
            <div v-for="(item,index) in data2" :key="index" class="box" @click="gotoDetail(item)">
              <div class="title">
                {{item.title}}
              </div>
              <p class="context">{{item.content}}</p>

              <div class="imgBox">
                <img
                  v-for="(item1,i) in data2[index].img"
                  :key="i"
                  :src="item1"
                  :class="(i+1)%3==0 ?'red':''"
                  alt
                />
              </div>
              <div class="sayBottom">
                <img :src="item.userImg" alt/>

                <div class="userName">{{item.userName}}</div>
                <div class="date">发布于{{item.lastReplyTime}}</div>
                <div class="commentNumber" @click.stop="gotohuifu(item)">
                  <img style="width:.28rem" src="../../assets/image/zxw/chatIcon.png" alt/>

                  <div style="color:rgba(102,102,102,1);margin-left:.12rem">{{item.replyCount}}</div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="bottom">
      <div class="tongzhi" @click="$router.push('/atme')">
        <div class="img">
          <img
            style="width:.35rem;height:.4rem;margin-top:.11rem"
            src="../../assets/image/zxw/xiaoxi.png"
            alt
          />
        </div>
        <p>通知</p>
      </div>
      <div class="tongzhi" @click="$router.push('/myTie')">
        <div class="img" dot>
          <img
            style="width:.37rem;height:.36rem;margin-top:.14rem"
            src="../../assets/image/zxw/wode.png"
            alt
          />
        </div>
        <p>我的</p>
      </div>
      <button class="btn" @click="sendHandle">我要发贴</button>
    </div>
  </div>
</template>

<script>
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    data: function () {
      return {
        active: 0,
        data: [
//          {
//            title: "这是一个帖子的主题",
//            content: "这道菜的至关重要的地方就是选料，要选五花三层的肉，有肉皮哦~就是白色的脂肪层要有三层，而红肉部分也要三层。特别是肉皮下的第一层脂肪要厚一些。",
//            imageUrl: [
//              require("../../assets/image/zxw/shop.png"),
//            ],
//            userImg: require("../../assets/image/zxw/user.png"),
//            toUid: "用户昵称",
//            lastReplyTime: "20分钟前/7月21日 14:00",
//            view_count: "123"
//          },
        ],
        data1: [
//          {
//            title: "这是一个帖子的主题",
//            context: "这道菜的至关重要的地方就是选料，要选五花三层的肉，有肉皮哦~就是白色的脂肪层要有三层，而红肉部分也要三层。特别是肉皮下的第一层脂肪要厚一些。",
//            img: [
//              require("../../assets/image/zxw/shop.png"),
//              require("../../assets/image/zxw/shop.png"),
//              require("../../assets/image/zxw/shop.png")
//            ],
//            userImg: require("../../assets/image/zxw/user.png"),
//            userName: "用户昵称",
//            date: "20分钟前/7月21日 14:00",
//            number: "123"
//          },
        ],
        data2: [
//          {
//            title: "这是一个帖子的主题",
//            context: "这道菜的至关重要的地方就是选料，要选五花三层的肉，有肉皮哦~就是白色的脂肪层要有三层，而红肉部分也要三层。特别是肉皮下的第一层脂肪要厚一些。",
//            img: [
//              require("../../assets/image/zxw/shop.png"),
//              require("../../assets/image/zxw/shop.png"),
//              require("../../assets/image/zxw/shop.png")
//            ],
//            userImg: require("../../assets/image/zxw/user.png"),
//            userName: "用户昵称",
//            date: "20分钟前/7月21日 14:00",
//            number: "123"
//          }
        ]
      };
    },
    created: function () {
      this.userinfo = {token: "asxtoken", id: '1'};
      this.init();
    },
    methods: {
      init: function () {
        this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id};
        //帖子推荐列表
        this.recommendList();
      },
      introHandle: function (id, title) {
        if (id == 0) {
          //帖子推荐列表
          this.recommendList();
        }
        else if (id == 1) {
          //帖子热度列表
          this.viewsList();
        }
        else {
          //新闻公告
          this.noticeList();
        }
      },
      //新闻公告
      noticeList: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.noticeList,
          headers: this.headerobj,
//          data: API.qs.stringify({page: this.pageindex, num: this.pagesize})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.data2 = _this.exchangeData(e.data.data);
            }
            else {
              API.dialog({message: JSON.stringify(e.data.msg)});
            }
          }
          else {
            API.dialog({message: JSON.stringify(e.data.msg)});
          }

        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
      },
      //帖子推荐列表
      recommendList: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.recommendList,
          headers: this.headerobj,
//          data: API.qs.stringify({page: this.pageindex, num: this.pagesize})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.data = _this.exchangeData(e.data.data);
            }
            else {
              API.dialog({message: JSON.stringify(e.data.msg)});
            }
          }
          else {
            API.dialog({message: JSON.stringify(e.data.msg)});
          }

        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
      },
      //帖子热度列表
      viewsList: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.viewsList,
          headers: this.headerobj,
//          data: API.qs.stringify({page: this.pageindex, num: this.pagesize})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.data1 = _this.exchangeData(e.data.data);
            }
            else {
              API.dialog({message: JSON.stringify(e.data.msg)});
            }
          }
          else {
            API.dialog({message: JSON.stringify(e.data.msg)});
          }

        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
      },
      //我要发贴
      sendHandle: function () {
        this.$router.push('/sendTie')
      },
      gotoDetail: function (row) {
        this.$router.push({path: 'sayDetail', query: {id: row.postId}});
      },
      //回复帖子
      gotohuifu: function (row) {
        this.$router.push({path: 'huifuDetail', query: {id: row.postId}})
      },
      //数据转变
      exchangeData: function (v) {
        for (var i = 0, arr = v; i < arr.length; i++) {
          arr[i].userName = arr[i].userName || "暂无用户";
          arr[i].img = [arr[i].imageUrl];
          arr[i].userImg = "http://qiandian.oss-cn-hangzhou.aliyuncs.com/image/2019-11-29/4efb422d-2b3d-4c79-ac85-a08999f46244.jpg";
          arr[i].status = arr[i].status || 0;
        }
        return arr;
      }
    }
  };
</script>

<style lang="less" scoped>
  /deep/ .van-tabs {
    .van-tabs__nav {
      justify-content: space-around;
      margin-right: 4rem;
      line-height: 0.88rem;
    }
    .van-tab {
      font-size: 0.26rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      width: fit-content;
      min-width: 0.8rem;
      flex: 0;
      line-height: 0.88rem;
    }
    .van-tab:nth-child(3) {
      min-width: 1.5rem;
    }
    .van-tab--active {
      font-size: 0.3rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }
    .van-tabs__line {
      background: rgba(224, 18, 32, 0.2);
      height: 0.14rem;
      bottom: 0.5rem;
    }
  }

  // van-hairline--top-bottom
  .contain {
    width: 7.5rem;
    background-color: #fafafa;
  }

  .box {
    width: 7.5rem;
    background-color: #fff;
    padding: 0.3rem;
    box-sizing: border-box;
    margin-bottom: 0.1rem;
  }

  .title {
    font-size: 0.28rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    display: flex;
    height: 0.3rem;
    align-items: center;
    line-height: 0.3rem;
    .top {
      background: rgba(224, 18, 32, 1);
      border-radius: 0.15rem;
      padding: 0.02rem 0.1rem 0 0.1rem;
      box-sizing: border-box;
      margin-right: 0.16rem;
      font-size: 0.18rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }

  .context {
    font-size: 0.24rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 0.36rem;
    margin-top: 0.16rem;
  }

  .imgBox {
    margin-top: 0.2rem;
    img {
      width: 2.18rem;
      height: 2.18rem;
      border-radius: 0.04rem;
      margin: 0 0.18rem 0.18rem 0;
    }
    .red {
      margin: 0 0 0.18rem 0;
    }
  }

  .sayBottom {
    img {
      width: 0.3rem;
      height: 0.3rem;
      border-radius: 0.15rem;
    }
    height: 0.3rem;
    display: flex;
    font-size: 0.22rem;
    align-items: center;
    .userName {
      color: rgba(0, 0, 0, 1);
      margin: 0 0.2rem 0 0.1rem;
    }
    .date {
      color: #b3b3b3;
    }
    .commentNumber {
      margin-left: auto;
      display: flex;
      align-items: center;
    }
  }

  .bottom {
    width: 7.5rem;
    height: 0.9rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px -0.01rem 0px 0px rgba(240, 240, 240, 1);
    position: fixed;
    bottom: 0;
    padding: 0 0.3rem;
    box-sizing: border-box;
    display: flex;
    .tongzhi {
      width: 1rem;
      height: 0.9rem;
      text-align: center;
      margin-right: 0.2rem;
      .img {
        height: .6rem;
      }
      p {
        font-size: 0.18rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 0.24rem;
      }
    }
    .btn {
      width: 4rem;
      height: 0.7rem;
      background: rgba(224, 18, 32, 1);
      border-radius: 0.35rem;
      margin-top: 0.1rem;
      font-size: 0.28rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      border: none;
      margin-left: auto;
    }
  }
</style>
