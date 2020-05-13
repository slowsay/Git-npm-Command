// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../static/css/main.scss'
import bottom from './page/gw/Bottom'
Vue.config.productionTip = false
Vue.use(ElementUI);
//字定义头部组件
import navbar from '../src/components/nav'
Vue.component('navbar',navbar);
//字定义购物车组件
import rightNav from '../src/components/right_nav'
Vue.component('rightNav',rightNav);
Vue.component('Bottom', bottom)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
