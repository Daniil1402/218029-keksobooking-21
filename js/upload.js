"use strict";

(function () {
  var KEY_ESCAPE = `Escape`;

  var URL = `https://21.javascript.pages.academy/keksobooking`;
  var main = document.querySelector(`main`);

  var successTemp = document
    .querySelector(`#success`)
    .content.querySelector(`.success`);

  var errorTemp = document
    .querySelector(`#error`)
    .content.querySelector(`.error`);

  var StatusCode = {
    OK: 200,
  };

  window.upload = function (data, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    var removeNotice = function (status) {
      status.remove();
    };

    var closeSuccessInfo = function (evt) {
      if (evt.key === KEY_ESCAPE) {
        removeNotice(successTemp);
        document.removeEventListener(`keydown`, closeSuccessInfo);
        document.removeEventListener(`click`, closeSuccessInfo);
      } else if (!evt.key) {
        removeNotice(successTemp);
        document.removeEventListener(`keydown`, closeSuccessInfo);
        document.removeEventListener(`click`, closeSuccessInfo);
      }
    };

    var errorButton = errorTemp.querySelector(`.error__button`);

    var closeErrorInfo = function (evt) {
      if (evt.key === KEY_ESCAPE) {
        removeNotice(errorTemp);
        document.removeEventListener(`keydown`, closeErrorInfo);
        document.removeEventListener(`click`, closeErrorInfo);
        errorButton.removeEventListener(`click`, closeErrorInfo);
      } else if (!evt.key) {
        removeNotice(errorTemp);
        document.removeEventListener(`keydown`, closeErrorInfo);
        document.removeEventListener(`click`, closeErrorInfo);
        errorButton.removeEventListener(`click`, closeErrorInfo);
      }
    };

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
        main.appendChild(successTemp);
        document.activeElement.blur();
        document.addEventListener(`click`, closeSuccessInfo);
        document.addEventListener(`keydown`, closeSuccessInfo);
      } else {
        main.appendChild(errorTemp);
        document.activeElement.blur();
        document.addEventListener(`click`, closeErrorInfo);
        errorButton.addEventListener(`click`, closeErrorInfo);
        document.addEventListener(`keydown`, closeErrorInfo);
      }
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();
