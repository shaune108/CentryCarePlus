<?php

namespace EZPost\Utils;

class FileSystem {
	public static function sanitize(string $path): string {
		// Remove any null bytes. See https://core.trac.wordpress.org/ticket/21217.
		$path = str_replace(chr(0), '', $path);

		// Remove any whitespace (including newlines) at the beginning and end of the path.
		$path = trim($path, " \t\n\r\0\x0B/");

		// Remove any directory traversal.
		$path = str_replace('..', '', $path);

		// Remove any leading periods or forward slashes from the path.
		return ltrim($path, './');
	}

	public static function isAbsolute(string $path): bool {
		// taken and modified from: https://developer.wordpress.org/reference/functions/path_is_absolute/

		/*
		 * This is definitive if true but fails if $path does not exist or contains
		 * a symbolic link.
		 */
		if (realpath($path) === $path) return true;
		if (strlen($path) === 0 || '.' === $path[0]) return false;

		// Windows allows absolute paths like this.
		if (preg_match('#^[a-zA-Z]:\\\\#', $path)) return true;

		// A path starting with / or \ is absolute; anything else is relative.
		return ('/' === $path[0] || '\\' === $path[0]);
	}

	public static function join(string ...$parts): string {
		// taken from: https://stackoverflow.com/questions/1091107/how-to-join-filesystem-path-strings-in-php
		$paths = array();

		foreach ($parts as $arg)
			if ($arg !== '') $paths[] = $arg;

		return preg_replace(
			'#/+#',
			DIRECTORY_SEPARATOR,
			join('/', $paths)
		);
	}

	public static function getMimeType(string $filename): string {
		$idx = explode('.', $filename);
		$count_explode = count($idx);
		$idx = strtolower($idx[$count_explode - 1]);

		$mimet = [
			'txt' => 'text/plain',
			'htm' => 'text/html',
			'html' => 'text/html',
			'php' => 'text/html',
			'css' => 'text/css',
			'js' => 'application/javascript',
			'json' => 'application/json',
			'xml' => 'application/xml',
			'swf' => 'application/x-shockwave-flash',
			'flv' => 'video/x-flv',

			// images
			'png' => 'image/png',
			'jpe' => 'image/jpeg',
			'jpeg' => 'image/jpeg',
			'jpg' => 'image/jpeg',
			'gif' => 'image/gif',
			'bmp' => 'image/bmp',
			'ico' => 'image/vnd.microsoft.icon',
			'tiff' => 'image/tiff',
			'tif' => 'image/tiff',
			'svg' => 'image/svg+xml',
			'svgz' => 'image/svg+xml',

			// archives
			'zip' => 'application/zip',
			'rar' => 'application/x-rar-compressed',
			'exe' => 'application/x-msdownload',
			'msi' => 'application/x-msdownload',
			'cab' => 'application/vnd.ms-cab-compressed',

			// audio/video
			'mp3' => 'audio/mpeg',
			'qt' => 'video/quicktime',
			'mov' => 'video/quicktime',

			// adobe
			'pdf' => 'application/pdf',
			'psd' => 'image/vnd.adobe.photoshop',
			'ai' => 'application/postscript',
			'eps' => 'application/postscript',
			'ps' => 'application/postscript',

			// ms office
			'doc' => 'application/msword',
			'rtf' => 'application/rtf',
			'xls' => 'application/vnd.ms-excel',
			'ppt' => 'application/vnd.ms-powerpoint',
			'docx' => 'application/msword',
			'xlsx' => 'application/vnd.ms-excel',
			'pptx' => 'application/vnd.ms-powerpoint',


			// open office
			'odt' => 'application/vnd.oasis.opendocument.text',
			'ods' => 'application/vnd.oasis.opendocument.spreadsheet',
		];

		return $mimet[$idx] ?? 'application/octet-stream';
	}

	public static function resolveFromRoot(string ...$parts): string|null {
		$fs = new self();
		return $fs->resolve(...$parts);
	}

	public static function hasExtension(string $path): bool {
		return preg_match('/\.[a-z0-9]+$/i', $path) === 1;
	}

	public function __construct(
		private readonly string $root = ROOT_PATH
	) {
	}

	public function getRoot(): string {
		return $this->root;
	}

	public function resolve(string ...$parts): string|null {
		$joined = self::join(...$parts);
		if (self::isAbsolute($joined)) return file_exists($joined) ? $joined : null;

		$resolved = self::join($this->getRoot(), $joined);
		return file_exists($resolved) ? $resolved : null;
	}

	public function resolveFile(string ...$parts): string|null {
		$joined = self::join(...$parts);
		if (self::isAbsolute($joined)) return $this->isFile($joined) ? $joined : null;

		if ($this->isFile($joined))
			return $this->resolve($joined);
		else if (self::hasExtension($joined)) return null;
		else if ($this->isFile($joined . '.php'))
			return $this->resolve($joined . '.php');

		if ($this->isDir($joined))
			return $this->resolveFile($joined, 'index');

		$matches = glob(self::join($this->getRoot(), $joined) . '.*');
		if (count($matches)) return $matches[0];

		return null;
	}

	public function resolveReal(string ...$parts): string {
		return realpath($this->resolve(...$parts));
	}

	public function include(string $path): mixed {
		return include $this->resolve($path);
	}

	public function includeOnce(string $path): mixed {
		return include_once $this->resolve($path);
	}

	public function require(string $path): mixed {
		return require $this->resolve($path);
	}

	public function requireOnce(string $path): mixed {
		return require_once $this->resolve($path);
	}

	public function get(string $path): string {
		return file_get_contents(self::join($this->getRoot(), $path));
	}

	public function put(string $path, string $contents): void {
		file_put_contents(self::join($this->getRoot(), $path), $contents);
	}

	public function touch(string $path): bool {
		return touch(self::join($this->getRoot(), $path));
	}

	public function exists(string $path): bool {
		return file_exists(self::join($this->getRoot(), $path));
	}

	public function isFile(string $path): bool {
		$resolved = $this->resolve($path);
		return $resolved && is_file($resolved);
	}

	public function isDir(string $path): bool {
		$resolved = $this->resolve($path);
		return $resolved && is_dir($resolved);
	}

	public function isLink(string $path): bool {
		$resolved = $this->resolve($path);
		return $resolved && is_link($resolved);
	}

	public function isReadable(string $path): bool {
		$resolved = $this->resolve($path);
		return $resolved && is_readable($resolved);
	}

	public function isWritable(string $path): bool {
		$resolved = $this->resolve($path);
		return $resolved && is_writable($resolved);
	}

	public function move(string $from, string $to): bool {
		$resolved_from = $this->resolve($from);
		$resolved_to = $this->resolve($to);
		return $resolved_from && $resolved_to && rename($resolved_from, $resolved_to);
	}

	public function copy(string $from, string $to): bool {
		$resolved_from = $this->resolve($from);
		$resolved_to = $this->resolve($to);
		return $resolved_from && $resolved_to && copy($resolved_from, $resolved_to);
	}

	public function unlink(string $path): bool {
		$resolved = $this->resolve($path);
		return $resolved && unlink($resolved);
	}

	public function mkdir(string $path, int $mode = 0777, bool $recursive = false): bool {
		$resolved = $this->resolve($path);
		return $resolved && mkdir($resolved, $mode, $recursive);
	}

	public function glob(string $pattern, int $flags = 0): array|false {
		return glob(self::join($this->getRoot(), $pattern), $flags);
	}

	public function globDeep(string $pattern, int $flags = 0): array|false {
		$matches = $this->glob($pattern, $flags);
		if (!$matches) return [];

		$dirs = $this->glob('*/', GLOB_ONLYDIR | GLOB_NOSORT);
		if (!$dirs) return $matches;

		foreach ($dirs as $dir) {
			$matches = array_merge(
				$matches,
				$this->globDeep(self::join($dir, $pattern), $flags)
			);
		}

		return $matches;
	}
}