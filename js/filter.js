"use strict";

(function () {
  var mapFiltersElement = document.querySelector(`.map__filters`);

  var clearPin = function (filteredMarkers) {
    var mapPins = document.querySelectorAll(`.map__pin`);
    var mapCard = document.querySelector(`.map__card`);

    for (var pin of mapPins) {
      if (!pin.classList.contains(`map__pin--main`)) {
        pin.remove();
      }
    }
    if (mapCard) {
      mapCard.remove();
    }
    window.main.createPin(filteredMarkers);
  };

  var data = [];
  var saveData = function (downloadedPins) {
    data = downloadedPins;
  };

  var filterMarkers = function (filter, featuresFilters, filterPrices) {
    var filteredMarkers = data.filter(function (marker) {
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
    clearPin(filteredMarkers);
  };

  var lastTimeout;

  mapFiltersElement.addEventListener(`change`, function () {
    window.download(saveData);
    var filterSelect = mapFiltersElement.querySelectorAll(`select`);
    var filterInput = mapFiltersElement.querySelectorAll(`input`);

    var filter = {};
    var filterPrices = {};
    var featuresFilters = [];

    for (var filterElementSelect of filterSelect) {
      var filterValue = filterElementSelect.value;
      if (filterValue !== `any`) {
        var filterType = filterElementSelect.id.split(`-`)[1];
        if (filterType === `type`) {
          filter[filterType] = filterValue;
        } else if (filterType === `price`) {
          if (filterValue === `middle`) {
            filterPrices[`min`] = 10000;
            filterPrices[`max`] = 50000;
          } else if (filterValue === `low`) {
            filterPrices[`min`] = 0;
            filterPrices[`max`] = 10000;
          } else if (filterValue === `high`) {
            filterPrices[`min`] = 50000;
            filterPrices[`max`] = Infinity;
          }
        } else {
          filter[filterType] = parseInt(filterValue, 10);
        }
      }
    }
    for (var filterElementInput of filterInput) {
      if (filterElementInput.checked) {
        featuresFilters.push(filterElementInput.value);
      }
    }
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      filterMarkers(filter, featuresFilters, filterPrices);
    }, 500);
  });
})();
