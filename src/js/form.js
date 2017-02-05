var ArticleManager = require('./ArticleManager');
var ArticleService = require('./ArticleService');
var Scrollpoints = require('scrollpoints');

// marcar like articulos
ArticleManager.setLikes();

// formatear fechas
ArticleManager.formatDates();

$(".like").on("click", function () {
    var id = $(this).parent().closest('article').data("id");
    ArticleManager.like(id);
});

jQuery.validator.addMethod("validateWords", function (value) {
    var phraseReplaceSpaces = value.replace(/\s\s+/g, ' ').trim();
    var arrayOfWords = phraseReplaceSpaces.split(' ');
    var numberOfWords = arrayOfWords.length;
    return numberOfWords < 120;
}, "El número máximo de palabras permitido es 120");

$("#add-comment-form").validate({
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

        var comment = {
            name: $("#name").val(),
            email: $("#email").val(),
            text: $("#comment").val()
        }

        ArticleService.addComment(comment, function (data) {
            $("#comment-added").show().fadeOut(4000);
            $("#add-comment-form")[0].reset();
            ArticleManager.getComments();
        }, function (error) {
            $("#error-add-comment").show();
        });

        return false;
    },
    highlight: function (element, errorClass) {
        $(element).parent().closest("div.form-group").addClass(errorClass);
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).parent().closest(".has-danger").removeClass(errorClass).addClass("has-success");
    }
});

var elem = document.querySelector('#comments-list');

if (elem) {
    Scrollpoints.add(elem, function (domElement) {
        ArticleManager.getComments();
    });
}



