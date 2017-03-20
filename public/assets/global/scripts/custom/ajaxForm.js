$.fn.applyAjaxForm = function(options){
  var options = options || {}; // if options not passed then, create empty object

  // create new object of class Form($(form), errorDiv, successDiv)
  var form = this;

  // defining static option for common events like showing loader, hiding loader, showing errors...
  var staticOptions = {
      					beforeSubmit: function(arr, $form, options){      						
      						if(options.beforePost != undefined){ // if beforePost attribute passed as parameter then execute before submitting form
      							options.beforePost(arr, $form, options);
      						}

      						form.parent().parent().applyLoading(); // show loader on the currently processing form
      					},

      					success: function(responseText, statusText, xhr, $form){
      						form.parent().parent().removeLoading(); // hide loader

      						if(responseText.error){ // if response has error then show errors
      							 form.removeErrors().addErrors(responseText.error);
      						}else{ // else reset the form
                    if(options.afterPost != undefined){ // if afterPost passed then execute after success
                      options.afterPost(responseText, statusText, xhr, $form);
                    }

                    if(form.isFormAdd()){ // if the form type is add then reset the form
                      form.reboot();
                    }else{
                      form.removeErrors();
                    }

      							if(options.hideSuccess == undefined){ // if hideSuccess: true not passed then show success else dont show success
      								alertify.success(responseText.success);
      							}

      							if(options.redirectTo != undefined){ // if redirectTo: url passed then redirect to the url
      								window.location.href = options.redirectTo;
      							}
      						}
      					}
  					};
  					
  $.extend(options, staticOptions); // if other options of ajax form plugin(except beforeSubmit and success) passed in the parameters then merge them with static options

  $(this).ajaxForm(options); // finally call plugin

  return this; // for method chaining
}