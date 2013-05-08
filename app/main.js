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
    ball.init(40, 40, 20);
    var obstacle = new Obstacle;
    obstacle.init(50, 50, 300, 20);

    ball.oncollision(function(data){
        // TODO do something after the collision
    });

    ball.draw();
    obstacle.draw();

    //console.log(ball.data);
    var data = ball.imageData.data; 
    var value = 255;

    for (var y = 0; y < ball.height; ++y) {
        for (var x = 0; x < ball.width; ++x) {
            // Before we can plot a pixel, we must translate the x and y
            // coordinates into an index representing the offset of the 
            // first channnel within the one-dimensional array.
            var index = (y * ball.width + x) * 4;
            // we multiply the y coordinate by the width of the canvas,
            // add the x coordinate,
            // then multiply by four.
            // We must multiply by four because there are
            // four elements per pixel, one for each channel.
            //data[index]   = value;  // red
            //data[++index] = value;  // green
            //data[++index] = value;  // blue
            //data[++index] = value;  // alpha
//          console.log(data[index]);
//          console.log(data[++index]);
//          console.log(data[++index]);
//          console.log(data[++index]);                     
        }
    }

    globalContext.putImageData(ball.imageData, ball.x + 90, ball.y + 90);

    // Working example of how to access imageData
    //var imageData = globalContext.getImageData(20, 20, canvas.width, canvas.height);
    //var data = imageData.data;
    //for (var i = 0; i < data.length; i++) {
    //    data[i] = 255;
    //}
    //globalContext.putImageData(imageData, 30, 30);


    function updateGame() {
        
        //ball.y--;
    }


    function drawGame() {

        // clear the canvas before drawing
        //globalContext.clear();

        //ball.draw();
        //obstacle.draw();
    }


});
