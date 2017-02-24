<template>
	<ul class="pagination">
		<li v-if="currentpage !== 1">
			<a href="javascript:;" @click="prevClick()">上一页</a>
		</li>
		<li v-for="index in pagenums"  :class="{ 'active': currentpage === index}">
			<a href="javascript:;" @click="pageChange(index)">{{ index }}</a>
		</li>
		<li v-if="currentpage !== totalpage && totalpage !==0 ">
			<a href="javascript:;" @click="nextClick()">下一页</a>
		</li>
	</ul>
</template>

<script>
    import Bus from '../Bus'
    import {COUNT_PERPAGE} from '../../config/page.config'

    export default {
        data () {
            return {
                currentpage: localStorage.getItem('conditions') ? JSON.parse(localStorage.getItem('conditions')).currentPage : 1,
                totalpage: 0,
                visiblepage: 5,
                totalCount: 0
            }
        },
        components: {
            Bus
        },
        mounted () {
            this.$nextTick(function () {
                Bus.$on('totalCount', (data) => {
                    this.totalCount = data
                })
                Bus.$on('currentpage', (data) => {
                    this.currentpage = data
                })
            })
        },
        computed: {
            pagenums () {
                this.totalpage = Math.ceil(this.totalCount / COUNT_PERPAGE)

                let lowPage = 1
                let highPage = this.totalpage
                let pageArr = []

                if (this.totalpage > this.visiblepage) {
                    var subVisiblePage = Math.ceil(this.visiblepage / 2)

                    if (this.currentpage > subVisiblePage && this.currentpage < this.totalpage - subVisiblePage + 1) {
                        lowPage = this.currentpage - subVisiblePage
                        highPage = this.currentpage + subVisiblePage - 1
                    } else if (this.currentpage <= subVisiblePage){
                        lowPage = 1
                        highPage = this.visiblepage
                    } else {
                        lowPage = this.totalpage - this.visiblepage + 1
                        highPage = this.totalpage
                    }
                }

                while (lowPage <= highPage) {
                    pageArr.push(lowPage)
                    lowPage++
                }

                return pageArr
            }
        },
        methods: {
            pageChange (page) {
                if (this.currentpage !== page) {
                    this.currentpage = page
                    Bus.$emit('currentpage', this.currentpage)
                }
            },
            prevClick () {
                if (this.currentpage > 0) {
                    this.currentpage--
                    Bus.$emit('currentpage', this.currentpage)
                }
            },
            nextClick () {
                if (this.currentpage < this.totalpage) {
                    this.currentpage++
                    Bus.$emit('currentpage', this.currentpage)
                }
            }
        }
    }
</script>

<style>
	.pagination {  margin: 20px auto;  text-align:center }
	.pagination>li { display: inline; }
	.pagination>li>a, .pagination>li>span { position: relative; display:inline-block; padding: 6px 12px; line-height: 1.42857143; text-decoration: none; color: #337ab7; background-color: #fff; border: 1px solid #ddd; font-size:12px }
	.pagination>li>a:focus, .pagination>li>a:hover, .pagination>li>span:focus, .pagination>li>span:hover { z-index: 2; color: #23527c; background-color: #eee; border-color: #ddd }
	.pagination>.active>a, .pagination>.active>a:focus, .pagination>.active>a:hover, .pagination>.active>span, .pagination>.active>span:focus, .pagination>.active>span:hover { z-index: 2; color: #fff; background-color: #337ab7; border-color: #337ab7; cursor: default }
	.pagination>.disabled>a, .pagination>.disabled>a:focus, .pagination>.disabled>a:hover, .pagination>.disabled>span, .pagination>.disabled>span:focus, .pagination>.disabled>span:hover { color: #777; background-color: #fff; border-color: #ddd; cursor: not-allowed }
</style>
