var ArticleManager = require('./ArticleManager');
require('jquery-validation');

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

    jQuery.validator.addMethod("validateWords", function (value, element) {
        var phraseReplaceSpaces = value.replace(/\s\s+/g, ' ').trim();
        var arrayOfWords = phraseReplaceSpaces.split(' ');
        var numberOfWords = arrayOfWords.length;
        return numberOfWords < 120;
    }, "El número máximo de palabras permitido es 120");

    $("#add-comment-form").validate({
        debug: true,
        errorClass: "has-danger",
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            },
            comment: {
                validateWords: true,
                required: true
            }
        },
        messages: {
            name: "Por favor, introduzca un nombre",
            email: {
                required: "Por favor, introduzca una dirección de email",
                email: "La dirección de email debe tener el formato nombre@dominio.es"
            },
            comment: {
                required: "Por favor, introduzca un comentario",
            }

        },
        submitHandler: function (form) {
            console.log("Formulario validado");
            return false;
        },
        highlight: function (element, errorClass) {
            $(element).parent().closest("div.form-group").addClass(errorClass);
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parent().closest(".has-danger").removeClass(errorClass).addClass("has-success");
        }
    });
});