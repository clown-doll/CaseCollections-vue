<template>
	<div>
		<Banner :platform="platform"></Banner>
		<Tags :platform="platform"></Tags>
		<List :platform="platform"></List>
		<Pages></Pages>
	</div>
</template>

<script>
    import Banner from './banner.vue'
    import Tags from './tags.vue'
    import List from './caseList.vue'
    import Pages from './pages.vue'

    import Bus from '../Bus'

    export default {
        data () {
            return {
                platform: 'wap'
            }
        },
        components: {
            Banner,
            Tags,
            List,
            Pages,
            Bus
        },
        mounted () {
            this.$nextTick(function () {
                Bus.$on('platform', (data) => {
                    this.platform = !data ? 'wap' : data
                })
                this.backHandle()
            })
        },
        methods: {
            backHandle () {
                if (this.$route.params.platform) {
                    this.platform = this.$route.params.platform
                }
            }
        }
    }
</script>
