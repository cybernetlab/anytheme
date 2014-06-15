define(function(require) {
  var helpers = require('helpers/html');

  return function(template) {
    it('resolves with null for wrong html', function(done) {
      template.load().then(function(result) {
        expect(result).to.be(null);
        done();
      });
    });

/*    it('loads templates from html', function(done) {
      helpers.withHtml(
        'head',
        '<script type="app/mst" data-type="template" data-name="t">test</script>',
        function() {
          template.load().then(function(result) {
            expect(result.t).to.be.a(template);
            expect(result.t.source).to.be('test');
            done();
          });
        }
      );
    });*/

    it('loads templates from HTML string', function(done) {
      template.load(
        '<div data-type="template" data-name="t1">some</div>' +
        '<div data-type="template" data-name="t2">test</div>'
      ).then(function(result) {
        expect(result.t1).to.be.a(template);
        expect(result.t1.source).to.be('some');
        expect(result.t2).to.be.a(template);
        expect(result.t2.source).to.be('test');
        done();
      });
    });

/*    it('loads templates from JSON string', function(done) {
      template.load('{"t":"some"}').then(function(result) {
        expect(result.t).to.be.a(template);
        expect(result.t.source).to.be('some');
        done();
      });
    });

    it('rejects loading wrong templates from URI', function(done) {
      template.load('data/wrong-template-set.txt').fail(function(result) {
        expect(result).to.match(/^wrong object in/);
        done();
      });
    });

    it('loads templates from HTML URI', function(done) {
      template.load('data/template-set.html').done(function(result) {
        expect(result.t1).to.be.a(template);
        expect(result.t1.source).to.be('template-1');
        expect(result.t2).to.be.a(template);
        expect(result.t2.source).to.be('template-2');
        done();
      });
    });

    it('loads templates from JSON URI', function(done) {
      template.load('data/template-set.json').done(function(result) {
        expect(result.t1).to.be.a(template);
        expect(result.t1.source).to.be('template-1');
        expect(result.t2).to.be.a(template);
        expect(result.t2.source).to.be('template-2');
        done();
      });
    });

    it('loads partials', function(done) {
      template.loadPartials('{"t":"some"}').then(function(result) {
        expect(template.partials.t).to.be.a(template);
        expect(template.partials.t.source).to.be('some');
        done();
      });
    });*/
  }
});
