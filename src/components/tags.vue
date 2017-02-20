<template>
	<dl class="kind">
		<dt>平台：</dt>
		<dd>
			<a href="javascript:;" @click="togglePlatform('wap')" :class="{'on': platform === 'wap'}">移动端</a>
			<a href="javascript:;" @click="togglePlatform('pc')" :class="{'on': platform === 'pc'}">PC端</a>
		</dd>
		<template v-if="platform === 'wap'">
			<dt>类别：</dt>
			<TagsList :platform="platform" :category="category[0]"></TagsList>
			<dt>玩法：</dt>
			<TagsList :platform="platform" :category="category[1]"></TagsList>
		</template>
		<template v-if="platform === 'pc'">
			<dt>类别：</dt>
			<TagsList :platform="platform" :category="category[0]"></TagsList>
		</template>
		<dt>排序：</dt>
		<dd>
			<a href="javascript:;" :class="{'on': sort === 'publish_time'}" @click="changeSort('publish_time')">最新</a>
			<a href="javascript:;" :class="{'on': sort === 'visit_count'}" @click="changeSort('visit_count')">人气</a>
		</dd>
	</dl>
</template>

<script>
    import TagsList from './tagList.vue'
    import Bus from '../Bus'

    export default {
        data () {
            return {
                platform: 'wap',
                category: ['types', 'ways'],
                sort: 'publish_time'
            }
        },
        components: {
            TagsList,
            Bus
        },
        methods: {
            togglePlatform (p) {
                this.platform = p
                Bus.$emit('platform', this.platform)
            },
            changeSort (s) {
                this.sort = s
                Bus.$emit('sort', this.sort)
            }
        }
    }
</script>

<style>
	.kind{ padding:10px; font-size:14px; width:1200px; max-width:100%; margin:0 auto; -webkit-box-sizing:border-box;box-sizing:border-box; padding-left:50px}
	.kind dt{ width:50px; padding-top:3px; float:left; margin-left:-50px; text-align:right; font-weight:bold}
	.kind dd{ padding-bottom:10px}
	.kind dd a{ padding:3px 10px;-webkit-transition:all 0.2s linear;transition:all 0.2s linear;border-radius:6px; display:inline-block; margin-bottom:2px; border: none; background: none;}
	.kind dd a:hover,.kind dd a.on{text-decoration:none;background:#3e9ef6; color:#fff;}
	.kind dd a:hover{background:#0b7be1; }
</style>
