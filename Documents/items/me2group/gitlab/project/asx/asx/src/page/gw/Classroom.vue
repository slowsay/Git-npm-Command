<template>
  <div id="Classroom">
    <navbar></navbar>
    <div>
      <div class="left">
        <img src="../../assets/img/gw/14.png" />
        <div v-for="(item,index) in left" :key="index" @click="$router.push('/Classification_0')">
          <div>
            <img :src="item.url" />
          </div>
          <p>{{item.p1}}</p>
          <p>{{item.p2}}</p>
        </div>
      </div>
      <div class="middle">
        <middle></middle>
      </div>
      <div class="right">
        <div>
          <div>
            <p>TOP20</p>
            <p @click="active=0" :class="{active:active==0 }">周榜</p>
            <p @click="active=1" :class="{active:active==1 }">月榜</p>
            <p @click="active=2" :class="{active:active==2 }">总榜</p>
          </div>
          <!-- 榜单前十 -->
          <div>
            <div v-for="(item,index) in right" :key="index">
              <div v-if="index<10">
                <p>{{'NO.'+(index+1)}}</p>
                <p>{{item.name}}</p>
                <p>{{item.time}}</p>
              </div>
            </div>
          </div>
          <!-- 榜单十到二十 -->
          <div>
            <div v-for="(item,index) in right" :key="index">
              <div v-if="index>9">
                <p>{{'NO.'+(index+1)}}</p>
                <p>{{item.name}}</p>
                <p>{{item.time}}</p>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <img src="../../assets/img/gw/27.png" @click="show=true" />
      </div>
    </div>
    <el-dialog title="提交建议" :visible.sync="show">
      <div class="dialog">
        <div>
          <p>收件人</p>
          <el-input placeholder="请填写收件人" v-model="input1"></el-input>
        </div>
        <div>
          <p>主题</p>
          <el-input placeholder="请填写主题" v-model="input2"></el-input>
        </div>
        <div>
          <div>
            <img src="../../assets/img/gw/39.png" />
            <span>添加图片（网站链接）</span>
          </div>
          <div>
            <img src="../../assets/img/gw/38.png" />
            <span>添加图片（本地上传）</span>
          </div>
        </div>
        <div>
          <p>正文</p>
          <el-input placeholder="请填写内容" v-model="input3" type="textarea" resize="none"></el-input>
        </div>
        <p>{{'发件人: '+name}}</p>
        <el-button @click="show=false">发送</el-button>
      </div>
    </el-dialog>
    <!-- 侧边栏 -->
    <rightNav></rightNav>
  </div>
</template>
<script>
import middle from "./Classroom_middle";
export default {
  components: {
    middle
  },
  data() {
    return {
      // 左侧数据
      left: [
        {
          url: require("../../assets/img/gw/26.png")
        },
        {
          url: require("../../assets/img/gw/15.png"),
          p1: "健康食谱",
          p2: "健康メニュー"
        },
        {
          url: require("../../assets/img/gw/16.png"),
          p1: "健康食谱",
          p2: "健康メニュー"
        },
        {
          url: require("../../assets/img/gw/17.png"),
          p1: "健康食谱",
          p2: "健康メニュー"
        },
        {
          url: require("../../assets/img/gw/18.png"),
          p1: "健康食谱",
          p2: "健康メニュー"
        },
        {
          url: require("../../assets/img/gw/19.png"),
          p1: "健康食谱",
          p2: "健康メニュー"
        },
        {
          url: require("../../assets/img/gw/20.png"),
          p1: "健康食谱",
          p2: "健康メニュー"
        },
        {
          url: require("../../assets/img/gw/21.png"),
          p1: "健康食谱",
          p2: "健康メニュー"
        },
        {
          url: require("../../assets/img/gw/23.png"),
          p1: "健康食谱",
          p2: "健康メニュー"
        },
        {
          url: require("../../assets/img/gw/22.png"),
          p1: "健康食谱",
          p2: "健康メニュー"
        },
        {
          url: require("../../assets/img/gw/24.png"),
          p1: "健康食谱",
          p2: "健康メニュー"
        }
      ],
      //右侧榜单数据
      right: [
        {
          name: "记忆中味道の鸡汤",
          time: "1816"
        },
        {
          name: "记忆中味道の鸡汤",
          time: "1816"
        },
        {
          name: "记忆中味道の鸡汤",
          time: "1816"
        },
        {
          name: "记忆中味道の鸡汤",
          time: "1816"
        },
        {
          name: "记忆中味道の鸡汤",
          time: "1816"
        },
        {
          name: "记忆中味道の鸡汤",
          time: "1816"
        },
        {
          name: "记忆中味道の鸡汤",
          time: "1816"
        },
        {
          name: "记忆中味道の鸡汤",
          time: "1816"
        },
        {
          name: "记忆中味道の鸡汤",
          time: "1816"
        },
        {
          name: "记忆中味道の鸡汤",
          time: "1816"
        },
        {
          name: "记忆中味道の鸡汤",
          time: "1816"
        },
        {
          name: "记忆中味道の鸡汤",
          time: "1816"
        },
        {
          name: "记忆中味道の鸡汤",
          time: "1816"
        },
        {
          name: "记忆中味道の鸡汤",
          time: "1816"
        },
        {
          name: "记忆中味道の鸡汤",
          time: "1816"
        },
        {
          name: "记忆中味道の鸡汤",
          time: "1816"
        },
        {
          name: "记忆中味道の鸡汤",
          time: "1816"
        },
        {
          name: "记忆中味道の鸡汤",
          time: "1816"
        },
        {
          name: "记忆中味道の鸡汤",
          time: "1816"
        },
        {
          name: "记忆中味道の鸡汤",
          time: "1816"
        }
      ],
      // 榜单切换状态
      active: 0,
      // 弹窗数据
      show: false,
      input1: "",
      input2: "",
      input3: "",
      name: "我超级可爱的"
    };
  }
};
</script>
<style lang="scss" scoped>
$size: 0.8;
#Classroom {
  width: 1280px * $size;
  margin: auto;
  > div:nth-child(2) {
    margin: 40px * $size 0;
    display: flex;
    justify-content: space-between;
  }
  .left {
    position: relative;
    width: 210px * $size;
    overflow: hidden;
    > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 210px * $size;
      height: 890px * $size;
    }
    > div {
      position: relative;
      float: left;
      width: 100px * $size;
      height: 134px * $size;
      z-index: 1;
      margin-left: 3px * $size;
      margin-bottom: 3px * $size;
      div {
        width: 100%;
        height: 80px * $size;
        img {
          max-width: 65px * $size;
          max-height: 60px * $size;
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -40%);
        }
      }
      p:nth-child(2) {
        text-align: center;
        font-size: 16px * $size;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 22px * $size;
        margin-bottom: 7px * $size;
      }
      p:nth-child(3) {
        text-align: center;
        font-size: 10px * $size;
        font-weight: 400;
        color: rgba(179, 179, 179, 1);
        line-height: 22px * $size;
      }
    }
    > div:nth-child(2) {
      width: 100%;
      height: 197px * $size;
      img {
        width: 205px * $size;
        max-width: none;
        max-height: none;
        transform: translate(0, 0);
        left: 0;
        top: 0;
      }
    }
  }
  .middle {
    width: 785px * $size;
  }
  .right {
    width: 250px * $size;

    > img {
      width: 250px * $size;
    }
  }
  .right > div {
    width: 250px * $size;
    height: 718px * $size;
    border: 1px * $size solid rgba(230, 230, 230, 1);
    border-radius: 10px * $size;
    padding: 0 10px * $size;
    margin: 0 0 18px * $size;
    box-sizing: border-box;
    > div:nth-child(1) {
      width: 100%;
      padding: 14px * $size 0;
      display: flex;
      border-bottom: 1px * $size dashed rgba(230, 230, 230, 1);
      p {
        width: 46px * $size;
        height: 24px * $size;
        border-radius: 12px * $size;
        font-size: 14px * $size;
        font-family: DFYuanW5-GB;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 24px * $size;
        flex-shrink: 0;
        text-align: center;
      }
      p:nth-child(1) {
        width: 200px * $size;
        font-size: 16px * $size;
        font-weight: bold;
        flex-shrink: 1;
        text-align: left;
      }
      .active {
        color: #fff;
        background: rgba(51, 51, 51, 1);
      }
    }
    > div:nth-child(2) {
      padding-bottom: 20px * $size;
      border-bottom: 1px * $size dashed rgba(230, 230, 230, 1);
    }
    > div:nth-child(2) > div > div {
      display: flex;
      justify-content: space-between;
      p {
        width: 47px * $size;
        font-size: 14px * $size;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 15px * $size;
        margin-top: 17px * $size;
        flex-shrink: 0;
      }
      p:nth-child(2) {
        width: 200px * $size;
        flex-shrink: 1;
      }
      p:nth-child(3) {
        text-align: right;
        font-weight: 400;
        color: rgba(179, 179, 179, 1);
        flex-shrink: 0;
      }
    }
    > div:nth-child(3) > div > div {
      display: flex;
      justify-content: space-between;
      p {
        width: 47px * $size;
        font-size: 14px * $size;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 15px * $size;
        margin-top: 17px * $size;
        flex-shrink: 0;
      }
      p:nth-child(2) {
        width: 200px * $size;
        flex-shrink: 1;
      }
      p:nth-child(3) {
        text-align: right;
        font-weight: 400;
        color: rgba(179, 179, 179, 1);
        flex-shrink: 0;
      }
    }
  }
  >>>.el-dialog {
    width: 856px * $size;
    height: 594px * $size;
    border: 4px * $size solid rgba(230, 230, 230, 1);
    border-radius: 10px * $size;
    .el-dialog__header {
      padding: 30px * $size;
      font-size: 20px * $size;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
      border-bottom: 1px * $size solid #e6e6e6;
    }
    .el-dialog__headerbtn {
      right: 30px * $size;
      top: 30px * $size;
      font-size: 20px * $size;
    }
    .el-dialog__body {
      padding: 0;
    }
  }
  .dialog {
    padding: 40px * $size 100px * $size 0 30px * $size;
    > div {
      display: flex;
      margin-bottom: 20px * $size;
      p {
        width: 70px * $size;
        font-size: 16px * $size;
        font-weight: 400;
        line-height: 48px * $size;
        color: rgba(51, 51, 51, 1);
        flex-shrink: 0;
      }
      .el-input {
        >>>input {
          height: 48px * $size;
        }
      }
    }
    > div:nth-child(3) {
      height: 18px * $size;
      line-height: 18px * $size;
      padding-left: 70px * $size;
      img {
        width: 16px * $size;
        vertical-align: middle;
      }
      span {
        font-size: 16px * $size;
        font-weight: 400;
        color: rgba(27, 125, 219, 1);
        vertical-align: middle;
        margin-right: 40px * $size;
      }
    }
    > div:nth-child(4) {
      .el-textarea {
        >>>textarea {
          height: 160px * $size;
        }
      }
    }
    > p:nth-of-type(1) {
      margin-left: 70px * $size;
      font-size: 16px * $size;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .el-button {
      margin: 30px * $size 0 0 70px * $size;
      width: 90px * $size;
      height: 36px * $size;
      background: rgba(224, 18, 32, 1);
      border-radius: 4px * $size;
      font-size: 16px * $size;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      padding: 0;
      line-height: 36px * $size;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>