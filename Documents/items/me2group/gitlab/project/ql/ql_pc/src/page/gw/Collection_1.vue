<template>
  <div id="Collection_1">
    <div class="top">
      <div>
        <p>我的收藏</p>

        <p v-if="state==0" @click="state=1">编辑收藏</p>

        <p v-else @click="state=0">取消编辑</p>
      </div>
      <div></div>
    </div>
    <div class="card">
      <div
        v-for="(item,index) in data"
        :key="index"
        :class="{three:(index+1)%3==0}"
        @click="getIdHandle(item)"
      >
        <img :src="item.photo"/>

        <p @click="goDetailHandle(item)">{{item.name}}</p>

        <div>
          <p>{{'￥'+item.price}}</p>

          <p>{{'销量:'+item.sales}}</p>
        </div>
        <img v-if="state==1&&item.state==false" src="../../assets/image/gw/24.png"/>
        <img v-if="state==1&&item.state==true" src="../../assets/image/gw/23.png"/>
      </div>
    </div>
    <div class="button" v-if="state==1">
      <el-button @click="delHandle">删除选择项</el-button>
    </div>
  </div>
</template>
<script>
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    data: function () {
      return {
        // 编辑状态 0关 1开
        state: 0,
        pageindex: 1,
        pagecount: 1,
        pagesize: 10,
        data: [],
        collect: []
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
        //收藏帖子列表
        this.collectList();
      },
      goDetailHandle: function (row) {
        this.$router.push({path: '/shopDetail', query: {id: row.id}});
      },
      handleCurrentChange: function (val) {
        this.pageindex = val;
      },
      getIdHandle: function (row) {
        row.state = !row.state;
        if (row.state) {
          //push
          this.collect.push(row.id);
        }
        else {
          //pop
          this.collect = this.delCollectData(row.id);
        }
      },
      delCollectData: function (id) {
        for (var i = 0, arr = this.collect; i < arr.length; i++) {
          if (arr[i] == id) {
            arr.splice(i, 1);
          }
        }
        return arr;
      },
      //批量取消收藏
      delHandle: function () {
        var _this = this, _collect = this.collect;
        if (_collect.length < 1) {
          _this.$message.error("没有可删除的");
        } else {
          API.request({
            method: "post",
            url: API.shopCollectCancel,
            headers: this.headerobj,
            data: API.qs.stringify({id: _collect.join(',')})
          }).then(function (e) {
            if (e.data.code == 200) {
              if (e.data.success) {
                _this.$message.success("删除成功");
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
      //获取数据
      collectList: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.shopCollectList,
          headers: this.headerobj,
//          data: API.qs.stringify({id: this.userinfo.id})
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.data = _this.exchangeData(e.data.data || []);
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
      exchangeData: function (v) {
        for (var i = 0, arr = v; i < arr.length; i++) {
          arr[i].state = false;
        }
        return arr
      }
    }
  };
</script>
<style lang="less" scoped>
  #Collection_1 {
    .top {
      > div:nth-child(1) {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin: 30px 0 10px;
        p:nth-child(1) {
          font-size: 28px;
          font-weight: 500;
          color: rgba(74, 74, 74, 1);
          line-height: 40px;
        }
        p:nth-child(2) {
          font-size: 22px;
          font-weight: 400;
          color: rgba(12, 118, 216, 1);
          line-height: 30px;
        }
      }
      > div:nth-child(2) {
        border-bottom: 5px dotted #4a4a4a;
      }
    }
    .card {
      overflow: hidden;
      padding-left: 10px;
      padding-bottom: 10px;
    }
    .card > div {
      width: 275px;
      height: 286px;
      margin: 30px 60px 0 0;
      position: relative;
      float: left;
      > img:nth-of-type(1) {
        width: 255px;
        height: 220px;
        margin: 0 10px;
        background: rgba(255, 255, 255, 1);
        border-radius: 6px 6px 0px 0px;
      }
      > p {
        font-size: 12px;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        line-height: 17px;
        height: 34px;
        margin: 5px 0 5px 10px;
      }
      > div {
        display: flex;
        align-items: center;
        width: 255px;
        margin: 0 10px;
        p:nth-of-type(1) {
          font-size: 18px;
          font-weight: 500;
          color: rgba(255, 0, 0, 1);
          line-height: 25px;
        }
        p:nth-of-type(2) {
          margin-left: auto;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(155, 155, 155, 1);
          line-height: 17px;
        }
      }
      > img:nth-of-type(2) {
        position: absolute;
        top: -10px;
        right: -10px;
        width: 20px;
      }
    }
    .three {
      margin-right: 0 !important;
    }
    .button {
      text-align: right;
      .el-button {
        width: 180px;
        height: 60px;
        border-radius: 4px;
        border: 1px solid rgba(204, 204, 204, 1);
        font-size: 22px;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        margin: 30px 0;
      }
    }
  }
</style>
