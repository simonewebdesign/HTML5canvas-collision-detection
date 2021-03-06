function Ball() {

    this.inheritFrom = Shape;
    this.inheritFrom();

    //property
    this.radius = 0;
    this.movement = "normal";

    this.init = function(x, y, radius) {
        // a ball with coordinates lower than the
        // radius should never be instantiated
        if (x <= radius || y <= radius) return;

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.width = this.height = radius * 2;
        // WARNING: x and y originally referred to the center!!!
        // also, x and y should NEVER be negative!!!
    }

    this.draw = function() {
        var startAngle = 0,
            endAngle = 2 * Math.PI;

        this.context.fillStyle = '#933';
        this.context.arc(this.x, this.y, this.radius, startAngle, endAngle);
        this.context.fill();
        this.updateImageData();
    }

    this.move = function() {
        if (this.movement === "normal") {
            this.y--;            
        } else
        if (this.movement === "inverted") {
            this.y++;
        }
    }
}
// enabling inheritance 
Ball.prototype = new Shape;
