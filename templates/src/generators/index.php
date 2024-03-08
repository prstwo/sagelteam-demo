<?php
foreach (glob($root_path . '/generators/components/*.php') as $filename){
	include $filename;
}
?>
