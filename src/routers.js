/*
* @Author: Administrator
* @Date:   2016-12-31 17:35:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-01-06 18:58:05
*/

import Vue from 'vue';
import VueRouter from 'vue-router';

// 组件
import Home from './components/Home/index.vue';


Vue.use(VueRouter);

// 定义路由
const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', name: '/', component: Home }
        /*{   path: '/', component: Home,
            children: [
                {path: 'pc', components: PC},
                {path: 'wap', components: Wap}
            ]
        }*/
    ]
});

export default router;