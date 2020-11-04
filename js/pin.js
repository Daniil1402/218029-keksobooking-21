"use strict";

(function () {
  var objTemplate = document
    .querySelector(`#pin`)
    .content.querySelector(`.map__pin`);

  window.pin = function (obj) {
    var pinElement = objTemplate.cloneNode(true);

    pinElement.style = `left: ${obj.location.x}px; top: ${obj.location.y}px;`;

    pinElement.setAttribute(`data-col`, `${obj.id}`);

    var pinImg = pinElement.querySelector(`img`);
    pinImg.src = obj.author.avatar;
    pinImg.alt = obj.offer.title;

    return pinElement;
  };
})();
