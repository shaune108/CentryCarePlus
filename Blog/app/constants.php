<?php

const APP_NAME = "EZPost";



define('APP_EMAIL', "info@" . $_SERVER['HTTP_HOST']);



define(

	'ROOT_PATH',

	realpath(__DIR__ . DIRECTORY_SEPARATOR . '..')

);



define('BASE_URL_PATH', rtrim(

	$_SERVER['BASE_URL_PATH'] ?? '/',

	'/'

));



define('BASE_URL', rtrim(

	'https://' . $_SERVER['HTTP_HOST'] . BASE_URL_PATH,

	'/'

));



define(

	'REQUEST_METHOD',

	$_SERVER['REQUEST_METHOD']

);



$request_uri = ltrim(preg_replace(

	'#^' . preg_quote(BASE_URL_PATH, '#') . '#',

	'',

	$_SERVER['REQUEST_URI']

), '/');

define('REQUEST_URI', $request_uri);



$request_path = trim(

	parse_url(REQUEST_URI, PHP_URL_PATH) ?? '',

	'/'

);



define('REQUEST_PATH', $request_path);