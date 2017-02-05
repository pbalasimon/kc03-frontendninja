var ArticleService = require('./ArticleService');
var moment = require('moment');
require('moment/locale/es');

module.exports = {
    like: function (id) {
        var $article = $('article[data-id=' + id + ']');
        var liked = ArticleService.isLiked(id);
        if (liked) {
            ArticleService.unLike(id);
            $article.find("i").removeClass("fa-heart").addClass("fa-heart-o");
        } else {
            ArticleService.like(id);
            $article.find("i").removeClass("fa-heart-o").addClass("fa-heart");
        }
    },
    setLikes: function () {
        var articles = $("#articles").find("article");
        articles.each(function () {
            var id = $(this).data("id");
            var liked = ArticleService.isLiked(id);
            if (liked) {
                $(this).find("i").removeClass("fa-heart-o").addClass("fa-heart");
            }
        })
    },
    formatDates: function () {
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
    }
}