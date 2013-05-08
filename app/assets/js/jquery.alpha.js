console.log('jquery.alpha.js loaded!');

define(["jquery"], function($) {
  $.fn.alpha = function() {
      return this.append('<p>Alpha is Go!</p>');
  };
});
