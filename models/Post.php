<?php

namespace App\Models;

use App\Core\App;
use App\Core\Session;


/* Model example */
class Post
{  

	function __construct(){
		$this->table = 'posts';
		$this->db = App::get('database');
		$this->req=$_POST;
	}

	public function PostList(){
		
		$res=$this->db->raw("select * from posts");
		return $res;

	}
	
	


	public function insertPost($req){

					if(isset($req['status'])){
						$status=$req['status'];					
					}else{
						$status=0;
					}

 					$data['cat_id'] = $req['cat_id'];
 					$data['author_id'] =Session::get('Auth')[0]->id;
 					$data['post_title'] = validate_required($req['post_title'],'post_title');
 					$data['post_content'] = validate_required($req['post_content'],'post_content');
 					$data['isFeatured'] = $req['isFeatured'];
 					$data['created_at'] = date('Y-m-d');
 					$data['updated_at'] = date('Y-m-d');
 					$data['status'] = $status;

 					$target_dir =__DIR__.'/../public/uploads/Post/';
			        // dd($target_dir);
	                $featureImageName = validate_image($target_dir,'featureImage');
	                if($featureImageName==false || $data['post_title']==false || $data['post_content']==false){
						header('Location: ' . $_SERVER['HTTP_REFERER']);
	                }else{


					            $target_file = $target_dir . basename($_FILES["featureImage"]["name"]);
					            uploadImage("featureImage",$target_file);
					       

			                 	$data['featureImage'] = $_FILES["featureImage"]["name"];		
	               				$res=$this->db->insert($this->table,$data);	
								Session::set('success','Successfully Inserted !!!');
	               				return redirect('PostManger');

	                 }

	}


	public function updatePost($req){
			    
					$id = $req['id'];
					$Postdata = $this->db->find($this->table,$id);

					if(isset($req['status'])){
						$status=$req['status'];					
					}else{
						$status=0;
					}

 					$data['cat_id'] = $req['cat_id'];
 					$data['author_id'] =$Postdata[0]->author_id;
 					$data['post_title'] = validate_required($req['post_title'],'post_title');
 					$data['post_content'] = validate_required($req['post_content'],'post_content');
 					$data['isFeatured'] = $req['isFeatured'];
 					$data['updated_at'] = date('Y-m-d');
 					$data['status'] = $status;
   					

					if(!empty($_FILES["featureImage"]["name"])){

					   $oldImage=$Postdata[0]->featureImage;
					   $oldImagePath=__DIR__.'/../public/uploads/Post/'.$oldImage;

					   unlink($oldImagePath);
					   $target_dir =__DIR__.'/../public/uploads/Post/';
		               $featureImageName = validate_image($target_dir,'featureImage');

		               if($featureImageName==false){
							header('Location: ' . $_SERVER['HTTP_REFERER']);		               	
		               }else{

					            $target_file = $target_dir . basename($_FILES["featureImage"]["name"]);
					            uploadImage("featureImage",$target_file);	    

			                 	$data['featureImage'] = $_FILES["featureImage"]["name"];	
		               }
					}else{
						 $data['featureImage']=$Postdata[0]->featureImage;
					}


					 if($data['post_title']==false || $data['post_content']==false){
							header('Location: ' . $_SERVER['HTTP_REFERER']);
		                }else{
	
               				$res=$this->db->update($this->table,$data,$id);	
							Session::set('success','Successfully Updated !!!');
               				return redirect('PostManger');

	                 }


				
	}
	   
	   

}