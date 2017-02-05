var UIManager = require('./uiManager');

$(document).ready(function () {

    // Mostrar botón volver arriba
    $(window).on('scroll', UIManager.showBackToTopButton);

    // Accion volvee arriba
    $('#back-to-top').on('click', UIManager.goTop);

    // activar tooltips
    $('[data-toggle="tooltip"]').tooltip();

});