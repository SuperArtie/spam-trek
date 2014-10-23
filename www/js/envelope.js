/* exported Envelope */
var Envelope = (function(){
  'use strict';
  function Envelope(game){

    this.width  = 20;
    this.height = 20;
    this.x      = Math.floor(Math.random() * (game.canvas.width - this.width - 60));
    this.y      = Math.floor(Math.random() * (game.canvas.height - this.height - game.safeZone.height));
    this.cX     = this.x + (this.width / 2);
    this.cY     = this.y + (this.height / 2);
  }
  Envelope.prototype.draw = function(game){
    game.ctx.drawImage(game.assets.envelope, this.x, this.y, this.width, this.height);
  };

  Envelope.prototype.collect = function(spam){
    this.cX           = this.x + (this.width / 2);
    this.cY           = this.y + (this.height / 2);
    var sumSquares    = Math.pow((spam.cX - this.cX), 2) + Math.pow((spam.cY - this.cY), 2),
    distance          = Math.sqrt(sumSquares),
    envelopeCollected = distance < spam.r;
    return envelopeCollected;
  };
  return Envelope;
})();
