function Crud(){
	this.loading = false, // used for stopping double click or more than one click while ajax loading

  /**
   * applying delete listeners on delete buttons according to module ( like make module have delete buttons with class delete-make, order module have delete buttons have class like delete-order...)
   */
    
	this.delete = function(options){
    var that = this;
		var module = options.module;

    $(document).off('confirmed.bs.confirmation', '.delete-'+module).on('confirmed.bs.confirmation', '.delete-'+module, function(e){
      e.preventDefault();

      var id = $(this).attr(module+'-id');
      var ele = this;

      var spinner = Ladda.create(this).start();

      $(this).promise().done(function(){
        $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
    
        $.ajax({
            url: '/'+module+'/' + id,
            method: "DELETE",
            success: function(response){
              if(response['success']){
                if(options.showForm == undefined){
                  that.showAddForm(module, options.addTitle);
                }

                if(options.afterSuccessDelete != undefined){
                  options.afterSuccessDelete(response, ele);
                }
                
                alertify.success(response['success']);
              }else if(response['error']){
                alertify.error(response['error']);
              }
            }
          }).done(function(response){
            spinner.stop();
          });
        });
      });
	},

  /**
   * applying listeners on edit and cancel button according to the module
   */
    
	this.edit = function(options){
		var that = this;
		var module = options.module;

    $(document).off('click', '.edit-'+module).on('click', '.edit-'+module, function(){ // hide form add and show form edit
        $('html, body').animate({scrollTop: 0}, 0);

        var ele = this;
        var container = $('.form-'+module+'-container');
        var isHidden = container.children().is(':hidden');

        if(that.loading){
            return;
        }else{
            that.loading = true;
        }

        var id = $(this).attr(module+'-id');

        if(isHidden){
          container.height(450);
        }

        container.applyLoading();

        $.ajax({
            url: '/'+module+'/'+id+'/edit',
            method: 'GET',
            success: function(data){
                container.removeLoading();

                if(isHidden){
                  container.height('auto');
                }
                
                that.showEditForm(module, options.editTitle, data);
            },
            error:function(){ alert("Something gone wrong");}
          }).done(function(res){
          		if(options.afterEdit != undefined){
          			options.afterEdit(res, ele);
          		}that.loading = false;
          });
    });

    $(document).off('click', '#add-'+module+'-edit').on('click', '#cancel-'+module+'-edit', function(){ // remove form edit and show form add
      if(options.onCancelReplace != undefined){
          options.onCancelReplace();
      }else{
        that.showAddForm(module, options.addTitle);
      }
    });
	},

  /**
   * Adding listener for showing record adding form
   */

  this.add = function(options){
    var that = this;
    var module = options.module;

    $(document).off('click', '#add-'+module).on('click', '#add-'+module, function(){ // show form
        if(that.loading){
            return;
        }else{
            that.loading = true;
        }

        $('#'+module+'-form.form-add').reboot().hide().fadeIn();

        if(options.afterAdd != undefined){
          options.afterAdd();
        }that.loading = false;
    });


    $(document).off('click', '#add-'+module+'-add').on('click', '#cancel-'+module+'-add', function(){ // remove form edit and show form add
      if(options.onCancelReplace != undefined){
          options.onCancelReplace();
      }
    });    
  },

  /**
   * Showing add form according to the module and title
   */
  
  this.showAddForm = function(mod, ttl){
    var title = ((ttl == undefined)?mod.ucfirst().replaceAll('-', ' ')+' Add':ttl);

    $('#'+mod+'-form.form-edit').remove();
    $('.caption-subject.caption-'+mod).html(title);
    $('#'+mod+'-form.form-add').reboot();
    $('#'+mod+'-form.form-add select').next().css('width', 'auto');
    
    $('#'+mod+'-form.form-add').fadeIn();
  },

  /**
   * Showing edit form according to the module and title
   * data = form view received by response
   */
  
  this.showEditForm = function(mod, ttl, data){
    var title = ((ttl == undefined)?mod.ucfirst().replaceAll('-', ' ')+' Edit':ttl);
    
    $('#'+mod+'-form.form-edit').remove();
    $('.caption-subject.caption-'+mod).html(title);
    $('#'+mod+'-form.form-add').hide();
    $('#'+mod+'-form.form-add').parent().append(data).hide().fadeIn();
  }
}

var crud = new Crud(); // global crud object