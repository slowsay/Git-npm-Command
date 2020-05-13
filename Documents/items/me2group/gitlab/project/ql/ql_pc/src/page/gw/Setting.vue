<template>
  <div id="Follow">
    <div class="top">
      <div>
        <p>消息设置</p>
      </div>
      <div></div>
    </div>
    <div class="setting">
      <el-row>
        <el-col :span="3">
          订单消息
        </el-col>
        <el-col :span="5">
          <el-switch
            v-model="data.ord"
            @change="ordHandle"
            active-color="#13ce66"
            inactive-color="#999999">
          </el-switch>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          余额变动通知
        </el-col>
        <el-col :span="5">
          <el-switch
            v-model="data.balance"
            @change="balanceHandle"
            active-color="#13ce66"
            inactive-color="#999999">
          </el-switch>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          系统通知
        </el-col>
        <el-col :span="5">
          <el-switch
            v-model="data.sys"
            @change="sysHandle"
            active-color="#13ce66"
            inactive-color="#999999">
          </el-switch>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          客服通知
        </el-col>
        <el-col :span="5">
          <el-switch
            v-model="data.clientService"
            @change="clientServiceHandle"
            active-color="#13ce66"
            inactive-color="#999999">
          </el-switch>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    data: function () {
      return {
        data: {
          ord: false,
          sys: false,
          clientService: false,
          balance: false,
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
        //查询当前用户设置的是否接受消息提醒
        this.setQuery();
      },
      clientServiceHandle: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.setClientService,
          headers: this.headerobj,
          data: API.qs.stringify({onOff: this.data.clientService ? 1 : 2})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success("设置成功");
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
      sysHandle: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.setSys,
          headers: this.headerobj,
          data: API.qs.stringify({onOff: this.data.sys ? 1 : 2})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success("设置成功");
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
      ordHandle: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.setOrd,
          headers: this.headerobj,
          data: API.qs.stringify({onOff: this.data.ord ? 1 : 2})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success("设置成功");
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
      balanceHandle: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.setBalance,
          headers: this.headerobj,
          data: API.qs.stringify({onOff: this.data.balance ? 1 : 2})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success("设置成功");
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
      //查询当前用户设置的是否接受消息提醒
      setQuery: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.setQuery,
          headers: this.headerobj,
//          data: API.qs.stringify({userId: this.userinfo.id})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.data = _this.exchangeData(e.data.data);
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
      exchangeData: function (v) {
        v.ord = v.ord == 1 ? true : false;
        v.sys = v.sys == 1 ? true : false;
        v.balance = v.balance == 1 ? true : false;
        v.clientService = v.clientService == 1 ? true : false;
        return v;
      }
    }
  };
</script>
<style lang="less" scoped>
  #Follow {
    .setting {
      padding: 50px;
      line-height: 50px;
    }
    .top {
      margin-bottom: 10px;
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
      }
      > div:nth-child(2) {
        border-bottom: 5px dotted #4a4a4a;
      }
    }
    .card > div {
      margin-top: 20px;
      width: 980px;
      height: 145px;
      /*background: rgba(245, 245, 245, 1);*/
      border-radius: 4px;
      position: relative;
      overflow: hidden;
      img {
        position: absolute;
        width: 60px;
        height: 60px;
        top: 30px;
        left: 42px;
        border-radius: 50%;
      }
      > p {
        font-size: 28px;
        font-weight: 500;
        color: rgba(74, 74, 74, 1);
        line-height: 40px;
        margin: 30px 0 20px 150px;
      }
      > div {
        display: flex;
        margin-left: 150px;
        p {
          width: 120px;
          font-size: 18px;
          font-weight: 500;
          color: rgba(74, 74, 74, 1);
          line-height: 25px;
        }
      }
      > p:nth-of-type(2) {
        width: 108px;
        height: 40px;
        border-radius: 4px;
        border: 1px solid rgba(230, 230, 230, 1);
        font-size: 22px;
        font-weight: 400;
        color: rgba(155, 155, 155, 1);
        line-height: 40px;
        text-align: center;
        margin: 0;
        position: absolute;
        top: 53px;
        right: 45px;
      }
    }
  }
</style>
