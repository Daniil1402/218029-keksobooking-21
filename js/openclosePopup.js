"use strict";

(function () {
  var KEY_ESCAPE = `Escape`;
  var mapPinsElement = document.querySelector(`.map__pins`);

  var previusPointer;

  var changePopupState = function (pins) {
    mapPinsElement.addEventListener(`click`, function (evt) {
      var pointer = evt.target.closest(`.map__pin`);
      var mapCard = document.querySelector(`.map__card`);

      if (pointer && !pointer.classList.contains(`map__pin--main`)) {
        var pinAttribute = pointer.attributes[3].value;
        if (!mapCard) {
          pointer.classList.add(`map__pin---active`);
          window.popup.fragment.appendChild(
            window.popup.renderPopup(pins[pinAttribute])
          );
          mapPinsElement.appendChild(window.popup.fragment);
        } else {
          if (previusPointer.classList.contains(`map__pin---active`)) {
            previusPointer.classList.remove(`map__pin---active`);
          }
          mapCard.remove();
          window.popup.fragment.appendChild(
            window.popup.renderPopup(pins[pinAttribute])
          );
          mapPinsElement.appendChild(window.popup.fragment);
          pointer.classList.add(`map__pin---active`);
        }
      } else if (evt.target.classList.value === `popup__close`) {
        previusPointer.classList.remove(`map__pin---active`);
        mapCard.remove();
      }
      previusPointer = pointer;
    });

    mapPinsElement.addEventListener(`keydown`, function (evt) {
      var mapCard = document.querySelector(`.map__card`);
      if (!evt.target.classList.contains(`map__pin--main`)) {
        if (evt.key === KEY_ESCAPE && mapCard) {
          previusPointer.classList.remove(`map__pin---active`);
          mapCard.remove();
        }
      }
    });
  };

  window.openclosePopup = {
    changePopupState,
  };
})();
