"use strict";

(function () {
  // Заполнение поля адреса
  var MAP_PIN_LEFT = 570;
  var MAP_PIN_TOP = 375;
  var MAP_PIN_WIDTH_HEIGHT = 65;
  var MAP_PIN_AFTER_HEIGHT = 22;

  var form = document.querySelector(`.ad-form`);
  var formAddress = form.querySelector(`#address`);

  var mapPinCenterX = Math.round(MAP_PIN_LEFT + MAP_PIN_WIDTH_HEIGHT / 2);
  var mapPinCenterY = Math.round(MAP_PIN_TOP + MAP_PIN_WIDTH_HEIGHT / 2);
  formAddress.value = `${mapPinCenterX}, ${mapPinCenterY}`;

  window.address = {
    makeAddress() {
      mapPinCenterY = Math.round(
        MAP_PIN_TOP + MAP_PIN_WIDTH_HEIGHT + MAP_PIN_AFTER_HEIGHT
      );
      formAddress.value = `${mapPinCenterX}, ${mapPinCenterY}`;
    },
    addressForm: formAddress,
    pinWidth: MAP_PIN_WIDTH_HEIGHT,
  };
})();
