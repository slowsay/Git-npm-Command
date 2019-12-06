/**
 * Created by slowsay on 2019/11/14.
 * 前台
 */
'use strict';
import axios from 'axios';
import qs from 'qs';
import {Dialog} from 'vant'
//线上地址
//export const baseUrl = '';
//本地地址
export const baseUrl = 'http://java.tdkj-yun.com:9042';

let MSG = {
  ERROR: "网络好慢，再试一下",
  ERROR_RECOMMAND: "推荐目的地数据调用",
  ERROR_PHONE: "请输入11位手机号码",
  ERROR_PHONEERROR: "输入正确号码",
  ERROR_VERIFYCODE: "4位验证码",
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
  ERROR_SENDMSG: "请输入您的看法",

  SUCCESS_ISSUE: "发表成功",
  SUCCESS_FEEDBACK: "反馈已发送，感谢您的反馈",
  SUCCESS_SAVEPROFILE: "保存个人信息",
  SUCCESS_GOOD: "感谢点赞",
  SUCCESS_STAR: "感谢收藏",
}

export default {
  url: baseUrl + '/',
  request: axios,
  qs: qs,
  dialog: Dialog,
  msg: MSG,

  //轮播图控制类
  bannerIndex: baseUrl + '/banner/index',//首页轮播图
  // 锅友说BBS控制类
  BBSIndexList: baseUrl + '/website/BBSIndexList',//锅物说论坛首页 列表信息
  BBSListByKeywords: baseUrl + '/website/BBSListByKeywords', //锅物说论坛查询帖子首页
  BBSPublishPost: baseUrl + '/website/BBSPublishPost', //锅物说论坛发布帖子 ，用户ID、板块ID、标题、内容、状态
  BBSUserINfo: baseUrl + '/website/BBSUserINfo', //锅物说论坛我的信息首页
  //网站常用功能控制类
  postRevisions: baseUrl + '/website/postRevisions',//修改意见

  //料理教室控制类
  cookBanner: baseUrl + '/website/cookBanner', //cookBanner
  cookDetail: baseUrl + '/website/cookDetail', //cookDetail
  cookList: baseUrl + '/website/cookList', //首页各类列表信息：健康食谱，排行榜，今日食谱，网红菜谱
  cookListByKeywords: baseUrl + '/website/cookListByKeywords', //菜谱名称查询
  cookListByType: baseUrl + '/website/cookListByType', //菜谱分类查询

  //网站信息控制类
  websiteDemo: baseUrl + '/website/demo', //DEMO信息
  //本地文件上传
  aliUpload: baseUrl + '/upload/api/aliUpload', //文件上传至阿里云
  upload: baseUrl + '/upload/api/upload', //文件上传至服务器

  //料理控制类
  findFood: baseUrl + '/food/findFood', //料理分类查询
  findGfood: baseUrl + '/food/findGfood', //锅类菜谱查询
  findPerson: baseUrl + '/food/findPerson', //网红分类查询
  findRecipesByStatus: baseUrl + '/food/findRecipesByStatus', //每日推荐食谱查询
  findRedcipesByMenuId: baseUrl + '/food/findRedcipesByMenuId', //根据父类id查询子类
  findRedcipesByName: baseUrl + '/food/findRedcipesByName', //在父类基础上按照名称查询菜谱
  findRedcipesByPerson: baseUrl + '/food/findRedcipesByPerson', //网红食谱查询
  selectByFoodId: baseUrl + '/food/selectByFoodId', //根据父类id查询菜品对应的标签并显示

  //收藏帖子类
  addCollect: baseUrl + '/lt/collect/addCollect', //添加收藏
  cancelCollect: baseUrl + '/lt/collect/cancelCollect', //取消收藏
  collectList: baseUrl + '/lt/collect/collectList', //收藏列表

  //我的关注类
  addFocus: baseUrl + '/lt/focus/addFocus', //添加关注
  cancelFocus: baseUrl + '/lt/focus/cancelFocus', //取消关注
  focusList: baseUrl + '/lt/focus/focusList', //关注列表


  //公告类
  noticeInfo: baseUrl + '/lt/notice/noticeInfo', //公告详情
  noticeList: baseUrl + '/lt/notice/noticeList', //公告

  //帖子类
  deleteLtForum: baseUrl + '/lt/post/deleteLtForum', //删除帖子
  ltPostList: baseUrl + '/lt/post/ltPostList', //帖子列表
  postLtForum: baseUrl + '/lt/post/postLtForum', //发帖子
  recommendList: baseUrl + '/lt/post/recommendList', //帖子推荐列表
  selectPost: baseUrl + '/lt/post/selectPost', //模糊查询搜索帖子
  viewsList: baseUrl + '/lt/post/viewsList', //帖子热度列表
  voteOrCancel: baseUrl + '/lt/post/voteOrCancel', //确定投票

  //帖子详情类
  addViewsAndMessage: baseUrl + '/lt/ltPostInfo/addViewsAndMessage', //根据帖子id查询帖子详情
  lzlReply: baseUrl + '/lt/ltPostInfo/lzlReply', //楼中楼回复
  onlyFloorUser: baseUrl + '/lt/ltPostInfo/onlyFloorUser', //只看楼主
  reply: baseUrl + '/lt/ltPostInfo/reply', //回复帖子
  replyList: baseUrl + '/lt/ltPostInfo/replyList', //查询回复信息

  //订单控制类
  addShopCar: baseUrl + '/order/addShopCar', //加入购物车
  attemptRevoke: baseUrl + '/order/attemptRevoke', //申请退货
  orderCancel: baseUrl + '/order/cancel', //取消订单
  confirmReceive: baseUrl + '/order/confirmReceive', //确认收货
  createOrd: baseUrl + '/order/createOrd', //生成订单
  orderDelete: baseUrl + '/order/delete',//删除订单
  getCouponListOfUser: baseUrl + '/order/getCouponListOfUser', //用户拥有的优惠券列表
  orderInfo: baseUrl + '/order/info', //订单详情
  orderList: baseUrl + '/order/list', //订单列表
  logsticList: baseUrl + '/order/logsticList', //查看物流
  createOrdh5: baseUrl + '/order/v2/createOrd', //h5页面生成订单

  //金额支付相关控制类
  h5PayByWeixin: baseUrl + '/pay/h5PayByWeixin', //微信h5支付
  notify: baseUrl + '/pay/notify', //微信支付回调函数
  payByRemain: baseUrl + '/pay/payByRemain', //余额支付
  payByWeixin: baseUrl + '/pay/payByWeixin', //微信支付

  //用户附庸相关控制类
  addressdeafult: baseUrl + '/person/addressdeafult', //设置/取消设置为默认
  addressdel: baseUrl + '/person/addressdel', //收货地址删除
  addressinfo: baseUrl + '/person/addressinfo', //收货地址详情
  addressinsert: baseUrl + '/person/addressinsert', //新增收货地址
  addresslist: baseUrl + '/person/addresslist', //收货地址列表
  addressmerge: baseUrl + '/person/addressmerge', //更新收货地址
  addressupdate: baseUrl + '/person/addressupdate', //修改收货地址
  bankList: baseUrl + '/person/bankList', //银行卡列表
  brokerInfo: baseUrl + '/person/brokerInfo', //我的余额及收益列表
  cash: baseUrl + '/person/cash', //提现接口
  charge: baseUrl + '/person/charge', //充值接口
  chargeNotify: baseUrl + '/person/chargeNotify', //充值接口回调函数
  freeBank: baseUrl + '/person/freeBank', //解除绑定银行卡
  setBank: baseUrl + '/person/setBank', //绑定银行卡
  setBankDefault: baseUrl + '/person/setBankDefault', //设置/取消设置银行卡默认

  //商品控制类
  createQR: baseUrl + '/shop/createQR', //生成二维码
  getCagoryShopsByFid: baseUrl + '/shop/getCagoryShopsByFid', //根据父级id查询子集分类和子集分类商品集合
  getCategoryList: baseUrl + '/shop/getCategoryList', //根据父级id查询商品分类列表
  getCategoryShopList: baseUrl + '/shop/getCategoryShopList', //根据商品分类id查询商品列表
  shopInfo: baseUrl + '/shop/info', //商品详情
  shareInfo: baseUrl + '/shop/shareInfo', //分享商品详情
  shopIndexList: baseUrl + '/shop/shopIndexList', //热门商品列表
  shopSearcList: baseUrl + '/shop/shopSearcList', //搜索商品列表
  //门店控制类
  acceptCoupon: baseUrl + '/store/acceptCoupon', //用户领取优惠券
  acceptCouponList: baseUrl + '/store/acceptCouponList', //搜索用户领取的优惠券列表
  storeInfo: baseUrl + '/store/info', //门店详情
  storeList: baseUrl + '/store/list', //搜索门店列表
  storeCouponList: baseUrl + '/store/storeCouponList', //门店里的优惠券列表
  useCoupon: baseUrl + '/store/useCoupon', //核销优惠券
  //系统信息控制类
  areaListOfFid: baseUrl + '/sysInfo/areaListOfFid', //根据父级地址id查询子集地址集合
  toMyInfoDesc: baseUrl + '/sysInfo/toMyInfoDesc', //获取我的系统通知详情
  toMyInfoList: baseUrl + '/sysInfo/toMyInfoList', //获取我的系统通知列表
  unReadNum: baseUrl + '/sysInfo/unReadNum', //消息未读数量

  //前台用户控制类
  authorize: baseUrl + '/user/authorize', //获取微信用户登录的token和openId
  login: baseUrl + '/user/login', //用户登录
  loginByCode: baseUrl + '/user/loginByCode', //用户微信注册登录
  personinfo: baseUrl + '/user/personinfo', //微信用户信息注册
  logOut: baseUrl + '/user/v1/logOut', //退出登录
  updateUserLoc: baseUrl + '/user/v1/updateUserLoc', //修改用戶经纬度

  //网站信息控制类
  websiteBanner: baseUrl + '/website/bannner', //首页轮播图信息
  indexInfo: baseUrl + '/website/indexInfo', //首页信息-手机号等，购物车状态，等
  indexList: baseUrl + '/website/indexList', //首页分类列表信息
}


