<template>
  <div id="shopList">
    <div class="top">
      <div>
        <span>品牌：</span>
      </div>
      <div>
        <span>品类：</span>
        <span>鞋子</span>
        <span>衬衫</span>
        <span>短袖</span>
        <span>袜子</span>
        <span>内衣</span>
      </div>
      <div>
        <span>价格区间：</span>
        <el-input style="width:150px" placeholder="最低价" v-model="input" clearable></el-input><span style="margin:0 10px;">-</span><el-input style="width:150px" placeholder="最高价" v-model="input1" clearable></el-input>
      </div>
      <div>
        <span>地区</span>
        <span>{{form.address}}</span>
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
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
          <div class="imgBox1">
            <img :src="item.img" alt />
          </div>
          <div class="hotBottom">
            <p>{{item.title}}</p>
            <p>
              <span>￥{{item.money}}</span>
              <span>销量：{{item.count}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          background
          layout="prev, pager, next, jumper"
          :total="1000"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage3: 5,
      input: "",
      input1: "",
      form: {
        address: "杭州"
      },
      hotData: [
        {
          img: require("../../assets/image/zxw/typeImg1.png"),
          title: "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣商务腰带",
          money: "2800",
          count: "200"
        },
        {
          img: require("../../assets/image/zxw/typeImg1.png"),
          title: "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣商务腰带",
          money: "2800",
          count: "200"
        },
        {
          img: require("../../assets/image/zxw/typeImg1.png"),
          title: "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣商务腰带",
          money: "2800",
          count: "200"
        },
        {
          img: require("../../assets/image/zxw/typeImg1.png"),
          title: "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣商务腰带",
          money: "2800",
          count: "200"
        },
        {
          img: require("../../assets/image/zxw/typeImg1.png"),
          title: "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣商务腰带",
          money: "2800",
          count: "200"
        },
        {
          img: require("../../assets/image/zxw/typeImg1.png"),
          title: "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣商务腰带",
          money: "2800",
          count: "200"
        },
        {
          img: require("../../assets/image/zxw/typeImg1.png"),
          title:
            "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣商务腰带版纯牛皮中年青年腰带自动扣商",
          money: "2800",
          count: "200"
        },
        {
          img: require("../../assets/image/zxw/typeImg1.png"),
          title: "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣商务腰带",
          money: "2800",
          count: "200"
        },
        {
          img: require("../../assets/image/zxw/typeImg1.png"),
          title:
            "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣商务腰带版纯牛皮中年青年腰带自动扣商",
          money: "2800",
          count: "200"
        },
        {
          img: require("../../assets/image/zxw/typeImg1.png"),
          title: "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣商务腰带",
          money: "2800",
          count: "200"
        },
        {
          img: require("../../assets/image/zxw/typeImg1.png"),
          title:
            "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣商务腰带版纯牛皮中年青年腰带自动扣商",
          money: "2800",
          count: "200"
        },
        {
          img: require("../../assets/image/zxw/typeImg1.png"),
          title: "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣商务腰带",
          money: "2800",
          count: "200"
        },
        {
          img: require("../../assets/image/zxw/typeImg1.png"),
          title:
            "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣商务腰带版纯牛皮中年青年腰带自动扣商",
          money: "2800",
          count: "200"
        },
        {
          img: require("../../assets/image/zxw/typeImg1.png"),
          title: "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣商务腰带",
          money: "2800",
          count: "200"
        },
        {
          img: require("../../assets/image/zxw/typeImg1.png"),
          title:
            "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣商务腰带版纯牛皮中年青年腰带自动扣商",
          money: "2800",
          count: "200"
        },
        {
          img: require("../../assets/image/zxw/typeImg1.png"),
          title: "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣商务腰带",
          money: "2800",
          count: "200"
        },
        {
          img: require("../../assets/image/zxw/typeImg1.png"),
          title:
            "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣商务腰带版纯牛皮中年青年腰带自动扣商",
          money: "2800",
          count: "200"
        },
        {
          img: require("../../assets/image/zxw/typeImg1.png"),
          title: "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣商务腰带",
          money: "2800",
          count: "200"
        },
        {
          img: require("../../assets/image/zxw/typeImg1.png"),
          title:
            "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣商务腰带版纯牛皮中年青年腰带自动扣商",
          money: "2800",
          count: "200"
        },
        {
          img: require("../../assets/image/zxw/typeImg1.png"),
          title: "正品七匹狼男士真皮皮带韩版纯牛皮中年青年腰带自动扣商务腰带",
          money: "2800",
          count: "200"
        }
      ]
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
    /deep/.el-pagination__jump {
      float: right;
    }
  }
}
</style>