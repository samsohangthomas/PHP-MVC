function Components(){

	/**
	 * initiating dynamically loaded date pickers
	 */
	
	this.initPickers = function(){
        $('.date-picker').datepicker({
            rtl: App.isRTL(),
            autoclose: true,
            format:'yyyy-mm-dd'
        });
	},

	/**
	 * initiating dynamically loaded bootstrap switches
	 */
	
	this.initSwitch = function(){
		$('.make-switch').bootstrapSwitch();
	},

	/**
	 * initiating dynamically loaded bootstrap confirmations especially used on delete button
	 */
	
	this.initConfirmations = function(){
		$('[data-toggle=confirmation]').confirmation({ container: 'body', btnOkClass: 'btn btn-sm btn-success', btnCancelClass: 'btn btn-sm btn-danger'});
	}
}

var compos = new Components(); // global object