<script setup>
import { onMounted, defineProps, ref, computed, watch } from 'vue'; // Import the necessary Vue Composition API functions
import btnLoadingGray from './btn-loading-gray.vue';
import { call } from 'Models/http-request.js';
import { useStore } from 'vuex';
// Define props if needed
// Define reactive variables to store fetched data, loading state, and error
const crewMembers = ref(null);
const loading = ref(false);
const error = ref(null);
const loadMoreLoading = ref(false);
// define queries for fetching data
const page = ref(1);
const duty = ref('');
const showLoadMore = ref(true); // define if load more button should be shown
const selectedPageSize = ref(5);

// Function to fetch data from the API
const fetchDataFromAPI = async () => {
	try {
		loading.value = true; // Set loading state to true before making the API call

		// Make the API call using the 'call' function
		// Call the function with the authorization token
		const response = await call(
			`https://challenge-api.view.agentur-loop.com/api/?${
				duty.value && `duty=${duty.value}`
			}&page=${page.value}&limit=${selectedPageSize.value}`,
			'GET',
			false,
			true,
			'0123456789'
		);

		// Update the crewMembers variable with the response
		console.log('crewMembers.value', crewMembers.value);
		if (crewMembers.value !== null) {
			crewMembers.value.data.push(...response.data.data);
		} else {
			crewMembers.value = response.data;
		}
		if (
			crewMembers.value.meta.pagination.current_page >=
			crewMembers.value.meta.pagination.total_pages
		) {
			showLoadMore.value = false;
		} else {
			showLoadMore.value = true;
		}

		// Set loading state to false after fetching data
		loading.value = false;
		loadMoreLoading.value = false; // Set load more loading state to false  after fetching data
	} catch (err) {
		// Handle errors
		error.value = err;
		loading.value = false; // Set loading state to false in case of error
		loadMoreLoading.value = false; // Set load more loading state to false  after fetching data
	}
};
fetchDataFromAPI();
// changing duty
const changeDuty = (dutyString) => {
	duty.value = dutyString;
	crewMembers.value = null;
	page.value = 1;
	fetchDataFromAPI();
};
// default pagesize for fetched data
const pagesizeTotal = ref(6);
// pagesize div in DOM
const selctedNumbersPerRow = ref(5);
const changePageSize = (i) => {
	selctedNumbersPerRow.value = i;
	page.value = 1;
	crewMembers.value = null;
	selectedPageSize.value = i;
};
watch(selectedPageSize, () => {
	fetchDataFromAPI();
});
const crewPagesizeLinks = ref();
const store = useStore();
const windowWidth = computed(() => store.state.windowWidth);
onMounted(() => {
	// suitable pagesize will be selected based on the screen breakpoint
	if (crewPagesizeLinks.value) {
		if (windowWidth.value > 980) {
			selectedPageSize.value = 5;
		} else {
			selectedPageSize.value = 1;
		}
	}
});
// load more
const loadMore = () => {
	page.value = page.value + 1;
	loadMoreLoading.value = true;
	fetchDataFromAPI();
};
</script>

<template>
	<div>
		<section class="crew">
			<div class="container">
				<div class="crew__header">
					<div>
						<h2 class="h2 color-light text-content__headline">
							unser team
						</h2>
						<div class="h5 color-light">Subtitle goes here</div>
					</div>
					<div class="crew__filters">
						<ul class="crew__filters__links">
							<li>
								<label
									class="crew__links__item label"
									for="crew_filter__all"
								>
									<input
										type="radio"
										name="crew-filter"
										id="crew_filter__all"
										@change="changeDuty('')"
										:checked="duty === '' && 'cheecked'"
									/>
									<span>SHOW ALL</span>
								</label>
							</li>
							<li>
								<label
									class="crew__links__item label"
									for="crew_filter__trim"
								>
									<input
										type="radio"
										name="crew-filter"
										id="crew_filter__trim"
										@change="changeDuty('trim')"
										:checked="duty === 'trim' && 'cheecked'"
									/>
									<span> TRIM</span>
								</label>
							</li>
							<li>
								<label
									class="crew__links__item label"
									for="crew_filter__tactic"
								>
									<input
										type="radio"
										name="crew-filter"
										id="crew_filter__tactic"
										@change="changeDuty('tactic')"
										:checked="
											duty === 'tactic' && 'cheecked'
										"
									/>
									<span> TACTIC</span>
								</label>
							</li>
							<li>
								<label
									class="crew__links__item label"
									for="crew_filter__helmsman"
								>
									<input
										type="radio"
										name="crew-filter"
										id="crew_filter__helmsman"
										@change="changeDuty('helmsman')"
										:checked="
											duty === 'helmsman' && 'cheecked'
										"
									/>
									<span> HELMSMANN</span>
								</label>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="crew__members__container">
				<div
					:class="`grid-container-${selctedNumbersPerRow}`"
					v-if="crewMembers"
				>
					<div
						class="grid-item"
						v-for="(crewItem, index) of crewMembers.data"
						:key="index"
					>
						<img :src="crewItem.image" :alt="crewItem.name" />
						<div class="crew-info">
							<h3>Crew Member 1</h3>
							<p>Information about Crew Member 1</p>
						</div>
					</div>
				</div>
				<div
					v-show="
						crewMembers &&
						crewMembers.data &&
						crewMembers.data.length === 0
					"
					class="crew__members__empty"
				>
					No One!
				</div>
				<div
					class="crew__pagesize"
					v-show="
						crewMembers &&
						crewMembers.data &&
						crewMembers.data.length > 0
					"
				>
					<ul class="crew__pagesize__links" ref="crewPagesizeLinks">
						<li v-for="i of pagesizeTotal" :key="i">
							<label
								class="label"
								:class="i > 2 && 'mobile-hidden'"
								:for="`crew_page_${i}`"
							>
								<input
									type="radio"
									name="crew-pagesize"
									:id="`crew_page_${i}`"
									:ref="`crew_page_${i}`"
									:checked="
										selctedNumbersPerRow === i && 'checked'
									"
									@change="changePageSize(i)"
								/>
								<span>{{ i }}</span>
							</label>
						</li>
					</ul>
				</div>
				<div
					class="crew__load-more"
					@click="loadMore"
					v-if="showLoadMore"
				>
					<span v-if="loadMoreLoading === false"> load more </span>
					<btnLoadingGray v-else />
				</div>
			</div>
		</section>
	</div>
</template>
<style lang="scss" scoped>
@mixin linkitem($type: 'false') {
	list-style-type: none;
	padding: 0;
	margin: 0 2.5rem 0 0;
	display: flex;
	align-items: center;

	@if $type== 'true' {
		justify-content: end;
	}
}

.crew {
	background-color: $color-dark;
	padding: 240px 0 0 0;
}

.crew__header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.crew__filters {
	display: flex;
	--navigation-height: 95px;
	align-items: end;
}

.crew__filters__links {
	gap: 52px;

	@include linkitem('false');
}

.crew__links__item {
	input {
		display: none;
	}
}

label.crew__links__item {
	color: $color-light;

	&:has(input:checked) {
		color: $color-primary;
	}
}
.crew__members__empty {
	text-transform: uppercase;
	text-align: center;
	line-height: 1.2;
	font-weight: 700;
	size: 24px;
	color: $color-light;
}
.crew__members__container {
	padding: 112px 0;
}
@media (max-width: 47.49em) {
	.crew__members__container {
		padding: 24px 0;
	}
}
$maximumGridContainers: 6;

@for $i from 1 through $maximumGridContainers {
	.grid-container-#{$i} {
		display: grid;

		@if $i == 1 {
			gap: 0;

			grid-template-columns: minmax(250px, 500px);
			justify-content: center;
		} @else if $i == 2 {
			gap: 10px;

			grid-template-columns: minmax(150px, 300px) minmax(150px, 300px);
			justify-content: center;
		} @else {
			gap: 10px;

			grid-template-columns: repeat(
				#{$i},
				1fr
			); // Set the number of columns dynamically
		}
	}
}

.grid-item {
	position: relative;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	&:hover {
		.crew-info {
			display: block;
		}
	}
}

.crew-info {
	display: none;
	position: absolute;
	top: 0;
	left: 100%;
	background-color: $color-light;
	padding: 10px;
	border: 1px solid #ccc;
}

@media (max-width: 47.49em) {
	.crew__header {
		flex-direction: column;
	}

	.crew__filters {
		justify-content: flex-end;
	}

	.crew__filters__links {
		margin: 24px 0 0 0;
		gap: 8px;
	}

	label.crew__links__item {
		span {
			font-size: 12px;
			font-weight: 400;
		}
	}
}

.crew__pagesize__links {
	@include linkitem('true');
	gap: 16px;
	li label {
		display: block;
		color: $color-light;
		padding: 12px 8px;
		cursor: pointer;
		border-bottom: 1px solid $color-dark;
		input {
			display: none;
		}
		&:has(input:checked) {
			color: $color-primary;
			border-bottom-color: $color-primary;
		}
	}
}
@media (max-width: 47.49em) {
	.crew__pagesize__links {
		margin: 0 0 18px 0;
		justify-content: center;
	}
	li:has(label.mobile-hidden) {
		display: none;
	}
}
.crew__load-more {
	display: block;
	width: 234px;
	height: 67px;
	background-color: $color-light;
	text-transform: uppercase;
	text-align: center;
	cursor: pointer;
	font-weight: 700;
	line-height: 20px;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}
</style>