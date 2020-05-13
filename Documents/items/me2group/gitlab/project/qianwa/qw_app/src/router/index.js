import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/SetUp',
    //   name: '设置',
    //   component: () => import("../pages/SetUp")
    //   },

    {
      path: '/search',
      name: '搜索',
      component: () => import('../page/zxw/search.vue'),
    },
    {
      path: '/search1',
      name: '搜索结果',
      component: () => import('../page/zxw/search1.vue'),
    },
    {
      path: '/classify',
      name: '分类',
      component: () => import('../page/zxw/classify.vue'),
    },
    {
      path: '/Diving',
      name: '潜点详情',
      component: () => import('../page/zxw/Diving.vue'),
    },



    //gw
    {
      path: '/Login',
      name: '登录注册',
      component: () => import('../page/gw/Login.vue'),
    },
    {
      path: '/Binding',
      name: '绑定手机',
      component: () => import('../page/gw/Binding.vue'),
    },
    {
      path: '/Feedback',
      name: '用户反馈',
      component: () => import('../page/gw/Feedback.vue'),
    }, {
      path: '/Personal',
      name: '个人资料',
      component: () => import('../page/gw/Personal.vue'),
    },
    {
      path: '/Collection',
        name: '收藏',
      component: () => import('../page/gw/Collection.vue'),
    },
    {
      path: '/FootPrint',
        name: '足迹',
      component: () => import('../page/gw/FootPrint.vue'),
    },
    {
      path: '/',
      name: '底部Tab',
      redirect: '/index',
      component: () => import('../page/gw/Tab.vue'),
      children: [{
          path: '/index',
          name: '首页',
          component: () => import('../page/zxw/index.vue'),
        },
        {
          path: '/placeDetail',
          name: '地址详情',
          component: () => import('../page/zxw/placeDetail.vue'),
        }, {
          path: 'My',
          name: '绑定手机',
          component: () => import('../page/gw/My.vue'),
        },
        {
          path: 'My',
          name: '我的',
          component: () => import('../page/gw/My.vue'),
        },
        {
          path: 'Set',
          name: '设置',
          component: () => import('../page/gw/Set.vue'),
        }
      ]
    },

  ]
})
