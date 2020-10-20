"use strict";

window.data.createObjectArr();

var map = document.querySelector(`.map`);
var form = document.querySelector(`.ad-form`);
var formFieldsetsElement = form.querySelectorAll(`fieldset`);
var mapFiltersElement = document.querySelector(`.map__filters`);

for (var formFieldset of formFieldsetsElement) {
  formFieldset.setAttribute(`disabled`, `disabled`);
}

var mapPinMain = document.querySelector(`.map__pin--main`);

// Заполнение поля адреса
var MAP_PIN_LEFT = 570;
var MAP_PIN_TOP = 375;
var MAP_PIN_WIDTH_HEIGHT = 65;
var MAP_PIN_AFTER_HEIGHT = 22;

var formAddress = form.querySelector(`#address`);

var mapPinCenterX = Math.round(MAP_PIN_LEFT + MAP_PIN_WIDTH_HEIGHT / 2);
var mapPinCenterY = Math.round(MAP_PIN_TOP + MAP_PIN_WIDTH_HEIGHT / 2);
formAddress.value = `${mapPinCenterX}, ${mapPinCenterY}`;

var createEnableAddress = function () {
  mapPinCenterY = Math.round(
      MAP_PIN_TOP + MAP_PIN_WIDTH_HEIGHT + MAP_PIN_AFTER_HEIGHT
  );
  formAddress.value = `${mapPinCenterX}, ${mapPinCenterY}`;
};

// Заполнение поля адреса

var enablePage = function () {
  map.classList.remove(`map--faded`);
  form.classList.remove(`ad-form--disabled`);
  for (formFieldset of formFieldsetsElement) {
    formFieldset.removeAttribute(`disabled`);
  }
  mapFiltersElement.classList.remove(`ad-form--disabled`);
  createEnableAddress();
};

mapPinMain.addEventListener(`mousedown`, function (evt) {
  // console.log(e.buttons);
  if (evt.buttons === 1) {
    enablePage();
    window.pin();
  }
});

var keyEnter = `Enter`;

mapPinMain.addEventListener(`keydown`, function (evt) {
  if (evt.key === keyEnter) {
    enablePage();
    window.pin();
  }
});
