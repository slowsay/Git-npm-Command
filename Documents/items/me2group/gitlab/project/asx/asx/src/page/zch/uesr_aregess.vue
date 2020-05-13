<template>
  <div class="ret_pass">
    <navbar></navbar>
    <!-- 找回密码弹出框 -->
    <div class="pass">
      <h4 class="title">用户协议</h4>
      <p class="name">
        《用户协议》（以下简称“本协议”）是您（或称“用户”，指注册、登录、使用、浏览本服务的个人或组织）与牛电科技有限责任公司及其关联公司（以下简称“小牛”）及其运营合作单位（以下简称“合作单位”）之间关于牛电科技网站（www.niu.com，简称本网站）与牛电科技产品、程序及服务（包括但不限于小牛电动车）所订立的协议。
        小牛在此特别提醒用户认真阅读、充分理解---本协议中各条款，包括免除或者限制牛责任的免责条款及对用户的权利限制条款。请您审慎阅读并选择接受或不接受本协议(未成年人应在法定监护人陪同下阅读）。
        除非您接受本协议所有条款，否则您无权注册、登录或使用本协议所涉相关服务。您的注册、登录、使用等行为将视为对本协议的接受，并同意接受本协议各项条款的约束。
        您对本协议的接受即自愿接受全部条款的约束，包括接受牛电科技有限责任公司对任一服务条款随时所做的任何修改。
        本协议可由小牛随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知，用户可在本网站查阅最新版协议条款。在小牛修改本协议相关条款之后，如果用户不接受修改后的条款，请立即停止使用小牛提供的服务，用户继续使用小牛提供的服务将被视为已接受了修改后的协议。
      </p>
      <button class="btn">确认</button>
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
  width: 100%;
}
.pass {
  margin-top: 35px*$size;
  width: 50%;
  background: rgba(255, 255, 255, 1);
  border: 4px*$size solid rgba(0, 0, 0, 0.08);
  border-radius: 20px*$size;
  padding: 0 56px*$size;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.pass .title {
  font-size: 30px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 36px*$size;
  margin: 39px*$size 0;
}
.pass .name {
  font-size: 16px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 24px*$size;
}
.pass .btn {
  background: rgba(224, 18, 32, 1);
  border-radius: 28px*$size;
  outline: none;
  border: 0;
  width: 17%;
  height: 36px*$size;
  font-size: 18px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  margin: 22px*$size 0;
}
</style>