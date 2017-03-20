<?php

 ini_set('display_errors',1); 
 error_reporting(E_ALL);

session_start();

use App\Core\Router;
use App\Core\Request;
use App\Core\appbootstrap;
use App\Core\Session;


require __DIR__.'/vendor/autoload.php';
require __DIR__.'/core/appbootstrap.php';

Router::load('routes.php')->direct(Request::getUri(), Request::method());
