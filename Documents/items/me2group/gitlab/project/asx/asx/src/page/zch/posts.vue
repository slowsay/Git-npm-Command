<template>
  <div class="posts">
    <!-- 顶部 -->
    <navbar></navbar>
    <!-- 发表新帖 -->
    <div class="content">
      <div class="top">
        <p>发表新帖</p>
      </div>
      <div class="playshold">
        <input type="text" placeholder="请填写标题" />
      </div>
      <div class="image_text">
        <div class="left">
          <div class="img_wz">
            <img src="../../assets/img/zch/shop/chakan.png" alt />
            <p>几级可见</p>
          </div>
          <div class="img_wz">
            <img src="../../assets/img/zch/shop/tup.png" alt />
            <p>图片</p>
          </div>
          <div class="img_wz">
            <img src="../../assets/img/zch/shop/shipin.png" alt />
            <p>视频</p>
          </div>
          <div class="img_wz">
            <img src="../../assets/img/zch/shop/O.png" alt />
            <p>表情</p>
          </div>
          <div class="img_wz">
            <img src="../../assets/img/zch/shop/tp.png" alt />
            <p>发起投票</p>
          </div>
        </div>
        <img src="../../assets/img/zch/car/smll.png" alt class="allp" @click="$router.go(-1)" />
      </div>
      <div class="texta">
        <el-input
          type="textarea"
          :autosize="{ minRows: 13, maxRows: 15}"
          placeholder="请输入内容"
          v-model="textarea2"
        ></el-input>
      </div>
      <div class="btn">
        <p class="sumbit">发表</p>
        <p class="out">退出</p>
      </div>
    </div>
    <!-- 右侧导航 -->
    <rightNav></rightNav>
  </div>
</template>

<script>
import rightNav from "../../components/right_nav";
import navbar from "../../components/nav";
export default {
  components: {
    navbar,
    rightNav
  },
  data() {
    return { textarea2: "" };
  }
};
</script>

<style scoped>
.posts {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1280px;
  margin: auto;
}
.content {
  width: 100%;
  background: rgba(250, 250, 250, 1);
  border: 1px solid rgba(230, 230, 230, 1);
  border-radius: 10px;
  margin-top: 2%;
}
.content .top p {
  font-size: 30px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  border-bottom: 1px solid rgba(230, 230, 230, 1);
  padding: 1%;
}
.playshold {
  width: 94%;
  margin-left: 3%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgba(230, 230, 230, 1);
  padding-bottom: 2%;
}
.playshold input {
  width: 100%;
  margin-top: 2%;
  height: 50px;
}
.image_text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1% 0;
}
.image_text .allp {
  width: 18px;
  height: 18px;
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
  width: 18px;
  height: 13px;
}
.image_text .left .img_wz p {
  font-size: 16px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 22px;
}
.image_text .left .img_wz img {
  width: 17px;
  height: 18px;
}
.texta {
  padding: 1% 3%;
}
.btn {
  display: flex;
  justify-content: space-between;
  padding: 1% 4%;
}
.btn .sumbit {
  background: rgba(224, 18, 32, 1);
  border: 1px solid rgba(224, 18, 32, 1);
  border-radius: 4px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 36px;
  width: 7%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn .out {
  border: 1px solid rgba(179, 179, 179, 1);
  border-radius: 4px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(179, 179, 179, 1);
  line-height: 36px;
  width: 7%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>