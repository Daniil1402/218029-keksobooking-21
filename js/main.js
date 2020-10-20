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

var enPageFlag = false;

var enablePage = function () {
  map.classList.remove(`map--faded`);
  form.classList.remove(`ad-form--disabled`);
  for (formFieldset of formFieldsetsElement) {
    formFieldset.removeAttribute(`disabled`);
  }
  mapFiltersElement.classList.remove(`ad-form--disabled`);
  window.address.makeAddress();
  enPageFlag = true;
};

mapPinMain.addEventListener(`mousedown`, function (evt) {
  if (evt.buttons === 1 && !enPageFlag) {
    enablePage();
    window.pin();
  }
});

var keyEnter = `Enter`;

mapPinMain.addEventListener(`keydown`, function (evt) {
  if (evt.key === keyEnter && !enPageFlag) {
    enablePage();
    window.pin();
  }
});
