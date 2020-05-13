<template>
  <div id="Address">
    <div class="top">
      <div>
        <p>收货地址</p>
      </div>
      <div></div>
    </div>
    <div class="input">
      <div>
        <p>
          <span>*</span>
          <span>地址信息:</span>
        </p>
        <Address :level="4" @location="location" :areaDetail="addressinfo" :openclose="dialogFormVisible"></Address>
      </div>
      <div>
        <p>
          <span>*</span>
          <span>详细地址:</span>
        </p>
        <el-input
          type="textarea"
          resize="none"
          v-model="input_1"
          placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等信"
        ></el-input>
      </div>
      <div>
        <p>
          <span>*</span>
          <span>邮政编码:</span>
        </p>
        <el-input v-model="input_2" placeholder="请填写邮编"></el-input>
      </div>
      <div>
        <p>
          <span>*</span>
          <span>收货人姓名:</span>
        </p>
        <el-input v-model="input_3" placeholder="长度不超过25个字符"></el-input>
      </div>
      <div>
        <p>
          <span>*</span>
          <span>手机号码:</span>
        </p>
        <el-input v-model="input_4" placeholder="电话号码、手机号码必须填一项"></el-input>
      </div>
    </div>
    <el-checkbox v-model="checked">设置未默认收货地址</el-checkbox>
    <el-button @click="saveHandle">保存地址</el-button>
    <p>
      <img src="../../assets/image/gw/29.png"/>
      <span>{{'已经保存了'+number_0+'条,最多保存'+number_1+'条'}}</span>
    </p>

    <div class="tab">
      <div>
        <div>收件人</div>
        <div>所在地区</div>
        <div>详细地址</div>
        <div>邮编</div>
        <div>电话手机</div>
        <div>操作</div>
        <div></div>
      </div>
      <div v-for="(item,index) in data" :key="index">
        <div>{{item.receiveName}}</div>
        <div>{{item.area}}</div>
        <div>{{item.detail}}</div>
        <div>{{item.emailCode}}</div>
        <div>{{item.receivePhone}}</div>
        <div>
          <span  class="editaddress" @click="editHandle(item)">修改</span>
          <span>&nbsp;|&nbsp;</span>
          <span class="deladdress" @click="delHandle(item)">删除</span>
        </div>
        <div>
          <el-button v-if="item.state==1">默认地址</el-button>
          <el-button v-else class="set" @click="setDefaultHandle(item)">设为默认地址</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Address from "../../components/Address/index";
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    components: {
      Address: Address
    },
    data: function () {
      return {
        addressinfo: '',
        dialogFormVisible: false,
        input_0: "",
        input_1: "",
        input_2: "",
        input_3: "",
        input_4: "",
        localAddress: '',
        checked: false,
        number_0: 0,
        number_1: 10,
        data: [
//          {
//            receiveName: "张三峰",
//            area: "浙江省 杭州市 拱墅区 祥符街道",
//            detail: "北城天地9幢1701",
//            emailCode: "310000",
//            receivePhone: "86-182****9281",
//            state: 0 //0非默认地址 1默认地址
//          },
        ]
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
        this.dialogFormVisible=false;
        //新增地址
        this.input_0 = "",
          this.input_1 = "",
          this.input_2 = "",
          this.input_3 = "",
          this.input_4 = "";
        this.checked = false;
        //查询用户的地址列表
        this.addressList();
      },
      editHandle: function (row) {
        this.$router.push({path: '/Personal/Address1', query: {type: 1, id: row.addressId}});
//        this.$router.go(0);
        this.init();
      },
      delHandle: function (row) {
        var params = {id: row.addressId};
        this.delAddress(params);
      },
      //批量删除地址信息
      delAddress: function (params) {
        var _this = this;
        API.request({
          method: "post",
          url: API.delAddress,
          headers: this.headerobj,
          data: API.qs.stringify(params)
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success("删除成功");
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
      },
      setDefaultHandle: function (row) {
        var params = {id: row.addressId, advised: 1};
        this.setAddressDefault(params)
      },
      //设置地址默认/取消默认
      setAddressDefault: function (params) {
        var _this = this;
        API.request({
          method: "post",
          url: API.setAddressDefault,
          headers: this.headerobj,
          data: API.qs.stringify(params)
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
      //获取用户地址
      addressDesc: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.addressDesc,
          headers: this.headerobj,
          data: API.qs.stringify({id: this.userinfo.id})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.input_0= e.data.data.area;
              _this.input_1 = e.data.data.detail;
              _this.input_2 = e.data.data.emailCode;
              _this.input_3 = e.data.data.receiveName;
              _this.input_4 = e.data.data.receivePhone;
              _this.checked = e.data.data.isDefault == 1 ? true : false;
              _this.addressinfo = e.data.data.area;
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
      //更新地址
      saveHandle: function () {
        var _this = this, _area = this.input_0, _detail = this.input_1, _emailCode = this.input_2,
          _receiveName = this.input_3, _receivephone = this.input_4, _checked = this.checked;
        if (_area.length < 1) {
          _this.$message.error("请选择地区信息");
        }
        else if (_detail.length < 1) {
          _this.$message.error("请输入详细信息");
        }
        else if (_emailCode.length < 1) {
          _this.$message.error("请输入邮政编码");
        }
        else if (_receiveName.length < 1) {
          _this.$message.error("请输入收货人名称");
        }
        else if (_receivephone.length < 1) {
          _this.$message.error("请输入收货人电话");
        }
        else {
          var params = {
            isDefault: _checked ? 1 : 2,
            receiveName: _receiveName,
            receivePhone: _receivephone,
            emailCode: _emailCode,
            area: _area,
            detail: _detail
          }
          API.request({
            method: "post",
            url: API.mergeAddress,
            headers: this.headerobj,
            data: API.qs.stringify(params)
          }).then(function (e) {
            if (e.data.code == 200) {
              if (e.data.success) {
                _this.$message.success("添加成功");
                _this.init();
//                _this.$router.go(0);
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
      //查询用户的地址列表
      addressList: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.addressList,
          headers: this.headerobj,
//          data: API.qs.stringify({id: this.userinfo.id})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.data = e.data.data || [];
              _this.number_0 = e.data.total || 0;
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
      //获取地址信息
      location: function (res) {
        this.input_0 = res.name;
      }
    }
  };
</script>
<style lang="less" scoped>
  #Address {
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
    .input {
      margin-top: 20px;
      > div {
        height: 50px;
        display: flex;
        align-items: center;
        /deep/ input {
          width: 416px;
          height: 30px;
          font-size: 12px;
          font-weight: 400;
          line-height: 30px;
        }
      }
      p {
        padding-left: 10px;
        width: 125px;
        flex-shrink: 0;
        span:nth-child(1) {
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 0, 0, 1);
          line-height: 17px;
        }
        span:nth-child(2) {
          font-size: 18px;
          font-weight: 400;
          color: rgba(155, 155, 155, 1);
          line-height: 25px;
        }
      }
      > div:nth-child(2) {
        height: 68px;
        /deep/ textarea {
          width: 416px;
          height: 48px;
          font-size: 12px;
          font-weight: 400;
          color: rgba(155, 155, 155, 1);
          line-height: 20px;
        }
      }
    }
    #picker {
      /deep/ .picker-show {
        height: 30px;
        line-height: 30px;
        width: 400px;
        font-size: 12px;
        span {
          margin-top: 3px;
        }
      }
    }
    .editaddress, .deladdress {
      cursor: pointer
    }
    .el-checkbox {
      margin: 10px 0 30px 135px;
      font-size: 12px;
      .el-checkbox__label {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 17px;
      }
    }
    > .el-button {
      display: block;
      width: 88px;
      height: 30px;
      background: rgba(255, 148, 148, 1);
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      border: none;
      padding: 0;
      line-height: 30px;
      margin-left: 135px;
    }
    > p {
      width: 100%;
      height: 40px;
      background: rgba(230, 230, 230, 1);
      border-radius: 4px;
      line-height: 40px;
      margin: 30px 0;
      img {
        width: 12px;
        height: 12px;
        margin: 0 10px 0 30px;
        vertical-align: middle;
      }
      span {
        font-size: 14px;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        line-height: 14px;
        vertical-align: middle;
      }
    }
    .tab {
      width: 980px;
      border-radius: 10px;
      box-sizing: border-box;
      background: rgba(245, 245, 245, 1);
      padding: 1px;
      border: 4px solid rgba(245, 245, 245, 1);
      font-size: 14px;
      font-weight: 400;
      color: rgba(74, 74, 74, 1);
      line-height: 20px;
      > div {
        display: flex;
        background: #fff;
        > div {
          padding: 20px;
          border-left: 2px solid #e6e6e6;
          border-bottom: 2px solid #e6e6e6;
          display: flex;
          align-items: center;
        }
        > div:nth-child(1) {
          border-left: none;
          width: 90px;
        }
        > div:nth-child(2) {
          width: 190px;
        }
        > div:nth-child(3) {
          width: 190px;
        }
        > div:nth-child(4) {
          width: 90px;
        }
        > div:nth-child(5) {
          width: 160px;
        }
        > div:nth-child(6) {
          width: 120px;
        }
        > div:nth-last-child(1) {
          width: 170px;
          .el-button {
            padding: 10px 0;
            height: 40px;
            background: rgba(255, 148, 148, 1);
            border-radius: 4px;
            width: 100px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            border: none;
          }
          .set {
            color: rgba(74, 74, 74, 1);
            background: transparent;
          }
        }
      }
      > div:nth-child(1) {
        background: #f5f5f5;
        > div {
          padding: 10px 20px;
          border-bottom: none;
        }
      }
      > div:nth-last-child(1) {
        > div {
          border-bottom: none;
        }
      }
    }
  }
</style>
