function banner() {
    this.table = '',

    this.handlebanner = function(){
        this.table = $('#datatable_banner').easyDatatable({
            url:'/getBannerList',
            columns: [ 'status', 'title','banner_image', ['action', false, false]],
            afterDraw: function(){
                compos.initConfirmations();
            }
        });
    },

    this.reDraw = function(){
        this.table.getDataTable().draw();
    },

    this.initForm = function(reapply){
        var that = this;
        var selector = '#banner-form.form-' + ((reapply)?'edit':'add');

        $(selector).applyAjaxForm({
            afterPost: function(){
                that.reDraw();
            }
        });
    },

    this.reApplyAjaxForm = function(){
        this.initForm(true);
    },

    this.initListeners = function(){

           $(document).on('click','.banner-delete',function(){
            
            var that=this;
            crud.delete({
                'module':'banner',
                'url':'/bannerDelete',
                'this':that,
                'data':{id:$(this).attr('banner-id')},
                reload:function(){
                    banner.reDraw();
                    alertify.success('Successfully Deleted');
                }
            });
        });



        $(document).on('click','.banner-edit',function(){
             
            var that=this;
            crud.edit({
                    'module':'banner',
                    'url':'/banner/'+$(this).attr('banner-id')+'/edit',
                    'this':that,
                     reload: function(){
                        banner.reDraw();
                    }             
                
                });
        });

        $(document).on('click','.banner-add',function(){
             var that=this;
              crud.addForm({
                    'url':'/banner/create',
                    'module':'banner',
                    reload:function(){
                        banner.reDraw();
                    }
                });
        });


    }

    this.init = function(){
        this.handlebanner();
        this.initForm();
        this.initListeners();
    }
}
var banner = new banner(); 
jQuery(document).ready(function() {    
   banner.init();
});