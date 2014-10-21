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
  }
  Filter.prototype.draw = function(game){
    game.ctx.beginPath();
    this.left += this.speed;
    game.ctx.rect(this.left, this.top, this.width, this.length);
    game.ctx.closePath();
    game.ctx.stroke();
  };
  return Filter;
})();
