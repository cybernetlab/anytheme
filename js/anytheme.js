define(

['jquery', 'underscore', 'anyloader', 'icons', 'template'],

function($, _, LoaderFactory, IconsFactory, TemplateFactory) {
  'use strict';

  return function(opts) {
    var AnyTheme = function() {
      AnyTheme.Template.registerHelper('themeIcon', _.bind(function(icon) {
        return '<i class="' + this.icons.htmlClass(icon) + '"></i>';
      }, this));
    };

    AnyTheme.prototype.setIcons = function(set) {
      this.icons = new AnyTheme.Icons(set);
    };

    var loadTheme = LoaderFactory({
      create: function(obj) {
        var deferred = $.Deferred();
        var theme = new AnyTheme();
        $.when(
          AnyTheme.Icons.load(obj.icons),
          AnyTheme.Template.load(obj.templates).done(function(templates) { theme.templates = templates }),
          AnyTheme.Template.loadPartials(obj.partials)
        ).done(function() {
          deferred.resolve(theme);
        });
        return deferred;
      }
    });

    opts = _.extend({}, {
      templateEngine: _.template
    }, opts);
    if (!_.has(opts, 'url')) opts.url = opts.from;
    AnyTheme.Template = TemplateFactory(opts.templateEngine);
    AnyTheme.Icons = IconsFactory();
    return loadTheme(opts.url);
  }
});
