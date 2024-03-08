<?php
/*
$data = [
	'responsive_sources' => [
		[
			'src' => '',
			'media' => '', // use --[breakpoint-name] for mobile first, and --until-[breakpoint-name] for desktop-first, e.g. --tablet or --until-tablet
		]
	],
	'sources' => [
		[
			'src' => '',
			'width' => 760,
		],
	],
	'alt' => ''
	'class' => null,
];
*/

if(!function_exists('generate_component_image')){
	function generate_component_image($data){

		// Settings
		$data_defaults = [
			'responsive_sources' => null,
			'sources' => null,
			'alt' => null,
			'class' => null,
		];

		// Bootstrap
		extract(array_merge($data_defaults, $data));

		// sort responsive_sources
		$responsive_source_items = null;
		$default_image_srcset = null;
		if($responsive_sources && count($responsive_sources)) {
			$responsive_source_items = [];
			foreach($responsive_sources as $source) {
				if(isset($source['media']) && $source['media']) {
					$responsive_source_items[] = $source;
				} else {
					$image_srcset = $source['src'];
				}
			}
		}

		// build src string
		if($sources && count($sources)) {
			$source_strings = [];
			foreach($sources as $source) {
				$source_strings[] = $source['src'] . ' ' . $source['width'] . 'w';
			}
			$image_srcset = implode(',', $source_strings);
		}

		ob_start();

		// Template
		?>
		<picture>
			<?php if($responsive_source_items) { 
				foreach($responsive_source_items as $source) {
			?>
				<source data-srcset="<?= $source['src'] ?>" <?= isset($source['media']) && $source['media'] ? 'media="'.$source['media'].'"' : '' ?> />
			<?php }} ?>
			<img class="lazyload<?= $class ? ' ' . $class : ''; ?>" data-sizes="auto" data-srcset="<?= $image_srcset; ?>"<?= $alt ? ' alt="'. $alt .'"' : '' ?>/>
		</picture>
		<?php

		// Output
		return ob_get_clean();

	}

}
?>