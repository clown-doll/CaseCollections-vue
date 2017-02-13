<template>
	<dd>
		<a href="javascript:;" :class="{'on': -1 === currIndex}" @click="change('', category, -1)">
			全部
		</a>
		<a href="javascript:;" v-for="(item, index) in result" :class="{'on': index === currIndex}" @click="change(item._id, item.category, index)">
			{{item.name}}
		</a>
	</dd>
</template>

<script>
    import * as api from '../api/index'
    import Bus from '../Bus'

    export default {
        props: ['platform', 'category'],
        data () {
            return {
                result: null,
                currIndex: -1
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
                this.currIndex = i
                let tagObj = {
                    id: id,
                    category: c
                }
                Bus.$emit('tag', tagObj)
            }
        }
    }
</script>

