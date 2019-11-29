var settings = {
    "async": true,
    "crossDomain": true,
    "url": 'https://api.themoviedb.org/3/tv/popular',
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
    function pushSeries(){
        if(pageCurrent != 'series'){
            $.ajax('././assets/pages/series.html').done(function (response) {
                $('body').append(response);
                var setPartial = Handlebars.compile($('#partial-series').html())
                var pushThis = setInterval(function(){
                    if($("section.series-scroller").length>0) clearInterval(pushThis);
                    $("section.series-scroller").replaceWith(setPartial(printResult))
                },100)
            });
        }
    }
    //estraggo il risultato fin dall'inzio
    var printResult = res
    
    //se click è su series
    $(document).on('click','#series', function(e){
        $('.nav-item').each(function () {
            $('.nav-item').removeClass('active');
            $('.nav-item.series').addClass('active')
        });

        //se pagina corrente è DIVERSA da series
        if(pageCurrent != 'series'){

            //eseguo gli script per avviare la chiamata ajax e caricare i film
            var path ='././assets/js/pages_js/'
            $.getScript(path + 'home.js',function(){console.log(pageCurrent)})
            $.getScript(path + 'movies.js',function(){console.log(pageCurrent)})
            $.getScript(path + 'latests.js',function(){console.log(pageCurrent)})


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
            $.ajax('././assets/pages/movies.html').done(function (response){
                $('body').append(response);
                Handlebars.registerPartial('partialMovies', $('#partial-movies').html())
            });
            $.ajax('././assets/pages/latests.html').done(function (response){
                $('body').append(response);
                Handlebars.registerPartial('partialLatests', $('#partial-latests').html())
            });
            $.ajax('././assets/pages/likes.html').done(function (response){
                $('body').append(response);
                Handlebars.registerPartial('partialLikes', $('#partial-likes').html())
            });

            //3.carico la risposta sul template di HB
            /** ---- HEADER SECTION ----- */
            $.ajax('././assets/pages/series.html').done(function (response) {
                $('body').append(response);//da HB leggo i dati

                var testInMain = Handlebars.compile($('#template-series').html())
                var scrollersHome = Handlebars.compile($('#series-scrollers').html())
                $('.wrapper-result').append(testInMain(printResult))
                $('main').append(scrollersHome)

                $("[id*='template']").remove();
                $("[id*='scrollers']").remove();
                $("[id*='partial']").remove();
                    
            })
            
            pageCurrent = "series" //verificato con un alert

        }
    })

    //richiamo la funzione che carica il parziale di series solo se non sono su series
    pushSeries()

}//end here
