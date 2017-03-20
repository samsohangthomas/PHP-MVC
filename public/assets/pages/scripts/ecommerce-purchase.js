var EcommercePurchase = function () {

    var initPickers = function () {
        //init date pickers
        $('.date-picker').datepicker({
            rtl: App.isRTL(),
            autoclose: true
        });
    }

    var initComponents = function(){
        $('.vendor-list').select2use('/getVendorList',10,false);
        $('.product-list').select2use('/getProductSelectList',10,false);
    }

    var initListeners = function(){
        $(document).off('click', '#dublication-btn').on('click', '#dublication-btn', function(){
            $('.product-list').last().select2use('/getProductSelectList',10,false);
        });

        $(document).off('change','.quantity,.unit-price').on('change','.quantity,.unit-price', function(){
            var parent = $(this).parent().parent().parent();
            var qty = parent.find('.quantity').val();
            var unit = parent.find('.unit-price').val();

            if((!isNaN(qty) && qty != '') && (!isNaN(unit) && unit != '')){
                parent.find('.total-price').val(parseFloat(qty) * parseFloat(unit));
            }else{
                parent.find('.total-price').val(0);
            }
        });

        $(document).off('click', '.editPurchase').on('click', '.editPurchase', function(){
            var id = $(this).attr('pur-id');

            $.ajax({
                url: '/purchase/'+id+'/edit',
                method: 'GET',
                success: function(data){
                    $('.caption-subject').html('Product Edit');

                    $('#purchase-form').remove();
                    $('#form-contain').prepend(data).hide().fadeIn();
                },
                error:function(){ alert("Something gone wrong");}
              }).done(function(){
                initPickers();
                initComponents();
              });
        });

        $(document).off('click', '.viewPurchaseDetails').on('click', '.viewPurchaseDetails', function(){
            var id = $(this).attr('id');

            $.ajax({
                url: '/purchase/'+id,
                method: 'GET',
                success: function(data){
                    var modal = $('#purchaseDetailsModal');

                    var total = 0;

                    var cellCodes = "";

                    $.each(data['purchase_detail'], function(k, v){
                        total += (v['qty'] * v['unit_price']);
                        cellCodes += "<tr><td>"+v['product']['product_name']+"</td><td><img src='"+v['product']['main_image']+"' class='img-thumbnail media-object' style='height:auto;width:100px;'/></td><td>"+v['qty']+"</td><td>$"+v['unit_price']+"</td><td>$"+v['sales_price']+"</td><td>$"+v['qty'] * v['unit_price']+"</td></tr>";
                    });

                    $('#purchase-id').html('PU00' + id);
                    $('#pur-date').html(data['purchase_date']);
                    $('#vendor-name').html(data['vendor']['vendor_title']);
                    $('#grand-total').html('$' + total);

                    modal.find('#product_purchase_details').html(cellCodes);
                    modal.find('#grand_total').html('$'+total);
                },
                error:function(){ alert("Something gone wrong");}
              }).done(function(){
                $('#purchaseDetailsModal').modal();
            });
        });
    }

    var handlePurchases = function () {

        var grid = new Datatable();

        grid.init({
            src: $("#datatable_purchases"),
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
                    "url": "/getPurchaseList", // ajax source
                },
                "order": [
                    [1, "asc"]
                ], // set first column as a default sort by asc

                "columns": [
                                {
                                    data: 'purchase_no',
                                    name: 'purchase_no',
                                },
                                {
                                    data: 'purchase_date',
                                    name: 'purchase_date',
                                },
                                {
                                    data: 'vendor_title',
                                    name: 'vendor_title',
                                },
                                {
                                    data: 'total',
                                    name: 'total',
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
            
                grid.setAjaxParam("purchase_no", $('#purchase_no').val());
                grid.setAjaxParam("purchase_date_from", $('#purchase_date_from').val());
                grid.setAjaxParam("purchase_date_to", $('#purchase_date_to').val());
                grid.setAjaxParam("vendor_name", $('#vendor_name').val());
                grid.setAjaxParam("total_from", $('#total_from').val());
                grid.setAjaxParam("total_to", $('#total_to').val());
                grid.getDataTable().ajax.reload();
                grid.clearAjaxParams();
        });

    }

    return {

        //main function to initiate the module
        init: function () {

            handlePurchases();
            initPickers();
            initComponents();
            initListeners();
        }

    };

}();