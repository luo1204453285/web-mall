import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import store from './store/index'
import FastClick from 'fastclick'
import BScroll from 'better-scroll'
import App from './app'
import './assets/less/reset.css'
// import './assets/less/base.less'
import './assets/less/reset-vux.less'
import 'vux/src/styles/1px.less';
import wxShare from './common/wxshare';
import { AlertPlugin, ToastPlugin, LoadingPlugin, ConfirmPlugin } from 'vux'
import { vpImgDefault, vpPageStatus } from 'components'
import {httpGet, httpPost ,httpPostnoLoad} from './service/index';
import Statis from './directives/mta'
// import Vconsole from 'vconsole'
// const vConsole = new Vconsole()
window.isLocal = (location.href.indexOf('localhost') > -1)


Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)

Vue.use(VueRouter)



Vue.prototype.$wxShare = wxShare;



Vue.prototype.$get = httpGet; //get请求
Vue.prototype.$post = httpPost; //post 请求
Vue.prototype.BScroll = BScroll; //post 请求
Vue.prototype.$postNoload = httpPostnoLoad; //post 请求 不控制load层
Vue.prototype.regex = {
    phone: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
}
Vue.component('vpImgDefault', vpImgDefault);//默认图片
Vue.component('vpPageStatus', vpPageStatus);//缺省页
const router = new VueRouter({
    routes
})
Vue.directive('keyBoard', {
        inserted: function(el) {
            const oHeight = document.body.clientHeight;
            window.addEventListener('resize', function(params) {
                if (oHeight > document.body.clientHeight) {//键盘弹出
                    el.scrollIntoView(false);
                } 
            }, false);
        }
    })
    //价格过滤器 格式 ￥20.00
Vue.filter('currency', function(value) {
    if (!value) return '￥0.00'
    return `￥${(value/100).toFixed(2)}`
});
//价格过滤器 格式 20.00元
Vue.filter('price', function(value) {
    if (!value) return '0.00元'
    return `${(value/100).toFixed(2)}元`
});
//价格过滤器 格式 20.00
Vue.filter('numprice', function(value) {
    if (!value) return '0.00'
    return `${(value/100).toFixed(2)}`
});
//时间过滤器 格式 2017-04-18
Vue.filter('time', function(value) {
    var d = new Date(value);
    return formatDate(d)
});
// 销量过滤
Vue.filter('prosales', function(value) {
    let virtualSales = value[0]? parseInt(value[0]) : 0
    let sellNumber = value[1]? parseInt(value[1]) : 0
    return  virtualSales + sellNumber
});

function formatDate(now) {
    var year = now.getFullYear();
    //console.log(year)
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}
router.beforeEach((to, from, next) => { 
    document.title = to.meta.title || '最河北'
  next()
})
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})

// if ('addEventListener' in document) {
//     document.addEventListener('DOMContentLoaded', function() {
//         FastClick.attach(document.body);
//     }, false);
// }