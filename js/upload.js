"use strict";

(function () {
  var URL = `https://21.javascript.pages.academy/keksobooking`;
  var main = document.querySelector("main");

  var successTemp = document
    .querySelector("#success")
    .content.querySelector(".success");

  var errorTemp = document
    .querySelector("#error")
    .content.querySelector(".error");

  var StatusCode = {
    OK: 200,
  };

  window.upload = function (data, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    var removeNotice = function (status) {
      status.remove();
    };

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
        main.appendChild(successTemp);
        document.addEventListener("click", function () {
          removeNotice(successTemp);
        });
        document.addEventListener("keydown", function (evt) {
          if (evt.key === "Escape") {
            removeNotice(successTemp);
          }
        });
      } else {
        main.appendChild(errorTemp);
        var errorButton = errorTemp.querySelector(".error__button");
        document.addEventListener("click", function () {
          removeNotice(errorTemp);
        });
        errorButton.addEventListener("click", function () {
          removeNotice(errorTemp);
        });
        document.addEventListener("keydown", function (evt) {
          if (evt.key === "Escape") {
            removeNotice(errorTemp);
          }
        });
      }
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();
