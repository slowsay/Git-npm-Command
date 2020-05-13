/**
 * Created by slowsay on 2019/11/14.
 * 后台管理
 */
'use strict';
import axios from 'axios';
import qs from 'qs';
import {Dialog} from 'vant';
//线上地址
//export const baseUrl = 'http://localhost:10000';
//本地地址
export const baseUrl = 'http://java.tdkj-yun.com:9000';//8085

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
    ERROR_TARGET: "请输入目的地",
    ERROR_INTRO: "请输入介绍",
    ERROR_PICUPLOAD: "请上传图片",
    ERROR_TRAVELDAY: "请输入出行天数",
    ERROR_TRAVELTIME: "请选择出行时间",
    ERROR_COST: "请输入花费",

    ERROR_SUBJECT: "请输入标题",
    ERROR_IMAGE: "请上传图片",
    ERROR_STORE: "请输入店铺名称",

    ERROR_BANNERTITLE: "请输入广告名称",
    ERROR_BANNERPOSITION: "请选择广告位置",
    ERROR_STARTTIME: "请输入开始时间",
    ERROR_ENDTIME: "请输入结束时间",
    ERROR_BANNERSTATUS: "选择广告状态",
    ERROR_BANNERUPLOAD: "请上传图片",
    ERROR_BANNERLINK: "请输入广告跳转方向",
    ERROR_BANNERCON: "请输入广告备注",
    ERROR_CATEGORYNAME: "请输入类目",
    ERROR_TAGNAME: "请输入标签名称",
    ERROR_CATEGORE: "请选择类目",

    SUCCESS_BANNER: "添加广告成功",
    SUCCESS_CATEGORYNAME: "添加类目成功",

    SUCCESS_GETUP: "上架成功",
    SUCCESS_GETDOWN: "下架成功",
    SUCCESS_FEEDBACK: "留言好了",
    SUCCESS_SAVEPROFILE: "保存个人信息",
    SUCCESS_TARGET: "目的地更新成功",
    SUCCESS_TARGETCREATE: "目的地创建成功",
    SUCCESS_CONTENT: "潜点内容更新"
}

export default {
    request: axios,
    dialog: Dialog,
    msg: MSG,
    qs: qs,
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

    //广告
    addClickCount: baseUrl + '/app/advert/api/v1/addClickCount', //增加点击次数
    advertList: baseUrl + '/app/advert/api/v1/advertList', //广告列表

    //浏览历史
    addBrowserHistory: baseUrl + '/app/diveSite/api/v1/addBrowserHistory', //添加浏览历史
    browserHistoryList: baseUrl + '/app/diveSite/api/v1/browserHistoryList', //浏览历史列表


    //潜点收藏
    addCollect: baseUrl + '/app/diveCollect/api/v1/addCollect', //收藏
    cancelCollect: baseUrl + '/app/diveCollect/api/v1/cancelCollect',//取消收藏
    collectList: baseUrl + '/app/diveCollect/api/v1/collectList', //我的收藏

    //潜点详情类
    collectionDive: baseUrl + '/app/diveContent/api/v1/collectionDive', //收藏后收藏数+1
    disCollectionDive: baseUrl + '/app/diveContent/api/v1/disCollectionDive',//取消收藏后收藏数-1
    disLikeDive: baseUrl + '/app/diveContent/api/v1/disLikeDive', //取消点赞后点赞数-1
    likeDive: baseUrl + '/app/diveContent/api/v1/likeDive', //点赞后点赞数+1
    selectCollectionDive: baseUrl + '/app/diveContent/api/v1/selectCollectionDive', //查询总的收藏数
    selectLikeDive: baseUrl + '/app/diveContent/api/v1/selectLikeDive', //查询总的点赞数
    selectShareDive: baseUrl + '/app/diveContent/api/v1/selectShareDive', //查询总的分享数
    shareDive: baseUrl + '/app/diveContent/api/v1/shareDive', //分享后分享数+1，不可取消

    //反馈
    addFeedback: baseUrl + '/app/feedback/api/v1/addFeedback',//提交反馈

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


    //目的地和潜点数据统计类
    selectStatByDestinationName: baseUrl + '/admin/destinationStatistics/api/v1/selectStatByDestinationName',//根据选择的目的地名称查询这个目的地下的所有潜点的分享数，收藏数，点赞数
    selectStatByDiveId: baseUrl + '/admin/destinationStatistics/api/v1/selectStatByDiveId', //根据选择的潜点id查询这个潜点的分享数，收藏数，点赞数
    selectDestinationId: baseUrl + '/admin/destination/api/v1/selectDestinationId', //admin端根据id查询对应的目的地详情


    //管理员admin
    addAdmUser: baseUrl + '/admin/admUser/api/v1/addAdmUser', //添加管理员用户
    admUserInfoById: baseUrl + '/admin/admUser/api/v1/admUserInfoById', //根据id查询用户信息
    admUserList: baseUrl + '/admin/admUser/api/v1/admUserList', //后台用户列表
    deleteById: baseUrl + '/admin/admUser/api/v1/deleteById', //根据Id删除用户
    getAuthByRoleId: baseUrl + '/admin/admUser/api/v1/getAuthByRoleId', //根据角色id查询对应权限
    getAuthByUserId: baseUrl + '/admin/admUser/api/v1/getAuthByUserId', //根据用户id查询对应权限
    adminLogOut: baseUrl + '/admin/admUser/api/v1/logOut', //后台用户退出登陆
    adminLogin: baseUrl + '/admin/admUser/api/v1/login', //后台账号密码登录
    adminMenuList: baseUrl + '/admin/admUser/api/v1/menuList', //查询菜单权限列表
    setRoleMenu: baseUrl + '/admin/admUser/api/v1/setRoleMenu', //设置角色权限
    updateAdmUser: baseUrl + '/admin/admUser/api/v1/updateAdmUser', //更新管理员用户
    updateAdmUserStatus: baseUrl + '/admin/admUser/api/v1/updateAdmUserStatus',//修改用户状态
    selectRole: baseUrl + '/admin/admUser/api/v1/selectRole',//查找角色对应权限
    roleList: baseUrl + '/admin/admUser/api/v1/roleList',//角色列表

    //广告管理admin类
    addAdvert: baseUrl + '/admin/advert/api/v1/addAdvert', //添加广告
    adminAdvertList: baseUrl + '/admin/advert/api/v1/advertList', //广告列表
    advertDes: baseUrl + '/admin/advert/api/v1/advertDes',//根据id查询详情
    deleteAdvert: baseUrl + '/admin/advert/api/v1/deleteAdvert', //删除广告
    deleteBatchAdvert: baseUrl + '/admin/advert/api/v1/deleteBatchAdvert', //批量删除广告
    selectByConditions: baseUrl + '/admin/advert/api/v1/selectByConditions', //条件查询
    shelvesAdvert: baseUrl + '/admin/advert/api/v1/shelvesAdvert', //上架广告
    unShelvesAdvert: baseUrl + '/admin/advert/api/v1/unShelvesAdvert', //下架广告
    updateAdvert: baseUrl + '/admin/advert/api/v1/updateAdvert', //更新广告

    //商家管理admin类
    ExportExcel: baseUrl + '/admin/business/api/v1/ExportExcel', //导出Excel
    importExcel:baseUrl + '/admin/business/api/v1/importExcel', //导入Excel
    addBusiness: baseUrl + '/admin/business/api/v1/addBusiness', //添加商家
    businessInfo: baseUrl + '/admin/business/api/v1/businessInfo', //查询商家详情
    businessList: baseUrl + '/admin/business/api/v1/businessList', //商家列表
    businessListByConditions: baseUrl + '/admin/business/api/v1/businessListByConditions', //条件查询商家列表
    deleteBusiness: baseUrl + '/admin/business/api/v1/deleteBusiness', //根据id删除商家
    updateBusiness: baseUrl + '/admin/business/api/v1/updateBusiness', //更新商家
    importModel:baseUrl +'/admin/business/api/v1/importModel', //获取模板

    //标签类目admin类
    addCategory: baseUrl + '/admin/category/api/v1/addCategory', //添加类目
    categoryList: baseUrl + '/admin/category/api/v1/categoryList', //类目列表
    deleteCategory: baseUrl + '/admin/category/api/v1/deleteCategory', //删除类目
    updateCategory: baseUrl + '/admin/category/api/v1/updateCategory', //修改类目

    //国家字典admin类
    addConutry: baseUrl + '/admin/country/api/v1/addConutry', //admin端新增国家
    deleteCountry: baseUrl + '/admin/country/api/v1/deleteCountry', //admin端删除国家
    selectAllContinent: baseUrl + '/admin/country/api/v1/selectAllContinent', //admin端查询所有的洲
    selectAllCountry: baseUrl + '/admin/country/api/v1/selectAllCountry', //admin端查询所有的国家
    adminSelectCountryByCon: baseUrl + '/admin/country/api/v1/selectCountryByCon', //admin端根据对应的洲查询对应的国家
    updateConutry: baseUrl + '/admin/country/api/v1/updateConutry', //admin端编辑国家

    //目的地Admin类
    addDestination: baseUrl + '/admin/destination/api/v1/addDestination', //admin端添加目的地
    deleteDestination: baseUrl + '/admin/destination/api/v1/deleteDestination', //admin端删除目的地
    selectAllDestination: baseUrl + '/admin/destination/api/v1/selectAllDestination', //admin端查询所有的目的地
    selectDestinationByCountry: baseUrl + '/admin/destination/api/v1/selectDestinationByCountry', //admin端根据所属国家模糊查询
    selectDestinationByName: baseUrl + '/admin/destination/api/v1/selectDestinationByName', //admin端根据目的地名称模糊查询
    selectDestinationByNum: baseUrl + '/admin/destination/api/v1/selectDestinationByNum', //admin端根据编号查询目的地
    selectDestinationByRecommend: baseUrl + '/admin/destination/api/v1/selectDestinationByRecommend', //admin端根据是否推荐查询
    setRecommend: baseUrl + '/admin/destination/api/v1/setRecommend', //admin端设置推荐，推荐传入2，不推荐传入1
    updateDestination: baseUrl + '/admin/destination/api/v1/updateDestination', //admin端编辑目的地
    selectByCountryId: baseUrl + '/admin/destination/api/v1/selectByCountryId',//admin端根据国家id查询目的地列表
    delupDestination:baseUrl +'/admin/destination/api/v1/delupDestination',//删除目的地关联信息并更新目的地信息

    //潜点详情admin类
    addDiveContent: baseUrl + '/admin/divecontent/api/v1/addDiveContent', //admin端添加潜点详情
    cancelPopular: baseUrl + '/admin/divecontent/api/v1/cancelPopular', //admin端取消热门
    deleteDiveContent: baseUrl + '/admin/divecontent/api/v1/deleteDiveContent', //admin端删除潜点详情
    selectAllDiveContent: baseUrl + '/admin/divecontent/api/v1/selectAllDiveContent', //admin端查询所有的潜点详情
    selectDiveContentByBright: baseUrl + '/admin/divecontent/api/v1/selectDiveContentByBright', //admin端根据标签查询潜点详情
    selectDiveContentByCost: baseUrl + '/admin/divecontent/api/v1/selectDiveContentByCost', //admin端根据费用查询潜点详情
    selectDiveContentByDay: baseUrl + '/admin/divecontent/api/v1/selectDiveContentByDay', //admin端根据出行时间查询潜点详情
    selectDiveContentByDes: baseUrl + '/admin/divecontent/api/v1/selectDiveContentByDes', //admin端根据目的地查询潜点详情
    selectDiveContentById: baseUrl + '/admin/divecontent/api/v1/selectDiveContentById', //admin端根据id查询潜点详情
    selectDiveContentByMarine: baseUrl + '/admin/divecontent/api/v1/selectDiveContentByMarine', //admin端根据类目查询潜点详情
    selectDiveContentByName: baseUrl + '/admin/divecontent/api/v1/selectDiveContentByName', //admin端根据潜点名称查询潜点详情
    selectDiveContentByNumber: baseUrl + '/admin/divecontent/api/v1/selectDiveContentByNumber', //admin端根据编号查询潜点详情
    setPopular: baseUrl + '/admin/divecontent/api/v1/setPopular', //admin端设置热门
    updateDiveContent: baseUrl + '/admin/divecontent/api/v1/updateDiveContent', //admin端修改潜点详情

    //潜点admin类
    addAllDiveSit: baseUrl + '/admin/divesit/api/v1/addAllDiveSit',//admin端添加潜点
    deleteDiveSit: baseUrl + '/admin/divesit/api/v1/deleteDiveSit', //admin端删除潜点
    selectAllDiveSit: baseUrl + '/admin/divesit/api/v1/selectAllDiveSit', //admin端查询所有的潜点
    selectDiveSitByDiveId: baseUrl + '/admin/divesit/api/v1/selectDiveSitByDiveId', //admin端根据父潜点id查询对应的子潜点
    selectDiveSitBydes: baseUrl + '/admin/divesit/api/v1/selectDiveSitBydes', //admin端根据目的地id查询对应的潜点
    updateDiveSit: baseUrl + '/admin/divesit/api/v1/updateDiveSit', //admin端修改潜点数据
    addDiveSit: baseUrl + '/admin/divesit/api/v1/addDiveSit', //admin端添加潜点

    //反馈管理admin类
    deleteBatch: baseUrl + '/admin/feedback/api/v1/deleteBatch', //批量删除
    feedbackList: baseUrl + '/admin/feedback/api/v1/feedbackList', //反馈列表
    feedbackListByConditions: baseUrl + '/admin/feedback/api/v1/feedbackListByConditions', //条件查询反馈列表
    handleBatch: baseUrl + '/admin/feedback/api/v1/handleBatch', //批量处理
    handleFeedback: baseUrl + '/admin/feedback/api/v1/handleFeedback', //处理反馈

    //本地文件上传
    aliUpload: baseUrl + '/upload/api/aliUpload', //文件上传至阿里云
    upload: baseUrl + '/upload/api/upload',//文件上传

    //热搜词Admin类
    addHotWord: baseUrl + '/admin/hotWord/api/v1/addHotWord', //添加热搜词
    deleteHotWord: baseUrl + '/admin/hotWord/api/v1/deleteHotWord', //添加热搜词
    hotWordList: baseUrl + '/admin/hotWord/api/v1/hotWordList', //热词列表

    //注册数数据统计
    registerChart: baseUrl + '/admin/registerStatistics/api/v1/registerChart', //注册数据统计图
    registerCount: baseUrl + '/admin/registerStatistics/api/v1/registerCount', //注册数据统计

    //标签管理admin类
    addTag: baseUrl + '/admin/tag/api/v1/addTag', //增加标签
    deleteTag: baseUrl + '/admin/tag/api/v1/deleteTag', //删除标签
    tagList: baseUrl + '/admin/tag/api/v1/tagList', //标签列表
    tagListByConditions: baseUrl + '/admin/tag/api/v1/tagListByConditions', //条件查询标签列表
    tagListBycategoryId: baseUrl + '/admin/tag/api/v1/tagListBycategoryId', //类目id查询标签列表
    updateTag: baseUrl + '/admin/tag/api/v1/updateTag', //更新标签

    //用户管理admin类
    noticeUsers: baseUrl + '/admin/user/api/v1/noticeUsers', //添加消息通知
    noticeList: baseUrl + '/admin/user/api/v1/noticeList', //消息列表
    userByIdOrUserNameOrEmailOrPhone: baseUrl + '/admin/user/api/v1/userByIdOrUserNameOrEmailOrPhone', //通过ID/用户名/邮箱/手机号 查询用户列表
    userList: baseUrl + '/admin/user/api/v1/userList', //用户列表
    userListByConditions: baseUrl + '/admin/user/api/v1/userListByConditions', //筛选用户列表
    alReadList: baseUrl + '/admin/user/api/v1/alReadList',//查找已读消息
    udeleteBatch: baseUrl + '/admin/user/api/v1/deleteBatch', //清空回收站(真删除)
    noticeDesc: baseUrl + '/admin/user/api/v1/noticeDesc', //查看消息详情
    recycleList: baseUrl + '/admin/user/api/v1/recycleList', //查找回收站消息
    restore: baseUrl + '/admin/user/api/v1/restore', //回收站消息还原
    unReadList: baseUrl + '/admin/user/api/v1/unReadList', //查找未读消息
    updateBatchDel: baseUrl + '/admin/user/api/v1/updateBatchDel', //删除消息进回收站
    updateStatus: baseUrl + '/admin/user/api/v1/updateStatus', //修改状态(包括批量)


    //潜点详情扩展数据
    addMsg: baseUrl + '/admin/divecontentext/api/v1/addMsg',//添加数据，传入id,key,value
    deleteMsg: baseUrl + '/admin/divecontentext/api/v1/deleteMsg',//根据主键id进行删除
    selectMsg: baseUrl + '/admin/divecontentext/api/v1/selectMsg', //查询数据，根据contentid进行查询
    updateMsg: baseUrl + '/admin/divecontentext/api/v1/updateMsg', //修改数据，传入id,key,value，根据id修改


}

