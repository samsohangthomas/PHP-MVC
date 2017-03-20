var UINestable = function () {

    /*var updateOutput = function (e) {
        e.stopPropagation();
        
        var list = e.length ? e : $(e.target),
            output = list.data('output');
            console.log(list);
        if (window.JSON) {
            output.val(window.JSON.stringify(list.nestable('serialize'))); //, null, 2));
            alert(window.JSON.stringify(list.nestable('serialize')));
        } else {
            output.val('JSON browser support required for this demo.');
        }
    };*/

    var updateOutput = function(e) {
        e.stopPropagation();
        var list = e.length ? e : $(e.target),
            output = list.data('output');
        if (window.JSON) {

            var jsonData = window.JSON.stringify(list.nestable('serialize'));

            //console.log(window.JSON.stringify(list.nestable('serialize')));

            $.ajax({
                type: "POST",
                url: "/category/update",
                data: { 'json': jsonData },
                headers: {
                    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                },
                success: function(response) {

                    alertify.success(response['result']);
                   
                },
                error: function() {
                    alert("error");
                }
            });

        } else {
            alert('JSON browser support required for this action.');
        }
    };




    var initListeners = function(){

       
       

        $(document).on('click','.category-delete',function(){
            var that=this;
            crud.delete({
                'url':'/categoryDelete',
                'module':'category',
                'this':that,
                'isCat':true,
                'data':{id:$(this).attr('category-id')}
            }).done(function(result){
                   if(result.success='success'){
                        $(that).closest('li').parent().parent().find('button').remove();
                        $(that).closest('li').remove();
                        alertify.success('Successfully Deleted');
                    }   
                });
        });



        $(document).on('click','.category-edit',function(){
             
            var that=this;
            crud.edit({
                    'url':'/categoryEdit',
                    'module':'category',
                    'isCat':true,
                    'this':that,
                    'data':{id:$(this).attr('category-id')}
                });
        });

        $(document).on('click','.category-add',function(){
              crud.addForm({
                    'url':'/categoryAdd',
                    'module':'category',
                    'isCat':true
                });
        });

      
      
       
    };

    return {
        //main function to initiate the module
        init: function () {
            initListeners();

            // activate Nestable for list 1
            $('#category').nestable({
                group: 1
            })
            .on('change', updateOutput);


            //updateOutput($('#categorymenu'));


        }

    };

}();

jQuery(document).ready(function() {    
   UINestable.init();
});