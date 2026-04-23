<?php
extract(template_vars([
	'links'
]));

$articles = query_db();
?>

<div class="hil-container">
	<?= template_part('sidebar', [
		'links' => $links
	]); ?>

	<?= template_part('main', [
		'articles' => $articles
	]); ?>

	<?= template_part('paginate-list', [
		'per_page' => $articles['per_page'],
		'page' => get_page(),
		'total' => $articles['total']
	]); ?>
</div>
