
setTimeout(function start (){
    $('.bar').each(function(i){
        var $bar = $(this);
        setTimeout(function(){
            $bar.css('width', $bar.attr('data-percent'));
        }, i*50);
    });
}, 100);

$(function () {
    $(".label").click(function () {
        var _this = $(this);
        _this.parent().next(".expand").stop().slideToggle()
        if(_this.hasClass("open")){
            _this.removeClass("open")
            _this.addClass("close")
        }else if(_this.hasClass("close")){
            _this.removeClass("close")
            _this.addClass("open")
        }
    })

});
