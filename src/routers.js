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