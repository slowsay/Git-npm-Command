/**
 * Created by slowsay on 2019/11/14.
 * 前台
 */
'use strict';
import axios from 'axios';
import qs from 'qs';
import {Dialog} from 'vant'
//线上地址
//export const baseUrl = 'http://localhost:10000';
//本地地址
export const baseUrl = 'http://java.tdkj-yun.com:9000';//8085

let MSG = {
  ERROR: "网络好慢，再试一下",
  ERROR_RECOMMAND: "推荐目的地数据调用",
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
  ERROR_GOOD:"取消点赞",
  ERROR_STAR:"取消收藏",
  ERROR_HEADPIC:"请上传头像",


  SUCCESS_FEEDBACK: "反馈已发送，感谢您的反馈",
  SUCCESS_SAVEPROFILE: "保存个人信息",
  SUCCESS_GOOD:"感谢点赞",
  SUCCESS_STAR:"感谢收藏",
}

export default {
  url: baseUrl + '/',
  request: axios,
  qs: qs,
  dialog: Dialog,
  msg: MSG,
  //首页
  introAdvertList: baseUrl + '/app/homepage/api/v1/advertList',//推荐的广告列表
  selectByFHotSearch: baseUrl + '/app/homepage/api/v1/selectByFHotSearch',//查询出推荐的潜点
  selectByRecommend: baseUrl + '/app/homepage/api/v1/selectByRecommend',//查询出推荐目的地
  selectCountryByCon: baseUrl + '/app/homepage/api/v1/selectCountryByCon', //根据对应的洲查询对应的国家
  selectDestinationByCountryId: baseUrl + '/app/homepage/api/v1/selectDestinationByCountryId',//根据对应的国家id查询出目的地
  selectDestinationByDestinationId: baseUrl + '/app/homepage/api/v1/selectDestinationByDestinationId', //根据分类页面中选中的目的地id查看目的地详情
  selectDiveByDestinationName: baseUrl + '/app/homepage/api/v1/selectDiveByDestinationName', //根据目的地名称查询出对应的潜点，按照推荐查询出10个
  selectDiveByFId: baseUrl + '/app/homepage/api/v1/selectDiveByFId', //根据查询出的潜点详情id去查询其下的子潜点列表
  selectDiveById: baseUrl + '/app/homepage/api/v1/selectDiveById', //根据潜点详情id查询潜点详情
  selectDiveContentByTitle: baseUrl + '/app/homepage/api/v1/selectDiveContentByTitle', //根据输入的潜点介绍信息模糊查询对应的潜点列表
  getAuthorizeInfo:baseUrl+'/app/login/api/v1/getAuthorizeInfo',//获取微信用户授权后的微信用户信息注册登录
  getAuthorizeInfoLogin:baseUrl+'/app/login/api/v1/getAuthorizeInfoLogin',//获取微信用户授权后的微信用户信息注册登录
  historySearchWord:baseUrl+'/app/homepage/api/v1/historySearchWord', //历史搜索词

  //广告
  addClickCount: baseUrl + '/app/advert/api/v1/addClickCount', //增加点击次数
  advertList: baseUrl + '/app/advert/api/v1/advertList', //广告列表

  //浏览历史
  addBrowserHistory: baseUrl + '/app/diveSite/api/v1/addBrowserHistory', //添加浏览历史,1是潜点详情，2是目的地
  browserHistoryList: baseUrl + '/app/diveSite/api/v1/browserHistoryList', //浏览历史列表

  //潜点收藏
  addCollect: baseUrl + '/app/diveCollect/api/v1/addCollect', //收藏
  collectCancel:baseUrl + '/app/diveCollect/api/v1/cancel', //取消收藏潜点内容
  cancelCollect: baseUrl + '/app/diveCollect/api/v1/cancelCollect',//取消收藏
  collectList: baseUrl + '/app/diveCollect/api/v1/collectList', //我的收藏

  //潜点详情类
  collectionDive: baseUrl + '/app/diveContent/api/v1/collectionDive', //收藏后收藏数+1
  disCollectionDive: baseUrl + '/app/diveContent/api/v1/disCollectionDive',//取消收藏后收藏数-1
  disLikeDive: baseUrl + '/app/diveCollect/api/v1/cancelLike', //取消点赞后点赞数-1
  likeDive: baseUrl + '/app/diveCollect/api/v1/addLike', //点赞后点赞数+1
  selectCollectionDive: baseUrl + '/app/diveContent/api/v1/selectCollectionDive', //查询总的收藏数
  selectLikeDive: baseUrl + '/app/diveContent/api/v1/selectLikeDive', //查询总的点赞数
  selectShareDive: baseUrl + '/app/diveContent/api/v1/selectShareDive', //查询总的分享数
  shareDive: baseUrl + '/app/diveContent/api/v1/shareDive', //分享后分享数+1，不可取消

  //反馈
  addFeedback: baseUrl + '/app/feedback/api/v1/addFeedback',//提交反馈

  //文件上传
  upload: baseUrl + '/upload/api/upload',//文件上传
  aliUpload: baseUrl + '/upload/api/aliUpload', //文件上传至阿里云

  //用户
  forgetPassWord: baseUrl + '/app/user/api/v1/forgetPassWord',//忘记密码
  getVerifyOfPhone: baseUrl + '/app/user/api/v1/getVerifyOfPhone',//手机号获取验证码
  login: baseUrl + '/app/user/api/v1/login',//用户登录,手机号
  loginOut: baseUrl + '/app/user/api/v1/loginOut',//退出登录
  phoneRegister: baseUrl + '/app/user/api/v1/phoneRegister',//手机号注册
  updateUserInfo: baseUrl + '/app/user/api/v1/updateUserInfo',//更新个人信息
  userInfo: baseUrl + '/app/user/api/v1/userInfo',//查询个人信息
  weixinOrQQOrWeiboRegister: baseUrl + '/app/user/api/v1/weixinOrQQOrWeiboRegister',//微信/QQ/微博注册
  weixinOrQQOrWinbologin: baseUrl + '/app/user/api/v1/weixinOrQQOrWinbologin', //用户微信/QQ/微博登录
  noticeSet:baseUrl + '/app/user/api/v1/noticeSet', //消息提醒设置
  selectNotice:baseUrl+'/app/user/api/v1/selectNotice', //查找消息
  updatePhone:baseUrl+'/app/user/api/v1/updatePhone', //更新手机号

  //admin
  selectAllContinent: baseUrl + '/admin/country/api/v1/selectAllContinent',//admin端查询所有的洲
  selectDiveContentByName:baseUrl+'/admin/divecontent/api/v1/selectDiveContentByName',//admin端根据潜点名称查询潜点详情

  hotWordList: baseUrl + '/admin/hotWord/api/v1/hotWordList', //热词列表
  noticeUsers:baseUrl+'/admin/user/api/v1/noticeUsers',//添加消息通知
  selectMsg: baseUrl + '/admin/divecontentext/api/v1/selectMsg', //查询数据，根据contentid进行查询

  selectDestinationId:baseUrl+'/admin/destination/api/v1/selectDestinationId', //admin端根据id查询对应的目的地详情

}


