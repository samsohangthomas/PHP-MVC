var EcommerceProductsEdit = function () {

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

    var handleReviews = function () {

        var grid = new Datatable();

        grid.init({
            src: $("#datatable_reviews"),
            onSuccess: function (grid) {
                // execute some code after table records loaded
            },
            onError: function (grid) {
                // execute some code on network or other general error  
            },
            loadingMessage: 'Loading...',
            dataTable: { // here you can define a typical datatable settings from http://datatables.net/usage/options 

                // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
                // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/scripts/datatable.js). 
                // So when dropdowns used the scrollable div should be removed. 
                //"dom": "<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'<'table-group-actions pull-right'>>r>t<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'>>",

                "lengthMenu": [
                    [10, 20, 50, 100, 150, -1],
                    [10, 20, 50, 100, 150, "All"] // change per page values here
                ],
                "pageLength": 10, // default record count per page
                "ajax": {
                    "url": "../demo/ecommerce_product_reviews.php", // ajax source
                },
                "columnDefs": [{ // define columns sorting options(by default all columns are sortable extept the first checkbox column)
                    'orderable': true,
                    'targets': [0]
                }],
                "order": [
                    [0, "asc"]
                ] // set first column as a default sort by asc
            }
        });
    }

    var handleHistory = function () {

        var grid = new Datatable();

        grid.init({
            src: $("#datatable_history"),
            onSuccess: function (grid) {
                // execute some code after table records loaded
            },
            onError: function (grid) {
                // execute some code on network or other general error  
            },
            loadingMessage: 'Loading...',
            dataTable: { // here you can define a typical datatable settings from http://datatables.net/usage/options 
                "lengthMenu": [
                    [10, 20, 50, 100, 150, -1],
                    [10, 20, 50, 100, 150, "All"] // change per page values here
                ],
                "pageLength": 10, // default record count per page
                "ajax": {
                    "url": "../demo/ecommerce_product_history.php", // ajax source
                },
                "columnDefs": [{ // define columns sorting options(by default all columns are sortable extept the first checkbox column)
                    'orderable': true,
                    'targets': [0]
                }],
                "order": [
                    [0, "asc"]
                ] // set first column as a default sort by asc
            }
        });
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
                                        "<input type='file' name='product_images[]'/>" +
                                    "</span>" +
                                    "<a href='javascript:;' class='btn red fileinput-exists' data-dismiss='fileinput'> Remove </a>" +
                                    "<a href='javascript:;' class='btn red cancel-product-image'> X </a>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>";

        $(document).off('click', '#add_product_image').on('click', '#add_product_image', function(){
            $('#product_images').append(image);
        });

        $(document).off('click', '.cancel-product-image').on('click', '.cancel-product-image', function(){
            $(this).parent().parent().parent().parent().remove();
        });
        
        $('.make-list').select2use('/getMakeList',10,false);

        $(document).off('change', '.make-list').on('change', '.make-list', function(){
            $('.model-list').select2use('/getModelList/'+$(this).val(),10,false);
        });
        
        $(document).off('change', '.model-list').on('change', '.model-list', function(){
            $('.model-codes-list').select2use('/getModelCodeList/'+$(this).val(),10,false);
        });

/*
        //init maxlength handler
        $('.maxlength-handler').maxlength({
            limitReachedClass: "label label-danger",
            alwaysShow: true,
            threshold: 5
        });*/
    }

    var iniCategorySelect = function(){
        var cat = new Category();

        $(document).off('change', '.category-select').on('change', '.category-select', function(){
            if(cat.isChecked(this)){
                cat.checkParentCategories(this);
            }else{
                cat.unCheckParentCategories(this);
            }

        });
    }

    return {

        //main function to initiate the module
        init: function () {
            initComponents();
            iniCategorySelect();
        }

    };

}();

function Category(){
    /**
     * Checks if the input select is checked
     * @param  {html dom element}  ele [input select]
     * @return {Boolean}     [if checked then returns true else false]
     */
    
    this.isChecked = function(ele){
        return $(ele).parent().is('span.checked');
    },

    /**
     * Check parent categories recursively
     * @param  {html element} ele [input element]
     */
    
    this.checkParentCategories = function(ele){
        if(this.hasParent(ele)){
            var obj2 = $(ele).parent().parent().parent().parent().parent().prev().find('input.category-select');
            this.tickParent(obj2);
            this.checkParentCategories(obj2);
        }
    },

    /**
     * Uncheck parent categories recursively
     * @param  {html element} ele [input element]
     */
    
    this.unCheckParentCategories = function(ele){
        if(this.hasParent(ele)){
            var obj2 = $(ele).parent().parent().parent().parent().parent().prev().find('input.category-select');
            this.unTickParent(obj2);
            this.unCheckParentCategories(obj2);
        }
    },

    /**
     * Checks if the passed category has parent category
     * @param  {html dom element}  obj [input select element]
     * @return {Boolean}     [if has parent then returns true else returns false]
     */
    
    this.hasParent = function(obj){
        return !($(obj).parent().parent().parent().parent().parent().is('ul.main-ul'));
    },

    /**
     * Check the parent select
     * @param  {html dom element} obj [input select element]
     */
    
    this.tickParent = function(obj){
        $(obj).parent().addClass('checked');
    },

    /**
     * Uncheck the parent select
     * @param  {html dom element} obj [input select element]
     */
    
    this.unTickParent = function(obj){
        $(obj).parent().removeClass('checked');
    }
}

jQuery(document).ready(function(){
   EcommerceProductsEdit.init();
});