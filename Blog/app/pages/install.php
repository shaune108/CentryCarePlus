<?php

use EZPost\Utils\Arr;

$config = EZPost\Config::getInstance();
if ($config->get('installed')) redirect('');

$database = EZPost\Database::getInstance();
$alerts = [];
if (REQUEST_METHOD === 'POST') {
	if (!Arr::hasAll($_POST, [
		'app_name',
		'app_email',
		'username',
		'email',
		'timezone',
		'password',
		'confirm_password'
	])) {
		$alerts[] = 'Please fill out all fields.';
	}

	if (!filter_var($_POST['app_email'], FILTER_VALIDATE_EMAIL)) {
		$alerts[] = 'Invalid app email address.';
	}

	if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
		$alerts[] = 'Invalid email address.';
	}

	if ($_POST['password'] !== $_POST['confirm_password']) {
		$alerts[] = 'Passwords do not match.';
	}

	if (count($alerts)) goto page;

	$config->set('installed', true);
	$config->set('app_name', $_POST['app_name']);
	$config->set('app_email', strtolower($_POST['app_email']));
	$config->set('timezone', $_POST['timezone']);
	$config->set('admin.username', $_POST['username']);
	$config->set('admin.email', strtolower($_POST['email']));
	$config->set('admin.password', password_hash($_POST['password'], PASSWORD_DEFAULT));

	if ($database->hasMigrations()) {
		try {
			$database->runMigrations();
		} catch (Exception $e) {
			$alerts[] = <<<TEXT
				Critical Error: Failed to run migrations.
				<br>
				<br>
				{$e->getMessage()}
			TEXT;

			goto page;
		}
	}

	$config->save();

	redirect('admin/login');
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
	<title>Install | <?= APP_NAME ?></title>

	<link
		rel="stylesheet"
		href="<?= resolve_url('assets/css/global.css') ?>"
	>

	<link
		rel="stylesheet"
		href="<?= resolve_url('assets/css/admin.css') ?>"
	>
</head>
<body class="install">
	<form
		method="POST"
		class="form install-form"
	>
		<h1>Install</h1>

		<?php foreach ($alerts as $alert): ?>
			<div class="badge error">
				<?= $alert ?>
			</div>
		<?php endforeach; ?>

		<div class="input-field required">
			<label
				class="field-label"
				for="app_name"
			>App Name</label>
			<input
				type="text"
				name="app_name"
				id="app_name"
				class="field-input"
				value="<?= APP_NAME ?>"
				required
			>
		</div>

		<div class="input-field required">
			<label
				class="field-label"
				for="app_email"
			>
				App Email
			</label>

			<input
				type="email"
				name="app_email"
				id="app_email"
				class="field-input"
				value="<?= APP_EMAIL ?>"
				required
			>
		</div>

		<div class="input-field required">
			<label
				for="timezone"
				class="field-label"
			>
				Timezone
			</label>

			<select
				name="timezone"
				id="timezone"
				class="field-input"
				required
			>
				<?php foreach (timezone_identifiers_list() as $timezone): ?>
					<option
						value="<?= $timezone ?>"
						<?= $timezone === 'America/New_York' ? 'selected' : '' ?>
					>
						<?= $timezone ?>
					</option>
				<?php endforeach; ?>
			</select>
		</div>

		<div class="input-field required">
			<label
				for="username"
				class="field-label"
			>
				Username
			</label>

			<input
				type="text"
				name="username"
				id="username"
				class="field-input"
				required
				value="admin"
			/>
		</div>

		<div class="input-field required">
			<label
				for="email"
				class="field-label"
			>
				Email
			</label>

			<input
				type="email"
				name="email"
				id="email"
				class="field-input"
				required
			/>
		</div>

		<div class="input-field required">
			<label
				for="password"
				class="field-label"
			>
				Password
			</label>

			<input
				type="password"
				name="password"
				id="password"
				class="field-input"
				required
			/>
		</div>

		<div class="input-field required">
			<label
				for="confirm_password"
				class="field-label"
			>
				Confirm Password
			</label>

			<input
				type="password"
				name="confirm_password"
				id="confirm_password"
				class="field-input"
				required
			/>
		</div>

		<button
			class="button"
			type="submit"
		>
			Install
		</button>
	</form>
</body>
</html>