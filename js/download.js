"use strict";

(function () {
  var TIMEOUT_IN_MS = 10000;
  var URL = `https://21.javascript.pages.academy/keksobooking/data`;

  var StatusCode = {
    OK: 200,
  };

  var setId = function (downloadedPins) {
    for (var i = 0; i < downloadedPins.length; i++) {
      downloadedPins[i].id = i;
    }
    return downloadedPins;
  };

  window.download = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        var mapFiltersElement = document.querySelector(`.map__filters`);
        var response = setId(xhr.response);
        onLoad(response);
        mapFiltersElement.classList.remove(`hidden`);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, URL);
    xhr.send();
  };
})();
