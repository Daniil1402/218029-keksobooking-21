"use strict";

(function () {
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;

  var pinTemplate = document
    .querySelector(`#pin`)
    .content.querySelector(`.map__pin`);

  window.createPin = function (obj) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinX = obj.location.x - PIN_WIDTH / 2;
    var pinY = obj.location.y - PIN_HEIGHT;

    pinElement.style = `left: ${pinX}px; top: ${pinY}px;`;

    pinElement.setAttribute(`data-col`, `${obj.id}`);

    var pinImg = pinElement.querySelector(`img`);
    pinImg.src = obj.author.avatar;
    pinImg.alt = obj.offer.title;

    return pinElement;
  };
})();
