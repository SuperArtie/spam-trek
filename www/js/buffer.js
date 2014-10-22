/* exported Buffer */
var Buffer = (function(){
'use strict';
function Buffer(game){
  var randY   = Math.floor(Math.random() * (game.canvas.height - 62));
  this.left   = game.canvas.width;
  this.top    = randY;
  this.width  = 30;
  this.length = 30;
  this.speed  = (Math.floor(Math.random()*4) + 1) * -1;
  this.cX     = this.left + (this.width / 2);
  this.cY     = this.top + (this.length / 2);
}
  Buffer.prototype.draw = function(game){
    game.ctx.beginPath();
    this.left += this.speed;
    game.ctx.drawImage(game.assets.buffer, this.left, this.top, this.width, this.length);
    game.ctx.closePath();
    game.ctx.stroke();
  };

  Buffer.prototype.catchSpam = function(spam){
    this.cX         = this.left + (this.width / 2);
    this.cY         = this.top + (this.length / 2);
    var sumSquares  = Math.pow((spam.cX - this.cX), 2) + Math.pow((spam.cY - this.cY), 2),
    distance        = Math.sqrt(sumSquares),
    spamCaught      = distance < spam.r + 3;

    return spamCaught;
  };
  return Buffer;
})();
