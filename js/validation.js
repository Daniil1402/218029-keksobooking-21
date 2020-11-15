"use strict";

(function () {
  var FORM_TITLE_MAX_LENGTH = 100;
  var FORM_TITLE_MIN_LENGTH = 30;
  var FORM_MAX_PRICE = 1000000;
  var formMinPrice;

  var form = document.querySelector(`.ad-form`);
  var formTitle = form.querySelector(`#title`);
  var formAddress = form.querySelector(`#address`);
  var formPrice = form.querySelector(`#price`);
  var formType = form.querySelector(`#type`);
  var formTimein = form.querySelector(`#timein`);
  var formTimeout = form.querySelector(`#timeout`);
  var formRoomNumber = form.querySelector(`#room_number`);
  var formCapacity = form.querySelector(`#capacity`);
  var formCapacityOptions = formCapacity.querySelectorAll(`option`);

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
    formMinPrice = 1000;
    formPrice.setAttribute(`placeholder`, `${formMinPrice}`);
    formTypeText = `Квартира`;
  }

  var formTypeText;

  var changeMinPrice = function () {
    if (formType.value === `flat`) {
      formMinPrice = 1000;
      formPrice.setAttribute(`placeholder`, `${formMinPrice}`);
      formTypeText = `Квартира`;
    } else if (formType.value === `bungalow`) {
      formMinPrice = 0;
      formPrice.setAttribute(`placeholder`, `${formMinPrice}`);
      formTypeText = `Бунгало`;
    } else if (formType.value === `house`) {
      formMinPrice = 5000;
      formPrice.setAttribute(`placeholder`, `${formMinPrice}`);
      formTypeText = `Дом`;
    } else if (formType.value === `palace`) {
      formMinPrice = 10000;
      formPrice.setAttribute(`placeholder`, `${formMinPrice}`);
      formTypeText = `Дворец`;
    }
    checkPrice();
  };

  formType.addEventListener(`change`, changeMinPrice);
  form.addEventListener(`reset`, function () {
    formMinPrice = 1000;
    formTypeText = `Квартира`;
  });

  var checkPrice = function () {
    if (formPrice.value > FORM_MAX_PRICE) {
      formPrice.setCustomValidity(
          `Максимальная цена за ночь ${FORM_MAX_PRICE} руб.`
      );
    } else if (formPrice.value < formMinPrice) {
      formPrice.setCustomValidity(
          `Минимальная цена за ночь в типе жилья: ${formTypeText}, ${formMinPrice} руб.`
      );
    } else {
      formPrice.setCustomValidity(``);
    }
    formPrice.reportValidity();
  };

  formPrice.addEventListener(`input`, function () {
    checkPrice();
  });

  formAddress.setAttribute(`readonly`, `readonly`);

  formTimein.addEventListener(`change`, function (evt) {
    formTimeout.value = evt.target.value;
  });

  formTimeout.addEventListener(`change`, function (evt) {
    formTimein.value = evt.target.value;
  });

  formRoomNumber.addEventListener(`change`, function (evt) {
    var formCapacityOption;
    if (evt.target.value === `100`) {
      formCapacity.value = `0`;
      for (formCapacityOption of formCapacityOptions) {
        if (formCapacityOption.value !== `0`) {
          formCapacityOption.setAttribute(`disabled`, `disabled`);
        } else {
          formCapacityOption.removeAttribute(`disabled`);
        }
      }
    } else {
      for (formCapacityOption of formCapacityOptions) {
        if (formCapacityOption.value === `0`) {
          formCapacityOption.setAttribute(`disabled`, `disabled`);
        } else if (formCapacityOption.value > evt.target.value) {
          formCapacityOption.setAttribute(`disabled`, `disabled`);
        } else {
          formCapacityOption.removeAttribute(`disabled`);
        }
      }
      formCapacity.value = evt.target.value;
    }
  });
})();
