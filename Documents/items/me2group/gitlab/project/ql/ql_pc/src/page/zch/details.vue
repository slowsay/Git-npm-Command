<template>
  <div class="base">
    <div class="details">
      <div class="lefts">
        <!-- 左边 图片 -->
        <div class="image">
          <img :src="content.sp" class="sp" alt />
          <img :src="content.play" alt class="play" />
        </div>
        <!-- 收藏分享 -->
        <div class="spon">
          <p class="name">{{content.name}}</p>
          <div class="btn">
            <p v-if="state==false" @click="saveBtn">收藏</p>
             <p v-else-if="state==true" style="background:#D9D9D9" @click="saveBtn">已收藏</p>
            <p>分享</p>
          </div>
        </div>
        <!-- 发布时间 -->
        <div class="time" v-for="(item,i) of time" :key="i">
          <p class="day">发布时间：{{item.day}}</p>
          <div class="cyc">
            <div class="right" v-for="(ite,index) of right" :key="index" @click="save(index)">
              <img :src="ite.no" alt />
              <p>{{ite.num}}</p>
            </div>
          </div>
        </div>
        <!-- 发表评论 -->
        <div class="cric">
          <div class="poto">
            <img src="../../assets/image/zch/details/sp.png" alt />
          </div>
          <div class="inputbox">
            <input type="text" v-if="vip<2" :disabled="true" placeholder="您的等级不足LV2，需升级至LV2" />
            <input type="text" v-if="vip>=2" v-model="inputComment"  placeholder="请输入你要发表的内容" />
            <img src="../../assets/image/zch/details/bq.png" alt />
          </div>
          <p class="btn" @click="comment">发表评论</p>
        </div>
        <!-- 帖子展示 -->
        <div class="post_show">
          <p class="title">帖子评论</p>
          <div class="black">
            <div class="borders">
              <div class="post" v-for="(items,i) of post_show" :key="i">
                <div class="top">
                  <div class="left">
                    <div class="images">
                      <img :src="items.sp" alt />
                    </div>
                    <div class="time_out">
                      <h4 class="name">{{items.name}}</h4>
                      <p class="times">{{items.times}}</p>
                    </div>
                  </div>
                  <div class="right" @click="swipers(items)">
                    <img :src="items.dz" alt class="dz" v-show="!items.show" />
                    <img :src="items.dzx" alt class="dz" v-show="items.show" />
                    <p class="number">{{items.number}}</p>
                  </div>
                </div>
                <div class="text">
                  <p>{{items.wz}}</p>
                  <div class="back">
                    <div class="round" v-for="(item,j) of items.tow" :key="j">
                      <div class="top">
                        <div class="left">
                          <div class="images">
                            <img :src="item.sp" alt />
                          </div>
                          <div class="time_out">
                            <h4 class="name">{{item.name}}</h4>
                            <p class="times">{{item.times}}</p>
                          </div>
                        </div>
                        <div class="right" @click="swipers(item)">
                          <img :src="item.dz" alt class="dz" v-show="!item.show" />
                          <img :src="item.dzx" alt class="dz" v-show="item.show" />
                          <p class="number">{{item.number}}</p>
                        </div>
                      </div>
                      <div class="text">
                        <p>回复</p>
                        <p>{{item.reply}}</p>
                        <p>{{item.wz}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="limit">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="100"
                layout="prev, pager, next, jumper"
                :total="1000"
              ></el-pagination>
            </div>
            <div class="cric">
              <div class="poto">
                <img src="../../assets/image/zch/details/sp.png" alt />
              </div>
              <div class="inputbox">
                <input type="text" />
                <img src="../../assets/image/zch/details/bq.png" alt />
              </div>
              <p class="btn">发表评论</p>
            </div>
          </div>
        </div>
      </div>
      <div class="rights">
        <div class="floor">
          <p class="title">楼主详情</p>
          <div class="mess">
            <div class="image">
              <img :src="mess.sp" alt />
            </div>
            <div class="wz">
              <p class="name">{{mess.name}}</p>
              <p class="grade">{{mess.grade}}</p>
              <div class="focus" v-if="mess.guanzhu==false" @click="guanzhu">
                <img src="../../assets/image/zch/details/jia.png" alt />
                <p>关注</p>
              </div>
              <div style="background-color:#9b9b9b" class="focus" v-if="mess.guanzhu==true" @click="guanzhu">
                <p>已关注</p>
              </div>
            </div>
          </div>
          <div class="buttom">
            <div class="trol" v-for="(item,i) of mess.trol" :key="i">
              <p class="text">{{item.text}}</p>
              <p class="num">{{item.num}}</p>
            </div>
          </div>
        </div>
        <div class="letter">
          <p class="title">相关推荐</p>
          <div class="content">
            <div class="tent" v-for="(item,index) of tent" :key="index">
              <div class="image">
                <img :src="item.sp" alt />
              </div>
              <div class="wz">
                <p class="titles">{{item.titles}}</p>
                <div class="dz" @click="likes(index)">
                  <img v-if="item.state==0" :src="item.yes" alt />
                  <img v-else-if="item.state==1" :src="item.no" alt />
                  <p class="num">{{item.num}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="btn">
            <p @click="open">查看更多</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      vip:2,
      currentPage: null,
      inputComment:'',
       state:false,
      // 蛋挞做视频
      content: {
        sp: require("../../assets/image/zch/details/sp.png"),
        play: require("../../assets/image/zch/details/play.png"),
        name: "蛋挞做法",
       
      },
      // 时间
      time: [
        {
          day: "07-23",
         
        }
      ],
       right: [
            {
              no: require("../../assets/image/zch/details/3x.png"),
              num: 889
            },
            {
              no: require("../../assets/image/zch/details/mes.png"),
              num: 889
            },
            {
              no: require("../../assets/image/zch/details/start.png"),
              num: 889
            }
          ],
      // 帖子评论
      post_show: [
        {
          sp: require("../../assets/image/zch/details/sp.png"),
          name: "张三丰",
          times: "2019-07-30",
          show: false,
          dz: require("../../assets/image/zch/details/dz.png"),
          dzx: require("../../assets/image/zch/details/dzx.png"),
          number: 98988,
          wz: "要是是我做，估计是边做边吃哈哈哈哈。",
          tow: [
            {
              sp: require("../../assets/image/zch/details/sp.png"),
              name: "张三丰",
              times: "2019-07-30",
              show: false,
              dz: require("../../assets/image/zch/details/dz.png"),
              dzx: require("../../assets/image/zch/details/dzx.png"),
              number: 98988,
              reply: "222",
              wz: "哈哈哈"
            },
            {
              sp: require("../../assets/image/zch/details/sp.png"),
              name: "张三丰",
              times: "2019-07-30",
              show: false,
              dz: require("../../assets/image/zch/details/dz.png"),
              dzx: require("../../assets/image/zch/details/dzx.png"),
              number: 98988,
              reply: "222",
              wz: "哈哈哈"
            }
          ]
        },
        {
          sp: require("../../assets/image/zch/details/sp.png"),
          name: "张三丰",
          times: "2019-07-30",
          show: false,
          dz: require("../../assets/image/zch/details/dz.png"),
          dzx: require("../../assets/image/zch/details/dzx.png"),
          number: 98988,
          wz: "要是是我做，估计是边做边吃哈哈哈哈。",
          tow: [
            {
              sp: require("../../assets/image/zch/details/sp.png"),
              name: "张三丰",
              times: "2019-07-30",
              show: false,
              dz: require("../../assets/image/zch/details/dz.png"),
              dzx: require("../../assets/image/zch/details/dzx.png"),
              number: 98988,
              reply: "222",
              wz: "哈哈哈"
            },
            {
              sp: require("../../assets/image/zch/details/sp.png"),
              name: "张三丰",
              times: "2019-07-30",
              show: false,
              dz: require("../../assets/image/zch/details/dz.png"),
              dzx: require("../../assets/image/zch/details/dzx.png"),
              number: 98988,
              reply: "222",
              wz: "哈哈哈"
            }
          ]
        },
        {
          sp: require("../../assets/image/zch/details/sp.png"),
          name: "张三丰",
          times: "2019-07-30",
          show: false,
          dz: require("../../assets/image/zch/details/dz.png"),
          dzx: require("../../assets/image/zch/details/dzx.png"),
          number: 98988,
          wz: "要是是我做，估计是边做边吃哈哈哈哈。",
          tow: [
            {
              sp: require("../../assets/image/zch/details/sp.png"),
              name: "张三丰",
              times: "2019-07-30",
              show: false,
              dz: require("../../assets/image/zch/details/dz.png"),
              dzx: require("../../assets/image/zch/details/dzx.png"),
              number: 98988,
              reply: "222",
              wz: "哈哈哈"
            },
            {
              sp: require("../../assets/image/zch/details/sp.png"),
              name: "张三丰",
              times: "2019-07-30",
              show: false,
              dz: require("../../assets/image/zch/details/dz.png"),
              dzx: require("../../assets/image/zch/details/dzx.png"),
              number: 98988,
              reply: "222",
              wz: "哈哈哈"
            }
          ]
        }
      ],
      mess: {
        sp: require("../../assets/image/zch/details/sp.png"),
        name: "不会飞的发福蝶",
        grade: "12级",
        jia: require("../../assets/image/zch/details/jia.png"),
        guanzhu:false,
       
        trol: [
          {
            text: "发布",
            num: 68
          },
          {
            text: "收藏",
            num: 68
          },
          {
            text: "赞过",
            num: 68
          }
        ]
      },
      tent: [
        {
          sp: require("../../assets/image/zch/details/sp.png"),
          titles: "每日穿搭不重样，小清新穿搭",
          no: require("../../assets/image/zch/details/3x.png"),
          yes: require("../../assets/image/zch/details/x.png"),
          num: 886,
          state:1

        },
        {
          sp: require("../../assets/image/zch/details/sp.png"),
          titles: "每日穿搭不重样，小清新穿搭",
          no: require("../../assets/image/zch/details/3x.png"),
          yes: require("../../assets/image/zch/details/x.png"),
          num: 886,
          state:0
        },
        {
          sp: require("../../assets/image/zch/details/sp.png"),
          titles: "每日穿搭不重样，小清新穿搭",
          no: require("../../assets/image/zch/details/3x.png"),
          yes: require("../../assets/image/zch/details/x.png"),
          num: 886,
          state:1
        },
        {
          sp: require("../../assets/image/zch/details/sp.png"),
          titles: "每日穿搭不重样，小清新穿搭",
          no: require("../../assets/image/zch/details/3x.png"),
          yes: require("../../assets/image/zch/details/x.png"),
          num: 886,
          state:1
        },
        {
          sp: require("../../assets/image/zch/details/sp.png"),
          titles: "每日穿搭不重样，小清新穿搭",
          no: require("../../assets/image/zch/details/3x.png"),
          yes: require("../../assets/image/zch/details/x.png"),
          num: 886,
          state:1
        },
        {
          sp: require("../../assets/image/zch/details/sp.png"),
          titles: "每日穿搭不重样，小清新穿搭",
          no: require("../../assets/image/zch/details/3x.png"),
          yes: require("../../assets/image/zch/details/x.png"),
          num: 886,
          state:1
        }
      ]
    };
  },
  methods: {
    swipers(items) {
      if (items.show == false) {
        items.show = true;
      } else {
        items.show = false;
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    open() {},
    //zxw点击发表评论时
    comment(){
      if(this.vip>=2){
        if(this.inputComment==''){
          this.$message.error('请输入评论内容');
        }
        else{
           this.$message('评论成功');
           this.right[1].num ++;
        }
       
      } else{
          this.$message({message:'请将等级升级到vip2才能评论',type:'warning'});
         
      }
    },
    save(index){
      //点击我喜欢
      if(index==0){
        if(this.right[0].no==require('../../assets/image/zch/details/3x.png')){
           this.right[index].no=require('../../assets/image/zch/details/x.png');
          this.right[index].num=this.right[index].num+1;
          this.$message('已添加到我喜欢');
        }
         else if(this.right[0].no==require('../../assets/image/zch/details/x.png')){
        this.right[index].no=require('../../assets/image/zch/details/3x.png');
        this.right[index].num=this.right[index].num-1;
         this.$message('已取消我喜欢');
      }    
      } 
   
    if(index==2){
        if(this.right[2].no==require('../../assets/image/zch/details/start.png')){
           this.right[index].no=require('../../assets/image/zch/details/redstart.png');
          this.right[index].num=this.right[index].num+1;
          this.$message('收藏成功');
        }
         else if(this.right[2].no==require('../../assets/image/zch/details/redstart.png')){
        this.right[index].no=require('../../assets/image/zch/details/start.png');
        this.right[index].num=this.right[index].num-1;
         this.$message('取消收藏');
      }    
      } 
    },
    //点击关注时进行切换
    guanzhu(){
      if(this.mess.guanzhu==false){
        console.log(this.mess.guanzhu);
        this.mess.guanzhu=true
      }
      else if(this.mess.guanzhu==true){
        this.mess.guanzhu= false;
      }
    },
    //点击相关推荐中的收藏选项
    likes(index){
      if(this.tent[index].state==1){
        this.tent[index].state=0;
        this.tent[index].num++;
      }
      else{
        this.tent[index].state=1;
        this.tent[index].num--;
      }
      
    },
    //点击收藏按钮
    saveBtn(){
      if(this.state==false){
        this.state=true;
        
      }
      else{
       this.state=false;
      }
      
    }
  }
};
</script>

<style lang="less" scoped>
.base {
  position: relative;
  .details {
    padding-top: 20px;
    padding-bottom: 60px;
    width: 1280px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    .lefts {
      width: 882px;
      .image {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .sp {
          width: 100%;
        }
        .play {
          position: absolute;
          width: 92px;
          height: 92px;
        }
      }
      .spon {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        .name {
          font-size: 28px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          line-height: 40px;
        }
        .btn {
          display: flex;
          p {
            font-size: 17px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            line-height: 25px;
            width: 87px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          p:first-child {
            color: rgba(255, 255, 255, 1);
            background: rgba(255, 148, 148, 1);
            margin-right: 20px;
          }
          p:last-child {
            color: rgba(155, 155, 155, 1);
            border: 1px solid rgba(151, 151, 151, 1);
            box-sizing: border-box;
          }
        }
      }
      .time {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 36px;
        .day {
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(74, 74, 74, 1);
          line-height: 33px;
        }
        .cyc {
          display: flex;
          align-items: center;
          .right {
            display: flex;
            align-items: center;
            p {
              font-size: 24px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(74, 74, 74, 1);
              line-height: 33px;
            }
          }
          .right:first-child {
            margin-right: 60px;
            img {
              width: 26px;
              height: 25px;
            }
          }
          .right:nth-child(2) {
            margin-right: 60px;
            img {
              width: 24px;
              height: 24px;
            }
          }
          .right:nth-child(3) {
            img {
              width: 24px;
              height: 24px;
            }
          }
        }
      }
      .cric {
        margin-top: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .poto {
          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
          }
        }
        .inputbox {
          display: flex;
          align-items: center;
          width: 70%;
          position: relative;
          input {
            height: 60px;
            width: 100%;
            font-size: 20px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(74, 74, 74, 1);
            line-height: 28px;
            padding-left: 10px;
            padding-right: 50px;
            outline: 0;
            border-radius: 4px;
            border: 0;
            border-radius: 10px;
            border: 1px solid rgba(155, 155, 155, 1);
            background: transparent;
          }

          input::-webkit-input-placeholder {
            text-align: center;
          }
          img {
            width: 33px;
            height: 33px;
            position: absolute;
            right: 13px;
          }
        }
        .btn {
          font-size: 22px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(74, 74, 74, 1);
          line-height: 38px;
          border-radius: 10px;
          border: 1px solid rgba(155, 155, 155, 1);
          padding: 4px 14px;
        }
      }
      .post_show {
        margin-top: 64px;
        .title {
          font-size: 32px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(74, 74, 74, 1);
          border-left: 6px solid rgba(255, 148, 148, 1);
          padding-left: 30px;
        }
        .black {
          margin-top: 20px;
          background: #fff;
          border-radius: 10px;
          padding: 29px;
          div.post:not(:first-child) {
            margin-top: 30px;
          }
          .borders {
            .post:last-child {
              border-bottom: 1px solid #f5f5f5;
              padding-bottom: 30px;
            }
          }
          .post {
            .top {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              .left {
                display: flex;
                align-items: center;
                .images {
                  img {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                  }
                }
                .time_out {
                  margin-left: 15px;
                  .name {
                    font-size: 28px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(74, 74, 74, 1);
                    line-height: 40px;
                  }
                  .times {
                    font-size: 18px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(155, 155, 155, 1);
                    line-height: 25px;
                  }
                }
              }
              .right {
                display: flex;
                align-items: center;
                .dz {
                  width: 19px;
                  height: 20px;
                  margin-right: 3px;
                }
                .number {
                  font-size: 20px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: rgba(74, 74, 74, 1);
                  line-height: 28px;
                }
              }
            }
            .text {
              margin-left: 70px;
              margin-top: 10px;
              p {
                font-size: 28px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(74, 74, 74, 1);
                line-height: 40px;
              }
              .back {
                margin-top: 29px;
                background: rgba(245, 245, 245, 1);
                border-radius: 10px;
                padding: 15px;
                .round:not(:first-child) {
                  margin-top: 30px;
                }
                .top {
                  display: flex;
                  justify-content: space-between;
                  align-items: flex-start;
                  .left {
                    display: flex;
                    align-items: center;
                    .images {
                      img {
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                      }
                    }
                    .time_out {
                      margin-left: 15px;
                      .name {
                        font-size: 24px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: rgba(74, 74, 74, 1);
                        line-height: 40px;
                      }
                      .times {
                        font-size: 16px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: rgba(155, 155, 155, 1);
                        line-height: 25px;
                      }
                    }
                  }
                  .right {
                    display: flex;
                    align-items: center;
                    .dz {
                      width: 19px;
                      height: 20px;
                      margin-right: 3px;
                    }
                    .number {
                      font-size: 20px;
                      font-family: PingFangSC-Regular, PingFang SC;
                      font-weight: 400;
                      color: rgba(74, 74, 74, 1);
                      line-height: 28px;
                    }
                  }
                }
                .text {
                  display: flex;
                  align-items: center;
                  p {
                    font-size: 22px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(74, 74, 74, 1);
                    line-height: 30px;
                  }
                  p:nth-child(2) {
                    color: rgba(255, 148, 148, 1);
                  }
                }
              }
            }
          }
        }
        .limit {
          margin-top: 15px;
        }
      }
    }
    .rights {
      width: 370px;
      .floor {
        background: #fff;
        border-radius: 10px;
        .title {
          font-size: 22px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(74, 74, 74, 1);
          line-height: 30px;
          padding: 20px 30px;
          border-bottom: 1px solid #f5f5f5;
        }
        .mess {
          display: flex;
          margin-top: 10px;
          padding: 0 30px 10px;

          border-bottom: 1px solid #f5f5f5;
          .image {
            img {
              width: 104px;
              height: 100px;
            }
          }
          .wz {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin-left: 18px;
            .name {
              font-size: 18px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(74, 74, 74, 1);
              line-height: 25px;
            }
            .grade {
              font-size: 18px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(74, 74, 74, 1);
              line-height: 25px;
            }
            .focus {
              display: flex;
              align-items: center;
              background: rgba(255, 148, 148, 1);
              border-radius: 6px;
              width: 55%;
              justify-content: center;
              padding: 3px 0;
              img {
                width: 19px;
                height: 19px;
              }
              p {
                font-size: 16px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                line-height: 22px;
                margin-left: 3px;
              }
            }
          }
        }
        .buttom {
          display: flex;
          justify-content: space-around;
          margin-top: 10px;
          padding-bottom: 10px;
          .trol {
            display: flex;
            flex-direction: column;
            align-items: center;
            .text {
              font-size: 18px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(130, 130, 130, 1);
              line-height: 25px;
            }
            .num {
              font-size: 24px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(74, 74, 74, 1);
              line-height: 33px;
            }
          }
        }
      }
      .letter {
        background: #fff;
        border-radius: 10px;
        margin-top: 30px;
        position: relative;
        .title {
          font-size: 22px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(74, 74, 74, 1);
          line-height: 30px;
          padding: 20px 30px;
          border-bottom: 1px solid #f5f5f5;
        }
        .content {
          .tent {
            display: flex;
            padding: 0 30px;
            margin-top: 15px;
            .image {
              img {
                width: 100px;
                height: 100px;
              }
            }
            .wz {
              margin-left: 10px;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              .titles {
                font-size: 22px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(74, 74, 74, 1);
                line-height: 30px;
              }
              .dz {
                display: flex;
                align-items: center;
                img {
                  width: 22px;
                  height: 20px;
                }
                .num {
                  font-size: 24px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: rgba(74, 74, 74, 1);
                  line-height: 33px;
                  margin-left: 5px;
                }
              }
            }
          }
        }
        .btn {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 60px;
          p {
            font-size: 22px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(74, 74, 74, 1);
            line-height: 30px;
          }
        }
      }
    }
  }
}
</style>