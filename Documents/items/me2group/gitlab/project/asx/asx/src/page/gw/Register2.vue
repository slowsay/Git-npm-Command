<template>
  <!-- 填写资料页 -->
  <el-form :model="Form" :rules="rules" ref="ruleForm">
    <el-form-item prop="number">
      <el-input type="text" v-model="Form.name" placeholder="用户昵称" maxlength="11">
        <img src="../../assets/img/gw/8.png" slot="prefix" />
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
      <img src="../../assets/img/gw/9.png" />
    </el-form-item>
    <el-form-item prop="password1">
      <el-date-picker
        v-model="Form.time"
        type="date"
        placeholder="选择生日信息"
        :clearable="false"
        :editable="false"
      ></el-date-picker>
      <img src="../../assets/img/gw/7.png" />
    </el-form-item>
    <el-form-item prop="password2">
      <el-input type="textarea" v-model="Form.text" placeholder="请输入个性签名(最多140字)" resize="none"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">注册</el-button>
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
<style lang="scss" scoped>$size: 0.8;
.popper {
  display: none !important;
}
.el-form {
  .el-input {
    >>>input {
      height: 56px*$size;
      background: rgba(250, 250, 250, 1);
      border: 1px*$size solid rgba(230, 230, 230, 1);
      border-radius: 28px*$size;
      font-size: 16px*$size;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      padding-left: 70px*$size;
    }
    >>>.el-input__prefix {
      width: 70px*$size;
      line-height: 52px*$size;
      img {
        width: 20px*$size;
        vertical-align: middle;
      }
    }
  }
  .el-form-item {
    margin-bottom: 40px*$size;
    >>>.el-form-item__error {
      margin-left: 70px*$size;
      font-size: 16px*$size;
      font-weight: 400;
      color: rgba(224, 18, 32, 1);
    }
  }
  .el-form-item:nth-of-type(2) {
    .el-select {
      width: 100%;
      >>>input {
        height: 56px*$size;
        background: rgba(250, 250, 250, 1);
        border: 1px*$size solid rgba(230, 230, 230, 1);
        border-radius: 28px*$size;
        font-size: 16px*$size;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        padding-left: 70px*$size;
        padding-right: 70px*$size;
      }
    }
    img {
      position: absolute;
      top: 16px*$size;
      left: 25px*$size;
      width: 25px*$size;
    }
    >>>.el-input__suffix {
      right: 20px*$size;
    }
  }
  .el-form-item:nth-of-type(3) {
    .el-date-editor {
      width: 100%;
    }
    >>> .el-input__prefix {
      display: none;
    }
    img {
      position: absolute;
      top: 14px*$size;
      left: 25px*$size;
      width: 24px*$size;
    }
  }
  .el-form-item:nth-of-type(4) {
    >>>textarea {
      height: 110px*$size;
      background: rgba(250, 250, 250, 1);
      border: 1px*$size solid rgba(230, 230, 230, 1);
      border-radius: 28px*$size;
      font-size: 16px*$size;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      padding: 20px*$size;
    }
  }
  .el-form-item:nth-of-type(5) {
    .el-button {
      width: 450px*$size;
      height: 56px*$size;
      background: rgba(224, 18, 32, 1);
      border: none;
      border-radius: 28px*$size;
      font-size: 18px*$size;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  .el-form-item:nth-last-of-type(1) {
    margin-bottom: 0;
  }
}
</style>