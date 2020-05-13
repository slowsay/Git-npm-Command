import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)


export default new Router({
  routes: [{
    path: '/',
    name: '外层顶和底',
    redirect: '/Login',
    component: () => import("../page/gw/Outside.vue"),
    children: [
      //gw
      {
        path: 'Login',
        name: '登录',
        component: () => import("../page/gw/Login.vue")
      }, {
        path: 'Register',
        name: '注册',
        component: () => import("../page/gw/Register.vue")
      }, {
        path: 'Forget',
        name: '忘记密码',
        component: () => import("../page/gw/Forget.vue")
      },
        {
          path: 'Quicklogin',
            name: '快速登录',
          component: () => import("../page/gw/Quicklogin.vue")
        },
      {
        path: 'Personal',
        name: '个人中心',
        component: () => import("../page/gw/Personal.vue"),
        redirect: '/Personal/Order',
        children: [{
            path: 'Order',
            name: '我的订单',
            component: () => import("../page/gw/Order.vue"),
          },
          {
            path: 'Message',
            name: '我的信息',
            component: () => import("../page/gw/Message.vue"),
          },
          {
            path: 'Collection_0',
            name: '收藏的帖子',
            component: () => import("../page/gw/Collection_0.vue"),
          }, {
            path: 'Collection_1',
            name: '收藏的商品',
            component: () => import("../page/gw/Collection_1.vue"),
          }, {
            path: 'Release',
            name: '我的发布',
            component: () => import("../page/gw/Release.vue"),
          },
          {
            path: 'Integral',
            name: '我的积分',
            component: () => import("../page/gw/Integral.vue"),
          }, {
            path: 'Wallet',
            name: '我的钱包',
            component: () => import("../page/gw/Wallet.vue"),
          },
          {
            path: 'Follow',
            name: '我的关注',
            component: () => import("../page/gw/Follow.vue"),
          },
          {
            path: 'Fans',
            name: '我的粉丝',
            component: () => import("../page/gw/Fans.vue"),
          },
          {
            path: 'Coupon',
            name: '我的优惠卷',
            component: () => import("../page/gw/Coupon.vue"),
          }, {
            path: 'Address',
            name: '新增默认地址',
            component: () => import("../page/gw/Address.vue"),
          },
          {
              path: 'Address1',
                name: '更换默认地址',
                component: () => import("../page/gw/Address1.vue"),
            },
        {
          path: 'Setting',
            name: '消息设置',
          component: () => import("../page/gw/Setting.vue"),
        }
        ]
      },
      //zxw
      {
        path: 'shop',
        name: '商城',
        component: () => import("../page/zxw/shop.vue")
      },
      {
        path: 'shopList',
        name: '商城列表',
        component: () => import("../page/zxw/shopList.vue")
      },
      {
        path: 'shopDetail',
        name: '商品详情',
        component: () => import("../page/zxw/shopDetail.vue")
      },
      {
        path: 'submitOrder',
        name: '提交订单',
        component: () => import("../page/zxw/submitOrder.vue")
      },
      {
        path: 'payPage',
        name: '支付页面',
        component: () => import("../page/zxw/payPage.vue")
      },
      {
        path: 'waitPay',
        name: '等待支付',
        component: () => import("../page/zxw/waitPay.vue")
      },
      {
        path: 'paysuccess',
        name: '支付成功',
        component: () => import("../page/zxw/paysuccess.vue")
      },
      //zch
      {
        path: "index",
        name: "首页",
        component: () => import('../page/zch/index')
      },
      {
        path: "mess",
        name: "消息",
        component: () => import("../page/zch/mess")
      },
      {
        path: "mess_details",
        name: "消息详情",
        component: () => import('../page/zch/mess_details')
      },
      {
        path: "pay",
        name: "充值",
        component: () => import("../page/zch/pay")
      },
      {
        path: "car_shop",
        name: "购物车",
        component: () => import("../page/zch/car_shop")
      },
      {
        path: "key_posts",
        name: "发帖",
        component: () => import("../page/zch/key_posts")
      },
      {
        path: "details",
        name: "帖子详情",
        component: () => import("../page/zch/details")
      }
    ]
  }],
  scrollBehavior(to, from, savedPosition) {
    if (to.name == '等待支付')
      return {
        x: 0,
        y: 0
      }
  }
})
