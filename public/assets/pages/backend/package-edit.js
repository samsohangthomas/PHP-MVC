var PackageEdit = function () {

    var handleImages = function() {

        // see http://www.plupload.com/
        var uploader = new plupload.Uploader({
            runtimes : 'html5,flash,silverlight,html4',
             
            browse_button : document.getElementById('tab_images_uploader_pickfiles'), // you can pass in id...
            container: document.getElementById('tab_images_uploader_container'), // ... or DOM Element itself
             
            url : "assets/plugins/plupload/examples/upload.php",
             
            filters : {
                max_file_size : '10mb',
                mime_types: [
                    {title : "Image files", extensions : "jpg,gif,png"},
                    {title : "Zip files", extensions : "zip"}
                ]
            },
         
            // Flash settings
            flash_swf_url : 'assets/plugins/plupload/js/Moxie.swf',
     
            // Silverlight settings
            silverlight_xap_url : 'assets/plugins/plupload/js/Moxie.xap',             
         
            init: {
                PostInit: function() {
                    $('#tab_images_uploader_filelist').html("");
         
                    $('#tab_images_uploader_uploadfiles').click(function() {
                        uploader.start();
                        return false;
                    });

                    $('#tab_images_uploader_filelist').on('click', '.added-files .remove', function(){
                        uploader.removeFile($(this).parent('.added-files').attr("id"));    
                        $(this).parent('.added-files').remove();                     
                    });
                },
         
                FilesAdded: function(up, files) {
                    plupload.each(files, function(file) {
                        $('#tab_images_uploader_filelist').append('<div class="alert alert-warning added-files" id="uploaded_file_' + file.id + '">' + file.name + '(' + plupload.formatSize(file.size) + ') <span class="status label label-info"></span>&nbsp;<a href="javascript:;" style="margin-top:-5px" class="remove pull-right btn btn-sm red"><i class="fa fa-times"></i> remove</a></div>');
                    });
                },
         
                UploadProgress: function(up, file) {
                    $('#uploaded_file_' + file.id + ' > .status').html(file.percent + '%');
                },

                FileUploaded: function(up, file, response) {
                    var response = $.parseJSON(response.response);

                    if (response.result && response.result == 'OK') {
                        var id = response.id; // uploaded file's unique name. Here you can collect uploaded file names and submit an jax request to your server side script to process the uploaded files and update the images tabke

                        $('#uploaded_file_' + file.id + ' > .status').removeClass("label-info").addClass("label-success").html('<i class="fa fa-check"></i> Done'); // set successfull upload
                    } else {
                        $('#uploaded_file_' + file.id + ' > .status').removeClass("label-info").addClass("label-danger").html('<i class="fa fa-warning"></i> Failed'); // set failed upload
                        App.alert({type: 'danger', message: 'One of uploads failed. Please retry.', closeInSeconds: 10, icon: 'warning'});
                    }
                },
         
                Error: function(up, err) {
                    App.alert({type: 'danger', message: err.message, closeInSeconds: 10, icon: 'warning'});
                }
            }
        });

        uploader.init();

    }

   

    var initComponents = function () {
        //init datepickers
        $('.date-picker').datepicker({
            rtl: App.isRTL(),
            autoclose: true,
            format:'mm-yyyy'

        });

        //init datetimepickers
        $(".datetime-picker").datetimepicker({
            isRTL: App.isRTL(),
            autoclose: true,
            todayBtn: true,
            pickerPosition: (App.isRTL() ? "bottom-right" : "bottom-left"),
            minuteStep: 10
        });

        var image = "<div class='col-md-3'>" +
                        "<div class='col-md-8'>" +
                            "<div class='fileinput fileinput-new' data-provides='fileinput'>" +
                                "<div class='fileinput-preview thumbnail' data-trigger='fileinput' style='width: 200px; height: 150px;'> </div>" +
                                "<div>" +
                                    "<span class='btn red btn-outline btn-file'>" +
                                        "<span class='fileinput-new'> Select image </span>" +
                                        "<span class='fileinput-exists'> Change </span>" +
                                        "<input type='file' name='trip_image[]'/>" +
                                    "</span>" +
                                    "<a href='javascript:;' class='btn red fileinput-exists' data-dismiss='fileinput'> Remove </a>" +
                                    "<a href='javascript:;' class='btn red cancel-trip-image'> X </a>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>";

        $(document).off('click', '#add_trip_image').on('click', '#add_trip_image', function(){
            $('#trip_images').append(image);
        });

        $(document).off('click', '.cancel-trip-image').on('click', '.cancel-trip-image', function(){
            $(this).parent().parent().parent().parent().remove();
        });



/*
        //init maxlength handler
        $('.maxlength-handler').maxlength({
            limitReachedClass: "label label-danger",
            alwaysShow: true,
            threshold: 5
        });*/
    }

    var packageCrud=function(){
         $('#package_form').applyAjaxForm({
                afterPost:function(ret){
                    if(ret.insert=='done'){
                      location.href="/package/"+ret.id+"/edit";
                    }
                    if(ret.update=='done'){
                      location.href="/package/"+ret.id+"/edit";
                    }

                }
            });
            

                 $(document).off('click', '.deleteImg').on('click', '.deleteImg', function(){
                    var id=$(this).attr('id');
                    //alert(id)
                    var uri='/deletePackageImage'; 
                    $.ajax({
                            url: uri,
                            method: 'POST',
                            data: {id:id},
                            headers: {
                              'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                            },
                            success: function(ret){
                                if(ret['result']=='success'){
                                    $("#img"+id).remove();
                                    alertify.success('Successfully Deleted');
                                }

                            },
                            error:function(){ alert("Something gone wrong");}
                     });
                   
                   });

                 
 
            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                

                // $('.tab-pane').find('.inlineEdit').attr('contenteditable',true);
                

                // var editor = CKEDITOR.inline($('#package_cost'));

                // editor.on('focus', function () {
                //     editor.setReadOnly(false);
                // });
                 
 
            });
       

        

    }

   

    return {

        //main function to initiate the module
        init: function () {
            initComponents();
            packageCrud();
        }

    };

};


var package=new PackageEdit();

