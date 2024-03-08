<?php
/*
$data = [
		'label' => '',
		'tag' => ''
		'tag_class' => '',
		'class' => ''
];
*/

if(!function_exists('generate_component_headline')){
	function generate_component_headline($data){

		// Settings
		$data_defaults = [
			'label' => null,
			'tag' => 'h2',
			'tag_class' => null,
			'class' => null,
		];

		// Bootstrap
		extract(array_merge($data_defaults, $data));
		ob_start();

		// Template
		if($label){
		?>
<<?= $tag; ?> class="<?= $tag_class ? $tag_class : $tag; ?><?= $class ? ' ' . $class : ''; ?>"><?= $label; ?></<?= $tag; ?>>
		<?php
		}
		// Output
		return ob_get_clean();
	}
}
?>