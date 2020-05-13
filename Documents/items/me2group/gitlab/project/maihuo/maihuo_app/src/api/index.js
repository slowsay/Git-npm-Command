/**
 * Created by slowsay on 2019/11/14.
 * 前台
 */
'use strict';
import axios from 'axios';
import qs from 'qs';
import {Dialog} from 'vant'
//线上地址
export const baseUrl = 'http://localhost:9898';
//本地地址
//export const baseUrl = 'https://api.me2group.com/maihuo';
//每次请求携带cookies信息
axios.defaults.withCredentials = true;

let MSG = {
  ERROR: "网络好慢，再试一下",
  ERROR_RECOMMAND: "推荐目的地数据调用",
  ERROR_ACCOUNT: "请输入账号",
  ERROR_PASSWORD: "请输入密码",
  ERROR_PHONE: "请输入11位手机号码",
  ERROR_PHONEERROR: "输入正确号码",
  ERROR_VERIFYCODE: "6位验证码",
  ERROR_RULE: "认同服务协议",
  ERROR_PHONECHECK: "输入正确的手机号码",
  ERROR_FEEDBACK: "请描述您遇到的问题",
  ERROR_EMAIL: "请输入邮箱",
  ERROR_EMAILERROR: "输入正确邮箱",
  ERROR_SEX: "请选择性别",
  ERROR_PROFILE: "请输入个人介绍",
  ERROR_BIRTHDAY: "请选择生日",
  ERROR_NICKNAME: "请输入用户名",
  ERROR_ADDRESS: "请输入地址",
  ERROR_GOOD: "取消点赞",
  ERROR_STAR: "取消收藏",
  ERROR_HEADPIC: "请上传头像",


  SUCCESS_FEEDBACK: "反馈已发送，感谢您的反馈",
  SUCCESS_SAVEPROFILE: "保存个人信息",
  SUCCESS_GOOD: "感谢点赞",
  SUCCESS_STAR: "感谢收藏",
}

export default {
  url: baseUrl,
  request: axios,
  qs: qs,
  dialog: Dialog,
  msg: MSG,

  //公共模块-登录相关
  getCaptcha: baseUrl + '/captcha.jpg',//验证码图片
  logout: baseUrl + '/logout',//退出
  login: baseUrl + '/sys/login',//登录


}


