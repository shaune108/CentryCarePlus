<?php extract(template_vars(['articles'])); ?>

<main class="hil-main">
	<?php if(count($articles['data']) == 0) { ?>
		<p>No articles found.</p>
	<?php } ?>

	<?php foreach($articles['data'] as $article) {
		template_part('article', $article);
	} ?>
</main>
