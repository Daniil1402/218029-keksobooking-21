"use strict";

(function () {
  var mapPinMain = document.querySelector(`.map__pin--main`);
  // var dialogHandle = setupDialogElement.querySelector(`.upload`);

  mapPinMain.addEventListener(`mousedown`, function (evt) {
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

      if (mainPinLeft > -32 && mainPinLeft < 1167) {
        mapPinMain.style.left = mainPinLeft + `px`;
      }
      if (mainPinTop > 130 && mainPinTop < 630) {
        mapPinMain.style.top = mainPinTop + `px`;
      }
      window.address.addressForm.value = `${
        mainPinTop + Math.round(window.address.pinWidth / 2)
      },${mainPinLeft + Math.round(window.address.pinWidth / 2)}`;
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
  });
})();