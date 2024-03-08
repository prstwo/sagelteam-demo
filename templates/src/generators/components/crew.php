<?php
/*
$data = [
	'background' => '', default, black
	'illustration' => '',
	'uptitle' => '',
	'headline' => '',
	'subtitle' => '',
	'text' => '',
];
*/

if (!function_exists('generate_component_crew')) {
	function generate_component_crew($data)
	{

		// Settings
		$data_defaults = [
			'lastitem' => false,
		];

		// Bootstrap
		extract(array_merge($data_defaults, $data));
		ob_start();
		// Template
		?>

		<section class="crew">
			<div class="container">
				<div class="crew__header">
					<div>
						<?php echo generate_component_headline([
							'label' => 'unser team',
							'tag' => 'h',
							'tag_class' => 'h2',
							'class' => ' color-light text-content__headline'
						]); ?>
						<?php echo generate_component_headline([
							'label' => 'Subtitle goes here',
							'tag' => 'div',
							'tag_class' => 'h5',
							'class' => 'color-light'
						]); ?>
					</div>
					<div class="crew__filters">
						<ul class="crew__filters__links">
							<li>
								<label class="crew__links__item label" for="crew_filter__all">
									<input type="radio" name="crew-filter" id="crew_filter__all">
									<span>SHOW ALL</span>
								</label>

							</li>
							<li>
								<label class="crew__links__item label" for="crew_filter__trim">
									<input type="radio" name="crew-filter" id="crew_filter__trim">
									<span> TRIM</span>
								</label>
							</li>
							<li>
								<label class="crew__links__item label" for="crew_filter__tactic">
									<input type="radio" name="crew-filter" id="crew_filter__tactic">
									<span> TACTIC</span>
								</label>
							</li>
							<li>
								<label class="crew__links__item label" for="crew_filter__helmsmann">
									<input type="radio" name="crew-filter" id="crew_filter__helmsmann">
									<span> HELMSMANN</span>
								</label>
							</li>
						</ul>
					</div>

				</div>
			</div>
			<div class="crew__members__container">
				<div class="grid-container">
					<?php for ($i = 0; $i < 5; $i++) { ?>
						<div class="grid-item">
							<img src="https://challenge-api.view.agentur-loop.com/members/member1.jpg" alt="Crew Member 1">
							<div class="crew-info">
								<h3>Crew Member 1</h3>
								<p>Information about Crew Member 1</p>
							</div>
						</div>
					<?php } ?>
				</div>

			</div>
		</section>

		<?php
		// Output
		return ob_get_clean();
	}
}
?>