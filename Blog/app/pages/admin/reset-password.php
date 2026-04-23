<?php
if (!isset($_GET['token'])) redirect('admin/login');

$config = EZPost\Config::getInstance();
$token = $_GET['token'] ?? null;

if (
	is_null($token)
	|| $token !== $config->get('auth.reset_token')
	|| time() > $config->get('auth.reset_expires')
) redirect('admin/login');

$alerts = [];
if (REQUEST_METHOD === 'POST') {
	if (!isset($_POST['password'])) {
		$alerts[] = 'Please fill out all fields.';
	} else if ($_POST['password'] !== $_POST['confirm_password']) {
		$alerts[] = 'Passwords do not match.';
	}

	if (count($alerts)) goto page;

	$config->set('admin.password', password_hash($_POST['password'], PASSWORD_DEFAULT));
	$config->set('auth.reset_token', null);
	$config->set('auth.reset_expires', null);

	$config->save();

	redirect('admin/login?password_reset=true');
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
	<title>Reset Password | <?= $config->get('app_name') ?></title>

	<?php template('admin/head') ?>
</head>
<body class="reset">
	<form
		method="POST"
		class="form reset-form"
	>
		<h1>Reset Password</h1>

		<?php foreach ($alerts as $alert): ?>
			<div class="badge error">
				<?= $alert ?>
			</div>
		<?php endforeach; ?>

		<div class="input-field password required">
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
				type="password"
				name="confirm_password"
				id="confirm_password"
				class="field-input"
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
			Reset Password
		</button>
	</form>
</body>
</html>
