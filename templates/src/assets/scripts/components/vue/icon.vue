<template>
	<div class="icon">
		<slot v-if="type === 'inline'"></slot>
		<svg v-else><use :xlink:href="assetsUrl + 'icons/symbols.svg#icon-' + name" /></svg>
	</div>
</template>

<script>
import * as ProjectConfig from 'Models/utils/project-config';
export default {
	props: {
		name: {
			type: String,
		},
		type: {
			default: 'inline', // inline | symbol
			type: String,
		},
	},
	data () {
		return {
			assetsUrl: ProjectConfig.get('assetsUrl'),
		};
	},
};
</script>
