<?php
/*
$data = [
		'name' => '',
		'type' => ''
		'class' => '',
];
*/
if(!function_exists('generate_component_icon')){
	function generate_component_icon($data){

		// Settings
		$data_defaults = [
			'name' => null,
			'type' => 'inline', // inline | symbol | custom | image
			'class' => '',
			'tag' => 'div',
		];

		// Bootstrap
		extract(array_merge($data_defaults, $data));

		if(!$name) {
			return 'Please provide icon name';
		}

		ob_start();

		// Template
		echo "<$tag class='icon $class'>";
			global $root_path;
			global $assets_path;
			global $assets_uri;
			if($type === 'inline') {
				$path = $assets_path . 'icons/inline/' . $name . '.svg';
				include($path);
			} else if ($type === 'symbol') {
				echo '<svg><use xlink:href="'. $assets_uri . 'icons/symbols.svg#icon-'. $name .'" /></svg>';
			} else if ($type === 'custom') {
				echo $name;
			} else if ($type === 'image') {
				echo '<img src="'. $name .'"/>';
			}
		echo "</$tag>";

		// Output
		return ob_get_clean();

	}

}
?>