<?php

use EZPost\Utils\Str;
use EZPost\Utils\URL;

function resolve_url(string $path, string $base = BASE_URL): string {
	return new URL($path, $base);
}

function slugify(string $string): string {
	return Str::slugify($string);
}

function redirect(string $to, string $base = BASE_URL): never {
	$url = resolve_url($to, $base);
	header("Location: $url");
	exit;
}