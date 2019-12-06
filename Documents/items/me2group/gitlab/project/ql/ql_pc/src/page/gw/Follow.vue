<template>
  <div id="Follow">
    <div class="top">
      <div>
        <p>我的关注</p>
      </div>
      <div></div>
    </div>
    <div class="card">
      <div v-for="(item,index) in data" :key="index">
        <img :src="item.img" />
        <p>{{item.name}}</p>
        <div>
          <p>{{'发布:'+item.release}}</p>
          <p>{{'粉丝:'+item.fans}}</p>
        </div>
        <p>已关注</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          img: require("../../assets/image/gw/goutou.jpg"),
          name: "不爱的的小狐狸",
          release: "100",
          fans: "19万"
        },
        {
          img: require("../../assets/image/gw/goutou.jpg"),
          name: "不爱的的小狐狸",
          release: "100",
          fans: "19万"
        },
        {
          img: require("../../assets/image/gw/goutou.jpg"),
          name: "不爱的的小狐狸",
          release: "100",
          fans: "19万"
        },
        {
          img: require("../../assets/image/gw/goutou.jpg"),
          name: "不爱的的小狐狸",
          release: "100",
          fans: "19万"
        },
        {
          img: require("../../assets/image/gw/goutou.jpg"),
          name: "不爱的的小狐狸",
          release: "100",
          fans: "19万"
        },
        {
          img: require("../../assets/image/gw/goutou.jpg"),
          name: "不爱的的小狐狸",
          release: "100",
          fans: "19万"
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
#Follow {
  .top {
    margin-bottom: 10px;
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
    }
    > div:nth-child(2) {
      border-bottom: 5px dotted #4a4a4a;
    }
  }
  .card > div {
    margin-top: 20px;
    width: 980px;
    height: 145px;
    background: rgba(245, 245, 245, 1);
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    img {
      position: absolute;
      width: 60px;
      height: 60px;
      top: 30px;
      left: 42px;
      border-radius: 50%;
    }
    > p {
      font-size: 28px;
      font-weight: 500;
      color: rgba(74, 74, 74, 1);
      line-height: 40px;
      margin: 30px 0 20px 150px;
    }
    > div {
      display: flex;
      margin-left: 150px;
      p {
        width: 120px;
        font-size: 18px;
        font-weight: 500;
        color: rgba(74, 74, 74, 1);
        line-height: 25px;
      }
    }
    > p:nth-of-type(2) {
      width: 108px;
      height: 40px;
      border-radius: 4px;
      border: 1px solid rgba(230, 230, 230, 1);
      font-size: 22px;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
      line-height: 40px;
      text-align: center;
      margin: 0;
      position: absolute;
      top: 53px;
      right: 45px;
    }
  }
}
</style>