<template>
		<icon type="inline" v-html="checkmarkInlineIconSvg"></icon>
</template>

<script>
import checkmarkInlineIcon from 'InlineIcons/checkmark-inline.svg';
export default {
	data () {
		return {
			checkmarkInlineIconSvg: checkmarkInlineIcon,
		};
	},
};
</script>

<style lang="scss" scoped>
</style>
