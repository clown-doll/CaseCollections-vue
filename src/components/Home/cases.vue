<style>
	.demo-list{  width:1200px; max-width:100%; margin:0 auto; padding-bottom:50px}
	.demo-list li{ height:auto;  background:#fafafa; border-bottom:2px solid #ddd; margin-top:25px; position:relative; border-radius: 5px; float:left; width:23%; margin: 10px 1%; padding:10px; -webkit-box-sizing:border-box; box-sizing:border-box}
	.demo-list li:hover{ box-shadow:0 0 5px rgba(0,0,0,0.3)}
	.demo-list li,.demo-list li a{ -webkit-transition:all 0.2s linear;transition:all 0.2s linear;}
	.demo-list li a:hover{ color:#3e9ef6; text-decoration:none}

	.demo-title{ height:44px; line-height:44px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;font-size: 14px;}
	.demo-image{ width:100%; text-align:center; overflow:hidden; position:relative;}
	.demo-image img{ display:block; width:100%}
	.demo-tool{ width:100%; height:30px; line-height:30px; text-align:right; padding:0 20px; -webkit-box-sizing:border-box;box-sizing:border-box;}
	.demo-tool a{/* background:url(../images/heart.png) no-repeat left center;*/ display:inline-block; padding-left:28px; font-size:14px}
	.demo-ti{ position:relative; width:auto; height:auto; overflow:hidden; cursor:pointer;}
	.demo-tag{ padding-left:40px; color:#999}
	.demo-tag dt{ width:40px; float:left; margin-left:-40px; font-weight:bold}
	.demo-tag dd span{ padding:0 2px}

	@media screen and (max-width:1002px){
		.demo-list li{ width:31%}
	}
	@media screen and (max-width:768px){
		.demo-list li{ width:47%}
	}
	@media screen and (max-width:460px){
		.demo-list li{ width:97%}
	}

</style>

<template>
	<div>
		<p v-if="pageList.length === 0">
			暂无资源！
		</p>
		<ul v-else class="demo-list clearfix">
			<li v-for = "item in pageList">
				<router-link :to="'/article/' + item._id">
					<div class="demo-image">
						<img  v-if="item.cover" :src="item.cover" alt="" title="">
						<img  v-else src="../../assets/images/default.jpg" alt="" title="">
					</div>
					<div class="demo-title">{{item.title}}</div>
				</router-link>
				<dl class="demo-tag clearfix">
					<dt>标签：</dt>
					<dd>
						<span>活动宣传</span>
						<span>视频</span>
					</dd>
				</dl>
			</li>
		</ul>
	</div>
</template>

<script>
	import Bus from '../../Bus';

	export default {
		data(){
			return {
				pageList: [],
				totalCount: 0
			}
		},
		components: {
      		Bus
  		},
		created: function () {
			var _self = this;
			Bus.$on('listData', function(data) {
				var pageList = data.data,
					totalCount = data.count;
				console.log(pageList);
				_self.pageList = pageList;
				_self.totalCount = totalCount;

      		});
		},
		methods: {

		}
	}
</script>