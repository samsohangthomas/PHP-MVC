<?php
namespace App\Core;


class Session{

	function __construct(){
	}


	public static function getAll(){
		return $_SESSION;
	}

	public static function set($key,$value){
			
	 	   $_SESSION[$key]=$value;
	}


	public static function get($key){
		if(isset($_SESSION[$key])){
			return $_SESSION[$key];
		}
	}


	
	public static function has($key){
		  
	if(isset($_SESSION[$key])){
			return $_SESSION[$key];
		}
	
	}


	public static function unsetValue($key){
		unset($_SESSION[$key]);

	}

	

	public static function destroy(){
		session_destroy();
	}


}
?>


