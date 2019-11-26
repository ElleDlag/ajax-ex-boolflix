$(function(){
    
    var source = $("#template-videinfo").html();
    var templateVideo = Handlebars.compile(source);

    $('.btn-go-search').on('click', function(){
    $('.wrapper-result').html("")
    var result = $('.input-search').val()
    console.log(result)
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": 'https://api.themoviedb.org/3/search/multi?',
        "method": "GET",
        "headers": {},
        "data": {
            include_adult:false,
            page:1,
            language:en-US,
            query: result,
            api_key:fa0070d9667f3c692c69cdbcec6048f6
        },
        //"error": alert('something wrong')
      }
      
      
    $.ajax(settings).done(function (response) {
        var results = response.results
        
        results.forEach(function(res){
            
                title = res.original_title;
            poster =""// 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + res.poster_path
            description= res.overview;
            language=res.original_language;
            year=res.release_date;
            dataHB ={title,poster,description,language,year}
            $('.wrapper-result').append(templateVideo(dataHB))
            console.log(res)
            })
    });
    })
    
});