"use strict";

(function () {
  var map = document.querySelector(`.map`);
  var form = document.querySelector(`.ad-form`);
  var formFieldsetsElements = form.querySelectorAll(`fieldset`);
  var mapFiltersElement = document.querySelector(`.map__filters`);
  var mapPinsEl = document.querySelector(`.map__pins`);
  var mapPinMain = document.querySelector(`.map__pin--main`);

  for (var formFieldset of formFieldsetsElements) {
    formFieldset.setAttribute(`disabled`, `disabled`);
  }

  var enPageFlag = false;

  var enablePage = function () {
    var mapPin = document.querySelectorAll(`.map__pin`);

    map.classList.remove(`map--faded`);
    form.classList.remove(`ad-form--disabled`);
    for (formFieldset of formFieldsetsElements) {
      formFieldset.removeAttribute(`disabled`);
    }
    mapFiltersElement.classList.remove(`ad-form--disabled`);
    window.address.makeAddress();
    enPageFlag = true;
    for (var pin of mapPin) {
      if (!pin.classList.contains("map__pin--main")) {
        pin.classList.remove("hidden");
      }
    }
  };

  var disablePage = function () {
    var mapCard = document.querySelector(`.map__card`);
    var mapPin = document.querySelectorAll(`.map__pin`);

    map.classList.add(`map--faded`);
    form.classList.add(`ad-form--disabled`);
    form.reset();
    for (formFieldset of formFieldsetsElements) {
      formFieldset.setAttribute(`disabled`, `disabled`);
    }
    mapFiltersElement.classList.add(`ad-form--disabled`);
    mapPinMain.style = "left: 570px; top: 375px";
    if (mapCard) {
      mapCard.remove();
    }
    window.address.defAddress();
    for (var pin of mapPin) {
      if (!pin.classList.contains("map__pin--main")) {
        pin.classList.add("hidden");
      }
      // pin.classList.add("hidden");
    }
  };

  var createPin = function (obj) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < obj.length; i++) {
      var pinEl = window.pin(obj[i]);
      fragment.appendChild(pinEl);
    }
    mapPinsEl.appendChild(fragment);
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
    } else if (evt.buttons === 1 && enPageFlag) {
      enablePage();
    }
  });

  var keyEnter = `Enter`;

  mapPinMain.addEventListener(`keydown`, function (evt) {
    if (evt.key === keyEnter && !enPageFlag) {
      enablePage();
      window.download(createPin, errorHandler);
    } else if (evt.key === keyEnter && enPageFlag) {
      enablePage();
    }
  });

  var submitHandler = function (evt) {
    window.upload(new FormData(form), function () {
      disablePage();
    });
    evt.preventDefault();
  };
  form.addEventListener("submit", submitHandler);
})();
