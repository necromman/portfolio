
setTimeout(function start (){
    $('.bar').each(function(i){
        var $bar = $(this);
        setTimeout(function(){
            $bar.css('width', $bar.attr('data-percent'));
        }, i*50);
    });
}, 100)

$(function () {
    $(".expand").hide()
})