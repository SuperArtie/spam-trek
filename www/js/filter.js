/* exported Filter */
var Filter = (function(){
  'use strict';
  function Filter(game){
    var randY   = Math.floor(Math.random()*game.canvas.height);
    this.left   = 0;
    this.top    = randY;
    this.width  = 10;
    this.length = 10;
    this.speed  = Math.floor(Math.random()*4) + 1;
    this.cX     = this.x + (this.width / 2);
    this.cY     = this.y + (this.height / 2);
  }
  Filter.prototype.draw = function(game){
    game.ctx.beginPath();
    this.left += this.speed;
    game.ctx.rect(this.left, this.top, this.width, this.length);
    game.ctx.closePath();
    game.ctx.stroke();
  };

  Filter.prototype.catchSpam = function(spam){
    var topLeft = Math.sqrt(Math.pow(spam.cX - this.x, 2) + Math.pow(spam.cY - this.y, 2));
        topLeft = topLeft < (this.r * 0.75);
    var topRight = Math.sqrt(Math.pow(spam.cX - this.x, 2) + Math.pow(spam.cY - this.y, 2));
        topRight = topRight < (this.r * 0.75);
    var bottomLeft = Math.sqrt(Math.pow(spam.cX - this.x, 2) + Math.pow(spam.cY - this.y, 2));
        bottomLeft = bottomLeft < (this.r * 0.75);
    var bottomRight = Math.sqrt(Math.pow(spam.cX - this.x, 2) + Math.pow(spam.cY - this.y, 2));
        bottomRight = bottomRight < (this.r * 0.75);
    return topLeft || topRight || bottomLeft || bottomRight;
  };
  return Filter;
})();
