var ArticleManager = require('./ArticleManager');

$(document).ready(function () {

    $("#like").on("click", function () {
        ArticleManager.like(this);
    });
    // cargar las canciones
    //SongsListManager.loadSongs();

});