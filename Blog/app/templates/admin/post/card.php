<?php

use EZPost\Models\Post;

/* @var $post Post */
extract(template_vars([
	'post'
]))
?>
<div class="post-card">
	<h3 class="post-card-title">
		<?= $post->title ?>
	</h3>

	<div class="post-card-meta">
		<span class="post-card-status badge <?= $post->status === 'draft' ? 'warning' : 'success' ?>">
			<?= $post->status ?>
		</span>

		<span class="post-card-publish-date">
			<?= $post->getPublishDate()->format('F j, Y \a\t g:ia') ?>
		</span>
	</div>

	<div class="post-card-description">
		<?= $post->description ?>
	</div>

	<div class="post-card-actions">
		<a
			href="<?= resolve_url('admin/edit?id=' . $post->id) ?>"
			class="button"
		>
			Edit
		</a>

		<a
			href="<?= resolve_url('post/' . $post->slug) ?>"
			class="button"
			target="_blank"
		>
			View
		</a>
	</div>
</div>
