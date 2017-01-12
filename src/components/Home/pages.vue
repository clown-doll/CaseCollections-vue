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
		<li v-if="currentpage!==1">
			<a v-on:click="currentpage--">上一页</a>
		</li>
		<li v-for="index in pagenums"  v-bind:class="{ 'active': currentpage == index}">
			<a v-on:click="pageChange(index)">{{ index }}</a>
		</li>
		<li v-if="currentpage!==totlepage && totlepage !==0 ">
			<a v-on:click="currentpage++">下一页</a>
		</li>
	</ul>
</template>

<script>
	import Bus from '../../Bus';
	import {API_ROOT, COUNT_PERPAGE} from '../../config';

	export default {
		props: {
			totalCount: {
				type: Number,
				default: 1,
				validator(value) {
					return value >= 0
				}
			}
		},
		data(){
			return {
				apiUrl: `${API_ROOT}/articles/?tags=,&sortName=publish_time`,
				currentpage: 1,
				totlepage: 0,
				visiblepage: 5
			}
		},
		components: {
			Bus
		},
		computed: {
			//计算属性：返回页码数组，这里会自动进行脏检查，不用$watch();
			pagenums: function(){
				this.totlepage = Math.ceil(this.totalCount/COUNT_PERPAGE);
				//初始化前后页边界
				var lowPage = 1;
				var highPage = this.totlepage;
				var pageArr = [];
				if(this.totlepage > this.visiblepage){//总页数超过可见页数时，进一步处理；
					var subVisiblePage = Math.ceil(this.visiblepage/2);
					if(this.currentpage > subVisiblePage && this.currentpage < this.totlepage - subVisiblePage +1){//处理正常的分页
						lowPage = this.currentpage - subVisiblePage;
						highPage = this.currentpage + subVisiblePage -1;
					}else if(this.currentpage <= subVisiblePage){//处理前几页的逻辑
						lowPage = 1;
						highPage = this.visiblepage;
					}else{//处理后几页的逻辑
						lowPage = this.totlepage - this.visiblepage + 1;
						highPage = this.totlepage;
					}
				}
				//确定了上下page边界后，要准备压入数组中了
				while(lowPage <= highPage){
					pageArr.push(lowPage);
					lowPage ++;
				}

				return pageArr;
			}
		},
		created: function () {
			/*var _self = this;
			Bus.$on('url', function(url) {
				_self.apiUrl = url;
				console.log(_self.apiUrl);
			});*/
		},
		methods: {
			pageChange: function(page){
				if (this.currentpage != page) {
					this.currentpage = page;
					this.$emit('page-change', this.currentpage);
				}
			}
		}
	}
</script>