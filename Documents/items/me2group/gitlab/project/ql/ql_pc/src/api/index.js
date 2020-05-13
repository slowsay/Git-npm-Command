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
export const baseUrl = 'http://java.tdkj-yun.com:7633';
axios.interceptors.request.use((request) => {
  request.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  //request.baseURL = baseUrl;
  return request
})
let MSG = {
  ERROR: "网络好慢，再试一下",
  ERROR_RECOMMAND: "推荐目的地数据调用",
  ERROR_PHONE: "请输入11位手机号码",
  ERROR_PHONEERROR: "输入正确号码",
  ERROR_VERIFYCODE: "6位验证码",
  ERROR_PASSWORD: "请输入6位以上的密码",
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

  //00 登录，注册
  logOut: baseUrl + '/app/login/api/v1/logOut', //退出登陆
  qqLogin: baseUrl + '/app/login/api/v1/qq', //QQ登录，暂时为空
  mergeBase: baseUrl + '/app/login/api/v1/mergeBase', //用户更新基本信息
  userAndPwd: baseUrl + '/app/login/api/v1/userAndPwd', //用户登录

  //00-1 注册（填写资料)
  regist: baseUrl + '/app/login/regist/api/v1/regist', //注册

  //00-2 忘记密码
  forgetCheck: baseUrl + '/app/login/pass/forget/api/v1/check', //输入验证码
  updatePass: baseUrl + '/app/login/pass/forget/api/v1/updatePass', //修改密码
  forgetCode: baseUrl + '/app/login/pass/forget/api/v1/code', //发送验证码

  //00-4 快速登录
  fastCode: baseUrl + '/app/login/fast/api/v1/code', //发送验证码
  fastLogin: baseUrl + '/app/login/fast/api/v1/login', //验证码登录


  //首页
  advisedBloggers: baseUrl + '/app/index/api/v1/advisedBloggers', //查询系统推荐博主-小程序端
  concernBlogger: baseUrl + '/app/index/api/v1/concernBlogger', //关注/取消关注博主-小程序端
  historySearch: baseUrl + '/app/index/api/v1/historySearch', //历史搜索信息
  hotSearchList: baseUrl + '/app/index/api/v1/hotSearchList', //换一批
  searchList: baseUrl + '/app/index/api/v1/searchList', //帖子列表

  //01-2 首页-帖子详情页面
  agreePosting: baseUrl + '/app/index/post/desc/api/v1/agreePosting', //点赞/取消点赞帖子
  agreePostingEval: baseUrl + '/app/index/post/desc/api/v1/agreePostingEval', //点赞/取消点赞帖子评论
  collectPosting: baseUrl + '/app/index/post/desc/api/v1/collectPosting', //收藏/取消收藏帖子
  delOnePostingEval: baseUrl + '/app/index/post/desc/api/v1/delOnePostingEval', //删除自己发布的一条评论
  evalOnePosting: baseUrl + '/app/index/post/desc/api/v1/evalOnePosting', //针对一个帖子发布一条评论
  labelList: baseUrl + '/app/index/post/desc/api/v1/labelList', //标签列表
  postingDesc: baseUrl + '/app/index/post/desc/api/v1/postingDesc', //帖子基本详情
  prizeByPosting: baseUrl + '/app/index/post/desc/api/v1/prizeByPosting', //打赏一个帖子的帖主
  replyList: baseUrl + '/app/index/post/desc/api/v1/replyList', //帖子回复列表
  wconcernBlogger: baseUrl + '/app/index/post/desc/api/v1/concernBlogger', //关注/取消关注博主
  reltives: baseUrl + '/app/index/post/desc/api/v1/reltives', //相关推荐

  //发布
  addPostingLabel: baseUrl + '/app/posting/set/api/v1/addPostingLabel', //增加帖子标签
  advisedLabelList: baseUrl + '/app/posting/set/api/v1/advisedLabelList', ///选择标签
  publishOnePosting: baseUrl + '/app/posting/set/api/v1/publishOnePosting', //发布/更新帖子

  //03-1 商城-商城主页面
  shopbanners: baseUrl + '/app/shop/index/api/v1/banners', //商城页主banner
  shopCategoryDesc: baseUrl + '/app/shop/index/api/v1/desc', //类目详情
  shopHot: baseUrl + '/app/shop/index/api/v1/hot', //最新及热门，首页首次访问用
  shopHotAdvise: baseUrl + '/app/shop/index/api/v1/hotAdvise', //热门推荐
  shopHotBrands: baseUrl + '/app/shop/index/api/v1/hotBrands', //热门品牌
  shopWeekly: baseUrl + '/app/shop/index/api/v1/weekly', //每周上新
  shopSimpList: baseUrl + '/app/shop/index/api/v1/simpList', //搜索类目简要信息列表
  shopNavi: baseUrl + '/app/shop/index/api/v1/navi', //导航信息列表

  //03-2 商城-商品列表
  shopListAreas: baseUrl + '/app/shop/list/api/v1/areas', //地区列表
  shopListBrands: baseUrl + '/app/shop/list/api/v1/brands', //品牌列表
  shopListItems: baseUrl + '/app/shop/list/api/v1/items', //品牌下的规格列表
  shopListQuery: baseUrl + '/app/shop/list/api/v1/query', //查询商品

  //03-3 商城-商品详情页
  shopAdd2Car: baseUrl + '/app/shop/desc/api/v1/add2Car', //加入购物车
  shopCollect: baseUrl + '/app/shop/desc/api/v1/collect', //收藏/取消收藏
  shopEvals: baseUrl + '/app/shop/desc/api/v1/evals', //查看评论
  shopInfo: baseUrl + '/app/shop/desc/api/v1/info', //商品详情
  shopRelatives: baseUrl + '/app/shop/desc/api/v1/relatives', //相关推荐
  shopAreas: baseUrl + '/app/shop/desc/api/v1/areas', //地区查询
  shopTransFee: baseUrl + '/app/shop/desc/api/v1/transFee', //根据地区计算运费

  //03-3-1 商城-商品详情页-提交订单
  shopMerge: baseUrl + '/app/shop/ord/sub/api/v1/merge', //更新订单
  shopList: baseUrl + '/app/shop/ord/sub/api/v1/shops', //商品信息列表

  //03-3-2 商城-商品详情页-支付页面
  payAli: baseUrl + '/app/shop/pay/api/v1/ali', //支付宝支付
  payCancel: baseUrl + '/app/shop/pay/api/v1/cancel', //取消订单
  payShoplist: baseUrl + '/app/shop/pay/api/v1/shops', //订单内商品信息列表
  payWexin: baseUrl + '/app/shop/pay/api/v1/weixin', //微信支付


  //03-3-3 商城-商品详情页-订单详情页-待支付
  shopOrderInfo: baseUrl + '/app/shop/ord/desc/api/v1/info', //订单信息
  shopOrderRelattive: baseUrl + '/app/shop/ord/desc/api/v1/relatives', //相关推荐
  shopOrderList: baseUrl + '/app/shop/ord/desc/api/v1/shops', //订单内商品信息列表

  //04-1 通知-消息通知
  myMsglist: baseUrl + '/app/news/api/v1/list', //列表
  myUnRead: baseUrl + '/app/news/api/v1/unRead', //未读数量

  //04-2 通知-系统通知详情页面
  newsDescribe: baseUrl + '/app/news/desc/api/v1/test', //测试


  //05-1 我的-我的订单
  attemptRevoke: baseUrl + '/app/my/ord/api/v1/attemptRevoke', //申请售后
  cancel: baseUrl + '/app/my/ord/api/v1/cancel', //订单取消
  cancelRevoke: baseUrl + '/app/my/ord/api/v1/cancelRevoke', //取消售后
  delBatch: baseUrl + '/app/my/ord/api/v1/delBatch', //订单删除
  ordDesc: baseUrl + '/app/my/ord/api/v1/desc', //订单详情
  ordEval: baseUrl + '/app/my/ord/api/v1/eval', //评价
  ordHurry: baseUrl + '/app/my/ord/api/v1/hurry', //催卖家发货
  ordList: baseUrl + '/app/my/ord/api/v1/list', //查询用户的订单列表
  ordPay: baseUrl + '/app/my/ord/api/v1/pay', //立即付款
  ordRebuy: baseUrl + '/app/my/ord/api/v1/rebuy', //重新购买


  //05-1-1 我的-我的订单-退货
  revokeAttempt: baseUrl + '/app/my/ord/revoke/api/v1/attempt', //退货申请
  revokeDesc: baseUrl + '/app/my/ord/revoke/api/v1/desc', //退货详情
  revokeList: baseUrl + '/app/my/ord/revoke/api/v1/list', //退货列表

  //我的-我的信息
  baseInfo: baseUrl + '/app/my/api/v1/baseInfo', //个人中心头部信息
  myData: baseUrl + '/app/my/api/v1/data', //数据统计
  myInfo: baseUrl + '/app/my/api/v1/myInfo', //我的基础信息
  myInfoMerge: baseUrl + '/app/my/api/v1/myInfoMerge', //我的基础信息更新
  mySum: baseUrl + '/app/my/api/v1/sum', //个人信息汇总，第一次访问时候使用

  //05-2 我的-我的地址信息
  addressDesc: baseUrl + '/app/my/api/v1/addressDesc', //查询一个地址详情
  addressList: baseUrl + '/app/my/api/v1/addressList', //查询用户的地址列表
  delAddress: baseUrl + '/app/my/api/v1/deAddress', //批量删除地址信息
  defaultAddress: baseUrl + '/app/my/api/v1/defaultAddress', //默认地址详情
  mergeAddress: baseUrl + '/app/my/api/v1/mergeAddress', //地址更新
  setAddressDefault: baseUrl + '/app/my/api/v1/setAddressDefault', //设置地址默认/取消默认

  //05-3-1 我的-我的收藏-帖子
  myCollectCancel: baseUrl + '/app/my/collect/post/api/v1/cancel', //取消收藏
  myCollectList: baseUrl + '/app/my/collect/post/api/v1/list', //收藏帖子列表

  //05-3-2 我的-我的收藏-商品
  shopCollectCancel: baseUrl + '/app/my/collect/shop/api/v1/cancel', //取消收藏
  shopBuycarCollect: baseUrl + '/app/buy/car/api/v1/collect', //收藏/取消收藏
  shopCollectList: baseUrl + '/app/my/collect/shop/api/v1/list', //收藏商品列表

  //05-4 我的-我的发布
  delOne: baseUrl + '/app/my/posting/api/v1/delOne', //删除自己的一个帖子
  postingList: baseUrl + '/app/my/posting/api/v1/list', //我发布的帖子列表
  submitPosting: baseUrl + '/app/my/posting/api/v1/submitPosting', //将一个帖子提交审核


  //05-5 我的-我的积分
  integralBuy: baseUrl + '/app/my/integral/api/v1/buy', //购买积分
  integralBuyList: baseUrl + '/app/my/integral/api/v1/buyList', //可购买的积分列表
  integralBuyRecord: baseUrl + '/app/my/integral/api/v1/buyRecord', //购买积分记录
  integralDetails: baseUrl + '/app/my/integral/api/v1/details', //积分明细
  integralQueryOnes: baseUrl + '/app/my/integral/api/v1/queryOnes', //查询用户的积分余额
  integralSum: baseUrl + '/app/my/integral/api/v1/sum',//“我的积分”模块整体查询

  //05-6 我的-我的钱包
  walletDetails: baseUrl + '/app/my/wallet/api/v1/details', //明细
  walletQuery: baseUrl + '/app/my/wallet/api/v1/query', //余额

  //05-7 我的-消息设置
  setBalance: baseUrl + '/app/my/news/set/api/v1/balance', //余额变动设置更改
  setClientService: baseUrl + '/app/my/news/set/api/v1/clientService', //客服通知设置更改
  setOrd: baseUrl + '/app/my/news/set/api/v1/ord', //订单消息设置更改
  setQuery: baseUrl + '/app/my/news/set/api/v1/query', //查询当前用户设置的是否接受消息提醒
  setSys: baseUrl + '/app/my/news/set/api/v1/sys', //系统通知设置更改

  //04-2 通知-系统通知详情页面
  systemDesc: baseUrl + '/app/news/desc/api/v1/desc', //详情

  //06 购物车
  buyCount: baseUrl + '/app/buy/car/api/v1/buyCount', //更改购买数量
  buycarDel: baseUrl + '/app/buy/car/api/v1/del', //删除
  buycarList: baseUrl + '/app/buy/car/api/v1/list', //列表
  buycarOrd: baseUrl + '/app/buy/car/api/v1/ord', //下单

  //本地文件上传
  aliUpload: baseUrl + '/upload/api/aliUpload',//文件上传至阿里云
  upload: baseUrl + '/upload/api/upload', //文件上传至服务器指定地址


}


