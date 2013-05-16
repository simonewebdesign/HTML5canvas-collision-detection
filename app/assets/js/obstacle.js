function Obstacle() {

    this.inheritFrom = Shape;
    this.inheritFrom();


    this.init = function(x, y, width, height) {

        if (x == 0 || y == 0) {
            this = null;
            return;
        }

        this.x = x;
        this.y = y;
        this.width  = width;
        this.height = height;
        this.imageData = this.context.getImageData(this.x, this.y, this.width, this.height);
    }

    this.draw = function() {
        this.context.fillStyle = '#393';
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.setImageData();
    }

    // private
    this.setImageData = function() {
        this.imageData = this.context.getImageData(this.x, 
                                                   this.y, 
                                                   this.width, 
                                                   this.height);
    }
}
