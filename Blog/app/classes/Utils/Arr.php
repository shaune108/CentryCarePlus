<?php

namespace EZPost\Utils;

class Arr {
	public static function has(array $array, string|int $key): bool {
		return array_key_exists($key, $array);
	}

	public static function hasAll(array $array, array $keys): bool {
		return self::every($keys, fn($key) => self::has($array, $key));
	}

	public static function get(array $array, string|int $key, mixed $default = null): mixed {
		return $array[$key] ?? $default;
	}

	public static function set(array &$array, string|int $key, mixed $value): void {
		$array[$key] = $value;
	}

	public static function remove(array &$array, string|int $key): void {
		unset($array[$key]);
	}

	public static function map(array $array, callable $callback): array {
		return array_map($callback, $array);
	}

	public static function filter(array $array, callable $callback, $mode = ARRAY_FILTER_USE_BOTH): array {
		return array_filter($array, $callback, $mode);
	}

	public static function reduce(array $array, callable $callback, mixed $initial = null): mixed {
		return array_reduce($array, $callback, $initial);
	}

	public static function keys(array $array): array {
		return array_keys($array);
	}

	public static function values(array $array): array {
		return array_values($array);
	}

	public static function flip(array $array): array {
		return array_flip($array);
	}

	public static function reverse(array $array): array {
		return array_reverse($array);
	}

	public static function sort(array $array, callable $callback): array {
		usort($array, $callback);
		return $array;
	}

	public static function every(array $array, callable $callback): bool {
		foreach ($array as $key => $value) {
			if (!$callback($value, $key, $array)) return false;
		}

		return true;
	}

	public static function some(array $array, callable $callback): bool {
		foreach ($array as $key => $value) {
			if ($callback($value, $key, $array)) return true;
		}

		return false;
	}

	public static function find(array $array, callable $callback): mixed {
		foreach ($array as $key => $value) {
			if ($callback($value, $key, $array)) return $value;
		}

		return null;
	}

	public static function findKey(array $array, callable $callback): mixed {
		foreach ($array as $key => $value) {
			if ($callback($value, $key, $array)) return $key;
		}

		return null;
	}

	public static function findLast(array $array, callable $callback): mixed {
		$reversed = array_reverse($array);
		foreach ($reversed as $key => $value) {
			if ($callback($value, $key, $array)) return $value;
		}

		return null;
	}

	public static function findLastKey(array $array, callable $callback): mixed {
		$reversed = array_reverse($array);
		foreach ($reversed as $key => $value) {
			if ($callback($value, $key, $array)) return $key;
		}

		return null;
	}

	public static function findIndex(array $array, callable $callback): mixed {
		foreach ($array as $key => $value) {
			if ($callback($value, $key, $array)) return $key;
		}

		return null;
	}

	public static function findLastIndex(array $array, callable $callback): mixed {
		$reversed = array_reverse($array);
		foreach ($reversed as $key => $value) {
			if ($callback($value, $key, $array)) return $key;
		}

		return null;
	}

	public static function includes(array $array, mixed $value): bool {
		return in_array($value, $array);
	}

	public static function includesAll(array $array, array $values): bool {
		return self::every($values, fn($value) => self::includes($array, $value));
	}

	public static function pick(array $array, array $keys): array {
		$result = [];

		foreach ($keys as $key) {
			if (self::has($array, $key)) {
				$result[$key] = $array[$key];
			}
		}

		return $result;
	}

	public static function omit(array $array, array $keys): array {
		$result = [];

		foreach ($array as $key => $value) {
			if (!in_array($key, $keys)) {
				$result[$key] = $value;
			}
		}

		return $result;
	}
}