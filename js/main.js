"use strict";

var createRandNumber = function (min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

var numbers = [1, 2, 3, 4, 5, 6, 7, 8];

var titles = [
  "Дом",
  "Комната",
  "Дача",
  "Чердак",
  "Будка",
  "Дача",
  "Будка",
  "Комната",
];

var addressesX = [600, 400, 300, 550, 500, 350, 650, 470];

var addressesY = [200, 220, 600, 450, 350, 350, 340, 200];

var price = [200, 1000, 100, 500, 500, 120, 400];

var typeArr = ["palace", "flat", "house", "bungalow"];

var rooms = [1, 3, 2, 2, 3, 2, 2, 1];

var guests = [2, 4, 2, 4, 5, 3, 4, 2];

var checkArr = ["12:00", "13:00", "14:00"];

var description = "Самое лучшее предложение";

var createArrFeatures = function () {
  var features = [
    "wifi",
    "dishwasher",
    "parking",
    "washer",
    "elevator",
    "conditioner",
  ];
  var arrfeatures = [];
  var arrFeaturesLen = createRandNumber(0, features.length);
  for (var i = 0; i < arrFeaturesLen; i++) {
    var m = Math.floor(Math.random() * features.length);
    arrfeatures.push(features.splice(m, 1)[0]);
  }
  return arrfeatures;
};

var createArrPhotos = function () {
  var photos = [
    "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
    "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
    "http://o0.github.io/assets/images/tokyo/hotel3.jpg",
  ];
  var arrphotos = [];
  var photosLen = createRandNumber(0, photos.length);
  for (var i = 0; i < photosLen; i++) {
    var p = Math.floor(Math.random() * photos.length);
    arrphotos.push(photos.splice(p, 1)[0]);
  }
  return arrphotos;
};

var createObject = function (avatar, locationX, locationY) {
  var newFeatures = createArrFeatures();
  var newPhotos = createArrPhotos();

  var objectItem = {
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
      description: description,
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
  for (var i = 0; i < 8; i++) {
    objectsArr.push(createObject(numbers[i], addressesX[i], addressesY[i]));
  }
  return objectsArr;
};

createObjectArr();

var map = document.querySelector(".map");
map.classList.remove("map--faded");

var objTemplate = document
  .querySelector("#pin")
  .content.querySelector(".map__pin");

var mapPins = document.querySelector(".map__pins");

var renderPin = function (obj) {
  var pinElement = objTemplate.cloneNode(true);

  pinElement.style = `left: ${obj.location.x}px; top: ${obj.location.y}px;`;

  var pinImg = pinElement.querySelector("img");
  pinImg.src = obj.author.avatar;
  pinImg.alt = obj.offer.title;

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < objectsArr.length; i++) {
  fragment.appendChild(renderPin(objectsArr[i]));
}
mapPins.appendChild(fragment);

// модальное окно объявления

var cardTemplate = document.querySelector("#card").content;

var renderCard = function (obj1) {
  var cardElement = cardTemplate.cloneNode(true);
  var cardTitle = cardElement.querySelector(".popup__title");
  var cardAddress = cardElement.querySelector(".popup__text--address");
  var cardPrice = cardElement.querySelector(".popup__text--price");
  var cardType = cardElement.querySelector(".popup__type");
  var cardTextCapacity = cardElement.querySelector(".popup__text--capacity");
  var cardTextTime = cardElement.querySelector(".popup__text--time");
  var cardFeatures = cardElement.querySelectorAll(".popup__feature");
  var cardDescription = cardElement.querySelector(".popup__description");
  var cardPhotos = cardElement.querySelector(".popup__photos");
  var cardAvatar = cardElement.querySelector(".popup__avatar");

  cardTitle.textContent = obj1.offer.title;
  cardAddress.textContent = obj1.offer.address;
  cardPrice.textContent = `${obj1.offer.price}₽/ночь`;

  if (obj1.offer.type === "flat") {
    cardType.textContent = "Квартира";
  }
  if (obj1.offer.type === "bungalow") {
    cardType.textContent = "Бунгало";
  }
  if (obj1.offer.type === "house") {
    cardType.textContent = "Дом";
  }
  if (obj1.offer.type === "palace") {
    cardType.textContent = "Дворец";
  }

  if (obj1.offer.rooms === 1) {
    var roomsCol = `${obj1.offer.rooms} комната для `;
  } else if (obj1.offer.rooms > 4) {
    roomsCol = `${obj1.offer.rooms} комнат для `;
  } else if (obj1.offer.rooms < 5 && obj1.offer.rooms > 1) {
    roomsCol = `${obj1.offer.rooms} комнаты для `;
  }
  if (obj1.offer.guests === 1) {
    var guestsCol = `${obj1.offer.guests} гостя.`;
  } else {
    guestsCol = `${obj1.offer.guests} гостей.`;
  }
  cardTextCapacity.textContent = roomsCol + guestsCol;

  cardTextTime.textContent = `Заезд после ${obj1.offer.checkin}, выезд до ${obj1.offer.checkout}`;

  for (var cardFeature of cardFeatures) {
    var cardClass = cardFeature.classList[1];
    var featureCode = cardClass.split("--")[1];
    var featureIndex = obj1.offer.features.indexOf(featureCode);
    if (featureIndex === -1) {
      cardFeature.remove();
    }
  }

  cardDescription.textContent = obj1.offer.description;

  var cardPhotosChild = cardPhotos.querySelector(".popup__photo");

  if (obj1.offer.photos.length === 0) {
    cardPhotosChild.remove();
  } else if (obj1.offer.photos.length === 1) {
    cardPhotosChild.src = obj1.offer.photos[0];
  } else if (obj1.offer.photos.length > 1) {
    for (i = 1; i < obj1.offer.photos.length; i++) {
      cardPhotosChild.src = obj1.offer.photos[0];
      var cardPhotoСlone = cardPhotosChild.cloneNode();
      cardPhotoСlone.src = obj1.offer.photos[i];
      cardPhotos.appendChild(cardPhotoСlone);
    }
  }

  cardAvatar.src = obj1.author.avatar;

  return cardElement;
};

var fragmentCard = document.createDocumentFragment();
fragmentCard.appendChild(renderCard(objectsArr[0]));

var mapFiltersContainer = mapPins.querySelector(".map__filters-container");

mapPins.insertBefore(fragmentCard, mapFiltersContainer);
