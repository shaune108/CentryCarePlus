<?php
extract(template_vars([
	'per_page',
	'page',
	'total'
]));

$pages = ceil($total/$per_page);
$adjacents = 4;
$links = [];

$prev = max($page - $adjacents, 1);

if($prev > 1 && $page > $adjacents + 1) {
	$links[] = 1;
	$links[] = 'spacer';
}

for($i = $prev; $i <= min($page + $adjacents, $pages); $i++) {
	$links[] = $i;
}

if($i - 1 < $pages) {
	$links[] = 'spacer';
	$links[] = $pages;
}
?>

<div class="hil-pagination">
	<?= template_part('print-friendly') ?>

	<div class="info">
		Page <?= $page ?> of <?= $pages ?>
	</div>	

	<menu class="pages">
		<?php foreach($links as $link) {
			template_part('paginate-list-link', [
				'page' => $link,
				'active' => $link == $page
			]);
		} ?>
	</menu>
</div>
