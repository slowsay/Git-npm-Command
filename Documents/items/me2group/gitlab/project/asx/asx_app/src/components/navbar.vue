<template>
<div class="narbar-box" style="height:.88rem;width:7.5rem" >
  <div class="navbar">
    <div class="left" >
      <van-icon name="arrow-left" @click="$router.go(-1)"></van-icon>
    </div>
    <div class="middle">
     <p class="title"> {{$route.meta.title}}</p>
    </div>
    <div class="right">
    </div>
  </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>

  .navbar{
    height: .88rem;
    width: 7.5rem;
    padding: 0 .3rem;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content:space-between;
    .left{
      width: 1.5rem;
      font-size: .32rem;
      color:#000000;
      margin-top:.08rem;
    }
    .middle{
      font-size:.32rem;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(0,0,0,1);
    }
    .right{
      width: 1.5rem;
    }
  }
</style>