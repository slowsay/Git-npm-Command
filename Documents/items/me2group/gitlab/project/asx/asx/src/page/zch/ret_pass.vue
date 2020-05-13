<template>
  <div class="ret_pass">
    <navbar></navbar>
    <!-- 找回密码弹出框 -->
    <div class="pass">
      <p class="name">找回密码</p>
      <!-- 手机号 -->
      <div class="phone">
        
        <!-- <input type="text" placeholder="请输入手机号码" v-model="phone" /> -->
        <el-input placeholder="请输入手机号" v-model="phone">
          <img class="shouji" slot="prefix" style="margin:12px" src="../../assets/img/zch/phone.png" alt />
    </el-input>
      </div>
      <!-- 验证码 -->
      <div class="note">
        <div class="phones">
          <!-- <input type="text" placeholder="短信验证码" v-model="reg" /> -->
          <el-input placeholder="短信验证码" v-model="reg">
            <img class="shouji" slot="prefix" style="margin:12px"  src="../../assets/img/zch/reg.png" alt />
          </el-input>
        </div>
        <button class="btn">获取验证码</button>
      </div>
      <!-- 下一步 -->
      <button class="next" @click="next_sept">下一步</button>
      <!-- 选择方式 -->
      <div class="bottom">
        <p class="title" @click="jump('/')">账号登录</p>
        <div class="text">
          <p class="title" @click="$router.push('Register')">快速注册</p>
          <img src="../../assets/img/zch/up.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navbar from "../../components/nav";
export default {
  components: {
    navbar
  },
  data() {
    return {
      // 手机号
      phone: "",
      // 验证码
      reg: ""
    };
  },
  methods: {
    next_sept() {
      this.$router.push("/set_pass");
    },
    // 跳转
    jump(a) {
      this.$router.push(a);
    }
  }
};
</script>
<style lang="scss" scoped>$size: 0.8;
.ret_pass {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1280px*$size;
  margin: 0 auto;
}
 >>>.el-input__inner {
      display: flex;
      align-items: center;
      height: 56px*$size;
      border-radius: 28px*$size;
      margin-bottom: 20px*$size;
      padding-left: 70px*$size;
      font-size: 16px*$size;
    }
.pass {
  margin-top: 170px*$size;
  width: 570px*$size;
  background: rgba(255, 255, 255, 1);
  border: 4px*$size solid rgba(0, 0, 0, 0.08);
  border-radius: 20px*$size;
  padding: 0 56px*$size;
  box-sizing: border-box;
}
.name {
  margin: 69px*$size 0 60px*$size;
  font-size: 30px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.phone {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 40px*$size;
}
.phone img {
  position: absolute;
  left: 6%;
  width: 17px*$size;
  height: 24px*$size;
}
.phone input {
  width: 100%;
  height: 56px*$size;
  padding-left: 100px*$size;
  font-size: 30px*$size;
  border-radius: 30px*$size;
  outline: none;
}
.note {
  display: flex;
  justify-content: center;
}
.note .phones {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 40px*$size;
}
.note .phones input {
  width: 100%;
  height: 56px*$size;
  padding-left: 100px*$size;
  font-size: 30px*$size;
  border-radius: 30px*$size;
  outline: none;
}
.note .phones img {
  position: absolute;
  left: 8%;
  width: 17px*$size;
  height: 24px*$size;
}
.note .btn {
  font-size: 18px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  background: rgba(224, 18, 32, 1);
  border-radius: 28px*$size;
  outline: none;
  border: 0;
  height: 56px*$size;
  width: 38%;
  margin-left: 3%;
}
.next {
  font-size: 18px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  width: 100%;
  height: 56px*$size;
  margin: 20px*$size 0;
  background: rgba(224, 18, 32, 1);
  border-radius: 28px*$size;
  outline: none;
  border: 0;
}
.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px*$size 0 59px*$size;
}
.text {
  display: flex;
  justify-content: center;
  align-items: center;
}
.text img {
  width: 9px*$size;
  height: 14px*$size;
}
.title {
  font-size: 16px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
</style>