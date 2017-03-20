<?php
return [
	'database'=> [
		'user' => 'root',
		'password' => 'secret',
		'dbname' => 'blog',
		'connection' => 'mysql:host=127.0.0.1',
		'options' => [
			PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
		]
	]
	
];

   
