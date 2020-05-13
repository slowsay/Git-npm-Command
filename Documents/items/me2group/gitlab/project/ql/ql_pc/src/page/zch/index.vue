<template>
  <div class="index">
    <div class="back">
      <div class="nav">
        <ul class="tab">
          <li v-for="(item,i) of tab" :key="i" @click="tabs(i)" :class="{'active':type==i}">{{item}}</li>
        </ul>
        <div class="right">
          <div class="input_box">
            <img src="../../assets/image/zch/fang.png" alt/>
            <input type="text" v-model="searchText" placeholder="输入帖子标题或标签" @focus="historyOpen"/>

            <!--<div class="history" v-if="historyflag">-->
              <!--<div class="t">历史搜索</div>-->
              <!--<a v-for="(item,indexs) in historyData" :key="indexs" @click="historySearchHandle(item)">{{item.name}}</a>-->

              <!--<div class="t">热门搜索</div>-->
              <!--<div>-->
                <!--<a v-for="(item,index) in hotHistoryData" :key="index" @click="hotHistorySearchHandle(item)">{{item.infoDesc}}</a>-->
              <!--</div>-->
            <!--</div>-->
          </div>
          <div class="updata">
            <img src="../../assets/image/zch/updata.png" @click="exchangeHandle"/>

            <p class="name" @click="exchangeHandle">换一批</p>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="cycle" v-for="(item,index) of content" :key="index">
        <div class="image" @click="detailHandle(item)">
          <img :src="item.pic" alt/>
          <img src="../../assets/image/zch/play.png" alt class="play"/>
        </div>
        <div class="text">
          <p class="title">{{item.title}}</p>

          <div class="bottom">
            <div class="left">
              <img :src="item.headImage" alt/>

              <p class="name">{{item.nickName}}</p>
            </div>
            <div class="right" @click="zanHandle(item)">
              <img :src="no" v-if="item.isUp==1"/>
              <img :src="yes" v-else/>

              <p class="number">{{item.upNum}}</p>
            </div>
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
        tab: ["关注", "发现", "本周最佳", "本月最佳", "年度最佳"],
        searchText: '',
        pageindex: 1,
        pagecount: 1,
        pagesize: 10,
        historyData: [],
        hotHistoryData: [],
        historyflag: false,
        type: 0,
        no: require("../../assets/image/zch/3x.png"),
        yes: require("../../assets/image/zch/x.png"),
        content: [
//          {
//            img: require("../../assets/image/zch/con1.jpg"),
//            title: "分享一只好看的小姐姐",
//            poto: require("../../assets/image/zch/con1.jpg"),
//            name: "不会飞的发福蝶",
//            no: require("../../assets/image/zch/3x.png"),
//            yes: require("../../assets/image/zch/x.png"),
//            number: 2332,
//            show: false
//          }
        ]
      };
    },
    created: function () {
//      localStorage.clear();
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
        //查询系统推荐博主
        this.searchList();
//        //历史搜索
//        this.historySearch();
//        //热门搜索接口
//        this.hotSearchList();
      },
//      //历史搜索
//      historySearchHandle: function (row) {
//        this.historyflag = false;
//        this.searchListHandle(row.name);
//      },
//      //热搜索
//      hotHistorySearchHandle: function (row) {
//        this.historyflag = false;
//        this.searchListHandle(row.infoDesc);
//      },
      historyOpen: function () {
//        this.historyflag = true;
      },
      //历史搜索
      historySearch: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.historySearch,
          headers: this.headerobj,
//          data: API.qs.stringify({queryType: (this.type + 1)})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.historyData = e.data.data;
            }
            else {
              _this.$message.error(JSON.stringify(e.data.msg));
            }
          }
          else {
            _this.$message.error(JSON.stringify(e.data.msg));
          }

        }).catch(function (e) {
          console.log(e);
          _this.$message.error(JSON.stringify(e));
        })
      },
      //热门搜索接口
      hotSearchList: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.hotSearchList,
          headers: this.headerobj,
//          data: API.qs.stringify({queryType: (this.type + 1)})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.hotHistoryData = e.data.data;
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
      //查询系统推荐博主
      searchList: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.searchList,
          headers: this.headerobj,
          data: API.qs.stringify({queryType: (this.type + 1)})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.content = _this.exchangeData(e.data.data || []);
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
      //换一批
      exchangeHandle: function () {
        var _this = this, _searchText = this.searchText;
        if (_searchText.length > 0) {
          _this.searchListHandle(_searchText)
        }
        else {
          _this.$message.error("请输入帖子标题或标签");
        }
      },
      detailHandle: function (row) {
        this.$router.push({path: '/details', query: {id: row.id}})
      },
      searchListHandle: function (val) {
        var _this = this;
        API.request({
          method: "post",
          url: API.searchList,
          headers: this.headerobj,
          data: API.qs.stringify({queryType: (this.type + 1), keyWord: val})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.content = _this.exchangeData(e.data.data || []);
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
      tabs: function (type) {
        this.type = type;
        this.searchList()
      },
      //点赞
      zanHandle: function (row) {
        if (row.isUp == 2) {
          //点赞
          this.agreePosting(row.id, 1);
        } else {
          //取消点赞
          this.agreePosting(row.id, 2);
        }
      },
      //调用点赞接口
      agreePosting: function (id, v) {
        var _this = this;
        API.request({
          method: "post",
          url: API.agreePosting,
          headers: this.headerobj,
          data: API.qs.stringify({postingId: id, toward: v})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.$message.success(v == 1 ? '点赞成功' : '取消点赞');
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
      jump: function (a) {
        this.$router.push(a);
      },
      exchangeData: function (v) {
        for (var i = 0, arr = v; i < arr.length; i++) {
          arr[i].iszan = arr[i].isUp == 1 ? true : false;//1是,2否
          arr[i].upNum = arr[i].upNum || 0;
        }
        return arr;
      }
    }
  };
</script>

<style lang="less" scoped>
  .index {
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div.back {
      background: #fff;
      width: 100%;
      display: flex;
      justify-content: center;
      .nav {
        display: flex;
        height: 100px;
        align-items: center;
        justify-content: space-between;
        width: 1280px;
        .tab {
          display: flex;
          li {
            font-size: 22px;
            font-family: PingFangSC-Light, PingFang SC;
            font-weight: 300;
            color: rgba(74, 74, 74, 1);
            line-height: 30px;
            position: relative;
            cursor: pointer;
          }
          li:not(:first-child) {
            margin-left: 38px;
          }
          .active:after {
            content: "";
            display: inline-block;
            width: 100%;
            height: 2px;
            background: red;
            position: absolute;
            top: 35px;
            right: 0;
          }
        }
        .right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          width: 40%;
          .input_box {
            display: flex;
            align-items: center;
            position: relative;
            margin-right: 32px;
            width: 70%;
            .history {
              position: absolute;
              background: #fff;
              margin: 8rem 0;
              padding: 1rem;
            }
            .history .t {
              margin: 1rem 0;
            }
            .history a {
              margin: 0 1rem 1rem 0;
              color: #ff0000;
            }
            input {
              padding-left: 65px;
              height: 40px;
              border-radius: 30px;
              border: 1px solid rgba(151, 151, 151, 1);
              outline: 0;
              width: 100%;
            }
            img {
              position: absolute;
              width: 20px;
              height: 20px;
              left: 33px;
            }
          }
          .updata {
            cursor: pointer;
            display: flex;
            align-items: center;
            img {
              width: 17px;
              height: 18px;
            }
            .name {
              font-size: 18px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(74, 74, 74, 1);
              line-height: 25px;
              margin-left: 10px;
            }
          }
        }
      }
    }
    .content {
      width: 1280px;
      display: flex;
      flex-wrap: wrap;
      margin: 20px 0 60px;
      .cycle:not(:nth-child(4n + 1)) {
        margin-left: 3.2%;
      }
      .cycle:nth-child(n + 5) {
        margin-top: 40px;
      }
      .cycle {
        width: 22.6%;
        .image {
          width: 290px;
          height: 320px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          .play {
            width: 50px;
            height: 50px;
            position: absolute;
            right: 1px;
            top: 1px;
          }
        }
        .text {
          background: #fff;
          .title {
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(47, 47, 47, 1);
            line-height: 22px;
            margin-bottom: 22px;
            padding: 10px 10px 0;
          }
          .bottom {
            display: flex;
            justify-content: space-between;
            padding: 0 10px 16px;
            .left {
              display: flex;
              align-items: center;
              img {
                width: 24px;
                height: 24px;
                border-radius: 50%;
              }
              .name {
                font-size: 14px;
                font-family: PingFangSC-Light, PingFang SC;
                font-weight: 300;
                color: rgba(130, 130, 130, 1);
                line-height: 20px;
                margin-left: 10px;
              }
            }
            .right {
              display: flex;
              align-items: center;
              img {
                width: 20px;
                height: 19px;
                margin-right: 3px;
              }
              p {
                font-size: 17px;
                font-family: PingFangSC-Light, PingFang SC;
                font-weight: 300;
                color: rgba(130, 130, 130, 1);
                line-height: 24px;
              }
            }
          }
        }
      }
    }
  }
</style>
