<?php
namespace App\Core;


use App\Core\Session;

class Auth{


	 public static function authCheck(){
		 	
	 	$Auth=Session::has("Auth");
	 	$role=(int)$Auth[0]->role_id;
	 	$status=(int)$Auth[0]->status;
	 	
	 	if($Auth && ($role==1 || $role==2) && $status==1){
	 	//	return redirect('dashboard');
	 	}else{
	 		Session::set('error','Please Login First.');
	 		return redirect('login');

	 	}


	}	 

	public static function userCheck(){
	 	$Auth=Session::has("Auth");
	 	$role=(int)$Auth[0]->role_id;
	 	$status=(int)$Auth[0]->status;
	 	
	 	if($Auth && $role==1  && $status==1){
	 	//	return redirect('dashboard');
	 	}else{

	 		Session::set('error','Please Login First.');
	 		return redirect('login');

	 	}


	}

	


}
?>