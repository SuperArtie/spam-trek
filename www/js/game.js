/* exported Game */
/* global Filter, Spam, Asset, Mailbox, SafeZone, Buffer, Envelope */
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
    this.level         = 0;
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
      //debugger;
      //console.log(k);
      if(envelopes[k].collect(self.spam)){
        envelopes.splice([k], 1);
        self.collected += 1;
        window.dispatchEvent(new Event('collect'));
      }
    }
    this.clear();
    if(this.collected >= 5+(this.level*3)){
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
      if(this.inBox){
        this.level++;
      }else{
        this.level = 0;
      }
      this.collected = 0;
      clearInterval(this.buff);
      clearInterval(this.filt);
      envelopes = [];
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
    this.safeZone = new SafeZone(this);
    this.spam = new Spam(this);
    var buff = 1500-this.level*250;
    console.log('buff', buff, 'level', this.level);
    this.buff = setInterval(function(){generateBuffers(self);}, buff);
    this.filt = setInterval(function(){generateFilters(self);}, buff);
    generateEnvelopes(this);
    this.loop();
  };
  function generateFilters(game){
    var filter = new Filter(game);
    filters.push(filter);
  }

  function generateBuffers(game){
    //console.log('hey');
    var buffer = new Buffer(game);
    buffers.push(buffer);
    //console.log(buffers.length, ' ', buffers[0].speed);
  }

  function generateEnvelopes(game){
    for(var i = 0; i < 10 + game.level; i++){
      var envelope = new Envelope(game);
      envelopes.push(envelope);
    }
    console.log(envelopes);
  }

  return Game;
})();
