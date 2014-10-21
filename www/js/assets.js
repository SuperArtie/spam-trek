/* exported Asset */

var Asset = (function(){
  'use strict';

  function Asset(){
  }

  Asset.load = function(){
    var asset = {};

    asset.spam = new Image();
    asset.spam.src = 'img/spam.png';

    asset.mailbox = new Image();
    asset.mailbox.src = 'img/mailbox.jpg';

    return asset;
  };

  return Asset;
})();
