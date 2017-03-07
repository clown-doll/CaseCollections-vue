<template>
    <div id="app">
        <div class="tool-box">
            <div class="tool clearfix">
                <h1 class="logo hidden"><a href="http://f2e.tming.net.cn/" target="_blank">99编辑部</a></h1>
                <h2>
                    <router-link :to="'/'">创意汇</router-link>
                </h2>
                <a href="javascript:;" class="btn-order" @click="showPop()">我要定制</a>
            </div>
        </div>
        <router-view></router-view>
        <div class="g-ft">
            <div class="g-wrapper"> Copyright &copy; <a title="F2E.TMING" href="http://f2e.tming.net.cn/">F2E.TMING</a> All Rights Reserved.</div>
        </div>

        <transition name="fade">
            <div id="popOrder" v-show="show">
                <div class="pop-cont">
                    <a href="javascript:;" class="pop-close" @click="closePop()"></a>
                    <h4>我们是一支让人放心满意的团队</h4>
                    <p>多年来从事网龙游戏、教育等项目的建设和维护</p>
                    <p>为客户提供快速、高质的多端产品一站式的解决方案</p>
                    <p>如果你有需求，立即联系<span class="red">王文清（998505）</span>或<span class="red">蔡小龙（964732）</span></p>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data () {
            return {
                show: false
            }
        },
        methods: {
            showPop () {
                this.show = true
            },
            closePop () {
                this.show = false
            }
        }
    }
</script>

<style>
    #popOrder{ position:fixed; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:10;}
    .pop-cont{ background:#fff; border-radius:10px; box-shadow: 0 5px 5px rgba(0,0,0,0.7); position:absolute; left:50%; top:50%; -webkit-transform:translate(-50%,-50%);width:480px; max-width:100%;-webkit-box-sizing:border-box; box-sizing:border-box; padding:30px 25px; font-size:14px}
    .pop-close{ background:url(../src/assets/images/close.png) no-repeat right 0; width:40px; height:40px; position:absolute; right:0; top:-43px; opacity:0.8; border-radius:4px}
    .pop-close:hover{ opacity:1}
    .pop-cont h4{ text-align:center; font-size:18px; font-weight:bold;color:#ffa200; margin-bottom:8px}
    .pop-cont p{ padding:3px}
    .pop-cont .red{padding: 0 5px; color: #930}

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>
