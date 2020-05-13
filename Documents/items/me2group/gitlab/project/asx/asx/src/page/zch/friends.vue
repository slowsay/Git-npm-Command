<template>
  <div>
    <div class="friends">
      <!-- 顶部导航 -->
      <navbar></navbar>
      <!-- 内容 -->
      <div class="content">
        <div class="top">
          <!-- 我在锅吧 -->
          <div class="left">
            <p class="title">我在锅吧</p>
            <div class="center">
              <img src="../../assets/img/zch/shop/conn.png" alt />
              <div class="text">
                <p class="name">我超级可爱的</p>
                <p class="dj">等级:12</p>
                <button class="btn" @click="jump('/posts')">一键发帖</button>
              </div>
            </div>
            <div class="gz" @click="wing_friends">
              <p>我的关注</p>
              <img src="../../assets/img/zch/shop/875.png" alt />
            </div>
          </div>
          <!-- 锅吧里有奇葩 -->
          <div class="all_right">
            <div class="right">
              <p class="qp">锅里有奇葩</p>
              <div class="bottom">
                <img src="../../assets/img/zch/shop/pp.png" class="play" alt />
                <div class="refe" v-for="(item,i) of refe" :key="i">
                  <div class="ss">
                    <img :src="item.sp" alt class="sp" />
                    <div class="wz">
                      <p class="title">{{item.title}}</p>
                      <p class="name">{{item.name}}</p>
                      <div class="number">
                        <p>
                          <img :src="item.look" alt />
                          {{item.number}}
                        </p>
                        <p>
                          <img :src="item.shca" alt />
                          {{item.sum}}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <img src="../../assets/img/zch/shop/11.png" alt class="play" />
              </div>
            </div>
            <div class="right_down">
              <p>锅友有话说</p>
              <div class="seape">
                <img src="../../assets/img/zch/shop/22.png" alt />
                <input type="text" placeholder="输入内容按回车键搜索" />
              </div>
            </div>
          </div>
        </div>
        <!-- 关注好友  已发布帖子 -->
        <div class="cricle_post">
          <!-- 关注好友 -->
          <div class="finds_show">
            <div class="cricle" v-show="none">
              <div class="wz">
                <p class="name">关注的好友</p>
                <img src="../../assets/img/zch/shop/3x.png" alt />
              </div>
              <div class="follower" v-for="(item,i) of follower" :key="i">
                <div class="left">
                  <img :src="item.sp" alt />
                </div>
                <div class="right">
                  <p class="name">{{item.name}}</p>
                  <p class="grade">等级:{{item.grade}}</p>
                  <div class="btn">
                    <button>{{item.letter}}</button>
                    <button>{{item.focus}}</button>
                  </div>
                </div>
              </div>
              <!-- 关注好友分页查询 -->
              <el-pagination layout="prev, pager, next" :total="50" prev-text="上一页" next-text="下一页"></el-pagination>
            </div>
          </div>
          <!-- 已发布帖子 -->
          <div class="post">
            <div class="cont" v-for="(items,i) of post" :key="i" @click="jump('/post_deta')">
              <div class="up">
                <p class="title">{{items.title}}</p>
                <p class="number">{{items.number}}</p>
              </div>
              <h4 class="details">{{items.details}}</h4>
              <div class="images">
                <img v-for="(item,j) of items.images" :key="j" :src="item" alt />
              </div>
              <div class="down">
                <img :src="items.me" alt />
                <p>{{items.name}}</p>
                <img :src="items.time" alt />
                <p>{{items.day}}</p>
              </div>
            </div>
            <!-- 已发布帖子分页查询 -->
            <div class="limt">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage3"
                :page-size="100"
                layout="prev, pager, next, jumper"
                :total="1000"
                prev-text="上一页"
                next-text="下一页"
              ></el-pagination>
            </div>
          </div>
          <!-- 热搜 -->
          <div class="hotbot">
            <div v-for="(items,i) of hotbot" :key="i">
              <div class="hot_top">
                <img :src="items.img" alt />
                <p class="name">{{items.name}}</p>
              </div>
              <img v-if="items.con!=''" :src="items.con" alt class="sp_hot" />
              <div class="text" v-for="(item,j) of items.text" :key="j">
                <p class="num">{{item.num}}</p>
                <p class="title">{{item.title}}</p>
                <p class="math">{{item.math}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 一键发布 -->
      <div class="issue">
        <div class="backfff">
          <p class="poss">发布新帖</p>
          <posts></posts>
        </div>
      </div>
      <rightNav></rightNav>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
import navbar from "../../components/nav";
import rightNav from "../../components/right_nav";
import posts from "../../components/new_post";
import bottom from "../gw/Bottom";
export default {
  components: {
    navbar,
    rightNav,
    posts,
    bottom
  },
  data() {
    return {
      // 关注好友是否显示
      none: false,
      // 热搜里边图片是否为空
      show: false,
      // 分页查询
      currentPage3: 1,
      // 锅里有奇葩
      refe: [
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          title: "推荐",
          name: "原来寿司还可以这样吃！",
          look: require("../../assets/img/zch/shop/chakan.png"),
          number: 123,
          shca: require("../../assets/img/zch/shop/start.png"),
          sum: 12213
        },
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          title: "推荐",
          name: "原来寿司还可以这样吃！",
          look: require("../../assets/img/zch/shop/chakan.png"),
          number: 123,
          shca: require("../../assets/img/zch/shop/start.png"),
          sum: 12213
        }
      ],
      // 关注好友
      follower: [
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          name: "匆匆那年",
          grade: 11,
          letter: "发送私信",
          focus: "取消关注"
        },
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          name: "匆匆那年",
          grade: 11,
          letter: "发送私信",
          focus: "取消关注"
        },
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          name: "匆匆那年",
          grade: 11,
          letter: "发送私信",
          focus: "取消关注"
        },
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          name: "匆匆那年",
          grade: 11,
          letter: "发送私信",
          focus: "取消关注"
        },
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          name: "匆匆那年",
          grade: 11,
          letter: "发送私信",
          focus: "取消关注"
        },
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          name: "匆匆那年",
          grade: 11,
          letter: "发送私信",
          focus: "取消关注"
        },
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          name: "匆匆那年",
          grade: 11,
          letter: "发送私信",
          focus: "取消关注"
        },
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          name: "匆匆那年",
          grade: 11,
          letter: "发送私信",
          focus: "取消关注"
        },
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          name: "匆匆那年",
          grade: 11,
          letter: "发送私信",
          focus: "取消关注"
        },
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          name: "匆匆那年",
          grade: 11,
          letter: "发送私信",
          focus: "取消关注"
        }
      ],
      // 已发布帖子
      post: [
        {
          title: "这是一个帖子的主题",
          number: 11,
          details:
            "我是帖子的详细内容我是帖子的详细内容我是帖子的详细内容我是帖子的详细内容我是帖子的详细内容我是帖子的详细内容我是帖子的详细内容我是帖子的详细内容",
          images: [
            require("../../assets/img/zch/shop/conn.png"),
            require("../../assets/img/zch/shop/conn.png"),
            require("../../assets/img/zch/shop/conn.png"),
            require("../../assets/img/zch/shop/conn.png")
          ],
          me: require("../../assets/img/zch/shop/me.png"),
          name: "楼主用户名",
          time: require("../../assets/img/zch/shop/time.png"),
          day: "今天 14:34"
        },
        {
          title: "这是一个帖子的主题",
          number: 11,
          details:
            "我是帖子的详细内容我是帖子的详细内容我是帖子的详细内容我是帖子的详细内容我是帖子的详细内容我是帖子的详细内容我是帖子的详细内容我是帖子的详细内容",
          images: [
            require("../../assets/img/zch/shop/conn.png"),
            require("../../assets/img/zch/shop/conn.png"),
            require("../../assets/img/zch/shop/conn.png"),
            require("../../assets/img/zch/shop/conn.png")
          ],
          me: require("../../assets/img/zch/shop/me.png"),
          name: "楼主用户名",
          time: require("../../assets/img/zch/shop/time.png"),
          day: "今天 14:34"
        },
        {
          title: "这是一个帖子的主题",
          number: 11,
          details:
            "我是帖子的详细内容我是帖子的详细内容我是帖子的详细内容我是帖子的详细内容我是帖子的详细内容我是帖子的详细内容我是帖子的详细内容我是帖子的详细内容",
          images: [
            require("../../assets/img/zch/shop/conn.png"),
            require("../../assets/img/zch/shop/conn.png"),
            require("../../assets/img/zch/shop/conn.png"),
            require("../../assets/img/zch/shop/conn.png")
          ],
          me: require("../../assets/img/zch/shop/me.png"),
          name: "楼主用户名",
          time: require("../../assets/img/zch/shop/time.png"),
          day: "今天 14:34"
        }
      ],
      // 热搜
      hotbot: [
        {
          img: require("../../assets/img/zch/shop/huo.png"),
          con: "",
          name: "锅友热议榜",
          text: [
            {
              num: 1,
              title: "引起了锅友的激烈...",
              math: 111
            },
            {
              num: 2,
              title: "引起了锅友的激烈...",
              math: 111
            },
            {
              num: 3,
              title: "引起了锅友的激烈...",
              math: 111
            },
            {
              num: 4,
              title: "引起了锅友的激烈...",
              math: 111
            },
            {
              num: 5,
              title: "引起了锅友的激烈...",
              math: 111
            },
            {
              num: 6,
              title: "引起了锅友的激烈...",
              math: 111
            }
          ]
        },
        {
          name: "锅外说",
          con: require("../../assets/img/zch/shop/conn.png"),
          text: [
            {
              title: "这里是标题，我也想不出来了"
            },
            {
              title: "这里是标题，我也想不出来了"
            },
            {
              title: "这里是标题，我也想不出来了"
            },
            {
              title: "这里是标题，我也想不出来了"
            },
            {
              title: "这里是标题，我也想不出来了"
            }
          ]
        },
        {
          name: "公告模板",
          con: "",
          text: [
            {
              title: "这里是标题，我也想不出来了"
            },
            {
              title: "这里是标题，我也想不出来了"
            },
            {
              title: "这里是标题，我也想不出来了"
            },
            {
              title: "这里是标题，我也想不出来了"
            },
            {
              title: "这里是标题，我也想不出来了"
            }
          ]
        }
      ]
    };
  },
  methods: {
    // 已发布帖子的分页查询
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 关注好友
    wing_friends() {
      if (this.none == false) {
        this.none = true;
      } else {
        this.none = false;
      }
    },
    // 页面跳转
    jump(a) {
      this.$router.push(a);
    }
  }
};
</script>

<style lang="scss" scoped>$size: 0.8;
.friends {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1280px*$size;
  margin: auto;
}
.content {
  width: 100%;
}
/*  */
.top {
  margin-top: 2%;
  display: flex;
  justify-content: space-between;
}
/* 我在锅吧 */
.top .left {
  width: 20%;
  background: rgba(245, 245, 245, 1);
  border: 1px*$size solid rgba(230, 230, 230, 1);
  border-radius: 4px*$size;
  padding: 2% 1% 1%;
  height: 222px*$size;
}
.top .left .title {
  font-size: 20px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 22px*$size;
}
.top .left .center {
  display: flex;
  margin-top: 5%;
  border-bottom: 1px*$size dotted rgba(230, 230, 230, 1);
  padding-bottom: 5%;
}
.top .left .center img {
  width: 50%;
  height: 50%;
}
.top .left .center .text {
  margin-left: 5%;
}
.top .left .center .text .name {
  font-size: 16px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(27, 125, 219, 1);
  line-height: 22px*$size;
}
.top .left .center .text .dj {
  font-size: 16px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 22px*$size;
  margin-top: 6%;
}
.top .left .center .text .btn {
  font-size: 14px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 22px*$size;
  background: red;
  border-radius: 4px*$size;
  border: 0;
  outline: 0;
  margin-top: 20%;
}
.top .gz {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5%;
  border: 1px*$size solid rgba(230, 230, 230, 1);
  border-radius: 4px*$size;
  height: 35px*$size;
  font-size: 16px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 22px*$size;
  background: #fff;
}
.top .gz img {
  width: 8px*$size;
  height: 7px*$size;
  margin-left: 3%;
}
/* 锅吧里有奇葩 */
.all_right {
  width: 74%;
}
.all_right .right {
  border: 1px*$size solid rgba(230, 230, 230, 1);
  border-radius: 4px*$size;
  height: 200px*$size;
  padding: 1% 1% 0%;
}
.all_right .right .qp {
  font-size: 20px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  margin-left: 10%;
  margin-bottom: 1%;
}
.all_right .right .bottom {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.all_right .right .play {
  width: 28px*$size;
  height: 28px*$size;
}
.refe {
  width: 38%;
}
.all_right .right .bottom .ss {
  display: flex;
}
.all_right .right .bottom .ss .sp {
  width: 38%;
}
.all_right .right .bottom .ss .wz {
  margin-left: 3%;
}
.all_right .right .bottom .ss .wz .title {
  font-size: 14px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 22px*$size;
  background: url("../../assets/img/zch/shop/35.png") no-repeat;
  background-size: 100%;
  width: 30%;
  height: 24%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.all_right .right .bottom .ss .wz .name {
  font-size: 18px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 22px*$size;
  margin-top: 3%;
}
.all_right .right .bottom .ss .wz .number {
  display: flex;
  justify-content: space-between;
  font-size: 18px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(179, 179, 179, 1);
  margin-top: 7%;
}
.all_right .right .bottom .ss .wz .number p:first-child img {
  width: 18px*$size;
  height: 13px*$size;
}
.all_right .right .bottom .ss .wz .number p:last-child img {
  width: 16px*$size;
  height: 16px*$size;
}
.all_right .right_down {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* height: 52px*$size; */
  margin-top: 27px*$size;
}
.all_right .right_down p {
  font-size: 20px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.all_right .right_down .seape {
  display: flex;
  align-items: center;
  position: relative;
  justify-content: flex-end;
  width: 23%;
}
.all_right .right_down .seape img {
  width: 16px*$size;
  height: 17px*$size;
  position: absolute;
  left: 6%;
}
.all_right .right_down .seape input {
  height: 28px*$size;
  width: 100%;
  border: 1px*$size solid rgba(204, 204, 204, 1);
  border-radius: 14px*$size;
  outline: 0;
  padding-left: 15%;
}
.cricle_post {
  display: flex;
  margin-top: 1%;
}
/* 关注好友 */
.finds_show {
  width: 22%;
  height: 100%;
}
.finds_show .cricle {
  height: 100%;
  width: 100%;
  border: 1px*$size solid rgba(230, 230, 230, 1);
  border-radius: 0px*$size 4px*$size 0px*$size 0px*$size;
}
.finds_show .cricle .wz {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px*$size;
  background: rgba(250, 250, 250, 1);
  border-bottom: 1px*$size solid rgba(230, 230, 230, 1);
}
.finds_show .cricle .wz .name {
  font-size: 20px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 22px*$size;
  margin-left: 5%;
}
.finds_show .cricle .wz img {
  width: 5%;
  height: 30%;
  margin-right: 5%;
}
.follower {
  display: flex;
  padding: 3.6% 4%;
}
.follower .left {
  width: 30%;
}
.follower .left img {
  width: 100%;
}
.follower .right {
  margin-left: 7%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.follower .right .name {
  font-size: 16px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 22px*$size;
}
.follower .right .grade {
  font-size: 16px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 22px*$size;
}
.follower .right .btn button {
  font-size: 12px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 22px*$size;
  border: 0;
  outline: 0;
}
.follower .right .btn button:first-child {
  background: rgba(224, 18, 32, 1);
  border-radius: 4px*$size;
}
.follower .right .btn button:last-child {
  background: rgba(51, 51, 51, 1);
  border-radius: 4px*$size;
}
.cricle >>> .el-pagination {
  border-top: 1px*$size solid rgb(230, 230, 230);
}
.cricle >>> .el-pagination .btn-prev,
.cricle >>> .el-pagination .btn-next {
  padding: 0;
}
/* 已发布帖子 */
.post {
  width: 50%;
  border: 1px*$size solid rgba(230, 230, 230, 1);
  margin-left: 4%;
  border-radius: 4px*$size;
  padding: 2% 1% 1%;
  height: 100%;
}
.post .cont {
  height: 100%;
}
.post .cont:not(:first-child) {
  margin-top: 3%;
}
.post .cont .up {
  display: flex;
  align-items: center;
  height: 35px*$size;
}
.post .cont .up .title {
  font-size: 20px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.post .cont .up .number {
  background: url("../../assets/img/zch/shop/bl.png") no-repeat;
  color: rgba(224, 18, 32, 1);
  background-size: 100%;
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
  margin-left: 3%;
}
.post .cont .details {
  font-size: 18px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(77, 77, 77, 1);
  line-height: 24px*$size;
  margin-top: 2%;
}
.post .cont .images img {
  width: 24%;
  margin-top: 1%;
}
.post .cont .down {
  display: flex;
  align-items: center;
  margin-top: 1%;
  padding-bottom: 2%;
}
.post .cont:not(:last-child) .down {
  border-bottom: 2px*$size dotted rgb(230, 230, 230);
}
.post .cont .down img {
  width: 3%;
}
.post .cont .down img:nth-child(3) {
  margin-left: 1%;
}
.post .cont .down p {
  font-size: 18px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 22px*$size;
  margin-left: 1%;
}
.post .limt {
  margin-top: 2%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
/* 热搜 */
.hotbot {
  border: 1px*$size solid rgb(230, 230, 230);
  width: 22%;
}
.hotbot .sp_hot {
  width: 100%;
  height: 130px*$size;
}
.hotbot > div:not(:first-child) .text .title {
  color: rgba(27, 125, 219, 1);
}
.hotbot > div:not(:first-child) .hot_top {
  border-top: 1px*$size solid rgb(230, 230, 230);
}
.hotbot > div .text:last-child {
  margin-bottom: 15%;
}
.hotbot .hot_top {
  width: 100%;
  height: 50px*$size;
  display: flex;
  align-items: center;
  background: rgba(250, 250, 250, 1);
  border-bottom: 1px*$size solid rgb(230, 230, 230);
}
.hotbot .hot_top img {
  width: 6%;
  margin-left: 3%;
}
.hotbot .hot_top p {
  font-size: 20px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 22px*$size;
  margin-left: 2%;
}
.hotbot .text {
  display: flex;
  padding: 4% 2% 1%;
  justify-content: space-around;
}
.hotbot .text .num {
  font-size: 16px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(77, 77, 77, 1);
  line-height: 22px*$size;
}
.hotbot .text .title {
  font-size: 16px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(77, 77, 77, 1);
  line-height: 22px*$size;
  width: 70%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hotbot .text .math {
  font-size: 16px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(77, 77, 77, 1);
  line-height: 22px*$size;
}
/* 一键发布 */
.issue {
  width: 81%;
  display: flex;
  justify-content: flex-start;
  background: rgba(250, 250, 250, 1);
  margin-bottom: 10%;
}
.issue .backfff {
  width: 80%;
}
.issue .backfff .poss {
  font-size: 20px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 22px*$size;
  margin-left: 30px*$size;
  margin-top: 28px*$size;
}
</style>