<?php extract(template_vars(['links'])); ?>

<aside class="hil-sidebar">
	<form class="hil-search-form">
		<input
			type="text"
			placeholder="Search..."
			title="Search Resources"
			class="search-input"
			name="term"
			value="<?= $_REQUEST['term'] ?? '' ?>"
		/>

		<button type="submit" class="search-btn" title="Search Resources">
			<i class="fa-solid fa-magnifying-glass"></i>
		</button>

		<?= template_part('input-radio', [
			'name' => 'lang',
			'checked' => $_REQUEST['lang'] ?? 1,
			'options' => [
				['value' => 1, 'label' => 'English'],
				['value' => 2, 'label' => 'Spanish'],
			]
		]) ?>
	</form>

	<?= template_part('menu', [
		'links' => $links
	]) ?>
</aside>
