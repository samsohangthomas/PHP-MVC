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
                url: "/cmsinfo/update",
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

       
       

        $(document).on('click','.CmsInfo-delete',function(){
            var that=this;
            crud.delete({
                'url':'/cmsinfoDelete',
                'module':'CmsInfo',
                'this':that,
                'isInfo':true, // same for info
                'data':{id:$(this).attr('CmsInfo-id')}
            }).done(function(result){
                   if(result.success='success'){
                        $(that).closest('li').parent().parent().find('button').remove();
                        $(that).closest('li').remove();
                        alertify.success('Successfully Deleted');
                    }   
                });
        });



        $(document).on('click','.CmsInfo-edit',function(){
             
            var that=this;
            crud.edit({
                    'url':'/cmsinfoEdit',
                    'module':'CmsInfo',
                    'isInfo':true, // same for info
                    'this':that,
                    'data':{id:$(this).attr('CmsInfo-id')}
                });
        });

        $(document).on('click','.CmsInfo-add',function(){
              crud.addForm({
                    'url':'/cmsinfoAdd',
                    'module':'CmsInfo',
                    'isInfo':true // same for info
                });
        });

      
      
       
    };

    return {
        //main function to initiate the module
        init: function () {
            initListeners();

            // activate Nestable for list 1
            $('#CmsInfo').nestable({
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