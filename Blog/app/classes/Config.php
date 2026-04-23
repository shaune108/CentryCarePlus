<?php

namespace EZPost;

use EZPost\Utils\FileSystem;

class Config extends Utils\Singleton {
	protected FileSystem $fs;
	protected array $data = [];

	protected function __construct() {
		parent::__construct();

		$this->fs = new FileSystem(FileSystem::resolveFromRoot('data'));
		$this->load();
	}

	public function exists(): bool {
		return $this->fs->exists('config.json');
	}

	protected function traverse(string $path) {
		$parts = explode('.', $path);
		$node = $this->data;

		foreach ($parts as $part) {
			if (!array_key_exists($part, $node)) return null;

			$node = &$node[$part];
		}

		return $node;
	}

	public function has(string $key): bool {
		return $this->traverse($key) !== null;
	}

	public function get(string $key, mixed $fallback = null) {
		if ($this->has($key))
			return $this->traverse($key);
		return $fallback;
	}

	public function set(string $key, $value): void {
		$parts = explode('.', $key);
		$node = &$this->data;

		foreach ($parts as $part) {
			if (!array_key_exists($part, $node))
				$node[$part] = [];

			$node = &$node[$part];
		}

		$node = $value;
	}

	public function load(): void {
		if (!$this->exists()) $this->save();
		$this->data = json_decode(
			$this->fs->get('config.json'),
			true,
		) ?? [];
	}

	public function save(): void {
		$this->fs->put('config.json', json_encode(
			$this->data,
			JSON_PRETTY_PRINT
		));
	}
}