var ArticleManager = require('./ArticleManager');

$(document).ready(function () {

    // marcar like articulos
    ArticleManager.setLikes();


    $("#like").on("click", function () {
        ArticleManager.like(this);
    });

});