<template>
  <div class="paySuccess">
    <div class="top">
      <navbar></navbar>
    </div>
    <div class="contain">
      <img src="../../assets/img/zxw/thanks.png" alt="">
      <router-link to="index"><button class="btn" style="margin:0 90px 0 355px">跳转到首页</button></router-link>
      <button class="btn">查看订单详情</button>
    </div>
    <rightNav></rightNav>
  </div>
</template>
<script>
import navbar from "../../components/nav"
export default {
  data(){
    return{

    }
  },
  components:{
    navbar
  }
}
</script>
<style lang="less" scoped>
  .paySuccess{
    margin:0 auto;
  }
  .top{
    width: 1280px;
    margin:40px auto;
  }
  .contain{
    margin:96px auto;
    width: 1280px;
    height: 589px;
    border:4px solid rgba(0, 0, 0, 0.08);
    border-radius:10px;
    box-sizing: border-box;
    img{
      height: 259px;
      width: 406px;
      margin:80px 437px;
    }
    .btn{
      width:260px;
height:70px;
background:rgba(224,18,32,1);
border-radius:4px;
font-size:24px;
font-family:DFYuanW5-GB;
font-weight:400;
color:rgba(255,255,255,1);
border:none;

    }
  }
</style>