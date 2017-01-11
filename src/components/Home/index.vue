<template>
	<div>
		<Tags v-bind:wapTypesConditions = 'wapTypesConditions' v-bind:wapWaysConditions = 'wapWaysConditions' v-bind:pcTypesConditions = 'pcTypesConditions' v-bind:sortName = 'sortName'></Tags>
		<Cases v-bind:pageList = 'pageList'></Cases>
		<Pages v-bind:totalCount = 'totalCount'></Pages>
	</div>
</template>
<script>
	import Tags from './tags.vue';
	import Cases from './cases.vue';
	import Pages from './pages.vue';

	import {API_ROOT} from '../../config';

	export default {
		data(){
			return {
				articlesUrl: API_ROOT + '/articles/',
				wapTypesConditions: '',
				wapWaysConditions: '',
				pcTypesConditions: '',
				sortName: 'publish_time',
				finalTags: [],
				//listData: {},
				pageList: [],
				totalCount: 0
			}
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

				return finalUrl;
			},
			getArticleList: function (url) {
				//var url = this.getFinalUrl();
				this.$http.get(url)
					.then((response) => {
							if (response.data) {
							// this.listData = response.data;
							this.pageList = response.data.data;
							this.totalCount = response.data.count;
							//console.log(this.totalCount);
							//Bus.$emit('listData', response.data);
						}
					}).catch((response) => {
							console.log(response);
					});
			}/*,
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
								// this.listData = response.data;
								this.pageList = response.data.data;
								this.totalCount = response.data.count;
							console.log(this.totalCount);
							//Bus.$emit('listData', response.data);
						}
					}).catch((response) => {
							console.log(response);
					});
			}*/
		}
	}
</script>
