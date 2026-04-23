<?php extract(template_vars([
	'title',
	'body',
])); ?>

<article class="hil-article">
	<h1 class="article-title"><?= $title ?></h1>
	<p class="article-body"><?= $body ?></p>
</article>
