<template>
  <div>
    <div class="background"></div>
    <div class="icon">
      <div>
        <img src="../../assets/image/gw/32.png" />
        <p>{{address}}</p>
      </div>
      <div>
        <img src="../../assets/image/gw/33.png" />
        <p>{{number_0}}</p>
      </div>
      <div>
        <img src="../../assets/image/gw/34.png" />
        <p>{{number_1}}</p>
      </div>
    </div>
    <baidu-map class="map" center="北京"></baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      address: "江苏省苏州市吴江区云创路512号商会大厦1206室",
      number_0: "400-828-8385",
      number_1: "0512-63055995"
    };
  }
};
</script>

<style lang="less" scoped>
.background {
  position: absolute;
  height: 3rem;
  background: black;
  top: 0;
  width: 100%;
  opacity: 0.8;
  z-index: 9;
}
.icon {
  position: absolute;
  z-index: 9;
  width: 100%;
  top:1.2rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  div {
    img {
      display: block;
      margin: auto;
      height: 0.54rem;
      margin-bottom: 0.25rem;
    }
    p {
      text-align: center;
      width: 2rem;
      font-size: 0.18rem;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 0.3rem;
    }
  }
}
.map {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
}
</style>