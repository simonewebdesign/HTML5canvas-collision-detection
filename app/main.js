console.log('main.js loaded!!!');

// define dependencies
define(["jquery", 
        "module/jquery.alpha", 
        "module/jquery.beta", 
        "module/ball"], function($) {

    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
        $('body').alpha().beta().masticazzi();
    });

});
