// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import '../static/css/main.css';
import Vant from 'vant';
import 'vant/lib/index.css';
//import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';
//import VueCordova from 'vue-cordova';
// require styles
import 'swiper/dist/css/swiper.css'
//适用于pc
//Vue.use(ElementUI, { size: 'small' });
/*, { default global options } */
Vue.use(VueAwesomeSwiper);
//适用于mobile
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
