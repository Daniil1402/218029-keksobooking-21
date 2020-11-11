"use strict";

(function () {
  var mapFiltersEl = document.querySelector(`.map__filters`);

  var devarePin = function (FilteredMarkers) {
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
    window.main.createPin(FilteredMarkers);
  };

  var data = [];
  var saveData = function (obj) {
    data = obj;
  };

  window.download(saveData);

  var filtration = function (filter, featuresFilters, filterPrices) {
    var FilteredMarkers = data.filter(function (marker) {
      for (var key in filter) {
        if (marker.offer[key] !== filter[key]) {
          return false;
        }
      }
      for (var feturesFilter of featuresFilters) {
        if (marker.offer.features.indexOf(feturesFilter) === -1) {
          return false;
        }
      }
      if (`max` in filterPrices) {
        if (
          filterPrices[`min`] > marker.offer.price ||
          filterPrices[`max`] <= marker.offer.price
        ) {
          return false;
        }
      }
      return true;
    });
    devarePin(FilteredMarkers);
  };

  var lastTimeout;

  mapFiltersEl.addEventListener(`change`, function () {
    var filterSelect = mapFiltersEl.querySelectorAll(`select`);
    var filterInput = mapFiltersEl.querySelectorAll(`input`);

    var filter = {};
    var filterPrices = {};
    var featuresFilters = [];

    for (var filterElSelect of filterSelect) {
      var selectVal = filterElSelect.value;
      if (selectVal !== `any`) {
        var selectId = filterElSelect.id.split(`-`)[1];
        if (selectId === `type`) {
          filter[selectId] = selectVal;
        } else if (selectId === `price`) {
          if (selectVal === `middle`) {
            filterPrices[`min`] = 10000;
            filterPrices[`max`] = 50000;
          } else if (selectVal === `low`) {
            filterPrices[`min`] = 0;
            filterPrices[`max`] = 10000;
          } else if (selectVal === `high`) {
            filterPrices[`min`] = 50000;
            filterPrices[`max`] = Infinity;
          }
        } else {
          filter[selectId] = parseInt(selectVal, 10);
        }
      }
    }
    for (var filterElInput of filterInput) {
      if (filterElInput.checked) {
        featuresFilters.push(filterElInput.value);
      }
    }
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      filtration(filter, featuresFilters, filterPrices);
    }, 500);
  });
})();
