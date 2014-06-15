define(function(require) {
  var IconsFactory = require('icons');
  var $ = require('jquery');
  var helpers = require('helpers/html');
  var html = '<div data-type="icons" data-name="fa"><i name="one">another</i></div>';

  describe('Icons', function() {
    var Icons = IconsFactory();
    var subject = new Icons('testSet');
    describe('get', function() {
      it('returns name itself for names not from icon set', function() {
        expect(subject.get('icon')).to.be('icon');
      });

      it('returns name from icon set', function() {
        Icons.sets['testSet'] = {};
        Icons.sets['testSet']['someIcon'] = 'anotherIcon';
        subject = new Icons('testSet');
        expect(subject.get('someIcon')).to.be('anotherIcon');
      });
    });

    describe('load', function() {
      it('loads icons', function(done) {
        Icons.load(html).done(function(result) {
          expect(result).to.eql({ fa: { one: 'another' } });
          expect(Icons.sets.fa).to.eql(result.fa);
          done();
        });
      });
    });
  });
});
