import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/ret_pass',
    name: '找回密码',
    component: () => import('../page/zch/ret_pass')
  },
  {
    path: "/set_pass",
    name: "重置密码",
    component: () => import("../page/zch/set_pass")
  },
  {
    path: "/rapid_pass",
    name: "快速登录",
    component: () => import("../page/zch/rapid_pass")
  },
  {
    path: "/uesr_are",
    name: "用户协议",
    component: () => import("../page/zch/uesr_aregess")
  },
  {
    path: "/start",
    name: "明星产品",
    component: () => import("../page/zch/start")
  },
  {
    path: "/car_shop",
    name: "购物车",
    component: () => import("../page/zch/car_shop")
  },
  {
    path: "/inmail",
    name: "站内信",
    component: () => import("../page/zch/inmail")
  },
  {
    path: "/classification",
    name: "商品分类",
    component: () => import("../page/zch/classification")
  },
  {
    path: "/posts",
    name: "一键发帖",
    component: () => import("../page/zch/posts")
  },
  {
    path: "/friends",
    name: "锅友说",
    component: () => import("../page/zch/friends")
  },
  {
    path: "/post_deta",
    name: "帖子详情",
    component: () => import("../page/zch/post_deta")
  },
  {
    path: '/Register',
    name: '注册',
    component: () => import('../page/gw/Register')
  },
  {
    path: '/Classroom',
    name: '科里教室',
    component: () => import('../page/gw/Classroom.vue')
  },

  {
    path: '/Detailed',
    name: '料理详细页面',
    component: () => import('../page/gw/Detailed.vue')
  },
  {
    path: "/Classification_0",
    name: '菜谱分类',
    component: () => import('../page/gw/Classification_0.vue')
  },
  {
    path: '/',
    name: '登录',
    component: resolve => require(["../page/zxw/login"], resolve),
  },
  {
    path: '/index',
    name: '首页',
    component: resolve => require(["../page/zxw/index"], resolve),
  },
  {
    path: '/company',
    name: '公司简介',
    component: resolve => require(["../page/zxw/company"], resolve),
  },
  {
    path: '/paySuccess',
    name: '支付成功',
    component: resolve => require(["../page/zxw/paySuccess"], resolve),
  },
  {
    path: '/pay',
    name: '支付订单',
    component: resolve => require(["../page/zxw/pay"], resolve),
  },
  {
    path: '/waitPay',
    name: '订单详情等待支付',
    component: resolve => require(["../page/zxw/waitPay"], resolve),
  },
  {
    path: '/buyNow',
    name: '立即购买',
    component: resolve => require(["../page/zxw/buyNow"], resolve),
  },
  {
    path: '/shopDetail',
    name: '商品详情',
    component: resolve => require(["../page/zxw/shopDetail"], resolve),
  },
  {
    path: '/shop',
    name: '商城',
    component: resolve => require(["../page/zxw/shop"], resolve),
  },
  {
    path: "/aa",
    name: "ceshi",
    component: () => import("../components/right_nav")
  }
  ]
})
