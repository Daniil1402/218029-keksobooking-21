"use strict";

(function () {
  var mapPinMain = document.querySelector(`.map__pin--main`);

  mapPinMain.addEventListener(`mousedown`, function (evt) {
    if (evt.buttons === 1) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY,
      };

      var dragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        dragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY,
        };
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY,
        };

        var mainPinTop = mapPinMain.offsetTop - shift.y;
        var mainPinLeft = mapPinMain.offsetLeft - shift.x;
        var mainPinX = mainPinLeft + Math.floor(window.address.pinWidth / 2);
        var mainPinY =
          mainPinTop + window.address.pinWidth + window.address.afterHeight;

        if (mainPinX >= 0 && mainPinX <= 1200) {
          mapPinMain.style.left = mainPinLeft + `px`;
        }
        if (mainPinY >= 130 && mainPinY <= 630) {
          mapPinMain.style.top = mainPinTop + `px`;
        }
        if (
          mainPinX >= 0 &&
          mainPinX <= 1200 &&
          mainPinY >= 130 &&
          mainPinY <= 630
        ) {
          window.address.addressForm.value = `${mainPinX}, ${mainPinY}`;
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);

        if (dragged) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            mapPinMain.removeEventListener(`click`, onClickPreventDefault);
          };
          mapPinMain.addEventListener(`click`, onClickPreventDefault);
        }
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  });
})();
