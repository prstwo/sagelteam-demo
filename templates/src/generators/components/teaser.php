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

if (!function_exists('generate_component_teaser')) {
	function generate_component_teaser($data)
	{

		// Settings
		$data_defaults = [
			'style' => null,
			'illustration' => null,
			'uptitle' => null,
			'headline' => null,
			'subtitle' => null,
			'text' => null,
		];

		// Bootstrap
		extract(array_merge($data_defaults, $data));
		ob_start();
		// Template
		?>

		<div class="teaser <?= $style ? 'teaser--style--' . $style : '' ?>">
			<?php if ($illustration) { ?>
				<img class="teaser__illustration" src="<?= $illustration ?>" />
			<?php } ?>
			<div class="teaser__content">
				<?php if ($uptitle) { ?>
					<div class="teaser__uptitle label">
						<?= $uptitle ?>
					</div>
				<?php } ?>
				<?php if ($headline) {
					$headline['class'] = 'teaser__headline color-primary';
					echo generate_component_headline($headline);
				} ?>
				<?php if ($subtitle) { ?>
					<div class="teaser__subtitle label">
						<?= $subtitle ?>
					</div>
				<?php } ?>
				<?php if ($text) { ?>
					<div class="teaser__text copy">
						<?= $text ?>
					</div>
				<?php } ?>
			</div>
		</div>

		<?php
		// Output
		return ob_get_clean();
	}
}
?>