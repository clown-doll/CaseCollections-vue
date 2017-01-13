/*
* @Author: Administrator
* @Date:   2016-12-31 17:20:32
* @Last Modified by:   Administrator
* @Last Modified time: 2017-01-06 18:58:11
*/

import Vue from 'vue';
import App from './components/App.vue';
import VueResource from 'vue-resource'

import router from './routers';

Vue.use(VueResource);

// HTTP相关
Vue.http.options.crossOrigin = true;
Vue.http.options.credentials = true;

// 拦截器
Vue.http.interceptors.push(function (request, next) {
    this.showLoading = true;
    next(function (response) {
        this.showLoading = false;
        return response;
    });
});

import './assets/styles/public.css';

new Vue({
    router,
    el: '#app',
    render: h => h(App)
});