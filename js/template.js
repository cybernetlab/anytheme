define(

['jquery', 'underscore', 'anyloader'],

function($, _, LoaderFactory) {
  'use strict';

  return function(engine) {
    var Template = function() {
      this.initialize.apply(this, arguments);
    };

    var createTemplate = function(obj) {
      var result = {};
      _.each(obj, function(v, k) {
        if (_.isString(v)) {
          result[k] = new Template(v);
        } else if (v instanceof Template) {
          result[k] = v;
        }
      });
      return result;
    }

    Template.partials = {};
    Template.helpers = {};

    Template.load = LoaderFactory({
      parse: function(str) {
        return $(str).filter('[data-type="template"][data-name]');
      },
      create: createTemplate
    });

    Template.loadPartials = LoaderFactory({
      parse: function(str) {
        return $(str).filter('[data-type="partial"][data-name]');
      },
      create: function(obj) {
        var template = createTemplate(obj)
        if (!_.isEmpty(templates)) _.extend(Template.partials, templates);
        return templates;
      }
    });

    Template.registerPartial = function(name, partial) {
      if (_.isString(partial)) {
        Template.partials[name] = new Template(partial);
      } else if (partial instanceof Template) {
        Template.partials[name] = partial;
      }
    };

    if (_.isFunction(engine)) {
      // underscore or other function-like template
      Template.registerHelper = function(name, func) {
        Template.helpers[name] = func;
      };

      Template.prototype.initialize = function(template) {
        this.type = 'underscore';
        this.engine = engine;
        this.template = template;
        this.source = template;
      };

      Template.prototype.render = function(data, partials) {
        partials = _.extend({}, partials, Template.partials)
        if (!_.isEmpty(partials)) {
          data.partial = function(k, d) {
            var v = partials[k];
            if (!v) return '';
            if (v instanceof Template) {
              d = _.extend({}, d, data);
              return v.render(d, partials);
            }
            return v;
          };
        }
        data = _.extend({}, Template.helpers, data);
        return this.engine(this.template, data);
      };

      Template.defaults = {
        icon: new Template('<i class="<%-iconClass(icon)"></i>'),
        button: new Template('<div class="btn<%if(type) print(" "+type%>"><%partial("icon",{icon:icon})%><%=content%></div>')
      };

    } else if (_.isObject(engine)) {

      if (engine.name == 'mustache.js') {
        // Mustache template
        Template.registerHelper = function(name, func) {
          Template.helpers[name] = function() { return function(text, render) {
            return func(render(text));
          }};
        };

        Template.prototype.initialize = function(template) {
          this.type = 'mustache';
          this.engine = engine;
          this.template = template;
          this.engine.parse(template);
          this.source = template;
        };

        Template.prototype.render = function(data, partials) {
          partials = _.extend({}, partials, Template.partials)
          _.each(partials, function(v, k) {
            if (v instanceof Template) partials[k] = v.template;
          });
          data = _.extend({}, Template.helpers, data);
          return this.engine.render(this.template, data, partials);
        };
      } else if (_.has(engine, 'default') &&
                 _.isFunction(engine['default'].compile) &&
                 _.isFunction(engine['default'].registerHelper)) {
        // Handlebars template
        engine = engine['default'];

        Template.registerHelper = function(name, func) {
          engine.registerHelper(name, function(opts) {
            return func(opts.fn(this));
          });
        };

        Template.prototype.initialize = function(template) {
          this.type = 'handlebars';
          this.engine = engine;
          this.template = this.engine.compile(template);
          this.source = template;
        };

        Template.prototype.render = function(data, partials) {
          _.each(partials, function(v, k) {
            if (v instanceof Template) v = v.template;
            this.engine.registerPartial(k, v)
          }, this);
          data = _.extend({}, Template.partials, data);
          return this.template(data);
        };
      } else {
        throw new Error('Unsupported template engine');
      }

      Template.defaults = {
        icon: new Template('<i class="{{#iconClass}}{{icon}}{{/iconClass}}"></i>'),
        button: new Template('<div class="btn{{#type}} {{.}}{{/type}}">{{>icon}}{{content}}</div>')
      };
    } else {
      throw new Error('Wrong template engine');
    }

    return Template;
  }
});
