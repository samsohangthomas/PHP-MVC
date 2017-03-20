var EcommerceOrders = function () {

    var initPickers = function () {
        //init date pickers
        $('.date-picker').datepicker({
            rtl: App.isRTL(),
            autoclose: true,
            format:'yyyy-mm-dd'
        });
    }

    var handleOrders = function () {

        var grid = new Datatable();

        grid.init({
            src: $("#datatable_orders"),
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
                    "type": "POST",
                    "url": "/getOrdersList", // ajax source
                },
                "order": [
                    [1, "asc"]
                ], // set first column as a default sort by asc

                "columns": [
                                {
                                    data: 'order_no',
                                    name: 'order_no',
                                },
                                {
                                    data: 'order_date',
                                    name: 'order_date',
                                },
                                {
                                    data: 'customer_name',
                                    name: 'customer_name',
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
        grid.getTableWrapper().on('click', '.table-group-action-submit', function (e) {
            e.preventDefault();
                grid.setAjaxParam("order_no", $('#order_no').val());
                grid.setAjaxParam("order_date_from", $('#order_date_from').val());
                grid.setAjaxParam("order_date_to", $('#order_date_to').val());
                grid.setAjaxParam("order_customer_name", $('#order_customer_name').val());
                grid.setAjaxParam("order_status", $('#order_status').val());
                grid.getDataTable().ajax.reload();
                grid.clearAjaxParams();
        });

    }

    return {

        //main function to initiate the module
        init: function () {

            initPickers();
            handleOrders();
        }

    };

}();

jQuery(document).ready(function() {    
   EcommerceOrders.init();
});