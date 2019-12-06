<template>
  <div class="friendSay">
    <div class="top">
      <van-tabs v-model="active" title-active-size=".36rem" :ellipsis="false">
        <van-tab title="推荐">
          <div class="contain">
            <div v-for="(item,index) in data" :key="index" class="box" @click="gotoDetail">
              <p class="title">{{item.title}}</p>
              <p class="context">{{item.context}}</p>
              <div class="imgBox">
                <img
                  v-for="(item1,i) in data[index].img"
                  :key="i"
                  :src="item1"
                  :class="(i+1)%3==0 ?'red':''"
                  alt
                />
              </div>
              <div class="sayBottom">
                <img :src="item.userImg" alt />
                <div class="userName">{{item.userName}}</div>
                <div class="date">发布于{{item.date}}</div>
                <div class="commentNumber" @click.stop="gotohuifu">
                  <img style="width:.28rem" src="../../assets/image/zxw/chatIcon.png" alt />
                  <div style="color:rgba(102,102,102,1);margin-left:.12rem">{{item.number}}</div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="热榜">
          <div class="contain">
            <div v-for="(item,index) in data1" :key="index" class="box" @click="gotoDetail">
              <div class="title">
                <div class="top">TOP{{index+1}}</div>
                <div>{{item.title}}</div>
              </div>
              <p class="context">{{item.context}}</p>
              <div class="imgBox">
                <img
                  v-for="(item1,i) in data1[index].img"
                  :key="i"
                  :src="item1"
                  :class="(i+1)%3==0 ?'red':''"
                  alt
                />
              </div>
              <div class="sayBottom">
                <img :src="item.userImg" alt />
                <div class="userName">{{item.userName}}</div>
                <div class="date">发布于{{item.date}}</div>
                <div class="commentNumber" @click.stop="gotohuifu">
                  <img style="width:.28rem" src="../../assets/image/zxw/chatIcon.png" alt />
                  <div style="color:rgba(102,102,102,1);margin-left:.12rem">{{item.number}}</div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="新闻公告">
          <div class="contain">
            <div v-for="(item,index) in data2" :key="index" class="box" @click="gotoDetail">
              <div class="title">
                {{item.title}}
              </div>
              <p class="context">{{item.context}}</p>
              <div class="imgBox">
                <img
                  v-for="(item1,i) in data2[index].img"
                  :key="i"
                  :src="item1"
                  :class="(i+1)%3==0 ?'red':''"
                  alt
                />
              </div>
              <div class="sayBottom">
                <img :src="item.userImg" alt />
                <div class="userName">{{item.userName}}</div>
                <div class="date">发布于{{item.date}}</div>
                <div class="commentNumber" @click.stop="gotohuifu">
                  <img style="width:.28rem" src="../../assets/image/zxw/chatIcon.png" alt />
                  <div style="color:rgba(102,102,102,1);margin-left:.12rem">{{item.number}}</div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="bottom">
      <div class="tongzhi" @click="$router.push('/atme')">
        <div class="img">
          <img
            style="width:.35rem;height:.4rem;margin-top:.11rem"
            src="../../assets/image/zxw/xiaoxi.png"
            alt
          />
        </div>
        <p>通知</p>
      </div>
      <div class="tongzhi" @click="$router.push('/myTie')">
        <div class="img" dot>
          <img
            style="width:.37rem;height:.36rem;margin-top:.14rem"
            src="../../assets/image/zxw/wode.png"
            alt
          />
        </div>
        <p>我的</p>
      </div>
      <button class="btn" @click="$router.push('/sendTie')" >我要发贴</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      data: [
        {
          title: "这是一个帖子的主题",
          context:
            "这道菜的至关重要的地方就是选料，要选五花三层的肉，有肉皮哦~就是白色的脂肪层要有三层，而红肉部分也要三层。特别是肉皮下的第一层脂肪要厚一些。",
          img: [
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png")
          ],
          userImg: require("../../assets/image/zxw/user.png"),
          userName: "用户昵称",
          date: "20分钟前/7月21日 14:00",
          number: "123"
        },
        {
          title: "这是一个帖子的主题",
          context:
            "这道菜的至关重要的地方就是选料，要选五花三层的肉，有肉皮哦~就是白色的脂肪层要有三层，而红肉部分也要三层。特别是肉皮下的第一层脂肪要厚一些。",
          img: [
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png")
          ],
          userImg: require("../../assets/image/zxw/user.png"),
          userName: "用户昵称",
          date: "20分钟前/7月21日 14:00",
          number: "123"
        },
        {
          title: "这是一个帖子的主题",
          context:
            "这道菜的至关重要的地方就是选料，要选五花三层的肉，有肉皮哦~就是白色的脂肪层要有三层，而红肉部分也要三层。特别是肉皮下的第一层脂肪要厚一些。",
          img: [
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png")
          ],
          userImg: require("../../assets/image/zxw/user.png"),
          userName: "用户昵称",
          date: "20分钟前/7月21日 14:00",
          number: "123"
        }
      ],
      data1: [
        {
          title: "这是一个帖子的主题",
          context:
            "这道菜的至关重要的地方就是选料，要选五花三层的肉，有肉皮哦~就是白色的脂肪层要有三层，而红肉部分也要三层。特别是肉皮下的第一层脂肪要厚一些。",
          img: [
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png")
          ],
          userImg: require("../../assets/image/zxw/user.png"),
          userName: "用户昵称",
          date: "20分钟前/7月21日 14:00",
          number: "123"
        },
        {
          title: "这是一个帖子的主题",
          context:
            "这道菜的至关重要的地方就是选料，要选五花三层的肉，有肉皮哦~就是白色的脂肪层要有三层，而红肉部分也要三层。特别是肉皮下的第一层脂肪要厚一些。",
          img: [
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png")
          ],
          userImg: require("../../assets/image/zxw/user.png"),
          userName: "用户昵称",
          date: "20分钟前/7月21日 14:00",
          number: "123"
        },
        {
          title: "这是一个帖子的主题",
          context:
            "这道菜的至关重要的地方就是选料，要选五花三层的肉，有肉皮哦~就是白色的脂肪层要有三层，而红肉部分也要三层。特别是肉皮下的第一层脂肪要厚一些。",
          img: [
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png")
          ],
          userImg: require("../../assets/image/zxw/user.png"),
          userName: "用户昵称",
          date: "20分钟前/7月21日 14:00",
          number: "123"
        },
        {
          title: "这是一个帖子的主题",
          context:
            "这道菜的至关重要的地方就是选料，要选五花三层的肉，有肉皮哦~就是白色的脂肪层要有三层，而红肉部分也要三层。特别是肉皮下的第一层脂肪要厚一些。",
          img: [
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png")
          ],
          userImg: require("../../assets/image/zxw/user.png"),
          userName: "用户昵称",
          date: "20分钟前/7月21日 14:00",
          number: "123"
        },
        {
          title: "这是一个帖子的主题",
          context:
            "这道菜的至关重要的地方就是选料，要选五花三层的肉，有肉皮哦~就是白色的脂肪层要有三层，而红肉部分也要三层。特别是肉皮下的第一层脂肪要厚一些。",
          img: [
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png")
          ],
          userImg: require("../../assets/image/zxw/user.png"),
          userName: "用户昵称",
          date: "20分钟前/7月21日 14:00",
          number: "123"
        }
      ],
      data2: [
        {
          title: "这是一个帖子的主题",
          context:
            "这道菜的至关重要的地方就是选料，要选五花三层的肉，有肉皮哦~就是白色的脂肪层要有三层，而红肉部分也要三层。特别是肉皮下的第一层脂肪要厚一些。",
          img: [
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png")
          ],
          userImg: require("../../assets/image/zxw/user.png"),
          userName: "用户昵称",
          date: "20分钟前/7月21日 14:00",
          number: "123"
        },
        {
          title: "这是一个帖子的主题",
          context:
            "这道菜的至关重要的地方就是选料，要选五花三层的肉，有肉皮哦~就是白色的脂肪层要有三层，而红肉部分也要三层。特别是肉皮下的第一层脂肪要厚一些。",
          img: [
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png")
          ],
          userImg: require("../../assets/image/zxw/user.png"),
          userName: "用户昵称",
          date: "20分钟前/7月21日 14:00",
          number: "123"
        },
        {
          title: "这是一个帖子的主题",
          context:
            "这道菜的至关重要的地方就是选料，要选五花三层的肉，有肉皮哦~就是白色的脂肪层要有三层，而红肉部分也要三层。特别是肉皮下的第一层脂肪要厚一些。",
          img: [
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png")
          ],
          userImg: require("../../assets/image/zxw/user.png"),
          userName: "用户昵称",
          date: "20分钟前/7月21日 14:00",
          number: "123"
        },
        {
          title: "这是一个帖子的主题",
          context:
            "这道菜的至关重要的地方就是选料，要选五花三层的肉，有肉皮哦~就是白色的脂肪层要有三层，而红肉部分也要三层。特别是肉皮下的第一层脂肪要厚一些。",
          img: [
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png")
          ],
          userImg: require("../../assets/image/zxw/user.png"),
          userName: "用户昵称",
          date: "20分钟前/7月21日 14:00",
          number: "123"
        },
        {
          title: "这是一个帖子的主题",
          context:
            "这道菜的至关重要的地方就是选料，要选五花三层的肉，有肉皮哦~就是白色的脂肪层要有三层，而红肉部分也要三层。特别是肉皮下的第一层脂肪要厚一些。",
          img: [
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png"),
            require("../../assets/image/zxw/shop.png")
          ],
          userImg: require("../../assets/image/zxw/user.png"),
          userName: "用户昵称",
          date: "20分钟前/7月21日 14:00",
          number: "123"
        }
      ]
    };
  },
  methods:{
    gotoDetail(){
      this.$router.push('sayDetail')
    },
    gotohuifu(){
      
      this.$router.push('huifuDetail')
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.van-tabs {
  .van-tabs__nav {
    justify-content: space-around;
    margin-right: 4rem;
    line-height: 0.88rem;
  }
  .van-tab {
    font-size: 0.26rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    width: fit-content;
    min-width: 0.8rem;
    flex: 0;
    line-height: 0.88rem;
  }
  .van-tab:nth-child(3) {
    min-width: 1.5rem;
  }
  .van-tab--active {
    font-size: 0.3rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
  }
  .van-tabs__line {
    background: rgba(224, 18, 32, 0.2);
    height: 0.14rem;
    bottom: 0.5rem;
  }
}
// van-hairline--top-bottom
.contain {
  width: 7.5rem;
  background-color: #fafafa;
}
.box {
  width: 7.5rem;
  background-color: #fff;
  padding: 0.3rem;
  box-sizing: border-box;
  margin-bottom: 0.1rem;
}
.title {
  font-size: 0.28rem;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  display: flex;
  height: 0.3rem;
  align-items: center;
  line-height: 0.3rem;
  .top {
    background: rgba(224, 18, 32, 1);
    border-radius: 0.15rem;
    padding: 0.02rem 0.1rem 0 0.1rem;
    box-sizing: border-box;
    margin-right: 0.16rem;
    font-size: 0.18rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
.context {
  font-size: 0.24rem;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 0.36rem;
  margin-top: 0.16rem;
}
.imgBox {
  margin-top: 0.2rem;
  img {
    width: 2.18rem;
    height: 2.18rem;
    border-radius: 0.04rem;
    margin: 0 0.18rem 0.18rem 0;
  }
  .red {
    margin: 0 0 0.18rem 0;
  }
}
.sayBottom {
  img {
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 0.15rem;
  }
  height: 0.3rem;
  display: flex;
  font-size: 0.22rem;
  align-items: center;
  .userName {
    color: rgba(0, 0, 0, 1);
    margin: 0 0.2rem 0 0.1rem;
  }
  .date {
    color: #b3b3b3;
  }
  .commentNumber {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
}
.bottom {
  width: 7.5rem;
  height: 0.9rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px -0.01rem 0px 0px rgba(240, 240, 240, 1);
  position: fixed;
  bottom: 0;
  padding: 0 0.3rem;
  box-sizing: border-box;
  display: flex;
  .tongzhi {
    width: 1rem;
    height: 0.9rem;
    text-align: center;
    margin-right: 0.2rem;
    .img{
      height: .6rem;
    }
    p {
      font-size: 0.18rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 0.24rem;
    }
  }
  .btn {
    width: 4rem;
    height: 0.7rem;
    background: rgba(224, 18, 32, 1);
    border-radius: 0.35rem;
    margin-top: 0.1rem;
    font-size: 0.28rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    border: none;
    margin-left: auto;
  }
}
</style>