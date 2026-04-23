<?php

function page_title(string $title): string {
	$config = EZPost\Config::getInstance();
	$app_name = $config->get('app_name');
	return "$title | $app_name";
}

function load_page_files(string ...$dirs): array {
	$pages = [];

	foreach ($dirs as $dir) {
		$files = glob("$dir/*");

		foreach ($files as $file) {
			if (is_dir($file)) {
				$pages = array_merge($pages, load_page_files($file));
			} else {
				$pages[] = $file;
			}
		}
	}

	return $pages;
}

function load_routes(string ...$dirs): array {
	$routes = [];

	foreach ($dirs as $dir) {
		$files = load_page_files($dir);

		foreach ($files as $file) {
			$path = str_replace($dir, '', $file);
			$path = str_replace('.php', '', $path);
			$path = str_replace('%24', '$', $path);

			// if path starts with a slash, remove it
			if (str_starts_with($path, '/'))
				$path = substr($path, 1);

			// escape any forward slashes
			$path = str_replace('/', '\/', $path);

			// replace any $var with a regex capture group using the variable name as the group name
			$path = preg_replace('/\$([a-zA-Z0-9_-]+)/', '(?<$1>[a-zA-Z0-9_-]+)', $path);

			$routes[$path] = $file;

			// if the path is index, also add a route for the folder with optional trailing slash
			if (str_ends_with($path, 'index')) {
				$path = str_replace('index', '', $path);
				if (str_ends_with($path, '\/'))
					$path = substr($path, 0, -2);

				$routes[$path . '(\/)?'] = $file;
			}
		}
	}

	return $routes;
}