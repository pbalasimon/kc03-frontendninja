var ArticleService = require('./ArticleService');

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
    }
}