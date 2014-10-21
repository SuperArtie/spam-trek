/* exported Mailbox */

var Mailbox = (function(){
  'use strict';

  function Mailbox(game){
    this.width  = 60;
    this.height = 60;
    this.x      = (game.canvas.width - this.width);
    this.y      = (0);
    this.cX     = this.x + (this.width / 2);
    this.cY     = this.y + (this.height / 2);
    this.r      = this.width / 2;
  }

  Mailbox.prototype.draw = function(game){
    game.ctx.drawImage(game.assets.mailbox, this.x, this.y, this.width, this.height);
  };

  Mailbox.prototype.isSpamInside = function(game){
    var sumsquares = Math.pow(this.cX - game.spam.cX, 2) + Math.pow(this.cY - game.spam.cY, 2),
        distance   = Math.sqrt(sumsquares);

    return distance < (this.r * 0.75);
  };

  return Mailbox;
})();
