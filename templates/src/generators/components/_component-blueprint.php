<?php
/*
$data = [
];
*/

if(!function_exists('generate_component_blueprint')){
	function generate_component_blueprint($data){

		// Settings
		$data_defaults = [
		];

		// Bootstrap
		extract(array_merge($data_defaults, $data));
		ob_start();
		// Template
		?>

		<?php
		// Output
		return ob_get_clean();
	}
}
?>