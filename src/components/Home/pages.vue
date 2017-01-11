<style>
	.pagination {  margin: 20px auto;  text-align:center }
	.pagination>li { display: inline; }
	.pagination>li>a, .pagination>li>span { position: relative; display:inline-block; padding: 6px 12px; line-height: 1.42857143; text-decoration: none; color: #337ab7; background-color: #fff; border: 1px solid #ddd; font-size:12px }
	.pagination>li>a:focus, .pagination>li>a:hover, .pagination>li>span:focus, .pagination>li>span:hover { z-index: 2; color: #23527c; background-color: #eee; border-color: #ddd }
	.pagination>.active>a, .pagination>.active>a:focus, .pagination>.active>a:hover, .pagination>.active>span, .pagination>.active>span:focus, .pagination>.active>span:hover { z-index: 2; color: #fff; background-color: #337ab7; border-color: #337ab7; cursor: default }
	.pagination>.disabled>a, .pagination>.disabled>a:focus, .pagination>.disabled>a:hover, .pagination>.disabled>span, .pagination>.disabled>span:focus, .pagination>.disabled>span:hover { color: #777; background-color: #fff; border-color: #ddd; cursor: not-allowed }
</style>
<template>
	<ul class="pagination">

		{{totalCount}}
		{{apiUrl}}
		<!--<li class="first disabled"><a href="javascript:;" class="page-link">首页</a></li>
		<li class="prev disabled"><a href="javascript:;" class="page-link">上一页</a></li>
		<li class="page active"><a href="javascript:;" class="page-link">1</a></li>
		<li class="page"><a href="javascript:;" class="page-link">2</a></li>
		<li class="page"><a href="javascript:;" class="page-link">3</a></li>
		<li class="page"><a href="javascript:;" class="page-link">4</a></li>
		<li class="page"><a href="javascript:;" class="page-link">5</a></li>
		<li class="next"><a href="javascript:;" class="page-link">下一页</a></li>
		<li class="last"><a href="javascript:;" class="page-link">尾页</a></li>-->
	</ul>
</template>

<script>
	import Bus from '../../Bus';
	import {API_ROOT} from '../../config';

	export default {
		data(){
			return {
				apiUrl: `${API_ROOT}/articles/?tags=,&sortName=publish_time`
			}
		},
		props: ['totalCount'],
		components: {
			Bus
		},
		created: function () {
			this.goPage();
		},
		methods: {
			goPage: function () {
				var _self = this;
				Bus.$on('url', function(url) {
					_self.apiUrl = url;
				})
			}
		}
	}
</script>