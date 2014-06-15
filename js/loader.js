define(

['jquery', 'underscore'],

function($, _) {
  return function() {
    var types = Array.prototype.slice.call(arguments, 0);
    var callback = types.pop();
    if (!_.isFunction(callback)) throw new Error('callback should be specified');
    if (types.length == 0) throw new Error('At least one type shold be specified');

    var selector = _.map(types, function(t) {
      return '[data-type="' + t + '"][data-name]';
    }).join(',');

    var load = function() {
      // get function arguments
      var args = Array.prototype.slice.call(arguments, 0);
      var result = [];
      if (_.isEmpty(args)) args.push(null);
      _.each(args, function(arg) {
        var deferred = $.Deferred();
        if (arg == null) arg = $(selector);
        if (_.isString(arg)) {
          if (/[{}<>]/.test(arg)) {
            // argument is JSON or HTML string
            try {
              arg = $.parseJSON(arg.replace(/[\n\r\t]/g, ''));
            } catch(SyntaxError) {
              arg = $('<div>' + arg + '</div>').find(selector);
            }
          } else {
            // argument is URI string
            $.ajax({ url: arg }).done(function(text, status) {
              if (status == 'success') {
                // result should be an object (in case of JSON file) or HTML
                if (_.isObject(text) || _.isString(text) && /[{}<>]/.test(text)) {
                  load(text).done(function(obj) { deferred.resolve(obj); });
                } else {
                  deferred.reject('wrong object in ' + arg);
                }
              } else {
                deferred.reject('while loading object from ' + arg);
              }
            });
            result.push(deferred);
            return; // next
          }
        }

        var obj = {};
        var objDeferred = [];
        if (arg instanceof $) {
          // argument is jQuery object
          arg.each(function() {
            var $this = $(this);
            var name = $this.data('name');
            var type = $this.data('type');
            if (_.indexOf(types, type) < 0 || !name) return; // next
            var value = callback($(this).html(), name);
            if (value == null) return; // next
            objDeferred.push($.when(value).then(function(x) { obj[name] = x }));
          });
        } else if (_.isObject(arg)) {
          // arguments is plain js object
          _.each(arg, function(v, k) {
            var value = callback(v, k);
            if (value == null) return; // next
            objDeferred.push($.when(value).then(function(x) { obj[k] = x }));
          });
        }
        if (!_.isEmpty(objDeferred)) {
          $.when.apply(this, objDeferred).done(function() { deferred.resolve(obj); });
          result.push(deferred);
        }
      });
      if (_.isEmpty(result)) result.push(null);
      return $.when.apply(this, result);
    };

    return load;
  }
});
