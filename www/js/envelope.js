/* exported Envelope */
var Envelope = (function(){
  'use strict';
  function Envelope(game){
    console.log('game in Envelope constructor>>>>', game);
    this.width  = 10;
    this.height = 10;
    this.x      = Math.floor(Math.random() * (game.canvas.width - this.width));
    this.y      = Math.floor(Math.random() * (game.canvas.height - this.height - game.safezone.height));
    this.cX     = this.left + (this.width / 2);
    this.cY     = this.top + (this.height / 2);
  }
//  Envelope.prototype.draw = function(game){
//    game.ctx.drawImage(game.assets.spam, this.x, this.y, this.width, this.height);
//  };
  Envelope.prototype.collect = function(spam){
    this.cX           = this.x + (this.width / 2);
    this.cY           = this.y + (this.height / 2);
    var sumSquares    = Math.pow((spam.cX - this.cX), 2) + Math.pow((spam.cY - this.cY), 2),
    distance          = Math.sqrt(sumSquares),
    envelopeCollected = distance < spam.r + 0.3 * this.width;

    return envelopeCollected;
  };
  return Envelope;
})();
