<template>
	<dd>
		<a href="javascript:;" :class="{'on': -1 === curr}" @click="change('', category, -1)">
			全部
		</a>
		<a href="javascript:;" v-for="(item, index) in result" :class="{'on': index == curr}" @click="change(item._id, item.category, index)">
			{{item.name}}
		</a>
	</dd>
</template>

<script>
    import * as api from '../api/index'
    import Bus from '../Bus'

    export default {
        props: ['platform', 'category', 'currIndex'],
        data () {
            return {
                result: null,
                curr: this.currIndex
            }
        },
        components: {
            Bus
        },
        mounted () {
            this.getTagsList(this.platform, this.category)
        },
        methods: {
            getTagsList (p, c) {
                api.fetchTags(p, c).then((response) => {
                    if (response.status === 200) {
                        this.result = response.data.data
                    }
                })
            },
            change (id, c, i) {
                this.curr = i
                let tagObj = {
                    id: id,
                    category: c,
                    index: i
                }
                localStorage.setItem(this.category, JSON.stringify(tagObj))
                Bus.$emit('tag', tagObj)
            }
        }
    }
</script>

