<template>
  <div id="Order">
    <div class="tab">
      <p @click="orderListHandle(-1)" :class="{active:state==-1}">全部订单</p>

      <p @click="orderListHandle(0)" :class="{active:state==0}">待付款</p>

      <p @click="orderListHandle(1)" :class="{active:state==1}">待发货</p>

      <p @click="orderListHandle(2)" :class="{active:state==2}">待收货</p>

      <p @click="orderListHandle(3)" :class="{active:state==3}">待评价</p>

      <p @click="orderListHandle(4)" :class="{active:state==4}">已完成</p>

      <p @click="orderListHandle(5)" :class="{active:state==5}">已关闭</p>

      <p @click="orderListHandle(6)" :class="{active:state==6}">售后</p>
    </div>
    <div>
      <div class="list" v-for="(item,index) in data" :key="index">
        <div class="orderDes">
          <span>{{item.createTime}} &nbsp;</span>
          <span>订单号:&nbsp;</span>
          <span>{{item.ordNum}}</span>
        </div>
        <div class="card">
          <el-table :data="item.shops" border class="table">
            <el-table-column label="商品图" width="90" align="center">
              <div slot-scope="scope">
                <img :src="scope.row.photo" height="50"/>
              </div>
            </el-table-column>
            <el-table-column label="名称/规格" width="120">
              <template slot-scope="scope">
                <div>{{scope.row.name}}</div>
                <div>{{scope.row.normDesc}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="comment" label="备注"></el-table-column>
            <el-table-column prop="price" label="单价(￥)" width="100" align="center"></el-table-column>
            <el-table-column prop="shopNum" width="70" label="数量" align="center"></el-table-column>
            <el-table-column prop="transFee" width="100" label="邮费(￥)" align="center"></el-table-column>
            <el-table-column prop="couponAmount" width="70" label="优惠卷" align="center"></el-table-column>
            <el-table-column label="合计(￥)" align="center">
              {{item.totalAmount}}
            </el-table-column>
            <el-table-column label="状态" width="90" align="center">
              <template slot-scope="scope">
                <!--待付款-->
                <div class="da" v-if="item.state==1">
                  <div><b>{{statusbox[item.state]}}</b></div>
                  <div @click="orderDetailHandle(scope.row)">订单详情</div>
                </div>
                <!--待发货-->
                <div class="da" v-else>
                  <div><b>{{statusbox[item.state]}}</b></div>
                  <div @click="orderDetailHandle(scope.row)">订单详情</div>
                  <div @click="mapHandle(scope.row,item)">查看物流</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
              <template slot-scope="scope">
                <div v-if="item.state==1">
                  <div>
                    <el-button type="text" @click="justPayHandle(item)">立即付款</el-button>
                  </div>
                  <div>
                    <span class="cancel" @click="cancelHandle(item)">取消订单</span>
                  </div>
                </div>
                <div v-if="item.state==2">
                  <div>
                    <el-button type="text" @click="hurryHandle(item)">催卖家发货</el-button>
                  </div>
                  <div>
                    <span class="cancel" @click="serviceHandle(item)">售后</span>
                  </div>
                </div>
                <div v-if="item.state==3">
                  <div>
                    <el-button type="text" @click="confirmHandle(item)">确认收货</el-button>
                  </div>
                  <div>
                    <span class="cancel" @click="serviceHandle(item)">售后</span>
                  </div>
                </div>
                <div v-if="item.state==4">
                  <div>
                    <el-button type="text" @click="commentHandle(item)">立即评论</el-button>
                  </div>
                  <div>
                    <span class="cancel" @click="delHandle(item)">删除订单</span>
                  </div>
                </div>
                <div v-if="item.state==5">
                  <div>
                    <el-button type="text" @click="commentHandle(item)">追加评论</el-button>
                  </div>
                  <div>
                    <span class="cancel" @click="delHandle(item)">删除订单</span>
                  </div>
                </div>
                <div v-if="item.state==6">
                  <div>
                    <el-button type="text" @click="resetHandle(item)">重新购买</el-button>
                  </div>
                  <div>
                    <span class="cancel" @click="cancelHandle(item)">取消订单</span>
                  </div>
                </div>
                <div v-if="item.state==7">
                  <div>
                    <el-button type="text" @click="cancelServiceHandle(item)">取消售后</el-button>
                  </div>
                  <div>
                    <span class="cancel" @click="contactHandle(item)">联系客服</span>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div>
        <el-row style="margin-top:20px">
          <el-col :span="9" :offset="14">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :total="pagecount"
            ></el-pagination>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog title="添加评论" class="dialogbox" :visible.sync="showVisible" width="30%" center>
      <div class="dialog">
        <el-input type="textarea" v-model="commentValue" placeholder="请输入评论信息"/>
        <div class="btn">
          <el-button type="primary" @click="commenConfirmHandle">确 定</el-button>
          <el-button type="text" @click="showVisible = false">取 消</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="订单详细" class="dialogbox" :visible.sync="orderVisible" width="30%" center>
      <div class="dialog">
        <el-row>
          <el-col>
            test
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <el-dialog title="查看物流" class="dialogbox" :visible.sync="mapVisible" width="30%" center>
      <div class="dialog">
        <el-row>
          <el-col>
            test
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    data: function () {
      return {
        state: -1,
        pageindex: 1,
        pagecount: 1,
        pagesize: 10,
        cutdata: '',
        commentValue: '',
        //订单详情
        orderVisible: false,
        //评论
        showVisible: false,
        //物流
        mapVisible: false,
        statusbox: ['', '待付款', '待发货', '待收货', '待评价', '已完成', '已关闭', '售后'],
        data: []
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
        console.log(this.userinfo)
        //订单列表
        this.orderList();
      },
      //订单详情
      orderDetailHandle: function (row) {
        this.orderVisible = true
      },
      //查看物流
      mapHandle: function (row,item) {
        this.mapVisible = true;
        this.$router.push({path:'/waitPay',query:{shopid:row.id,ordId:item.ordId}});
      },
      //菜单更换
      orderListHandle: function (v) {
        this.state = v;
        this.orderList();
      },
      //立即付款
      justPayHandle: function (row) {
        var _this = this;
        API.request({
          method: "post",
          url: API.ordPay,
          headers: this.headerobj,
          data: API.qs.stringify({id: row.ordId})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success("付款成功");
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
      //重新购买
      resetHandle: function (row) {
        var _this = this;
        API.request({
          method: "post",
          url: API.ordRebuy,
          headers: this.headerobj,
          data: API.qs.stringify({id: row.ordId})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success("重新购买成功");
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
      //删除订单
      delHandle: function (row) {
        var _this = this;
        API.request({
          method: "post",
          url: API.delBatch,
          headers: this.headerobj,
          data: API.qs.stringify({ids: row.ordId})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success("删除订单成功");
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
      //申请售后
      serviceHandle: function (row) {
        var _this = this;
        API.request({
          method: "post",
          url: API.attemptRevoke,
          headers: this.headerobj,
          data: API.qs.stringify({id: row.ordId})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success("申请售后成功");
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
      //催卖家发货
      hurryHandle: function (row) {
        var _this = this;
        API.request({
          method: "post",
          url: API.ordHurry,
          headers: this.headerobj,
          data: API.qs.stringify({id: row.ordId})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success("取消订单成功");
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
      //确认收货
      confirmHandle: function (row) {

      },
      //取消订单
      cancelHandle: function (row) {
        var _this = this;
        API.request({
          method: "post",
          url: API.cancel,
          headers: this.headerobj,
          data: API.qs.stringify({ids: row.ordId})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success("取消订单成功");
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
      //取消售后
      cancelServiceHandle: function (row) {
        var _this = this;
        API.request({
          method: "post",
          url: API.cancelRevoke,
          headers: this.headerobj,
          data: API.qs.stringify({id: row.ordId})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success("取消售后成功");
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
      //联系客服
      contactHandle: function (row) {

      },
      //立即评价
      commentHandle: function (row) {
        this.showVisible = true;
        this.cutdata = row;
      },
      //评价
      commenConfirmHandle: function () {
        var _this = this, _input = this.commentValue;
        if (_input.length < 1) {
          _this.$message.error("请输入评价信息");
        } else {
          API.request({
            method: "post",
            url: API.ordEval,
            headers: this.headerobj,
            data: API.qs.stringify({id: this.cutdata.id, content: _input})
          }).then(function (e) {
            if (e.data.code == 200) {
              if (e.data.success) {
                _this.$message.success("评价成功");
                _this.showVisible = false;
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
      },
      handleCurrentChange: function (val) {
        this.pageindex = val;
      },
      //订单列表
      orderList: function () {
        var _this = this;
        var params = {};
        if (_this.state >= 0) {
          params.status = _this.state + 1;
        }
        else {
//          params.status = -1;
        }
        API.request({
          method: "post",
          url: API.ordList,
          headers: this.headerobj,
          data: API.qs.stringify(params)
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.data = _this.exchangeData(e.data.data || []);
              _this.pagecount = e.data.total || 0;
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
        for (var i = 0, arr = v; i < arr.length; i++) {
          arr[i].createTime = arr[i].createTime || '2019-10-12';
        }
        return arr;
      }
    }
  };
</script>
<style lang="less" scoped>
  #Order {
    .table {
      width: 100%;
      font-size: 14px;
    }
    .dialogbox {
      line-height: 60px;
    }
    .dialog {
      text-align: left;
      padding: 40px 100px;
    }
    .tab {
      display: flex;
      margin: 30px 0 24px;
      p {
        font-size: 20px;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        line-height: 28px;
        margin-right: 60px;
      }
      .active {
        font-weight: bold;
      }
    }
    .orderDes {
      display: flex;
      padding: 15px;
      background: #f0f0f0;
    }
    .cancel {
      cursor: pointer
    }
    .da {
      cursor: pointer
    }
    .card {
      display: flex;
      width: 980px;
      padding: 5px;
      box-sizing: border-box;
      background: #f5f5f5;
      text-align: center;
      margin-bottom: 20px;
      b {
        color: #ff0000;
      }
      /*> div {*/
      /*flex-shrink: 0;*/
      /*}*/
      /*> div > div:nth-child(1) {*/
      /*font-size: 14px;*/
      /*font-weight: 400;*/
      /*color: rgba(74, 74, 74, 1);*/
      /*line-height: 45px;*/
      /*}*/
      /*> div > div:nth-child(2) {*/
      /*padding: 25px 15px 0;*/
      /*background: #fff;*/
      /*height: 125px;*/
      /*overflow: hidden;*/
      /*p {*/
      /*font-size: 14px;*/
      /*font-weight: 400;*/
      /*color: rgba(74, 74, 74, 1);*/
      /*line-height: 24px;*/
      /*}*/
      /*}*/
      /*> div:nth-child(1) {*/
      /*text-align: left;*/
      /*font-size: 16px;*/
      /*flex-shrink: 1;*/
      /*}*/
      /*> div:nth-child(1) > div:nth-child(2) {*/
      /*img {*/
      /*float: left;*/
      /*width: 100px;*/
      /*height: 100px;*/
      /*margin: 5px 20px 0 15px;*/
      /*}*/
      /*p:nth-child(1) {*/
      /*margin: 0 0 22px;*/
      /*}*/
      /*}*/
      /*> div:nth-child(7) > div:nth-child(2) {*/
      /*p {*/
      /*margin-bottom: 2px;*/
      /*}*/
      /*}*/
      /*> div:nth-child(8) > div:nth-child(2) {*/
      /*div {*/
      /*width: 88px;*/
      /*height: 30px;*/
      /*background: rgba(255, 148, 148, 1);*/
      /*border-radius: 4px;*/
      /*font-size: 16px;*/
      /*font-weight: 400;*/
      /*color: rgba(255, 255, 255, 1);*/
      /*line-height: 30px;*/
      /*margin-bottom: 10px;*/
      /*}*/
      /*p:nth-child(1) {*/
      /*font-size: 16px;*/
      /*line-height: 22px;*/
      /*margin-bottom: 10px;*/
      /*}*/
      /*p:nth-child(1) + p {*/
      /*font-size: 16px;*/
      /*line-height: 22px;*/
      /*}*/
      /*}*/
      .red {
        color: red !important;
      }
    }
  }
</style>
