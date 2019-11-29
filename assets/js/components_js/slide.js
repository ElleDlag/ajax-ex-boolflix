$(document ).ajaxComplete(function(e,url,settings){
    if(settings.dataTypes[1] =='html'){
    //start condition
    var frame = $('.single-res');
    $(frame).eq(0).addClass('on');
    var n = 1;
    //global variables
    var frameLoop; //esporto il setInterval
    var time; //per il fadeOut al prossimo index
    var bckw =false; //verifica se contare inverso
    var autostart = true //se deve partire l'autoplay
    var doStart = true//se devo eseguire il fade
    time =1000*10

    function slideFade(){
        frameLoop = setInterval(addClassFrame,time)
        time += 1000*10;
    } 
    function addClassFrame(){
        $(frame).eq(n).addClass('on');
        $(frame).not($(frame).eq(n)).removeClass('on');
        //console.log(bckw)
        if (bckw == false) n++;
        else  n--;
        n = n==19? 0 : n;
    }
    function onBtnClik(){
        doStart = true
        clearInterval(frameLoop); //rimuovo L'autoloop
        clearTimeout();//non eseguo il setinterval - lo usr interagisce
        addClassFrame();//richiamo addClassFrame controllato da btn - lo usr interagisce
        if(doStart == true ) autoPlay(); // eseguo anche l'auotoplay solo se doStart è vero - lo usr non interagisce
    }
    function autoPlay(){
        //verifico che non sia in pausa per l'autostart pausa: autostart = false
        if(autostart == true){
            setTimeout(function(){
                bckw = false;
                $('.state-button').text('auto')
                if(doStart == true ) slideFade()
            }, 10000)
        }
    }

    //eseguo lo slideFade fin dall'inizio
    slideFade();

    $('body').on('click','button.next, button.prev, button.pause, button.play' , function(){
        bckw = $(this).hasClass('prev')? true:false
        time=1000;
        if ($(this).hasClass('pause')) {

            $(this).css('display','none') //inverto display pausa/play
            $('button.play').css('display','inline-block')//inverto display pausa/play
            $('.state-button').text('pause') //cambio il testo da auto a pause
            clearInterval(frameLoop) //interrompo l'autoplay
            autostart = false; //imposto l'autoplay su false
            clearTimeout();//per sciurezza cancello tutti gl intervalli
            //imposto il Do 
            doStart = false
            console.log(doStart, autostart)
        } else if ($(this).hasClass('play')) {
            $(this).css('display','none')
            $('button.pause').css('display','inline-block')
            $('.state-button').text('auto')
            clearTimeout();
            slideFade()
            autostart = true;
            doStart = false
            console.log(doStart, autostart)
        } else onBtnClik(); 
    })
    }
})//end Here