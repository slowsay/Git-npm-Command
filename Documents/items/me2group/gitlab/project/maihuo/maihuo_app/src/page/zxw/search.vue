<template>
  <div class="search">
    <div class="top">
      <van-col span="2">
        <div class="nav">
          <van-icon @click="$router.push('/index')" style="font-size:.45rem;margin-top:.08rem"
                    name="arrow-left"></van-icon>
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
    <div class="contain">
      <p class="title" style="padding-top:.6rem">热门搜索</p>

      <div class="box">
        <div v-for="(item,index) in data" :key="index" @click="hotHandle(item)" class="hotBox">{{item.hotWordName}}
        </div>
      </div>

      <p class="title">历史记录</p>

      <div class="box">
        <div v-for="(item,index) in data1" :key="index" @click="historyHandle(item)" class="hotBox">{{item.words}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import API from '../../api/index';
  export default {
    data: function () {
      return {
        searchValue: '',
        data: [
//          {hotWordName: "诗巴丹"},
        ],
        data1: [
//          {words: "诗巴丹"},
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
        //热搜
        this.hostSearch()
        //历史搜索词
        this.historySearchWord();
      },
      hostSearch: function () {
        var _this = this;
        API.request({
          url: API.hotWordList,
          method: 'post',
          headers: {token: this.userinfo.token, userId: this.userinfo.id}
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.data = e.data.data;
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
      },
      //热搜
      hotHandle: function (row) {
        this.$router.push({path: 'search1', query: {title: encodeURI(row.hotWordName)}});
      },
      //历史记录搜索
      historyHandle: function (row) {
        this.$router.push({path: 'search1', query: {title: encodeURI(row.words)}});
      },
      //历史搜索词接口
      historySearchWord: function () {
        var _this = this;
        API.request({
          url: API.historySearchWord,
          method: 'post',
          headers: {token: this.userinfo.token, userId: this.userinfo.id}
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.data1 = e.data.data;
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
      },
      onSearch: function () {
        var _search = this.searchValue;
        if (_search.length < 1) {
//          API.dialog({message: "请输入搜索内容"});
        }
        else {
          this.$router.push({path: 'search1', query: {title: encodeURI(this.searchValue)}});
        }
      }
    }
  };
</script>
<style lang="less" scoped>
  .search {
    width: 7.5rem;
    padding: 0.3rem;
    box-sizing: border-box;
    .top {
      .nav {
        font-size: .45rem;
      }
      .van-search {
        padding: 0;
      }
    }
    .contain {
      width: 6.9rem;
      padding: .3rem 0;
      .title {
        font-size: 0.28rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(155, 155, 155, 1);
        line-height: 0.4rem;
        margin-top: 0.3rem;

      }
      .box {
        overflow: auto;
        width: 6.9rem;
        margin-top: .3rem;
      }
      .hotBox {
        padding: 0.1rem 0.3rem;
        background: rgba(242, 242, 242, 1);
        font-size: 0.28rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(155, 155, 155, 1);
        line-height: 0.4rem;
        float: left;
        margin: 0 .2rem .2rem 0;
      }
    }
  }
</style>
