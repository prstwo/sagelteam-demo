<?php
$project_config = [
	'assetsUrl' => $assets_uri,
	// 'gtmID' => 'GTM-5XFMT2M'
];
?>
<script id="project-config" type="application/json"><?php echo json_encode($project_config); ?></script>
<script type="text/javascript">
	window.publicPaths = {
		js: '/assets/scripts/'
	};
</script>