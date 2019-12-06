<template>
  <div id="Address">
    <div class="top">
      <div>
        <p>收货地址</p>
      </div>
      <div></div>
    </div>
    <div class="input">
      <div>
        <p>
          <span>*</span>
          <span>地址信息:</span>
        </p>
        <Address :level="4" @location="location"></Address>
      </div>
      <div>
        <p>
          <span>*</span>
          <span>详细地址:</span>
        </p>
        <el-input
          type="textarea"
          resize="none"
          v-model="input_1"
          placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等信"
        ></el-input>
      </div>
      <div>
        <p>
          <span>*</span>
          <span>邮政编码:</span>
        </p>
        <el-input v-model="input_2" placeholder="请填写邮编"></el-input>
      </div>
      <div>
        <p>
          <span>*</span>
          <span>收货人姓名:</span>
        </p>
        <el-input v-model="input_3" placeholder="长度不超过25个字符"></el-input>
      </div>
      <div>
        <p>
          <span>*</span>
          <span>手机号码:</span>
        </p>
        <el-input v-model="input_4" placeholder="电话号码、手机号码必须填一项"></el-input>
      </div>
    </div>
    <el-checkbox v-model="checked">设置未默认收货地址</el-checkbox>
    <el-button>保存地址</el-button>
    <p>
      <img src="../../assets/image/gw/29.png" />
      <span>{{'已经保存了'+number_0+'3条,最多保存'+number_1+'条'}}</span>
    </p>
    <div class="tab">
      <div>
        <div>收件人</div>
        <div>所在地区</div>
        <div>详细地址</div>
        <div>邮编</div>
        <div>电话手机</div>
        <div>操作</div>
        <div></div>
      </div>
      <div v-for="(item,index) in data" :key="index">
        <div>{{item.name}}</div>
        <div>{{item.region}}</div>
        <div>{{item.address}}</div>
        <div>{{item.cope}}</div>
        <div>{{item.number}}</div>
        <div>
          <span>修改</span>
          <span>&nbsp;|&nbsp;</span>
          <span>删除</span>
        </div>
        <div>
          <el-button v-if="item.state==1">默认地址</el-button>
          <el-button v-else class="set">设为默认地址</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Address from "../../components/Address/index";
export default {
  components: {
    Address
  },
  data() {
    return {
      input_0: "",
      input_1: "",
      input_2: "",
      input_3: "",
      input_4: "",
      checked: false,
      number_0: 3,
      number_1: 10,
      data: [
        {
          name: "张三峰",
          region: "浙江省 杭州市 拱墅区 祥符街道",
          address: "北城天地9幢1701",
          cope: "310000",
          number: "86-182****9281",
          state: 0 //0非默认地址 1默认地址
        },
        {
          name: "张三峰",
          region: "浙江省 杭州市 拱墅区 祥符街道",
          address: "北城天地9幢1701",
          cope: "310000",
          number: "86-182****9281",
          state: 1 //0非默认地址 1默认地址
        }
      ]
    };
  },
  methods: {
    location(res) {
      console.log(res);
      this.input_0 = res;
    }
  }
};
</script>
<style lang="less" scoped>
#Address {
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
  .input {
    margin-top: 20px;
    > div {
      height: 50px;
      display: flex;
      align-items: center;
      /deep/input {
        width: 416px;
        height: 30px;
        font-size: 12px;
        font-weight: 400;
        line-height: 30px;
      }
    }
    p {
      padding-left: 10px;
      width: 125px;
      flex-shrink: 0;
      span:nth-child(1) {
        font-size: 12px;
        font-weight: 400;
        color: rgba(255, 0, 0, 1);
        line-height: 17px;
      }
      span:nth-child(2) {
        font-size: 18px;
        font-weight: 400;
        color: rgba(155, 155, 155, 1);
        line-height: 25px;
      }
    }
    > div:nth-child(2) {
      height: 68px;
      /deep/textarea {
        width: 416px;
        height: 48px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(155, 155, 155, 1);
        line-height: 20px;
      }
    }
  }
  #picker {
    /deep/.picker-show {
      height: 30px;
      line-height: 30px;
      width: 400px;
      font-size: 12px;
      span {
        margin-top: 3px;
      }
    }
  }
  .el-checkbox {
    margin: 10px 0 30px 135px;
    font-size: 12px;
    .el-checkbox__label {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 17px;
    }
  }
  > .el-button {
    display: block;
    width: 88px;
    height: 30px;
    background: rgba(255, 148, 148, 1);
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    border: none;
    padding: 0;
    line-height: 30px;
    margin-left: 135px;
  }
  > p {
    width: 100%;
    height: 40px;
    background: rgba(230, 230, 230, 1);
    border-radius: 4px;
    line-height: 40px;
    margin: 30px 0;
    img {
      width: 12px;
      height: 12px;
      margin: 0 10px 0 30px;
      vertical-align: middle;
    }
    span {
      font-size: 14px;
      font-weight: 400;
      color: rgba(74, 74, 74, 1);
      line-height: 14px;
      vertical-align: middle;
    }
  }
  .tab {
    width: 980px;
    border-radius: 10px;
    box-sizing: border-box;
    background: rgba(245, 245, 245, 1);
    padding: 1px;
    border: 4px solid rgba(245, 245, 245, 1);
    font-size: 14px;
    font-weight: 400;
    color: rgba(74, 74, 74, 1);
    line-height: 20px;
    > div {
      display: flex;
      background: #fff;
      > div {
        padding: 20px;
        border-left: 2px solid #e6e6e6;
        border-bottom: 2px solid #e6e6e6;
        display: flex;
        align-items: center;
      }
      > div:nth-child(1) {
        border-left: none;
        width: 90px;
      }
      > div:nth-child(2) {
        width: 190px;
      }
      > div:nth-child(3) {
        width: 190px;
      }
      > div:nth-child(4) {
        width: 90px;
      }
      > div:nth-child(5) {
        width: 160px;
      }
      > div:nth-child(6) {
        width: 120px;
      }
      > div:nth-last-child(1) {
        width: 170px;
        .el-button {
          padding: 10px 0;
          height: 40px;
          background: rgba(255, 148, 148, 1);
          border-radius: 4px;
          width: 100px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          border: none;
        }
        .set {
          color: rgba(74, 74, 74, 1);
          background: transparent;
        }
      }
    }
    > div:nth-child(1) {
      background: #f5f5f5;
      > div {
        padding: 10px 20px;
        border-bottom: none;
      }
    }
    > div:nth-last-child(1) {
      > div {
        border-bottom: none;
      }
    }
  }
}
</style>