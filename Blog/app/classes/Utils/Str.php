<?php

namespace EZPost\Utils;

class Str {
	static public function slugify(string $str): string {
		$str = strtolower($str);

		// replace any forward or backwards slash with a space, to later be replaced with a dash
		$str = preg_replace('/[\/|\\\]+/', ' ', $str);
		$str = preg_replace('/[^a-z0-9\s]/', '', $str);
		return trim(preg_replace('/\s+/', '-', $str), '-');
	}
}