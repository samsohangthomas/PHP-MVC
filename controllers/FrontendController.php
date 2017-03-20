<?php

namespace App\Controllers;


use App\Core\App;
use App\Core\Session;


class FrontendController
{  
	function __construct(){


	}

	

	public function home(){    
	 
	  return view('frontpanel/home',compact('categories','latestblogs','featuredlists','contact','about'));

	   
	}	


	
}

         