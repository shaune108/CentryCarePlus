<?php

use EZPost\Stores\Posts;
use EZPost\Utils\Arr;

if (!is_authed()) redirect('admin/login');
$config = EZPost\Config::getInstance();

$page = Arr::get($_GET, 'page', 1);
$limit = 12;
$offset = ($page - 1) * $limit;

try {
	[$items, $pages] = get_posts($page, $limit);
} catch (Exception $e) {
	$settings_url = resolve_url('admin/settings');
	$html = <<<HTML
		<p>
			There was an error fetching the posts from the database.
		</p>
		<p>
			{$e->getMessage()}
		</p>
		<p>
			<a href="$settings_url">
				Maybe you need to run the migrations?
			</a>
		</p>
	HTML;

	template('error', [
		'code' => 500,
		'title' => 'Internal Server Error',
		'message' => $html
	]);

	exit;
}
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta
		name="viewport"
		content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
	>
	<meta
		http-equiv="X-UA-Compatible"
		content="ie=edge"
	>
	<title>Dashboard | <?= $config->get('app_name') ?></title>

	<?php template('admin/head') ?>
</head>
<body class="admin">
	<?php template('admin/navigation') ?>

	<main class="admin-content admin-posts-list">
		<div class="post-list">
			<?php
			foreach ($items as $post) {
				template('admin/post/card', [
					'post' => $post
				]);
			}
			?>
		</div>

		<?php template('pagination', [
			'page' => $page,
			'pages' => $pages
		]) ?>
	</main>

	<?php template('admin/footer') ?>
</body>
</html>