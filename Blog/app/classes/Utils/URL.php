<?php

namespace EZPost\Utils;

use JsonSerializable;
use Stringable;

class URL implements JsonSerializable, Stringable {
	public static function hasProtocol(string $url): bool {
		return preg_match('#^[a-zA-Z]+://#', $url) === 1;
	}

	/**
	 * Checks if the given URL is absolute.
	 * This means that it starts with a protocol, "//", or a simple "/".
	 *
	 * @param string $url
	 * @return bool
	 */
	public static function isAbsolute(string $url): bool {
		return self::hasProtocol($url) || preg_match('#^//|^/#', $url) === 1;
	}

	public static function join(string ...$parts): string {
		$joined = '';

		foreach ($parts as $part) {
			if (self::isAbsolute($part)) {
				$joined = $part;
				continue;
			}

			if (str_ends_with($joined, '/'))
				$joined .= ltrim($part, '/');
			else $joined .= '/' . $part;
		}

		return $joined;
	}

	protected array|null $url = null;

	public function __construct(
		string|URL $url = '',
		string|URL $base = ''
	) {
		$parsed_base = parse_url($base);
		if (!is_array($parsed_base)) return;
		$this->url = $parsed_base;

		$parsed_url = parse_url($url);
		if (!is_array($parsed_url)) return;

		foreach ($parsed_url as $key => $value) {
			if ($key === 'path' && !self::isAbsolute($value)) {
				$this->url[$key] = $this->join($this->url[$key] ?? '', $value);
			} else $this->url[$key] = $value;
		}
	}

	public function isValid(): bool {
		return is_array($this->url);
	}

	public function getProtocol(): string|null {
		return $this->url['scheme'] ?? null;
	}

	public function setProtocol(string $scheme): void {
		$this->url['scheme'] = $scheme;
	}

	public function getUsername(): string|null {
		return $this->url['user'] ?? null;
	}

	public function setUsername(string $user): void {
		$this->url['user'] = $user;
	}

	public function getPassword(): string|null {
		return $this->url['pass'] ?? null;
	}

	public function setPassword(string $pass): void {
		$this->url['pass'] = $pass;
	}

	public function getHostName(): string|null {
		return $this->url['host'] ?? null;
	}

	public function setHostName(string $host): void {
		$this->url['host'] = $host;
	}

	public function getPort(): int|null {
		return $this->url['port'] ?? null;
	}

	public function setPort(int $port): void {
		$this->url['port'] = $port;
	}

	public function getOrigin(): string|null {
		if (!$this->isValid()) return null;
		$url = "";

		if ($this->getProtocol()) {
			$url .= $this->url['scheme'] . '://';
		}

		if (isset($this->url['host'])) {
			$url .= $this->url['host'];
		}

		if (isset($this->url['port'])) {
			$url .= ':' . $this->url['port'];
		}

		return $url;
	}

	public function setOrigin(string $origin): void {
		if (!self::hasProtocol($origin)) $origin = '//' . $origin;

		$parsed_origin = parse_url($origin);
		if (!is_array($parsed_origin)) return;

		if (isset($parsed_origin['scheme'])) {
			$this->setProtocol($parsed_origin['scheme']);
		}

		if (isset($parsed_origin['host'])) {
			$this->setHostName($parsed_origin['host']);
		}

		if (isset($parsed_origin['port'])) {
			$this->setPort($parsed_origin['port']);
		}
	}

	public function getPathName(): string|null {
		return $this->url['path'] ?? null;
	}

	public function setPathName(string $path): void {
		$this->url['path'] = $path;
	}

	public function getSearch(): string|null {
		return $this->url['query'] ?? null;
	}

	public function setSearch(string|array|object $query): void {
		if (is_array($query)) $query = http_build_query($query);
		$query = str_replace('%5B', '[', $query);
		$query = str_replace('%5D', ']', $query);
		$this->url['query'] = $query;
	}

	public function updateSearch(string|array|object $query, bool $deep = true): void {
		if (is_array($query)) $query = http_build_query($query);
		parse_str($this->getSearch() ?? '', $current_query);
		parse_str($query, $parsed_query);

		if ($deep) $new_query = array_merge_recursive($current_query, $parsed_query);
		else $new_query = array_merge($current_query, $parsed_query);

		$this->setSearch($new_query);
	}

	public function getHash(): string|null {
		return $this->url['fragment'] ?? null;
	}

	public function setHash(string $fragment): void {
		$this->url['fragment'] = $fragment;
	}

	public function toJSON(): string|null {
		if (!$this->isValid()) return null;
		$url = $this->getOrigin() ?? '';

		if (isset($this->url['path'])) {
			$url .= $this->url['path'];
		}

		if (isset($this->url['query'])) {
			$url .= '?' . $this->url['query'];
		}

		if (isset($this->url['fragment'])) {
			$url .= '#' . $this->url['fragment'];
		}

		return $url;
	}

	public function jsonSerialize(): string|null {
		return $this->toJSON();
	}

	public function toString(): string {
		return $this->jsonSerialize() ?? '';
	}

	public function __toString(): string {
		return $this->toString();
	}
}