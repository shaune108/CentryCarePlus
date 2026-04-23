<?php

use EZPost\Models\Post;
use EZPost\Stores\Posts;

function get_posts(int $page = 1, int $per_page = 10): array {
	$posts = new Posts();

	$items = $posts->query([
		'status' => 'published'
	], orderBy: [
		'publish_date' => 'DESC'
	], limit: $per_page, offset: ($page - 1) * $per_page);

	$pages = ceil(
		$posts->count([
			'status' => 'published'
		]) / $per_page
	);

	return [$items, $pages];
}

function get_post(?string $slug): ?Post {
	if (is_null($slug)) return null;

	$posts = new Posts();

	try {
		return $posts->query([
			'slug' => $slug,
		], limit: 1)[0] ?? null;
	} catch (Exception) {
		return null;
	}
}