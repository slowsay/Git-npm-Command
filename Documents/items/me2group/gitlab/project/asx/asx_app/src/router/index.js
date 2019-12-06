import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    //gw
    {
      path: '',
      name: '公共顶底',
      component: () => import("../pages/gw/Index"),
      redirect: '/Home',
      children: [{
          path: 'Home',
          name: '首页',
          component: () => import("../pages/gw/Home"),
        },
        {
          path: '/Login',
            name: '登录页',
          component: () => import("../pages/gw/Login"),
        },
        {
          path: 'Understand',
          name: '了解',
          component: () => import("../pages/gw/Understand"),
        },
        {
          path: 'star',
          name: '明星产品',
          component: () => import("../pages/gw/star"),
        },
        {
          path: 'Mall',
          name: '商城',
          component: () => import("../pages/gw/Mall"),
        }, {
          path: '/Wares',
          name: '商品详细',
          component: () => import("../pages/gw/Wares"),
        },
        {
          path: 'ClassRoom',
          name: '科理教室',
          component: () => import("../pages/gw/ClassRoom"),
        },
        {
          path: 'RecipeDetails',
          name: '菜谱详情',
          component: () => import("../pages/gw/RecipeDetails"),
        },
        {
          path: 'friendSay',
          name: '锅友说',
          component: () => import("../pages/zxw/friendSay"),
        },
      ]
    }, {
      path: '/ShopCar',
      name: '购物车',
      component: () => import("../pages/gw/ShopCar"),
    },
    {
      path: '/Mail',
      name: '站内信',
      component: () => import("../pages/gw/Mail"),
    }, {
      path: '/MailDetail',
      name: '站内信内容',
      component: () => import("../pages/gw/MailDetail"),
    },
    {
      path: '/Reply',
      name: '回复',
      component: () => import("../pages/gw/Reply"),
    },
    {
      path: '/Order_0',
      name: '提交订单',
      component: () => import("../pages/gw/Order_0"),
    },
    {
      path: '/Order_1',
      name: '订单完成',
      component: () => import("../pages/gw/Order_1"),
    },
    {
      path: '/Recipe',
      name: '菜谱分类',
      component: () => import("../pages/gw/Recipe"),
    },

    //zxw
    {
      path: '/personCenter',
      name: '个人中心',
      component: () => import("../pages/zxw/personCenter")
    },
    {
      path: '/myInfo',
      name: '个人信息',
      component: () => import("../pages/zxw/myInfo"),
      meta:{title:'个人信息'}
    },
    {
      path: '/changeName',
      name: '修改昵称',
      component: () => import("../pages/zxw/changeName"),
      meta:{title:'修改昵称'}
    },
    {
      path: '/changePhone',
      name: '修改手机号',
      component: () => import("../pages/zxw/changePhone"),
    },
    {
      path: '/changePhone1',
      name: '修改手机号1',
      component: () => import("../pages/zxw/changePhone1"),
    },
    {
      path: '/changeEmail',
      name: '修改邮箱地址',
      component: () => import("../pages/zxw/changeEmail"),
    },
    {
      path: '/address',
      name: '我的收获地址',
      component: () => import("../pages/zxw/address"),
      meta:{title:'我的收获地址'}
    },
    {
      path: '/addressDetail',
      name: '我的信息地址详情',
      component: () => import("../pages/zxw/addressDetail"),
      meta:{title:'地址详情'}
    },
    {
      path: '/myOrder',
      name: '我的订单',
      component: () => import("../pages/zxw/myOrder"),
      meta:{title:'我的订单'}
    },
    {
      path: '/myOrderDetail',
      name: '订单详情',
      component: () => import("../pages/zxw/myOrderDetail"),
      meta:{title:'订单详情'}
    },
    {
      path: '/afterSale',
      name: '申请售后',
      component: () => import("../pages/zxw/afterSale"),
      meta:{title:'申请售后'}
    },
    {
      path: '/comment',
      name: '发表评价',
      component: () => import("../pages/zxw/comment"),
      meta:{title:'发表评价'}
    },
    {
      path: '/sayDetail',
      name: '评价详情',
      component: () => import("../pages/zxw/sayDetail"),
    },
    {
      path: '/huifuDetail',
      name: '回复详情',
      component: () => import("../pages/zxw/huifuDetail"),
    },
    {
      path: '/myTie',
      name: '我的信息 我的贴子',
      component: () => import("../pages/zxw/myTie"),
    },
    {
      path: '/userInfo',
      name: '他的信息',
      component: () => import("../pages/zxw/userInfo"),
    },
    {
      path: '/atme',
      name: '艾特了我',
      component: () => import("../pages/zxw/atme"),
    },
    {
      path: '/sendTie',
      name: '发送贴子',
      component: () => import("../pages/zxw/sendTie"),
    },
    {
      path: '/changeMotto',
      name: '更改签名',
      component: () => import("../pages/zxw/changeMotto"),
    },
  ]
})
