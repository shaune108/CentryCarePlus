<?php

namespace EZPost\Stores;

use EZPost\Data\Store;
use EZPost\Models\Post;
use EZPost\Utils\FileSystem;

class Posts extends Store {

	#[\Override] function getTableName(): string {
		return 'posts';
	}

	#[\Override] function getModelClass(): string {
		return Post::class;
	}
}