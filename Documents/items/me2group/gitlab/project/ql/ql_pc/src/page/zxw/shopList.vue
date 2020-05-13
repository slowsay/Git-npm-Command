<template>
  <div id="shopList">
    <div class="top">
      <div>
        <span>品牌：</span>
        <span v-for="(item,index) in brandData" :key="index"><span @click="brandClick(item)">{{item.name}} &nbsp;</span></span>
      </div>
      <div v-if="brandSubData.length>0">
        <span>品类：</span>
        <span v-for="(items,index) in brandSubData" :key="index">
          <span @click="brandSubClick">{{items.name}} &nbsp;</span>
        </span>
      </div>
      <div>
        <span>价格区间：</span>
        <el-input style="width:150px" placeholder="最低价" v-model="minprice" clearable></el-input>
        <span style="margin:0 10px;">-</span>
        <el-input style="width:150px" placeholder="最高价" v-model="maxprice" @blur="priceHandle" clearable></el-input>
      </div>
      <div>
        <span>地区</span>
        <!--<span>{{form.address}}</span>-->
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option
            v-for="item in address"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            :change="addressHandle"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="contain">
      <div class="hot">
        <div
          v-for="(item,index) in hotData"
          :key="index"
          class="hotBox"
          :class="(index+1)%4==0?'hotBox1':'hotBox'"
        >
          <div class="imgBox1" @click="goDetail(item)">
            <img :src="item.photo"/>
          </div>
          <div class="hotBottom">
            <p>{{item.name}}</p>

            <p>
              <span>￥{{item.price}}</span>
              <span>销量：{{item.sales}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageindex"
          :page-size="pagesize"
          background
          layout="prev, pager, next, jumper"
          :total="pagecount"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    data: function () {
      return {
        pageindex: 1,
        pagecount: 1,
        pagesize: 10,
        //品牌列表
        brandData: [],
        brandSubData: [],
        minprice: "",
        maxprice: "",
        //地区默认值
        form: {
          region: ""
        },
        //地区列表
        address: [],
        hotData: []
      };
    },
    created: function () {
      if (publicFn.getStore("qluserInfo")) {
        this.userinfo = JSON.parse(publicFn.getStore("qluserInfo"));
      }
      else {
        this.userinfo = {token: "qltoken", id: '1'};
      }
      this.init();
    },
    methods: {
      init: function () {
        this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id};
        if (this.$route.query.cate) {
          this.shopListQuery({keyWord: this.$route.query.cate})
        }
        //品牌列表
        this.shopListBrands();
        //地区列表
        this.shopListAreas();
      },
      addressHandle: function (val) {
        console.log(val)
      },
      //价格区间
      priceHandle: function () {
        var _this = this, _one = this.minprice, _two = this.maxprice;
        if (_one.length < 1) {
          _this.$message.error("请输入最低价位");
        }
        else if (_two.length < 1) {
          _this.$message.error("请输入最高价位");
        }
        else {
          this.shopListQuery({lowest: _one, highest: _two})
        }
      },
      //进入详细页面
      goDetail: function (row) {
        this.$router.push({path: 'shopDetail', query: {id: row.id}});
      },
      //品牌点击
      brandClick: function (row) {
        this.shopListItems(row.id);
      },
      //品类点击
      brandSubClick: function (row) {
//        this.$router.push({path: 'shopList', query: {cate: row.name}});
        this.shopListQuery({brandId: row.id})
      },
      shopListQuery: function (params) {
        var _this = this;
        API.request({
          method: "post",
          url: API.shopListQuery,
          headers: this.headerobj,
          data: API.qs.stringify(params)
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.hotData = e.data.data;
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
      //品牌列表
      shopListBrands: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.shopListBrands,
          headers: this.headerobj,
//          data: API.qs.stringify({queryType: (this.type + 1)})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.brandData = e.data.data;
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
      //地区列表
      shopListAreas: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.shopListAreas,
          headers: this.headerobj,
//          data: API.qs.stringify({queryType: (this.type + 1)})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.address = e.data.data;
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
      //品牌下的规格列表
      shopListItems: function (id) {
        var _this = this;
        API.request({
          method: "post",
          url: API.shopListItems,
          headers: this.headerobj,
          data: API.qs.stringify({brandId: id})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.brandSubData = e.data.data;
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
      handleSizeChange: function (val) {
//        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange: function (val) {
//        console.log(`当前页: ${val}`);
      }
    }
  };
</script>
<style lang="less" scoped>
  #shopList {
    background-color: #f5f5f5;
    padding-top: 20px;
    .top {
      width: 1280px;
      height: 300px;
      background: rgba(255, 255, 255, 1);
      margin: 0 auto;
      padding: 20px;
      box-sizing: border-box;
      div {
        margin-bottom: 15px;
        > span:nth-child(1) {
          font-size: 22px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          line-height: 50px;
        }
      }
    }
    .contain {
      width: 1280px;
      margin: 20px auto 0px;
      padding-bottom: 20px;
      .hot {
        width: 1280px;
        height: 1260px;
        overflow: hidden;
        .hotBox {
          width: 275px;
          height: 286px;
          background-color: #fff;
          margin-bottom: 30px;
          float: left;
          margin-right: 60px;

          .imgBox1 {
            text-align: center;
            img {
              width: 200px;
              height: 200px;
            }
          }
          .hotBottom {
            padding: 0 10px;
            box-sizing: border-box;
            > p:nth-child(1) {
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(74, 74, 74, 1);
              line-height: 17px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            > p:nth-child(2) {
              display: flex;
              margin-top: 20px;
              justify-content: space-between;
              > span:nth-child(1) {
                font-size: 18px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: rgba(255, 0, 0, 1);
                line-height: 25px;
              }
              > span:nth-child(2) {
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(155, 155, 155, 1);
                line-height: 25px;
              }
            }
          }
        }
        .hotBox1 {
          margin-right: 0;
        }
      }
      /deep/ .el-pagination__jump {
        float: right;
      }
    }
  }
</style>
