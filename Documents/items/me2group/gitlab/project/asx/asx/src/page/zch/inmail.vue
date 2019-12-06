<template>
  <div class="inmail">
    <navbar></navbar>
    <div class="content">
      <!-- 收信 已发送 已删除 -->
      <div class="tab">
        <p
          v-for="(item,i) of tab"
          :key="i"
          @click="trigger(i)"
          :class="{check_red:type==i}"
        >{{item}}</p>
      </div>
      <!-- 删除 待删除 转发 -->
      <div class="del">
        <div class="left">
          <p>删除</p>
          <p>彻底删除</p>
          <p>转发</p>
          <p>举报</p>
          <p>全部标记为已读</p>
        </div>
        <div class="right">
          <p>1/25 页</p>
          <p>下一页</p>
          <p>跳转</p>
        </div>
      </div>
      <!-- 全选 发件人 主题 -->
      <div class="addressor">
        <div class="left">
          <div class="all">
            <img src="../../assets/img/zch/car/@3x.png" v-show="all" @click="all_check" />
            <img src="../../assets/img/zch/car/126.png" v-show="!all" @click="all_check" />
            <p>全选</p>
          </div>
          <p>发件人</p>
          <p>主题</p>
        </div>
        <div class="right">
          <p>时间</p>
          <i class="el-icon-bottom"></i>
        </div>
      </div>
      <!-- 信箱 -->
      <div class="mailbox">
        <div class="cont" v-for="(item,i) of mailbox" :key="i">
          <div class="left">
            <img :src="item.yes" v-show="item.show" alt @click="check(item)" />
            <img :src="item.no" alt v-show="!item.show" @click="check(item)" />
            <p class="name">{{item.name}}</p>
            <p class="text">{{item.text}}</p>
          </div>
          <p class="time">{{item.time}}</p>
        </div>
      </div>
      <!-- 右边导航栏 -->
      <rightNav></rightNav>
    </div>
  </div>
</template>

<script>
import navbar from "../../components/nav";
import rightNav from "../../components/right_nav";
export default {
  components: {
    navbar,
    rightNav
  },
  data() {
    return {
      // 选中个数
      number: 0,
      // 全选是否选中
      all: false,
      // 收信 已发送 已删除 切换
      tab: ["收信", "已发送", "已删除"],
      // 收信 已发送 已删除 状态值
      type: 0,
      mailbox: [
        {
          yes: require("../../assets/img/zch/car/@3x.png"),
          no: require("../../assets/img/zch/car/126.png"),
          name: "随时",
          text: "ashaxi官网使用满意度调查，内容显示巴拉巴拉～",
          time: "2019年7月18日",
          show: false
        },
        {
          yes: require("../../assets/img/zch/car/@3x.png"),
          no: require("../../assets/img/zch/car/126.png"),
          name: "随时",
          text: "ashaxi官网使用满意度调查，内容显示巴拉巴拉～",
          time: "2019年7月18日",
          show: false
        },
        {
          yes: require("../../assets/img/zch/car/@3x.png"),
          no: require("../../assets/img/zch/car/126.png"),
          name: "随时",
          text: "ashaxi官网使用满意度调查，内容显示巴拉巴拉～",
          time: "2019年7月18日",
          show: false
        },
        {
          yes: require("../../assets/img/zch/car/@3x.png"),
          no: require("../../assets/img/zch/car/126.png"),
          name: "随时",
          text: "ashaxi官网使用满意度调查，内容显示巴拉巴拉～",
          time: "2019年7月18日",
          show: false
        },
        {
          yes: require("../../assets/img/zch/car/@3x.png"),
          no: require("../../assets/img/zch/car/126.png"),
          name: "随时",
          text: "ashaxi官网使用满意度调查，内容显示巴拉巴拉～",
          time: "2019年7月18日",
          show: false
        },
        {
          yes: require("../../assets/img/zch/car/@3x.png"),
          no: require("../../assets/img/zch/car/126.png"),
          name: "随时",
          text: "ashaxi官网使用满意度调查，内容显示巴拉巴拉～",
          time: "2019年7月18日",
          show: false
        },
        {
          yes: require("../../assets/img/zch/car/@3x.png"),
          no: require("../../assets/img/zch/car/126.png"),
          name: "随时",
          text: "ashaxi官网使用满意度调查，内容显示巴拉巴拉～",
          time: "2019年7月18日",
          show: false
        },
        {
          yes: require("../../assets/img/zch/car/@3x.png"),
          no: require("../../assets/img/zch/car/126.png"),
          name: "随时",
          text: "ashaxi官网使用满意度调查，内容显示巴拉巴拉～",
          time: "2019年7月18日",
          show: false
        },
        {
          yes: require("../../assets/img/zch/car/@3x.png"),
          no: require("../../assets/img/zch/car/126.png"),
          name: "随时",
          text: "ashaxi官网使用满意度调查，内容显示巴拉巴拉～",
          time: "2019年7月18日",
          show: false
        },
        {
          yes: require("../../assets/img/zch/car/@3x.png"),
          no: require("../../assets/img/zch/car/126.png"),
          name: "随时",
          text: "ashaxi官网使用满意度调查，内容显示巴拉巴拉～",
          time: "2019年7月18日",
          show: false
        },
        {
          yes: require("../../assets/img/zch/car/@3x.png"),
          no: require("../../assets/img/zch/car/126.png"),
          name: "随时",
          text: "ashaxi官网使用满意度调查，内容显示巴拉巴拉～",
          time: "2019年7月18日",
          show: false
        }
      ]
    };
  },
  methods: {
    // tab切换
    trigger(i) {
      this.type = i;
    },
    // 单个信件是否选中
    check(a) {
      if (a.show == false) {
        a.show = true;
        this.number++;
        if (this.number == this.mailbox.length) {
          this.all = true;
        }
      } else {
        a.show = false;
        this.number--;
        if (this.number != this.mailbox.length) {
          this.all = false;
        }
      }
    },
    // 全选
    all_check() {
      if (this.all == false) {
        this.all = true;
        for (let i of this.mailbox) {
          i.show = true;
          this.number++;
          if (this.number >= this.mailbox.length) {
            this.number = this.mailbox.length;
          }
        }
        console.log(this.number);
      } else {
        this.all = false;
        for (let i of this.mailbox) {
          i.show = false;
        }
      }
    }
  }
};
</script>

<style scoped>
.inmail {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1280px;
  margin: auto;
}
.content {
  width: 100%;
  margin-top: 2%;
  margin-bottom: 2%;
}
/* tab切换 */
.content .tab {
  display: flex;
  align-items: center;
}
.content .tab p {
  font-size: 20px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  width: 6%;
  cursor: pointer;
}
.content .tab p:not(:first-child) {
  border-left: 1px solid rgba(230, 230, 230, 1);
  padding-left: 2%;
  padding-right: 2%;
}
.check_red {
  color: red !important;
}
/* 删除 待删除 转发 */
.del {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(240, 240, 240, 1);
  border-radius: 4px;
  margin-top: 1%;
  padding: 5px 0;
}
.del .left {
  display: flex;
  width: 35%;
  justify-content: space-around;
}
.del .left p {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  padding: 1% 1%;
  cursor: pointer;
}
.del .left p:nth-child(1),
.del .left p:nth-child(3),
.del .left p:nth-child(4) {
  width: 11%;
  text-align: center;
}
.del .left p:nth-child(2) {
  width: 20%;
  text-align: center;
}
.del .left p:last-child {
  width: 34%;
  text-align: center;
}
.del .right {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 15%;
}
.del .right p {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 36px;
  cursor: pointer;
}
/* 全选 发件人 */
.addressor {
  display: flex;
  justify-content: space-between;
  margin-top: 2%;
}
.addressor .left {
  display: flex;
  align-items: center;
  width: 25%;
  justify-content: space-between;
}
.addressor .left .all {
  display: flex;
  align-items: center;
}
.addressor .left .all img {
  width: 20px;
  height: 20px;
}
.addressor .left p {
  font-size: 16px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.addressor .right {
  display: flex;
  align-items: center;
  margin-right: 10%;
}
.addressor .right p {
  font-size: 16px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.addressor .right .el-icon-bottom {
  width: 12px;
  height: 13px;
}
/* 信箱 */
.mailbox {
  border: 4px solid rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  padding: 1% 1%;
  margin-top: 1%;
}
.mailbox .cont {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mailbox .cont:not(:last-child) {
  border-bottom: 2px dotted rgba(230, 230, 230, 1);
  padding-bottom: 1%;
}
.mailbox .cont:not(:first-child) {
  margin-top: 1%;
}
.mailbox .cont .left {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
}
.mailbox .cont .left img {
  width: 20px;
  height: 20px;
}
.mailbox .cont .left p {
  font-size: 16px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
}
.mailbox .cont .left .name {
  width: 25%;
  text-align: center;
  margin-left: 3%;
}
.mailbox .cont .left .text {
  width: 57%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.mailbox .cont .time {
  font-size: 16px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
  margin-right: 4%;
}
</style>