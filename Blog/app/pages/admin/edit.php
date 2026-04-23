<?php

use EZPost\Models\Post;
use EZPost\Stores\Posts;
use EZPost\Utils\Arr;

if (!is_authed()) redirect('admin/login');
$config = EZPost\Config::getInstance();
$posts = new Posts();
$post = isset($_GET['id']) ? $posts->find($_GET['id']) : new Post([
	'publish_date' => date('Y-m-d\TH:i')
]);
if (is_null($post)) redirect('admin/dashboard');

$content = $_POST['content'] ?? $post->getContent();
$data = Arr::pick($_POST, [
	'title',
	'slug',
	'seo_title',
	'description',
	'status',
	'publish_date',
	'keywords',
	'custom_header_code',
	'custom_footer_code'
]);

$alerts = [];

if (REQUEST_METHOD === 'POST') {
	if (!isset($_POST['action']) || !Arr::includes(['save', 'delete'], $_POST['action'])) {
		$alerts[] = [
			'type' => 'error',
			'message' => 'Invalid action.'
		];

		$post->assign($data);
		goto page;
	}

	if ($_POST['action'] === 'delete' && !isset($post->id)) {
		$alerts[] = [
			'type' => 'error',
			'message' => 'Cannot delete a post that has not been created.'
		];

		$post->assign($data);
		goto page;
	} else if ($_POST['action'] === 'delete') {
		$post->delete();
		redirect('admin/dashboard?post_deleted=true');
	}

	if (!empty($data['slug']) && $data['slug'] !== $post->slug) {
		$data['slug'] = slugify($data['slug']);
	} else if (empty($post->slug)) {
		// clamp slug to 50 characters
		$slug = substr($data['title'], 0, 50);
		$data['slug'] = slugify($slug);
	}

	if (isset($data['seo_title'])) {
		$data['seo_title'] = trim($data['seo_title']);
	}

	if (isset($data['keywords'])) {
		$data['keywords'] = trim($data['keywords']);
	}

	if (isset($data['description'])) {
		$data['description'] = trim($data['description']);
	}

	if (isset($data['custom_header_code'])) {
		$data['custom_header_code'] = trim($data['custom_header_code']);
	}

	if (isset($data['custom_footer_code'])) {
		$data['custom_footer_code'] = trim($data['custom_footer_code']);
	}

	$existing = $posts->query(where: [
		'slug' => $data['slug']
	]);

	if (count($existing) > 0 && $existing[0]->id !== $post->id) {
		$alerts[] = [
			'type' => 'error',
			'message' => 'A post with that slug already exists. Please choose a different slug under Advanced.'
		];

		$post->assign($data);
		goto page;
	}

	$post->assign($data);
	$post->save();
	$post->saveContent($content);


	if (isset($_GET['id'])) {
		$alerts[] = [
			'type' => 'success',
			'message' => 'Post updated.'
		];
	} else redirect('admin/edit?id=' . $post->id . '&post_saved=true');
}

page:
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta
		name="viewport"
		content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
	>
	<meta
		http-equiv="X-UA-Compatible"
		content="ie=edge"
	>
	<title>
		<?= $post->id ? 'Edit Post' : 'Create Post' ?> | <?= $config->get('app_name') ?>
	</title>

	<?php template('admin/head') ?>
	<link
		rel="stylesheet"
		href="<?= resolve_url('assets/css/editor.css') ?>"
	/>

	<link
		rel="stylesheet"
		href="<?= resolve_url('assets/content.css') ?>"
	>
</head>
<body class="admin edit">
	<?php template('admin/navigation') ?>

	<main class="admin-content">
		<form
			method="POST"
			class="form edit-form"
		>
			<?php foreach ($alerts as $alert): ?>
				<div
					class="badge <?= $alert['type'] ?>"
				>
					<?= $alert['message'] ?>
				</div>
			<?php endforeach; ?>

			<?php if (isset($_GET['post_saved'])): ?>
				<div
					class="badge success"
				>
					Post saved.
				</div>
			<?php endif; ?>

			<div class="input-field required">
				<label
					for="title"
					class="field-label"
				>
					Title
				</label>

				<input
					type="text"
					name="title"
					id="title"
					class="field-input"
					value="<?= $post->title ?>"
					required
				>
			</div>

			<div class="form-row">
				<div class="input-field">
					<label
						for="status"
						class="field-label"
					>
						Status
					</label>

					<select
						name="status"
						id="status"
						class="field-input"
					>
						<option
							value="draft"
							<?= $post->status === 'draft' ? 'selected' : '' ?>
						>
							Draft
						</option>

						<option
							value="published"
							<?= $post->status === 'published' ? 'selected' : '' ?>
						>
							Published
						</option>
					</select>
				</div>

				<div class="input-field">
					<label for="publish_date">
						Publish Date (<?= date("e") ?>)
					</label>

					<input
						type="datetime-local"
						name="publish_date"
						id="publish_date"
						class="field-input"
						value="<?= $post->publish_date ?>"
					/>
				</div>
			</div>

			<?php template('admin/editor', [
				'content' => $content
			]) ?>

			<div class="input-field">
				<label
					for="seo_title"
					class="field-label"
				>
					SEO Title
				</label>

				<input
					type="text"
					class="field-input"
					name="seo_title"
					id="seo_title"
					value="<?= $post->seo_title ?>"
				>
			</div>

			<div class="input-field">
				<label
					for="keywords"
					class="field-label"
				>
					Keywords
				</label>

				<input
					type="text"
					class="field-input"
					name="keywords"
					id="keywords"
					value="<?= $post->keywords ?>"
				>
			</div>

			<div class="input-field">
				<label
					for="description"
					class="field-label"
				>
					Description
				</label>

				<textarea
					name="description"
					id="description"
					class="field-input"
				>
<?= $post->description ?>
				</textarea>
			</div>

			<details>
				<summary>Advanced</summary>
				<br/>

				<div class="form">
					<div class="input-field">
						<label
							class="field-label"
							for="slug"
						>
							Slug (WARNING: Changing this after publishing can break links)
						</label>

						<input
							type="text"
							name="slug"
							id="slug"
							class="field-input"
							value="<?= $post->slug ?>"
						/>
					</div>

					<div class="input-field">
						<label
							for="custom_header_code"
							class="field-label"
						>
							Custom Header Code
						</label>

						<textarea
							name="custom_header_code"
							id="custom_header_code"
							class="field-input"
						><?= $post->custom_header_code ?></textarea>
					</div>

					<div class="input-field">
						<label
							for="custom_footer_code"
							class="field-label"
						>
							Custom Footer Code
						</label>

						<textarea
							name="custom_footer_code"
							id="custom_footer_code"
							class="field-input"
						><?= $post->custom_footer_code ?></textarea>
					</div>
				</div>
			</details>

			<div class="post-actions">
				<div class="input-field submit">
					<button
						class="button"
					>
						Save
					</button>

					<input
						type="submit"
						name="action"
						class="field-input"
						value="save"
					/>
				</div>

				<?php if ($post->id): ?>
					<div
						class="input-field submit"
					>
						<button
							class="button danger"
						>
							Delete
						</button>

						<input
							id="delete-post"
							type="submit"
							name="action"
							class="field-input"
							value="delete"
						/>
					</div>
				<?php endif; ?>
			</div>


		</form>
	</main>

	<?php template('admin/footer') ?>

	<script
		type="module"
		src="<?= resolve_url('assets/js/editor.js') ?>"
	></script>
</body>
</html>