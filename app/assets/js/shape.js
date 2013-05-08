function Shape() {

    // properties
    this.context = window.document.getElementById('myCanvas').getContext('2d');
    this.x = 0;
    this.y = 0;
    this.width  = 0;
    this.height = 0;
    this.imageData = null;

    this.oncollision = function(callback) {
        var sampleData = {
            foo: 'bar',
            baz: 'qux'
        };
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
