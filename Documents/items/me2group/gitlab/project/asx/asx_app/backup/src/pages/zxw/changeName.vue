<template>
  <div class="changeName">
    <navbar></navbar>
    <van-cell-group>
  <van-field v-model="value" placeholder="请输入用户名" />
</van-cell-group>
<button class='btn' @click="confirm">确认</button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      value:"用户昵称",
    }
  },
  methods:{
    confirm(){
      this.$toast('修改成功')
      this.$router.go(-1);
    }
  }

}
</script>

<style lang="less" scoped>
  .changeName{
    position: absolute;
    top:0;
    left: 0;
    bottom:0;
    width: 7.5rem;
    background-color: #f5f5f5;
    .btn{
      width: 6.9rem;
      height: 0.8rem;
      background: rgba(224, 21, 35, 1);
      border-radius: 0.4rem;
      font-size: 0.28rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      border: none;
      position: absolute;
      bottom: 0.3rem;
      margin-left: .3rem;
    }
  }
</style>