/* exported Game */
/* global Filter, Spam, Asset, Mailbox, SafeZone */
var Game = (function(){
  'use strict';
  var filters = [];
  function Game(){
    var bodyHeight     = window.innerHeight,
        headerHeight   = document.getElementsByTagName('ion-header-bar')[0].clientHeight;
    this.canvas        = document.getElementById('canvas');
    this.ctx           = this.canvas.getContext('2d');
    this.canvas.height = bodyHeight - headerHeight;
    this.canvas.width  = window.innerWidth;
    this.assets        = Asset.load();
    this.inBox         = false;
    this.filtered      = false;
    this.listen();
  }
  Game.prototype.listen = function(){
    window.addEventListener('deviceorientation', function(data){
      this.spam.update(data, this);
    }.bind(this));
  };
  Game.prototype.loop = function(timestamp){
    var self = this;
    // is the spam in the mailbox?
    this.inBox = this.mailbox.isSpamInside(this);
    // has the spam been filtered
    for(var i = 0; i < filters.length; i++){
      if(filters[i].catchSpam(self.spam)){
        self.filtered = true;
        break;
      }else{
        self.filtered = false;
      }
    }
    this.clear();
    this.safeZone.draw(this);
    this.mailbox.draw(this);
    this.spam.draw(this);
    for(i = 0; i < filters.length; i++){
      filters[i].draw(this);
    }
    if(this.inBox || this.filtered){
      window.dispatchEvent(new Event('gameover'));
    }else{
      window.requestAnimationFrame(this.loop.bind(this));
    }
  };
  Game.prototype.clear = function(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };
  Game.prototype.start = function(){
    this.safeZone = new SafeZone(this);
    this.mailbox = new Mailbox(this);
    this.spam = new Spam(this);
    setInterval(generateFilters, 1000);
    this.loop();
  };
  function generateFilters(){
    var filter = new Filter(this);
    filters.push(filter);
  }
  return Game;
})();
