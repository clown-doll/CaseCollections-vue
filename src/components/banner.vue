<template>
	<div class="header">
		<div class="intro">
			<template v-if="platform === 'wap'">
				<h3>最火爆的H5新玩法，让粉丝停下不想走</h3>
				<p>为用户提供包括VR/AR互动场景、微信小游戏、品牌宣传、双屏互动等解决方案，全面满足各部门营销推广需求。</p>
			</template>
			<template v-if="platform === 'pc'">
				<h3>挖掘最优质的用户体验设计，用技术为产品提供无限可能</h3>
				<p>通过品牌建设、互动设计等，帮助产品与用户建立有效的沟通机制，实现真正意义上的商业价值。</p>
			</template>
		</div>
	</div>
</template>

<script>
    export default {
        props: ['platform']
    }
</script>
