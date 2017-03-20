function Type() {
    this.table = '',

    this.handletype = function(){
        this.table = $('#datatable_type').easyDatatable({
            url:'/getTypeList',
            columns: [ 'status','slug', 'type_title', ['action', false, false]],
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
        var selector = '#type-form.form-' + ((reapply)?'edit':'add');

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

           $(document).on('click','.type-delete',function(){
            
            var that=this;
            crud.delete({
                'module':'type',
                'url':'/typeDelete',
                'this':that,
                'data':{id:$(this).attr('type-id')},
                reload:function(){
                    type.reDraw();
                    alertify.success('Successfully Deleted');
                }
            });
        });



        $(document).on('click','.type-edit',function(){
             
            var that=this;
            crud.edit({
                    'module':'type',
                    'url':'/type/'+$(this).attr('type-id')+'/edit',
                    'this':that,
                     reload: function(){
                        type.reDraw();
                    }             
                
                });
        });

        $(document).on('click','.type-add',function(){
             var that=this;
              crud.addForm({
                    'url':'/type/create',
                    'module':'type',
                    reload:function(){
                        type.reDraw();
                    }
                });
        });


    }

    this.init = function(){
        this.handletype();
        this.initForm();
        this.initListeners();
    }
}
var type = new Type(); 
jQuery(document).ready(function() {    
   type.init();
});