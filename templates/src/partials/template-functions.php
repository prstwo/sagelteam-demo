<?php
$assets_uri = '/assets/';
$assets_path = $root_path . '/assets/';

function contains($str, array $arr)
{
	foreach($arr as $a) {
		if (stripos($str,$a) !== false) return true;
	}
	return false;
}

function add_file_version($path)
{
	global $root_path;
	$version = is_file($root_path . $path) ? filemtime($root_path . $path) : '';
	return $path . '?v=' . $version;
}
?>
