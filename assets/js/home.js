$(function(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": 'https://api.themoviedb.org/3/movie/upcoming',
        "method": "GET",
        "headers": {},
        "data": {
            page:1,
            language:'en-US',
            api_key:'fa0070d9667f3c692c69cdbcec6048f6',
            },
    }
    theAjax(settings,transferData)


    function transferData(res){
        console.log(res.results)
        var printResult = res
        $.ajax('./assets/pages/home.html').done(function (response) {
            $('body').append(response);
            //var data = {testProva:transferData(typeTraansfer)}
            var testInMain = Handlebars.compile($('#template-home').html())
            $('.wrapper-result').append(testInMain(printResult))
            $('#template-home').remove()
            //$('.home-list').css('background-image', "url("+ pathImg +")")
        })
    }
    
})