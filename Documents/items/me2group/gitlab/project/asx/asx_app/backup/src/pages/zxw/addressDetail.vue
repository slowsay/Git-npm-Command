<template>
  <div class="addressDetail">
    <navbar></navbar>
    <van-cell-group >
  <van-field v-model="form.name" label="联系人"  placeholder="姓名" />
  <van-field v-model="form.phone" label="电话"  placeholder="手机号码" />
  <van-field v-model="form.address" label="地址"  placeholder="输入收获地址" />
  <van-field v-model="form.number" label="门牌号"   placeholder="例：5号楼203室" />
</van-cell-group>
<van-cell title="设置为默认地址" style="margin-top:.2rem" value="内容" ><van-switch v-model="checked" size=".28rem" /></van-cell>
<van-cell value="删除收货地址"  style="margin-top:.2rem;" />  
<button class="btn" @click="save">保存</button>
</div>
</template>

<script>
export default {
  data(){
    return{
       checked: true,
       form:{
         name:'',
         phone:'',
         address:'',
         number:'',
       }
    }
  },
  methods:{
    save(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
  .addressDetail{
    background-color: #f5f5f5;
    position: absolute;
    top:0;
    left: 0;
    bottom: 0;
    .van-cell{
      font-size: .28rem;
      padding:.3rem;
      line-height: .36rem;
    }
    /deep/.van-field__label{
      width: 1.5rem;
    }
    /deep/.van-cell__value--alone{
      color:#FF1E1E
    }
    .btn {
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