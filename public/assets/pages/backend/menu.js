function MenuNestable(){

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

    this.data = '', // for storing the data of the category order in json string form

    this.updateOutput = function(e, that) {

        e.stopPropagation();
        var list = e.length ? e : $(e.target),
            output = list.data('output');

        if (window.JSON) {

            var jsonData = window.JSON.stringify(list.nestable('serialize'));


            if(!that.isPositionChanged(jsonData)){ // checks if the position is changed
                return; // if position is not changed then return, do nothing
            }else{
                that.data = jsonData; // else update the data of the current category object
            }
            
            //console.log(window.JSON.stringify(list.nestable('serialize')));

            $.ajax({
                type: "POST",
                url: "/menu/update",
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
    },

    this.setData = function(){ // sets the data of category order as json string in the this.data attribute
        this.data = window.JSON.stringify($('#categorymenu').nestable('serialize'));
    },

    this.isPositionChanged = function(currentData){ // checks if the position of the category list is changed
        return (this.data != currentData);
    },
    this.initListeners=function(){
                 $(document).on('click','.menu-delete',function(){
                    
                    var that=this;
                    crud.delete({
                        'url':'/menuDelete',
                        'module':'menu',
                        'this':that,
                        'isMenu':true,
                        'data':{id:$(this).attr('menu-id')}
                    }).done(function(result){
                           if(result.success='success'){
                                $(that).closest('li').parent().parent().find('button').remove();
                                $(that).closest('li').remove();
                                alertify.success('Successfully Deleted');
                            }   
                        });
                 });

                $(document).on('click','.menu-edit',function(){
                     
                    var that=this;
                    crud.edit({
                            'url':'/menuEdit',
                            'module':'menu',
                            'isMenu':true,
                            'this':that,
                            'data':{id:$(this).attr('menu-id')}
                        });
                });

                $(document).on('click','.menu-add',function(){
                      crud.addForm({
                            'url':'/menuAdd',
                            'module':'menu',
                            'isMenu':true
                        });
                });
    },
    this.init = function(){
        var that=this;
        this.initListeners();
       
        
        $('#menu').nestable({ group: 1 });
        $('#footermenu').nestable({ group: 1 });

        this.setData(); // store the the order of category list in json form

        $(document).off('change', '#menu').on('change', '#menu', function(e){
            that.updateOutput(e, that); // on change execute updateOutput (event, reference of the current category object)
        });     
       
        $(document).off('change', '#footermenu').on('change', '#footermenu', function(e){
            that.updateOutput(e, that); // on change execute updateOutput (event, reference of the current category object)
        });     

        return this;

    }

};






jQuery(document).ready(function() {    
     var nestable = new MenuNestable().init();
});