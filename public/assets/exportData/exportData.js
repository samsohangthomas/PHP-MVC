function ExportData(){

  this.Excel = function(tableName,fileName){
        $('.no-print').remove();
        $("#"+tableName+"").table2excel({
          name: "Excel Document Name",
          filename:'"'+fileName+'"',
          exclude_img: true,
          exclude_links: true,
          exclude_inputs: true

        })  
 
  },this.Print = function(tableName,currentDate,pageTitle){

             $("#"+tableName+"").print({
                addGlobalStyles: true,
                mediaPrint: true,
                stylesheet: null,
                noPrintSelector: ".no-print",
                iframe: false,
                append : null,
                prepend : '<br/><center>'+currentDate+'</center><br/>',
                manuallyCopyFormValues: true,
                deferred: $.Deferred(),
                timeout: 250,
                    title: pageTitle,
                    doctype: '<!doctype html>'
            });
  }
}

var exportData = new ExportData();