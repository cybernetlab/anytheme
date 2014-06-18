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
      'parse:html': function(str) {
        return $(str).filter('[data-type="icons"][data-name]');
      },

      'compose:object[]': function(key, value) {
        var deferred = loadIconSet(value);
        deferred.done(function(icons) { Icons.sets[key] = icons; });
        return [key, deferred];
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
