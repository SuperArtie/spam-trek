/* global Game */
(function(){
  'use strict';
  angular.module('spam-trek')
  .controller('MainCtrl', ['$scope', '$interval', function($scope, $interval){
    $scope.title = 'spam-trek deluxe';
    var game = null;
    //document.addEventListener('deviceready', function(){
    //  game = new Game();
    //});
    $scope.start = function(){
      game = new Game();
      game.start();
    };
    $scope.start();
    /*
    var bodyHeight    = window.innerHeight,
        headerHeight  = document.getElementsByTagName('ion-header-bar')[0].clientHeight,
        canvas        = document.getElementById('canvas'),
        ctx           = canvas.getContext('2d'),
        filters       = [];
    canvas.height = bodyHeight - headerHeight;
    canvas.width  = window.innerWidth;
    $interval(filt, 1600);
    draw();
    function filt(){
      for(var j = 0; j < 5; j++){
        var randX = Math.floor((Math.random()*500)+100),
            left   = randX,
            top    = 0,
            width  = 10,
            length = 10;
        filters.push({left:left, top:top, width:width, length:length});
      }
    }
    function draw(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      for(var i = 0; i < filters.length; i++){
        filters[i].top += 1;
        ctx.rect(filters[i].left, filters[i].top, filters[i].width, filters[i].length);
      }
      ctx.closePath();
      ctx.stroke();
      window.requestAnimationFrame(draw);
    }
    */
  }]);
})();
