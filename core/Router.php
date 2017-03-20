<?php

namespace App\Core;

class Router
{
	protected $routes = [
		'GET' => [],
		'POST' => []
	];

	/**
	 * loading the routes 
	 */
	public static function load($file)
	{
		// var_dump(__DIR__.'/../'.$file);die();
		$router = new static;
		require __DIR__.'/../'.$file;
		return $router;
	}

	/**
	 * get the routes with get request
	 */
	public function get($uri, $controller)
	{
		$this->routes['GET'][$uri] = $controller;
	}

	/**
	 * get the routes with post request
	 */
	public function post($uri, $controller)
	{
		$this->routes['POST'][$uri] = $controller;
	}


	/**
	 * directing the routes to the controller
	 */
	public function direct($uri, $requestType)
	{
		//echo $this->routes[$requestType][$uri];

		if(array_key_exists($uri, $this->routes[$requestType]))
		{
			return $this->callAction(
				...explode('@', $this->routes[$requestType][$uri])
			);
		}else{

			// echo "Route does not exit.";
	    	throw new Exception("No routes found");

		}
		
	}

	/**
	 * call the appropriate method of the controller
	 */
	protected function callAction($controller, $action)
	{
		$controller = "App\\Controllers\\{$controller}";
		$controller = new $controller;
		if(! method_exists($controller, $action))
		{
			throw new Exception(
				"{controller} doesn't contains {$action} action"
			);
		}
		return $controller->$action();
	}








}