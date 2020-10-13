"use strict";

var createRandNumber = function (min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

var numbers = [1, 2, 3, 4, 5, 6, 7, 8];

var titles = [
  `Дом`,
  `Комната`,
  `Дача`,
  `Чердак`,
  `Будка`,
  `Дача`,
  `Будка`,
  `Комната`,
];

var addressesX = [600, 400, 300, 550, 500, 350, 650, 470];

var addressesY = [200, 220, 600, 450, 350, 350, 340, 200];

var price = [200, 1000, 100, 500, 500, 120, 400];

var typeArr = [`palace`, `flat`, `house`, `bungalow`];

var rooms = [1, 3, 2, 2, 3, 2, 2, 1];

var guests = [2, 4, 2, 4, 5, 3, 4, 2];

var checkArr = [`12:00`, `13:00`, `14:00`];

var description = `Самое лучшее предложение`;

var createArrFeatures = function () {
  let features = [
    `wifi`,
    `dishwasher`,
    `parking`,
    `washer`,
    `elevator`,
    `conditioner`,
  ];
  let arrfeatures = [];
  let arrFeaturesLen = createRandNumber(0, features.length);
  for (let i = 0; i < arrFeaturesLen; i++) {
    let m = Math.floor(Math.random() * features.length);
    arrfeatures.push(features.splice(m, 1)[0]);
  }
  return arrfeatures;
};

var createArrPhotos = function () {
  let photos = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
  ];
  let arrphotos = [];
  let photosLen = createRandNumber(0, photos.length);
  for (let i = 0; i < photosLen; i++) {
    let p = Math.floor(Math.random() * photos.length);
    arrphotos.push(photos.splice(p, 1)[0]);
  }
  return arrphotos;
};

var createObject = function (avatar, locationX, locationY) {
  let newFeatures = createArrFeatures();
  let newPhotos = createArrPhotos();

  let objectItem = {
    author: {
      avatar: `img/avatars/user0${avatar}.png`,
    },
    offer: {
      title: titles[avatar - 1],
      address: `${locationX}, ${locationY}`,
      price: price[avatar - 1],
      type: `${typeArr[createRandNumber(0, typeArr.length - 1)]}`,
      rooms: rooms[avatar - 1],
      guests: guests[avatar - 1],
      checkin: `${checkArr[createRandNumber(0, checkArr.length - 1)]}`,
      checkout: `${checkArr[createRandNumber(0, checkArr.length - 1)]}`,
      features: newFeatures,
      description,
      photos: newPhotos,
    },
    location: {
      x: locationX,
      y: locationY,
    },
  };
  return objectItem;
};

var objectsArr = [];

var createObjectArr = function () {
  for (let i = 0; i < 8; i++) {
    objectsArr.push(createObject(numbers[i], addressesX[i], addressesY[i]));
  }
  return objectsArr;
};

createObjectArr();

var objTemplate = document
  .querySelector(`#pin`)
  .content.querySelector(`.map__pin`);

var mapPins = document.querySelector(`.map__pins`);

var renderPin = function (obj) {
  let pinElement = objTemplate.cloneNode(true);

  pinElement.style = `left: ${obj.location.x}px; top: ${obj.location.y}px;`;

  let pinImg = pinElement.querySelector(`img`);
  pinImg.src = obj.author.avatar;
  pinImg.alt = obj.offer.title;

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < objectsArr.length; i++) {
  fragment.appendChild(renderPin(objectsArr[i]));
}
// mapPins.appendChild(fragment);

// модальное окно объявления

// var cardTemplate = document.querySelector("#card").content;

// var renderCard = function (obj1) {
//   var cardElement = cardTemplate.cloneNode(true);
//   var cardTitle = cardElement.querySelector(".popup__title");
//   var cardAddress = cardElement.querySelector(".popup__text--address");
//   var cardPrice = cardElement.querySelector(".popup__text--price");
//   var cardType = cardElement.querySelector(".popup__type");
//   var cardTextCapacity = cardElement.querySelector(".popup__text--capacity");
//   var cardTextTime = cardElement.querySelector(".popup__text--time");
//   var cardFeatures = cardElement.querySelectorAll(".popup__feature");
//   var cardDescription = cardElement.querySelector(".popup__description");
//   var cardPhotos = cardElement.querySelector(".popup__photos");
//   var cardAvatar = cardElement.querySelector(".popup__avatar");

//   cardTitle.textContent = obj1.offer.title;
//   cardAddress.textContent = obj1.offer.address;
//   cardPrice.textContent = `${obj1.offer.price}₽/ночь`;

//   if (obj1.offer.type === "flat") {
//     cardType.textContent = "Квартира";
//   } else if (obj1.offer.type === "bungalow") {
//     cardType.textContent = "Бунгало";
//   } else if (obj1.offer.type === "house") {
//     cardType.textContent = "Дом";
//   } else if (obj1.offer.type === "palace") {
//     cardType.textContent = "Дворец";
//   }
//   var roomsCol;
//   if (obj1.offer.rooms === 1) {
//     roomsCol = `${obj1.offer.rooms} комната для `;
//   } else if (obj1.offer.rooms > 4) {
//     roomsCol = `${obj1.offer.rooms} комнат для `;
//   } else if (obj1.offer.rooms < 5 && obj1.offer.rooms > 1) {
//     roomsCol = `${obj1.offer.rooms} комнаты для `;
//   }
//   var guestsCol;
//   if (obj1.offer.guests === 1) {
//     guestsCol = `${obj1.offer.guests} гостя.`;
//   } else {
//     guestsCol = `${obj1.offer.guests} гостей.`;
//   }
//   cardTextCapacity.textContent = roomsCol + guestsCol;

//   cardTextTime.textContent = `Заезд после ${obj1.offer.checkin}, выезд до ${obj1.offer.checkout}`;

//   for (var cardFeature of cardFeatures) {
//     var cardClass = cardFeature.classList[1];
//     var featureCode = cardClass.split("--")[1];
//     var featureIndex = obj1.offer.features.indexOf(featureCode);
//     if (featureIndex === -1) {
//       cardFeature.remove();
//     }
//   }

//   cardDescription.textContent = obj1.offer.description;

//   var cardPhotosChild = cardPhotos.querySelector(".popup__photo");

//   if (obj1.offer.photos.length === 0) {
//     cardPhotosChild.remove();
//   } else if (obj1.offer.photos.length === 1) {
//     cardPhotosChild.src = obj1.offer.photos[0];
//   } else if (obj1.offer.photos.length > 1) {
//     for (i = 1; i < obj1.offer.photos.length; i++) {
//       cardPhotosChild.src = obj1.offer.photos[0];
//       var cardPhotoСlone = cardPhotosChild.cloneNode();
//       cardPhotoСlone.src = obj1.offer.photos[i];
//       cardPhotos.appendChild(cardPhotoСlone);
//     }
//   }

//   cardAvatar.src = obj1.author.avatar;

//   return cardElement;
// };

// var fragmentCard = document.createDocumentFragment();
// fragmentCard.appendChild(renderCard(objectsArr[0]));

// var mapFiltersContainer = mapPins.querySelector(".map__filters-container");

// mapPins.insertBefore(fragmentCard, mapFiltersContainer);

var map = document.querySelector(`.map`);
var form = document.querySelector(`.ad-form`);
var formFieldsetsElement = form.querySelectorAll(`fieldset`);
var mapFiltersElement = document.querySelector(`.map__filters`);

for (var formFieldset of formFieldsetsElement) {
  formFieldset.setAttribute(`disabled`, `disabled`);
}

var mapPinMain = document.querySelector(`.map__pin--main`);

// Заполнение поля адреса
var MAP_PIN_LEFT = 570;
var MAP_PIN_TOP = 375;
var MAP_PIN_WIDTH_HEIGHT = 65;
var MAP_PIN_AFTER_HEIGHT = 22;

var formAddress = form.querySelector(`#address`);

var mapPinCenterX = Math.round(MAP_PIN_LEFT + MAP_PIN_WIDTH_HEIGHT / 2);
var mapPinCenterY = Math.round(MAP_PIN_TOP + MAP_PIN_WIDTH_HEIGHT / 2);
formAddress.value = `${mapPinCenterX}, ${mapPinCenterY}`;

var createEnableAddress = function () {
  mapPinCenterY = Math.round(
      MAP_PIN_TOP + MAP_PIN_WIDTH_HEIGHT + MAP_PIN_AFTER_HEIGHT
  );
  formAddress.value = `${mapPinCenterX}, ${mapPinCenterY}`;
};

// Заполнение поля адреса

var enablePage = function () {
  map.classList.remove(`map--faded`);
  form.classList.remove(`ad-form--disabled`);
  for (formFieldset of formFieldsetsElement) {
    formFieldset.removeAttribute(`disabled`);
  }
  mapFiltersElement.classList.remove(`ad-form--disabled`);
  createEnableAddress();
};

mapPinMain.addEventListener(`mousedown`, function (evt) {
  // console.log(e.buttons);
  if (evt.buttons === 1) {
    enablePage();
    mapPins.appendChild(fragment);
  }
});

var keyEnter = `Enter`;

mapPinMain.addEventListener(`keydown`, function (evt) {
  if (evt.key === keyEnter) {
    enablePage();
    mapPins.appendChild(fragment);
  }
});

// Валидация

var formTitle = form.querySelector(`#title`);
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
