"use strict";

(function () {
  var pinTemplate = document
    .querySelector(`#pin`)
    .content.querySelector(`.map__pin`);

  window.createPin = function (obj) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style = `left: ${obj.location.x}px; top: ${obj.location.y}px;`;

    pinElement.setAttribute(`data-col`, `${obj.id}`);

    var pinImg = pinElement.querySelector(`img`);
    pinImg.src = obj.author.avatar;
    pinImg.alt = obj.offer.title;

    return pinElement;
  };
})();
