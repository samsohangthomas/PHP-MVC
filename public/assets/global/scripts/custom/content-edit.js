
  

/* FOR ADDING CKEDITOR */

   $('div[contenteditable="true"]').each(function( index ) {

        var content_id = $(this).attr('id');



         /*CKEDITOR.replace( $(this).attr('id'), {
            allowedContent: 'span i'
        } );*/

        var editor_content = $('#'+content_id).html();
        var cont_length = $('#'+content_id).children().length;
       
        // if(cont_length == 0 )
        // {    
        //     $('#'+content_id).html('Click Here to edit dkd');
        // }
        

        //modal shown start
     //$('.modal').on('shown.bs.modal', function (e) {
        
        CKEDITOR.inline( content_id, {
            on: {
                blur: function( event ) {
                   // alert(content_id);                  
                    var data = event.editor.getData();
                   
                    $('#textarea-'+content_id).text(data);
                    /* var request = jQuery.ajax({
                        url: "/admin/cms-pages/inline-update",
                        type: "POST",
                        data: {
                            content : data,
                            content_id : content_id,
                            tpl : tpl
                        },
                        dataType: "html"
                    });
                    */
                }
            }
        });

 //});// model shown ends
    });
     



/* FOR EDIING CKEDITOR */
       

 $('.modal').on('shown.bs.modal', function (e) {

       $('.datepicker').daterangepicker({
          calender_style: "picker_4",
          format: 'YYYY-MM-DD'
            
        });

    $(this).find("*[contenteditable='false']").each(function () {
        var name;
        for (name in CKEDITOR.instances) {
            var instance = CKEDITOR.instances[name];
            if (this && this == instance.element.$) {
                instance.destroy(true);
            }
        }
        $(this).attr('contenteditable', true);


        var content_id_edit = $(this).attr('id');


        var editor_content_edit = $('#'+content_id_edit).html();
        //alert(editor_content_edit)
        var cont_length_edit = $('#'+content_id_edit).children().length;
       
        if(cont_length_edit == 0 )
        {    
            $('#'+content_id_edit).html('Click Here to edit Content');
        }


        CKEDITOR.inline(this, {
            on: {
                blur: function( event ) {
                  
                    var data = event.editor.getData();
                        //alert(content_id_edit)
                   
                    $('#textarea-'+content_id_edit).text(data);
                    /* var request = jQuery.ajax({
                        url: "/admin/cms-pages/inline-update",
                        type: "POST",
                        data: {
                            content : data,
                            content_id : content_id,
                            tpl : tpl
                        },
                        dataType: "html"
                    });
                    */

                }
            }
        });

        
    });
});