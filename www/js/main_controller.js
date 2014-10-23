/* global Game */
(function(){
  'use strict';
  angular.module('spam-trek')
  .controller('MainCtrl', ['$scope', '$interval', function($scope, $interval){
    $scope.startButton = true;
    $scope.level = 0;
    $scope.title = 'spam-trek deluxe';
    $scope.stopButton = false;
    $scope.collected = 0;
    var game  = null,
        timer = null;
    resetClock();
    document.addEventListener('deviceready', function(){
      //$scope.startButton = true;
      game = new Game($scope.level);
    });
    $scope.start = function(){
      $scope.startButton = false;
      //game = new Game($scope.level);
      if(game){
        game.start();
        //$scope.blop = game.filters.length;
        //$scope.$watch('blop', function(){game.assets.blop.play();});
        startClock();
      }
      //setTimeout(function(){
      //  navigator.splashscreen.hide();
      //}, 3000);
      //game = new Game();
    };
    /*$scope.start = function(){
      game = new Game($scope.level);
      game.start();
      startClock();
      $scope.startButton = false;
      $scope.stopButton = true;
    };*/
    function startClock(){
      resetClock();
      cancelTimer();
      timer = $interval(function(){
        $scope.clock++;
      }, 1000);
    }
    function resetClock(){
      $scope.clock = 0;
    }
    window.addEventListener('gameover', function(){
      //$scope.button = true;
      $scope.level = game.level;
      cancelTimer();
      $scope.startButton = true;
      $scope.collected = 0;
    });
    window.addEventListener('collect', function(){
      $scope.collected = game.collected;
    });
    function cancelTimer(){
      $interval.cancel(timer);
    }
  }]);
})();
