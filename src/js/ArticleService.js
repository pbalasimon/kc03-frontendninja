var API_URL = "/api/comments/";

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
    },

    getComments: function (successCallback, errorCallback) {
        $.ajax({
            url: API_URL,
            type: "get",
            success: function (data) {
                successCallback(data);
            },
            error: function (error) {
                errorCallback(error);
                console.error("ArticleServiceError", error);
            }
        })
    },
    addComment: function (comment, successCallback, errorCallback) {
        $.ajax({
            url: API_URL,
            type: "post",
            contentType: "application/json",
            data: JSON.stringify(comment),
            success: function (data) {
                successCallback(data);
            },
            error: function (error) {
                errorCallback(error);
                console.error("ArticleServiceError", error);
            }
        });
    }
}