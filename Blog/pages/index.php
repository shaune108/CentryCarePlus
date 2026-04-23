<?php
$page = $_GET['page'] ?? 1;
[$items, $pages] = get_posts($page);
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

	<title><?= page_title('Blog') ?></title>

	<link
		rel="stylesheet"
		href="<?= resolve_url('assets/blog.css') ?>"
	/>

	<?php template('head') ?>
</head>
<body class="blog-home-page">
	<?php template('header') ?>

	<main class="blog-page-content">
		<?php
		template('post-list', ['posts' => $items]);
		template('pagination', ['page' => $page, 'pages' => $pages]);
		?>
	</main>

	<?php template('footer') ?>
</body>
</html>
