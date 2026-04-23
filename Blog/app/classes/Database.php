<?php

namespace EZPost;

use Exception;
use EZPost\Utils\FileSystem;
use EZPost\Utils\Singleton;
use PDO;
use PDOException;
use PDOStatement;

class Database extends
	Singleton {
	private PDO $pdo;
	private array $migration_files = [];
	private array $ran_migrations;
	private string $db_path;

	public function __construct() {
		parent::__construct();
		$fs = new FileSystem(
			FileSystem::resolveFromRoot('data')
		);

		if (!$fs->exists('database.sqlite')) {
			$fs->touch('database.sqlite');
		}
		$this->db_path = $fs->resolve('database.sqlite');


		$this->pdo = new PDO("sqlite:$this->db_path");
		$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		$path = FileSystem::resolveFromRoot('app/migrations');
		foreach (glob("$path/*.sql") as $file) {
			$this->migration_files[basename($file, '.sql')] = $file;
		}

		$sql = <<<SQL
			CREATE TABLE IF NOT EXISTS migrations (
				name TEXT PRIMARY KEY,
				created_at DATETIME DEFAULT CURRENT_TIMESTAMP
			);
		SQL;

		$this->pdo->exec($sql);
		$this->ran_migrations = $this->pdo->query("SELECT name FROM migrations;")
			->fetchAll(PDO::FETCH_COLUMN);
	}

	public function getMigrations(): array {
		return array_diff(
			array_keys($this->migration_files),
			$this->ran_migrations
		);
	}

	public function hasMigrations(): bool {
		return count($this->getMigrations()) > 0;
	}

	/**
	 * @throws Exception
	 */
	public function runMigrations(): void {
		$migrations_to_run = $this->getMigrations();
		// No migrations to run
		if (!$migrations_to_run) return;

		// backup database
		if (!copy($this->db_path, $this->db_path . '.bak')) {
			throw new Exception('Failed to backup database');
		}


		try {
			foreach ($migrations_to_run as $migration) {
				$sql = file_get_contents($this->migration_files[$migration]);
				$suc = $this->pdo->exec($sql);

				if ($suc === false) {
					throw new Exception("Failed to run migration: $migration");
				}

				$sql = <<<SQL
					INSERT INTO migrations (name)
					VALUES ('$migration');
				SQL;

				$this->pdo->exec($sql);
			}

			$this->ran_migrations = $this->pdo->query("SELECT name FROM migrations;")
				->fetchAll(PDO::FETCH_COLUMN);

			// remove backup
			unlink($this->db_path . '.bak');
		} catch (Exception $e) {
			// restore database
			if (!copy($this->db_path . '.bak', $this->db_path)) {
				throw new Exception(
					'Failed to restore database after failed migration',
					0,
					$e
				);
			}

			throw $e;
		}
	}

	public function prepare(string $sql, array $options = []): PDOStatement {
		return $this->pdo->prepare($sql, $options);
	}

	/**
	 * @param string $sql
	 * @param array  $params
	 * @param array  $options
	 *
	 * @return array
	 * @throws PDOException
	 */
	public function query(string $sql, array $params = [], array $options = []): array {
		$stmt = $this->prepare($sql, $options);
		$stmt->execute($params);
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	/**
	 * @param string $sql
	 * @param array  $params
	 * @param array  $options
	 *
	 * @return bool
	 * @throws PDOException
	 */
	public function exec(string $sql, array $params = [], array $options = []): bool {
		$stmt = $this->prepare($sql, $options);
		return $stmt->execute($params);
	}
}