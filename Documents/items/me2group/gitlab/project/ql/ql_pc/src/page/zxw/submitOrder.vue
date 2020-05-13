<template>
  <div class="buyNow">
    <div class="contain">
      <div class="payType">
        <div class="titleBox">
          <div class="payTitle">确认收获地址</div>
          <div class="change">管理收获地址</div>
        </div>
        <div class="itemBox">
          <div
            v-for="(item,index) in payData"
            :key="index"
            class="payBox"
            :class="{red : changeRed ==index}"
            @click="getAddressHandle(item,index)"
          >
            <div class="payLeft">
              <span class="sendTo" :class="{send: changeRed==index}">
                <i class="el-icon-location"></i>寄送至
              </span>
            </div>
            <div class="payMiddle">
              <span class="radio">
                <el-radio size="small" v-model="radio" :label="index">&nbsp;</el-radio>
              </span>
              <span
                class="address"
                :class="{onAddress : changeRed ==index}"
              >{{item.area+' ('+(item.receiveName+'收')+') '+item.receivePhone}}</span>
              <button class="btn" :class="{showBtn: changeRed==index}">默认地址
              </button>
            </div>

            <div class="payMoney" :class="{showMoney: changeRed==index}" @click="editHandle(item,index)">
              修改本地址
            </div>
          </div>
          <p class="useOther" @click="createHandle">使用新地址</p>
        </div>
      </div>

      <div class="orderInfo">确认订单信息</div>
      <!-- 表格模块 -->
      <div class="form">
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column prop="info" label="商品信息" width="400">
            <template slot-scope="scope">
              <img class="shopImg" :src="scope.row.photo" alt/>

              <div class="infoBox">
                <p class="title">{{scope.row.name}}</p>

                <p class="type">{{scope.row.normName}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="单价" width="180" :formatter="add"></el-table-column>
          <el-table-column prop="buyCount" label="数量"></el-table-column>
          <el-table-column prop="email" label="邮费" :formatter="email"></el-table-column>
          <el-table-column prop="couponPirce" class-name="tored" label="优惠券" :formatter="coypon"></el-table-column>
          <el-table-column label="合计" :formatter="sum">
            <template slot-scope="scope">
              {{scope.row.price*scope.row.buyCount+scope.row.email-scope.row.couponPirce}}
            </template>
          </el-table-column>
          <el-table-column prop="desc" label="备注"></el-table-column>
        </el-table>
        <p class="yuanjia">原价：￥{{form.originMomey}}</p>

        <p class="use">使用优惠：￥{{form.youhui}}</p>
      </div>
      <div class="center">
        <div class="allSum">
          合计（含运费）
          <span class="all">
            <span style="font-size:24px">￥</span>
            {{form.all}}
          </span>
        </div>
        <div class="box">
          <div class="fanhui">
            <img src="../../assets/image/zxw/fanhui.png" alt/>
            <span @click="$router.push('/car_shop')">返回购物车</span>
          </div>
          <button class="payContent" @click="confirmHandle">确认付款</button>
        </div>
      </div>
    </div>
    <!-- 点击编辑收获地址出现弹出框 -->
    <el-dialog :title="dialogtitle" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" label-position="right" :rules="rules" ref="ruleForm" label-width="100px"
               class="demo-ruleForm">
        <!--<p class="addAddress">新增收获地址</p>-->
        <!--<el-form-item prop="delivery">-->
        <!--<el-input style="width:500px;margin-left:-100px;" v-model="ruleForm.name"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="地址信息" prop="region">
          <Address :level="4" @location="location" :areaDetail="addressinfo" :openclose="dialogFormVisible"></Address>
          <!--<el-select style="width:336px" v-model="ruleForm.region" placeholder="请选择活动区域">-->
          <!--<el-option label="区域一" value="shanghai"></el-option>-->
          <!--<el-option label="区域二" value="beijing"></el-option>-->
          <!--</el-select>-->
        </el-form-item>
        <el-form-item label="详细地址" prop="desc">
          <el-input style="width:336px" type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="delivery">
          <el-input style="width:336px" v-model="ruleForm.zip"></el-input>
        </el-form-item>
        <el-form-item label="收货人姓名" prop="name">
          <el-input style="width:336px" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input style="width:336px" v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-checkbox style="margin-left:100px;margin-bottom:20px;" v-model="ruleForm.isDefault" label="设置为默认地址"
                     name="type"></el-checkbox>


        <el-form-item>
          <el-button style="background:#FF9494;color:#fff" @click="submitForm('ruleForm')">保存</el-button>
          <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
        </el-form-item>
      </el-form>
    </el-dialog>
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
        dialogtitle: '创建地址',
        addressinfo: '',
        changeRed: 0,
        dialogFormVisible: false,
        radio: 0,
        //支付类型数据
        form: {
          money: 0,
          all: 0,
          originMomey: 0, //原价
          youhui: 0, //使用优惠
          tranfee: 0,
        },
        payData: [
//          {
//            index: 0,
//            area: "浙江省 杭州市 拱墅区 祥符街道 北城天地9幢1701",
//            receiveName: "潘老大",
//            receivePhone: "18887987987"
//          },
//          {
//            index: 1,
//            area: "浙江省 杭州市 拱墅区 祥符街道 北城天地9幢1701",
//            receiveName: "潘老大",
//            receivePhone: "18887987987"
//          },

        ],
        tableData: [
//          {
//            title: "专柜洋风二代陶瓷锅煲汤炖煮砂锅耐高温健康煮qereqwrwerwerwqerqwer饭粥锅陶锅",
//            color: "红色",
//            size: "5.5L",
//            type: "配餐具",
//            img: require("../../assets/image/zxw/typeImg1.png"),
//            info: "夸奖哈首付款",
//            price: 200,
//            account: 10,
//            email: 20,
//            coypon: 200,
//            sum: 3000,
//            remark: "空间和付款计划哈快捷回复卡后即可"
//          },
        ],
        //点击弹出框里面的内容数据
        ruleForm: {
          name: '',
          phone: '',
          zip: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          isDefault: false,
          type: [],
          resource: '',
          //详细地址
          desc: ''
        }, rules: {
          name: [
            {required: true, message: '收货人姓名', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在1 到 20 个字符', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '手机号', trigger: 'blur'},
            {min: 11, max: 11, message: '长度在 11个字符', trigger: 'blur'}
          ],
//          region: [
//            {required: true, message: '请填写地址信息', trigger: 'blur'}
//          ],
//          type: [
//            {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
//          ],
//          resource: [
//            {required: true, message: '请选择活动资源', trigger: 'change'}
//          ],
          desc: [
            {required: true, message: '请填写详细地址', trigger: 'blur'}
          ]
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
        //地址列表
        this.addressList();
        //订单内商品信息列表
        this.shopOrderList();
      },
      //获取地址信息
      location: function (res) {
        this.addressinfo = res.name;
      },
      editHandle: function (row, index) {
        this.addressinfo = row.area;
        this.ruleForm.addressId = row.addressId;
        this.ruleForm.desc = row.detail;
        this.ruleForm.zip = row.emailCode;
        this.ruleForm.name = row.receiveName;
        this.ruleForm.phone = row.receivePhone;
        this.dialogFormVisible = true;
        this.dialogtitle = "修改地址";
      },
      //创建新地址
      createHandle: function () {
        this.addressinfo = '';
        this.ruleForm.desc = "";
        this.ruleForm.zip = "";
        this.ruleForm.name = "";
        this.ruleForm.phone = "";
        this.dialogFormVisible = true;
        this.dialogtitle = "创建地址";
      },
      //创建地址接口
      mergeAddress: function (params) {
        var _this = this;
        API.request({
          method: "post",
          url: API.mergeAddress,
          headers: this.headerobj,
          data: API.qs.stringify(params)
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success(e.data.msg);
              _this.dialogFormVisible = false;
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
      //确认支付
      confirmHandle: function () {
        this.$router.push({path: '/payPage', query: {id: this.$route.query.id}});
      },
      //汇总
      summaryData: function () {
        for (var i = 0, summSum = 0, couponSum = 0, arr = this.tableData; i < arr.length; i++) {
          summSum += arr[i].price * arr[i].buyCount + arr[i].email;
          couponSum += arr[i].couponPirce;
        }
        this.form.originMomey = summSum;
        this.form.youhui = couponSum;
        this.form.all = summSum - couponSum;
      },
      //订单内商品信息列表
      shopOrderList: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.shopOrderList,
          headers: this.headerobj,
          data: API.qs.stringify({ordId: this.$route.query.id})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.tableData = _this.exchangeData(e.data.data);
              _this.summaryData();
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
      defaultAddressData: function () {
        for (var i = 0, arr = this.payData; i < arr.length; i++) {
          if (arr[i].isDefault == 2) {
            this.changeRed = i;
            this.radio = i;
          }
        }
      },
      //地址列表
      addressList: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.addressList,
          headers: this.headerobj,
//          data: API.qs.stringify({userId:this.userinfo.id})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.payData = e.data.data;
              //当前默认地址
              _this.defaultAddressData();
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
      add: function (row, column) {
        return "￥" + row.price;
      },
      email: function (row, column) {
        return "￥" + row.email || 0;
      },
      coypon: function (row, column) {
        return "￥" + row.couponPirce;
      },
      sum: function (row, column) {
        return "￥" + row.sum;
      },
      getAddressHandle: function (row, index) {
        this.changeRed = index;
        this.radio = index;
        var params = {id: row.addressId, advised: 1};
        this.setAddressDefault(params)
      },
      //设置默认地址
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
              _this.$message.success("设置为默认地址");
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
      //提交
      submitForm: function (formName) {
        var _this = this;
        var params = {}, _receiveName = this.ruleForm.name, _receivePhone = this.ruleForm.phone,
          _detail = this.ruleForm.desc, _isDefault = this.ruleForm.isDefault,
          _area = this.addressinfo, _emailCode = this.ruleForm.zip;
        this.$refs[formName].validate(function (valid) {
          if (valid) {
            if (_this.dialogtitle == "修改地址") {
              params = {
                addressId: _this.ruleForm.addressId,
                detail: _detail,
                receiveName: _receiveName,
                receivePhone: _receivePhone,
                emailCode: _emailCode,
                area: _area,
                isDefault: _isDefault ? 2 : 1
              }
            }
            else {
              //创建地址
              params = {
                detail: _detail,
                receiveName: _receiveName,
                receivePhone: _receivePhone,
                emailCode: _emailCode,
                area: _area,
                isDefault: _isDefault ? 2 : 1
              }
            }
            _this.mergeAddress(params);
          } else {
            _this.addressinfo = '';
            _this.ruleForm.zip = '';
            return false;
          }
        });
      },
      resetForm: function (formName) {
        this.$refs[formName].resetFields();
      },
      exchangeData: function (v) {
        for (var i = 0, arr = v; i < arr.length; i++) {
          arr[i].email = arr[i].email || 0;
        }
        return arr;
      }
    }

  };
</script>
<style lang="less" scoped>
  .buyNow {
    margin: 0 auto;
    .contain {
      width: 1280px;
      margin: 0 auto;
      box-sizing: border-box;
      .shopImg {
        width: 100px;
        height: 100px;
        border-radius: 4px;
      }
      .infoBox {
        float: right;
        width: 250px;
        height: 100px;
        // border: 1px solid red;
        .title {
          font-size: 16px;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 24px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .type {
          font-size: 16px;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 24px;
          margin-top: 30px;
        }
      }
      //确认收获地址模块样式
      .payType {
        font-size: 30px;
        font-family: DFYuanW5-GB;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 60px;
        margin-top: 20px;
        .titleBox {
          display: flex;
          justify-content: space-between;
          border-bottom: 4px dotted #ccc;
          margin-bottom: 20px;
          .change {
            font-size: 22px;
            font-family: DFYuanW5-GB;
            font-weight: 400;
            color: #000000;
            margin-top: 5px;
          }
        }
        .payBox {
          width: 1280px;
          box-sizing: border-box;
          height: 84px;
          padding: 10px 32px;
          display: flex;
          align-items: center;
          border: 1px solid #fff;
          .payLeft {
            width: 100px;
          }
          .payMiddle {
            margin-right: auto;
          }
          .sendTo {
            // font-size:18px;
            // font-family:DFYuanW5-GB;
            // font-weight:400;
            // color:rgba(223,18,32,1);
            display: none;
          }
          .send {
            display: block;
            font-size: 18px;
            font-family: DFYuanW5-GB;
            font-weight: 400;
            color: #000000;
          }
          .address {
            font-size: 18px;
            font-family: DFYuanW5-GB;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          .onAddress {
            font-size: 20px;
            font-family: DFYuanW5-GB;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
        }
        .payMoney {
          float: right;
          .money {
            font-size: 30px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ff9494;
          }
        }
      }
    }

    .red {
      // border: 1px solid red !important;
      background-color: #fff;
      background: #f5f5f5;
      box-sizing: border-box;
      border-radius: 10px;
    }
    .payMoney {
      display: none;
    }
    .showMoney {
      display: block;
      font-size: 18px;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(27, 125, 219, 1);
    }
    .btn {
      display: none;
      float: right;
      margin-top: 20px;
    }
    .showBtn {
      display: block;
      width: 87px;
      height: 28px;
      background: #ff9494;
      border-radius: 4px;
      border: none;
      font-size: 14px;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-left: 20px;
    }

    .center {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding-bottom: 20px;
      .allSum {
        font-size: 18px;
        font-family: DFYuanW5-GB;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin: 20px;
        .all {
          font-size: 36px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(224, 18, 32, 1);
        }
      }
      .box {
        margin: 20px;

        .fanhui {
          float: left;
          margin: 20px 100px;
          font-size: 20px;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(27, 125, 219, 1);
        }
        .payContent {
          width: 260px;
          height: 70px;
          background: #ff9494;
          border-radius: 4px;
          font-size: 24px;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          border: none;
        }
      }
    }
    .useOther {
      font-size: 18px;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(27, 125, 219, 1);
      margin-left: 150px;
    }
    .orderInfo {
      font-size: 30px;
      font-family: DFYuanW5-GB;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      border-bottom: 4px dotted #ccc;
      line-height: 60px;
    }
  }

  .form {
    border: 4px solid rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    margin-top: 40px;
    /deep/ .el-table_1_column_6 {
      color: red;
    }
    /deep/ .el-table_1_column_5 {
      color: red;
    }
    /deep/ .is-leaf {
      color: #000000;
    }
    .use,
    .yuanjia {
      text-align: right;
      font-size: 20px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(74, 74, 74, 1);
      line-height: 28px;
      margin: 20px;
    }
  }

  .allSum {
    font-size: 18px;
    font-family: DFYuanW5-GB;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  .tored {
    color: red;
  }

  /deep/ .el-dialog {
    width: 851px;

  }

  /deep/ .el-dialog__body {
    box-sizing: border-box;
    padding-left: 180px;
  }

  .addAddress {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 148, 148, 1);
    line-height: 40px;
  }

</style>
