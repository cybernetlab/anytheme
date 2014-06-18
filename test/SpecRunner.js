require.config({
  baseUrl: '../js',
  urlArgs: 'cb=' + Math.random(),
  paths: {
    spec: '../test/spec',
    helpers: '../test/helpers',
    anyloader: '../bower/anyloader/anyloader',
    jquery: '../bower/jquery/dist/jquery',
    underscore: '../bower/underscore/underscore',
    mustache: '../bower/mustache/mustache',
    handlebars: '../bower/handlebars/handlebars.amd',
    mocha: '../bower/mocha/mocha',
    expect: '../bower/expect/index'
  },
  urlArgs: 'bust=' + (new Date()).getTime()
});

require(['require', 'expect', 'mocha'], function(require) {
  mocha.setup('bdd');

  require([
    'spec/icons-spec',
    'spec/template-underscore-spec',
    'spec/template-mustache-spec',
    'spec/template-handlebars-spec',
    'spec/anytheme-spec'
  ], function() {
    mocha.run();
  });
});
