<?php

namespace EZPost\Utils;

abstract class Singleton {
	private static array $instances = [];

	public static function getInstance(): static {
		if (Arr::has(self::$instances, static::class))
			return self::$instances[static::class];
		return new static;
	}

	protected function __construct() {
		self::$instances[static::class] = $this;
	}
}