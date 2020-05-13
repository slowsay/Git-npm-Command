<template>
  <div class="classify">
    <div class="top">
      <van-col span="2">
        <div style="font-size:.45rem">
          <van-icon
            @click="$router.go(-1)"
            name="arrow-left"
            style="font-size:.45rem;margin-top:.08rem"
          ></van-icon>
        </div>
      </van-col>
      <van-col span="20">
        <p class="nav">目的地选择</p>
      </van-col>
    </div>
    <div class="contain">
      <div>
        <div v-for="(item,index) in placeData" :key="index" class="selectPlace" @click="selectPlace(index)">
          <p :class="changeWhite == index? 'white':'' ">{{item.continentName}} </p>

          <div v-if="changeWhite!=index" class="icon">
            <van-icon name="arrow" v-if="index>0"></van-icon>
          </div>
          <div v-else-if="changeWhite==index" class="icon">
            <van-icon name="arrow-down" v-if="index>0"></van-icon>
          </div>
          <div :class="changeWhite == index ? 'show':'notshow'">
            <div
              v-for="(item1,index1) in placeData[index].countryBox"
              :key="index1"
              :class="changeBlue == index1 ? 'blue' : 'country'"
              @click.stop="selectCountry(index1)"
            >
              {{item1.countryName}}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div v-for="(item,index) in data" :key="index" class="box" @click="gotoDetail(item)">
          <img :src="item.destinationImage"/>

          <div class="text">
            <p class="qiandian">潜点 ({{item.diveCount}})</p>

            <p class="place">{{item.destinationName}}</p>
          </div>
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
        userinfo: {token: 'qwtoken', id: ''},
        changeWhite: 0,
        changeBlue: 0,
        data: [],
        placeData: [],
        countryBox: []
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
        var _this = this;
        //热门潜点
        this.data = JSON.parse(localStorage.getItem("swiperData"));
        this.getContinetData();
      },
      //洲列表
      getContinetData: function () {
        var _this = this;

        API.request({
          url: API.selectAllContinent,
          method: 'post',
          headers: {token: this.userinfo.token, userId: this.userinfo.id}
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.placeData = [{
                continentName: "热门目的地"
              }].concat(e.data.data);
              _this.getPlaceData(e.data.data, 0);
            }
            else {
              API.dialog({message: API.msg.ERROR})
            }
          }
        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
      },
      getPlaceData: function (data, i) {
        var _this = this;
        if (i < data.length - 1) {
          //调用-根据对应的洲查询对应的国家-接口
          API.request({
            url: API.selectCountryByCon,
            method: 'post',
            headers: {
              token: this.userinfo.token,
              userId: this.userinfo.id
            },
            data: API.qs.stringify({
              continetId: data[i].continentId
            })
          }).then(function (e) {
            if (e.data.code == 200) {
              if (e.data.success) {
                var arr = _this.placeData;
                arr[i + 1].countryBox = e.data.data;
                _this.countryBox = e.data.data;
                _this.placeData = arr;
                i++;
                _this.getPlaceData(data, i);
              }
            }
          }).catch(function (e) {
            API.dialog({message: JSON.stringify(e)});
          })
        }
        else {

        }
      },
      //进入目的地详细页面
      gotoDetail: function (row) {
        this.$router.push({
          path: "/placeDetail",
          query: {place: this.changeWhite, country: this.changeBlue, id: row.destinationId}
        });
      },
      //切换洲
      selectPlace: function (index) {
        if (this.changeWhite != index) {
          this.changeWhite = index;
          this.changeBlue = -1;
        }
        else if (this.changeWhite == index) {
          this.changeWhite = -1;
        }
        //切换热门潜点数据
        if (index == 0) {
          this.changeBlue = 0;
          this.data = JSON.parse(localStorage.getItem("swiperData"));
        }
      },
      //切换国家
      selectCountry: function (index) {
        var _this = this;
        //调用
        API.request({
          url: API.selectDestinationByCountryId,
          method: 'post',
          headers: {
            token: this.userinfo.token,
            userId: this.userinfo.id
          },
          data: API.qs.stringify({
            countryId: this.placeData[this.changeWhite].countryBox[index].countryId
          })
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              _this.data = e.data.data;
            }
          }
        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
        this.changeBlue = index;

      },
      //转换路径
      getURlImage: function (v) {
        for (var i = 0, arr = v; i < arr.length; i++) {
          arr[i].destinationImage = API.url + arr[i].destinationImage;
        }
        return arr;
      }
    }
  };
</script>
<style lang="less" scoped>
  .classify {
    width: 7.5rem;
    .top {
      width: 7.5rem;
      padding: 0.3rem;
      box-sizing: border-box;
      height: 1.2rem;
      line-height: 0.6rem;
      position: fixed;
      z-index: 2000;
      background-color: #fff;
      .nav {
        font-size: 0.32rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        text-align: center;
      }
    }
    .contain {
      width: 7.5rem;
      position: absolute;
      margin-top: 1.2rem;
      padding-bottom: 0.2rem;
      display: flex;
      > div:nth-child(1) {
        position: fixed;
        z-index: 2000;
        width: 2rem;
        margin-right: 0.3rem;
        .selectPlace {
          background-color: #f5f5f5;
          font-size: 0.28rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          p {
            height: 1rem;
            width: 1.8rem;
            padding-right: 0.2rem;
            line-height: 1rem;
            text-align: center;
          }
        }
        .country {
          width: 1.8rem;
          padding-right: 0.2rem;
          height: 0.6rem;
          background: rgba(255, 255, 255, 1);
          text-align: center;
          line-height: 0.6rem;
        }
      }
      > div:nth-child(2) {
        // border: 0.01rem solid red;
        margin-left: 2.3rem;
        width: 4.9rem;
        .box {
          margin-top: 0.2rem;
          width: 4.9rem;
          height: 2.2rem;
          img {
            width: 4.9rem;
            height: 2.2rem;
            position: absolute;
            z-index: 1;
          }
          .text {
            width: 4.9rem;
            height: 2.2rem;
            position: absolute;
            z-index: 999;
            .qiandian {
              margin: 0.1rem 0.3rem;
              text-align: right;
              font-size: 0.18rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 0.25rem;
              z-index: 10;
            }
            .place {
              font-size: 0.32rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 0.45rem;
              text-align: center;
              margin-top: 0.63rem;
              z-index: 10;
            }
          }
        }
      }
    }
    .white {
      background-color: #fff;
      width: 2rem;
      height: 0.6rem;
      background: rgba(255, 255, 255, 1);
      text-align: center;
      line-height: 0.6rem;
    }
    .blue {
      color: #52bdf2;
      display: block;
      width: 1.8rem;
      padding-right: 0.2rem;
      height: 0.6rem;
      background: rgba(255, 255, 255, 1);
      text-align: center;
      line-height: 0.6rem;
    }
    .show {
      display: block;
    }
    .notshow {
      display: none;
    }
    .icon {
      float: left;
      margin-top: -.65rem;
      margin-left: 1.6rem;
    }
  }
</style>
