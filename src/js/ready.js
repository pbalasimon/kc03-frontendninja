var ArticleManager = require('./ArticleManager');
var moment = require('moment');
require('moment/locale/es');

$(document).ready(function () {

    moment.locale('es');
    var articleDates = $(".article-date");
    var formatIn = 'DD/MM/YYYY HH:mm:ss';
    var formatOut = 'DD/MM/YYYY';
    articleDates.each(function () {
        var date = moment($(this).text(), formatIn);
        var now = moment(new Date());
        var duration = moment.duration(now.diff(date));

        if (duration.get('hours') < 24 && duration.get('days') <= 0 && duration.get('years') <= 0) {
            $(this).text(date.fromNow());
        } else if (duration.get('days') < 7 && duration.get('years') <= 0) {
            $(this).text(date.format('dddd'));
        } else {
            $(this).text(date.format(formatOut));
        }
    });

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

    $('[data-toggle="tooltip"]').tooltip();

    // marcar like articulos
    ArticleManager.setLikes();


    $(".like").on("click", function () {
        var id = $(this).parent().closest('article').data("id");
        ArticleManager.like(id);
    });

});