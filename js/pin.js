"use strict";

(function () {
  var objTemplate = document
    .querySelector(`#pin`)
    .content.querySelector(`.map__pin`);

  var mapPins = document.querySelector(`.map__pins`);

  var count = 0;

  var renderPin = function (obj) {
    var pinElement = objTemplate.cloneNode(true);

    pinElement.style = `left: ${obj.location.x}px; top: ${obj.location.y}px;`;
    pinElement.setAttribute(`data-col`, `${count}`);

    count = count + 1;

    var pinImg = pinElement.querySelector(`img`);
    pinImg.src = obj.author.avatar;
    pinImg.alt = obj.offer.title;

    return pinElement;
  };

  window.pin = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.dataArr.length; i++) {
      var pinEl = renderPin(window.data.dataArr[i]);
      fragment.appendChild(pinEl);
    }
    mapPins.appendChild(fragment);
  };
})();
