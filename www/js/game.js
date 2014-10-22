/* exported Game */
/* global Filter, Spam, Asset, Mailbox, Safezone, Buffer, Envelope */
var Game = (function(){
  'use strict';
  var filters = [],
      buffers = [],
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
    this.collected     = 0;
    this.open          = false;
    this.buffered      = false;
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
    if(this.open){
      this.inBox = this.mailbox.isSpamInside(this);
    }
    // has the spam been filtered?
    for(var i = 0; i < filters.length; i++){
      if(filters[i].catchSpam(self.spam)){
        self.filtered = true;
        break;
      }else{
        self.filtered = false;
      }
    }

    for(var j = 0; j < buffers.length; j++){
      if(buffers[j].catchSpam(self.spam)){
        self.buffered = true;
        break;
      }else{
        self.buffered = false;
      }
    }
    for(var k = 0; k < envelopes.length; k++){
      if(envelopes[k].collect(self.spam)){
        envelopes.splice([k], 1);
        self.collected += 1;
      }
    }
    this.clear();
    if(this.collected >= 5){
      this.mailbox = new Mailbox(this);
      this.mailbox.draw(this);
      this.open = true;
    }
    this.safeZone.draw(this);
    this.spam.draw(this);
    for(i = 0; i < filters.length; i++){
      filters[i].draw(self);
      if(filters[i].left && !filters[i].isBlop){
        this.assets.blop.play();
        filters[i].isBlop = true;
      }
    }

    for(i = 0; i < buffers.length; i++){
      buffers[i].draw(this);
    }

    for(i = 0; i < envelopes.length; i++){
      envelopes[i].draw(this);
    }

    if(this.inBox || this.filtered || this.buffered){
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
    this.safeZone = new Safezone(this);
    this.spam = new Spam(this);
    setInterval(generateFilters, 1000);
    setInterval(generateBuffers, 1000);
    generateEnvelopes(this);

    this.loop();
  };

  function generateFilters(){
    var filter = new Filter(this);
    filters.push(filter);
  }

  function generateBuffers(){
    var buffer = new Buffer(this);
    buffers.push(buffer);
  }

  function generateEnvelopes(game){
    for(var i = 0; i < 10; i++){
      var envelope = new Envelope(game);
      envelopes.push(envelope);
    }
  }

  return Game;
})();
