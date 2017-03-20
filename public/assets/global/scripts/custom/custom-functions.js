/****************** STRING CLASS RELATED ****************************/

/**
 * Adding custom prototype methods to javascript's String class
 */

String.prototype.replaceAll = function(target, replacement){ // replacing all targeted letter or word with the replacement in a string
  	return this.split(target).join(replacement);
};

String.prototype.ucfirst = function(){ // capitalize first letter of a string
	return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.ucwords = function(){ // capitalize first letter of all words in a string
    return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
};

/****************** FORM RELATED ****************************/

$.fn.removeErrors = function(){ // removes all errors of a form - should be applied to a form selector
    var inputs = this.find(":input").parent();
    inputs.removeClass('has-error');
    inputs.find('.help-block').remove();

    return this;
};

$.fn.addErrors = function(errors){ // displays all errors in a form - should be applied to a form selector
	var that = this;

    $.each(errors, function(k, v){
        that.find(":input[name='"+k+"']").parent().addClass('has-error').append("<span class='help-block'>" + v + "</span>");
    });

    return this;
};

$.fn.reboot = function(errors){ // resets a form - should be applied to a form selector
	this[0].reset();
    this.find("select").val('').change();
    this.removeErrors();

    return this;
};

$.fn.isFormAdd = function(errors){ // checks if the form type is add - should be applied to a form selector
	return this.hasClass('form-add');
};


/****************** LOADING RELATED ****************************/

$.fn.applyLoading = function(){ // adds tranparent grey overlay on the element passed and show loading on the center of that element
    App.blockUI({
        target: $(this),
        boxed: true,
        message: 'Processing..'
    });

    return this;
};

$.fn.removeLoading = function(){ // removes the loading and transparent grey overlay
    App.unblockUI($(this));

    return this;
};



/****************** ALERTIFY SETTINGS ****************************/

alertify.set('notifier','position', 'top-right');
alertify.set('notifier','delay', 3);