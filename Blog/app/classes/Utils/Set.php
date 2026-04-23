<?php

namespace EZPost\Utils;

use Iterator;

class Set implements Iterator {
	public function __construct(
		private array $data = [],
	) {
	}

	public function has(mixed $value): bool {
		return in_array($value, $this->data);
	}

	public function add(mixed $value): self {
		if (!$this->has($value))
			$this->data[] = $value;
		return $this;
	}

	public function remove(mixed $value): self {
		$this->data = array_filter(
			$this->data,
			fn($v) => $v !== $value
		);
		return $this;
	}

	public function clear(): self {
		$this->data = [];
		return $this;
	}

	public function values(): array {
		return array_values($this->data);
	}

	public function count(): int {
		return count($this->data);
	}

	protected int $iterable_current;

	public function current(): mixed {
		return $this->values()[$this->iterable_current];
	}

	public function key(): int {
		return $this->iterable_current;
	}

	public function next(): void {
		$this->iterable_current++;
	}

	public function rewind(): void {
		$this->iterable_current = 0;
	}

	public function valid(): bool {
		return $this->iterable_current < $this->count();
	}
}