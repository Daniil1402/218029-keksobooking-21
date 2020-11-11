"use strict";

(function () {
  var map = document.querySelector(`.map`);
  var form = document.querySelector(`.ad-form`);
  var formFieldsetsElements = form.querySelectorAll(`fieldset`);
  var mapFiltersElement = document.querySelector(`.map__filters`);
  var mapFilter = mapFiltersElement.querySelectorAll(`select`);
  var mapFeatures = mapFiltersElement.querySelector(`.map__features`);
  var mapPinsEl = document.querySelector(`.map__pins`);
  var mapPinMain = document.querySelector(`.map__pin--main`);
  var formReset = form.querySelector(`.ad-form__reset`);

  mapFiltersElement.classList.add(`hidden`);

  for (var mapFilterEl of mapFilter) {
    mapFilterEl.setAttribute(`disabled`, `disabled`);
  }

  mapFeatures.setAttribute(`disabled`, `disabled`);

  for (var formFieldset of formFieldsetsElements) {
    formFieldset.setAttribute(`disabled`, `disabled`);
  }

  var errorHandler = function (errorMessage) {
    var node = document.createElement(`div`);
    node.style = `z-index: 100; text-align: left; background-color: #dadada;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.top = 0;
    node.style.fontSize = `20px`;
    node.style.position = `fixed`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  var enablePage = function () {
    var mapPin = document.querySelectorAll(`.map__pin`);

    for (mapFilterEl of mapFilter) {
      mapFilterEl.removeAttribute(`disabled`, `disabled`);
    }

    mapFeatures.removeAttribute(`disabled`, `disabled`);

    map.classList.remove(`map--faded`);
    form.classList.remove(`ad-form--disabled`);
    for (formFieldset of formFieldsetsElements) {
      formFieldset.removeAttribute(`disabled`);
    }
    window.address.makeAddress();
    window.download(createPin, errorHandler);
    for (var pin of mapPin) {
      if (!pin.classList.contains(`map__pin--main`)) {
        pin.classList.remove(`hidden`);
      }
    }
  };

  var disablePage = function () {
    var mapCard = document.querySelector(`.map__card`);
    var mapPin = document.querySelectorAll(`.map__pin`);

    mapFiltersElement.reset();

    map.classList.add(`map--faded`);
    form.classList.add(`ad-form--disabled`);
    form.reset();
    for (formFieldset of formFieldsetsElements) {
      formFieldset.setAttribute(`disabled`, `disabled`);
    }
    mapFiltersElement.setAttribute(`disabled`, `disabled`);
    mapPinMain.style = `left: 570px; top: 375px`;
    if (mapCard) {
      mapCard.remove();
    }
    window.address.defAddress();
    for (var pin of mapPin) {
      if (!pin.classList.contains(`map__pin--main`)) {
        pin.classList.add(`hidden`);
      }
    }
  };

  var setId = function (arrObj) {
    for (var i = 0; i < arrObj.length; i++) {
      arrObj[i].id = i;
    }
    return arrObj;
  };

  var createPin = function (obj) {
    var MAX_PIN = 5;
    var fragment = document.createDocumentFragment();
    if (obj.length < MAX_PIN) {
      MAX_PIN = obj.length;
    }
    for (var i = 0; i < MAX_PIN; i++) {
      var pinEl = window.pin(obj[i]);
      fragment.appendChild(pinEl);
    }
    mapPinsEl.appendChild(fragment);
  };

  mapPinMain.addEventListener(`mousedown`, function (evt) {
    if (evt.buttons === 1) {
      enablePage();
    }
  });

  var keyEnter = `Enter`;

  mapPinMain.addEventListener(`keydown`, function (evt) {
    if (evt.key === keyEnter) {
      enablePage();
    }
  });

  formReset.addEventListener(`click`, function () {
    disablePage();
  });

  var submitHandler = function (evt) {
    window.upload(new FormData(form), function () {
      disablePage();
    });
    evt.preventDefault();
  };
  form.addEventListener(`submit`, submitHandler);

  window.main = {
    createPin,
    setId,
  };
})();
