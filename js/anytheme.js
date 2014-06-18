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
      'create:icons': AnyTheme.Icons.load,
      'create:templates': AnyTheme.Template.load,
      'create:partials': AnyTheme.Template.loadPartials
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
