<template>
  <div class="base">
    <div class="details">
      <div class="lefts">
        <!-- 左边 图片 -->
        <div class="image">
          <img :src="content.pic" class="sp"/>
          <!--<video :src="content.video"  class="play"/>-->
        </div>
        <!-- 收藏分享 -->
        <div class="spon">
          <p class="name">{{content.title}}</p>

          <div class="btn">
            <p v-if="!state" @click="saveBtn">收藏</p>

            <p v-else style="background:#D9D9D9" @click="saveBtn">已收藏</p>

            <p>分享</p>
          </div>
        </div>
        <!-- 发布时间 -->
        <div class="time">
          <p class="day">发布时间：{{content.createTime}}</p>

          <div class="cyc">
            <div class="right" @click="zanHandle">
              <img src="../../assets/image/zch/details/3x.png" v-if="!islike"/>
              <img src="../../assets/image/zch/details/x.png" v-else/>

              <p>{{content.prizeCount}}</p>
            </div>
            <div class="right">
              <img src="../../assets/image/zch/details/mes.png"/>

              <p>{{content.replyCount}}</p>
            </div>
            <div class="right" @click="saveBtn">
              <img src="../../assets/image/zch/details/start.png" v-if="!state"/>
              <img src="../../assets/image/zch/details/redstart.png" v-else/>

              <p>{{content.collectCount}}</p>
            </div>
          </div>
        </div>
        <div class="con">
          <p v-html="content.content"></p>
        </div>
        <!-- 发表评论 -->
        <div class="cric">
          <div class="poto">
            <img src="../../assets/image/zch/details/sp.png" alt/>
          </div>
          <div class="inputbox">
            <input type="text" v-if="vip<2" :disabled="true" placeholder="您的等级不足LV2，需升级至LV2"/>
            <input type="text" v-if="vip>=2" v-model="inputComment" placeholder="请输入你要发表的内容"/>
            <!--<img src="../../assets/image/zch/details/bq.png" alt/>-->
          </div>
          <p class="btn" @click="commentHandle">发表评论</p>
        </div>
        <!-- 帖子展示 -->
        <div class="post_show">
          <p class="title">帖子评论</p>

          <div class="black">
            <div class="borders">
              <div class="post" v-for="(items,i) of post_show" :key="i">
                <div class="top">
                  <div class="left">
                    <div class="images">
                      <img :src="items.headImage" alt/>
                    </div>
                    <div class="time_out">
                      <h4 class="name">{{items.nickName}}</h4>

                      <p class="times">{{items.createTime}}</p>
                    </div>
                  </div>
                  <div class="right">
                    <img src="../../assets/image/zch/details/dz.png" alt class="dz" @click="swipers(items)"
                         v-if="!items.isAgreed"/>
                    <img src="../../assets/image/zch/details/dzx.png" alt class="dz" @click="swipers(items)" v-else/>

                    <p class="number">{{items.agreeCount}}</p>
                  </div>
                </div>
                <div class="text">
                  <p>{{items.content}}</p>

                  <!--<div class="back">-->
                  <!--<div class="round" v-for="(item,j) of items.tow" :key="j">-->
                  <!--<div class="top">-->
                  <!--<div class="left">-->
                  <!--<div class="images">-->
                  <!--<img :src="item.sp" alt/>-->
                  <!--</div>-->
                  <!--<div class="time_out">-->
                  <!--<h4 class="name">{{item.nickName}}</h4>-->

                  <!--<p class="times">{{item.createTime}}</p>-->
                  <!--</div>-->
                  <!--</div>-->
                  <!--<div class="right" @click="swipers(item)">-->
                  <!--<img src="../../assets/image/zch/details/dz.png" alt class="dz" @click="swipers(items)"-->
                  <!--v-if="!items.isAgreed"/>-->
                  <!--<img src="../../assets/image/zch/details/dzx.png" alt class="dz" @click="swipers(items)"-->
                  <!--v-else/>-->

                  <!--<p class="number">{{item.number}}</p>-->
                  <!--</div>-->
                  <!--</div>-->
                  <!--<div class="text">-->
                  <!--<p>回复</p>-->

                  <!--<p>{{item.reply}}</p>-->

                  <!--<p>{{item.wz}}</p>-->
                  <!--</div>-->
                  <!--</div>-->
                  <!--</div>-->
                </div>
              </div>
            </div>
            <div class="limit">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="pageindex"
                :page-size="pagesize"
                layout="prev, pager, next, jumper"
                :total="pagecount"
              ></el-pagination>
            </div>
            <div class="cric">
              <div class="poto">
                <img src="../../assets/image/zch/details/sp.png" alt/>
              </div>
              <div class="inputbox">
                <input type="text" v-model="inputComment" placeholder="请输入你要发表的内容"/>
                <!--<img src="../../assets/image/zch/details/bq.png" alt/>-->
              </div>
              <p class="btn" @click="commentHandle">发表评论</p>
            </div>
          </div>
        </div>
      </div>
      <div class="rights">
        <div class="floor">
          <p class="title">楼主详情</p>

          <div class="mess">
            <div class="image">
              <img :src="mess.headImage"/>
            </div>
            <div class="wz">
              <p class="name">{{mess.nickName}}</p>

              <p class="grade">{{mess.level}}</p>

              <div class="focus" v-if="!mess.isAttention" @click="guanzhuHandle">
                <img src="../../assets/image/zch/details/jia.png"/>

                <p>关注</p>
              </div>
              <div style="background-color:#9b9b9b" class="focus" v-else @click="guanzhuHandle">
                <p>已关注</p>
              </div>
            </div>
          </div>
          <div class="buttom">
            <div class="trol">
              <p class="text">发布</p>

              <p class="num">{{mess.pubNum}}</p>
            </div>
            <div class="trol">
              <p class="text">收藏</p>

              <p class="num">{{mess.collectNum}}</p>
            </div>
            <div class="trol">
              <p class="text">赞过</p>

              <p class="num">{{mess.prizeNum}}</p>
            </div>
          </div>
        </div>
        <div class="letter">
          <p class="title">相关推荐</p>

          <div class="content">
            <div class="tent" v-for="(item,index) of tent" :key="index">
              <div class="image">
                <img :src="item.pic" alt/>
              </div>
              <div class="wz">
                <p class="titles">{{item.title}}</p>

                <div class="dz" @click="likesHandle(item)">
                  <img v-if="item.isUp==1" src="../../assets/image/zch/details/3x.png"/>
                  <img v-else src="../../assets/image/zch/details/x.png"/>

                  <p class="num">{{item.upNum}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="btn">
            <p @click="moreHandle">查看更多</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    data: function () {
      return {
        vip: 2,
        currentPage: null,
        inputComment: '',
        pageindex: 1,
        pagecount: 1,
        pagesize: 10,
        //收藏状态
        state: false,
        //喜欢状态
        islike: false,
        //内容
        content: {
          pic: require("../../assets/image/zch/details/sp.png"),
          video: require("../../assets/image/zch/details/play.png"),
          title: "",
        },
        // 时间
        time: {
          day: "07-23",

        },
//        right: [
//          {
//            no: require("../../assets/image/zch/details/3x.png"),
//            num: 889
//          },
//          {
//            no: require("../../assets/image/zch/details/mes.png"),
//            num: 889
//          },
//          {
//            no: require("../../assets/image/zch/details/start.png"),
//            num: 889
//          }
//        ],
        // 帖子评论
        post_show: [
          {
            sp: require("../../assets/image/zch/details/sp.png"),
            name: "张三丰",
            times: "2019-07-30",
            show: false,
            number: 98988,
            wz: "要是是我做，估计是边做边吃哈哈哈哈。",
//            tow: [
//              {
//                sp: require("../../assets/image/zch/details/sp.png"),
//                name: "张三丰",
//                times: "2019-07-30",
//                show: false,
//                dz: require("../../assets/image/zch/details/dz.png"),
//                dzx: require("../../assets/image/zch/details/dzx.png"),
//                number: 98988,
//                reply: "222",
//                wz: "哈哈哈"
//              },
//            ]
          },
        ],
        mess: {
          sp: require("../../assets/image/zch/details/sp.png"),
          name: "不会飞的发福蝶",
          grade: "12级",
          jia: require("../../assets/image/zch/details/jia.png"),
          isAttention: false,
        },
        tent: [
//          {
//            sp: require("../../assets/image/zch/details/sp.png"),
//            titles: "每日穿搭不重样，小清新穿搭",
//            no: require("../../assets/image/zch/details/3x.png"),
//            yes: require("../../assets/image/zch/details/x.png"),
//            num: 886,
//            state: 1
//
//          },
        ]
      };
    },
    created: function () {
      if (publicFn.getStore("qluserInfo")) {
        this.userinfo = JSON.parse(publicFn.getStore("qluserInfo"));
      }
      else {
        this.userinfo = {token: "qltoken", id: '1'};
      }
      this.init();
    },
    methods: {
      init: function () {
        this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id};
        this.inputComment = ''
        //帖子基本详情
        this.postingDesc();
        //帖子回复列表
        this.replyList();
        //相关推荐
        this.reltives();
      },
      //点赞
      zanHandle: function () {
        if (this.islike) {
          //取消喜欢
          this.agreePosting(2);
          this.islike = false;
        } else {
          //喜欢
          this.agreePosting(1);
          this.islike = true;
        }
      },
      //调用点赞接口
      agreePosting: function (v) {
        var _this = this;
        API.request({
          method: "post",
          url: API.agreePosting,
          headers: this.headerobj,
          data: API.qs.stringify({postingId: this.$route.query.id, toward: v})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success(v == 1 ? '点赞成功' : '取消点赞');
              _this.init();
            }
            else {
              _this.$message.error(JSON.stringify(e.data.msg));
            }
          }
          else {
            _this.$message.error(JSON.stringify(e.data.msg));
          }

        }).catch(function (e) {
          _this.$message.error(JSON.stringify(e));
        })
      },
      //帖子回复列表
      replyList: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.replyList,
          headers: this.headerobj,
          data: API.qs.stringify({postingId: this.$route.query.id, page: this.pageindex, num: this.pagesize})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.post_show = _this.exchangePostData(e.data.data || []);
            }
            else {
              _this.$message.error(JSON.stringify(e.data.msg));
            }
          }
          else {
            _this.$message.error(JSON.stringify(e.data.msg));
          }

        }).catch(function (e) {
          _this.$message.error(JSON.stringify(e));
        })
      },
      //帖子基本详情
      postingDesc: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.postingDesc,
          headers: this.headerobj,
          data: API.qs.stringify({postingId: this.$route.query.id})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.content = _this.exchangeData(e.data.data || []);
              _this.mess = _this.exchangeSubData(e.data.data.poster);
              _this.islike = e.data.data.isUp == 1 ? false : true;
              _this.state = e.data.data.isCollect == 1 ? false : true;
            }
            else {
              _this.$message.error(JSON.stringify(e.data.msg));
            }
          }
          else {
            _this.$message.error(JSON.stringify(e.data.msg));
          }

        }).catch(function (e) {
          _this.$message.error(JSON.stringify(e));
        })
      },
      //对贴子进行点赞
      swipers: function (val) {
        if (val.isAgreed == false) {
          //对评论点赞
          this.agreePostingEval(val.id, 1);
          val.isAgreed = true;
        } else {
          //对评论取消点赞
          this.agreePostingEval(val.id, 2);
          val.isAgreed = false;
        }
      },
      //帖子基本详情
      agreePostingEval: function (id, v) {
        var _this = this;
        API.request({
          method: "post",
          url: API.agreePostingEval,
          headers: this.headerobj,
          data: API.qs.stringify({evalId: id, toward: v})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success(v == 1 ? '点赞成功' : '取消点赞');
              _this.init();
            }
            else {
              _this.$message.error(JSON.stringify(e.data.msg));
            }
          }
          else {
            _this.$message.error(JSON.stringify(e.data.msg));
          }

        }).catch(function (e) {
          _this.$message.error(JSON.stringify(e));
        })
      },
      handleSizeChange: function (val) {
        this.pagesize = val;
      },
      handleCurrentChange: function (val) {
        this.pageindex = val;
      },
      //查看更多
      moreHandle: function () {
        this.$router.push('/index');
      },
      //发表评论
      commentHandle: function () {
//        if (this.vip >= 2) {
        if (this.inputComment == '') {
          this.$message.error('请输入评论内容');
        }
        else {
          this.evalOnePosting(this.inputComment);
        }
//        } else {
//          this.$message.error({message: '请将等级升级到vip2才能评论', type: 'warning'});
//        }
      },
      //针对一个帖子发布一条评论
      evalOnePosting: function (con) {
        var _this = this;
        API.request({
          method: "post",
          url: API.evalOnePosting,
          headers: this.headerobj,
          data: API.qs.stringify({postingId: this.$route.query.id, evalDesc: con})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success("发表成功");
              _this.init();
            }
            else {
              _this.$message.error(JSON.stringify(e.data.msg));
            }
          }
          else {
            _this.$message.error(JSON.stringify(e.data.msg));
          }

        }).catch(function (e) {
          _this.$message.error(JSON.stringify(e));
        })
      },
      //点击关注时进行切换
      guanzhuHandle: function () {
        if (this.mess.isAttention == false) {
          //关注
          this.concernBlogger(1);
          this.mess.isAttention = true
        }
        else {
          //取消关注
          this.concernBlogger(2);
          this.mess.isAttention = false;
        }
      },
      //相关推荐
      reltives: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.reltives,
          headers: this.headerobj,
          data: API.qs.stringify({page: this.pageindex, num: this.pagesize})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.tent = e.data.data;
            }
            else {
              _this.$message.error(JSON.stringify(e.data.msg));
            }
          }
          else {
            _this.$message.error(JSON.stringify(e.data.msg));
          }

        }).catch(function (e) {
          _this.$message.error(JSON.stringify(e));
        })
      },
      //关注帖主
      concernBlogger: function (v) {
        var _this = this;
        API.request({
          method: "post",
          url: API.wconcernBlogger,
          headers: this.headerobj,
          data: API.qs.stringify({bloggerId: this.mess.uid, attitude: v})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success(v == 1 ? '关注成功' : '取消关注');
              _this.init();
            }
            else {
              _this.$message.error(JSON.stringify(e.data.msg));
            }
          }
          else {
            _this.$message.error(JSON.stringify(e.data.msg));
          }

        }).catch(function (e) {
          _this.$message.error(JSON.stringify(e));
        })
      },
      //点击相关推荐中的收藏选项
      likesHandle: function (row) {
        if (row.isUp == 2) {
          //点赞
          this.agreePostingEval(row.id, 1);
        } else {
          //取消点赞
          this.agreePostingEval(row.id, 2);
        }
      },
      //点击收藏按钮
      saveBtn: function () {
        if (this.state == false) {
          //收藏
          this.collectPosting(1);
          this.state = true;
        }
        else {
          //取消收藏
          this.collectPosting(2);
          this.state = false;

        }
      },
      //收藏/取消收藏帖子
      collectPosting: function (v) {
        var _this = this;
        API.request({
          method: "post",
          url: API.collectPosting,
          headers: this.headerobj,
          data: API.qs.stringify({postingId: this.$route.query.id, toward: v})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success(v == 1 ? '收藏成功' : '取消收藏');
              _this.init();
            }
            else {
              _this.$message.error(JSON.stringify(e.data.msg));
            }
          }
          else {
            _this.$message.error(JSON.stringify(e.data.msg));
          }

        }).catch(function (e) {
          _this.$message.error(JSON.stringify(e));
        })
      },
      exchangeSubData: function (v) {
        v.isAttention = v.isAttention == 1 ? false : true;
        return v;
      },
      exchangePostData: function (v) {
        for (var i = 0, arr = v; i < arr.length; i++) {
          arr[i].isAgreed = arr[i].isAgreed == 1 ? false : true;
        }
        return arr;
      },
      //数据转换
      exchangeData: function (v) {
        for (var i = 0, arr = v; i < arr.length; i++) {
          arr[i].createTime = publicFn.dateFormat(arr[i].createTime);
        }
        return arr;
      }
    }
  };
</script>

<style lang="less" scoped>
  .base {
    position: relative;
    .details {
      padding-top: 20px;
      padding-bottom: 60px;
      width: 1280px;
      margin: auto;
      display: flex;
      justify-content: space-between;
      .lefts {
        width: 882px;
        .image {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          .sp {
            width: 100%;
          }
          .play {
            position: absolute;
            width: 92px;
            height: 92px;
          }
        }
        .spon {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          .name {
            font-size: 28px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
            line-height: 40px;
          }
          .btn {
            display: flex;
            p {
              font-size: 17px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              line-height: 25px;
              width: 87px;
              height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            p:first-child {
              color: rgba(255, 255, 255, 1);
              background: rgba(255, 148, 148, 1);
              margin-right: 20px;
            }
            p:last-child {
              color: rgba(155, 155, 155, 1);
              border: 1px solid rgba(151, 151, 151, 1);
              box-sizing: border-box;
            }
          }
        }
        .time {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 36px;
          .day {
            font-size: 24px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(74, 74, 74, 1);
            line-height: 33px;
          }
          .cyc {
            display: flex;
            align-items: center;
            .right {
              display: flex;
              align-items: center;
              p {
                font-size: 24px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(74, 74, 74, 1);
                line-height: 33px;
              }
            }
            .right:first-child {
              margin-right: 60px;
              img {
                width: 26px;
                height: 25px;
              }
            }
            .right:nth-child(2) {
              margin-right: 60px;
              img {
                width: 24px;
                height: 24px;
              }
            }
            .right:nth-child(3) {
              img {
                width: 24px;
                height: 24px;
              }
            }
          }
        }
        .cric {
          margin-top: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .poto {
            img {
              width: 60px;
              height: 60px;
              border-radius: 50%;
            }
          }
          .inputbox {
            display: flex;
            align-items: center;
            width: 70%;
            position: relative;
            input {
              height: 60px;
              width: 100%;
              font-size: 20px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(74, 74, 74, 1);
              line-height: 28px;
              padding-left: 10px;
              padding-right: 50px;
              outline: 0;
              border-radius: 4px;
              border: 0;
              border-radius: 10px;
              border: 1px solid rgba(155, 155, 155, 1);
              background: transparent;
            }

            input::-webkit-input-placeholder {
              text-align: center;
            }
            img {
              width: 33px;
              height: 33px;
              position: absolute;
              right: 13px;
            }
          }
          .btn {
            font-size: 22px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(74, 74, 74, 1);
            line-height: 38px;
            border-radius: 10px;
            border: 1px solid rgba(155, 155, 155, 1);
            padding: 4px 14px;
          }
        }
        .post_show {
          margin-top: 64px;
          .title {
            font-size: 32px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(74, 74, 74, 1);
            border-left: 6px solid rgba(255, 148, 148, 1);
            padding-left: 30px;
          }
          .black {
            margin-top: 20px;
            background: #fff;
            border-radius: 10px;
            padding: 29px;
            div.post:not(:first-child) {
              margin-top: 30px;
            }
            .borders {
              .post:last-child {
                border-bottom: 1px solid #f5f5f5;
                padding-bottom: 30px;
              }
            }
            .post {
              .top {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                .left {
                  display: flex;
                  align-items: center;
                  .images {
                    img {
                      width: 60px;
                      height: 60px;
                      border-radius: 50%;
                    }
                  }
                  .time_out {
                    margin-left: 15px;
                    .name {
                      font-size: 28px;
                      font-family: PingFangSC-Regular, PingFang SC;
                      font-weight: 400;
                      color: rgba(74, 74, 74, 1);
                      line-height: 40px;
                    }
                    .times {
                      font-size: 18px;
                      font-family: PingFangSC-Regular, PingFang SC;
                      font-weight: 400;
                      color: rgba(155, 155, 155, 1);
                      line-height: 25px;
                    }
                  }
                }
                .right {
                  display: flex;
                  align-items: center;
                  .dz {
                    width: 19px;
                    height: 20px;
                    margin-right: 3px;
                  }
                  .number {
                    font-size: 20px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(74, 74, 74, 1);
                    line-height: 28px;
                  }
                }
              }
              .text {
                margin-left: 70px;
                margin-top: 10px;
                p {
                  font-size: 28px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: rgba(74, 74, 74, 1);
                  line-height: 40px;
                }
                .back {
                  margin-top: 29px;
                  background: rgba(245, 245, 245, 1);
                  border-radius: 10px;
                  padding: 15px;
                  .round:not(:first-child) {
                    margin-top: 30px;
                  }
                  .top {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    .left {
                      display: flex;
                      align-items: center;
                      .images {
                        img {
                          width: 60px;
                          height: 60px;
                          border-radius: 50%;
                        }
                      }
                      .time_out {
                        margin-left: 15px;
                        .name {
                          font-size: 24px;
                          font-family: PingFangSC-Regular, PingFang SC;
                          font-weight: 400;
                          color: rgba(74, 74, 74, 1);
                          line-height: 40px;
                        }
                        .times {
                          font-size: 16px;
                          font-family: PingFangSC-Regular, PingFang SC;
                          font-weight: 400;
                          color: rgba(155, 155, 155, 1);
                          line-height: 25px;
                        }
                      }
                    }
                    .right {
                      display: flex;
                      align-items: center;
                      .dz {
                        width: 19px;
                        height: 20px;
                        margin-right: 3px;
                      }
                      .number {
                        font-size: 20px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: rgba(74, 74, 74, 1);
                        line-height: 28px;
                      }
                    }
                  }
                  .text {
                    display: flex;
                    align-items: center;
                    p {
                      font-size: 22px;
                      font-family: PingFangSC-Regular, PingFang SC;
                      font-weight: 400;
                      color: rgba(74, 74, 74, 1);
                      line-height: 30px;
                    }
                    p:nth-child(2) {
                      color: rgba(255, 148, 148, 1);
                    }
                  }
                }
              }
            }
          }
          .limit {
            margin-top: 15px;
          }
        }
      }
      .rights {
        width: 370px;
        .floor {
          background: #fff;
          border-radius: 10px;
          .title {
            font-size: 22px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(74, 74, 74, 1);
            line-height: 30px;
            padding: 20px 30px;
            border-bottom: 1px solid #f5f5f5;
          }
          .mess {
            display: flex;
            margin-top: 10px;
            padding: 0 30px 10px;

            border-bottom: 1px solid #f5f5f5;
            .image {
              img {
                width: 104px;
                height: 100px;
              }
            }
            .wz {
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              margin-left: 18px;
              .name {
                font-size: 18px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(74, 74, 74, 1);
                line-height: 25px;
              }
              .grade {
                font-size: 18px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(74, 74, 74, 1);
                line-height: 25px;
              }
              .focus {
                display: flex;
                align-items: center;
                background: rgba(255, 148, 148, 1);
                border-radius: 6px;
                /*width: 55%;*/
                justify-content: center;
                padding: 3px;
                img {
                  width: 19px;
                  height: 19px;
                }
                p {
                  font-size: 16px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: rgba(255, 255, 255, 1);
                  line-height: 22px;
                  margin-left: 3px;
                }
              }
            }
          }
          .buttom {
            display: flex;
            justify-content: space-around;
            margin-top: 10px;
            padding-bottom: 10px;
            .trol {
              display: flex;
              flex-direction: column;
              align-items: center;
              .text {
                font-size: 18px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(130, 130, 130, 1);
                line-height: 25px;
              }
              .num {
                font-size: 24px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(74, 74, 74, 1);
                line-height: 33px;
              }
            }
          }
        }
        .letter {
          background: #fff;
          border-radius: 10px;
          margin-top: 30px;
          position: relative;
          .title {
            font-size: 22px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(74, 74, 74, 1);
            line-height: 30px;
            padding: 20px 30px;
            border-bottom: 1px solid #f5f5f5;
          }
          .content {
            .tent {
              display: flex;
              padding: 0 30px;
              margin-top: 15px;
              .image {
                img {
                  width: 100px;
                  height: 100px;
                }
              }
              .wz {
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .titles {
                  font-size: 22px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: rgba(74, 74, 74, 1);
                  line-height: 30px;
                }
                .dz {
                  display: flex;
                  align-items: center;
                  img {
                    width: 22px;
                    height: 20px;
                  }
                  .num {
                    font-size: 24px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(74, 74, 74, 1);
                    line-height: 33px;
                    margin-left: 5px;
                  }
                }
              }
            }
          }
          .btn {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 60px;
            p {
              font-size: 22px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(74, 74, 74, 1);
              line-height: 30px;
            }
          }
        }
      }
    }
  }
</style>
