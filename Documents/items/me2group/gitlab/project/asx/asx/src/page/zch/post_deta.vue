<template>
  <div>
    <div class="post_deta">
      <!-- 顶部 -->
      <navbar></navbar>
      <!-- 标题 -->
      <div class="nav_bottom">
        <div class="left">
          <h4 class="name">看我，我是帖子的标题</h4>
          <div class="number">
            <h6>关注：</h6>
            <p>21321</p>
            <h6>回复：</h6>
            <p>15843</p>
          </div>
        </div>
        <button>收藏</button>
      </div>
      <!-- 分页 -->
      <div class="limit">
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
        <div class="up_one" @click="jump('/friends')">
          <p>&lt;返回锅友说</p>
        </div>
      </div>
      <!-- 回复内容 -->
      <div class="res">
        <div class="left">
          <div class="btns">
            <button>只看楼主</button>
            <button>回复</button>
          </div>
          <div class="cont" v-for="(items,i) of con" :key="i">
            <div class="poto">
              <img :src="items.conn" alt class="sp" />
              <p class="name">{{items.name}}</p>
              <div class="grade">
                <h4 class="fully">{{items.fully}}</h4>
                <p class="num">{{items.num}}</p>
              </div>
            </div>
            <div class="wz">
              <p class="title">{{items.title}}</p>
              <img :src="items.flat" alt class="flat" />
              <div class="bottom">
                <div class="btn" @click="shares(items)">
                  <p>{{items.fx}}</p>
                  <img :src="items.fanhui" alt />
                </div>
                <div class="share" v-show="items.show">
                  <img v-for="(item,j) of items.image" :key="j" :src="item" alt />
                </div>
                <div class="right">
                  <img src="../../assets/img/zch/details/3x.png" alt class="waing" />
                  <p class="report">{{items.report}}</p>
                  <p class="time">{{items.time}}</p>
                  <h4 class="hf">{{items.hf}}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="res_ght">
          <!-- 我在锅吧 -->
          <div class="lefts">
            <p class="title">我在锅吧</p>
            <div class="center">
              <img src="../../assets/img/zch/shop/conn.png" alt />
              <div class="text">
                <p class="name">我超级可爱的</p>
                <p class="dj">等级:12</p>
                <button class="btn" @click="jump('/posts')">一键发帖</button>
              </div>
            </div>
            <div class="gz">
              <p>我的关注</p>
              <img src="../../assets/img/zch/shop/875.png" alt />
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
      <!-- 分页 -->
      <div class="limit">
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
        <div class="up_one" @click="jump('/friends')">
          <p>&lt;返回锅友说</p>
        </div>
      </div>
      <!-- 一键发布 -->
      <div class="issue">
        <div class="backfff">
          <p class="poss">发表回复</p>
          <posts></posts>
        </div>
      </div>
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
      // 分页
      currentPage3: 1,
      // 内容
      con: [
        {
          conn: require("../../assets/img/zch/shop/conn.png"),
          name: "柴米油盐",
          fully: "等级尊称",
          num: 1,
          title:
            "我是帖子的详细内容，内容简介。写啊写啊写啊，凑字数啦～我是帖子的详细内容，内容简介。写啊写啊写啊，凑字数啦～我是帖子的详细内容，内容简介。写啊写啊写啊，凑字数啦～",
          flat: require("../../assets/img/zch/shop/conn.png"),
          fx: "分享",
          fanhui: require("../../assets/img/zch/details/fanhui.png"),
          report: "举报",
          time: "1楼 2019-07-14 14:31",
          hf: "回复",
          image: [
            require("../../assets/img/zch/details/f.png"),
            require("../../assets/img/zch/details/watch.png"),
            require("../../assets/img/zch/details/qq.png"),
            require("../../assets/img/zch/details/link.png")
          ],
          show: false
        },
        {
          conn: require("../../assets/img/zch/shop/conn.png"),
          name: "柴米油盐",
          fully: "等级尊称",
          num: 1,
          title:
            "我是帖子的详细内容，内容简介。写啊写啊写啊，凑字数啦～我是帖子的详细内容，内容简介。写啊写啊写啊，凑字数啦～我是帖子的详细内容，内容简介。写啊写啊写啊，凑字数啦～",
          flat: require("../../assets/img/zch/shop/conn.png"),
          fx: "分享",
          fanhui: require("../../assets/img/zch/details/fanhui.png"),
          report: "举报",
          time: "1楼 2019-07-14 14:31",
          hf: "回复",
          image: [
            require("../../assets/img/zch/details/f.png"),
            require("../../assets/img/zch/details/watch.png"),
            require("../../assets/img/zch/details/qq.png"),
            require("../../assets/img/zch/details/link.png")
          ],
          show: false
        },
        {
          conn: require("../../assets/img/zch/shop/conn.png"),
          name: "柴米油盐",
          fully: "等级尊称",
          num: 1,
          title:
            "我是帖子的详细内容，内容简介。写啊写啊写啊，凑字数啦～我是帖子的详细内容，内容简介。写啊写啊写啊，凑字数啦～我是帖子的详细内容，内容简介。写啊写啊写啊，凑字数啦～",
          flat: require("../../assets/img/zch/shop/conn.png"),
          fx: "分享",
          fanhui: require("../../assets/img/zch/details/fanhui.png"),
          report: "举报",
          time: "1楼 2019-07-14 14:31",
          hf: "回复",
          image: [
            require("../../assets/img/zch/details/f.png"),
            require("../../assets/img/zch/details/watch.png"),
            require("../../assets/img/zch/details/qq.png"),
            require("../../assets/img/zch/details/link.png")
          ],
          show: false
        },
        {
          conn: require("../../assets/img/zch/shop/conn.png"),
          name: "柴米油盐",
          fully: "等级尊称",
          num: 1,
          title:
            "我是帖子的详细内容，内容简介。写啊写啊写啊，凑字数啦～我是帖子的详细内容，内容简介。写啊写啊写啊，凑字数啦～我是帖子的详细内容，内容简介。写啊写啊写啊，凑字数啦～",
          flat: require("../../assets/img/zch/shop/conn.png"),
          fx: "分享",
          fanhui: require("../../assets/img/zch/details/fanhui.png"),
          report: "举报",
          time: "1楼 2019-07-14 14:31",
          hf: "回复",
          image: [
            require("../../assets/img/zch/details/f.png"),
            require("../../assets/img/zch/details/watch.png"),
            require("../../assets/img/zch/details/qq.png"),
            require("../../assets/img/zch/details/link.png")
          ],
          show: false
        },
        {
          conn: require("../../assets/img/zch/shop/conn.png"),
          name: "柴米油盐",
          fully: "等级尊称",
          num: 1,
          title:
            "我是帖子的详细内容，内容简介。写啊写啊写啊，凑字数啦～我是帖子的详细内容，内容简介。写啊写啊写啊，凑字数啦～我是帖子的详细内容，内容简介。写啊写啊写啊，凑字数啦～",
          flat: require("../../assets/img/zch/shop/conn.png"),
          fx: "分享",
          fanhui: require("../../assets/img/zch/details/fanhui.png"),
          report: "举报",
          time: "1楼 2019-07-14 14:31",
          hf: "回复",
          image: [
            require("../../assets/img/zch/details/f.png"),
            require("../../assets/img/zch/details/watch.png"),
            require("../../assets/img/zch/details/qq.png"),
            require("../../assets/img/zch/details/link.png")
          ],
          show: false
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
        }
      ]
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    shares(a) {
      if (a.show == false) {
        a.show = true;
      } else {
        a.show = false;
      }
      console.log(a);
    },
    // 页面跳转
    jump(a) {
      this.$router.push(a);
    }
  }
};
</script>

<style scoped>
.post_deta {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1280px;
  margin: auto;
}
.nav_bottom {
  width: 96%;
  margin-top: 2%;
  background: rgba(245, 245, 245, 1);
  padding: 1% 2%;
  display: flex;
  align-items: center;
  border: 1px solid rgba(245, 245, 245, 1);
  justify-content: space-between;
}
.nav_bottom .left .name {
  font-size: 30px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
}
.nav_bottom .left .number {
  display: flex;
  align-items: center;
  margin-top: 1%;
}
.nav_bottom .left .number h6 {
  font-size: 18px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(179, 179, 179, 1);
}
.nav_bottom .left .number h6:nth-child(3) {
  margin-left: 2%;
}
.nav_bottom .left .number p {
  font-size: 18px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: red;
}
.nav_bottom button {
  font-size: 17px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 22px;
  width: 5%;
  background: rgba(237, 112, 67, 1);
  border-radius: 4p;
  border: 0;
  outline: 0;
}
/* 分页查询 */
.limit {
  width: 96%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(250, 250, 250, 1);
  border: 1px solid rgba(240, 240, 240, 1);
  padding: 1% 2%;
}
.limit .up_one p {
  font-size: 18px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(27, 125, 219, 1);
  line-height: 22px;
}
/* 回复内容 */
.res {
  width: 100%;
  display: flex;
}
.res .left {
  width: 80%;
}
.res .left .btns {
  border: 1px solid rgb(230, 230, 230);
  padding: 1% 2%;
}
.res .left .btns button {
  font-size: 16px;
  outline: 0;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(230, 230, 230, 1);
  border-radius: 4px;
}
.res .cont {
  display: flex;
  border: 1px solid rgb(230, 230, 230);
}
.res .cont:not(:first-child) {
  border-top: 0;
}
.res .cont:last-child {
  border-bottom: 0;
}
.res .cont .poto {
  width: 40%;
  background: rgba(250, 250, 250, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.res .cont .poto .name {
  font-size: 16px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  margin-top: 3%;
}
.res .cont .poto img.sp {
  width: 80%;
  height: 100px;
  margin-top: 10%;
}
.res .cont .poto .name {
  font-size: 16px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
}
.res .cont .poto .grade {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(230, 230, 230, 1);
  border-radius: 4px;
  padding: 1% 1%;
  margin-top: 5%;
  margin-bottom: 8%;
}
.res .cont .poto .grade .fully {
  font-size: 16px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.res .cont .poto .grade .num {
  font-size: 14px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  background: url("../../assets/img/zch/details/mary.png") no-repeat;
  width: 20px;
  height: 32px;
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: 3% 4%;
}
.res .cont .wz {
  margin: 0 2%;
}
.res .cont .wz .title {
  font-size: 18px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  margin-top: 3%;
}
.res .cont .wz .flat {
  width: 100%;
  height: 447px;
  margin-top: 3%;
}
.res .cont .wz .bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 80px;
  padding-bottom: 3%;
}
.res .cont .wz .bottom .btn {
  display: flex;
  align-items: center;
  border: 1px solid red;
  border-radius: 4px;
  padding: 0.5% 1%;
  width: 8%;
  display: flex;
  justify-content: space-around;
}
.res .cont .wz .bottom .btn img {
  width: 21px;
  height: 18px;
}
.res .cont .wz .bottom .btn p {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(224, 18, 32, 1);
}
.res .cont .wz .bottom .right {
  display: flex;
  align-items: center;
  width: 43%;
  justify-content: flex-end;
}
.res .cont .wz .bottom .right .waing {
  width: 19px;
  height: 18px;
  margin-right: 2%;
}
.res .cont .wz .bottom .right .report {
  font-size: 18px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(27, 125, 219, 1);
  margin-right: 2%;
}
.res .cont .wz .bottom .right .time {
  font-size: 18px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  margin-right: 2%;
}
.res .cont .wz .bottom .right .hf {
  font-size: 18px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(27, 125, 219, 1);
  margin-right: 2%;
}
.res .cont .wz .bottom .share {
  width: 50%;
  display: flex;
  justify-content: space-around;
  border: 1px solid rgba(230, 230, 230, 1);
  border-radius: 4px;
  padding: 1% 0%;
  margin-left: 1%;
}
.res .cont .wz .bottom .share img {
  width: 60px;
  height: 60px;
}
.res .res_ght {
  width: 20%;
  border-radius: 4px;
}
/* 我在锅吧 */
.lefts {
  background: rgba(245, 245, 245, 1);
  border: 1px solid rgba(230, 230, 230, 1);
  border-radius: 4px;
  padding: 4% 5% 0% 5%;
  height: 222px;
}
.lefts .title {
  font-size: 20px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 22px;
}
.lefts .center {
  display: flex;
  margin-top: 5%;
  border-bottom: 1px dotted rgba(230, 230, 230, 1);
  padding-bottom: 5%;
}
.lefts .center img {
  width: 50%;
  height: 50%;
}
.lefts .center .text {
  margin-left: 5%;
}
.lefts .center .text .name {
  font-size: 16px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(27, 125, 219, 1);
  line-height: 22px;
}
.lefts .center .text .dj {
  font-size: 16px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 22px;
  margin-top: 6%;
}
.lefts .center .text .btn {
  font-size: 14px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 22px;
  background: red;
  border-radius: 4px;
  border: 0;
  outline: 0;
  margin-top: 20%;
}
.gz {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5%;
  border: 1px solid rgba(230, 230, 230, 1);
  border-radius: 4px;
  height: 35px;
  font-size: 16px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 22px;
}
.gz img {
  width: 8px;
  height: 7px;
  margin-left: 3%;
}
/* 热搜 */
.hotbot {
  border: 1px solid rgb(230, 230, 230);
  width: 100%;
}
.hotbot .sp_hot {
  width: 100%;
  height: 130px;
}
.hotbot > div:not(:first-child) .text .title {
  color: rgba(27, 125, 219, 1);
}
.hotbot > div:not(:first-child) .hot_top {
  border-top: 1px solid rgb(230, 230, 230);
}
.hotbot > div .text:last-child {
  margin-bottom: 15%;
}
.hotbot .hot_top {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background: rgba(250, 250, 250, 1);
  border-bottom: 1px solid rgb(230, 230, 230);
}
.hotbot .hot_top img {
  width: 6%;
  margin-left: 3%;
}
.hotbot .hot_top p {
  font-size: 20px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 22px;
  margin-left: 2%;
}
.hotbot .text {
  display: flex;
  padding: 4% 2% 1%;
  justify-content: space-around;
}
.hotbot .text .num {
  font-size: 16px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(77, 77, 77, 1);
  line-height: 22px;
}
.hotbot .text .title {
  font-size: 16px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(77, 77, 77, 1);
  line-height: 22px;
  width: 70%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hotbot .text .math {
  font-size: 16px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(77, 77, 77, 1);
  line-height: 22px;
}
/* 一键发布 */
.issue {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  background: rgba(250, 250, 250, 1);
  margin-bottom: 10%;
}
.issue .backfff {
  width: 80%;
}
.issue .backfff .poss {
  font-size: 20px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 22px;
  margin-left: 30px;
  margin-top: 28px;
}
</style>