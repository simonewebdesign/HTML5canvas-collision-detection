function Shape() {

    // properties
    this.context = window.document.getElementById('myCanvas').getContext('2d');
    this.x = 0;
    this.y = 0;
    this.width  = 0;
    this.height = 0;
    this.imageData = null;

    // private method
    this.updateImageData = function() {

        if (this instanceof Obstacle) {
            this.imageData = this.context.getImageData(this.x,
                                                       this.y,
                                                       this.width,
                                                       this.height);
            return true;

        } else
        if (this instanceof Ball) {
            this.imageData = this.context.getImageData(this.x - this.radius, 
                                                       this.y - this.radius, 
                                                       this.width, 
                                                       this.height);
            return true;
        }
        return false;
    }
}
