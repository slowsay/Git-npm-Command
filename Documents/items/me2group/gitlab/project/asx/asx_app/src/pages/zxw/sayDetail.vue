<template>
  <div class="sayDetail">
    <div class="top">
      <navbar></navbar>
      <div class="shouye" @click="gohomeHandle"><img src="../../assets/image/zxw/shouye.png"/></div>
    </div>
    <div class="contain">
      <div class="user">
        <div class="userImg">
          <img :src="form.headImage" alt/>
        </div>
        <div class="userName">
          <div>
            <div>{{form.nickName}}</div>
            <div class="vipBox">
              <img src="../../assets/image/zxw/vip.png" alt/>

              <div class="dengji">{{form.vip}}</div>
            </div>
          </div>
          <p class="date">发布于{{form.createTime}}</p>
        </div>
        <button class="btn" v-if="gzbtn==2" @click="attentionHandle">关注</button>
        <button class="btn1" v-if="gzbtn==1" @click="attentionHandle">取消关注</button>
      </div>
      <p class="title">{{form.title}}</p>

      <p class="context">{{form.content}}</p>

      <div class="textImg"><img :src="form.imageUrl"/></div>
      <p class="share">
        <span @click="show=true">
          <img src="../../assets/image/zxw/fx.png" alt/>
          <span style="margin-left:.1rem">{{form.shareCount}}</span>
        </span>
        <span style="margin:.3rem" @click="replayInputHandle(0,form)">
          <img src="../../assets/image/zxw/chatIcon.png" alt/>
          <span style="margin-left:.1rem">{{form.replyCount}}</span>
        </span>
        <img style="margin-left:auto" v-if="form.star==2" @click="collectHandle" src="../../assets/image/zxw/xin.png"
             alt/>
        <img style="margin-left:auto" v-if="form.star==1" @click="collectHandle"
             src="../../assets/image/zxw/hongxin.png"
             alt/>
      </p>
    </div>
    <div class="kuai"></div>
    <div class="bottom">
      <van-tabs v-model="active" color="#000000" title-active-color="#000000" @click="replyListHandle">
        <van-tab title="全部回帖">
          <div class="contain" v-for="(item,index) in data" :key="index">
            <div class="user">
              <div class="userImg">
                <img :src="item.replyHeadImage" alt/>
              </div>
              <div class="userName">
                <div>
                  <div>{{item.replyName}}</div>
                  <div class="vipBox">
                    <img src="../../assets/image/zxw/vip.png" alt/>

                    <div class="dengji">{{item.vip}}</div>
                  </div>
                </div>
                <p class="date">发布于{{item.createTime}}</p>
              </div>
            </div>
            <div style="margin-left:.82rem">
              <p class="context" style="margin-top:.24rem">{{item.content}}</p>

              <div class="textImg1"><img :src="form.imageUrl"/></div>
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
                  <img src="../../assets/image/zxw/fx.png" alt/>
                  <span style="margin-left:.1rem">{{item.shareCount}}</span>
                </span>
                <span style="margin:.3rem" @click="replayInputHandle(1,item)">
                  <img src="../../assets/image/zxw/chatIcon.png" alt/>
                  <span style="margin-left:.1rem">{{item.replyCount}}</span>
                </span>
                <!--<img style="margin-left:auto" v-if="item.xin==1" @click="collectHandle"-->
                <!--src="../../assets/image/zxw/xin.png" alt/>-->
                <!--<img style="margin-left:auto" v-if="item.xin==2" @click="item.xin=1"-->
                <!--src="../../assets/image/zxw/hongxin.png" alt/>-->
              </p>

              <div class="cmt" v-if="item.cmt==true">
                <p v-for="(item1,indexs) in data[index].ltForumLzlReplies" :key="indexs">
                  <span style="color:#E01220" v-if="item1.status==1" @click="replayInputHandle(1,item1)">{{item1.replyName}}:</span>
                  <span v-else @click="replayInputHandle(1,item1)">
                    <span style="color:#E01220">{{item1.replyName}}</span>
                    回复
                    <span style="color:#E01220">{{item1.toReplyName}}：</span>
                  </span>
                  <span @click="replayInputHandle(1,item1)">{{item1.content}}</span>
                </p>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="只看楼主">
          <div class="contain" v-for="(item,index) in mdata" :key="index">
            <div class="user">
              <div class="userImg">
                <img :src="item.replyHeadImage" alt/>
              </div>
              <div class="userName">
                <div>
                  <div>{{item.replyName}}</div>
                  <div class="vipBox">
                    <img src="../../assets/image/zxw/vip.png" alt/>

                    <div class="dengji">{{item.vip}}</div>
                  </div>
                </div>
                <p class="date">发布于{{item.createTime}}</p>
              </div>
            </div>

            <div style="margin-left:.82rem">
              <p class="context" style="margin-top:.24rem">{{item.context}}</p>

              <div class="textImg1"><img :src="form.imageUrl"/></div>
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
                <p v-for="(item1,indexs) in data[index].ltForumLzlReplies" :key="indexs">
                  <span style="color:#E01220" v-if="item1.status==1" @click="replayInputHandle(1,item1)">{{item1.replyName}}:</span>
                  <span v-else @click="replayInputHandle(1,item1)">
                    <span style="color:#E01220">{{item1.replyName}}</span>
                    回复
                    <span style="color:#E01220">{{item1.toReplyName}}：</span>
                  </span>
                  <span @click="replayInputHandle(1,item1)">{{item1.content}}</span>
                </p>
              </div>
              <p class="share">
                <span @click="show=true">
                  <img src="../../assets/image/zxw/fx.png" alt/>
                  <span style="margin-left:.1rem">{{item.shareCount}}</span>
                </span>
                <span style="margin:.3rem">
                  <img src="../../assets/image/zxw/chatIcon.png" @click="replayInputHandle(1,item)" alt/>
                  <span style="margin-left:.1rem">{{item.replyCount}}</span>
                </span>
                <!--<img style="margin-left:auto" v-if="item.xin==1" @click="item.xin=2"-->
                <!--src="../../assets/image/zxw/xin.png" alt/>-->
                <!--<img style="margin-left:auto" v-if="item.xin==2" @click="item.xin=1"-->
                <!--src="../../assets/image/zxw/hongxin.png" alt/>-->
              </p>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="bottomh"></div>
    <div class="input" v-if="sendflag">
      <van-field v-model="sendcon" :placeholder="sendplaceholder"/>
      <div class="issue">
        <van-button type="default" @click="issueHandle">发表</van-button>
      </div>
    </div>
    <div class="pop">
      <van-popup v-model="show" position="bottom" :style="{ height: '4.28rem' }">
        <div class="popTop">
          <p class="popTitle">分享至</p>

          <div class="popShare">
            <div class="popBox">
              <div class="popicon">
                <img src="../../assets/image/zxw/haoyou.png" alt/>
              </div>
              <p class="friend">好友</p>
            </div>
            <div class="popBox">
              <div class="popicon">
                <img src="../../assets/image/zxw/wx.png" alt/>
              </div>
              <p class="friend">微信</p>
            </div>
            <div class="popBox">
              <div class="popicon">
                <img src="../../assets/image/zxw/qq.png" alt/>
              </div>
              <p class="friend">QQ</p>
            </div>
            <div class="popBox">
              <div class="popicon">
                <img src="../../assets/image/zxw/link.png" alt/>
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
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    data: function () {
      return {
        show: false,
        sendflag: false,
        sendplaceholder: '说说你的看法...',
        replywho: 0,
        replywhoData: {},
        gzbtn: 1,
        active: 0,
        sendcon: "",
        form: {
//          nickName:'',
//          headImage: require("../../assets/image/zxw/user.png"),
//          createTime: "20分钟前/7月21日 14:00",
//          vip: "3",
//          title: "这是帖子标题",
//          content: "这是帖子被贺卡收到flask活动反馈回来",
//          viewCount: "222",
//          replyCount: "234",
//          star: 1,
        },
        mdata: [],
        data: [
//          {
//            replyName: '',
//            userImg: require("../../assets/image/zxw/user.png"),
//            createTime: "20分钟前/7月21日 14:00",
//            vip: "3",
//            title: "这是帖子标题",
//            content: "这是帖子被贺卡收到flask活动反馈回来",
//            shareNumber: "222",
//            messageNumber: "234",
//            cmt: true,
//            toupiao: false,
//            xin: 1,
//            ltForumLzlReplies: [
//              {
//                replyName: "哇哈哈",
//                status: 1,
//                content: 'test'
//              },
//              {
//                status: 2,
//                replyName: "行天下",
//                toReplyName: "曾加简",
//                content: 'test2'
//              }
//            ]
//          },
//          {
//            userImg: require("../../assets/image/zxw/user.png"),
//            date: "20分钟前/7月21日 14:00",
//            vip: "3",
//            title: "这是帖子标题",
//            context: "这是帖子被贺卡收到flask活动反馈回来",
//            shareNumber: "222",
//            messageNumber: "234",
//            cmt: false,
//            toupiao: true,
//            xin: 1,
//            toupiaoData: [
//              {
//                name: "喜不喜欢",
//                btn: 0
//              },
//              {
//                name: "喜不喜欢",
//                btn: 1
//              },
//              {
//                name: "喜不喜欢",
//                btn: 1
//              }
//            ]
//          }
        ]
      };
    },
    created: function () {
      if (publicFn.getStore("asxUserInfo")) {
        this.userinfo = JSON.parse(publicFn.getStore("asxUserInfo"));
      }
      else {
        this.userinfo = {token: "asxtoken", id: '1'};
      }
      this.init();
    },
    methods: {
      init: function () {
        this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id};
        this.sendcon = '';
        //根据帖子id查询帖子详情
        this.addViewsAndMessage();

        //查询回复信息
        this.replyList();
      },
      gohomeHandle: function () {
        this.$router.push('/Home');
      },
      replayInputHandle: function (id, row) {
        this.replywho = id;
        this.replywhoData = row;
        this.sendflag = true;
        if (id == 0) {
          //对帖子
          this.sendplaceholder = '评论:';
        }
        else {
          //对回帖人
          this.sendplaceholder = '回复' + row.replyName + ':';
        }
      },
      attentionHandle: function () {
        if (this.gzbtn == 1) {
          //取消关注
          this.gzbtn = 2;
          this.cancelFocus();
        }
        else {
          //关注
          this.gzbtn = 1;
          this.addFocus();
        }
      },
      collectHandle: function () {
        if (this.form.star == 2) {
          //收藏
          this.form.star = 1;
          this.addCollect();
        }
        else {
          //取消收藏
          this.form.star = 2;
          this.cancelCollect();
        }
      },
      //添加关注
      addFocus: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.addFocus,
          headers: this.headerobj,
          data: API.qs.stringify({focusUserId: this.form.uid})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
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
      //取消关注
      cancelFocus: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.cancelFocus,
          headers: this.headerobj,
          data: API.qs.stringify({focusUserId: this.form.uid})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
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
      //收藏
      addCollect: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.addCollect,
          headers: this.headerobj,
          data: API.qs.stringify({postId: this.$route.query.id})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
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
      //取消收藏
      cancelCollect: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.cancelCollect,
          headers: this.headerobj,
          data: API.qs.stringify({postId: this.$route.query.id})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
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
      //切换标签-全部回帖/只看楼主
      replyListHandle: function (id, name) {
        this.sendplaceholder = '';
        this.sendflag = false;
        if (id == 0) {
          //查询回复信息
          this.replyList();
        }
        else {
          //只看楼主
          this.onlyFloorUser();
        }
      },
      //发表
      issueHandle: function () {
        var _this = this, _sendcon = this.sendcon;
        if (this.replywho == 0) {
          //对当前帖子评论
          if (_sendcon) {
            this.reply(_sendcon);
          }
          else {
            API.dialog({message: API.msg.ERROR_SENDMSG});
          }
        }
        else {
          //对用户评论
          if (_sendcon) {
            //楼中楼回复
            this.lzlReply(_sendcon);
          }
          else {
            API.dialog({message: API.msg.ERROR_SENDMSG});
          }
        }
      },
      //楼中楼回复
      lzlReply: function (con) {
        var _this = this;
        var row = this.replywhoData;
        var params = {
          postId: this.$route.query.id,
          content: con,
          toFReplyId: row.toFReplyId,
          toReplyId: row.toReplyId,
          uid: row.uid
        };
        API.request({
          method: "post",
          url: API.reply,
          headers: this.headerobj,
          data: API.qs.stringify(params)
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.sendflag = false;
              _this.init();
              _this.onlyFloorUser();
              API.dialog({message: "发表成功"});
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
      //对当前帖子评论
      reply: function (con) {
        var _this = this;
        API.request({
          method: "post",
          url: API.reply,
          headers: this.headerobj,
          data: API.qs.stringify({postId: this.$route.query.id, content: con})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.sendflag = false;
              _this.init();
              _this.onlyFloorUser();
              API.dialog({message: "发表成功"});
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
      //只看楼主
      onlyFloorUser: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.onlyFloorUser,
          headers: this.headerobj,
          data: API.qs.stringify({postId: this.$route.query.id})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.mdata = _this.exchangeData(e.data.data || []);
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
      //查询回复信息
      replyList: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.replyList,
          headers: this.headerobj,
          data: API.qs.stringify({postId: this.$route.query.id})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.data = _this.exchangeData(e.data.data.list);
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
      //根据帖子id查询帖子详情
      addViewsAndMessage: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.addViewsAndMessage,
          headers: this.headerobj,
          data: API.qs.stringify({postId: this.$route.query.id})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.form = _this.exchangeSingle(e.data.data);
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
      //详细数据转换
      exchangeSingle: function (v) {
        v.headImage = "http://qiandian.oss-cn-hangzhou.aliyuncs.com/image/2019-11-29/4efb422d-2b3d-4c79-ac85-a08999f46244.jpg";
        v.imageUrl = v.imageUrl || "http://qiandian.oss-cn-hangzhou.aliyuncs.com/image/2019-11-29/4efb422d-2b3d-4c79-ac85-a08999f46244.jpg";
        v.ltPostVotes = v.ltPostVotes || 0;
        v.shareCount = v.shareCount || 0;
        this.gzbtn = v.isFocus || 2;//1，已关注，2，未关注
        v.uid = v.uid || this.userinfo.id;
        v.star = v.isCollect || 2;//1,收藏,2,未收藏
        return v;
      },
      //列表数据转换
      exchangeSubData: function (v) {
        for (var i = 0, arr = v; i < arr.length; i++) {
          arr[i].status = arr[i].status || 2;
          arr[i].replyName = arr[i].replyName || "小李";
          arr[i].toReplyName = arr[i].toReplyName || "小王";
          arr[i].content = arr[i].content || "什么啊";
        }
        return arr;
      },
      //数据转变
      exchangeData: function (v) {
        for (var i = 0, arr = v; i < arr.length; i++) {
          arr[i].cmt = arr[i].cmt || true;
          arr[i].shareCount = arr[i].shareCount || 0;
          arr[i].replyCount = arr[i].replyCount || 0;
          arr[i].imageUrl = arr[i].imageUrl || "http://qiandian.oss-cn-hangzhou.aliyuncs.com/image/2019-11-29/4efb422d-2b3d-4c79-ac85-a08999f46244.jpg";
          arr[i].ltForumLzlReplies = this.exchangeSubData(arr[i].ltForumLzlReplies || []);
          arr[i].replyHeadImage = "http://qiandian.oss-cn-hangzhou.aliyuncs.com/image/2019-11-29/4efb422d-2b3d-4c79-ac85-a08999f46244.jpg";
          arr[i].createTime = publicFn.dateFormat(arr[i].createTime);
        }
        return arr;
      }
    }
  }
  ;
</script>
<style lang="less" scoped>
  .top {
    .shouye {
      width: 0.41rem;
      height: 0.42rem;
      position: absolute;
      right: 0;
      z-index: 11111;
      margin: -0.64rem 0.3rem 0 0;
    }
    .shouye img {
      width: 0.41rem;
      height: 0.42rem;
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

  .btn1 {
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
    overflow: hidden;
  }

  .textImg1 {
    width: 6.08rem;
    height: 3.43rem;
    background-color: #ccc;
    margin-top: 0.3rem;
    overflow: hidden;;
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

  /deep/ .van-tabs {
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
    .issue {
      position: absolute;
      top: 0;
      right: 0rem;
    }
  }

  .kuai {
    width: 7.5rem;
    height: 0.1rem;
    background: rgba(250, 250, 250, 1);
  }

  .pop {
    .van-popup {
      background-color: rgba(0, 0, 0, 0);

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
    .popShare {
      display: flex;
      justify-content: space-between;
      margin-top: .3rem;
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

  .bottomh {
    height: 2rem
  }

  .popBottom {
    width: 6.9rem;
    height: .98rem;
    background: rgba(255, 255, 255, 1);
    border-radius: .2rem;
    margin: .2rem .3rem .25rem .3rem;
  }

  .cancel {
    line-height: .98rem;
    text-align: center;
    font-size: .28rem;
    font-family: PingFang SC;
    font-weight: 300;
    color: rgba(51, 51, 51, 1)
  }
</style>
