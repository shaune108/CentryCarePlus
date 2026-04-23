<?php
$page = $_GET['page'] ?? 1;
$per_page = $_GET['per_page'] ?? 10;

[$items] = get_posts($page, $per_page);
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

	<title><?= page_title('Embed') ?></title>

	<link
		rel="stylesheet"
		href="<?= resolve_url('assets/blog.css') ?>"
	/>

	<?php template('head') ?>
</head>
<body class="blog-embed-page">
	<main class="blog-page-content">
		<?php template('post-list', [
			'posts' => $items,
			'target' => '_blank'
		]); ?>
	</main>
</body>
</html>
