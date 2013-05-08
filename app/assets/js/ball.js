console.log('ball loaded');

define(["jquery"], function($) {
  $.fn.masticazzi = function() {
      return this.append('<p>BALLLL</p>');
  };
  console.log("hahaha!");
});
