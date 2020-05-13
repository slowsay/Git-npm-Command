<template>
  <div id="Personal">
    <div class="top">
      <van-icon name="arrow-left" @click="backHandle"/>
      <p>编辑个人资料</p>
    </div>
    <div class="middle">
      <div>
        <p>头像</p>
        <!--<van-uploader :after-read="afterRead">-->
        <!--<img slot="default" :src="headpic"/>-->
        <!--</van-uploader>-->
        <p class="headpic">
          <el-upload
            :show-file-list="false"
            :action="aliupload"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="headpic" :src="headpic" class="avatar" width="50">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </p>
        <img src="../../assets/image/gw/13.png"/>
      </div>
      <div @click="nickHandle">
        <p>昵称</p>

        <p>{{name}}</p>
        <img src="../../assets/image/gw/13.png"/>
      </div>
      <div @click="show=true,state=1">
        <p>性别</p>

        <p>{{sex}}</p>
        <img src="../../assets/image/gw/13.png"/>
      </div>
      <div @click="birthdayHandle">
        <p>生日</p>

        <p>{{birthday}}</p>
        <img src="../../assets/image/gw/13.png"/>
      </div>
    </div>
    <div></div>
    <div class="bottom">
      <div>
        <p>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址</p>
        <van-field v-model="address" placeholder="请输入地址"/>
      </div>
      <div>
        <p>电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话</p>
        <van-field v-model="phone" disabled placeholder="请输入电话" maxlength="12"/>
        <van-button type="text" @click="bindingHandle">变更号&nbsp;&nbsp;</van-button>
      </div>
      <div>
        <p>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱</p>
        <van-field v-model="mail" placeholder="请输入邮箱"/>
      </div>
      <div>
        <p>个人介绍</p>
        <van-field type="textarea" v-model="personal" maxlength="60" placeholder="请输入个人介绍"/>
      </div>
    </div>
    <van-button @click="saveHandle">保存</van-button>
    <van-dialog
      v-model="show"
      :showConfirmButton="false"
      :close-on-click-overlay="true"
      @closed="close"
    >
      <div v-if="state==0" class="name">
        <van-field v-model="name_0" placeholder="请输入用户名" maxlength="15"/>
        <van-button @click="userHandle">确认</van-button>
      </div>
      <div v-else-if="state==1" class="sex">
        <p @click="sex='男',show=false">男</p>

        <p @click="sex='女',show=false">女</p>
      </div>
      <div v-else class="birthday">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          :visible-item-count="3"
        />
        <div>
          <van-button @click="show=false">取消</van-button>
          <van-button @click="confirm">确认</van-button>
        </div>
      </div>
    </van-dialog>
    <van-dialog v-model="editphone"
                :showConfirmButton="false"
                :close-on-click-overlay="true"
                @closed="close">
      <div class="cropper">
      </div>
    </van-dialog>
  </div>
</template>
<script>
  import API from '../../api/index';
  import {publicFn} from '../../utils/util';
  export default {
    data: function () {
      return {
        aliupload: "",
        //显示头像
        headpic: require("../../assets/image/gw/goutou.jpg"),
        //昵称
        name: "",
        sex: "",
        birthday: "",
        address: "",
        //电放
        phone: "",
        //邮箱
        mail: "",
        //个人介绍
        personal: "",
        //手机号码变更
        editphone: !1,
        //头像编辑弹框
        editimg: false,
        //弹框
        show: false,
        state: 0, //0昵称 1性别 2生日,
        name_0: "",
        currentDate: new Date(1997, 5, 10),
        minDate: new Date(1950, 0, 1)
      };
    },
    components: {},
    //初始化数据
    created: function () {
      if (localStorage.getItem("userInfo")) {
        this.userinfo = JSON.parse(localStorage.getItem("userInfo"));
        this.getUserInfo();
      }
      else {
        this.$router.push({path: '/Login'});
      }

    },
    methods: {
      //用户数据
      getUserInfo: function () {
        this.aliupload = API.aliUpload;
        this.headpic = this.userinfo.headPic;
        this.name = this.userinfo.userName || "";
        this.sex = this.userinfo.gender == 1 ? "男" : "女";
        this.birthday = this.userinfo.birthday || '';
        this.address = this.userinfo.address || "";
        if (this.birthday != '') {
          this.currentDate = new Date(this.birthday.split('年')[0], this.birthday.split('月')[0].split('年')[1] - 1, this.birthday.split('月')[1].split('日')[0])
        }
        this.phone = this.userinfo.phone || "";
        this.mail = this.userinfo.email || "";
        this.personal = this.userinfo.personalProfile || "";
      },
      birthdayHandle: function () {
        this.show = true, this.state = 2;
        this.birthday = this.userinfo.birthday || '';
        if (this.birthday != '') {
          this.currentDate = new Date(this.birthday.split('年')[0], this.birthday.split('月')[0].split('年')[1] - 1, this.birthday.split('月')[1].split('日')[0])
        }
      },
      nickHandle: function () {
        this.name_0 = this.name;
        this.show = true, this.state = 0;
      },
      userHandle: function () {
        if (this.name_0.length < 1) {
          API.dialog({message: "请输入用户名"});
        }
        else if (this.name_0.length > 20) {
          API.dialog({message: "请输入4-20个字符"});
        }
        else {
          this.show = false, this.name = this.name_0;
        }
      },
      //更改手机号
      bindingHandle: function () {
        this.$router.push('/Binding');
      },
      editUploadHandle: function () {
        this.editimg = !0;
      },
      // 实时预览函数
      realTime: function (data) {
        this.previews = data
      },
      convertBase64UrlToBlob: function (urlData) {
        let bytes = window.atob(urlData.split(',')[1]);//去掉url的头，并转换为byte
        //处理异常,将ascii码小于0的转换为大于0
        let ab = new ArrayBuffer(bytes.length);
        let ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab], {type: 'image/jpeg'});
      },
      down: function (type) {
        // event.preventDefault()
        var _this = this;
        if (!this.option.img) {
          this.$notify({
            title: "提示",
            message: '你没有选择图片!',
            type: "error"
          });
          return;
        }
        this.isLoading = true;
        var aLink = document.createElement('a')
        aLink.download = 'author-img'
        // 输出
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob(
            function (data) {
              _this.downImg = window.URL.createObjectURL(data)
              aLink.href = window.URL.createObjectURL(data)
              aLink.click()
            }
          )
        } else {
          this.$refs.cropper.getCropData(function (data) {
              _this.downImg = data
              _this.$emit("getImgFile", _this.convertBase64UrlToBlob(data))

            }
          )
        }
      },
      uploadImg: function (e, num) {
        //上传图片
        // this.option.img
        var _this = this;
        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          this.$notify({
            title: "提示",
            message: '请选择正确的图片格式！',
            type: "error"
          });
          return false
        }
        var reader = new FileReader()
        reader.onload = function (e) {
          let data;
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          if (num === 1) {
            _this.option.img = data
          } else if (num === 2) {
            _this.example2.img = data
          }
        }
        // 转化为base64
        reader.readAsDataURL(file)
        // 转化为blob
        // reader.readAsArrayBuffer(file)
      },
      imgLoad: function (msg) {
//        console.log(msg)
      },
      //上传图片
      handleAvatarSuccess: function (res, file) {
        //aliupload方式
        this.headpic = res;
      },
      beforeAvatarUpload: function () {

      },
      //头像
      afterRead: function (val_0, val_1) {
        this.src = val_0.content;
      },
      //更改昵称
      confirm: function () {
        this.show = false;
        this.birthday =
          this.currentDate.getFullYear() +
          "年" +
          (this.currentDate.getMonth() + 1 < 10
            ? "0" + (this.currentDate.getMonth() + 1)
            : this.currentDate.getMonth() + 1) +
          "月" +
          (this.currentDate.getDate() < 10
            ? "0" + this.currentDate.getDate()
            : this.currentDate.getDate()) +
          "日";
      },
      //保存
      saveHandle: function () {
        var _this = this, _mail = this.mail, _phone = this.phone, _nikename = this.name, _headpic = this.headpic,
          _sex = this.sex, _birthday = this.birthday, _address = this.address, _personal = this.personal;
//        if (_headpic.length < 1) {
//          API.dialog({message: API.msg.ERROR_HEADPIC});
//        }
//        else if (_nikename.length < 1) {
//          API.dialog({message: API.msg.ERROR_NICKNAME});
//        }
//        else if (_sex.length < 1) {
//          API.dialog({message: API.msg.ERROR_SEX});
//        }
//        else if (_birthday.length < 1) {
//          API.dialog({message: API.msg.ERROR_BIRTHDAY});
//        }
//        else if (_address.length < 1) {
//          API.dialog({message: API.msg.ERROR_ADDRESS});
//        }
//        else if (_phone.length < 11) {
//          API.dialog({message: API.msg.ERROR_PHONE});
//        }
//        else if (!publicFn.isPoneAvailable(_phone)) {
//          API.dialog({message: API.msg.ERROR_PHONEERROR});
//        }
//        else if (_mail.length < 1) {
//          API.dialog({message: API.msg.ERROR_EMAIL});
//        }
//        else if (!publicFn.isEmail(_mail)) {
//          API.dialog({message: API.msg.ERROR_EMAILERROR});
//        }
//        else if (_personal.length < 1) {
//          API.dialog({message: API.msg.ERROR_PROFILE});
//        }
//        else {
        API.request({
          url: API.updateUserInfo,
          method: 'post',
          headers: {
            token: this.userinfo.token,
            userId: this.userinfo.id
          },
          data: API.qs.stringify({
            headPic: _headpic, email: _mail,
            userName: _nikename, gender: _sex == "男" ? 1 : 2, birthday: _birthday,
            address: _address, personalProfile: _personal
          })
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              API.dialog({message: API.msg.SUCCESS_SAVEPROFILE});
              _this.updateUserInfo();
            }
            else {
              API.dialog({message: e.data.msg});
            }
          }
          else {
            API.dialog({message: e.data.msg});
          }
        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
//        }
      },
      updateUserInfo: function () {
        var _this = this;
        API.request({
          url: API.userInfo,
          method: 'post',
          headers: {
            token: this.userinfo.token,
            userId: this.userinfo.id
          }
        }).then(function (e) {
          if (e.data.code == 200) {
            if (e.data.success) {
              var _obj = e.data.data;
              _obj.token = _this.userinfo.token;
              localStorage.setItem("userInfo", JSON.stringify(_obj));
              _this.$router.push("/My");
            }
            else {
              API.dialog({message: e.data.msg});
            }
          }
          else {
            API.dialog({message: e.data.msg});
          }
        }).catch(function (e) {
          API.dialog({message: JSON.stringify(e)});
        })
      },
      backHandle: function () {
        this.$router.push("/My")
      },
      //关闭
      close: function () {
        this.name_0 = "";
        this.currentDate = new Date(1997, 5, 10);
      }
    }
  };
</script>
<style lang="less" scoped>
  #Personal {
    .top {
      height: 1.2rem;
      line-height: 1.2rem;
      .van-icon {
        float: left;
        margin-left: 0.3rem;
        font-size: 0.45rem;
        line-height: 1.2rem;
      }
      p {
        width: fit-content;
        margin: auto;
        font-size: 0.32rem;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
    }
    .middle {
      padding-left: 0.3rem;
      > div {
        height: 1rem;
        display: flex;
        align-items: center;
        &:not(:last-child) {
          border-bottom: 0.01rem solid #f5f5f5;
        }
        p:nth-child(1) {
          font-size: 0.28rem;
          font-weight: 400;
          color: rgba(74, 74, 74, 1);
          line-height: 0.4rem;
        }
        p:nth-child(2) {
          margin-left: auto;
          font-size: 0.24rem;
          font-weight: 400;
          color: rgba(155, 155, 155, 1);
          line-height: 0.33rem;
        }
        img:nth-child(3) {
          width: 0.14rem;
          margin: 0 0.3rem 0 0.4rem;
        }
      }
      .avatar {
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
        overflow: hidden;
      }
    }
    .middle + div {
      height: 0.1rem;
      background: rgba(245, 245, 245, 1);
    }
    /deep/ .van-uploader {
      margin-left: auto;
      .van-uploader__upload {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        margin: 0;
        border: none;
      }
      img {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
      }
    }
    .bottom {
      padding: 0 0 0 0.3rem;
      > div {
        height: 1rem;
        display: flex;
        align-items: center;
        &:not(:last-child) {
          border-bottom: 0.01rem solid #f5f5f5;
        }
        > p {
          flex-shrink: 0;
          font-size: 0.28rem;
          font-weight: 400;
          color: rgba(74, 74, 74, 1);
          line-height: 0.4rem;
          margin-right: 0.2rem;
        }
        .van-field {
          width: 5.58rem;
          height: 0.6rem;
          border-radius: 0.1rem;
          padding: 0 0 0 0.2rem;
          border: 0.01rem solid rgba(230, 230, 230, 1);
        }
        /deep/ input {
          line-height: 0.58rem;
          font-size: 0.24rem;
          font-weight: 400;
          color: #4a4a4a;
        }
        ::-webkit-input-placeholder {
          /* WebKit browsers */
          font-size: 0.24rem;
          font-weight: 400;
          color: #cccccc;
        }
      }
      > div:nth-child(4) {
        height: 2.56rem;
        align-items: flex-start;
        p {
          line-height: 1rem;
        }
        .van-field {
          width: 5.58rem;
          height: 1.6rem;
          border-radius: 0.1rem;
          padding: 0 0 0 0.2rem;
          border: 0.01rem solid rgba(230, 230, 230, 1);
          margin-top: 0.36rem;
        }
      }
    }
    > .van-button {
      display: block;
      margin: auto;
      border: none;
      height: 0.9rem;
      width: 6.93rem;
      background: rgba(82, 189, 242, 1);
      border-radius: 0.1rem;
      font-size: 0.32rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 0.45rem;
    }
    //弹窗
    .van-dialog {
      border-radius: 0.1rem;
      width: 6rem;
    }
    .name {
      display: flex;
      .van-button {
        color: rgba(255, 255, 255, 1);
        background: rgba(82, 189, 242, 1);
        flex-shrink: 0;
      }
    }
    .sex {
      p {
        font-size: 0.32rem;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        line-height: 1rem;
        text-align: center;
      }
      p:nth-child(1) {
        border-bottom: 0.01rem solid #f5f5f5;
      }
      p:hover {
        background: #eeeeee;
      }
    }
    .birthday {
      width: 6rem;
      height: 4.6rem;
      margin: 0;
      box-sizing: border-box;
      padding: 0.5rem 0 0 0;
      position: relative;
      .van-picker {
        margin: auto;
        /deep/ .van-picker__toolbar {
          display: none;
        }
      }
      .van-picker + div {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        font-size: 0;
        height: 1rem;
        border-top: 0.01rem solid #f5f5f5;
        .van-button {
          width: 50%;
          height: 100%;
          font-size: 0.32rem;
          font-weight: 400;
          color: rgba(74, 74, 74, 1);
          line-height: 0.45rem;
        }
        .van-button:nth-child(1) {
          border-right: 0.01rem solid #f5f5f5;
        }
      }

      .headpic {
        float: right;
        width: 5rem;
        height: 5rem;
        > img:nth-child(1) {
          width: 5rem;
          height: 5rem;
          border-radius: 50%;
        }
      }
    }
  }
</style>
