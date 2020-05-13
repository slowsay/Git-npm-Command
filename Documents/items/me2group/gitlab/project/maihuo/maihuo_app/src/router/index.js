import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
Vue.use(Router);
import Login from '../page/Login.vue';
import Tabs from '../page/Tab.vue';
import Home from '../page/index.vue';
import My from '../page/My.vue';
export default new Router({
  mode:'history',
  routes: [
    {
      path: '/Login',
      name: '登录注册',
      component: Login,
    },

    {
      path: '/',
      name: '底部Tab',
      redirect: '/index',
      component: Tabs,
      children: [{
        path: '/index',
        name: '首页',
        component: Home,
      },
        {
          path: 'My',
          name: '我的',
          component: My,
        }
      ]
    }
  ]
})
