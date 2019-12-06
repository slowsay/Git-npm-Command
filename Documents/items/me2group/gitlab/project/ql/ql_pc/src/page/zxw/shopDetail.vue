<template>
  <div class="shopDetail">
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
              <span style="font-size:22px">￥</span>
              {{form.price}}
            </span>
            <span>{{form.priceDel}}</span>
            <span v-show="shouchang==true" @click="shouchang1">
              <i class="el-icon-star-off"></i>&nbsp;收藏
            </span>
            <span v-show="shouchang==false" @click="shouchang1">
              <i style="color:red" class="el-icon-star-on"></i>&nbsp;收藏
            </span>
          </div>
          <div>
            <span>
              销量&nbsp;
              <span>{{form.comment}}</span>
            </span>
            <span>|</span>
            <span>
              浏览量&nbsp;
              <span>{{form.number}}</span>
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
          <span>品牌：</span>
          <div>
            <div
              v-for="(item,index) in zuheData"
              :key="index"
              class="box"
              @click="red(index)"
              :class="{red: changeRed ==index}"
            >{{item.zuhe}}</div>
          </div>
        </div>
        <div class="zuhe">
          <span>型号：</span>
          <div
            v-for="(item,index) in sizeData"
            :key="index"
            @click="red1(index)"
            :class="{red:changeRed1 == index}"
            class="box"
          >{{item.size}}</div>
        </div>
        <div class="zuhe">
          <span>品类：</span>
          <div
            v-for="(item,index) in zuheData"
            :key="index"
            @click="red2(index)"
            :class="{red:changeRed2 == index}"
            class="box"
          >{{item.zuhe}}</div>
        </div>
        <div class="countNumber">
          <span>数量</span>
          <el-input-number size="medium" v-model="form.num"></el-input-number>
        </div>
        <div class="buy">
          <button @click="$router.push('/submitOrder')">立即购买</button>
          <button >加入购物车</button>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom_left">
        <el-tabs type="border-card">
          <el-tab-pane label="商品详情">
            <div class="bottom_contain">
              <div class="bottomBox">
                <p>产品参数</p>
                <div class="boxItem">
                  <div>
                    <p>品牌：{{form.xinghao}}</p>
                    <p>适用性别：{{form.chandi}}</p>
                    <p>颜色分类：{{form.maozhong}}</p>
                    <p>货号：{{form.shengdu}}</p>
                    <p>腰带代扣款式：{{form.shengdu}}</p>
                    <p>是否商场同款：{{form.shengdu}}</p>
                  </div>
                  <div>
                    <p>主材质：{{form.caizhi}}</p>
                    <p>款士：{{form.fenlei}}</p>
                    <p>流行元素：{{form.zhijing}}</p>
                    <p>带扣材质：{{form.tedian}}</p>
                    <p>长度：{{form.tedian}}</p>
                    <p>宽度：{{form.tedian}}</p>
                  </div>
                  <div>
                    <p>风格：{{form.fengge}}</p>
                    <p>带身元素：{{form.jz}}</p>
                    <p>上市时间：{{form.leixing}}</p>
                    <p>适用对象：{{form.changjing}}</p>
                    <p>材质工艺{{form.changjing}}</p>
                  </div>
                </div>
              </div>
              <div class="bigIMG">
                <img src="../../assets/image/zxw/img1.png" alt />
                <img src="../../assets/image/zxw/img2.png" alt />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="查看评论">
            <div class="comment">
              <div v-for="(item,index) in commentData" :key="index" class="commentBox">
                <div>
                  <img :src="item.userImg" alt />
                  <p>{{item.username}}</p>
                </div>
                <div>
                  <p>{{item.comment}}</p>
                  <div v-for="(item1,index1) in commentData[index].imgbox" :key="index1">
                    <img :src="item1.img" alt />
                  </div>
                  <p>{{item.date}}</p>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="bottom_right">
        <p>相关推荐</p>
        <div v-for="(item,index) in boxData" :key="index" class="recommend">
          <img :src="item.img" alt />
          <div class="describe">
            <p>{{item.title}}</p>
            <p>
              <span>￥{{item.money}}</span>
              <span>销量：{{item.sale}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shouchang: true,
      options2: "",
      value2: "",
      getshow: 0,
      changeImg: 0,
      changeRed: 0,
      changeRed1: 0,
      changeRed2: 0,
      form: {
        img: require("../../assets/image/zxw/img2.png"),
        name: "的看哈开始疯狂划水的客户肯定看撒的看法和看见了是否",
        price: "1888.88",
        priceDel: "2888.88",
        comment: 4443,
        number: 3333,
        num: 1
      },
      imgData: [
        {
          img: require("../../assets/image/zxw/img2.png")
        },
        {
          img: require("../../assets/image/zxw/typeImg1.png")
        },
        {
          img: require("../../assets/image/zxw/typeImg1.png")
        },
        {
          img: require("../../assets/image/zxw/typeImg1.png")
        },
        {
          img: require("../../assets/image/zxw/typeImg1.png")
        },
          {
          img: require("../../assets/image/zxw/typeImg1.png")
        }
      ],
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
      commentData: [
        {
          userImg: require("../../assets/image/zxw/userImg.png"),
          username: "图图大人",
          comment: "这个腰带很适合顾伟，绑在头上很潇洒",
          date: "2019-03-12  18:22",
          imgbox: [
            {
              img: require("../../assets/image/zxw/userImg.png")
            },
            {
              img: require("../../assets/image/zxw/userImg.png")
            }
          ]
        },
        {
          userImg: require("../../assets/image/zxw/userImg.png"),
          username: "图图大人",
          comment: "这个腰带很适合顾伟，绑在头上很潇洒",
          date: "2019-03-12  18:22"
        },
        {
          userImg: require("../../assets/image/zxw/userImg.png"),
          username: "图图大人",
          comment: "这个腰带很适合顾伟，绑在头上很潇洒",
          date: "2019-03-12  18:22"
        },
        {
          userImg: require("../../assets/image/zxw/userImg.png"),
          username: "图图大人",
          comment: "这个腰带很适合顾伟，绑在头上很潇洒",
          date: "2019-03-12  18:22"
        }
      ],
      //相关推荐模块数据
      boxData: [
        {
          img: require("../../assets/image/zxw/typeImg1.png"),
          title: "和恢复卡号卡号付款哈康活佛看哈达克警方阿斯弗",
          money: "100",
          sale: 200
        },
        {
          img: require("../../assets/image/zxw/typeImg1.png"),
          title: "和恢复卡号卡号付款哈康活佛看哈达克警方阿斯弗",
          money: "100",
          sale: 200
        },
        {
          img: require("../../assets/image/zxw/typeImg1.png"),
          title: "和恢复卡号卡号付款哈康活佛看哈达克警方阿斯弗",
          money: "100",
          sale: 200
        }
      ]
    };
  },
  methods: {
    imgClick(index) {
      this.changeImg = index;
      this.form.img = this.imgData[index].img;
    },
    //点击选择商品属性
    red(index) {
      this.changeRed = index;
    },
    red1(index) {
      this.changeRed1 = index;
    },
    red2(index) {
      this.changeRed2 = index;
    },
    shouchang1() {
      if (this.shouchang == true) {
        this.shouchang = false
        this.$message('收藏成功')
      } else {
        this.shouchang = true;
      }
    }
  }
};
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
          font-size: 18px;
          font-family: DFYuanW5-GB;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          margin-right: 20px;
        }
        div {
          display: flex;
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
      /deep/.el-tabs__content {
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