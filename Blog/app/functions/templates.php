<?php

use EZPost\Utils\FileSystem;

function resolve_template(string $name): string|null {
	$lookups = [
		FileSystem::resolveFromRoot('templates'),
		FileSystem::resolveFromRoot('app/templates'),
	];

	foreach ($lookups as $dir) {
		$fs = new FileSystem($dir);
		$resolved = $fs->resolveFile($name);
		if (!is_null($resolved)) return $resolved;
	}

	return null;
}

function template(string $name, array $vars = []): void {
	$resolved = FileSystem::isAbsolute($name)
		? $name
		: resolve_template($name);

	if (is_null($resolved)) {
		trigger_error("Template not found: $name");
		return;
	}

	global $template_vars;
	$old_vars = $template_vars;
	$template_vars = $vars;

	require $resolved;

	$template_vars = $old_vars;
}

function render_template(string $name, array $vars = []): string {
	ob_start();
	template($name, $vars);
	return ob_get_clean();
}

function template_vars(array $vars) {
	global $template_vars;
	if (empty($vars)) return $template_vars;
	foreach ($vars as $name => $default) {
		if (is_int($name)) {
			$name = $default;
			$default = null;
		}

		if (isset($template_vars[$name])) $vars[$name] = $template_vars[$name];
		else if (!is_null($default)) $vars[$name] = $default;
		else trigger_error("Template variable not found: $name");
	}

	return $vars;
}