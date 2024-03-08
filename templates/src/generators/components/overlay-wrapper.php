<?php
/*
$data = [
	'size' => '',
	'close_icon' => true,
	'content' => ''
];
*/

if(!function_exists('generate_component_overlay_wrapper')){
	function generate_component_overlay_wrapper($data){

		// Settings
		$data_defaults = [
				'size' => 'default',
				'close_icon' => true,
				'content' => null
		];

		// Bootstrap
		extract(array_merge($data_defaults, $data));
		ob_start();
		// Template
		?>

<div class="overlay__content overlay__content--<?= $size; ?> js-overlay__content">
	<?php if($close_icon){ 
	echo generate_component_icon([
		'name' => 'close',
		'type' => 'symbol',
		'class' => 'overlay__close js-overlay__close'
	]); 
	}	?>
	<?= $content; ?>
</div>

		<?php
		// Output
		return ob_get_clean();
	}
}
?>