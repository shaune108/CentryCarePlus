<?php
extract(template_vars([
	'page',
	'active' => false,
]));

$class = 'paginate-list-link';

if($active) {
	$class .= ' active';
}

if ($page == 'spacer') { ?>
	<span class="paginate-list-link-spacer">...</span>
<?php } else { ?>
	<a href="<?= format_paginate_href($page) ?>" class="<?= $class ?>">
		<?= $page ?>
	</a>
<?php } ?>
