function Enquiry() {
    this.table = '',

    this.handleenquiry = function(){
        this.table = $('#datatable_enquiry').easyDatatable({
            url:'/getEnquiryList',
            columns:[ 'created_at','package_id','name', ['action', false, false]],
            afterDraw: function(){
                compos.initConfirmations();
            }
        });
    },


   

    this.initListeners = function(){



  $(document).on('click','.enquiry-delete',function(){

                        var id = $(this).attr('id');
                        var that=this;

                        var uri='/deleteEnquiry'; 
                        $.ajax({
                                url: uri,
                                method: 'POST',
                                data: {id:id},
                                headers: {
                                    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                                },    
                                success: function(ret){
                                    if(ret['result']=='success'){
                                       $(that).closest('tr').remove();
                                    }

                                },
                                error:function(){ alert("Something gone wrong");
                               }
                         });
             });


           $(document).on('click','.enquiry-edit',function(){



                        var id = $(this).attr('id');
                        var that=this;

                        var uri='/getEnquiryData'; 
                        $.ajax({
                                url: uri,
                                method: 'POST',
                                data: {id:id},
                                headers: {
                                    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                                },   
                                success: function(ret){
                                    console.log(ret);
                                     $('#enquiry .portlet-body').html(ret) ;
   
                                    $('#enquiry').modal();
                                },
                                error:function(){ alert("Something gone wrong");
                               }
                         });
             });




    }

    this.init = function(){
        this.handleenquiry();
        this.initListeners();
        $('.date-picker').datepicker({
            rtl: App.isRTL(),
            autoclose: true,
            format:'yyyy-mm-dd'

        });
    }
}
var enquiry = new Enquiry(); 
jQuery(document).ready(function() {    
   enquiry.init();
});