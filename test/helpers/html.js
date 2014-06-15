define(function(require) {
  var $ = require('jquery');
  var _ = require('underscore');

  return {
    withHtml: function(el, html, func) {
      if (_.isString(el)) el = $(el);
      el = el.first();
      if (el.length == 0) throw new Error('Wrong el for withHtml helper');
      if (_.isString(html)) html = $(html);
      el.append(html);
      try {
        func.apply(this);
      } catch(e) {
        html.remove();
        throw e;
      }
      html.remove();
    }
  }
});
