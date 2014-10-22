/* exported Game */
/* global Filter, Spam, Asset, Mailbox, Safezone, Envelope */
var Game = (function(){
  'use strict';
  var filters   = [],
      envelopes = [];
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
    this.collected     = [];
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
    // has the spam been filtered?
    for(var i = 0; i < filters.length; i++){
      if(filters[i].catchSpam(self.spam)){
        self.filtered = true;
        break;
      }else{
        self.filtered = false;
      }
    }
    this.clear();
    this.safezone.draw(this);
    this.mailbox.draw(this);
//    for(i = 0; i < envelopes.length; i++){
//      envelopes[i].draw(this);
//    }
    this.spam.draw(this);
    for(i = 0; i < filters.length; i++){
      filters[i].draw(self);
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
    var self = this;
    this.safezone = new Safezone(this);
    this.mailbox = new Mailbox(this);
    this.spam = new Spam(this);
    setInterval(generateFilters(self), 1000);
    generateEnvelopes(this);
    this.loop();
  };
  function generateFilters(game){
    var filter = new Filter(game);
    filters.push(filter);
  }
  function generateEnvelopes(game){
    console.log('game in generateEnvelopes>>', game);
    for(var i = 0; i < 11; i++){
      console.log('game in for loop>>>', game);
      console.log('Envelope....', Envelope);
      var envelopeX = new Envelope(game);
      console.log('envelopeX after New Envelope>>>', envelopeX);
      envelopes.push(envelopeX);
      console.log('envelopes in generateEnvelopes>>', envelopes);
    }
  }
  return Game;
})();
