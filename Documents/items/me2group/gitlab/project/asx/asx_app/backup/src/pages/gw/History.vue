<template>
  <div id="History">
    <div style="height:0.4rem"></div>
    <div class="block" v-for="(value,key) in data" :key="key">
      <div class="left">
        <div class="spot">
          <div></div>
          <div></div>
        </div>
        <div v-if="key%2==1">
          <img src="../../assets/image/gw/31.png" class="triangle" />
          <div class="body">
            <div></div>
            <p>{{value.p}}</p>
          </div>
        </div>
        <div v-else :class="['time',{red:key==0}]">{{value.time}}</div>
      </div>
      <div class="right">
        <div v-if="key%2==0">
          <img src="../../assets/image/gw/30.png" class="triangle" />
          <div class="body">
            <div></div>
            <p>{{value.p}}</p>
          </div>
        </div>
        <div v-else class="time">{{value.time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data:function() {
    return {
      data: [
        {
          time: "2011年",
          p: "2月 IH电磁炉专用、多孔质铝铸调理器、手掌大小的「Double PAN」"
        },
        {
          time: "2011年",
          p:
            "2月 IH电磁炉大撒大撒大撒大撒大撒服务规范归属感放大岁的法国后来发生的警告积分专用、多孔质铝铸调理器、手掌大小的「Double PAN」"
        },
        {
          time: "2011年",
          p: "2月 IH电磁炉专用、多孔质铝铸调理器、手掌大小的「Double PAN」"
        },
        {
          time: "2011年",
          p: "2月 IH电磁炉专用、多孔质铝铸调理器、手掌大小的「Double PAN」"
        },
        {
          time: "2011年",
          p: "2月 IH电磁炉专用、多孔质铝铸调理器、手掌大小的「Double PAN」"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
#History {
  padding: 0.1rem 0.3rem 0;
  .block {
    display: flex;
    position: relative;
    .left,
    .right {
      flex-shrink: 0;
      width: calc(50% - 0.01rem);
    }
    .left {
      border-right: 0.01rem solid red;
    }
    .right {
      border-left: 0.01rem solid red;
    }
  }
  .left {
    .spot {
      position: absolute;
      width: 0.44rem;
      height: 0.44rem;
      left: 50%;
      top: -0.22rem;
      transform: translateX(-50%);
      div:nth-child(1) {
        width: 0.44rem;
        height: 0.44rem;
        background: rgba(224, 18, 32, 1);
        opacity: 0.5;
        border-radius: 50%;
      }
      div:nth-child(2) {
        position: absolute;
        width: 0.16rem;
        height: 0.16rem;
        background: rgba(224, 18, 32, 1);
        border-radius: 50%;
        top: 0.14rem;
        left: 0.14rem;
      }
    }
    .triangle {
      height: 0.35rem;
      position: absolute;
      left: calc(50% - 0.46rem);
      top: -0.18rem;
    }
    .body {
      width: calc(100% - 0.4rem);
      height: 100%;
      background: #fff;
      box-shadow: 0rem 0.01rem 0.04rem 0rem rgba(0, 0, 0, 0.09);
      border-radius: 0.1rem;
      position: relative;
      top: -0.4rem;
      box-sizing: border-box;
      padding: 0.2rem;
      div {
        width: 0;
        height: 0;
        position: absolute;
        right: -0.14rem;
        top: 0.19rem;
        border-top: 0.2rem solid transparent;
        border-left: 0.2rem solid #fff;
        border-bottom: 0.18rem solid transparent;
      }
      p {
        font-size: 0.24rem;
        font-family: PingFang SC;
        font-weight: 300;
        color: rgba(0, 0, 0, 1);
        line-height: 0.36rem;
      }
    }
    .time {
      font-size: 0.44rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: #000000;
      line-height: 0.36rem;
      position: absolute;
      top: -0.2rem;
      left: 1.4rem;
    }
  }
  .right {
    .triangle {
      height: 0.35rem;
      position: absolute;
      left: calc(50% + 0.2rem);
      top: -0.18rem;
    }
    .body {
      width: calc(100% - 0.4rem);
      height: 100%;
      background: #fff;
      box-shadow: 0rem 0.01rem 0.04rem 0rem rgba(0, 0, 0, 0.09);
      border-radius: 0.1rem;
      position: relative;
      top: -0.4rem;
      left: 0.4rem;
      box-sizing: border-box;
      padding: 0.2rem;
      div {
        width: 0;
        height: 0;
        position: absolute;
        left: -0.14rem;
        top: 0.19rem;
        border-top: 0.2rem solid transparent;
        border-right: 0.2rem solid #fff;
        border-bottom: 0.18rem solid transparent;
      }
      p {
        font-size: 0.24rem;
        font-family: PingFang SC;
        font-weight: 300;
        color: rgba(0, 0, 0, 1);
        line-height: 0.36rem;
      }
    }
    .time {
      font-size: 0.44rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: #000000;
      line-height: 0.36rem;
      position: absolute;
      top: -0.2rem;
      left: 3.6rem;
    }
  }
  .red {
    color: red !important;
  }
}
</style>
