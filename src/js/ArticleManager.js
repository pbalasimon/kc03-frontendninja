var ArticleService = require('./ArticleService');

module.exports = {
    like: function (article) {
        var $article = $(article);
        var id = $article.parents().find("article").data("id")
        var liked = ArticleService.isLiked(id);
        if (liked) {
            ArticleService.unLike(id);
            $article.find("i").removeClass("fa-heart").addClass("fa-heart-o");
        } else {
            ArticleService.like(id);
            $article.find("i").removeClass("fa-heart-o").addClass("fa-heart");
        }
    }
}