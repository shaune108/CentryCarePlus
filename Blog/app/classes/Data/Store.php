<?php

namespace EZPost\Data;

use EZPost\Database;
use PDO;

abstract class Store {
	abstract function getTableName(): string;

	abstract function getModelClass(): string;

	protected function buildWhereClause(array $options): string {
		if (empty($options)) {
			return '';
		}

		$clauses = [];
		foreach ($options as $key => $value) {
			$clauses[] = "$key = :$key";
		}

		return 'WHERE ' . implode(' AND ', $clauses);
	}

	protected function buildOrderByClause(array $options): string {
		if (empty($options)) {
			return '';
		}

		$clauses = [];
		foreach ($options as $key => $value) {
			$clauses[] = "$key $value";
		}

		return 'ORDER BY ' . implode(', ', $clauses);
	}

	public function query(
		array $where = [],
		array $orderBy = [],
		int   $limit = 10,
		int   $offset = 0
	): array {
		$db = Database::getInstance();
		$query = [
			"SELECT * FROM {$this->getTableName()}",
		];

		if (!empty($where)) {
			$query[] = $this->buildWhereClause($where);
		}

		if (!empty($orderBy)) {
			$query[] = $this->buildOrderByClause($orderBy);
		}

		$query[] = "LIMIT :limit OFFSET :offset";
		$query = implode(' ', $query);

		$statement = $db->prepare($query);
		$statement->bindValue(':limit', $limit, PDO::PARAM_INT);
		$statement->bindValue(':offset', $offset, PDO::PARAM_INT);

		foreach ($where as $key => $value) {
			$statement->bindValue(":$key", $value);
		}

		$statement->execute();
		return $statement->fetchAll(PDO::FETCH_CLASS, $this->getModelClass());
	}

	public function save(Model $model): bool {
		if (isset($model->id)) return $this->update($model);

		$model->id = uniqid();

		$db = Database::getInstance();
		$keys = get_object_vars($model);

		$columns = implode(', ', array_keys($keys));
		$values = implode(', ', array_map(function ($key) {
			return ":$key";
		}, array_keys($keys)));

		$query = "INSERT INTO {$this->getTableName()} ($columns) VALUES ($values)";

		$statement = $db->prepare($query);
		$statement->execute($keys);

		return $statement->rowCount() > 0;
	}

	public function update(Model $model): bool {
		if (!isset($model->id)) return false;

		$db = Database::getInstance();
		$keys = get_object_vars($model);
		$columns = implode(', ', array_map(function ($key) {
			return "$key = :$key";
		}, array_keys($keys)));

		$query = "UPDATE {$this->getTableName()} SET $columns WHERE id = :id";
		$statement = $db->prepare($query);

		foreach ($keys as $key => $value) {
			$statement->bindValue(":$key", $value);
		}

		return $statement->execute();
	}

	public function delete(Model $model): bool {
		$db = Database::getInstance();
		$query = "DELETE FROM {$this->getTableName()} WHERE id = :id";
		$statement = $db->prepare($query);
		$statement->bindValue(':id', $model->id);
		return $statement->execute();
	}

	public function count(array $where = []): int {
		$db = Database::getInstance();
		$query = [
			"SELECT COUNT(*) FROM {$this->getTableName()}",
		];

		if (!empty($where)) {
			$query[] = $this->buildWhereClause($where);
		}

		$query = implode(' ', $query);

		$statement = $db->prepare($query);

		foreach ($where as $key => $value) {
			$statement->bindValue(":$key", $value);
		}

		$statement->execute();
		return $statement->fetchColumn();
	}

	public function find(string $id): ?Model {
		$db = Database::getInstance();
		$query = "SELECT * FROM {$this->getTableName()} WHERE id = :id";
		$statement = $db->prepare($query);
		$statement->bindValue(':id', $id);
		$statement->execute();
		$statement->setFetchMode(PDO::FETCH_CLASS, $this->getModelClass());
		$fetched = $statement->fetch();

		if ($fetched === false) {
			return null;
		}

		return $fetched;
	}
}