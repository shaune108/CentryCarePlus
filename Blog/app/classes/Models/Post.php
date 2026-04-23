<?php

namespace EZPost\Models;

use DateTime;
use DateTimeZone;
use EZPost\Config;
use EZPost\Data\Model;
use EZPost\Data\Store;
use EZPost\Stores\Posts;
use EZPost\Utils\FileSystem;

class Post extends Model {
	public string $title = '';
	public string $slug = '';
	public string $status = 'draft';
	public string $publish_date = '';

	public string $seo_title = '';
	public string $keywords = '';
	public string $description = '';

	public string $custom_header_code = '';
	public string $custom_footer_code = '';


	#[\Override] function getStore(): Store {
		return new Posts();
	}

	function getPublishDate(): DateTime {
		return DateTime::createFromFormat(
			'Y-m-d\TH:i',
			$this->publish_date,
		);
	}

	function getContent(): string {
		if (!$this->id)
			return '';

		$data_dir = FileSystem::resolveFromRoot('data');
		$posts_dir = $data_dir . '/posts';

		if (!is_dir($posts_dir))
			return '';

		$filename = $this->id;
		$filepath = $posts_dir . '/' . $filename . '.html';

		if (!file_exists($filepath))
			return '';

		return file_get_contents($filepath);
	}

	function saveContent(string $content): void {
		$data_dir = FileSystem::resolveFromRoot('data');
		$posts_dir = $data_dir . '/posts';

		if (!is_dir($posts_dir))
			mkdir($posts_dir, 0777, true);

		$filename = $this->id . '.html';
		$filepath = $posts_dir . '/' . $filename;

		file_put_contents($filepath, $content);
	}

	function delete(): Model {
		parent::delete();
		$this->deleteContent();
		return $this;
	}

	function deleteContent(): void {
		$posts_dir = FileSystem::resolveFromRoot('data/posts');

		if (!is_dir($posts_dir))
			return;

		$filename = $this->id . '.html';
		$filepath = $posts_dir . '/' . $filename;

		if (!file_exists($filepath))
			return;
		unlink($filepath);
	}

	function getPermalink(): string {
		return 'post/' . $this->slug;
	}
}