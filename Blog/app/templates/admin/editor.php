<?php extract(
	template_vars(
		[
			'content' => ''
		]
	)
) ?>
<div class="post-editor">
	<div class="post-editor-toolbar">
		<div class="ql-formats">
			<select
				class="ql-header"
				title="Select Heading"
			>
				<option value="2"></option>
				<option value="3"></option>
				<option selected></option>
			</select>

			<select
				class="ql-size"
				title="Select Font Size"
			></select>

			<!--			<select-->
			<!--				class="ql-font"-->
			<!--				title="Select Font"-->
			<!--			>-->
			<!--			</select>-->
		</div>

		<div class="ql-formats">
			<button
				class="ql-bold"
				title="Bold Text"
			></button>

			<button
				class="ql-italic"
				title="Italicize Text"
			></button>

			<button
				class="ql-underline"
				title="Underline Text"
			></button>

			<button
				class="ql-strike"
				title="Strike Text"
			></button>
		</div>

		<div class="ql-formats">
			<select
				class="ql-color"
				title="Select Text Color"
			></select>

			<select
				class="ql-background"
				title="Select Background Color"
			></select>

			<select
				class="ql-align"
				title="Select Text Alignment"
			></select>
		</div>

		<div class="ql-formats">
			<button
				class="ql-blockquote"
				title="Add Block Quote"
			></button>

			<button
				class="ql-list"
				value="ordered"
				title="Add Ordered List"
			></button>

			<button
				class="ql-list"
				value="bullet"
				title="Add Bullet List"
			></button>
		</div>

		<div class="ql-formats">
			<button
				class="ql-link"
				title="Add Link"
			></button>
			<button
				class="ql-image"
				title="Add Image"
			></button>
		</div>

		<div class="ql-formats">
			<button
				class="view-source"
				title="View Source"
			>
				<i class="fa-solid fa-code"></i>
			</button>

			<button
				class="ql-clean"
				title="Reset Styles"
			></button>

			<!--			<button-->
			<!--				class="fullscreen"-->
			<!--				title="Fullscreen"-->
			<!--			>-->
			<!--				<i class="fa-solid fa-maximize"></i>-->
			<!--				<i class="fa-solid fa-minimize"></i>-->
			<!--			</button>-->
		</div>
	</div>

	<div class="post-editor-content article">
		<?= $content ?>
	</div>

	<textarea
		name="content"
		class="post-editor-textarea"
		style="display: none;"
	>
<?= $content ?>
	</textarea>
</div>