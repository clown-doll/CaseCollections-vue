<style>
	.kind{ padding:10px; font-size:14px; width:1200px; max-width:100%; margin:0 auto; -webkit-box-sizing:border-box;box-sizing:border-box; padding-left:50px}
	.kind dt{ width:50px; padding-top:3px; float:left; margin-left:-50px; text-align:right; font-weight:bold}
	.kind dd{ padding-bottom:10px}
	.kind dd a{ padding:3px 10px;-webkit-transition:all 0.2s linear;transition:all 0.2s linear;border-radius:6px; display:inline-block; margin-bottom:2px }
	.kind dd a:hover,.kind dd a.on{text-decoration:none;background:#3e9ef6; color:#fff;}
	.kind dd a:hover{background:#0b7be1; }
</style>

<template>
	<dl class="kind">
		<dt>平台：</dt>
		<dd>
			{{wapApiUrl}}
			<a href="index.html" class="on">移动端</a>
			<a href="pc.html">PC端</a>
		</dd>
		<dt>类别：</dt>
		<dd>
			<a href="javascript:;" class="on">全部</a>
			<a href="javascript:;">原创</a>
			<a href="javascript:;">APP下载注册</a>
			<a href="javascript:;">发布会/邀请函</a>
			<a href="javascript:;">公众号加粉推广</a>
			<a href="javascript:;">招聘</a>
			<a href="javascript:;">活动推广</a>
			<a href="javascript:;">产品/品牌推广</a>
			<a href="javascript:;">企业宣传</a>
			<a href="javascript:;">信息收集</a>
			<a href="javascript:;">其他</a>
		</dd>
		<dt>玩法：</dt>
		<dd>
			<a href="javascript:;" class="on">全部</a>
			<a href="javascript:;">摇一摇</a>
			<a href="javascript:;">重力感应</a>
			<a href="javascript:;">红包</a>
			<a href="javascript:;">测试</a>
			<a href="javascript:;">问卷答题</a>
			<a href="javascript:;">照片海报</a>
			<a href="javascript:;">投票拉票集赞</a>
			<a href="javascript:;">GPS</a>
			<a href="javascript:;">信息图</a>
			<a href="javascript:;">收集组装</a>
			<a href="javascript:;">分享助力众筹</a>
			<a href="javascript:;">抽奖</a>
			<a href="javascript:;">弹幕</a>
			<a href="javascript:;">小游戏</a>
			<a href="javascript:;">视频互动</a>
			<a href="javascript:;">语音 录音/识别</a>
			<a href="javascript:;">擦一擦</a>
			<a href="javascript:;">360全景</a>
			<a href="javascript:;">双屏互动</a>
			<a href="javascript:;">手机/微信等客户端模拟</a>
			<a href="javascript:;">其他</a>
		</dd>
		<dt>排序：</dt>
		<dd>
			<a href="javascript:;" class="on">最新</a>
			<a href="javascript:;">人气</a>
		</dd>
	</dl>
</template>
<script>
	import {API_ROOT} from '../../config';

	export default {
		data(){
			return {
				wapTypesUrl: API_ROOT + 'tags/wap/'
			}
		},
		methods: {
			getWapTagTypes: function () {
				this.$htpp.get(this.wapTypesUrl)
					.then((response) => {
						this.$set('wapTypesData', response.data);
					})
					.catch((response) => {
						console.log(response);
					});
			}
		}
	}
</script>