<template>
  <div class="set_pass">
    <navbar></navbar>
    <div class="pass">
      <div v-show="show">
        <p class="name">重置密码</p>
        <!-- 设置登录密码 -->
        <div class="phone">
          <!-- <img src="../../assets/img/zch/lock.png" alt />
          <input type="password" placeholder="设置登录密码" v-model="pass1" /> -->
          <el-input placeholder="短信验证码" v-model="pass1">
            <img class="shouji" slot="prefix" style="margin:12px"  src="../../assets/img/zch/lock.png" alt />

          </el-input>
        </div>
        <!-- 确认登录密码 -->
        <div class="phone">
          <!-- <img src="../../assets/img/zch/lock.png" alt />
          <input type="password" placeholder="确认登录密码" v-model="pass2" /> -->
           <el-input placeholder="短信验证码" v-model="pass2">
            <img class="shouji" slot="prefix" style="margin:12px"  src="../../assets/img/zch/lock.png" alt />

          </el-input>
        </div>
        <!-- 确认按钮 -->
        <button class="btn" @click="affirm">确认</button>
      </div>
      <div class="image" v-show="!show">
        <img src="../../assets/img/zch/success.png" alt />
        <button class="go_login" @click="jump('/')">去登录</button>
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
      show: true,
      // 设置密码
      pass1: "",
      // 确认密码
      pass2: ""
    };
  },
  methods: {
    // 确认按钮
    affirm() {
      if (this.pass1 !== this.pass2) {
        this.$message({
          message: "警告哦，两次密码不一致",
          type: "warning"
        });
      } else if (this.pass1 == "" || this.pass2 == "") {
        this.$message({
          message: "警告哦，密码不能为空",
          type: "warning"
        });
      } else if (this.pass1 == this.pass2) {
        this.show = false;
      }
    },
    // 跳转
    jump(a) {
      this.$router.push(a);
    }
  }
};
</script>

<style lang="scss" scoped>$size: 0.8;
.set_pass {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1280px*$size;
  margin:0 auto;
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
  box-sizing:border-box;
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
  width: 21px*$size;
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
.btn {
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
  margin-bottom: 79px*$size;
}
.image {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.image img {
  margin: 70px*$size 0;
}
.image .go_login {
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
  margin-bottom: 60px*$size;
}
</style>