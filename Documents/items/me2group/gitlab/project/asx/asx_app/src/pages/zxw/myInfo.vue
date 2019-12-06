<template>
  <div class="myInfo">
    <div class="top">
      <navbar></navbar>
    </div>
    <div class="contain">
      <div class="name" @click="show=true">
        <div>头像</div>
        <div>
          <img :src="form.img" alt/>
          <van-icon name="arrow" class="arrow"></van-icon>
        </div>
      </div>
      <van-cell title="昵称" is-link :value="form.user" to="/changeName"/>
      <van-cell title="性别" is-link @click="sexShow=true" :value="form.sex"/>
      <van-cell title="出生年月日" is-link @click="dateShow=true" :value="form.date"/>
      <van-cell title="修改手机号" is-link :value="form.phone" to="changePhone"/>
      <van-cell title="修改密码" is-link/>
      <van-cell title="添加/修改邮箱" is-link to="changeEmail"/>
      <van-cell title="个性签名" is-link to="changeMotto"/>
      <van-cell title="我的会员" is-link/>
      <van-cell title="我的收获地址" is-link to="address"/>
      <button class="btn">退出登录</button>
    </div>
    <!-- 修改头像弹框部分 -->
    <div class="pop">
      <van-popup v-model="show" position="bottom" :style="{ height: '3.15rem' }">
        <div class="popTop">
          <div>拍照</div>
          <div>相册</div>
        </div>
        <div class="popBottom" @click="show=false">
          <div>取消</div>
        </div>
      </van-popup>
    </div>

    <!-- 性别选择部分 -->
    <div class="pop">
      <van-popup v-model="sexShow" position="bottom" :style="{ height: '3.15rem' }">
        <div class="popTop">
          <div @click="selectMan">男</div>
          <div @click="selectWoman">女</div>
        </div>
        <div class="popBottom" @click="sexShow=false">
          <div>取消</div>
        </div>
      </van-popup>
    </div>

    <!-- 日期选择器 -->
    <div class="dateShow">
      <van-popup v-model="dateShow" position="bottom" :style="{ height: '50%' }">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          @cancel="cancel"
          @confirm="confirm"
          :formatter="formatter"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        show: false,
        sexShow: false,
        dateShow: false,
        currentDate: new Date(),

        form: {
          img: require("../../assets/image/zxw/user.png"),
          user: "用户昵称",
          sex: "女",
          date: "2019/11/02",
          phone: "18833438383"
        }
      };
    },
    methods: {
      //性别选择点击男时
      selectMan: function () {
        (this.form.sex = "男"), (this.sexShow = false);
      },
      //性别选择点击女时
      selectWoman: function () {
        (this.form.sex = "女"), (this.sexShow = false);
      },
      //时间选择器点击取消时
      cancel: function () {
        this.dateShow = false;
      },
      //时间选择器点击确定时
      confirm: function (a) {
        this.form.date = this.value;
        this.dateShow = false;
        let b = new Date(a);

        this.form.date = b.getFullYear() +
          "/" +
          String(b.getMonth() + 1).padStart(2, "0") +
          "/" +
          String(b.getDate()).padStart(2, "0")

      },

      //给时间选择器加上单位
      formatter: function (type, value) {
        if (type === "year") {
          return `${value}年`;
        } else if (type === "month") {
          return `${value}月`;
        }
        return `${value}日`;
      }
    }
  };
</script>

<style lang="less" scoped>
  .myInfo {
    width: 7.5rem;
    .top {
      background-color: #f5f5f5;
    }
    .contain {
      width: 7.5rem;
      box-sizing: border-box;
      padding: 0 0 0 0.3rem;
      .name {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 1.3rem;
        width: 7.2rem;
        padding-right: 0.3rem;
        box-sizing: border-box;
        border-bottom: 0.01rem solid #f0f0f0;
        > div:nth-child(1) {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        > div:nth-child(2) {
          img {
            width: 0.9rem;
            height: 0.9rem;
            border-radius: 50%;
          }
          .arrow {
            display: block;
            float: right;
            line-height: 0.9rem;
            color: #969799;
            margin-left: 0.2rem;
          }
        }
      }
      .van-cell {
        color: #333333;
        padding: 0.24rem 0.3rem 0.24rem 0;
        border-bottom: 0.01rem solid #f0f0f0;
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
      }
    }
    //点击头像弹出样式
    .pop {
      .van-popup {
        width: 6.9rem;
        margin: 0.3rem;
        background-color: rgba(0, 0, 0, 0);
        .popTop {
          height: 1.97rem;
          width: 6.9rem;
          border-radius: 0.2rem;
          background-color: #fff;
          font-size: 0.28rem;
          text-align: center;
          font-family: PingFang SC;
          font-weight: 300;
          color: rgba(51, 51, 51, 1);
          > div:nth-child(1) {
            height: 0.98rem;
            line-height: 0.98rem;
            border-bottom: 0.01rem solid #f0f0f0;
          }
          > div:nth-child(2) {
            height: 0.98rem;
            line-height: 0.98rem;
          }
        }
        .popBottom {
          width: 6.9rem;
          height: 0.98rem;
          background-color: #fff;
          border-radius: 0.2rem;
          margin-top: 0.2rem;
          text-align: center;
          font-family: PingFang SC;
          font-weight: 300;
          color: rgba(51, 51, 51, 1);
          line-height: 0.98rem;
        }
      }
    }
  }
</style>
