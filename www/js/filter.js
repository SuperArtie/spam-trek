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

//  Filter.prototype.catchSpam = function(game){
//    var sumsquares = Math.pow(this.cX - game.spam.cX, 2) + Math.pow(this.cY - game.spam.cY, 2),
//        distance   = Math.sqrt(sumsquares);

//    return distance < (this.r * 0.75);
//  };
  return Filter;
})();
