<?php

use EZPost\Database;
use EZPost\Utils\Arr;

if (!is_authed()) redirect('admin/login');
$config = EZPost\Config::getInstance();
$database = Database::getInstance();

$alerts = [];
if (REQUEST_METHOD === 'POST') {
	if (!isset($_POST['action']) || !Arr::includes([
			"basics",
			"user",
			"password",
			"migrate"
		], $_POST['action'])) {
		$alerts[] = [
			'type' => 'error',
			'message' => 'Invalid action'
		];

		goto page;
	}

	switch ($_POST['action']) {
		case 'basics':
			if (isset($_POST['app_name']))
				$config->set('app_name', $_POST['app_name']);
			if (isset($_POST['app_email']))
				$config->set('app_email', $_POST['app_email']);
			if (isset($_POST['timezone']))
				$config->set('timezone', $_POST['timezone']);

			$config->save();

			$alerts[] = [
				'type' => 'success',
				'message' => 'Settings saved'
			];
			break;
		case 'user':
			if (!isset($_POST['username'], $_POST['email'], $_POST['password'])) {
				$alerts[] = [
					'type' => 'error',
					'message' => 'Missing required fields'
				];

				goto page;
			}

			if (!password_verify($_POST['password'], $config->get('admin.password'))) {
				$alerts[] = [
					'type' => 'error',
					'message' => 'Password is incorrect'
				];

				goto page;
			}

			$config->set('admin.username', $_POST['username']);
			$config->set('admin.email', $_POST['email']);
			$config->save();

			$alerts[] = [
				'type' => 'success',
				'message' => 'User info saved'
			];
			break;
		case 'password':
			if (!isset($_POST['current_password'], $_POST['new_password'], $_POST['confirm_password'])) {
				$alerts[] = [
					'type' => 'error',
					'message' => 'Missing required fields'
				];

				goto page;
			}

			if ($_POST['new_password'] !== $_POST['confirm_password']) {
				$alerts[] = [
					'type' => 'error',
					'message' => 'Passwords do not match'
				];

				goto page;
			}

			if (!password_verify($_POST['current_password'], $config->get('admin.password'))) {
				$alerts[] = [
					'type' => 'error',
					'message' => 'Current password is incorrect'
				];

				goto page;
			}

			$config->set('admin.password', password_hash($_POST['new_password'], PASSWORD_DEFAULT));
			$config->save();

			$alerts[] = [
				'type' => 'success',
				'message' => 'Password changed'
			];
			break;
		case 'migrate':
			try {
				$database->runMigrations();
				$alerts[] = [
					'type' => 'success',
					'message' => 'Migrations ran successfully'
				];
			} catch (Exception $e) {
				$alerts[] = [
					'type' => 'error',
					'message' => $e->getMessage()
				];
			}
			break;
	}
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
	<title>Settings | <?= $config->get('app_name') ?></title>

	<?php template('admin/head') ?>
</head>
<body class="admin settings">
	<?php template('admin/navigation') ?>

	<main class="admin-content">
		<h1>Settings</h1>

		<?php foreach ($alerts as $alert): ?>
			<div
				class="badge <?= $alert['type'] ?>"
			>
				<?= $alert['message'] ?>
			</div>
		<?php endforeach; ?>

		<form
			method="POST"
			class="form"
		>
			<input
				type="hidden"
				name="action"
				value="basics"
			/>

			<div class="input-field required">
				<label
					class="field-label"
					for="app_name"
				>
					App Name
				</label>

				<input
					class="field-input"
					type="text"
					name="app_name"
					id="app_name"
					value="<?= $config->get('app_name') ?>"
					required
				>
			</div>

			<div class="input-field required">
				<label
					for="app_email"
					class="field-label"
				>
					App Email
				</label>

				<input
					class="field-input"
					type="email"
					name="app_email"
					id="app_email"
					value="<?= $config->get('app_email', APP_EMAIL) ?>"
					required
				/>
			</div>

			<div class="input-field required">
				<label
					for="timezone"
					class="field-label"
				>
					Timezone
				</label>

				<select
					class="field-input"
					name="timezone"
					id="timezone"
					required
				>
					<?php foreach (timezone_identifiers_list() as $timezone): ?>
						<option
							value="<?= $timezone ?>"
							<?= $timezone === $config->get('timezone') ? 'selected' : '' ?>
						>
							<?= $timezone ?>
						</option>
					<?php endforeach; ?>
				</select>
			</div>

			<button
				type="submit"
				class="button"
			>
				Save
			</button>
		</form>

		<h2>User Info</h2>

		<form
			class="form"
			method="POST"
		>
			<input
				type="hidden"
				name="action"
				value="user"
			>

			<div class="input-field required">
				<label
					for="username"
					class="field-label"
				>
					Username
				</label>

				<input
					class="field-input"
					type="text"
					name="username"
					id="username"
					value="<?= $config->get('admin.username') ?>"
					required
				>
			</div>

			<div class="input-field required">
				<label
					for="email"
					class="field-label"
				>
					Email
				</label>

				<input
					class="field-input"
					type="email"
					name="email"
					id="email"
					value="<?= $config->get('admin.email') ?>"
					required
				/>
			</div>

			<div class="input-field password required">
				<label
					for="password"
					class="field-label"
				>
					Current Password
				</label>

				<input
					class="field-input"
					type="password"
					name="password"
					id="password"
					required
				/>

				<button
					class="show-password button"
					type="button"
					title="Toggle Password Visibility"
				>
					<i class="show fa-solid fa-eye"></i>
					<i class="hide fa-solid fa-eye-slash"></i>
				</button>
			</div>

			<button
				class="button"
				type="submit"
			>
				Save
			</button>
		</form>

		<h2>Change Password</h2>

		<form
			class="form"
			method="POST"
		>
			<input
				type="hidden"
				name="action"
				value="password"
			>

			<div class="input-field password required">
				<label
					for="current_password"
					class="field-label"
				>
					Current Password
				</label>

				<input
					class="field-input"
					type="password"
					name="current_password"
					id="current_password"
					required
				/>

				<button
					class="show-password button"
					type="button"
					title="Toggle Password Visibility"
				>
					<i class="show fa-solid fa-eye"></i>
					<i class="hide fa-solid fa-eye-slash"></i>
				</button>
			</div>

			<div class="input-field password required">
				<label
					for="new_password"
					class="field-label"
				>
					New Password
				</label>

				<input
					class="field-input"
					type="password"
					name="new_password"
					id="new_password"
					required
				/>

				<button
					class="show-password button"
					type="button"
					title="Toggle Password Visibility"
				>
					<i class="show fa-solid fa-eye"></i>
					<i class="hide fa-solid fa-eye-slash"></i>
				</button>
			</div>

			<div class="input-field password required">
				<label
					for="confirm_password"
					class="field-label"
				>
					Confirm Password
				</label>

				<input
					class="field-input"
					type="password"
					name="confirm_password"
					id="confirm_password"
					required
				/>

				<button
					class="show-password button"
					type="button"
					title="Toggle Password Visibility"
				>
					<i class="show fa-solid fa-eye"></i>
					<i class="hide fa-solid fa-eye-slash"></i>
				</button>
			</div>

			<button
				class="button"
				type="submit"
			>
				Save
			</button>
		</form>

		<h2>Database</h2>

		<?php if ($database->hasMigrations()): ?>
			<form
				class="form"
				method="POST"
			>
				<p>
					There are <?= count($database->getMigrations()) ?> migrations to run.
				</p>

				<input
					type="hidden"
					name="action"
					value="migrate"
				>

				<button
					id="run-migrations-btn"
					class="button"
					type="submit"
				>
					Run Migrations
				</button>
			</form>
		<?php else: ?>
			<p>
				No migrations to run.
			</p>
		<?php endif; ?>
	</main>

	<script>
		document.addEventListener('DOMContentLoaded', () => {
			const runMigrationsBtn = document.getElementById('run-migrations-btn');
			if (!runMigrationsBtn) return;

			runMigrationsBtn.addEventListener('click', (e) => {
				if (!confirm(
					'Are you sure you want to run the migrations? Please make sure you have a backup of your database.'
				)) e.preventDefault();
			});
		})
	</script>

	<?php template('admin/footer') ?>
</body>
</html>