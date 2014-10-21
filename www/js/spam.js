/* exported Spam */

var Spam = (function(){
  'use strict';

  function Spam(game){
    this.width  = 30;
    this.height = 30;
    this.x      = Math.floor(Math.random() * (game.canvas.width - this.width));
    this.y      = Math.floor(Math.random() * ((game.canvas.height- this.height) - (game.canvas.height - this.height * 2)) + (game.canvas.height - this.height * 2));
    this.cX     = this.x + (this.width / 2);
    this.cY     = this.y + (this.height / 2);
  }

  Spam.prototype.draw = function(game){
    game.ctx.drawImage(game.assets.spam, this.x, this.y, this.width, this.height);
  };

  Spam.prototype.update = function(orientation, game){
    if(orientation.gamma > 8){
      this.x = ((this.x += 5) > game.canvas.width) ? 0 : this.x + 5;
    }else if(orientation.gamma < -8){
      this.x = ((this.x -= 5) < 0) ? game.canvas.width : this.x - 5;
    }else{
      this.x = this.x;
    }

    if(orientation.beta > 8){
      this.y = ((this.y += 5) > (game.canvas.height - game.spam.height)) ? (game.canvas.height - game.spam.height) : this.y + 5;
    }else if(orientation.beta < -8){
      this.y = ((this.y -= 5) < 0) ? 0 : this.y - 5;
    }else{
      this.y = this.y;
    }

    this.cX = this.x + (this.width / 2);
    this.cY = this.y + (this.height / 2);
  };

//  Spam.prototype.isFiltered = function(game, filters){
//    var sumsquares = Math.pow(this.cX - filters.filter.cX, 2) + Math.pow(this.cY - filters.filter.cY, 2),
//        distance   = Math.sqrt(sumsquares);

//    return distance < (this.r);
//  };

  return Spam;

})();
