<script setup>
import { ref } from 'vue'; // Import the necessary Vue Composition API functions
// import { useStore } from 'vuex';
const footerRightPartOne = ref([
	{
		name: 'About us',
		href: '#',
	},
	{
		name: 'Gallery',
		href: '#gallery',
	},
	{
		name: 'Crew',
		href: '#crew',
	},
	{
		name: 'Contact',
		href: '#contact',
	},
]);
const footerRightPartTwo = ref([
	{
		name: 'Impressum',
		href: '#',
	},
	{
		name: 'Datenschutz',
		href: '#',
	},
	{
		name: 'Rechtliches',
		href: '#',
	},
	{
		name: 'Copyright',
		href: '#',
	},
]);
</script>
<template>
	<section class="footer" id="contact">
		<div class="footer__two__parts">
			<div class="footer__left">
				<a href="#" class="footer__logo">
					<img
						class="footer__logo__image"
						src="/assets/images/logo.svg"
						alt="Segelteam"
					/>
				</a>
				<div class="footer__copyright">
					© 2021. Segel-Team. Alle Rechte vorbehalten
				</div>
			</div>
			<div class="footer__right">
				<div class="footer__links">
					<ul>
						<li
							v-for="(item, index) of footerRightPartOne"
							:key="index"
						>
							<a :href="item.href">{{ item.name }}</a>
						</li>
					</ul>
					<ul>
						<li
							v-for="(item, index) of footerRightPartTwo"
							:key="index"
						>
							<a :href="item.href">{{ item.name }}</a>
						</li>
					</ul>
				</div>
				<div class="footer__social">
					<a
						target="_blank"
						href="https://icons8.com/icon/437/facebook"
						alt="facebook icon by icons8"
					>
						<img
							src="/assets/images/social/facebook-icon.png"
							alt=""
						/>
					</a>
					<a
						target="_blank"
						href="https://icons8.com/icon/437/twitter"
						alt="twitter icon by icons8"
					>
						<img
							src="/assets/images/social/twitter-icon.png"
							alt=""
						/>
					</a>
					<a
						target="_blank"
						href="https://icons8.com/icon/437/instagram"
						alt="instagram icon by icons8"
					>
						<img
							src="/assets/images/social/instagram-icon.png"
							alt=""
						/>
					</a>
					<a
						target="_blank"
						href="https://icons8.com/icon/437/youtube"
						alt="youtube icon by icons8"
					>
						<img
							src="/assets/images/social/youtube-icon.png"
							alt=""
						/>
					</a>
				</div>
			</div>
		</div>
	</section>
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
.footer__left {
	width: 50%;
	padding-top: 72px;
	padding-bottom: 36px;
	height: 444px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.footer__right {
	padding-left: 120px;
	padding-right: 80px;
	background-color: $color-primary;
}
.footer__left {
	padding-right: 120px;
	padding-left: 80px;

	background-color: $color-dark;
}
@media (max-width: 47.49em) {
	.footer__two__parts {
		display: flex;
		flex-direction: column-reverse;
	}
	.footer__right,
	.footer__left {
		width: 100%;
	}
	.footer__left {
		padding-right: 20px;
		padding-left: 20px;
		height: 162px;
		padding-top: 32px;
	}
	.footer__right {
		padding-right: 20px;
		padding-left: 20px;
	}
}
.footer__right .footer__links {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: start;
	align-items: flex-start;
	ul {
		margin-block-start: 0;
		margin-block-end: 0;
		padding-inline-start:0;
	}
	ul:not(:first-child){
		padding-left: 40px;
	}
	ul li {
		list-style-type: none;
		padding: 16px 0;
		a {
			display: block;
			color: $color-light;
		}
	}
	ul:first-of-type {
		margin-right: 4rem;
	}
}
.footer__logo {
	display: block;
	width: 416px;
	height: auto;
}
@media (max-width: 47.49em) {
	.footer__logo {
		width: 80%;
		height: auto;
	}
}
.footer__copyright {
	font-size: 14px;
	color: $color-light;
}
.footer__social {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	a {
		display: block;
		margin-right: 32px;
	}
	img {
		width: 24px;
		height: auto;
	}
}
</style>
