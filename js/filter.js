"use strict";

(function () {
  var mapFiltersEl = document.querySelector(`.map__filters`);

  var arrAds = [];

  var devarePin = function (arr) {
    var mapPin = document.querySelectorAll(`.map__pin`);
    var mapCard = document.querySelector(`.map__card`);

    for (var pin of mapPin) {
      if (!pin.classList.contains(`map__pin--main`)) {
        pin.remove();
      }
    }
    if (mapCard) {
      mapCard.remove();
    }
    createfilterPin(arr);
  };

  var data = [];
  var saveData = function (obj) {
    data = obj;
  };

  var filtration = function (obj, party) {
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].offer.type === party && party !== `any`) {
        arrAds.push(obj[i]);
        devarePin(arrAds);
      } else if (party === `any`) {
        devarePin(data);
      }
    }
    arrAds = [];
  };

  var createfilterPin = function (arr) {
    var MAX_PIN = 5;

    var mapPinsEl = document.querySelector(`.map__pins`);
    var fragment = document.createDocumentFragment();
    if (arr.length < MAX_PIN) {
      MAX_PIN = arr.length;
    }
    for (var i = 0; i < MAX_PIN; i++) {
      var pinEl = window.pin(arr[i]);
      fragment.appendChild(pinEl);
    }
    mapPinsEl.appendChild(fragment);
  };

  window.download(saveData);

  mapFiltersEl.addEventListener(`change`, function (evt) {
    switch (evt.target.name) {
      case `housing-type`:
        filtration(data, evt.target.value);
        break;
    }
  });
})();
