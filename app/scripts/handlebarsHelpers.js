/*global require*/
/*jshint eqeqeq: false*/

require(['jquery', 'handlebars'], function (jQuery, Handlebars) {
    'use strict';

    Handlebars.registerHelper('ifEq', function (v1, v2, options) {
        if (v1 == v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    Handlebars.registerHelper('ifNotEq', function (v1, v2, options) {
        if (v1 != v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    Handlebars.registerHelper('ifContains', function (arr, value, options) {
        if (arr && arr.indexOf(value) !== -1) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    Handlebars.registerHelper('ifEmpty', function (arr, options) {
        return arr && arr.length ? options.inverse(this) : options.fn(this);
    });

    Handlebars.registerHelper('render_handlebars', function (name, context) {
        // we need the sub template compiled here
        // in order to be able to generate the top level template
        var subTemplate = Handlebars.compile(jQuery('#' + name).html());
        var subTemplateContext = jQuery.extend({}, this, context.hash);
        return new Handlebars.SafeString(subTemplate(subTemplateContext));
    });

    Handlebars.registerHelper('breaklines', function (text) {
        text = Handlebars.Utils.escapeExpression(text);
        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
        return new Handlebars.SafeString(text);
    });
});