console.log('ball loaded');

define(["jquery"], function($) {
  $.fn.masticazzi = function() {
      return this.append('<p>BALLLL</p>');
  };
  console.log("hahaha!");
});



/*
// Class
function Ball() {
    var x = 0,
        y = 0,
    //    w = 0, // width
    //    h = 0, // height
        r = 0; // radius

    var init = function(x, y, radius) {
        this.x = x;
        this.y = y;
        //this.w = width;
        //this.h = height;
        this.r = radius;
        return this;           
    }
    var draw = function() {
        // arc(x, y, r, startAngle, endAngle)
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.fill();            
    }

    // Revealing module pattern
    return {

        // x public getter
        getX: function() { return x },
        // x public setter
        setX: function(val) { this.x = val },

        // y public getter
        getY: function() { return y },
        // y public setter
        setY: function(val) { this.y = val },

        // r public getter
        getRadius: function() { return r },
        // r public setter
        setRadius: function(val) { this.r = val },

        init: this.init,
        draw: this.draw
    };
}
*/


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
            endAngle = 2*Math.PI;

        this.context.fillStyle = '#933';         
        this.context.arc(this.x, this.y, this.radius, startAngle, endAngle);
        this.context.fill();
    }
}
