<template>
	<div>
		<Tags></Tags>
		<List></List>
		<Pages></Pages>
	</div>
</template>

<script>
    import Tags from './tags.vue'
    import List from './caseList.vue'
    import Pages from './pages.vue'

    export default {
        components: {
            Tags,
            List,
            Pages
        }
    }
</script>
