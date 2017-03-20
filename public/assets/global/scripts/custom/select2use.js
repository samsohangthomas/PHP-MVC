//select list using select2, usable to all select
$.fn.select2use = function(uri,plimit,extraData){

  $(this).select2({
      ajax: {
        url: uri,
        dataType: 'json',
        delay: 0,

        data: function (params) {
            var data = {
                    'q': params.term || '',
                    'pageLimit': plimit,
                    'page': params.page,
                };
            if(extraData){ // if any extra data passed then send it merging with the select2's default data(i.e. pageLimit, page....)
              data = $.extend(data, extraData);
            }
            return data;
        },
        
        processResults: function (data, params) {  

          params.page = params.page || 1;
          return {
                      results: data['list'],
                      pagination: {
                      more: (params.page * plimit) < data.count
                  }     
          };
        },
      }
  });

  return this;
}