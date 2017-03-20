function Crud(){

 
  /**
   * applying delete listeners on delete buttons according to module ( like make module have delete buttons with class delete-make, order module have delete buttons have class like delete-order...)
   */
  this.addForm =function(options){
    return  $.ajax({
                                url: options.url,
                                method: 'GET',  
                                data:options.data || null, 
                                 headers: {
                                    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                                },                              
                                success: function(ret){
                                   //console.log(ret);
                                     $('#'+options.module+'-modal'+' .modal-content').html(ret) ;
                                     compos.initSwitch(); 
                                     $('#'+options.module+'-modal').modal();                                     
                                     
                                    if(options.isMenu==true){
                                        crud.MenuModule({'module':options.module});
                                    }else if(options.isCat==true){
                                        crud.CategoryModule({'module':options.module});
                                    }else if(options.isInfo==true){
                                        crud.InfoModule({'module':options.module});
                                    }else{
                                       $('#'+options.module+'-form').applyAjaxForm({
                                        afterPost:function(){
                                           $('#'+options.module+'-form')[0].reset();
                                           $('#'+options.module+'-modal').modal('hide');
                                           options.reload();
                                        }
                                       });
                                    }


                                },
                                error:function(){ alert("Something gone wrong");
                               }
                         });


  },
  this.edit = function(options){
                     
                   return  $.ajax({
                                url: options.url,
                                method: 'GET',  
                                data:options.data || null,    
                                 headers: {
                                      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                                  },                           
                                success: function(ret){
                                   //console.log(ret);
                                     $('#'+options.module+'-modal'+' .modal-content').html(ret) ;
                                     compos.initSwitch(); 
                                     $('#'+options.module+'-modal').modal();                                     
                                     $('#'+options.module+'-form').applyAjaxForm({
                                          afterPost:function(ret){                 
                                             if(options.isMenu==true){
                                                console.log(ret)
                                                if($(options.this).closest('li').attr('data-id')==ret.data.id){
                                                  $(options.this).closest('li').children('.dd-content').empty().append('<span>'+ret.data.menu+'</span>'+
                                                      '<div class="ns-actions"><a title="Publish Menu" id="'+ret.data.id+'" class="'+((ret.data.status==1)?'publish':'unpublish')+'" href="#"><i class="'+((ret.data.status==1)?'fa fa-check-circle-o':'fa fa-times-circle-o')+'"></i></a><a title="Edit Menu" class="edit-menu green-jungle menu-edit" menu-id="'+ret.data.id+'"><i class="fa fa-edit"></i></a>'+
                                                          '<a class="delete-menu btn-sm mt-ladda-btn ladda-button menu-delete" data-style="zoom-out" data-singleton="true" data-toggle="confirmation" data-placement="top" menu-id="'+ret.data.id+'" data-original-title="" title=""><span class="ladda-label"><i class="fa fa-trash"></i></span></a><input type="hidden" value="1" name="menu_id">'+
                                                      '</div>');

                                                }
                                                
                                                compos.initConfirmations(); 
                                                $('#'+options.module+'-form')[0].reset();
                                                $('#'+options.module+'-modal').modal('hide');
                                             }else if(options.isInfo==true){
                                                console.log(ret)
                                                if($(options.this).closest('li').attr('data-id')==ret.data.id){
                                                  $(options.this).closest('li').children('.dd-content').empty().append('<span>'+ret.data.title+'</span>'+
                                                      '<div class="ns-actions"><a title="Publish Menu" id="'+ret.data.id+'" class="'+((ret.data.status==1)?'publish':'unpublish')+'" href="#"><i class="'+((ret.data.status==1)?'fa fa-check-circle-o':'fa fa-times-circle-o')+'"></i></a><a title="Edit Menu" class="edit-menu green-jungle CmsInfo-edit" CmsInfo-id="'+ret.data.id+'"><i class="fa fa-edit"></i></a>'+
                                                          '<a class="delete-menu btn-sm mt-ladda-btn ladda-button CmsInfo-delete" data-style="zoom-out" data-singleton="true" data-toggle="confirmation" data-placement="top" CmsInfo-id="'+ret.data.id+'" data-original-title="" title=""><span class="ladda-label"><i class="fa fa-trash"></i></span></a><input type="hidden" value="1" name="menu_id">'+
                                                      '</div>');

                                                }
                                                
                                                compos.initConfirmations(); 
                                                $('#'+options.module+'-form')[0].reset();
                                                $('#'+options.module+'-modal').modal('hide');
                                             }else if(options.isCat==true){
                                                   if($(options.this).closest('li').attr('data-id')==ret.data.id){
                                                      $(options.this).closest('li').children('.dd-content').empty().append('<span>'+ret.data.title+'</span>'+
                                                          '<div class="ns-actions"><a title="Publish Menu" id="'+ret.data.id+'" class="'+((ret.data.status==1)?'publish':'unpublish')+'" href="#"><i class="'+((ret.data.status==1)?'fa fa-check-circle-o':'fa fa-times-circle-o')+'"></i></a><a title="Edit Menu" class="edit-menu green-jungle category-edit" category-id="'+ret.data.id+'"><i class="fa fa-edit"></i></a>'+
                                                              '<a class="delete-menu btn-sm mt-ladda-btn ladda-button category-delete" data-style="zoom-out" data-singleton="true" data-toggle="confirmation" data-placement="top" category-id="'+ret.data.id+'" data-original-title="" title=""><span class="ladda-label"><i class="fa fa-trash"></i></span></a><input type="hidden" value="1" name="menu_id">'+
                                                          '</div>');

                                                    }

                                                    compos.initConfirmations(); 
                                                    $('#'+options.module+'-form')[0].reset();
                                                    $('#'+options.module+'-modal').modal('hide');
                                             }else{

                                                $('#'+options.module+'-form')[0].reset();
                                                $('#'+options.module+'-modal').modal('hide');
                                                options.reload();
                                            }
                                          }
                                      });

                                },
                                error:function(){ alert("Something gone wrong");
                               }
                         });
  },    

  this.delete = function(options){
                     
        return $.ajax({
                url: options.url,
                method: 'POST',  
                data:options.data || null, 
                headers: {
                    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                },                           
                success: function(ret){
                    //console.log(ret);
                    //alert(options.isCat)
                    if(options.isCat==true || options.isMenu==true || options.isInfo==true){
                    }else{
                      options.reload();

                    }                  

                },
                error:function(){ alert("Something gone wrong");
               }
         });
  },
  this.MenuModule=function(options){
            $('#'+options.module+'-form').applyAjaxForm({
                           afterPost:function(ret){
                            var data='<li class="dd-item dd3-item" data-id="'+ret.data.id+'">'+               
                                        '<div class="dd-handle dd3-handle"></div>'+
                                            '<div class="dd-content"><span>'+ret.data.menu+'</span>'+
                                            '<div class="ns-actions"><a title="Publish Menu" id="'+ret.data.id+'" class="publish" href="#"><i class="fa fa-check-circle-o"></i></a><a title="Edit Menu" class="edit-menu green-jungle menu-edit" menu-id="'+ret.data.id+'"><i class="fa fa-edit"></i></a>'+
                                                '<a class="delete-menu btn-sm mt-ladda-btn ladda-button menu-delete" data-style="zoom-out" data-singleton="true" data-toggle="confirmation" data-placement="top" menu-id="'+ret.data.id+'" data-original-title="" title=""><span class="ladda-label"><i class="fa fa-trash"></i></span></a><input type="hidden" value="1" name="menu_id">'+
                                            '</div>'+
                                        '</div>'+
                                    '</li>';
                            $('#'+options.module+' > ol').prepend(data);
                            compos.initConfirmations(); 


                            $('#'+options.module+'-form')[0].reset();
                            $('#'+options.module+'-modal').modal('hide');                                           
                  }
              });
  },
  this.CategoryModule=function(options){
            $('#'+options.module+'-form').applyAjaxForm({
                           afterPost:function(ret){
                            var data='<li class="dd-item dd3-item" data-id="'+ret.data.id+'">'+               
                                        '<div class="dd-handle dd3-handle"></div>'+
                                            '<div class="dd-content"><span>'+ret.data.title+'</span>'+
                                            '<div class="ns-actions"><a title="Publish Menu" id="'+ret.data.id+'" class="publish" href="#"><i class="fa fa-check-circle-o"></i></a><a title="Edit Menu" class="edit-menu green-jungle category-edit" category-id="'+ret.data.id+'"><i class="fa fa-edit"></i></a>'+
                                                '<a class="delete-menu btn-sm mt-ladda-btn ladda-button category-delete" data-style="zoom-out" data-singleton="true" data-toggle="confirmation" data-placement="top" category-id="'+ret.data.id+'" data-original-title="" title=""><span class="ladda-label"><i class="fa fa-trash"></i></span></a><input type="hidden" value="1" name="menu_id">'+
                                            '</div>'+
                                        '</div>'+
                                    '</li>';
                            $('#'+options.module+' > ol').prepend(data);
                            compos.initConfirmations(); 


                            $('#'+options.module+'-form')[0].reset();
                            $('#'+options.module+'-modal').modal('hide');                                           
                  }
              });
  },
  
  this.InfoModule=function(options){
            $('#'+options.module+'-form').applyAjaxForm({
                           afterPost:function(ret){
                            var data='<li class="dd-item dd3-item" data-id="'+ret.data.id+'">'+               
                                        '<div class="dd-handle dd3-handle"></div>'+
                                            '<div class="dd-content"><span>'+ret.data.title+'</span>'+
                                            '<div class="ns-actions"><a title="Publish Menu" id="'+ret.data.id+'" class="publish" href="#"><i class="fa fa-check-circle-o"></i></a><a title="Edit Menu" class="edit-menu green-jungle CmsInfo-edit" CmsInfo-id="'+ret.data.id+'"><i class="fa fa-edit"></i></a>'+
                                                '<a class="delete-menu btn-sm mt-ladda-btn ladda-button CmsInfo-delete" data-style="zoom-out" data-singleton="true" data-toggle="confirmation" data-placement="top" CmsInfo-id="'+ret.data.id+'" data-original-title="" title=""><span class="ladda-label"><i class="fa fa-trash"></i></span></a><input type="hidden" value="1" name="menu_id">'+
                                            '</div>'+
                                        '</div>'+
                                    '</li>';
                            $('#'+options.module+' > ol').prepend(data);
                            compos.initConfirmations(); 


                            $('#'+options.module+'-form')[0].reset();
                            $('#'+options.module+'-modal').modal('hide');                                           
                  }
              });
  }
  /**
   * applying listeners on edit and cancel button according to the module
   */
    
  /**
   * Showing add form according to the module and title


  /**
   * Showing edit form according to the module and title
   * data = form view received by response
   */
  

}

var crud = new Crud(); // global crud object