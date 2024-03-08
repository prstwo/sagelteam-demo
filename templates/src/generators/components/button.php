<?php
/*
$data = [
	'style' => '',
	'size' => '',
	'tag' => '',
	'href' => null,
	'label' => null,
	'icon' => null,
	'icon_type' => '',
	'icon_right' => false,
	'secondary_icon' => '',
	'secondary_icon_type' => '',
	'secondary_icon_right' => false,
	'class' => null,
	'custom_attribute' => null,
	'target' => null,
];
*/

if(!function_exists('generate_component_button')){
	function generate_component_button($data){

		// Settings
		$data_defaults = [
			'style' => 'primary',
			'size' => 'default',
			'tag' => 'a',
			'href' => null,
			'label' => null,
			'icon' => null,
			'icon_type' => 'inline',
			'icon_right' => false,
			'secondary_icon' => null,
			'secondary_icon_type' => 'inline',
			'secondary_icon_right' => false,
			'class' => null,
			'custom_attribute' => null,
			'target' => null,
		];

		// Bootstrap
		extract(array_merge($data_defaults, $data));

		$icon_only = $icon && !$label;

		ob_start();

		// Template
		?>
<<?= $tag; ?><?= $href ? ' href="'. $href .'"' : ''; ?><?= $target ? ' target="'. $target .'"' : ''; ?> class="button button--style--<?= $style; ?> button--size--<?= $size; ?><?= $icon_only ? ' button--icon-only' : '' ?><?= $class ? ' ' . $class : ''; ?>"<?= $custom_attribute ? ' ' . $custom_attribute : ''; ?>>
	<div class="button__inner">
		<?php if($secondary_icon){ ?>
			<?php echo generate_component_icon([
				'name' => $secondary_icon,
				'type' => $secondary_icon_type,
				'class' => 'button__icon button__icon--secondary'.($secondary_icon_right ? ' button__icon--secondary--right' : ''),
			]); ?>
		<?php } ?>
		<?php if($icon){ ?>
			<?php echo generate_component_icon([
				'name' => $icon,
				'type' => $icon_type,
				'class' => 'button__icon'.($icon_right ? ' button__icon--right' : ''),
			]); ?>
		<?php } ?>
		<?php if($label){ ?>
			<span class="button__label"><?= $label; ?></span>
		<?php } ?>
	</div>
</<?= $tag; ?>>
		<?php
		// Output
		return ob_get_clean();
	}
}
?>