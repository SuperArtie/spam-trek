/* exported SafeZone */

var SafeZone = (function(){
  'use strict';

  function SafeZone(game){
    this.width    = game.canvas.width;
    this.height   = 60;
    this.x        = 0;
    this.y        = (game.canvas.height - 60);
  }

  SafeZone.prototype.draw = function(game){
//    game.ctx.beginPath();
//    game.ctx.lineWidth= '2';
//    game.ctx.strokeStyle= 'black';
    game.ctx.fillStyle= '#85C285';
    game.ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  return SafeZone;

})();
