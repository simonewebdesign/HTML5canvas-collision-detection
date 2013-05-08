function Ball() {

    this.inheritFrom = Shape;
    this.inheritFrom();

    //property
    this.radius = 0;


    this.init = function(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.width = this.height = radius * 2;
        // WARNING: x and y originally referred to the center!!!
        // also, x and y should NEVER be negative!!!
        this.imageData = this.context.getImageData(this.x - radius, this.y - radius, this.width, this.height);
    }

    this.draw = function() {
        var startAngle = 0,
            endAngle = 2 * Math.PI;

        this.context.fillStyle = '#933';
        this.context.arc(this.x, this.y, this.radius, startAngle, endAngle);
        this.context.fill();
    }
}
