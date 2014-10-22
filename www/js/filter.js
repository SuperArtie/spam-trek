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

  Filter.prototype.catchSpam = function(spam){
    console.log('SPAM>>>>>>>', spam);
    var topLeftSum = Math.pow(spam.cX - this.x, 2) + Math.pow(spam.cY - this.y, 2);
        console.log = ('spam.r in catchSpam>>>>>',spam.r);
        console.log = ('topLeftSum before comparison>>>>>', topLeftSum);
    var topLeftDistance = Math.sqrt(topLeftSum) < (spam.r);
//        console.log('topLeft>>>>>>>>', topLeft);
    var topRight = Math.sqrt(Math.pow(spam.cX - (this.x + 10), 2) + Math.pow(spam.cY - this.y, 2));
        topRight = topRight < (spam.r);
//        console.log('topRight>>>>>>>', topRight);
    var bottomLeft = Math.sqrt(Math.pow(spam.cX - this.x, 2) + Math.pow(spam.cY - (this.y - 10), 2));
        bottomLeft = bottomLeft < (spam.r);
//        console.log('bottomLeft>>>>>', bottomLeft);
    var bottomRight = Math.sqrt(Math.pow(spam.cX - (this.x + 10), 2) + Math.pow(spam.cY - (this.y - 10), 2));
        bottomRight = bottomRight < (spam.r);
//        console.log('bottomRight>>>>', bottomRight);
    return (topLeftDistance || topRight || bottomLeft || bottomRight);
  };
  return Filter;
})();
