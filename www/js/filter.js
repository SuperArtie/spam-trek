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
    this.cX     = this.left + (this.width / 2);
    this.cY;
  }
  Filter.prototype.draw = function(game){
    game.ctx.beginPath();
    this.left += this.speed;
    game.ctx.rect(this.left, this.top, this.width, this.length);
    game.ctx.closePath();
    game.ctx.stroke();
  };

  Filter.prototype.catchSpam = function(spam){
    console.log('SPAM>>>>>>>', spam);
    console.log('this in catchSpam before cX, cY definition:', this);
    console.log('spam.r', spam.r);
    this.cX     = this.left + (this.width / 2);
    this.cY     = this.top + (this.length / 2);
    console.log('this in catchSpam after definition:', this);
    var sumSquares = Math.pow((spam.cX - this.cX), 2) + Math.pow((spam.cY - this.cY), 2);
    console.log('sumSquares in catchSpam>>>', sumSquares);
    var distance = Math.sqrt(sumSquares);
    console.log('distance in catchSpam>>>>>', distance);
    var spamCaught = distance < spam.r;

    return spamCaught;
  };
  return Filter;
})();
