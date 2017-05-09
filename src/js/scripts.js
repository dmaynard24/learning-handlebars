$(document).ready(function() {
    function init() {
        $.ajax({
            url: '/templates/template.hbs',
            cache: true,
            success: function(data) {
                $('main').prepend(data);
                loadContext();
            }
        });
    }

    init();

    function loadContext() {
        // Basic expressions
        var myInfo = $('#my-info-template').html();
        var template = Handlebars.compile(myInfo);
        $.getJSON('/js/data.json', function(data) {
            var context = template(data.info);
            $('#info-data').html(context);
        });

        // Each loop
        var quoteInfo = $('#quote-template').html();
        var quoteTemplate = Handlebars.compile(quoteInfo);
        $.getJSON('/js/data.json', function(data) {
            var context = quoteTemplate(data.quotes);
            $('#quote-data').html(context);
        });

        // Block helpers
        var templateInfo = $('#block-helper-template').html();
        var blockHelperTemplate = Handlebars.compile(templateInfo);
        var context = blockHelperTemplate({});
        $('#block-expression-data').html(context);
    }

    // Custom helper for making a link
    Handlebars.registerHelper('makeLink', function(text, url) {
        text = Handlebars.Utils.escapeExpression(text);
        url = Handlebars.Utils.escapeExpression(url);

        var link = '<a href="' + url + '">' + text + '</a>';
        return new Handlebars.SafeString(link);
    });

    // Custom helper for changing an element's color
    Handlebars.registerHelper('changeColor', function(text, options) {
        text = Handlebars.Utils.escapeExpression(text);
        
        if (options.hash.color === 'red') {
            return new Handlebars.SafeString('<span class="red-text">' + text + '</span>');
        } else if (options.hash.color === 'blue') {
            return new Handlebars.SafeString('<span class="blue-text">' + text + '</span>');
        } else {
            return new Handlebars.SafeString('<span class="green-text">' + text + '</span>');
        }
    });

    Handlebars.registerHelper('makeRadio', function(name, options) {
        var radioList = options.fn();

        radioList = radioList.trim().split('\n');

        var output = '';
        for (var val in radioList) {
            var item = radioList[val].trim();
            output += '<input type="radio" name="' + name + '" value="' + item + '"> ' + item + '<br>';
        }

        return output;
    });
});