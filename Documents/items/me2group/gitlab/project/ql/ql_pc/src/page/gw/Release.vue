<template>
  <div id="Release">
    <div class="top">
      <div>
        <p>我的发布</p>
      </div>
      <div></div>
    </div>
    <!--v-for="(item,index) in data" :key="index"-->
    <div class="body">
      <!--<p>{{item.time}}</p>-->

      <div
        class="card"
        v-for="(item,index) in data"
        :key="index"
        :class="{three:(index+1)%3==0}"
      >
        <img :src="item.pic" @click="goDetailHandle(item)"/>

        <p>{{item.title}}</p>

        <div>
          <img :src="item.headImage"/>

          <p>{{item.nickName}}</p>
          <img v-if="item.isUp==1" src="../../assets/image/zch/3x.png" @click="zanHandle(item)"/>
          <img v-else src="../../assets/image/gw/25.png" @click="zanHandle(item)"/>

          <p>{{item.upNum}}</p>
        </div>
      </div>
      <!--分页-->
      <div>
        <el-row style="margin-top:20px">
          <el-col :span="9" :offset="14">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :total="pagecount"
            ></el-pagination>
          </el-col>
        </el-row>
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
        data: [
          {
            time: "2019.06.12 12：21",
            data: []
          },
        ]
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
        //我的发布
        this.postingList()
      },
      //我的发布
      postingList: function () {
        var _this = this;
        API.request({
          method: "post",
          url: API.postingList,
          headers: this.headerobj,
          data: API.qs.stringify({id: this.userinfo.id})
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
      handleCurrentChange: function (val) {
        this.pageindex = val;
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
      //数据转换
      exchangeData: function (v) {
        for (var i = 0, arr = v; i < arr.length; i++) {
          arr[i].iszan = arr[i].iszan || false;
        }
        return arr;
      }
    }
  };
</script>
<style lang="less" scoped>
  #Release {
    .top {
      > div:nth-child(1) {
        margin: 30px 0 10px;
        p {
          font-size: 28px;
          font-weight: 500;
          color: rgba(74, 74, 74, 1);
          line-height: 40px;
        }
      }
      > div:nth-child(2) {
        border-bottom: 5px dotted #4a4a4a;
      }
    }
    .body {
      overflow: hidden;

      > p {
        font-size: 28px;
        font-weight: 500;
        color: rgba(74, 74, 74, 1);
        line-height: 40px;
        margin: 20px 0 -10px;
      }
    }
    .card {
      width: 290px;
      height: 410px;
      margin: 30px 40px 0 0;
      float: left;
      > img:nth-of-type(1) {
        width: 290px;
        height: 320px;
        background: rgba(255, 255, 255, 1);
        border-radius: 6px 6px 0px 0px;
      }
      > p {
        font-size: 16px;
        font-weight: 400;
        color: rgba(47, 47, 47, 1);
        line-height: 22px;
        margin: 10px 0 20px 10px;
      }
      > div {
        display: flex;
        align-items: center;
        img:nth-of-type(1) {
          width: 24px;
          height: 24px;
          border-radius: 50%;
        }
        img:nth-of-type(2) {
          margin-left: auto;
          width: 18px;
          height: 15px;
        }
        p:nth-of-type(1) {
          font-size: 14px;
          font-weight: 300;
          color: rgba(130, 130, 130, 1);
          line-height: 20px;
          margin-left: 10px;
        }
        p:nth-of-type(2) {
          font-size: 17px;
          font-weight: 300;
          color: rgba(130, 130, 130, 1);
          margin: 0 20px 0 3px;
          line-height: 25px;
        }
      }
    }
    .three {
      margin-right: 0 !important;
    }
  }
</style>
