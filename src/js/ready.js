var ArticleManager = require('./ArticleManager');

$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('#back-to-top').click(function () {
        $('#back-to-top').tooltip('hide');
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    // activar tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // marcar like articulos
    ArticleManager.setLikes();
    // formatear fechas
    ArticleManager.formatDates();


    $(".like").on("click", function () {
        var id = $(this).parent().closest('article').data("id");
        ArticleManager.like(id);
    });

});