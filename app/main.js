// define dependencies
define(["jquery", 
        "module/shape",
        "module/ball",
        "module/obstacle"], function($) {

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
        
        var canvas = window.document.getElementById('myCanvas'),
            globalContext = canvas.getContext('2d'),    
            isMozilla = false; // $.browser.mozilla is deprecated in jQuery 2.0.0

        if ( isMozilla ) {

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


    // Shapes initialization
    var ball = new Ball;
    ball.init(100, 200, 20);
    ball.draw();

    var obstacle = new Obstacle;
    obstacle.init(50, 50, 300, 20);
    obstacle.draw();


    function updateGame() {
        
        ball.y--;
    }


    function drawGame() {

        // clear the canvas before drawing
        globalContext.clear();

        // I draw the obstacle first because I want the ball to have
        // an higher z-inded.
        obstacle.draw();
        ball.draw();

        // Collision detection
        obstacle.oncollision(function(data) {
            // Game Over!
            
        });
    }


});
