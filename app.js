console.log('app.js loaded');

// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, 
requirejs.config({

    "baseUrl": "lib",

    "paths": {

      "app": "../app", // path relative to baseUrl

      "module": "../app/assets/js",

      // I dropped the support for IE < 9
      "jquery": "http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"

    }
});

// Load the main app module to start the app
requirejs(["app/main"]);
