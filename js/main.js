requirejs.config({
  baseUrl: 'src/js',
  paths: {
    anytheme: './',
    anyloader: '../../bower/anyloader/anyloader'
    jquery: '../../bower/jquery/dist/jquery',
    underscore: '../../bower/underscore/underscore'
  }
});

require(

['anytheme/anytheme'],

function(AnyTheme) {
  'use strict';

  return AnyTheme;
});
