import Vue from 'vue';
import App from './components/App.vue';
import VueResource from 'vue-resource'

import router from './routers';

Vue.use(VueResource);

// HTTP相关
Vue.http.options.crossOrigin = true
Vue.http.options.credentials = true

import './assets/styles/public.css';

new Vue({
    router,
    el: '#app',
    render: h => h(App)
});