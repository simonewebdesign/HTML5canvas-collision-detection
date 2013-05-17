function Obstacle() {

    this.inheritFrom = Shape;
    this.inheritFrom();


    this.init = function(x, y, width, height) {

        if (x < 0 || y < 0) return;

        this.x = x;
        this.y = y;
        this.width  = width;
        this.height = height;
    }

    this.draw = function() {
        this.context.fillStyle = '#393';
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.updateImageData();
    }

    this.oncollision = function(callback) {

        this.updateImageData();
        if (this.imageData === null) {
            return false;
        }

        var data = this.imageData.data;
        // the ball becomes a white square!
        // second working example of how to access/modify imageData.data
        for (var Y = 0; Y < this.height; ++Y) {
            for (var X = 0; X < this.width; ++X) {
                // Before we can plot a pixel, we must translate the x and y
                // coordinates into an index representing the offset of the 
                // first channnel within the one-dimensional array.
                var index = (Y * this.width + X) * 4;
                // we multiply the y coordinate by the width of the canvas,
                // add the x coordinate, then multiply by four.
                // We must multiply by four because there are
                // four elements per pixel, one for each channel.

                // Now we can access to every pixel.
                // A pixel is composed of four channels:
                // RGBA (red, green, blue, alpha).
                // data[index]   // red
                // data[++index] // green
                // data[++index] // blue
                // data[++index] // alpha
                
                var red = 51,
                    green = 153,
                    blue = 51,
                    alpha = 255;

                // If a pixel has changed, there was a collision.
                if (data[index] !== red ||
                    data[++index] !== green ||
                    data[++index] !== blue ||
                    data[++index] !== alpha) {
                    // Collision detected.

                    // Getting some data to use in the callback function
                    var callbackData = {
                        foo: 'bar',
                        baz: 'qux'
                    };

                    if (callback !== null) {
                        // The neat thing about using call() is that we set the context
                        // in which the function is executed. This means that when we
                        // use the this keyword inside our callback function it refers
                        // to whatever we passed as the first argument for call().
                        // Credits: http://recurial.com/programming/understanding-callback-functions-in-javascript/
                        callback.call(this, callbackData);
                    }
                }
            }
        }
    }    
}
// enabling inheritance 
Obstacle.prototype = new Shape; 
