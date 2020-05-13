<template>
  <div class="shopDetail">
    <div class="contain">
      <div class="left">
        <div class="bigImg">
          <img :src="form.img"/>
        </div>
        <div class="imgs">
          <div
            v-for="(item,index) in form.photos"
            :key="index"
            class="imgBox"
            :class="{clickImg : changeImg == index }"
            @click="imgClick(index)"
          >
            <img class="img" :src="item" alt/>
          </div>
        </div>
      </div>
      <div class="right">
        <p>{{form.name}}</p>

        <div class="priceBox">
          <div>
            <span>闪购价</span>
            <span>
              <span style="font-size:22px">￥</span>
              {{form.price}}
            </span>
            <span>{{form.priceDel}}</span>
            <span v-if="form.isCollect==1" @click="shouchang1">
              <i class="el-icon-star-off"></i>&nbsp;未收藏
            </span>
            <span v-else @click="shouchang1">
              <i style="color:red" class="el-icon-star-on"></i>&nbsp;收藏
            </span>
          </div>
          <div>
            <span>
              销量&nbsp;
              <span>{{form.sales}}</span>
            </span>
            <span>|</span>
            <span>
              浏览量&nbsp;
              <span>{{form.browseNum}}</span>
            </span>
          </div>
        </div>
        <!-- <div class="coypon">
          <div>
            <span>优惠券</span>
            <div v-for="(item,index) in coypon" :key="index">
              <div>{{item.card}}</div>
              <div v-if="getshow==0" @click="getTo">领取</div>
               <div v-else-if="getshow==1">已领取</div>
            </div>
          </div>
        </div>-->
        <div class="address">
          <span>配送至</span>
          <!--<Address :level="4" @location="location"></Address>-->
          <el-select v-model="sendcity" placeholder="请选择" @change="sendCityHandle">
            <el-option
              v-for="item in options2"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          运费: {{transFee}} 元
        </div>
        <!--规格组合-->
        <!--<div class="size" v-for="(itemspecs,index) in form.specs">-->
        <!--<span>{{itemspecs.specName}}：</span>-->

        <!--<div>-->
        <!--<div-->
        <!--v-for="(item,indexs) in itemspecs.items"-->
        <!--:key="indexs"-->
        <!--class="box"-->
        <!--@click="changeHandle(item,index,indexs)"-->
        <!--&gt;{{item.itemName}}-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--普通规格-->
        <div class="size">
          <span>规格：</span>

          <div>
            <div
              v-for="(item,indexs) in form.norm"
              :key="indexs"
              class="box"
              @click="specsHandle(item,indexs)"
              :class="{red: changeRed ==indexs}"
            >{{item.normDesc}}
            </div>
          </div>
        </div>
        <div class="countNumber">
          <span>数量</span>
          <el-input-number size="medium" v-model="form.num"></el-input-number>
        </div>
        <div class="buy">
          <button @click="justBuyHandle">立即购买</button>
          <button @click="addOrderHandle">加入购物车</button>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom_left">
        <el-tabs type="border-card">
          <el-tab-pane label="商品详情">
            <div class="bottom_contain">
              <!--<div class="bottomBox">-->
              <!--<p>产品参数</p>-->

              <!--<div class="boxItem">-->
              <!--<div>-->
              <!--<p>品牌：{{form.xinghao}}</p>-->

              <!--<p>适用性别：{{form.chandi}}</p>-->

              <!--<p>颜色分类：{{form.maozhong}}</p>-->

              <!--<p>货号：{{form.shengdu}}</p>-->

              <!--<p>腰带代扣款式：{{form.shengdu}}</p>-->

              <!--<p>是否商场同款：{{form.shengdu}}</p>-->
              <!--</div>-->
              <!--<div>-->
              <!--<p>主材质：{{form.caizhi}}</p>-->

              <!--<p>款士：{{form.fenlei}}</p>-->

              <!--<p>流行元素：{{form.zhijing}}</p>-->

              <!--<p>带扣材质：{{form.tedian}}</p>-->

              <!--<p>长度：{{form.tedian}}</p>-->

              <!--<p>宽度：{{form.tedian}}</p>-->
              <!--</div>-->
              <!--<div>-->
              <!--<p>风格：{{form.fengge}}</p>-->

              <!--<p>带身元素：{{form.jz}}</p>-->

              <!--<p>上市时间：{{form.leixing}}</p>-->

              <!--<p>适用对象：{{form.changjing}}</p>-->

              <!--<p>材质工艺{{form.changjing}}</p>-->
              <!--</div>-->
              <!--</div>-->
              <!--</div>-->
              <div class="bigIMG" v-html="form.content">
                <!--<img src="../../assets/image/zxw/img1.png" alt/>-->
                <!--<img src="../../assets/image/zxw/img2.png" alt/>-->
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="查看评论">
            <div class="comment">
              <div v-for="(item,index) in commentData" :key="index" class="commentBox">
                <div>
                  <img :src="item.headImage"/>

                  <p>{{item.nickName}}</p>
                </div>
                <div>
                  <p>{{item.content}}</p>

                  <div v-for="(item1,index1) in commentData[index].pics" :key="index1">
                    <img :src="item1"/>
                  </div>
                  <p>{{item.createTime}}</p>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="bottom_right">
        <p>相关推荐</p>

        <div v-for="(item,index) in boxData" :key="index" class="recommend">
          <img :src="item.photo"/>

          <div class="describe">
            <p>{{item.name}}</p>

            <p>
              <span>￥{{item.price}}</span>
              <span>销量：{{item.sales}}</span>
            </p>
          </div>
        </div>
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
        shouchang: true,
        options2: "",
        sendcity: "",
        getshow: 0,
        changeImg: 0,
        changeRed: 0,
        changeRed1: 0,
        form: {
          img: require("../../assets/image/zxw/img2.png"),
          name: "的看哈开始疯狂划水的客户肯定看撒的看法和看见了是否",
          price: "0.00",
          priceDel: "0.00",
          photos: [],
          comment: 4443,
          number: 3333,
          num: 1
        },
        //快递费用
        transFee: 0,
        //被选中的组合值
        zhvalue: [],
        //组合数组
        zhData: [],
        imgData: [],
        sizeData: [
          {
            size: "x"
          },
          {
            size: "m"
          },
          {
            size: "xl"
          },
          {
            size: "xxl"
          }
        ],
        zuheData: [
          {
            zuhe: "组合一"
          },
          {
            zuhe: "组合二"
          }
        ],
        commentData: [],
        //相关推荐模块数据
        boxData: []
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
        //商品详情
        this.shopInfo()
        //查看评论
        this.shopEvals();
        //相关推荐
        this.shopRelatives();
        //地区列表
        this.shopAreas();
      },
      //配送地
      sendCityHandle: function (val) {
        this.sendcity = val
        this.shopTransFee({id: val});
      },
      //根据地区计算运费
      shopTransFee: function (params) {
        var _this = this;
        API.request({
          method: "post",
          url: API.shopTransFee,
          headers: this.headerobj,
          data: API.qs.stringify(params)
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.transFee = e.data.data;
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
      //立即购买
      justBuyHandle: function () {
        var _this = this, _num = this.form.num, _zhvalue = this.zhvalue, _sendcity = this.sendcity, _transFee = this.transFee, _totalAmount = 0;
        if (_sendcity.length == '') {
          _this.$message.error('请选择配送地区');
        }
        else if (_zhvalue.length < 1) {
          _this.$message.error('请选择规格');
        }
        else if (!_num) {
          _this.$message.error('请输入数量');
        }
        else {
          _totalAmount = _transFee + this.form.price;
          var params = {
            shopId: this.$route.query.id,
            shopNum: _num,
            normId: _zhvalue,
            transFee: _transFee,
            totalAmount: _totalAmount
          };
          if (publicFn.getStore("qluserInfo")) {
            this.shopMerge(params);
          }
          else {
            this.$router.push('/Login');
          }
        }
      },
      //更新订单
      shopMerge: function (params) {
        var _this = this;
        API.request({
          method: "post",
          url: API.shopMerge,
          headers: this.headerobj,
          data: API.qs.stringify(params)
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success("添加订单");
              _this.$router.push({path: '/submitOrder', query: {id: e.data.data || 1}});
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
      addOrderHandle: function () {
        var _this = this, _num = this.form.num, _zhvalue = this.zhvalue, _sendcity = this.sendcity;
        if (_zhvalue.length < 1) {
          _this.$message.error('请选择规格');
        }
        else if (!_num) {
          _this.$message.error('请输入数量');
        }
        else {
          var params = {shopId: this.$route.query.id, num: _num, normId: _zhvalue};
          if (publicFn.getStore("qluserInfo")) {
            this.shopAdd2Car(params)
          }
          else {
            this.$router.push('/Login');
          }
        }
      },
      //加入购物车
      shopAdd2Car: function (params) {
        var _this = this;
        API.request({
          method: "post",
          url: API.shopAdd2Car,
          headers: this.headerobj,
          data: API.qs.stringify(params)
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$router.push({path: '/car_shop'});
              _this.$message.success("添加到购物车");
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
      //商品详情
      shopInfo: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.shopInfo,
          headers: this.headerobj,
          data: API.qs.stringify({shopId: this.$route.query.id})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.form = _this.exchangeData(e.data.data || []);
              _this.form.img = _this.form.photos[0];
              _this.form.price = _this.form.norm[0].normVipPrice || 0;
              _this.form.priceDel = _this.form.norm[0].normPrice || 0;
              _this.zhvalue = _this.form.norm[0].normId;
//              _this.zhData[0] = {id: _this.form.norm[0].itemIds[0], index: 0, indexs: 0};
//              _this.zhData[1] = {id: _this.form.norm[0].itemIds[1], index: 1, indexs: 0};
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
      //地区查询
      shopAreas: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.shopAreas,
          headers: this.headerobj,
          data: API.qs.stringify({shopId: this.$route.query.id})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.options2 = e.data.data;
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
      //查看评论
      shopEvals: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.shopEvals,
          headers: this.headerobj,
          data: API.qs.stringify({shopId: this.$route.query.id})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.commentData = e.data.data;
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
      //相关推荐
      shopRelatives: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.shopRelatives,
          headers: this.headerobj,
          data: API.qs.stringify({shopId: this.$route.query.id})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.boxData = e.data.data;
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
      imgClick: function (index) {
        this.changeImg = index;
        this.form.img = this.form.photos[index];
      },
      //组合选择
      getItemId: function (v, index, indexs) {
        var arr = this.zhData;
        if (arr.length > 0) {
          if (arr[index] && arr[index].index == index) {
            //说明是同一类
            arr[index].id = v;
          }
          else {
            arr.push({id: v, index: index, indexs: indexs});
          }
        }
        else {
          arr.push({id: v, index: index, indexs: indexs});
        }
      },
      //组合寻找相应价格
      getnormId: function () {
        if (this.zhData.length == 2) {
          for (var i = 0, arr = this.form.norm; i < arr.length; i++) {
            if (this.zhData[0].id == arr[i].itemIds[0] && this.zhData[1].id == arr[i].itemIds[1]) {
              //找到
              this.form.price = arr[i].normVipPrice;
              this.form.priceDel = arr[i].normPrice;
              break;
            }
          }
        }
      },
      //点击选择商品属性
      changeHandle: function (row, index, indexs) {
        //组合选择
        this.getItemId(row.itemId, index, indexs);
        this.getnormId();
//        console.log(JSON.stringify(this.zhData), index, indexs);
//        $('.size').eq(index).$('.box').eq(indexs).addClass('red');
//        this.changeRed = index;
//        this.changeRed1 = indexs
      },
      //普通规格
      specsHandle: function (row, index) {
        this.changeRed = index;
        this.zhvalue = row.itemIds;
        this.form.price = row.normVipPrice;
        this.form.priceDel = row.normPrice;
      },
      shouchang1: function () {
        if (this.form.isCollect == 1) {
          //收藏
          this.$message('收藏成功')
        } else {
          //未收藏
          this.$message('取消收藏')
        }
      },
      exchangeData: function (v) {
        v.num = v.num || 1;
        return v;
      }
    }
  }
  ;
</script>
<style lang="less" scoped>
  .shopDetail {
    .contain {
      width: 1280px;
      margin: 40px auto;
      display: flex;
      .left {
        margin-right: 30px;
        .bigImg {
          width: 558px;
          height: 558px;
          border: 1px solid rgba(230, 230, 230, 1);
          border-radius: 4px;
          img {
            width: 552px;
            height: 552px;
          }
        }
        .imgs {
          margin-top: 20px;
          width: 552px;
          display: flex;
          overflow: hidden;
          .imgBox {
            width: 90px;
            height: 90px;
            border: 1px solid #fff;
            border-radius: 4px;
            margin-right: 25px;
            box-sizing: border-box;
            padding: 5px;
            img {
              width: 80px;
              height: 80px;
            }
          }
          .clickImg {
            border: 1px solid #000000;
          }
        }
      }
      .right {
        > p:nth-child(1) {
          font-size: 30px;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 36px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .priceBox {
          width: 698px;
          height: 130px;
          background-color: #f5f5f5;
          margin-top: 20px;
          padding: 0 20px;
          box-sizing: border-box;
          > div:nth-child(1) {
            height: 80px;
            border-bottom: 2px solid #ccc;
            > span:nth-child(1) {
              font-size: 18px;
              font-family: DFYuanW5-GB;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
              line-height: 36px;
            }
            > span:nth-child(2) {
              font-size: 36px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #ff0000;
              line-height: 80px;
              margin: 0 10px 0 40px;
            }
            > span:nth-child(3) {
              font-size: 18px;
              font-family: PingFang SC;
              font-weight: 400;
              text-decoration: line-through;
              color: rgba(153, 153, 153, 1);
              line-height: 80px;
            }
            > span:nth-child(4) {
              float: right;
              font-size: 18px;
              font-family: DFYuanW5-GB;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              line-height: 80px;
              margin-right: 10px;
            }
            > span:nth-child(5) {
              float: right;
              font-size: 18px;
              font-family: DFYuanW5-GB;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              line-height: 80px;
              margin-right: 10px;

            }
          }
          > div:nth-child(2) {
            display: flex;
            justify-content: space-between;
            padding: 0 100px;
            span {
              line-height: 48px;
              font-size: 16px;
              font-family: DFYuanW5-GB;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
              span {
                font-size: 18px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #ff0000;
              }
            }
          }
        }
        .address {
          margin-top: 20px;
          span {
            font-size: 18px;
            font-family: DFYuanW5-GB;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            margin-right: 35px;
          }
        }
        .size {
          margin-top: 20px;
          border-top: 2px solid #e6e6e6;
          padding-top: 20px;
          margin-right: 20px;
          line-height: 50px;
          display: flex;
          span {
            width: 70px;
            font-size: 18px;
            font-family: DFYuanW5-GB;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            margin-right: 20px;
          }
          div {
            /*display: flex;*/
            .box {
              /*width: 100px;*/
              padding: 0 10px;
              height: 50px;
              background: rgba(209, 69, 71, 0);
              border: 2px solid #cccccc;
              border-radius: 4px;
              display: inline-block;
              text-align: center;
              margin: 10px;
            }
          }
        }
        .zuhe {
          margin-top: 20px;
          margin-right: 20px;
          line-height: 50px;
          display: flex;
          span {
            font-size: 18px;
            font-family: DFYuanW5-GB;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            margin-right: 20px;
          }
          .box {
            width: 100px;
            height: 50px;
            background: rgba(209, 69, 71, 0);
            border: 2px solid #cccccc;
            border-radius: 4px;
            display: inline-block;
            text-align: center;
            margin: 0 10px;
          }
        }
        .countNumber {
          margin-top: 20px;
          span {
            font-size: 18px;
            font-family: DFYuanW5-GB;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            margin-right: 40px;
          }
        }
        .buy {
          display: flex;
          margin-top: 20px;
          > button:nth-child(1) {
            width: 220px;
            height: 56px;
            background: #ff9494;
            border-radius: 4px;
            border: none;
            font-size: 20px;
            font-family: DFYuanW5-GB;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            margin-right: 18px;
          }
          > button:nth-child(2) {
            width: 220px;
            height: 56px;
            background: #ffffff;
            border: 2px solid #ff9494;
            border-radius: 4px;
            font-size: 20px;
            font-family: DFYuanW5-GB;
            font-weight: 400;
            color: #ff9494;
          }
        }
      }
    }
    .bottom {
      width: 1280px;
      margin: 40px auto;
      display: flex;
      .bottom_left {
        width: 920px;
        /deep/ .el-tabs__content {
          padding: 0;
        }
        .bottomBox {
          width: 920px;
          height: 280px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(230, 230, 230, 1);
          border-radius: 0px 0px 0px 4px;
          padding: 30px;
          box-sizing: border-box;
          p {
            font-size: 20px;
            font-family: DFYuanW5-GB;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          .boxItem {
            display: flex;
            div {
              width: 420px;
              p {
                font-size: 16px;
                font-family: DFYuanW5-GB;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                margin: 10px;
              }
            }
          }
        }
        .bigIMG {
          width: 920px;
          height: 920px;
          > img:nth-child(1) {
            width: 920px;
            margin-top: 20px;
          }
          > img:nth-child(2) {
            width: 920px;
            margin-top: -4px;
          }
        }
        .comment {
          width: 1280px;
          background-color: #fff;
          padding: 20px;
          box-sizing: border-box;
          .commentBox {
            display: flex;
            border: 1px dotted #f5f5f5;
            padding: 20px;
            > div:nth-child(1) {
              text-align: center;
              width: 100px;
              margin-right: 20px;
              img {
                width: 50px;
                height: 50px;
                background: rgba(216, 216, 216, 1);
                border-radius: 25px;
              }
              p {
                font-size: 20px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(74, 74, 74, 1);
                line-height: 28px;
              }
            }
            > div:nth-child(2) {
              > p:nth-child(1) {
                font-size: 20px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(74, 74, 74, 1);
                line-height: 28px;
                height: 60px;
              }
              div {
                margin-bottom: 20px;
                display: inline-block;
                margin-right: 20px;
                img {
                  width: 90px;
                  height: 90px;
                }
              }
              > p:nth-child(2) {
                font-size: 20px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(155, 155, 155, 1);
                line-height: 28px;
              }
            }
          }
        }
      }
      .bottom_right {
        width: 330px;
        margin-left: 30px;
        p {
          text-align: center;
          font-size: 18px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(74, 74, 74, 1);
          line-height: 25px;
        }

        .recommend {
          width: 330px;
          height: 330px;
          margin-top: 30px;
          img {
            width: 330px;
            height: 330px;
          }
          .describe {
            width: 330px;
            background: rgba(0, 0, 0, 0.8);
            position: absolute;
            margin-top: -80px;
            padding: 10px;
            box-sizing: border-box;
            > p:nth-child(1) {
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 17px;
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
              text-align: left;
            }
            > p:nth-child(2) {
              display: flex;
              margin-top: 20px;
              justify-content: space-between;
              > span:nth-child(1) {
                font-size: 18px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                line-height: 25px;
              }
              > span:nth-child(2) {
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(155, 155, 155, 1);
                line-height: 30px;
              }
            }
          }
        }
      }
    }
    .red {
      border: 2px solid #ff9494 !important;
    }
  }
</style>
