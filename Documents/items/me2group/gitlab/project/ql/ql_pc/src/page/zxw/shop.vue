<template>
  <div id="shop">
    <div class="contain">
      <!--<img class="navImg" :src="form.img" alt/>-->
      <!-- 轮播图 -->
      <!-- 轮播模块 -->
      <template>
        <el-carousel :interval="5000" arrow="always" height="400px">
          <el-carousel-item v-for="(list,index) in bannerbox" :key="index">
            <img :src="list.bannerPicUrl" alt/>
          </el-carousel-item>
        </el-carousel>
      </template>
      <!--<el-carousel height="400px">-->
      <!--<el-carousel-item v-for="(list,index) in bannerbox" :key="index">-->
      <!--<img :src="list.bannerPicUrl"/>-->
      <!--</el-carousel-item>-->
      <!--</el-carousel>-->

      <div class="typeBox">
        <!--分类-->
        <!--<el-cascader :options="options" @change="cateChangeHandle" :show-all-levels="false"></el-cascader>-->
        <!--<div>分类</div>-->
        <!--其他分类-->
        <div v-for="(item,index) in typeData" :key="index" @click="shoptype(item)">{{item.name}}
        </div>

      </div>


      <p class="title">每周上新</p>

      <div class="imgBox">
        <div v-for="(item,index) in imgData" :key="index" class="imgItem">
          <img :src="item.photo" @click="introHandle(item)"/>
        </div>
      </div>
      <p class="refresh" style="margin-bottom:30px" @click="refreshWeekHandle">
        <i class="el-icon-refresh"></i> 换一批
      </p>

      <p class="title">热门品牌</p>
      <!-- 轮播模块 -->
      <template>
        <el-carousel :interval="5000" arrow="always" height="400px">
          <el-carousel-item v-for="(item,index) in imgform" :key="index">
            <img :src="item.photo" @click="hotBrandHandle(item)"/>
          </el-carousel-item>
        </el-carousel>
      </template>
      <!-- 热门推荐模块 -->
      <p class="title" style="margin-top:30px">热门推荐</p>

      <div class="hot">
        <div v-for="(item,index) in hotData" :key="index" class="hotBox" @click="introHandle(item)">
          <div class="imgBox1">
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
      <p class="refresh" @click="introFreshHandle">
        <i class="el-icon-refresh"></i> 换一批
      </p>
    </div>
  </div>
</template>
<script>
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    data: function () {
      return {
        bannerbox: [],
        typeData: [
          {
            type: "分类"
          },
          {
            type: "男性用品"
          },
          {
            type: "女性用品"
          },
          {
            type: "服饰"
          },
          {
            type: "玩具"
          }
        ],
        imgData: [
          {
            img: require("../../assets/image/zxw/typeImg1.png")
          },
        ],
        form: {
          img: require("../../assets/image/zxw/navImg.png")
        },
        imgform: [
//          {
//            img: require("../../assets/image/zxw/navImg.png")
//          },
        ],
        hotData: [
          {
            img: require("../../assets/image/zxw/typeImg1.png"),
            title: "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣商务腰带",
            money: "2800",
            count: "200"
          },
        ],
        options: [
          {
            value: 'yiji',
            label: '一级分类',
            children: [
              {
                value: 'erji',
                label: '二级分类',
                children: [
                  {
                    value: 'sanji',
                    label: '三级分类',
                  }
                ]
              }
            ]
          },
          {
            value: 'yiji1',
            label: '一级分类',
            children: [
              {
                value: 'erji1',
                label: '二级分类',
                children: [
                  {
                    value: 'sanji1',
                    label: '三级分类',
                  }
                ]
              }
            ]
          }
        ]
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
        //广告列表
        this.banners();
        //
        this.shopSimpList()
        //每周上新
        this.shopWeekly();

        //热门推荐
        this.shopHotAdvise();

        //热门品牌
        this.shopHotBrands();
      },
      introHandle: function (row) {
        this.$router.push({path: 'shopDetail', query: {id: row.id}});
      },
      //热门品牌
      hotBrandHandle: function (row) {
        this.$router.push({path: 'shopList', query: {cate: row.name}});
      },
      //其他分类
      shoptype: function (row) {
        this.$router.push({path: 'shopList', query: {cate: row.name}});
      },
      //切换分类
      cateChangeHandle: function (val) {
        this.$router.push({path: 'shopList', query: {cate: val[val.length - 1]}});
      },
      //每周-换一批
      refreshWeekHandle: function () {

      },
      //推荐-换一批
      introFreshHandle: function () {


      },
      //搜索类目简要信息列表
      shopSimpList: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.shopNavi,
          headers: this.headerobj,
//          data: API.qs.stringify({queryType: (this.type + 1)})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.typeData = e.data.data;
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
      //广告列表
      banners: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.shopbanners,
          headers: this.headerobj,
//          data: API.qs.stringify({queryType: (this.type + 1)})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.bannerbox = e.data.data;
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
      //热门推荐
      shopHotAdvise: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.shopHotAdvise,
          headers: this.headerobj,
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
      //热门品牌
      shopHotBrands: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.shopHotBrands,
          headers: this.headerobj,
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.imgform = e.data.data;
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
      //每周上新
      shopWeekly: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.shopWeekly,
          headers: this.headerobj,
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.imgData = e.data.data;
            }
            else {
              _this.$message.error(JSON.stringify(e.data.msg));
            }
          }
          else {
            _this.$message.error(JSON.stringify(e.data.msg));
          }

        }).catch(function (e) {
          console.log(e)
          _this.$message.error(JSON.stringify(e));
        })
      },
      exchangeData: function (v) {
        return v;
      }
    }
  };
</script>
<style lang="less" scoped>
  #shop {
    background-color: #f5f5f5;
    .contain {
      width: 1280px;
      margin: 0 auto;
      .navImg {
        width: 1280px;
        height: 400px;
      }
      .typeBox {
        height: 100px;
        .el-cascader {
          position: absolute;
          width: 50px;
          opacity: 0;

        }

        div {
          margin: 30px 30px 30px 0;
          height: 40px;
          background: rgba(255, 148, 148, 1);
          border-radius: 4px;
          padding: 0 20px;
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 40px;
          float: left;
        }
      }
      .title {
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        margin-bottom: 30px;
      }
      .imgBox {
        display: flex;
        justify-content: space-between;
        flex-flow: wrap;
        .imgItem {
          width: 275px;
          height: 275px;
          margin-bottom: 30px;
          img {
            width: 275px;
            height: 275px;
          }
        }
      }
      .refresh {
        overflow: auto;
        cursor: pointer;
        padding: 0 30px 30px 0;
        border-bottom: 1px solid #e6e6e6;
        text-align: right;
      }
      .el-carousel__item img {
        width: 1280px;
        height: 400px;
      }
      .hot {
        display: flex;
        justify-content: space-between;
        flex-flow: wrap;
        .hotBox {
          width: 275px;
          height: 286px;
          background-color: #fff;
          margin-bottom: 30px;
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
      }
    }
  }
</style>
