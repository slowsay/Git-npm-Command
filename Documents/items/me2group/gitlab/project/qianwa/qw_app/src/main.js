// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/css/main.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';
//import VueCordova from 'vue-cordova';
// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(ElementUI, { size: 'small' });
Vue.use(VueAwesomeSwiper /*, { default global options } */);
Vue.use(Vant);
//Vue.use(VueCordova);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
