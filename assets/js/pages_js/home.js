var pageCurrent;
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
        function pushSeries(){
            if(pageCurrent != 'home'){
                $.ajax('././assets/pages/home.html').done(function (response) {
                    $('body').append(response);
                    var setPartial = Handlebars.compile($('#partial-home').html())
                    var pushThis = setInterval(function(){
                        if($("section.home-scroller").length>0) clearInterval(pushThis);
                        $("section.home-scroller").replaceWith(setPartial(printResult))
                    },100)
                });
            }
        }

        var printResult = res
        Handlebars.registerHelper("fullData", function(release_date) {
            release_date = moment(release_date).format('DD MMMM YYYY')
            return release_date
        })
       
        
        
        if ($('.nav-item.home').hasClass('active')){/** ---- PARTIAL INJECT ----- */
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
            $.ajax('././assets/pages/likes.html').done(function (response){
                $('body').append(response);
                Handlebars.registerPartial('partialLikes', $('#partial-likes').html())
            });
    
    
            /** ---- HEADER SECTION ----- */
            $.ajax('././assets/pages/home.html').done(function (response) {
                $('body').append(response); 
                
                var testInMain = Handlebars.compile($('#template-home').html())
                var scrollersHome = Handlebars.compile($('#home-scrollers').html())
                $('.wrapper-result').append(testInMain(printResult))
                $('main').append(scrollersHome)
    
                $("[id*='template']").remove();
                $("[id*='scrollers']").remove();
                $("[id*='partial']").remove();
        })
        }
    
        pushSeries()
    }

    $('#home').click(function(){
        $('.nav-item').each(function (i) {
            $('.nav-item').removeClass('active');
            $('.nav-item.home').addClass('active')
        });
        if(pageCurrent != 'home'){
            theAjax(settings,transferData)
            var path ='././assets/js/pages_js/'

            $.getScript(path + 'series.js',function(){console.log(pageCurrent)})
            $.getScript(path + 'movies.js',function(){console.log(pageCurrent)})
            $.getScript(path + 'latests.js',function(){console.log(pageCurrent)})

            if($('.wrapper-result').html() != "") {
                $('.wrapper-result').html("")
                $('section').remove()
            }
            pageCurrent = 'home'
        }
    })
})