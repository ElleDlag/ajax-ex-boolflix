function theAjax(settings,callback){
    $.ajax(settings).done(function (response) {
        callback(response)
    })
}
