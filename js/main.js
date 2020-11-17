"use strict";

(function () {
  var KEY_ENTER = `Enter`;

  var map = document.querySelector(`.map`);
  var form = document.querySelector(`.ad-form`);
  var formFieldsets = form.querySelectorAll(`fieldset`);
  var mapFiltersElement = document.querySelector(`.map__filters`);
  var mapFilters = mapFiltersElement.querySelectorAll(`select`);
  var mapFeaturesElement = mapFiltersElement.querySelector(`.map__features`);
  var mapPinsElement = document.querySelector(`.map__pins`);
  var mapPinMain = document.querySelector(`.map__pin--main`);
  var formReset = form.querySelector(`.ad-form__reset`);

  mapFiltersElement.classList.add(`hidden`);

  var mapFilter;

  for (mapFilter of mapFilters) {
    mapFilter.setAttribute(`disabled`, `disabled`);
  }

  mapFeaturesElement.setAttribute(`disabled`, `disabled`);

  var formFieldset;
  for (formFieldset of formFieldsets) {
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

  var markers = [];
  var saveData = function (downloadedPins) {
    markers = downloadedPins;
  };

  var getMarkers = function () {
    return markers;
  };

  window.download(saveData, errorHandler);

  var enableFlag = false;

  var enablePage = function () {
    for (mapFilter of mapFilters) {
      mapFilter.removeAttribute(`disabled`, `disabled`);
    }

    mapFeaturesElement.removeAttribute(`disabled`, `disabled`);

    map.classList.remove(`map--faded`);
    form.classList.remove(`ad-form--disabled`);
    for (formFieldset of formFieldsets) {
      formFieldset.removeAttribute(`disabled`);
    }
    window.address.makeAddress();
    createPin(markers);
    window.openclosePopup.changePopupState(markers);
  };

  var disablePage = function () {
    var mapCard = document.querySelector(`.map__card`);
    var mapPins = document.querySelectorAll(`.map__pin`);
    var price = document.querySelector(`#price`);

    price.placeholder = `1000`;

    mapFiltersElement.reset();

    map.classList.add(`map--faded`);
    form.classList.add(`ad-form--disabled`);
    form.reset();
    for (formFieldset of formFieldsets) {
      formFieldset.setAttribute(`disabled`, `disabled`);
    }
    mapFiltersElement.setAttribute(`disabled`, `disabled`);
    mapPinMain.style = `left: 570px; top: 375px`;
    if (mapCard) {
      mapCard.remove();
    }
    window.address.makeDefaultAddress();
    for (var pin of mapPins) {
      if (!pin.classList.contains(`map__pin--main`)) {
        pin.remove();
      }
    }
    enableFlag = false;
  };

  var createPin = function (newMarkers) {
    var maxPin = 5;
    var fragment = document.createDocumentFragment();
    if (newMarkers.length < maxPin) {
      maxPin = newMarkers.length;
    }
    for (var i = 0; i < maxPin; i++) {
      var pinElement = window.createPin(newMarkers[i]);
      fragment.appendChild(pinElement);
    }
    mapPinsElement.appendChild(fragment);
  };

  mapPinMain.addEventListener(`mousedown`, function (evt) {
    if (evt.buttons === 1 && !enableFlag) {
      enablePage();
      enableFlag = true;
    }
  });

  mapPinMain.addEventListener(`keydown`, function (evt) {
    if (evt.key === KEY_ENTER && !enableFlag) {
      enablePage();
      enableFlag = true;
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
    getMarkers,
  };
})();
