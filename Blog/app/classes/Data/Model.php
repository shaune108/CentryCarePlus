<?php

namespace EZPost\Data;

abstract class Model {
	public string|null $id = null;

	public function __construct(
		array $data = []
	) {
		$this->assign($data);
	}

	abstract function getStore(): Store;

	public function assign(self|array $data): self {
		foreach ($data as $key => $value) {
			if (property_exists($this, $key)) {
				$this->$key = $value;
			}
		}

		return $this;
	}

	public function save(): self {
		$this->getStore()->save($this);
		return $this;
	}

	public function delete(): self {
		$this->getStore()->delete($this);
		return $this;
	}

	public function toData(?string $mode = null): array {
		return get_object_vars($this);
	}

	public function toArray(): array {
		return $this->toData();
	}

	public function toJSON(): string {
		return json_encode($this->toArray());
	}

	public function __toString(): string {
		return $this->toJSON();
	}
}