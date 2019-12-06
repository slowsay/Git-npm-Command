<template>
  <!-- 公共头部 -->
  <div id ="navTop">
     <div class="top">
       <div class="caidan">
         <img src="../assets/image/zxw/caidan.png" alt="">
       </div>
       <div class="title">
          <img src="../assets/image/zxw/title.png" alt="">
       </div>
      <div class="suo">
        <img src="../assets/image/zxw/suo.png" alt="">
      </div>
  </div>
  </div>
 
</template>

<script>
export default {

}
</script>
<style lang="less" scoped>
#navTop{

   height: .88rem;
    width: 7.5rem;
    background-color: #fff;
  .top{
    position: fixed;
    display: flex;
    justify-content:space-between;
    align-items: center;
     height: .88rem;
    width: 7.5rem;
     padding:0 .3rem;
     box-sizing: border-box;
    .caidan{
      img{
        width: .36rem;
        height: .29rem;
      }
    }
    .title{
      img{
        width: 1.15rem;
        height: .54rem;
      }
    }
    .suo{
      img{
        width: .34rem;
        height: .4rem;
      }
    }
  }
}
  
</style>