
  function Editor(){

      this.init=function(){
            $.fn.Editor=function(){
              var idClass=$(this).attr('id');
            return CKEDITOR.replace(idClass,{
                on: {
                    blur: function( event ) {
                       //alert(idClass)
                      //alert(this.getData())
                        //this.getData();
                        $("textarea."+idClass).text(this.getData());
                    }
                }
            });

           }
       
       }
  }
  var customck=new Editor();