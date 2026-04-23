<?php extract(template_vars(['links'])); ?>

<menu class="hil-menu">
	<?php foreach($links as $link) :?>
	<a href="<?= format_menu_href($link) ?>" class="hil-menu-link">
		<?= $link ?>
	</a>
	<?php endforeach; ?>
</menu>
