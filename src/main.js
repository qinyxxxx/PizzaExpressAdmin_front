import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import VueAMap from 'vue-amap';
import { lazyAMapApiLoaderInstance } from 'vue-amap';
import axios from 'axios';
// import http from './utils/request'

// import '../static/css/theme-green/index.css';       // 浅绿色主题
import './assets/css/icon.css';
import './assets/icon/iconfont.css';
// import 'iview/dist/styles/iview.css';
import './components/common/directives';
import "babel-polyfill";

Vue.config.productionTip = false
Vue.use(ElementUI, {
    size: 'small'
});
Vue.prototype.$axios = axios.create({
    baseURL: "http://172.30.229.132:8080",
});

Vue.use(VueAMap);
const GaoDeMapKey = 'f8cc2d6180a0320a83187b387203cf0e'
VueAMap.initAMapApiLoader({
  key: GaoDeMapKey,
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 
            'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor',
            'Geolocation', 'Geocoder','AMap.Geocoder'],
  uiVersion: '1.0',
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

lazyAMapApiLoaderInstance.load().then(() => {
    // your code ...
    this.map = new AMap.Map('amapContainer', {
      center: new AMap.LngLat(121.59996, 31.197646)
    });
  });

// Vue.use(iView)
//使用钩子函数对路由进行权限跳转
// else if (to.meta.permission) {
//     // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//     role === 'admin' ? next() : next('/403');
// } 
// router.beforeEach((to, from, next) => {
//     let account = sessionStorage.getItem('account');
//     console.log(account)
//     if (to.path == '/login') {
//         // console.log("path==login")
//         next();
//     }
//     else if (account) {
//         console.log("account")
//         next();
//     } else {
//         console.log("没有登录")
//         next('/login');
//     }
// })

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')