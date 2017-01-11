<template>
	<div>
		<Tags></Tags>
		<Cases></Cases>
		<!--<Pages></Pages>-->
	</div>
</template>
<script>
	import Tags from './tags.vue';
	import Cases from './cases.vue';
	import Pages from './pages.vue';

	export default {
		components: {
			Tags,
			Cases,
			Pages
		}
	}
</script>
