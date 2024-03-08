<!-- <script setup>
import { onMounted, defineProps, ref, computed } from 'vue'; // Import the necessary Vue Composition API functions
import { useStore } from 'vuex';
</script> -->
<template>
	<div class="footer" id="#contact">
		<div class="container">
			<div class="footer__two__parts">
				<div class="footer__left">
					<a href="#" class="footer__logo">
						<img
							class="footer__logo__image"
							src="/assets/images/logo.svg"
							alt="Segelteam"
						/>
					</a>
				</div>
				<div class="footer__right"></div>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.footer {
	width: 100%;
}
.footer__two__parts {
	width: 100%;
	display: flex;
	flex-direction: row;
}
.footer__right,
.footer-_left {
	width: 50%;
	padding-top: 240px;
	padding-bottom: 120px;
}
.footer__right {
	padding-left: 120px;
	background-color: $color-primary;
}
.footer1__left {
	padding-right: 120px;
	background-color: $color-dark;
}
@media (max-width: 47.49em) {
	.footer__two__parts {
		display: block;
	}
	.footer__right,
	.footer__left {
		width: 100%;
	}
}
</style>
