function Shape() {

    // properties
    this.context = window.document.getElementById('myCanvas').getContext('2d');
    this.x = 0;
    this.y = 0;
    this.width  = 0;
    this.height = 0;
    this.imageData = null;

    this.oncollision = function(callback) {
        console.log('collision detected!');

        var sampleData = {
            foo: 'bar',
            baz: 'qux'
        };

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
                data[index]   = 255;  // red
                data[++index] = 255;  // green
                data[++index] = 255;  // blue
                data[++index] = 255;  // alpha
            }
        }

        // calculating offset
        var offset = 0;
        if (this instanceof Ball) {
            offset = this.radius;
        } //else
        //if (this instanceof Obstacle) {
            // offset is already 0
        //}

        this.context.putImageData(this.imageData,
                                  this.x - offset,
                                  this.y - offset);


        if (callback !== null) {
            // The neat thing about using call() is that we set the context
            // in which the function is executed. This means that when we
            // use the this keyword inside our callback function it refers
            // to whatever we passed as the first argument for call().
            // Credits: http://recurial.com/programming/understanding-callback-functions-in-javascript/
            callback.call(this, sampleData);
        }
    }        
}
