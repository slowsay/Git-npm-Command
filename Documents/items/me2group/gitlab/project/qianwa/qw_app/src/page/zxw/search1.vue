<template>
  <div class="search">
    <div class="top">
      <van-col span="2">
        <div class="nav">
          <van-icon @click="backHandle" style="font-size:.45rem;margin-top:.08rem" name="arrow-left"></van-icon>
        </div>
      </van-col>
      <van-col span="22">
        <van-search
          v-model="searchValue"
          placeholder="点击畅所欲言"
          show-action
          shape="round"
          @search="onSearch"
        >
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
      </van-col>
    </div>
    <!-- 当搜索的结果为有结果时 -->
    <div class="contain" v-if="state==0">
      <van-list v-model="loading" :finished="finished" finished-text="" @load="onLoad">
        <div v-for="(item,index) in data" :key="index" class="hotBox" @click="goto(index)">
          <div class="imgBox">
            <img :src="item.image"/>
          </div>
          <div>
            <p>{{item.title}}</p>

            <p>
              <span>{{item.diveName}}</span>
              <span style="color:rgba(204,204,204,1);margin-left:.2rem">{{item.travelTimes}}</span>
            </p>
          </div>
        </div>
      </van-list>
    </div>

    <!-- 当没有搜索到相关内容时 -->
    <div class="contain" v-if="state==1">
      <p class="noFound">抱歉,没有找到相关内容</p>
    </div>
    <!-- 当网络出问题时 -->
    <div class="contain" v-if="state==2">
      <p class="noFound">网络出问题了，快去检查一下吧~</p>
    </div>
    <!-- 当网络出问题时 -->
    <div class="contain" v-if="state==3" style="text-align:center">
      <p class="noFound">加载失败~</p>
      <button class="btn">重新加载</button>
    </div>
  </div>
</template>
<script>
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    data: function () {
      return {
        state: "0",
        searchValue: "",
        loading: false,
        finished: false,
        data: [
//          {
//            image: require("../../assets/image/zxw/bg2.png"),
//            diveContent: "它和它的附属海岛就像是一个现实世界中的梦境之岛。",
//            diveName: "诗巴丹",
//            travelTimes: "2019/07/12"
//          }
        ]
      };
    },
    //初始化数据
    created: function () {
      if (localStorage.getItem("userInfo")) {
        this.userinfo = JSON.parse(localStorage.getItem("userInfo"));
      }
      else {
        this.userinfo = {token: 'qianwatoken', id: '1'}
//        this.$router.push({path: '/Login'});
      }
      this.init();
    },
    methods: {
      init: function () {
        this.searchValue = decodeURI(this.$route.query.title)||'';
        //根据输入的潜点介绍信息模糊查询对应的潜点列表
        this.searchContent();
      },
      searchContent: function () {
        var _this = this;
        if (this.searchValue.length > 0) {
          API.request({
            url: API.selectDiveContentByTitle,
            method: 'post',
            headers: {token: this.userinfo.token, userId: this.userinfo.id},
            data: API.qs.stringify({title: this.searchValue})
          }).then(function (e) {
            if (e.data.code == 200) {
              if (e.data.success) {
                _this.data = _this.exchangeData(e.data.data);
                if (_this.data.length < 1) {
                  _this.state = true;
                }
                else {
                  _this.state = false;
                }
              }
              else {
                API.dialog({message: e.data.msg})
              }
            }
            else {
              API.dialog({message: e.data.msg})
            }
          }).catch(function (e) {
            API.dialog({message: JSON.stringify(e)});
          })
        }
      },
      //转换数据
      exchangeData: function (v) {
        for (var i = 0, arr = v; i < arr.length; i++) {
          arr[i].travelTimes = publicFn.dateYMD(arr[i].travelTime)
        }
        return arr;
      },
      //点击搜索时
      onSearch: function () {
//        if (this.state == 1) {
//          this.state = 2;
//        } else if (this.state == 2) {
//          this.state = 3;
//        } else if (this.state == 3) {
//          this.state = 0;
//        } else if (this.state == 0) {
//          this.state = 1;
//        }
        this.$router.push({path: '/search1', query: {title: encodeURI(this.searchValue)}});
        this.searchContent();
      },
      backHandle: function () {
        this.$router.push("/search");
      },
      //分步显示
      onLoad: function () {
        var _this = this;
        // 异步更新数据
        if (this.data && this.data.length > 5) {
          setTimeout(function () {
            for (let i = 0; i < 5; i++) {
              _this.data.push(_this.data.length + 1);
            }
//            // 加载状态结束
            _this.loading = false;
//
//            // 数据全部加载完成
            if (_this.data.length >= 20) {
              _this.finished = true;
            }
          }, 1000);
        }
        else {
          this.loading = false;
          this.finished = true;
        }
      },
      //点击前往潜点详情页面
      goto: function (id) {
        this.$router.push({path: 'Diving', query: {id: this.data[id].contentId}})
      }

    }
  }
</script>
<style lang="less" scoped>
  .search {
    width: 7.5rem;
    padding: 0.3rem;
    box-sizing: border-box;
    .top {
      height: 0.9rem;
      width: 6.9rem;
      .nav {
        font-size: .45rem;
      }
      .van-search {
        padding: 0;
      }
    }
    .contain {
      width: 6.9rem;
      .btn {
        width: 2rem;
        height: 0.6rem;
        border-radius: 0.1rem;
        border: 0.01rem solid rgba(230, 230, 230, 1);
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(82, 189, 242, 1);
        background-color: #fff;
        margin-top: 0.3rem;
      }
      .title {
        font-size: 0.28rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(155, 155, 155, 1);
        line-height: 0.4rem;
        margin-top: 0.3rem;
      }
      .hotBox {
        width: 6.9rem;
        height: 2.4rem;
        background: rgba(255, 255, 255, 1);
        box-shadow: 1px 1px 20px 0px rgba(230, 230, 230, 1);
        border-radius: 0.1rem;
        padding: 0.2rem;
        box-sizing: border-box;
        margin-bottom: 0.2rem;
        display: flex;
        .imgBox {
          width: 2.55rem;
          height: 2rem;
          margin-right: 0.2rem;
          img {
            width: 2.55rem;
            height: 2rem;

            border-radius: 0.1rem;
          }
        }

        div {
          position: relative;
          width: 100%;
          > p:nth-child(1) {
            font-size: 0.24rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(74, 74, 74, 1);
            line-height: 0.4rem;
          }
          > p:nth-child(2) {
            font-size: 0.24rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(82, 189, 242, 1);
            line-height: 0.33rem;
            position: absolute;
            bottom: 0;
          }
        }
      }
      .noFound {
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(155, 155, 155, 1);
        line-height: 0.45rem;
        margin-top: 4rem;
        text-align: center;
      }
    }
  }
</style>
