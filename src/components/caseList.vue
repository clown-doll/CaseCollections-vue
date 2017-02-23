<template>
	<div>
		<div class="demo-none"  v-if="count === 0">空空如也~</div>
		<ul class="demo-list clearfix">
			<li v-for="item in result" :key="item._id">
				<router-link :to="'/article/' + item._id">
					<div class="demo-image">
						<img  v-if="item.cover" :src="item.cover" :alt="item.title" :title="item.title">
						<img v-else src="../../src/assets/images/default.jpg" alt="" title="">
					</div>
					<div class="demo-title">{{item.title}}</div>
				</router-link>
				<dl class="demo-tag clearfix">
					<dt>标签：</dt>
					<dd>
						<span v-for="i in item.tags">{{i.name}}</span>
					</dd>
				</dl>
			</li>
		</ul>
	</div>
</template>
<script>
    import * as api from '../api/index'
    import Bus from '../Bus'
    import {COUNT_PERPAGE} from '../../config/page.config'

    export default {
        props: ['platform'],
        data () {
            return {
                result: null,
                count: 0,
                pf: this.platform,
                tag: {
                    id: '',
                    category: 'types'
                },
                waysTag: [],
                typesTag: [],
                curr: 1,
                sort: 'publish_time'
            }
        },
        components: {
            Bus
        },
        computed: {
            tagArr () {
                switch (this.tag.category) {
                    case 'ways':
                        this.waysTag = this.tag.id ? [this.tag.id] : []
                        break
                    case 'types':
                        this.typesTag = this.tag.id ? [this.tag.id] : []
                        break
                    default:
                        this.waysTag = []
                        this.typesTag = []
                        break
                }
                return [...this.typesTag, ...this.waysTag]
            },
            conditions () {
                return {
                    tags: this.tagArr,
                    platform: this.platform,
                    currentPage: this.curr,
                    itemsPerPage: COUNT_PERPAGE,
                    sortName: this.sort
                }
            }
        },
        watch: {
            platform () {
                this.curr = 1
                this.tag = {}
                Bus.$emit('currentpage', this.curr)
            },
            conditions () {
                this.getCasesList(this.conditions)
            }
        },
        mounted () {
            this.$nextTick(function () {
                Bus.$on('platform', (data) => {
                    this.pf = data
                })
                Bus.$on('tag', (data) => {
                    this.tag = data
                })
                Bus.$on('currentpage', (data) => {
                    this.curr = data
                })
                Bus.$on('sort', (data) => {
                    this.sort = data
                })
                this.getCasesList(this.conditions)
            })
        },
        methods: {
            getCasesList (c) {
                api.fetchCases(c).then((response) => {
                    if (response.status === 200) {
                        this.count = response.data.count
                        this.result = response.data.data
                        Bus.$emit('totalCount', this.count)
                    }
                })
            }
        }
    }
</script>

<style>
	.demo-list{  width:1200px; max-width:100%; margin:0 auto; padding-bottom:50px}
	.demo-list li{ height:auto;  background:#fafafa; border-bottom:2px solid #ddd; margin-top:25px; position:relative; border-radius: 5px; float:left; width:23%; margin: 10px 1%; padding:10px; -webkit-box-sizing:border-box; box-sizing:border-box}
	.demo-list li:hover{ box-shadow:0 0 5px rgba(0,0,0,0.3)}
	.demo-list li,.demo-list li a{ -webkit-transition:all 0.2s linear;transition:all 0.2s linear;}
	.demo-list li a:hover{ color:#3e9ef6; text-decoration:none}

	.demo-title{ height:44px; line-height:44px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;font-size: 14px;}
	.demo-image{ width:100%; text-align:center; overflow:hidden; position:relative;}
	.demo-image img{ display:block; width:100%}
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

	.demo-none{ width:1190px; max-width:100%; padding: 250px 0 100px 0; margin:0 auto; background: #fff url("../assets/images/none.gif") no-repeat center 80px; border-radius: 5px; border-bottom:2px solid #ddd; text-align: center; font-size: 18px; color: #c2c2c2;}
</style>
