import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/index'
import ArticleDetail from 'components/detail'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/article/:id',
            component: ArticleDetail
        }
    ]
})
