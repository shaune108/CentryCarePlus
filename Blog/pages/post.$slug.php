<?php
$post = get_post($_GET['slug'] ?? null);
if (is_null($post)) {
	http_response_code(404);
	template('error', [
		'code' => 404,
		'title' => 'Post not found.'
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

	<meta
		name="description"
		content="<?= $post->description ?>"
	>
	<meta
		name="keywords"
		content="<?= $post->keywords ?>"
	>

	<title>
		<?= page_title(
			empty($post->seo_title)
				? $post->title
				: $post->seo_title
		) ?>
	</title>

	<link
		rel="stylesheet"
		href="<?= resolve_url('assets/blog.css') ?>"
	/>

	<link
		rel="stylesheet"
		href="<?= resolve_url('assets/content.css') ?>"
	>

	<?php
	template('head');
	if ($post->custom_header_code)
		print $post->custom_header_code;
	?>
</head>
<body class="blog-post-page">
	<?php template('header') ?>

	<main class="blog-page-content">
		<article class="article">
			<h1><?= $post->title ?></h1>
			<?= $post->getContent() ?>
		</article>

		<?php template('sidebar') ?>
	</main>

	<?php
	template('footer');
	if ($post->custom_footer_code)
		print $post->custom_footer_code
	?>
</body>
</html>