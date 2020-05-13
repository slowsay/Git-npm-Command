<template>
  <div class="posts">
    <!-- 发表新帖 -->
    <div class="content">
      <div class="image_text">
        <div class="left">
          <div class="img_wz">
            <img src="../assets/img/zch/shop/chakan.png" alt />
            <p>几级可见</p>
          </div>
          <div class="img_wz">
            <img src="../assets/img/zch/shop/tup.png" alt />
            <p>图片</p>
          </div>
          <div class="img_wz">
            <img src="../assets/img/zch/shop/shipin.png" alt />
            <p>视频</p>
          </div>
          <div class="img_wz">
            <img src="../assets/img/zch/shop/O.png" alt />
            <p>表情</p>
          </div>
          <div class="img_wz">
            <img src="../assets/img/zch/shop/tp.png" alt />
            <p>发起投票</p>
          </div>
        </div>
        <img src="../assets/img/zch/shop/3x.png" alt class="allp" />
      </div>
      <div class="texta">
        <el-input
          type="textarea"
          :autosize="{ minRows: 13, maxRows: 15}"
          placeholder="请输入内容"
          v-model="textarea2"
        ></el-input>
      </div>
    </div>
    <p class="sumbit">发表</p>
    <!-- 右侧导航 -->
    <rightNav></rightNav>
  </div>
</template>

<script>
import rightNav from "../components/right_nav";
import navbar from "../components/nav";
export default {
  components: {
    navbar,
    rightNav
  },
  data() {
    return { textarea2: "" };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>$size: 0.8;
.posts {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  margin-left: 31px*$size;
  width: 100%;
  padding-left: 1px*$size;
}
.content {
  width: 80%;
  background: rgba(250, 250, 250, 1);
  border: 1px*$size solid rgba(230, 230, 230, 1);
  border-radius: 10px*$size;
  margin-top: 2%;
}
.content .top p {
  font-size: 30px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  border-bottom: 1px*$size solid rgba(230, 230, 230, 1);
  padding: 1%;
}
.playshold {
  width: 100%;
  display: flex;
  justify-content: center;
  border: 1px*$size solid rgba(230, 230, 230, 1);
  padding-bottom: 2%;
}
.playshold input {
  width: 94%;
  margin-top: 2%;
  height: 50px*$size;
}
.image_text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3% 0;
}
.image_text .allp {
  width: 18px*$size;
  height: 18px*$size;
  margin-right: 3%;
}
.image_text .left {
  display: flex;
  justify-content: space-around;
  width: 50%;
}
.image_text .left .img_wz {
  display: flex;
  align-items: center;
}
.image_text .left .img_wz:first-child img {
  width: 18px*$size;
  height: 13px*$size;
}
.image_text .left .img_wz p {
  font-size: 16px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 22px*$size;
}
.image_text .left .img_wz img {
  width: 17px*$size;
  height: 18px*$size;
}
.texta {
  padding: 1% 3%;
}
.sumbit {
  background: rgba(224, 18, 32, 1);
  border: 1px*$size solid rgba(224, 18, 32, 1);
  border-radius: 4px*$size;
  font-size: 18px*$size;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 36px*$size;
  width: 7%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px*$size 0;
}
</style>