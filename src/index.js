import Vue from 'vue';
import App from './components/App.vue';

import router from './routers';

import './assets/styles/public.css';

new Vue({
    router,
    el: '#app',
    render: h => h(App)
});