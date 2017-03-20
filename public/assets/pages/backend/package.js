function Package() {
    this.table = '',

    this.handletype = function(){
        this.table = $('#datatable_package').easyDatatable({
            url:'/getPackageList',
            columns: [ 'category','title', 'status', ['action', false, false]],
            afterDraw: function(){
                compos.initConfirmations();
            }
        });
    },

    this.reDraw = function(){
        this.table.getDataTable().draw();
    },


    this.initListeners = function(){

           $(document).on('click','.delete-package',function(){
            
                var id=$(this).attr('package-id');

                var uri='/deletePackage'; 
                $.ajax({
                        url: uri,
                        method: 'POST',
                        data:{id:id},
                        headers: {
                                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                            },  
                        success: function(ret){
                            
                            alertify.alert(ret.result);
                            package.reDraw();
                        },
                        error:function(){ alert("Something gone wrong");
                       }
                 });
                

          
        });


},

    this.init = function(){
        this.handletype();
        this.initListeners();
        $('.date-picker').datepicker({
            rtl: App.isRTL(),
            autoclose: true,
            format:'yyyy-mm-dd'
        });
    }
}
var package = new Package(); 
