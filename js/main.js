"use strict";

(function () {
  var map = document.querySelector(`.map`);
  var form = document.querySelector(`.ad-form`);
  var formFieldsetsElement = form.querySelectorAll(`fieldset`);
  var mapFiltersElement = document.querySelector(`.map__filters`);
  var mapPins = document.querySelector(`.map__pins`);

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

  var createPin = function (obj) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < obj.length; i++) {
      var pinEl = window.pin(obj[i]);
      fragment.appendChild(pinEl);
    }
    mapPins.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement(`div`);
    node.style = `z-index: 100; text-align: left; background-color: #dadada;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.top = 0;
    node.style.fontSize = `20px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  mapPinMain.addEventListener(`mousedown`, function (evt) {
    if (evt.buttons === 1 && !enPageFlag) {
      enablePage();
      window.download(createPin, errorHandler);
    }
  });

  var keyEnter = `Enter`;

  mapPinMain.addEventListener(`keydown`, function (evt) {
    if (evt.key === keyEnter && !enPageFlag) {
      enablePage();
      window.download(createPin, errorHandler);
    }
  });
})();
