<template>
	<div class="main">
		<h3 class="h5-title">{{detailData.title}}</h3>
		<div class="h5-content">
			{{detailData.content}}
		</div>
		<div v-if="isbelong === 'wap'" class="h5-ewm">
			<p align="center" class="red">案例演示，请长按/扫描以下二维码 -></p>
			<p align="center" class="red">识别图中二维码</p>
			<p align="center"><img :src="'http://qr.liantu.com/api.php?text=' + detailData.case_url" id="ewm"></p>
		</div>
		<div v-if="detailData.preview" class="h5-view">
			<p><strong>页面效果预览：</strong></p>
			<img :src="detailData.preview" class="h5-thumb">
		</div>
		<div class="tool-bot">
			<a :href="detailData.case_url">案例链接</a>
		</div>
	</div>
</template>
<script>
	import {API_ROOT} from '../../config';

	export default {
		data () {
			return {
				detailData: '',
				isbelong: '',
				apiUrl: API_ROOT + '/articles/' + this.$route.params.id
			}
		},
		created () {
			this.getDetail();
		},
		methods: {
			getDetail () {
				this.$http.get(this.apiUrl)
					.then((response) => {
						this.detailData = response.data.data;
						this.isbelong = this.detailData.tags[0].platform;
				})
			}
		}
	}
</script>

<style>
	.sub .intro{ display:none}
	.main{ width:1000px; max-width:100%; margin:0 auto; padding:10px 10px 80px; -webkit-box-sizing:border-box; box-sizing:border-box; font-size:14px}
	.main img{ display:block; width:100%; margin:0 auto}
	.h5-title{ font-size:24px; border-bottom:1px solid #e7e7eb; margin-bottom:16px; padding:8px 0}
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

	/*.h5-show{ width:350px; height:634px; background:url(../images/phone.png) no-repeat; padding-top:46px}*/
	.h5-show iframe{ width:350px; height:583px}
</style>