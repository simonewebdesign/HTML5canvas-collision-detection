// define dependencies
define(["module/shape",
        "module/ball",
        "module/obstacle"], function($) {

    // mainloop code credits: http://www.playmycode.com/blog/2011/08/building-a-game-mainloop-in-javascript/
    var mainloop = function() {
        updateGame();
        drawGame();
    };

    var animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null ;

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
    ball.init(160, 60, 20);
    ball.draw();

    var obstacle1 = new Obstacle;
    obstacle1.init(20, 20, 280, 20);
    obstacle1.draw();

    var obstacle2 = new Obstacle;
    obstacle2.init(20, 200, 280, 20);
    obstacle2.draw();


    /*
    JavaScript char codes: http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes

    left arrow      37
    up arrow        38
    right arrow     39
    down arrow      40
    */
    window.addEventListener('keydown', function(evt){

     // debug
     var charCode = (evt.which) ? evt.which : event.keyCode,
         charCodeName = String.fromCharCode(charCode);
     console.log('keydown: ' + charCode + ' ' + charCodeName);

     var LEFT_ARROW =  37,
         UP_ARROW =    38,
         RIGHT_ARROW = 39,
         DOWN_ARROW =  40;

     if (charCode == UP_ARROW) {
        ball.moveUp();
     }
     if (charCode == DOWN_ARROW) {
        ball.moveDown();
     }
     if (charCode == LEFT_ARROW) {
        ball.moveLeft();
     }
     if (charCode == RIGHT_ARROW) {
        ball.moveRight();
     }



    }, false);

    function updateGame() {
        
        //ball.move();

        // Ball movement

        // Collision detection
        obstacle1.oncollision(function(data) {
            ball.movement = "inverted";
        });
        obstacle2.oncollision(function(data) {
            ball.movement = "normal";
        });  
    }

    function drawGame() {

        // clear the canvas before drawing
        globalContext.clear();

        // I draw the obstacles first because I want
        // the ball to have an higher z-index.
        obstacle1.draw();
        obstacle2.draw();
        ball.draw();
    }

});
