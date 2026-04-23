<?php extract(template_vars(['posts', 'target' => false])); ?>
<div class="post-list">
	<?php foreach ($posts as $post): ?>
		<?php template('post-card', [
			'post' => $post,
			'target' => $target
		]) ?>
	<?php endforeach; ?>
</div>
