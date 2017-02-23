<template>
	<div class="main detail-main">
		<div class="detail-top-bar">
			<h3 class="h5-title">{{result.title}}</h3>
			<router-link :to="{ name: 'home', params: { platform: result.platform }}" class="back">&laquo; 返回</router-link>
		</div>
		<div class="h5-content" v-html="result.content">
		</div>
		<div v-if="result.platform === 'wap'" class="h5-ewm">
			<p align="center" class="red">案例演示，请长按/扫描以下二维码 -></p>
			<p align="center" class="red">识别图中二维码</p>
			<p align="center"><img :src="'http://qr.liantu.com/api.php?text=' + result.case_url" id="ewm"></p>
		</div>
		<div v-if="result.preview" class="h5-view">
			<p><strong>页面效果预览：</strong></p>
			<img :src="result.preview" class="h5-thumb">
		</div>
		<div class="tool-bot">
			<a :href="result.case_url" target="_blank">案例链接</a>
		</div>
	</div>
</template>

<script>
    import * as api from '../api/index'

    export default {
        data () {
            return {
                aid: this.$route.params.id,
                result: {}
            }
        },
        mounted () {
            this.$nextTick(function () {
                this.getDetail(this.aid)
            })
        },
        methods: {
            getDetail (c) {
                api.fetchCaseDetail(c).then((response) => {
                    if (response.status === 200) {
                        this.result = response.data.data
                    }
                })
            }
        }
    }
</script>

<style>
	.sub .intro{ display:none}
	.main{ width:1000px; max-width:100%; margin:0 auto; padding:10px 10px 80px; -webkit-box-sizing:border-box; box-sizing:border-box; font-size:14px}
	.detail-main { margin-top: 70px;}
	.detail-top-bar{ position: relative;}
	.detail-top-bar .back{ position: absolute; right: 0; top: 16px;}
	.detail-top-bar .back:hover{ color: #3e9ef6; text-decoration: none}
	.main img{ display:block; width:100%; margin:0 auto}
	.h5-title{ font-size:24px; border-bottom:1px dashed #dfdfdf; /*margin-bottom:16px;*/ padding:8px 0}
	.h5-content{ padding:20px 0 40px}
	.h5-content p{ padding:5px 0}
	.h5-content ol,.h5-content ul{ list-style:decimal; padding-left:1em}
	.h5-content ol li,.h5-content ul li{ text-indent:0.3em; padding-bottom:8px}
	.h5-ewm{ padding-bottom:16px}
	#ewm{ width:200px}
	.h5-view strong{ display:block; font-size:16px; padding-bottom:8px}
	.tool-bot{ height:50px; background:#fff; position:fixed; left:0; bottom:0; width:100%; text-align:center}
	.tool-bot a{ display:inline-block; margin:5px 5px 0 0 ; background:#3e9ef6; color:#fff; font-size:16px; padding:6px 10px; border-radius:6px}
	.tool-bot a:hover,.tool-bot a:active{ text-decoration:none; background:#0b7be1}

	.h5-show{ width:350px; height:634px; background:url(../../src/assets/images/phone.png) no-repeat; padding-top:46px}
	.h5-show iframe{ width:350px; height:583px}
</style>

