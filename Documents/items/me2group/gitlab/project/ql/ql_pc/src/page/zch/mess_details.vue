<template>
  <div class="system">
    <div class="image">
      <img src="../../assets/image/zch/mess.png" alt />
    </div>
    <div class="text">
      <h4 class="title">全场8折起</h4>
      <p
        class="name"
      >杭州田丁科技有限公司是一家专注于中高端APP开发和网站建设的公司，同样也是一家致力于行业软件及解决方案的公司。坐落于有着“上有天堂，下有苏杭”美誉之称并且已高度化互联网的杭州，公司从创业初期只有几个人的团队发展到如今有60+的大型团队。我们拥有一支年轻充满朝气的团队，我们是一个在战斗中的团队，我们是一群狂热的技术人员。我们团队的核心人员曾就职于爱奇艺、国美在线、易车等大型互联网公司，大多数有着5年以上丰富的开发实践经验，为政府企业及个人提供基于移动终端的客户端平台开发等各种服务。我们始终秉承以品质为生存，以信誉求发展的服务宗旨，只为用心做好每一件事！Choose us ,Not regret</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.system {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  .image {
    width: 1280px;
    height: 400px;
    margin: 20px 0 30px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .text {
    width: 1280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 180px;
    .title {
      font-size: 28px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(74, 74, 74, 1);
      line-height: 40px;
    }
    .name {
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(74, 74, 74, 1);
      line-height: 40px;
      margin-top: 23px;
    }
  }
}
</style>