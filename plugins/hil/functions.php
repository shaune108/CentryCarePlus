<?php

function template_part(string $template_name, array $vars = [])
{
	foreach(array_keys($vars) as $key) {
		if(is_numeric($key)) {
			throw new Exception("Invalid template variable name: $key ($vars[$key])");
		}
	}

	global $template_vars;
	$template_vars = $vars;

	require "templates/$template_name.php";
	unset($template_vars);
}

function template_vars(array $wanted_vars)
{
	global $template_vars;
	$vars = [];

	foreach (array_keys($wanted_vars) as $key) {
		if(is_numeric($key)) {
			$var_name = $wanted_vars[$key];

			if(!array_key_exists($var_name, $template_vars) || !isset($template_vars[$var_name])) {
				throw new Exception("Missing template variable: $var_name");
			} else {
				$vars[$var_name] = $template_vars[$var_name];
			}
		} else {
			if(!array_key_exists($key, $template_vars) || !isset($template_vars[$key])) {
				$vars[$key] = $wanted_vars[$key];
			} else {
				$vars[$key] = $template_vars[$key];
			}
		}
	}

	return $vars;
}

function print_attrs(array $attrs)
{
	return implode(' ', array_map(function ($key, $value) {
		return "$key=\"$value\"";
	}, array_keys($attrs), $attrs));
}

function in_request(string $niddle)
{
	return isset($_REQUEST[$niddle]) && !empty($_REQUEST[$niddle]);
}

function url_exist($url)
{
	$c=curl_init();
	curl_setopt($c, CURLOPT_URL, $url);
	curl_setopt($c, CURLOPT_HEADER, 1);
	curl_setopt($c, CURLOPT_NOBODY, 1);
	curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($c, CURLOPT_FRESH_CONNECT, 1);
	if(!curl_exec($c)) {
		return false;
	} else {
		return true;
	}
}

function get_page()
{
	if(in_request('page')) {
		return (int) $_REQUEST['page'];
	} else {
		return 1;
	}
}

function query_db()
{
	if(in_request('lang') && $_REQUEST['lang']=='2') {
		$url = "https://wsearch.nlm.nih.gov/ws/query?db=healthTopicsSpanish";
	} else {
		$url = "https://wsearch.nlm.nih.gov/ws/query?db=healthTopics";
	}


	if(in_request('term')) {
		$term = str_replace(" ", "-", $_REQUEST['term']);
	} else {
		$term = "Health-Information";
	}

	if(in_request('retmax')) {
		$retmax = $_REQUEST['retmax'];
	} else {
		$retmax = "5";
	}

	if(in_request('retstart')) {
		$retstart = $_REQUEST['retstart'];
	} else {
		if(in_request('page')) {
			$page = (int) $_REQUEST['page'];

			if($page < 1) {
				$page = 1;
			}

			$page--;
			$retstart = $page*$retmax;
		} else {
			$retstart = "0";
		}
	}

	$fullurl = $url."&term=".$term."&retstart=".$retstart."&retmax=".$retmax;

	// url_exists always returns false, unsure why
	// if(!url_exist($fullurl)) {
	// 	return [
	// 		'total' => 1,
	// 		'start' => 0,
	// 		'per_page' => 1,
	// 		'data' => []
	// 	];
	// }

	$myxmldata = simplexml_load_file($fullurl);


	$totalnum = $myxmldata->count;
	$retstart = $myxmldata->retstart;
	$retmax = $myxmldata->retmax;

	$i=0;
	$temp = array();

	if ($totalnum <= 0) {
		return [
			'total' => 1,
			'start' => 0,
			'per_page' => 1,
			'data' => []
		];
	}

	foreach ($myxmldata->list->document  as $pixinfo) {
		$query1 = '//document/content[@name="title"]';
		$query2 = '//document/content[@name="FullSummary"]';

		$nodes = (array) $pixinfo->xpath($query1);
		$nodes2 = (array) $pixinfo->xpath($query2);
		$i=0;

		$temp = array();
		foreach($nodes as $tp) {
			$temp[$i]['title'] = (string) $tp;
			$i++;
		}
		$i=0;
		foreach($nodes2 as $tp) {
			$temp[$i]['body'] = (string) $tp;
			$i++;
		}
	}

	return [
		'total' => (int) $totalnum,
		'start' => (int) $retstart,
		'per_page' => (int) $retmax,
		'data' => $temp
	];
}

function format_paginate_href(string $page)
{
	$query = $_GET; // copy the query string array
	$query['page'] = $page; // add the page parameter

	return '?' . http_build_query($query);
}

function format_menu_href(string $link)
{
	$query = $_GET; // copy the query string array
	unset($query['page']); // remove the page parameter

	$query['term'] = $link;

	return '?' . http_build_query($query);
}
