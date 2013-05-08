function Ball() {

    this.inheritFrom = Shape;
    this.inheritFrom();

    // properties
    this.x = 0;
    this.y = 0;
    this.radius = 0;

    this.init = function(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;

        return this;
    }

    this.draw = function() {
        var startAngle = 0,
            endAngle = 2 * Math.PI;

        this.context.fillStyle = '#933';
        this.context.arc(this.x, this.y, this.radius, startAngle, endAngle);
        this.context.fill();
    }
}
