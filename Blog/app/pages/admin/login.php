<?php

use EZPost\Utils\Arr;

if (is_authed() && !isset($_GET['logout'])) {
	redirect('admin/dashboard');
} else if (isset($_GET['logout'])) {
	logout();
	redirect('admin/login?logged_out=true');
}

$config = EZPost\Config::getInstance();

$alerts = [];
if (REQUEST_METHOD === 'POST') {
	if (!Arr::hasAll($_POST, [
		'username',
		'password'
	])) {
		$alerts[] = 'Please fill out all fields.';
	}

	if (count($alerts)) goto page;

	$logged_in = login($_POST['username'], $_POST['password']);
	if (!$logged_in) {
		$alerts[] = 'Invalid username or password.';
		goto page;
	}

	redirect('admin/dashboard');
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
	<title>Login | <?= $config->get('app_name') ?></title>

	<?php template('admin/head') ?>
</head>
<body class="login">
	<form
		method="POST"
		class="form login-form"
	>
		<h1>Login</h1>

		<?php foreach ($alerts as $alert): ?>
			<div class="badge error">
				<?= $alert ?>
			</div>
		<?php endforeach; ?>

		<?php if (isset($_GET['logged_out'])): ?>
			<div class="badge">
				Logged out successfully.
			</div>
		<?php endif; ?>

		<?php if (isset($_GET['password_reset'])): ?>
			<div class="badge">
				Password reset successfully.
			</div>
		<?php endif; ?>

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
			/>
		</div>

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

		<button
			class="button"
			type="submit"
		>
			Login
		</button>

		<a
			href="<?= resolve_url('admin/forgot-password') ?>"
			style="align-self:center;"
		>
			Forgot Password?
		</a>
	</form>

	<?php template('admin/footer') ?>
</body>
</html>