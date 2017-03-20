
<?php include('includes/header.php');?>


<div class="row">

    <div class="container">

        <h3> 
        <img src="<?php echo public_path();?>front/images/php.png">
        PHP Web Application</h3>


    </div> <!--container ends-->
  </div><!--row ends-->

 


<?php include('includes/footscript.php');?>
<script type="text/javascript">
// console.log(angular);
    var app = angular.module('myApp', []);
    app.controller('latestBlogCtrl', function($scope, $http) {
        var that=this; 
        this.data=null;
        $http({
          method: 'GET',
          url: "<?php echo base_path();?>"+'json'
        })
       .then(function successCallback(response) {
          console.log(response);
          that.data = response.data;
          // this callback will be called asynchronously
          // when the response is available
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    });
</script>
<?php include('includes/footer.php');?>
