<template>
  <div class="shopDetail">
    <div class="top">
      <navbar></navbar>
    </div>
    <div class="contain">
      <div class="left">
        <div class="bigImg">
          <img :src="form.img" alt />
        </div>
        <div class="imgs">
          <div
            v-for="(item,index) in imgData"
            :key="index"
            class="imgBox"
            :class="{clickImg : changeImg == index }"
            @click="imgClick(index)"
          >
            <img class="img" :src="item.img" alt />
          </div>
        </div>
      </div>
      <div class="right">
        <p>{{form.name}}</p>
        <div class="priceBox">
          <div>
            <span>闪购价</span>
            <span>
              <span style="font-size:17px">￥</span>
              {{form.price}}
            </span>
            <span>{{form.priceDel}}</span>
            <span v-show="shouchang==true" @click="shouchang1">
              <i class="el-icon-star-off">&nbsp;收藏</i>
            </span>
             <span v-show="shouchang==false" @click="shouchang1">
              <i class="el-icon-star-on">&nbsp;已收藏</i>
            </span>
          </div>
          <div>
            <span>
              累计评价&nbsp;
              <span>{{form.comment}}</span>
            </span>
            <span>|</span>
            <span>
              成交数量&nbsp;
              <span>{{form.number}}</span>
            </span>
          </div>
        </div>
        <div class="coypon">
          <div>
            <span>优惠券</span>
            <div v-for="(item,index) in coypon" :key="index">
              <div>{{item.card}}</div>
              <div v-if="getshow==0" @click="getTo" style="padding-left:18px">领取</div>
               <div v-else-if="getshow==1">已领取</div>
            </div>
          </div>
        </div>
        <div class="address">
          <span>配送至</span>
          <el-select v-model="value2" placeholder="请选择">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </div>
        <div class="size">
          <span>容量</span>
          <div>
            <div v-for="(item,index) in sizeData" :key="index" class="box" @click="red(index)" :class="{red: changeRed ==index}">{{item.size}}</div>
          </div>
        </div>
        <div class="zuhe">
          <span>组合</span>
          <div v-for="(item,index) in zuheData" :key="index" @click="red1(index)" :class="{red:changeRed1 == index}" class="box">{{item.zuhe}}</div>
        </div>
        <div class="countNumber">
          <span>数量</span>
          <el-input-number size="medium" v-model="form.num"></el-input-number>
        </div>
        <div class="buy">
          <button @click="$router.push('/buyNow')">立即购买</button>
          <button @click="$router.push('/waitPay')">加入购物车</button>
        </div>
      </div>
    </div>
    <div class="bottom">
      <el-tabs type="border-card">
        <el-tab-pane label="商品详情">
          <div class="bottom_contain">
            <div class="bottomBox">
              <p>产品参数</p>
              <div class="boxItem">
                <div>
                  <p>型号：{{form.xinghao}}</p>
                  <p>产地：{{form.chandi}}</p>
                  <p>毛重：{{form.maozhong}}</p>
                  <p>深度：{{form.shengdu}}</p>
                </div>
                <div>
                  <p>材质：{{form.caizhi}}</p>
                  <p>颜色分类：{{form.fenlei}}</p>
                  <p>直径：{{form.zhijing}}</p>
                  <p>特点：{{form.tedian}}</p>
                </div>
                <div>
                  <p>风格：{{form.fengge}}</p>
                  <p>净重：{{form.jz}}</p>
                  <p>锅盖类型：{{form.leixing}}</p>
                  <p>适用场景：{{form.changjing}}</p>
                </div>
              </div>
             
            </div>
             <div class="bigIMG">
                <img src="../../assets/img/zxw/bigIMG.png" alt />
              </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="查看评论">配置管理</el-tab-pane>
      </el-tabs>
    </div>
    <rightNav></rightNav>
    <Bottom></Bottom>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shouchang:true,
      options2:'',
      value2:'',
      getshow:0,
      changeImg: 0,
      changeRed:-1,
      changeRed1:-1,
      form: {
        img: require("../../assets/img/zxw/shop.png"),
        name: "的看哈开始疯狂划水的客户肯定看撒的看法和看见了是否",
        price: "1888.88",
        priceDel: "2888.88",
        comment: 4443,
        number: 3333,
        num: 1
      },
      coypon: [
        {
          card: "满3000减300"
        },
        {
          card: "满3000减300"
        }
      ],
      imgData: [
        {
          img: require("../../assets/img/zxw/shop.png")
        },
        {
          img: require("../../assets/img/zxw/bao1.png")
        },
        {
          img: require("../../assets/img/zxw/shop.png")
        },
        {
          img: require("../../assets/img/zxw/shop.png")
        }
      ],
      sizeData: [
        {
          size: 5.5
        },
        {
          size: 6.5
        },
        {
          size: 7.5
        }
      ],
      zuheData: [
        {
          zuhe: "组合一"
        },
        {
          zuhe: "组合二"
        }
      ]
    };
  },
  methods: {
    imgClick(index) {
      this.changeImg = index;
      this.form.img = this.imgData[index].img;
    },
    //点击领取改变状态
    getTo(){
      this.getshow = 1;
           this.$message('领取成功');
    },
    //点击选择商品属性
    red(index){
      this.changeRed = index;
      
    },
    red1(index){
      this.changeRed1 = index;
    },
    shouchang1(){
      if(this.shouchang==true){
        this.shouchang = false;
      }
      else{
        this.shouchang = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>$size: 0.8;
.shopDetail {
  font-size:16px*$size;
  margin: 0 auto;
  .top {
    width: 1280px*$size;
    margin: 40px*$size auto;
  }
  .contain {
    width: 1280px*$size;
    margin: 40px*$size auto;
    display: flex;
    .left {
      margin-right: 30px*$size;
      .bigImg {
        width: 552px*$size;
        height: 552px*$size;
        border: 1px*$size solid rgba(230, 230, 230, 1);
        border-radius: 4px*$size;
        img {
          width: 552px*$size;
          height: 552px*$size;
        }
      }
      .imgs {
        margin-top: 20px*$size;
        width: 552px*$size;
        display: flex;
        .imgBox {
          width: 120px*$size;
          height: 120px*$size;
          border: 1px*$size solid rgba(230, 230, 230, 1);
          border-radius: 4px*$size;
          margin-right: 24px*$size;
          box-sizing: border-box;
          padding: 5px*$size;
          img {
            width: 110px*$size;
            height: 110px*$size;
          }
        }
        .clickImg {
          border: 1px*$size solid #000000;
        }
      }
    }
    .right {
      > p:nth-child(1) {
        font-size: 30px*$size;
        font-family: DFYuanW5-GB;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 36px*$size;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .priceBox {
        width: 698px*$size;
        height: 130px*$size;
        background-color: #f5f5f5;
        margin-top: 20px*$size;
        padding: 0 20px*$size;
        box-sizing: border-box;
        > div:nth-child(1) {
          height: 80px*$size;
          border-bottom: 2px*$size solid #ccc;
          > span:nth-child(1) {
            font-size: 18px*$size;
            font-family: DFYuanW5-GB;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 36px*$size;
          }
          > span:nth-child(2) {
            font-size: 36px*$size;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(224, 18, 32, 1);
            line-height: 80px*$size;
            margin: 0 10px*$size 0 40px*$size;
          }
          > span:nth-child(3) {
            font-size: 18px*$size;
            font-family: PingFang SC;
            font-weight: 400;
            text-decoration: line-through;
            color: rgba(153, 153, 153, 1);
            line-height: 80px*$size;
          }
          > span:nth-child(4) {
            float: right;
            font-size: 18px*$size;
            font-family: DFYuanW5-GB;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 80px*$size;
            margin-right: 10px*$size;
          }
          > span:nth-child(5) {
            float: right;
            font-size: 18px*$size;
            font-family: DFYuanW5-GB;
            font-weight: 400;
            // color: rgba(51, 51, 51, 1);
            line-height: 80px*$size;
            margin-right: 10px*$size;
            color:red;
          }
        }
        > div:nth-child(2) {
          display: flex;
          justify-content: space-between;
          padding: 0 100px*$size;
          span {
            line-height: 48px*$size;
            font-size: 16px*$size;
            font-family: DFYuanW5-GB;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            span {
              font-size: 18px*$size;
              font-family: PingFang SC;
              font-weight: 400;
              color: rgba(224, 18, 32, 1);
            }
          }
        }
      }
      .coypon {
        margin-top: 20px*$size;
        > div:nth-child(1) {
          display: flex;
          span {
            font-size: 18px*$size;
            font-family: DFYuanW5-GB;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 38px*$size;
            margin-right: 20px*$size;
          }
          div {
            width: 246px*$size;
            height: 38px*$size;
            display: flex;
            > div:nth-child(1) {
              height: 38px*$size;
              width: 158px*$size;
              background-image: url("../../assets/img/zxw/fang.png");
              background-size: 100% 100%;
              font-size: 18px*$size;
              font-family: PingFang SC;
              font-weight: 400;
              color: rgba(224, 18, 32, 1);
              line-height: 38px*$size;
              padding-left: 20px*$size;
              box-sizing: border-box;
              margin-left: 20px*$size;
            }
            > div:nth-child(2) {
              background: url("../../assets/img/zxw/yuan.png");
              background-size: 100% 100%;
              height: 34px*$size;
              width: 84px*$size;
              margin-top: 2px*$size;
              font-size: 18px*$size;
              font-family: DFYuanW5-GB;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 34px*$size;
              box-sizing: border-box;
              margin-left: -4px*$size;
              text-align: center;
              padding-left: 10px*$size;
            }
          }
        }
      }
      .address {
        margin-top: 20px*$size;
        span {
          font-size: 18px*$size;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          margin-right: 35px*$size;
        }
      }
      .size {
        margin-top: 20px*$size;
        border-top: 2px*$size solid #e6e6e6;
        padding-top: 20px*$size;
        margin-right: 20px*$size;
        line-height: 50px*$size;
        display: flex;
        span {
          font-size: 18px*$size;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          margin-right: 40px*$size;
        }
        div {
          display: flex;

          .box {
            width: 185px*$size;
            height: 50px*$size;
            background: rgba(209, 69, 71, 0);
            border: 2px*$size solid #cccccc;
            border-radius: 4px*$size;
            display: inline-block;
            text-align: center;
            margin-left: 10px*$size;
          }
        }
      }
      .zuhe {
        margin-top: 20px*$size;
        margin-right: 20px*$size;
        line-height: 50px*$size;
        display: flex;
        span {
          font-size: 18px*$size;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          margin-right: 40px*$size;
        }
        .box {
          width: 185px*$size;
          height: 50px*$size;
          background: rgba(209, 69, 71, 0);
          border: 2px*$size solid #cccccc;
          border-radius: 4px*$size;
          display: inline-block;
          text-align: center;
          margin-left: 10px*$size;
        }
      }
      .countNumber {
        margin-top: 20px*$size;
        span {
          font-size: 18px*$size;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          margin-right: 40px*$size;
        }
      }
      .buy {
        display: flex;
        margin-top: 60px*$size;
        > button:nth-child(1) {
          width: 220px*$size;
          height: 56px*$size;
          background: #e01220;
          border-radius: 4px*$size;
          border: none;
          font-size: 20px*$size;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          margin-right: 18px*$size;
        }
        > button:nth-child(2) {
          width: 220px*$size;
          height: 56px*$size;
          background: #ffffff;
          border: 2px*$size solid rgba(224, 18, 32, 1);
          border-radius: 4px*$size;
          font-size: 20px*$size;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(224, 18, 32, 1);
        }
      }
    }
  }
  .bottom {
    width: 1280px*$size;
    margin: 40px*$size auto;
    >>>.el-tabs__content {
      padding: 0;
    }
    .bottomBox {
      width: 1280px*$size;
      height: 231px*$size;
      background: rgba(255, 255, 255, 1);
      border: 1px*$size solid rgba(230, 230, 230, 1);
      border-radius: 0px*$size 0px*$size 0px*$size 4px*$size;
      padding: 30px*$size;
      box-sizing: border-box;
      p {
        font-size: 20px*$size;
        font-family: DFYuanW5-GB;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .boxItem {
        display: flex;
        div {
          width: 420px*$size;
          p {
            font-size: 16px*$size;
            font-family: DFYuanW5-GB;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            margin: 10px*$size;
          }
        }
      }
    }
    .bigIMG{
      width: 1280px*$size;
      height: 1363px*$size;
      img{
         width: 1280px*$size;
        height: 1363px*$size;
        margin-top:20px*$size;
      }
    }
   
  }
   .red{
      border:2px*$size solid red !important;
    }
}
</style>