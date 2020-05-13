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
        <el-input v-model="data.name" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <p>性别:</p>
        <el-select v-model="data.gender" placeholder="请选择">
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

        <p>
          {{data.levelName}}
          <!--<el-progress  type="circle" :percentage="data.level"></el-progress>-->
        </p>

        <div>
          <div></div>
        </div>
      </div>
      <div>
        <p>绑定手机号:</p>
        <el-input v-model="data.phone" disabled placeholder="请输入内容"></el-input>
        <p @click="editPhoneHandle">修改绑定</p>
      </div>
      <div>
        <p>绑定邮箱:</p>
        <el-input v-model="data.email" disabled placeholder="请输入内容"></el-input>
        <p>修改绑定</p>
      </div>
      <div>
        <p>个性签名:</p>
        <el-input v-model="data.sign" type="textarea" placeholder="请输入内容" resize="none"></el-input>
      </div>
    </div>
    <el-button @click="saveHandle">保存</el-button>
    <el-dialog
      class="editphone"
      title="修改手机号码"
      :visible.sync="dialogVisible"
      width="30%">
      <el-row>
        <el-col :span="6">
          <el-input v-model="editphone" type="text" placeholder="请输入手机号" resize="none"></el-input>
          <el-input v-model="verificationCode" type="text" placeholder="请输入验证码" resize="none"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-button @click="dialogVisible = false">取 消</el-button>
        </el-col>
        <el-col :span="1">
          &nbsp;
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="savePhoneHandle">确 定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';

  export default {
    data: function () {
      return {
        dialogVisible: false,
        editphone: '',
        verificationCode: '',
        options: [
          {
            value: 0,
            label: "男"
          },
          {
            value: 1,
            label: "女"
          }
        ],
        data: {
          level: 0,
          name: "",
          gender: "",
          grade: "11级",
          phone: "",
          email: "",
          sign: ""
        }
      };
    },
    created: function () {
      if (publicFn.getStore("qluserInfo")) {
        this.userinfo = JSON.parse(publicFn.getStore("qluserInfo"));
        this.init();
      }
      else {
        this.$router.push('/Login');
      }
    },
    methods: {
      init: function () {
        this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id};

        //获取用户信息
        this.myInfo();
      },
      //更改
      savePhoneHandle: function () {
        var _this = this, _editphone = this.editphone, _verificationCode = this.verificationCode;
        if (_editphone.length < 11) {

        }
        else {
          API.request({
            method: "post",
            url: API.myInfo,
            headers: this.headerobj,
//          data: API.qs.stringify({queryType: (this.type + 1)})
          }).then(function (e) {
            if (e.data.code == 200) {
              if (e.data.success) {
                _this.dialogVisible = true;
              }
              else {
                _this.$message.error(JSON.stringify(e.data.msg));
              }
            }
            else {
              _this.$message.error(JSON.stringify(e.data.msg));
            }

          }).catch(function (e) {
            _this.$message.error(JSON.stringify(e));
          })
        }
      },
      editPhoneHandle: function () {
        this.dialogVisible = true;
      },
      //获取用户信息
      myInfo: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.myInfo,
          headers: this.headerobj,
//          data: API.qs.stringify({queryType: (this.type + 1)})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.data = e.data.data;
            }
            else {
              _this.$message.error(JSON.stringify(e.data.msg));
            }
          }
          else {
            _this.$message.error(JSON.stringify(e.data.msg));
          }

        }).catch(function (e) {
          _this.$message.error(JSON.stringify(e));
        })
      },
      //保存
      saveHandle: function () {
        var _this = this, _gender = this.data.gender, _name = this.data.name, _phone = this.data.phone, _email = this.data.email, _sign = this.data.sign;
        if (_name.length < 1) {
          _this.$message.error("请输入标题");
        }
        else if (_sign.length < 1) {
          _this.$message.error("请输入个人说明");
        }
        else {
          var params = {
            gender: _gender,
            phone: _phone,
            email: _email,
            name: _name,
            sign: _sign
          }
          API.request({
            method: "post",
            url: API.myInfoMerge,
            headers: this.headerobj,
            data: API.qs.stringify(params)
          }).then(function (e) {
            if (e.data.code == 200) {
              if (e.data.success) {
                _this.$message.success("更新成功");
                _this.init();
              }
              else {
                _this.$message.error(JSON.stringify(e.data.msg));
              }
            }
            else {
              _this.$message.error(JSON.stringify(e.data.msg));
            }

          }).catch(function (e) {
            _this.$message.error(JSON.stringify(e));
          })
        }
      }
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
        /deep/ .el-input {
          height: 40px;
          width: 340px;
        }
        /deep/ .el-textarea {
          width: 340px;
          height: 120px;
          textarea {
            height: 120px;
          }
        }
      }
      /*> div:nth-child(4) {*/
      /*> p:nth-child(2) {*/
      /*line-height: 40px;*/
      /*vertical-align: baseline;*/
      /*}*/
      /*> div {*/
      /*position: relative;*/
      /*margin-left: 15px;*/
      /*margin-top: 15px;*/
      /*width: 284px;*/
      /*height: 15px;*/
      /*background: rgba(245, 245, 245, 1);*/
      /*border-radius: 7px;*/
      /*}*/
      /*> div > div {*/
      /*position: absolute;*/
      /*width: 140px;*/
      /*height: 15px;*/
      /*background: #ff9494;*/
      /*border-radius: 7px;*/
      /*}*/
      /*}*/
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
    .editphone {
      line-height: 30px;
      text-align: center;
      display: flex;
      .inputs {
        color: #000;
      }
      .el-button {
        background: rgba(255, 148, 148, 1);
        border-radius: 4px;
        font-size: 28px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        border: none;
        /*margin: 30px 0 20px 160px;*/
      }
    }
  }
</style>
