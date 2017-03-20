$.fn.easyDatatable = function(options){ // url, columns
  var grid = new Datatable();

  // generating columns object in appropriate format for Datatables

  var columns = [];
  var colData = options.columns;

  $.each(colData, function(k,v){
    if(typeof v == 'string'){
      columns.push({data:v, name:v, orderable: true, searchable: true});
    }else{
      if(v.length == 2){
        columns.push({data:v[0], name:v[1], orderable: true, searchable: true});
      }else{
        columns.push({data:v[0], name:v[0], orderable: v[1], searchable: v[2]});      }
    }
  });

  grid.init({
      src: $(this),
      onSuccess: function (grid) {
        // execute some code on success 
      },
      onError: function (grid) {
          // execute some code on network or other general error  
      },
      processing: true,
      loadingMessage: 'Loading...',
      dataTable: {
          "lengthMenu": [
              [10, 20, 50, 100, 150, -1],
              [10, 20, 50, 100, 150, "All"] // change per page values here
          ],

          "pageLength": (options.rows || 10), // default record count per page

          "preDrawCallback": function(){ // show loading before draw
            $(this).applyLoading();
          },

          "drawCallback": function(){
              $(this).removeLoading(); // hide loading after draw

              if(options.afterDraw != undefined){ // if afterDraw argument passed then execute it
                options.afterDraw();
              }
          },

          "ajax": {
              "type": "POST",
              "url": options.url, // ajax source
              headers: {
                    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                },   
          },

          "order": [
              [1, "asc"]
          ], // set first column as a default sort by asc

          "columns": columns
      }
  });

  // handle group actionsubmit button click
  grid.getTableWrapper().on('click', '.table-group-action-submit', function (e) {
      e.preventDefault();
      grid.getDataTable().ajax.reload();
      grid.clearAjaxParams();
  });

  return grid;
}