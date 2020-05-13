<template>
  <!-- 我的信息 我的贴子 -->
  <div class="myTie">
    <div class="top">
      <navbar></navbar>
    </div>
    <div class="contain">
      <div class="user">
        <div class="userImg">
          <img class="userimg" :src="form.userImg" alt/>
        </div>
        <div>
          <p class="userName">
            {{form.userName}}
            <img style="margin: 0 .1rem;" :src="form.dengjiImg"/>
            <img :src="form.vipImg" alt/>
          </p>

          <p class="dengji">
            <span>等级 {{form.dengji}}</span>
            <span>粉丝 {{form.fans}}</span>
            <span>关注 {{form.guanzhu}}</span>
          </p>

          <p class="jianjie">简介：{{form.jianjie}}</p>
        </div>
      </div>
      <div class="kuai"></div>
    </div>
    <div class="bottom">
      <van-tabs v-model="active" @click="channelHandle">
        <van-tab :title="form.title1">
          <div class="box">
            <div
              v-for="(item,index) in form.box"
              :key="index"
              class="imgBox"
              @click="gotouchstart(index)"
            >
              <div :class="changered==index ?'red':'pop' ">
                <div class="delBtn">
                  <div class="del">
                    <img class="delImg" src="../../assets/image/zxw/del.png" @click="delHandle(item)"/>&nbsp;删除
                  </div>
                </div>
              </div>
              <img class="bgImg" :src="item.boxImg"/>

              <div class="boxBottom">
                <p class="boxName">{{item.title}}</p>

                <p class="boxChakan">
                  <span>
                    <img style="width:.18rem" src="../../assets/image/zxw/chakan.png"/>
                    <span>{{item.viewCount}}</span>
                  </span>
                  <span>
                    <img style="width:.16rem" src="../../assets/image/zxw/star.png"/>
                    <span>{{item.collectCount}}</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab :title="form.title2">
          <div class="box">
            <div
              v-for="(item,index) in form.collect"
              :key="index"
              class="imgBox"
              @click="gotouchstart(index)"
            >
              <div :class="changered==index ?'red':'pop' ">
                <div class="delBtn">
                  <div class="del">
                    <img class="delImg" src="../../assets/image/zxw/del.png" @click="delCollectHandle(item)"/>&nbsp;删除
                  </div>
                </div>
              </div>
              <img class="bgImg" :src="item.boxImg"/>

              <div class="boxBottom">
                <p class="boxName">{{item.title}}</p>

                <p class="boxChakan">
                  <span>
                    <img style="width:.18rem" src="../../assets/image/zxw/chakan.png" alt/>
                    <span>{{item.viewCount}}</span>
                  </span>
                  <span>
                    <img style="width:.16rem" src="../../assets/image/zxw/star.png" alt/>
                    <span>{{item.collectCount}}</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <!--<van-dialog-->
      <!--v-model="delVisible"-->
      <!--title="信息"-->
      <!--show-cancel-button-->
      <!--&gt;-->
      <!--确定要删除吗？-->
      <!--</van-dialog>-->
    </div>
  </div>
</template>

<script>
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    data: function () {
      return {
        delVisible: false,
        timeOutEvent: 0,
        changered: -1,
        active: 0,
        form: {
          userImg: require("../../assets/image/zxw/shop.png"),
          dengjiImg: require("../../assets/image/zxw/nv.png"),
          vipImg: require("../../assets/image/zxw/vipimg.png"),
          userName: "用户昵称",
          dengji: "12",
          fans: "22万",
          guanzhu: "321",
          jianjie: "猫和你都留下～",
          title1: "发帖",
          title2: "收藏",
          title1Number: "222",
          title2Number: "222",
          collect: [],
          box: [
//            {
//              boxImg: require("../../assets/image/zxw/shop.png"),
//              title: "一口好锅的作用",
//              viewCount: 1,
//              collectCount: 23
//            }
          ]
        }
      };
    },
    created: function () {
      if (publicFn.getStore('asxUserInfo')) {
        this.userinfo = JSON.parse(publicFn.getStore('asxUserInfo'));
        this.init();
      }
      else {
        this.$router.push('/Login');
      }
    },
    methods: {
      init: function () {
        this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id};
        //我的帖子列表
        this.myPostList();
        //收藏列表
        this.collectList();
      },
      channelHandle: function (id, name) {
        this.changered = -1;
        if (id == 0) {
          //我的帖子列表
          this.myPostList();
        }
        else {
          //收藏列表
          this.collectList();
        }
      },
      //我的帖子列表
      myPostList: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.myPostList,
          headers: this.headerobj,
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.form.box = _this.exchangeData(e.data.data.list || []);
              _this.form.title1 = "发帖(" + e.data.data.total + ")";
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
      //收藏列表
      collectList: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.collectList,
          headers: this.headerobj,
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.form.collect = _this.exchangeData(e.data.data.list || []);
              _this.form.title2 = "收藏(" + e.data.data.total + ")";
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
      //取消删除
      delCollectHandle: function (row) {
        var _this = this;
        API.request({
          method: "post",
          url: API.cancelCollect,
          headers: this.headerobj,
          data: API.qs.stringify({postId: row.postId})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              API.dialog({message: "删除成功"});
              _this.init();
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
      //删除
      delHandle: function (row) {
        var _this = this;
        API.request({
          method: "post",
          url: API.deleteLtForum,
          headers: this.headerobj,
          data: API.qs.stringify({postId: row.postId})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              API.dialog({message: "删除成功"});
              _this.init();
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
      //获取上一面面传来的active值
      getActive: function () {
        this.active = this.$route.query.active;
      },
      title: function () {
        this.form.title1 = this.form.title1 + "(" + this.form.title1Number + ")";
        this.form.title2 = this.form.title2 + "(" + this.form.title2Number + ")";
      },
      gotouchstart: function (index) {
        var _this = this;
//        clearTimeout(this.timeOutEvent);
//        this.timeOutEvent = 0;
//        this.timeOutEvent = setTimeout(function () {
        _this.changered = index;
//        }, 600);
//        console.log(this.timeOutEvent);
      },
      //手释放，如果在500毫秒内释放，则取消长按事件，此时可以执行onclick应该执行的事件
//      gotouchend: function () {
//        clearTimeout(this.timeOutEvent);
//        console.log(this.timeOutEvent);
//        if (this.timeOutEvent != 0) {
//          //跳转到详情页
//          console.log(1);
//        }
//        return false;
//      },
      //如果手指有移动，则取消所有事件，此使说明用户只是要移动而不是长按
//      gotouchmove: function () {
//        clearTimeout(this.timeOutEvent); //消除定时器
//        this.timeOutEvent = 0;
//        console.log(3);
//      },
      //数据转变
      exchangeData: function (v) {
        for (var i = 0, arr = v; i < arr.length; i++) {
          arr[i].boxImg = "http://qiandian.oss-cn-hangzhou.aliyuncs.com/image/2019-11-29/4efb422d-2b3d-4c79-ac85-a08999f46244.jpg";
          arr[i].collectCount = arr[i].collectCount || 0;
        }
        return arr;
      }
    }
  };
</script>

<style lang="less" scoped>
  .contain {
    .user {
      height: 2rem;
      padding: 0.2rem 0.3rem 0 0.3rem;
      display: flex;
    }
    .userImg {
      width: 1.2rem;
      height: 1.2rem;
      margin-right: 0.2rem;
      .userimg {
        width: 1.2rem;
        height: 1.2rem;
      }
    }
    .userName {
      font-size: 0.36rem;
      height: 0.36rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      display: flex;
      align-items: center;
      img {
        height: 0.36rem;
      }
    }
    .dengji {
      font-size: 0.24rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 0.36rem;
      margin-top: 0.06rem;
      span {
        margin-right: 0.4rem;
      }
    }
  }

  .jianjie {
    font-size: 0.24rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 0.36rem;
    margin-top: 0.06rem;
  }

  .kuai {
    width: 7.5rem;
    height: 0.1rem;
    background-color: #fafafa;
  }

  //切换条样式
  /deep/ .van-tabs {
    .van-tabs__wrap {
      margin-right: 4rem;
    }
    .van-tabs__line {
      background: rgba(224, 18, 32, 0.2);
      height: 0.14rem;
      bottom: 0.5rem;
    }
    .van-tab {
      font-size: 0.26rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 0.88rem;
    }
    .van-tab--active {
      font-size: 0.3rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }
  }

  .bottom {
    .box {
      width: 7.5rem;
      padding-left: 0.3rem;
      box-sizing: border-box;
    }
    .imgBox {
      width: 2.18rem;
      height: 3rem;
      margin-right: 0.18rem;
      margin-bottom: 0.2rem;
      position: relative;
      float: left;
      .bgImg {
        width: 2.18rem;
        height: 3rem;
        position: absolute;
      }
    }
    .boxName {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 0.24rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 0.3rem;
    }
    .boxBottom {
      height: 0.64rem;
      width: 2.18rem;
      padding: 0 0.14rem;
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
    }
    .boxChakan {
      font-size: 0.18rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 0.4rem;
    }
  }

  .del {
    position: absolute;
    font-size: 0.24rem;
    color: #fff;
    background: rgba(224, 18, 32, 1);
    border-radius: 0.24rem;
    display: flex;
    align-items: center;
    padding: 0.1rem 0.2rem;
    margin: 1.2rem 0.46rem;
  }

  .delImg {
    width: 0.28rem;
  }

  .pop {
    width: 2.18rem;
    height: 3rem;
    position: absolute;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.2);
    display: none;
  }

  .red {
    width: 2.18rem;
    height: 3rem;
    position: absolute;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.2);
    display: block;
  }
</style>
