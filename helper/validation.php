<?php 

function validate_required($input,$fieldname){
	if(!empty($input) && strlen($input)>=5):
			return trim($input);
	else:

		$_SESSION[$fieldname]='Required'.(($fieldname=='g-recaptcha-response')?'':' - least 5 character.');
	 	return false;

	endif;

}
function validate_number($input,$fieldname){
	if(!empty($input) && is_numeric($input)):
			return trim($input);
	else:
		$_SESSION[$fieldname]=str_replace('_', ' ', ucfirst($fieldname)).' must be number !!!';
	 	return false;
		
	endif;

}
function validate_string($input, $fieldname){
	if(!empty($input) && is_string($input)):
			return trim($input);
	else:
			$_SESSION[$fieldname]=str_replace('_', ' ', ucfirst($fieldname)).' must be string !!!';
			 	return false;

	endif;
}
function validate_email($input,$fieldname){
	
	if( ! preg_match("/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ix", $input)){
	 		$_SESSION[$fieldname]=str_replace('_', ' ', 'Invalid '.ucfirst($fieldname)).' !!!';
		  	 	return false;
	}else{
	   	return trim($input);
    }
	

}

function validate_image($target_dir,$fieldname){
	

	$target_file = $target_dir . basename($_FILES["$fieldname"]["name"]);

	// dd($target_file);
	$uploadOk = 1;

	$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
	// Check if image file is a actual image or fake image
	if(isset($_POST["submit"])) {
   	 $check = getimagesize($_FILES["$fieldname"]["tmp_name"]);
    	if($check !== false) {
        	$_SESSION["$fieldname"] = "File is an image - " . $check["mime"] . ".";
        	$uploadOk = 1;
        	
    	} else {
        	$_SESSION["$fieldname"] = "File is not an image.";
        	$uploadOk = 0;
        	return false;
   	 }
	}

	if (empty($_FILES["$fieldname"]["name"])) {
    	$_SESSION["$fieldname"] = "Required !!";
    	$uploadOk = 0;
    	return false;
	}
	// Check if file already exists
	if (file_exists($target_file)) {
    	$_SESSION["$fieldname"] = "Sorry, file already exists.";
    	$uploadOk = 0;
    	return false;
	}
	// Check file size
	if ($_FILES["$fieldname"]["size"] > 500000000) {
    	$_SESSION["$fieldname"] = "Sorry, your file is too large.";
    	$uploadOk = 0;
    	return false;
	}
	// Allow certain file formats
	if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
	&& $imageFileType != "gif" ) {
    	$_SESSION["$fieldname"] = "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
	    $uploadOk = 0;
	    return false;
	}
	// Check if $uploadOk is set to 0 by an error
	if ($uploadOk == 0) {
    	$_SESSION["$fieldname"] = "Sorry, your file was not uploaded.";
    	return false;
	// if everything is ok, try to upload file
	} else {

			return true;


	}



}



function uploadImage($fieldname,$target_file){

					            // dd($target_file);
// dd($_FILES["$fieldname"]["tmp_name"]);
		if (move_uploaded_file($_FILES["$fieldname"]["tmp_name"], $target_file)) {
					            // dd($target_file);

    		$_SESSION["$fieldname-success"] = "The file has been uploaded.";
    			return $_FILES["$fieldname"]["name"];
    	} else {
        	$_SESSION["$fieldname"] = "Sorry, there was an error uploading your file.";
        	return false;
    	}
}

?>