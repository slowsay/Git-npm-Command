<template>
  <!-- 填写资料页 -->
  <el-form :model="Form"  ref="ruleForm">
    <el-form-item prop="number">
      <el-input type="text" v-model="Form.name" placeholder="用户昵称" maxlength="11">
        <img src="../../assets/image/gw/19.png" slot="prefix" />
      </el-input>
    </el-form-item>
    <el-form-item prop="test">
      <el-select v-model="Form.sex" placeholder="选择性别" popper-class="Register_popper">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <img src="../../assets/image/gw/18.png" />
    </el-form-item>
    <el-form-item prop="password1">
      <el-date-picker
        v-model="Form.time"
        type="date"
        placeholder="选择生日信息"
        :clearable="false"
        :editable="false"
      ></el-date-picker>
      <img src="../../assets/image/gw/17.png" />
    </el-form-item>
    <el-form-item prop="password2">
      <el-input type="textarea" v-model="Form.text" placeholder="请输入个性签名(最多140字)" resize="none"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">下一步</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      Form: {
        name: null,
        sex: null,
        time: null,
        text: null
      },
      options: [
        {
          value: "1",
          label: "男"
        },
        {
          value: "2",
          label: "女"
        }
      ]
    };
  },
  methods:{
        onSubmit(){
              this.$emit('submit',true)
        }
  }
};
</script>
<style lang="less" scoped>
.popper {
  display: none !important;
}
.el-form {
  .el-input {
    /deep/input {
      height: 56px;
      background: rgba(250, 250, 250, 1);
      border: 1px solid rgba(230, 230, 230, 1);
      border-radius: 28px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      padding-left: 70px;
    }
    /deep/.el-input__prefix {
      width: 70px;
      line-height: 52px;
      img {
        width: 20px;
        vertical-align: middle;
      }
    }
  }
  .el-form-item {
    margin-bottom: 40px;
    /deep/.el-form-item__error {
      margin-left: 70px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(224, 18, 32, 1);
    }
  }
  .el-form-item:nth-of-type(2) {
    .el-select {
      width: 100%;
      /deep/input {
        height: 56px;
        background: rgba(250, 250, 250, 1);
        border: 1px solid rgba(230, 230, 230, 1);
        border-radius: 28px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        padding-left: 70px;
        padding-right: 70px;
      }
    }
    img {
      position: absolute;
      top: 16px;
      left: 25px;
      width: 25px;
    }
    /deep/.el-input__suffix {
      right: 20px;
    }
  }
  .el-form-item:nth-of-type(3) {
    .el-date-editor {
      width: 100%;
    }
    /deep/ .el-input__prefix {
      display: none;
    }
    img {
      position: absolute;
      top: 14px;
      left: 25px;
      width: 24px;
    }
  }
  .el-form-item:nth-of-type(4) {
    /deep/textarea {
      height: 110px;
      background: rgba(250, 250, 250, 1);
      border: 1px solid rgba(230, 230, 230, 1);
      border-radius: 28px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      padding: 20px;
    }
  }
  .el-form-item:nth-of-type(5) {
    .el-button {
      width: 450px;
      height: 56px;
      background: #FF9494;
      border: none;
      border-radius: 28px;
      font-size: 18px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  .el-form-item:nth-last-of-type(1) {
    margin-bottom: 0;
  }
}
</style>