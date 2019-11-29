var settings = {
    "async": true,
    "crossDomain": true,
    "url": 'https://api.themoviedb.org/3/trending/movie/week',
    "method": "GET",
    "headers": {},
    "data": {
        api_key:'fa0070d9667f3c692c69cdbcec6048f6',
        },
}
theAjax(settings,transferData)
function transferData(res){
    //1.esegue la chiamata
    var printResult = res
    
    //se click è su latests
    $(document).on('click','#latests', function(e){
        $('.nav-item').each(function () {
            $('.nav-item').removeClass('active');
            $('.nav-item.latests').addClass('active')
        });
    //se pagina corrente è DIVERSA da latests
        if(pageCurrent != 'latests'){

            var path ='././assets/js/pages_js/'
            $.getScript(path + 'home.js',function(){console.log(pageCurrent)})
            $.getScript(path + 'series.js',function(){console.log(pageCurrent)})
            $.getScript(path + 'movies.js',function(){console.log(pageCurrent)})
    
            //2.all'avvio della pagina rimuove il vecchio contentuto
            if($('.wrapper-result').html() != "") {
                $('.wrapper-result').html("")
                $('section').remove()
            }

            //4.all'avvio della pagina rimuove il vecchio contentuto
            /** ---- PARTIAL INJECT ----- */
            $.ajax('././assets/pages/home.html').done(function (response){
                $('body').append(response);
                Handlebars.registerPartial('partialHome', $('#partial-home').html())
            });
            $.ajax('././assets/pages/series.html').done(function (response){
                $('body').append(response);
                Handlebars.registerPartial('partialSeries', $('#partial-series').html())
            });
            $.ajax('././assets/pages/movies.html').done(function (response){
                $('body').append(response);
                Handlebars.registerPartial('partialMovies', $('#partial-movies').html())
            });
            $.ajax('././assets/pages/likes.html').done(function (response){
                $('body').append(response);
                Handlebars.registerPartial('partialLikes', $('#partial-likes').html())
            });
    
            //3.carico la risposta sul template di HB
            /** ---- HEADER SECTION ----- */
            $.ajax('././assets/pages/latests.html').done(function (response) {
                $('body').append(response);//da HB leggo i dati
    
                var testInMain = Handlebars.compile($('#template-latests').html())
                var scrollersHome = Handlebars.compile($('#latests-scrollers').html())
                $('.wrapper-result').append(testInMain(printResult))
                $('main').append(scrollersHome)
    
                $("[id*='template']").remove();
                $("[id*='scrollers']").remove();
                $("[id*='partial']").remove();
                    
            })
            
            pageCurrent = "latests" //verificato con un alert
    
        }
    })

    //richiamo la funzione che carica il parziale di latests solo se non sono su latests
    if(pageCurrent != 'latests'){
        $.ajax('././assets/pages/latests.html').done(function (response) {
            $('body').append(response);
            var setPartial = Handlebars.compile($('#partial-latests').html())
            var pushThis = setInterval(function(){
                if($("section.latests-scroller").length>0) clearInterval(pushThis);
                $("section.latests-scroller").replaceWith(setPartial(printResult))
            },100)
        });
    }else {console.log('non lo eseguo')}

}//end here
