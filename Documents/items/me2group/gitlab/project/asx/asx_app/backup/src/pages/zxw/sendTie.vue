<template>
  <div class="sendTie">
    <div class="top">
      <navbar></navbar>
      <div  @click="send" :class="value!=''&&value1!=''?'redsend':'send'">发布</div>
    </div>
    <div class="contain">
        <van-field v-model="value" placeholder="请输入贴子标题" size=".3rem" />
        <van-field v-model="value1" type="textarea" autosize="{ maxHeight: 1000, minHeight: 200 " placeholder="请输入贴子内容 ~" size=".26rem" />
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      value:"",
      value1:''
    }
  },
  methods:{
    send(){
      if(this.value!=''&&this.value1!=''){
        this.$toast('发表成功');
        this.$router.go(-1);
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .top{
    .send{
      float: right;
      margin:-.56rem .32rem 0 0;
      font-size:.28rem;
font-family:PingFang SC;
font-weight:400;
color:rgba(204,204,204,1);
line-height:.36rem;
    }
    .redsend{
       float: right;
      margin:-.56rem .32rem 0 0;
      font-size:.28rem;
font-family:PingFang SC;
font-weight:400;
color:#E01220;
line-height:.36rem;
    }
  }
</style>