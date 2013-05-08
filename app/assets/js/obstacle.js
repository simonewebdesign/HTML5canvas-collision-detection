function Obstacle() {

    this.inheritFrom = Shape;
    this.inheritFrom();

    // properties
    this.x = 0;
    this.y = 0;
    this.width  = 0;
    this.height = 0;

    this.init = function (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width  = width;
        this.height = height;
    }

    this.draw = function() {
        this.context.fillStyle = '#393';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
}
