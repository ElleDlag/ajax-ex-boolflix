$(function(){
    
    var source = $("#template-videinfo").html();
    var templateVideo = Handlebars.compile(source);

    $('.btn-go-search').on('click', function(){
    $('.wrapper-result').html("")
    var result = $('.input-search').val()
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": 'https://api.themoviedb.org/3/search/multi',
        "method": "GET",
        "headers": {},
        "data": {
            include_adult:false,
            page:1,
            language:'en-US',
            query: result,
            api_key:'fa0070d9667f3c692c69cdbcec6048f6',
        },
        //"error": alert('something wrong')
    }
      
    $.ajax(settings).done(function (response) {
        var results = response.results
        resPrint(results);
    });

    function resPrint(results){
        
        results.forEach(function(res){

            if(res.media_type != 'person'){
                
                dataHB = {
                    title:theTitle(res),
                    title_originale:res.original_title,
                    poster:thePoster(res),
                    vote:theStars(res),
                    description:theOverview(res),
                    language:res.original_language,
                    year:res.release_date,
                    star:['fas fa-star','fas fa-star','fas fa-star','fas fa-star','fas fa-star']//meglio un ciclo for con un push seguira function
                }
        
                $('.wrapper-result').append(templateVideo(dataHB))
                console.log(res)
            }
        })
    }
    function theTitle(res){

        var theTitle = "";
        if(res.media_type == 'movie'){ 
            theTitle = res.title 
        } else if(res.media_type == 'tv'){
            theTitle = res.original_name
        }

        return theTitle
    }
    function thePoster(res){
        var thePoster;
        if(res.poster_path == null){
            thePoster = false
        } else { thePoster = 'https://image.tmdb.org/t/p/w370_and_h556_bestv2' + res.poster_path}

        return thePoster
    }
    function theStars(res){
        var x;
        x = (Math.round(res.vote_average))*10;
        /* $('.star-front').css('width', x*10 + "%")
        console.log(x*10 + "%'") */
        return x+'%'
        
    }
    function theOverview(res){
        var theOverview = res.overview ==""?
        "Al momento non abbiamo una descrizione nel nostro database. Se vuo aggiungere una trama manda una mail al nostro staff. Per maggiori dettagli clicca QUI ":
        res.overview
        return  theOverview
    }
    })
});