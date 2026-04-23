<?php

namespace EZPost\Utils;

use Iterator;

class Map implements Iterator {
	public function __construct(
		private array $data = [],
	) {
	}

	public function has(string $key): bool {
		return Arr::has($this->data, $key);
	}

	public function get(string $key): mixed {
		return $this->data[$key] ?? null;
	}

	public function set(string $key, mixed $value): static {
		$this->data[$key] = $value;
		return $this;
	}

	public function remove(string $key): static {
		unset($this->data[$key]);
		return $this;
	}

	public function clear(): static {
		$this->data = [];
		return $this;
	}

	public function keys(): array {
		return array_keys($this->data);
	}

	public function values(): array {
		return array_values($this->data);
	}

	public function entries(): array {
		return array_map(
			fn($key, $value) => [$key, $value],
			$this->keys(),
			$this->values()
		);
	}

	public function count(): int {
		return count($this->data);
	}

	protected int $iterable_current;

	public function current(): mixed {
		return $this->entries()[$this->iterable_current];
	}

	public function next(): void {
		$this->iterable_current++;
	}

	public function key(): int {
		return $this->iterable_current;
	}

	public function valid(): bool {
		return $this->iterable_current < $this->count();
	}

	public function rewind(): void {
		$this->iterable_current = 0;
	}
}