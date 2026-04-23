<?php extract(template_vars([
	'code',
	'title',
	'message' => ''
])) ?>
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
	<title><?= $code ?> - <?= $title ?></title>

	<link
		rel="stylesheet"
		href="<?= resolve_url('assets/css/admin.css') ?>"
	>

	<style>
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1em;
            width: 100vw;
            height: 100vh;
        }
	</style>
</head>
<body>
	<h1><?= $code ?> - <?= $title ?></h1>
	<p><?= $message ?></p>
</body>
</html>