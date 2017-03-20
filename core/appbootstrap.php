<?php

//boot up app

use App\Core\App;
use App\Core\Database\Connector;
use App\Core\Database\QueryBuilder;





//Bind config key
App::bind('config', require __DIR__.'/../config/database.php');
App::bind('paths', require __DIR__.'/../config/paths.php');
// dd(App::get('paths')['base_path']);
//Bind database key
App::bind('database', new QueryBuilder(
	Connector::make(
		App::get('config')['database'])
	)
);









// core functions

function base_path(){
	return App::get('paths')['base_path'];
}
function public_path(){
	return App::get('paths')['public_path'];
}

function view_path(){
	return App::get('paths')['view_path'];
}




function dd($arr){

	echo "<pre>";
	var_dump($arr);
	echo "</pre>";
	die;

}

function view($file, $data=[])
{
	extract($data);
	return require("views/{$file}.php");
}

function redirect($path)
{
	return header("Location: /{$path}");
}
