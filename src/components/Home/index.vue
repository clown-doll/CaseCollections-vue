<template>
	<div>
		<loading v-show="showLoading" ></loading>

		<Tags v-bind:category = 'category' v-bind:wapTypesConditions = 'wapTypesConditions' v-bind:wapWaysConditions = 'wapWaysConditions' v-bind:pcTypesConditions = 'pcTypesConditions' v-bind:sortName = 'sortName' v-on:change-data="tagListen"></Tags>
		<Cases v-bind:pageList = 'pageList'></Cases>
		<Pages v-bind:totalCount = 'totalCount' v-on:page-change="listen"></Pages>
	</div>
</template>
<script>
	import Tags from './tags.vue';
	import Cases from './cases.vue';
	import Pages from './pages.vue';
	import loading from '../loading.vue';

	import {API_ROOT, COUNT_PERPAGE} from '../../config';

	export default {
		data(){
			return {
				articlesUrl: `${API_ROOT}/articles/`,
				wapTypesConditions: '',
				wapWaysConditions: '',
				pcTypesConditions: '',
				category: '',
				sortName: 'publish_time',
				finalTags: [],
				pageList: [],
				totalCount: 0,
				curr: 1,
				showLoading: false
			}
		},
		created: function () {
			this.getArticleList(this.getFinalUrl());
		},
		components: {
			Tags,
			Cases,
			Pages,
			loading
		},
		methods: {
			getFinalUrl: function (id, category, sort) {

				this.category = category;

				switch (this.category) {
					case 'wapTypes':
						this.wapTypesConditions = id;
						break;
					case 'wapWays':
						this.wapWaysConditions = id;
						break;
					case 'pcTypes':
						this.pcTypesConditions = id;
						break;
				}

				if (sort) {
					this.sortName = sort;
				}

				var finalUrl = '';

				if (!this.finalTags) {
					finalUrl = this.articlesUrl;
				} else {
					if (this.platform === 'pc') {
						this.finalTags = [this.pcTypesConditions];
					} else {
						this.finalTags = [this.wapTypesConditions, this.wapWaysConditions];
					}

					finalUrl = `${this.articlesUrl}?tags=${this.finalTags}&sortName=${this.sortName}&currentPage=${this.curr}&itemsPerPage=${COUNT_PERPAGE}`;
				}

				return finalUrl;
			},
			getArticleList: function (url) {
				this.$http.get(url)
					.then((response) => {
							if (response.data) {
								this.pageList = response.data.data;
								this.totalCount = response.data.count;
							}
					}).catch((response) => {
							console.log(response);
					});
			},
			listen: function (page) {
				this.curr = page;
				this.getArticleList(this.getFinalUrl());
			},
			tagListen: function (url) {
				this.getArticleList(url);
			}
		}
	}
</script>
