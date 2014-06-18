define(function(require) {
  var anytheme = require('anytheme');

  describe('anytheme', function() {
    it('loads from JSON', function(done) {
      anytheme({ url: 'data/theme.json' }).done(function(theme) {
        console.log('>>', theme.templates);
        theme.setIcons('glyphicon');
        expect(theme.templates.button.render({icon: 'users'}))
          .to.eql('<div class="btn"><i class="glyphicon glyphicon-user"></i> </div>');
        done();
      });
    });
  });
});
