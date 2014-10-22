/* exported Filter */
var Filter = (function(){
  'use strict';
  function Filter(game){
    var randY   = Math.floor(Math.random() * (game.canvas.height - game.safezone.height));
    this.left   = 0;
    this.top    = randY;
    this.width  = 30;
    this.length = 30;
    this.speed  = Math.floor(Math.random() * 3) + 1;
    this.cX     = this.left + (this.width / 2);
    this.cY     = this.top + (this.length / 2);
  }
  Filter.prototype.draw = function(game){
    game.ctx.beginPath();
    this.left += this.speed;
    game.ctx.drawImage(game.assets.filter, this.left, this.top, this.width, this.length);
    game.ctx.closePath();
    game.ctx.stroke();
  };
  Filter.prototype.catchSpam = function(spam){
    this.cX         = this.left + (this.width / 2);
    this.cY         = this.top + (this.length / 2);
    var sumSquares  = Math.pow((spam.cX - this.cX), 2) + Math.pow((spam.cY - this.cY), 2),
    distance        = Math.sqrt(sumSquares),
    spamCaught      = distance < spam.r + 0.3 * this.length;

    return spamCaught;
  };
  return Filter;
})();
