<?php
/**
 * @var int $page
 * @var int $pages
 */
extract(template_vars([
	'page' => 1,
	'pages' => 1
]));
?>
<div class="pagination">
	<?php if ($page > 1): ?>
		<a
			href="?page=<?= $page - 1 ?>"
			class="pagination-link"
		>
			<< Previous
		</a>
	<?php endif; ?>

	<?php if ($page < $pages): ?>
		<a
			href="?page=<?= $page + 1 ?>"
			class="pagination-link"
		>
			Next >>
		</a>
	<?php endif; ?>
</div>