<template>
  <div class="address">
    <navbar></navbar>
    <div class="contain">
      <van-radio-group v-model="changeShow">
        <div v-for="(item,index) in formList" :key="index" class="box">
          <div class="boxTop">
            <div>
              <div>{{item.username}}&nbsp;&nbsp;{{item.phone}}</div>&nbsp;
              <div class="moren" :class="{isShow:changeShow == index}" >默认</div>
            </div>
            <p class="sendAddress">{{item.address}}</p>
          </div>
          <div class="boxBottom">
            <van-radio icon-size=".28rem" @click="isShow(index)" checked-color="#E01523" :name="index">设为默认地址</van-radio>
            <div class="boxright">
              <div @click="$router.push('/addressDetail')">
                <div>
                  <img class="edit" src="../../assets/image/zxw/fenxiang.png" alt />
                </div>
                <div>编辑</div>
              </div>
              <div>
                <div>
                  <img class="del" src="../../assets/image/zxw/shanchu.png" alt />
                </div>
                <div>删除</div>
              </div>
            </div>
          </div>
        </div>
      </van-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      changeShow:0,
      formList: [
        {
          username: "严智敏",
          phone: "18865421542",
          address: "浙江省杭州市拱墅区北城天地9幢1701"
        },
        {
          username: "严智敏",
          phone: "18865421542",
          address: "浙江省杭州市拱墅区北城天地9幢1701"
        },
        {
          username: "严智敏",
          phone: "18865421542",
          address: "浙江省杭州市拱墅区北城天地9幢1701"
        },
        {
          username: "严智敏",
          phone: "18865421542",
          address: "浙江省杭州市拱墅区北城天地9幢1701"
        }
      ]
    };
  },
  methods:{
    isShow(index){
      this.changeShow = index;
    }
  }
};
</script>

<style lang="less" scoped>
.address {
  width: 7.5rem;
  top: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  background-color: #f5f5f5;
  .contain {
    width: 7.5rem;
    background-color: #f5f5f5;
    .box {
      background-color: #fff;
      width: 7.5rem;
      padding: 0.3rem;
      box-sizing: border-box;
      margin-bottom: .2rem;
      .boxTop {
        
        > div:nth-child(1) {
          display: flex;
          font-size: 0.28rem;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 0.3rem;
          color: rgba(51, 51, 51, 1);
          height: .32rem;
          .moren {
            display: none;
          }
          .isShow{
            display: block;
             width: 0.56rem;
            height: 0.3rem;
            background: rgba(229, 72, 17, 0.1);
            border: 1px solid rgba(229, 72, 17, 0.26);
            border-radius: 0.04rem;
            font-size: 0.18rem;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 0.3rem;
            text-align: center;
            color: rgba(229, 72, 17, 1);
          }
        }
        .sendAddress {
          font-size: 0.24rem;
          margin: 0.2rem 0 0.3rem 0;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
      }
      .boxBottom {
        font-size: 0.24rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 0.3rem;
        display: flex;
        justify-content: space-between;
        padding-top: 0.3rem;
        border-top: 0.01rem solid #f0f0f0;
        align-items: center;
        .boxright {
          display: flex;
          > div:nth-child(1) {
            margin-right: 0.4rem;
            display: flex;
            .edit {
              width: 0.28rem;
              margin-right: 0.1rem;
            }
          }
          > div:nth-child(2) {
            display: flex;
            .del {
              width: 0.28rem;
              margin-right: 0.1rem;
            }
          }
        }
      }
    }
  }
}
</style>