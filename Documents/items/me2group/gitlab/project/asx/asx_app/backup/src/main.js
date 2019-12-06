// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/css/main.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import navTop from '../src/components/navTop.vue'
import nav_bar from './components/navbar'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
import BaiduMap from 'vue-baidu-map'

Vue.component('navbar', nav_bar);
/* VueAwesomeSwiper,{ default global options } */
Vue.use(VueAwesomeSwiper);

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'bBi5rFXwmI6dRUtIoEXQOtdUiByewY16'
})
Vue.component('navTop', navTop)
Vue.use(Vant)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
