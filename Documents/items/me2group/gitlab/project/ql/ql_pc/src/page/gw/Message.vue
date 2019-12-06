<template>
  <div id="Message">
    <div class="top">
      <div>
        <p>个人信息</p>
        <p>修改个人信息</p>
      </div>
      <div></div>
    </div>
    <div class="information">
      <p>我的基础信息</p>
      <div>
        <p>会员名:</p>
        <el-input v-model="name" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <p>性别:</p>
        <el-select v-model="sex" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        <p>我的等级:</p>
        <p>{{grade}}</p>
        <div>
          <div></div>
        </div>
      </div>
      <div>
        <p>绑定手机号:</p>
        <el-input v-model="number" placeholder="请输入内容"></el-input>
        <p>修改绑定</p>
      </div>
      <div>
        <p>绑定邮箱:</p>
        <el-input v-model="mail" placeholder="请输入内容"></el-input>
        <p>修改绑定</p>
      </div>
      <div>
        <p>个性签名:</p>
        <el-input v-model="autograph" type="textarea" placeholder="请输入内容" resize="none"></el-input>
      </div>
    </div>
    <el-button>保存</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: "男",
          label: "男"
        },
        {
          value: "女",
          label: "女"
        }
      ],
      name: "",
      sex: "",
      grade: "11级",
      number: "",
      mail: "",
      autograph: ""
    };
  }
};
</script>
<style lang="less" scoped>
#Message {
  .top {
    > div:nth-child(1) {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin: 30px 0 10px;
      p:nth-child(1) {
        font-size: 28px;
        font-weight: 500;
        color: rgba(74, 74, 74, 1);
        line-height: 40px;
      }
      p:nth-child(2) {
        font-size: 22px;
        font-weight: 400;
        color: rgba(12, 118, 216, 1);
        line-height: 30px;
      }
      
    }
     > div:nth-child(2) {
      border-bottom: 5px dotted #4a4a4a;
    }
  }
  .information {
    padding-left: 10px;
    > p:nth-child(1) {
      font-size: 22px;
      font-weight: bold;
      color: rgba(74, 74, 74, 1);
      line-height: 30px;
      margin: 30px 0 15px;
    }
    > div {
      display: flex;
      > p:nth-child(1) {
        width: 150px;
        font-size: 22px;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        line-height: 40px;
        margin-bottom: 30px;
      }
      > p:nth-child(3) {
        font-size: 16px;
        font-weight: 400;
        color: rgba(12, 118, 216, 1);
        line-height: 40px;
        margin-left: 10px;
      }
      /deep/.el-input {
        height: 40px;
        width: 340px;
      }
      /deep/.el-textarea {
        width: 340px;
        height: 120px;
        textarea {
          height: 120px;
        }
      }
    }
    > div:nth-child(4) {
      > p:nth-child(2) {
        line-height: 40px;
        vertical-align: baseline;
      }
      > div {
        position: relative;
        margin-left: 15px;
        margin-top: 15px;
        width: 284px;
        height: 15px;
        background: rgba(245, 245, 245, 1);
        border-radius: 7px;
      }
      > div > div {
        position: absolute;
        width: 140px;
        height: 15px;
        background: #ff9494;
        border-radius: 7px;
      }
    }
  }
  .el-button {
    width: 180px;
    height: 60px;
    background: rgba(255, 148, 148, 1);
    border-radius: 4px;
    font-size: 28px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    border: none;
    margin: 30px 0 20px 160px;
  }
}
</style>