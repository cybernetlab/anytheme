define(

['jquery', 'underscore', 'anyloader'],

function($, _, LoaderFactory) {
  'use strict';

  var loadIconSet = LoaderFactory();

  return function() {
    var Icons = function(iconSet) {
      var set = Icons.sets[iconSet];
      this.icons = (set) ? set : {};
      this.set = iconSet;
    };

    Icons.sets = {};

    Icons.load = LoaderFactory({
      parse: function(str) {
        return $(str).filter('[data-type="icons"][data-name]');
      },
      create: function(obj) {
        var deferred = $.Deferred();
        var icons = {};
        $.when.apply(this, _.map(obj, function(v, k) {
          return loadIconSet(v).done(function (set) { icons[k] = set; });
        })).done(function() {
          _.extend(Icons.sets, icons);
          deferred.resolve(icons);
        });
        return deferred;
      }
    });

    Icons.prototype.get = function(name) {
      var icon = this.icons[name];
      return (icon) ? icon : name;
    };

    Icons.prototype.htmlClass = function(name) {
      return this.set + ' ' + this.set + '-' + this.get(name);
    }

    return Icons
  }
});
