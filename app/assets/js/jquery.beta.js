console.log('jquery.beta.js loaded!');

define(["jquery"], function($) {
  $.fn.beta = function() {
      return this.append('<p>Beta is Go!</p>');
  };
});
