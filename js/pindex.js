setTimeout(function start() {
    $('.bar').each(function (i) {
        var $bar = $(this);
        setTimeout(function () {
            $bar.css('width', $bar.attr('data-percent'));
        }, i * 1);
    });
}, 5);

$(function () {

    $(".label a").click(function () {
        var _this = $(this);
        _this.parent().parent().next(".expand").stop().slideToggle();
        if (_this.parent().hasClass("open")) {
            _this.parent().removeClass("open");
            _this.parent().addClass("close")
        } else if (_this.parent().hasClass("close")) {
            _this.parent().removeClass("close");
            _this.parent().addClass("open")
        }
    });

});
