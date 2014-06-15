define(function(require) {
  var Template = require('template');
  var Mustache = require('mustache');
  var common = require('spec/template-common-spec');

  describe('mustache Template', function() {
    var subject = Template(Mustache);

    it('detects mustache template', function() {
      expect((new subject('')).type).to.be('mustache');
    });

    it('renders simple template', function() {
      expect((new subject('<p>{{name}}</p>')).render({ name: 'test' }))
        .to.be('<p>test</p>');
    });

    it('supports local partials', function() {
      var t = new subject('<p>{{>part}}</p>');
      var p = new subject('<b>{{name}}</b>')
      expect(t.render({ name: 'test' }, { part: p })).to.be('<p><b>test</b></p>');
    });

    it('supports global partials', function() {
      var t = new subject('<p>{{>part}}</p>');
      subject.registerPartial('part', '<b>{{name}}</b>');
      expect(t.render({ name: 'test' })).to.be('<p><b>test</b></p>');
    });

    it('supports helpers', function() {
      var t = new subject('<p>{{#helper}}{{name}}{{/helper}}</p>');
      subject.registerHelper('helper', function(x) { return '<b>' + x + '</b>'; });
      expect(t.render({ name: 'test' })).to.be('<p><b>test</b></p>');
    });

    common(subject);
  });
});
