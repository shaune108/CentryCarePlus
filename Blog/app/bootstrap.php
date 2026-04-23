<?php

use EZPost\Database;
use EZPost\Utils\FileSystem;

require_once '../vendor/autoload.php';
require_once 'constants.php';

session_start();

$database = Database::getInstance();
$config = EZPost\Config::getInstance();
$requested_path = REQUEST_PATH === '' ? 'index' : REQUEST_PATH;

if (!$config->get('installed') && $requested_path !== 'install') {
	redirect('install');
}

if ($config->has('timezone'))
	date_default_timezone_set($config->get('timezone'));

$routes = load_routes(
	FileSystem::resolveFromRoot('pages'),
	FileSystem::resolveFromRoot('app/pages'),
);


foreach ($routes as $path => $file) {
	if (preg_match("/^$path$/", $requested_path, $matches)) {
		// extract named parameters from the path
		foreach ($matches as $key => $value) {
			if (is_string($key)) {
				$_GET[$key] = $value;
			}
		}

		require_once $file;
		exit;
	}
}

http_response_code(404);
template('error', [
	'code' => 404,
	'title' => 'Page Not Found',
	'message' => 'The page you requested could not be found.'
]);