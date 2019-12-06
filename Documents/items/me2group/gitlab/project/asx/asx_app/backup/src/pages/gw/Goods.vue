<template>
  <div>
    <div class="bread">
      <p>
        <span>{{selected[0]}}</span>
        <van-icon name="arrow"></van-icon>
        <span>{{selected[1]}}</span>
      </p>
      <p @click="show=true">
        <span>筛选</span>
        <img src="../../assets/image/gw/42.png" />
      </p>
    </div>
    <div class="suite">
      <div v-for="(value,key) in suite" :key="key" @click="$router.push('/Wares')">
        <img :src="value.src" />
        <p>
          <span>{{'￥'+value.amount}}</span>
          <span>{{'￥'+value.amount_0}}</span>
        </p>
        <p>{{value.title}}</p>
        <div>
          <p>{{'销量:'+value.sala}}</p>
          <p>{{'收藏:'+value.collect}}</p>
        </div>
      </div>
    </div>
    <van-popup v-model="show" position="right">
      <div class="popup">
        <p>商品筛选</p>
        <div v-for="(value,key) in select" :key="key">
          <p>{{value.title}}</p>
          <div
            v-for="(value_0,key_0) in value.data"
            :key="key_0"
            :class="{active:value.checked==key_0}"
            @click="value.checked=key_0"
          >{{value_0}}</div>
        </div>
      </div>
      <div>
        <van-button @click="select[0].checked=0,select[1].checked=0">重置</van-button>
        <van-button
          @click="selected[0]=select[0].data[select[0].checked],selected[1]=select[1].data[select[1].checked],
        show=false"
        >确认</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      suite: [
        {
          src: require("../../assets/image/gw/22.png"),
          amount: "1888.88",
          amount_0: "2888.88",
          title: "不锈钢蒸锅三层多3层蒸馒头的",
          sala: "271",
          collect: "211"
        },
        {
          src: require("../../assets/image/gw/22.png"),
          amount: "1888.88",
          amount_0: "2888.88",
          title: "不锈钢蒸锅三层多3层蒸馒头的大苏打是撒啊的",
          sala: "271",
          collect: "211"
        },
        {
          src: require("../../assets/image/gw/22.png"),
          amount: "1888.88",
          amount_0: "2888.88",
          title: "不锈钢蒸锅三层多3层蒸馒头的",
          sala: "271",
          collect: "211"
        },
        {
          src: require("../../assets/image/gw/22.png"),
          amount: "1888.88",
          amount_0: "2888.88",
          title: "不锈钢蒸锅三层多3层蒸馒头的",
          sala: "271",
          collect: "211"
        },
        {
          src: require("../../assets/image/gw/22.png"),
          amount: "1888.88",
          amount_0: "2888.88",
          title: "不锈钢蒸锅三层多3层蒸馒头的",
          sala: "271",
          collect: "211"
        },
        {
          src: require("../../assets/image/gw/22.png"),
          amount: "1888.88",
          amount_0: "2888.88",
          title: "不锈钢蒸锅三层多3层蒸馒头的",
          sala: "271",
          collect: "211"
        }
      ],
      show: false,
      select: [
        {
          title: "一级分类",
          data: ["选项1", "选项1", "选项1", "选项1", "选项1", "选项1"],
          checked: 0
        },
        {
          title: "二级分类",
          data: ["选项1", "选项1", "选项1", "选项1", "选项1", "选项1"],
          checked: 0
        }
      ],
      selected: []
    };
  },
  mounted() {
    this.selected.push(this.select[0].data[this.select[0].checked]);
    this.selected.push(this.select[1].data[this.select[1].checked]);
    console.log(this.selected);
  }
};
</script>

<style lang="less" scoped>
.bread {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0.3rem 0.3rem;
  font-size: 0.24rem;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  p:nth-child(1) {
    width: 5.8rem;
    border-right: 0.01rem solid #f0f0f0;
  }
  p:nth-child(2) {
    margin-left: auto;
    margin-right: 0.1rem;
  }
  img {
    width: 0.22rem;
    vertical-align: middle;
  }
  .van-icon{
    font-size: .3rem;
    vertical-align:sub;
  }
}
.suite {
  display: flex;
  flex-wrap: wrap;
  padding: 0 0.2rem;
  justify-content: space-between;
}
.suite > div {
  flex-shrink: 0;
  width: 3.45rem;
  height: 4.8rem;
  background: rgba(255, 255, 255, 1);
  border: 0.02rem solid rgba(0, 0, 0, 0.08);
  border-radius: 0.06rem;
  margin-bottom: 0.2rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 3.4rem;
  }
  > p:nth-of-type(1) {
    padding-left: 0.2rem;
    line-height: 0.28rem;
    margin: 0.1rem 0;
    span:nth-child(1) {
      font-size: 0.28rem;
      font-weight: 400;
      color: rgba(224, 18, 32, 1);
    }
    span:nth-child(2) {
      font-size: 0.2rem;
      font-weight: 400;
      text-decoration: line-through;
      color: rgba(102, 102, 102, 1);
    }
  }
  > p:nth-of-type(2) {
    padding: 0 0.2rem;
    font-size: 0.2rem;
    font-weight: 400;
    line-height: 0.2rem;
    color: rgba(51, 51, 51, 1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  > div {
    display: flex;
    padding-top: 0.2rem;
    p {
      padding-left: 0.2rem;
      font-size: 0.2rem;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 0.2rem;
      width: 1rem;
    }
    p:nth-child(2) {
      margin-left: auto;
    }
  }
}
.van-popup {
  height: 100%;
}
.popup {
  width: 5.7rem;
  height: 100%;
  padding-left: 0.3rem;
  > p {
    font-size: 0.3rem;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    padding-top: 0.6rem;
  }
  > div {
    p {
      clear: both;
      font-size: 0.22rem;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 0.22rem;
      padding-top: 0.6rem;
    }
    > div {
      float: left;
      width: 1.66rem;
      height: 0.68rem;
      background: #f0f0f0;
      border-radius: 0.06rem;
      margin: 0.2rem 0.2rem 0 0;
      font-size: 0.24rem;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 0.68rem;
      text-align: center;
      border: 1px solid #f0f0f0;
    }
    .active {
      color: rgba(224, 18, 32, 1);
      background: #fce7e8;
      border: 1px solid rgba(224, 18, 32, 1);
    }
  }
}
.popup + div {
  position: absolute;
  bottom: 0.3rem;
  left: 0.3rem;
  .van-button {
    width: 2.6rem;
    height: 0.68rem;
    background: rgba(51, 51, 51, 1);
    border-radius: 0.34rem;
    border: none;
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 0.68rem;
  }
  .van-button:nth-child(2) {
    background: rgba(224, 18, 32, 1);
  }
}
</style>