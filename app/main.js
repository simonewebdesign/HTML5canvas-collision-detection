console.log('main.js loaded!!!');

// define dependencies
define(["jquery", 
        "module/jquery.alpha", 
        "module/jquery.beta",
        "module/shape",
        "module/ball",
        "module/obstacle"], function($) {

//the jquery.alpha.js and jquery.beta.js plugins have been loaded.
$(function() {
    $('body').alpha().beta().masticazzi();
});

// IIFE credits: http://www.codethinked.com/preparing-yourself-for-modern-javascript-development
//(function(window, $, undefined) {

// mainloop code credits: http://www.playmycode.com/blog/2011/08/building-a-game-mainloop-in-javascript/
var mainloop = function() {
    updateGame();
    drawGame();
};

var animFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        null ;        //     window.mozRequestAnimationFrame    ||

if ( animFrame !== null ) {
    var canvas = document.getElementById('myCanvas');

    // debug
    //console.log($.browser);
    if ( false ) { // $.browser.mozilla is deprecated in jQuery 2.0.0

        var recursiveAnim = function() {
            mainloop();
            animFrame();
        };

        // setup for multiple calls
        window.addEventListener("MozBeforePaint", recursiveAnim, false);

        // start the mainloop
        animFrame();

    } else { // not mozilla

        var recursiveAnim = function() {
            mainloop();
            animFrame( recursiveAnim, canvas );
        };

        // start the mainloop
        animFrame( recursiveAnim, canvas );
    }
} else {
    // requestAnimationFrame is not supported.
    console.log('requestAnimationFrame is not supported by this browser.');

    // fallback to setInterval
    var ONE_FRAME_TIME = 1000.0 / 60.0 ;
    setInterval( mainloop, ONE_FRAME_TIME );
}

var globalContext = window.document.getElementById('myCanvas').getContext('2d');
// Extending the Context to add a clear() function
// Credits: http://stackoverflow.com/a/9722502
CanvasRenderingContext2D.prototype.clear = 
  CanvasRenderingContext2D.prototype.clear || function (preserveTransform) {
    if (preserveTransform) {
      this.save();
      this.setTransform(1, 0, 0, 1, 0, 0);
    }
    this.beginPath();
    this.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.closePath();

    if (preserveTransform) {
      this.restore();
    }
}; 


// Initializing Classes
//    var ball = new Ball(); // 100, 600, 20
//    ball.setX(100);
//    ball.setY(600);
//    ball.setRadius(20);
//ball.init();
//    ball.draw;

// Shapes initialization
var ball = new Ball;
ball.init(100, 150, 20);
var obstacle = new Obstacle;
obstacle.init(50, 10, 300, 20);

ball.oncollision(function(data){
    // TODO do something after the collision
    console.log(this);
    console.log(data);
});

function updateGame() {
    
    ball.y--;
}

function drawGame() {

    //var canvas = document.getElementById('myCanvas');
    //var ctx = canvas.getContext('2d');
    //ctx.fillStyle = '#933';
    //ctx.fillRect(50,200,300,20);
    //ctx.fillStyle = '#393';
    // arc(x,y,r,start,stop)
    //ctx.arc(100, 600, 10, 20, 0, 2 * Math.PI);
    //ctx.fill();

    // clear the canvas before drawing
    globalContext.clear();

    ball.draw();
    obstacle.draw();
}
//})(window, jQuery);


});
