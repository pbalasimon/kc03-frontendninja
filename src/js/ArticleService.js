module.exports = {

    like: function (articleId) {
        localStorage.setItem(this.getArticleKey(articleId), "liked");
    },

    unLike: function (articleId) {
        localStorage.removeItem(this.getArticleKey(articleId));
    },

    isLiked: function (articleId) {
        return localStorage.getItem(this.getArticleKey(articleId));
    },

    getArticleKey: function (id) {
        return "Article" + id;
    }
}