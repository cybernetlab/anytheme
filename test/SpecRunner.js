require.config({
  baseUrl: '../js',
  urlArgs: 'cb=' + Math.random(),
  paths: {
    spec: '../test/spec',
    helpers: '../test/helpers',
    anyloader: '../components/anyloader/anyloader',
    jquery: '../components/jquery/dist/jquery',
    underscore: '../components/underscore/underscore',
    mustache: '../components/mustache/mustache',
    handlebars: '../components/handlebars/handlebars.amd',
    mocha: '../components/mocha/mocha',
    expect: '../components/expect/index'
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
