<template>
	<div>
		<Tags v-bind:wapTypesConditions = 'wapTypesConditions' v-bind:wapWaysConditions = 'wapWaysConditions' v-bind:pcTypesConditions = 'pcTypesConditions' v-bind:sortName = 'sortName'></Tags>
		<Cases v-bind:pageList = 'pageList'></Cases>
		<Pages v-bind:totalCount = 'totalCount' v-on:page-change="listen"></Pages>
	</div>
</template>
<script>
	import Tags from './tags.vue';
	import Cases from './cases.vue';
	import Pages from './pages.vue';

	import {API_ROOT, COUNT_PERPAGE} from '../../config';

	export default {
		data(){
			return {
				articlesUrl: `${API_ROOT}/articles/`,
				wapTypesConditions: '',
				wapWaysConditions: '',
				pcTypesConditions: '',
				sortName: 'publish_time',
				finalTags: [],
				//listData: {},
				pageList: [],
				totalCount: 0,
				curr: 1
			}
		},
		created: function () {
			this.getArticleList(this.getFinalUrl());
		},
		components: {
			Tags,
			Cases,
			Pages
		},
		methods: {
			getFinalUrl: function (id, category, sort) {
				if (category === 'wapTypes') {
					this.wapTypesConditions = id;
				}

				if (category === 'wapWays') {
					this.wapWaysConditions = id;
				}

				if (category === 'pcTypes') {
					this.pcTypesConditions = id;
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

				console.log(finalUrl);

				return finalUrl;
			},
			getArticleList: function (url) {
				//var url = this.getFinalUrl();
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
			}
		}
	}
</script>
