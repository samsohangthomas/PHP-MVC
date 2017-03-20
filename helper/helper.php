<?php

  function active($path, $active = 'start active') {

      $url = trim(
      parse_url(
        $_SERVER['REQUEST_URI'], PHP_URL_PATH
        ),'/'
      );

     return ($path==$url)?$active:'';

 }
 function set_active($path, $active = 'start active open') {

      $url = trim(
      parse_url(
        $_SERVER['REQUEST_URI'], PHP_URL_PATH
        ),'/'
      );

     return ($path==$url)?$active:'';

 }

  function getTitle() {

      $url = trim(
      parse_url(
        $_SERVER['REQUEST_URI'], PHP_URL_PATH
        ),'/'
      );

     return ucfirst($url);

 }


 function standardFormat($data){

 	return date('d M, Y',strtotime($data));

 }

 function status($status){
 	$path=public_path();
 	if($status==0){
 		$img="<img src='".$path."assets/images/off.png'>";
 	}else{
 		$img="<img src='".$path."assets/images/on.png'>";

 	}
 	return $img;

 }


 function shortexcerpt($data){

 	return (strlen($data)>30)?substr($data,0,30).' ...':$data;

 }



 function avatar($avatar){
 	$path=public_path();
 	if(empty($avatar)){
 		$img="<img height='50px' src='".$path."assets/images/icon_user.png'>";
 	}else{
 		$img="<img  height='50px' src='".$path."uploads/users/".$avatar."'>";

 	}
 	return $img;

 }


function showSuccess($field){

 	if(isset($_SESSION[$field])){ 

				echo "<div class='alert alert-success'>".
                    "<button class='close' data-close='alert'></button>".
                    "<span>".$_SESSION[$field]."</span>".
                	"</div>";
 		unset($_SESSION[$field]);	
 	}
}

function showError($field){

  if(isset($_SESSION[$field])){ 

        echo "<div class='alert alert-danger'>".
                    "<button class='close' data-close='alert'></button>".
                    "<span>".$_SESSION[$field]."</span>".
                  "</div>";
    unset($_SESSION[$field]); 
  }
}

function frontFormError($field){

  if(isset($_SESSION[$field])){ 

        echo $_SESSION[$field];
    unset($_SESSION[$field]); 
  }else{
        echo "&nbsp;";
  }
}