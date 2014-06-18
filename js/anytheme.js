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

    opts = _.extend({}, {
      templateEngine: _.template
    }, opts);
    if (!_.has(opts, 'url')) opts.url = opts.from;

    AnyTheme.Template = TemplateFactory(opts.templateEngine);
    AnyTheme.Icons = IconsFactory();

    var loadTheme = LoaderFactory({
      'compose:object[icons]': AnyTheme.Icons.load,
      'compose:object[templates]': AnyTheme.Template.load,
      'compose:object[partials]': AnyTheme.Template.loadPartials,
      'compose:object': function(obj) {
        // console.log(obj);
        var theme = new AnyTheme();
        var defaults = loadTheme.defaults['compose:object'](obj);
        theme.templates = defaults.templates;
        return theme;
      }
    });

    return loadTheme('url(' + opts.url + ')');
  }
});
