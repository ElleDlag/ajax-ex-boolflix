//se click è su series
$(document).on('click','#likes', function(e){
    $('.nav-item').each(function () {
        $('.nav-item').removeClass('active');
        $('.nav-item.likes').addClass('active')
    });
    
    //se pagina corrente è DIVERSA da series
        if(pageCurrent != 'likes'){
            var path ='././assets/js/pages_js/'
            $.getScript(path + 'home.js',function(){console.log(pageCurrent)})
            $.getScript(path + 'series.js',function(){console.log(pageCurrent)})
            $.getScript(path + 'movies.js',function(){console.log(pageCurrent)})
            $.getScript(path + 'latests.js',function(){console.log(pageCurrent)})

            //1.esegue la chiamata
            /* var settings = {
                "async": true,
                "crossDomain": true,
                "url": 'https://api.themoviedb.org/3/trending/movie/week',
                "method": "GET",
                "headers": {},
                "data": {
                    api_key:'fa0070d9667f3c692c69cdbcec6048f6',
                    },
            }
            theAjax(settings,transferData) *///su likes carico mio JSON
    
            //2.all'avvio della pagina rimuove il vecchio contentuto
            if($('.wrapper-result').html() != "") {
                $('.wrapper-result').html("")
                $('section').remove()
            }
    
            
            //per ora function transfer locale
            function transferData(){
                //console.log(res)
                //var printResult = res
        
        
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
                $.ajax('././assets/pages/latests.html').done(function (response){
                    $('body').append(response);
                    Handlebars.registerPartial('partialLatests', $('#partial-latests').html())
                });
        
                //3.carico la risposta sul template di HB
                /** ---- HEADER SECTION ----- */
                $.ajax('././assets/pages/likes.html').done(function (response) {
                    $('body').append(response);//da HB leggo i dati
        
                    var testInMain = Handlebars.compile($('#template-likes').html())
                    var scrollersHome = Handlebars.compile($('#likes-scrollers').html())
                    $('.wrapper-result').append(testInMain)
                    $('main').append(scrollersHome)
        
                    $("[id*='template']").remove();
                    $("[id*='scrollers']").remove();
                    $("[id*='partial']").remove();
                    
                })
            }
            transferData();
            pageCurrent = "likes" //verificato con un alert
    
        }
    })//end here