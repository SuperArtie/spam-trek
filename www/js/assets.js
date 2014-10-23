/* global Media */
/* exported Asset */

var Asset = (function(){
  'use strict';

  function Asset(){
  }

  Asset.load = function(){
    var asset = {};

    asset.spam = new Image();
    asset.spam.src = 'img/spambot.png';

    asset.mailbox = new Image();
    asset.mailbox.src = 'img/mailbox.jpg';

    asset.blop = new Media();
    asset.blop.src = 'audio/blop.mp3';

    asset.filter = new Image();
    asset.filter.src = 'img/filter.png';

    asset.buffer = new Image();
    asset.buffer.src = 'img/buffer.png';

    asset.envelope = new Image();
    asset.envelope.src = 'img/envelope.png';

    return asset;
  };

  return Asset;
})();
