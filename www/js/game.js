/* exported Game */
/* global Filter */
var Game = (function(){
  'use strict';
  var filters = [];
  function Game(){
    var bodyHeight    = window.innerHeight,
        headerHeight  = document.getElementsByTagName('ion-header-bar')[0].clientHeight;
    this.canvas        = document.getElementById('canvas');
    this.ctx           = this.canvas.getContext('2d');
    this.canvas.height = bodyHeight - headerHeight;
    this.canvas.width  = window.innerWidth;
    //this.filters = [];
  }
  Game.prototype.loop = function(timestamp){
    this.clear();
    for(var i = 0; i < filters.length; i++){
      filters[i].draw(this);
    }
    window.requestAnimationFrame(this.loop.bind(this));
  };
  Game.prototype.clear = function(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };
  Game.prototype.start = function(){
    //debugger;
    //this.filters = new Filter(this);
    //this.generateFilters(this);
    setInterval(generateFilters, 1500);
    this.loop();
  };
  function generateFilters(){
    var filter = new Filter(this);
    filters.push(filter);
  }
  return Game;
})();
