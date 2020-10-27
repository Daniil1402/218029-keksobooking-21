"use strict";

(function () {
  var mapPins = document.querySelector(`.map__pins`);

  var keyEscape = `Escape`;

  var openclosePopup = function (obj) {
    mapPins.addEventListener(`click`, function (evt) {
      var pointer = evt.target.closest(`.map__pin`);
      var mapCard = document.querySelector(`.map__card`);

      if (pointer && !pointer.classList.contains(`map__pin--main`)) {
        var pinAttr = pointer.attributes[3].value;
        if (!mapCard) {
          window.popup.fragment.appendChild(
              window.popup.renderPopup(obj[pinAttr])
          );
          mapPins.appendChild(window.popup.fragment);
        } else {
          mapCard.remove();
          window.popup.fragment.appendChild(
              window.popup.renderPopup(obj[pinAttr])
          );
          mapPins.appendChild(window.popup.fragment);
        }
      } else if (evt.target.classList.value === `popup__close`) {
        mapCard.remove();
      }
    });

    mapPins.addEventListener(`keydown`, function (evt) {
      var mapCard = document.querySelector(`.map__card`);
      if (!evt.target.classList.contains(`map__pin--main`)) {
        if (evt.key === keyEscape && mapCard) {
          mapCard.remove();
        }
      }
    });
  };

  window.download(openclosePopup);
})();
