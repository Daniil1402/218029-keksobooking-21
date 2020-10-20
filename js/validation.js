"use strict";

(function () {
  var form = document.querySelector(`.ad-form`);
  var formTitle = form.querySelector(`#title`);
  var formAddress = form.querySelector(`#address`);
  var formPrice = form.querySelector(`#price`);
  var formType = form.querySelector(`#type`);
  var formTimein = form.querySelector(`#timein`);
  var formTimeout = form.querySelector(`#timeout`);
  var formRoomNumber = form.querySelector(`#room_number`);
  var formCapacity = form.querySelector(`#capacity`);
  var formCapacityOption = formCapacity.querySelectorAll(`option`);

  var FORM_TITLE_MAX_LENGTH = 100;
  var FORM_TITLE_MIN_LENGTH = 30;
  var FORM_MAX_PRICE = 1000000;
  var FORM_MIN_PRICE;

  formTitle.addEventListener(`input`, function () {
    if (formTitle.value.length < FORM_TITLE_MIN_LENGTH) {
      formTitle.setCustomValidity(
          `Заголовок объявления должен быть больше ${FORM_TITLE_MIN_LENGTH} символов. Сейчас количество символов ${formTitle.value.length}.`
      );
    } else if (formTitle.value.length > FORM_TITLE_MAX_LENGTH) {
      formTitle.setCustomValidity(
          `Заголовок объявления должен быть не более ${FORM_TITLE_MAX_LENGTH} символов. Сейчас количество символов ${formTitle.value.length}.`
      );
    } else {
      formTitle.setCustomValidity(``);
    }
    formTitle.reportValidity();
  });

  if (formType.value === `flat`) {
    FORM_MIN_PRICE = 1000;
    formPrice.setAttribute(`placeholder`, `${FORM_MIN_PRICE}`);
    formTypeText = `Квартира`;
  }

  var formTypeText;

  formType.addEventListener(`change`, function () {
    if (formType.value === `flat`) {
      FORM_MIN_PRICE = 1000;
      formPrice.setAttribute(`placeholder`, `${FORM_MIN_PRICE}`);
      formTypeText = `Квартира`;
    } else if (formType.value === `bungalow`) {
      FORM_MIN_PRICE = 0;
      formPrice.setAttribute(`placeholder`, `${FORM_MIN_PRICE}`);
      formTypeText = `Бунгало`;
    } else if (formType.value === `house`) {
      FORM_MIN_PRICE = 5000;
      formPrice.setAttribute(`placeholder`, `${FORM_MIN_PRICE}`);
      formTypeText = `Дом`;
    } else if (formType.value === `palace`) {
      FORM_MIN_PRICE = 10000;
      formPrice.setAttribute(`placeholder`, `${FORM_MIN_PRICE}`);
      formTypeText = `Дворец`;
    }
  });
  // console.log(formType.value);

  formPrice.addEventListener(`input`, function () {
    if (formPrice.value > FORM_MAX_PRICE) {
      formPrice.setCustomValidity(
          `Максимальная цена за ночь ${FORM_MAX_PRICE} руб.`
      );
    } else if (formPrice.value < FORM_MIN_PRICE) {
      formPrice.setCustomValidity(
          `Минимальная цена за ночь в типе жилья: ${formTypeText}, ${FORM_MIN_PRICE} руб.`
      );
    } else {
      formPrice.setCustomValidity(``);
    }
    formPrice.reportValidity();
  });

  formAddress.setAttribute(`readonly`, `readonly`);

  formTimein.addEventListener(`change`, function (evt) {
    formTimeout.value = evt.target.value;
  });

  formTimeout.addEventListener(`change`, function (evt) {
    formTimein.value = evt.target.value;
  });

  // var syncTime = function ({ selectName, value }) {
  //   switch (selectName) {
  //     case "timein":
  //       formTimeout.value = value;
  //       break;
  //     case "timeout":
  //       formTimein.value = value;
  //       break;
  //   }
  // };

  // form.addEventListener("change", function (evt) {
  //   if (evt.target.closest("select")) {
  //     syncTime({ selectName: evt.target.name, value: evt.target.value });
  //   }
  // });

  formRoomNumber.addEventListener(`change`, function (evt) {
    if (evt.target.value === `100`) {
      formCapacity.value = `0`;
      for (var formCapacityOptionEl of formCapacityOption) {
        if (formCapacityOptionEl.value !== `0`) {
          formCapacityOptionEl.setAttribute(`disabled`, `disabled`);
        } else {
          formCapacityOptionEl.removeAttribute(`disabled`);
        }
      }
    } else {
      for (formCapacityOptionEl of formCapacityOption) {
        if (formCapacityOptionEl.value === `0`) {
          formCapacityOptionEl.setAttribute(`disabled`, `disabled`);
        } else if (formCapacityOptionEl.value > evt.target.value) {
          formCapacityOptionEl.setAttribute(`disabled`, `disabled`);
        } else {
          formCapacityOptionEl.removeAttribute(`disabled`);
        }
      }
      formCapacity.value = evt.target.value;
    }
  });
})();
