<template>
	<div>
		<Loading v-show="showLoading" ></Loading>

		<Tags :category = 'category' :wapTypesConditions = 'wapTypesConditions' :wapWaysConditions = 'wapWaysConditions' :pcTypesConditions = 'pcTypesConditions' :sortName = 'sortName' @change-data="tagListen" :platform.sync="platform"></Tags>
		<Cases :pageList = 'pageList'></Cases>
		<Pages :totalCount = 'totalCount' @page-change="listen"></Pages>
	</div>
</template>
<script>
	import Tags from './tags.vue';
	import Cases from './cases.vue';
	import Pages from './pages.vue';
	import Loading from '../loading.vue';

	import {API_ROOT, COUNT_PERPAGE} from '../../config';

	export default {
		data () {
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
				showLoading: false,
				platform: 'wap'
			}
		},
        components: {
            Tags,
            Cases,
            Pages,
            Loading
        },
		mounted () {
            this.$nextTick(function () {
                this.getArticleList(this.getFinalUrl());
            });
		},
		methods: {
            getFinalUrl (id, category, sort) {
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

                let finalUrl = '';
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
            getArticleList (url) {
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
            listen (page) {
                this.curr = page;
                this.getArticleList(this.getFinalUrl());
            },
            tagListen (url) {
                this.getArticleList(url);
            }
		}
	}
</script>
