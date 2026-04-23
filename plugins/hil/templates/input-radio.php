<?php extract(template_vars([
	'label' => false,
	'checked' => null,
	'name',
	'options',
])); ?>

<div class="input-radio">
	<?php if($label) { ?>
		<label for="<?= $name ?>"><?= $label ?></label>
	<?php } ?>

	<div class="options">
		<?php foreach($options as $option) {
			$value = $option['value'];
			$id = $name . '-' . $value;
			?>
			<div class="option">
				<input
					type="radio"
					name="<?= $name ?>"
					value="<?= $value ?>"
					id="<?= $id ?>"
					<?= $value == $checked ? 'checked' : '' ?>
				/>

				<label for="<?= $id ?>">
					<?= $option['label'] ?>
				</label>
			</div>
		<?php } ?>
	</div>
</div>
