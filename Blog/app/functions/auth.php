<?php

use Random\RandomException;

function is_authed(): bool {
	$config = EZPost\Config::getInstance();
	return isset($_SESSION['user'], $_SESSION['password'])
		&& $_SESSION['user'] === $config->get('admin.username')
		&& $_SESSION['password'] === $config->get('admin.password');
}

function login(string $username, string $password): bool {
	$config = EZPost\Config::getInstance();
	$config_password = $config->get('admin.password');

	if ($username !== $config->get('admin.username')) return false;
	if (!password_verify($password, $config_password)) return false;

	$_SESSION['user'] = $username;
	$_SESSION['password'] = $config_password;
	return true;
}

function logout(): void {
	unset($_SESSION['user']);
}

/**
 * @throws RandomException
 */
function send_reset_email(string $email): bool {
	$config = EZPost\Config::getInstance();
	$config_email = $config->get('admin.email');

	if ($config_email !== strtolower($email)) return false;

	$token = bin2hex(random_bytes(32));
	$expires = time() + 3600;

	$config->set('auth.reset_token', $token);
	$config->set('auth.reset_expires', $expires);
	$config->save();

	$app_email = $config->get('app_email', APP_EMAIL);
	$url = resolve_url("admin/reset-password?token=$token");

	return mail(
		$config_email,
		'Password Reset',
		<<<TEXT
		Click the link below to reset your password.
		
		$url
		TEXT,
		[
			'From' => APP_NAME . " <$app_email>",
			'X-Mailer' => 'PHP/' . phpversion()
		]
	);
}