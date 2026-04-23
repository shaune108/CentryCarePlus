<?php

use EZPost\Utils\Arr;
use Random\RandomException;

if (is_authed() && !isset($_GET['logout'])) {
	redirect('admin/dashboard');
} else if (isset($_GET['logout'])) {
	logout();
	redirect('admin/login?logged_out=true');
}

$config = EZPost\Config::getInstance();

$alerts = [];
$sent = false;
if (REQUEST_METHOD === 'POST') {
	if (!isset($_POST['email'])) {
		$alerts[] = 'Please fill out all fields.';
	} else if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
		$alerts[] = 'Invalid email address.';
	}

	if (count($alerts)) goto page;

	if ($config->get('admin.email') !== strtolower($_POST['email'])) {
		$alerts[] = 'Invalid email address.';
		goto page;
	}

	try {
		$emailed = send_reset_email($_POST['email']);
		if (!$emailed) {
			$alerts[] = 'Invalid email address.';
			goto page;
		}

		$sent = true;
	} catch (Exception $e) {
		$alerts[] = 'An error occurred while sending the email.';
		goto page;
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
	<title>Forgot Password | <?= $config->get('app_name') ?></title>

	<?php template('admin/head') ?>
</head>
<body class="forgot">
	<form
		method="POST"
		class="form forgot-form"
	>
		<h1>Forgot Password</h1>

		<?php foreach ($alerts as $alert): ?>
			<div class="badge error">
				<?= $alert ?>
			</div>
		<?php endforeach; ?>

		<?php if ($sent): ?>
			<div class="badge">
				An email has been sent to the address you provided.
			</div>
		<?php endif; ?>

		<div class="input-field required">
			<label
				for="email"
				class="field-label"
			>
				Email
			</label>

			<input
				type="text"
				name="email"
				id="email"
				class="field-input"
				required
			/>
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