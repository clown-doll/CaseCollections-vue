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
			<a v-on:click="getWapTags()" class="on">移动端</a>
			<a v-on:click="getPcTags()">PC端</a>
		</dd>
		<template v-if="platform === 'wap'">
			<dt>类别：</dt>
			<dd>
				<a href="javascript:;" :class="{on: !wapTypesConditions}" v-on:click="getTagArticles('', 'wapTypes', 'publish_time')">全部</a>
				<a v-for="item in wapTypesArr" href="javascript:;"  v-on:click="getTagArticles(item._id, 'wapTypes', 'publish_time')" :class="{on: wapTypesConditions === item._id}">{{item.name}}</a>
			</dd>
			<dt>玩法：</dt>
			<dd>
				<a href="javascript:;" :class="{on: !wapWaysConditions}" v-on:click="getTagArticles('', 'wapWays', 'publish_time')">全部</a>
				<a v-for="item in wapWaysArr" href="javascript:;" v-on:click="getTagArticles(item._id, 'wapWays', 'publish_time')" :class="{on: wapWaysConditions === item._id}">{{item.name}}</a>
			</dd>
		</template>
		<template v-if="platform === 'pc'">
			<dt>类别：</dt>
			<dd>
				<a href="javascript:;" :class="{on: !pcTypesConditions}" v-on:click="getTagArticles('', 'pcTypes', 'publish_time')">全部</a>
				<a v-for="item in pcTypesArr" href="javascript:;" v-on:click="getTagArticles(item._id, 'pcTypes', 'publish_time')" :class="{on: pcTypesConditions === item._id}">{{item.name}}</a>
			</dd>
		</template>
		<dt>排序：</dt>
		<dd>
			<a href="javascript:;" v-on:click="getTagArticles('', tags, 'publish_time')" :class="{on: sortName === 'publish_time'}">最新</a>
			<a href="javascript:;" v-on:click="getTagArticles('', tags, 'visit_count')" :class="{on: sortName === 'visit_count'}">人气</a>
		</dd>
	</dl>
</template>
<script>
	import {API_ROOT} from '../../config';
	import Bus from '../../Bus';

	export default {
		data(){
			return {
				wapUrl: API_ROOT + '/tags/wap/',
				pcUrl: API_ROOT + '/tags/pc/',
				articlesUrl: API_ROOT + '/articles/',
				wapTypesArr: [],
				wapWaysArr: [],
				pcTypesArr: [],
				platform: '',
				wapTypesConditions: '',
				wapWaysConditions: '',
				pcTypesConditions: '',
				sortName: 'publish_time',
				finalTags: []
			}
		},
		components: {
      		Bus
  		},
		created: function () {
			this.getWapTags();
			this.getTagArticles('', this.tags, 'publish_time');
		},
		methods: {
			getWapTags: function () {
				this.platform = 'wap';

				this.$http.get(this.wapUrl)
					.then((response) => {
						if (response.data) {
							const result = response.data.data;
							//console.log(result);
							if (!this.wapWaysArr.length && !this.wapTypesArr.length) {
								result.forEach((curr, index) => {
									if (curr.category === 'ways') {
										this.wapWaysArr.push(curr);
									} else {
										this.wapTypesArr.push(curr);
									}
								})
							}

						}
					}).catch((response) => {
						console.log(response);
					});
			},
			getPcTags: function () {
				this.platform = 'pc';

				this.$http.get(this.pcUrl)
					.then((response) => {
						if (response.data) {
							const result = response.data.data;
							if (!this.pcTypesArr.length) {
								result.forEach((curr, index) => {
									if (curr.category === 'types') {
										this.pcTypesArr.push(curr);
									}
								})
							}
						}
					}).catch((response) => {
						console.log(response);
					});
			},
			getTagArticles: function (id, category, sort) {

				if (category === 'wapTypes') {
					this.wapTypesConditions = id;
				}

				if (category === 'wapWays') {
					this.wapWaysConditions = id;
				}

				if (category === 'pcTypes') {
					this.pcTypesConditions = id;
				}

				this.sortName = sort;

				var finalUrl = '';

				if (!this.finalTags) {
					finalUrl = this.articlesUrl;
				} else {
					if (this.platform === 'pc') {
						this.finalTags = [this.pcTypesConditions];
					} else {
						this.finalTags = [this.wapTypesConditions, this.wapWaysConditions];
					}

					finalUrl = `${this.articlesUrl}?tags=${this.finalTags}&sortName=${this.sortName}`;
				}

				console.log(finalUrl);
				this.$http.get(finalUrl)
					.then((response) => {
						if (response.data) {
							//console.log(response.data);
							Bus.$emit('listData', response.data);
						}
					}).catch((response) => {
						console.log(response);
					});
			}
		}
	}
</script>