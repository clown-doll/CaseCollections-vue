<template>
    <div id="app">
        <div class="tool-box">
            <div class="tool clearfix">
                <h1 class="logo hidden"><a href="http://f2e.tming.net.cn/" target="_blank">99编辑部</a></h1>
                <h2><span>创意汇</span></h2>
                <a href="javascript:;" class="btn-order">我要定制</a>
            </div>
        </div>
        <div class="header">
            <div class="intro">
                <h3>最火爆的H5新玩法，让粉丝停下不想走</h3>
                <p>为用户提供包括VR/AR互动场景、微信小游戏、品牌宣传、双屏互动等解决方案，全面满足各部门营销推广需求</p>
            </div>
        </div>
        <router-view></router-view>
        <div class="g-ft">
            <div class="g-wrapper"> Copyright &copy; <a title="F2E.TMING" href="http://f2e.tming.net.cn/">F2E.TMING</a> All Rights Reserved.</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

