"use strict";

(function () {
  var mapPinsEl = document.querySelector(`.map__pins`);

  var keyEscape = `Escape`;
  var previusPointer;

  var openclosePopup = function (obj) {
    mapPinsEl.addEventListener(`click`, function (evt) {
      var pointer = evt.target.closest(`.map__pin`);
      // console.log(pointer);
      var mapCard = document.querySelector(`.map__card`);

      if (pointer && !pointer.classList.contains(`map__pin--main`)) {
        var pinAttr = pointer.attributes[3].value;
        // pointer.classList.add("map__pin---active");
        if (!mapCard) {
          pointer.classList.add(`map__pin---active`);
          window.popup.fragment.appendChild(
              window.popup.renderPopup(obj[pinAttr])
          );
          mapPinsEl.appendChild(window.popup.fragment);
        } else {
          if (previusPointer.classList.contains(`map__pin---active`)) {
            previusPointer.classList.remove(`map__pin---active`);
          }
          mapCard.remove();
          window.popup.fragment.appendChild(
              window.popup.renderPopup(obj[pinAttr])
          );
          mapPinsEl.appendChild(window.popup.fragment);
          pointer.classList.add(`map__pin---active`);
        }
      } else if (evt.target.classList.value === `popup__close`) {
        previusPointer.classList.remove(`map__pin---active`);
        mapCard.remove();
      }
      previusPointer = pointer;
    });

    mapPinsEl.addEventListener(`keydown`, function (evt) {
      var mapCard = document.querySelector(`.map__card`);
      if (!evt.target.classList.contains(`map__pin--main`)) {
        if (evt.key === keyEscape && mapCard) {
          previusPointer.classList.remove(`map__pin---active`);
          mapCard.remove();
        }
      }
    });
  };

  // window.download(openclosePopup);

  window.openclosePopup = {
    openclosePopup,
  };
})();
