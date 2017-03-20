var EcommerceProducts = function () {

    var initPickers = function () {
        //init date pickers
        $('.date-picker').datepicker({
            rtl: App.isRTL(),
            autoclose: true,
            format:'yyyy-mm-dd'
        });
    }

    var handleProducts = function() {
        var grid = new Datatable();

        grid.init({
            src: $("#datatable_products"),
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
                    [10, 20, 50, 100, 150],
                    [10, 20, 50, 100, 150] // change per page values here 
                ],
                "pageLength": 10, // default record count per page
                "ajax": {
                    'type': 'post',
                    "url": "/getProductList", // ajax source
                },
                "order": [
                    [1, "asc"]
                ], // set first column as a default sort by asc

              "columns": [

               

                {
                    data: 'id',
                    name: 'id',
                },
                {
                    data: 'product_name',
                    name: 'product_name',
                },
                {
                    data: 'category_title',
                    name: 'category_title',
                },
                {
                    data: 'price',
                    name: 'price',
                },
                {
                    data: 'qty',
                    name: 'qty',
                },
                {
                    data: 'created_at',
                    name: 'created_at',
                },
                {
                    data: 'status',
                    name: 'status',
                },
                {
                    data: 'action',
                    name: 'action',
                    orderable: false,
                    searchable: false
                }

            ]
            }
        });

         // handle group actionsubmit button click
        grid.getTableWrapper().off('click', '.search').on('click', '.search', function (e) {
            e.preventDefault();


              grid.setAjaxParam("id", $('#product_id').val());
              grid.setAjaxParam("product_name", $('#product_name').val());
              grid.setAjaxParam("price_form", $('#price_form').val());
              grid.setAjaxParam("price_to", $('#price_to').val());
              grid.setAjaxParam("qty_from", $('#qty_from').val());
              grid.setAjaxParam("qty_to", $('#qty_to').val());
              grid.setAjaxParam("product_created_from", $("#product_created_from").val());
              grid.setAjaxParam("product_created_to", $("#product_created_to").val());
              grid.setAjaxParam("product_status", $("#product_status").val());


              grid.getDataTable().ajax.reload();
              grid.clearAjaxParams();


            // validation part 
            // if (product_id) {        
              
            // } else{
            //     App.alert({
            //         type: 'danger',
            //         icon: 'warning',
            //         message: 'Product Id is required',
            //         container: grid.getTableWrapper(),
            //         place: 'prepend'
            //     });
            // } 





            // var action = $(".table-group-action-input", grid.getTableWrapper());

            // if (action.val() != "" && grid.getSelectedRowsCount() > 0) {
       
            //     grid.setAjaxParam("customActionType", "group_action");
            //     grid.setAjaxParam("customActionName", action.val());
            //     grid.setAjaxParam("id", grid.getSelectedRows());
            //     grid.getDataTable().ajax.reload();
            //     grid.clearAjaxParams();
            // } else if (action.val() == "") {
            //     App.alert({
            //         type: 'danger',
            //         icon: 'warning',
            //         message: 'Please select an action',
            //         container: grid.getTableWrapper(),
            //         place: 'prepend'
            //     });
            // } else if (grid.getSelectedRowsCount() === 0) {
            //     App.alert({
            //         type: 'danger',
            //         icon: 'warning',
            //         message: 'No record selected',
            //         container: grid.getTableWrapper(),
            //         place: 'prepend'
            //     });
            // }



        });
    }

    return {

        //main function to initiate the module
        init: function () {

            handleProducts();
            initPickers();
            
        }

    };

}();