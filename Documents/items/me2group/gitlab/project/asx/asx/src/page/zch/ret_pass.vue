<template>
  <div class="ret_pass">
    <navbar></navbar>
    <!-- 找回密码弹出框 -->
    <div class="pass">
      <p class="name">找回密码</p>
      <!-- 手机号 -->
      <div class="phone">
        <img src="../../assets/img/zch/phone.png" alt />
        <input type="text" placeholder="请输入手机号码" v-model="phone" />
      </div>
      <!-- 验证码 -->
      <div class="note">
        <div class="phones">
          <img src="../../assets/img/zch/reg.png" alt />
          <input type="text" placeholder="短信验证码" v-model="reg" />
        </div>
        <button class="btn">获取验证码</button>
      </div>
      <!-- 下一步 -->
      <button class="next" @click="next_sept">下一步</button>
      <!-- 选择方式 -->
      <div class="bottom">
        <p class="title" @click="jump('/')">账号登录</p>
        <div class="text">
          <p class="title" @click="jump">快速注册</p>
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
<style scoped>
.ret_pass {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.pass {
  margin-top: 35px;
  width: 50%;
  background: rgba(255, 255, 255, 1);
  border: 4px solid rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  padding: 0 56px;
}
.name {
  margin: 69px 0 60px;
  font-size: 30px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.phone {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 40px;
}
.phone img {
  position: absolute;
  left: 6%;
  width: 17px;
  height: 24px;
}
.phone input {
  width: 100%;
  height: 56px;
  padding-left: 100px;
  font-size: 30px;
  border-radius: 30px;
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
  margin-bottom: 40px;
}
.note .phones input {
  width: 100%;
  height: 56px;
  padding-left: 100px;
  font-size: 30px;
  border-radius: 30px;
  outline: none;
}
.note .phones img {
  position: absolute;
  left: 8%;
  width: 17px;
  height: 24px;
}
.note .btn {
  font-size: 18px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  background: rgba(224, 18, 32, 1);
  border-radius: 28px;
  outline: none;
  border: 0;
  height: 56px;
  width: 38%;
  margin-left: 3%;
}
.next {
  font-size: 18px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  width: 100%;
  height: 56px;
  margin: 20px 0;
  background: rgba(224, 18, 32, 1);
  border-radius: 28px;
  outline: none;
  border: 0;
}
.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0 59px;
}
.text {
  display: flex;
  justify-content: center;
  align-items: center;
}
.text img {
  width: 9px;
  height: 14px;
}
.title {
  font-size: 16px;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
</style>