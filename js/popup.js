"use strict";

(function () {
  var cardTemplate = document.querySelector(`#card`).content;

  var renderCard = function (obj1) {
    var cardElement = cardTemplate.cloneNode(true);
    var cardTitle = cardElement.querySelector(`.popup__title`);
    var cardAddress = cardElement.querySelector(`.popup__text--address`);
    var cardPrice = cardElement.querySelector(`.popup__text--price`);
    var cardType = cardElement.querySelector(`.popup__type`);
    var cardTextCapacity = cardElement.querySelector(`.popup__text--capacity`);
    var cardTextTime = cardElement.querySelector(`.popup__text--time`);
    var cardFeatures = cardElement.querySelectorAll(`.popup__feature`);
    var cardDescription = cardElement.querySelector(`.popup__description`);
    var cardPhotos = cardElement.querySelector(`.popup__photos`);
    var cardAvatar = cardElement.querySelector(`.popup__avatar`);

    cardTitle.textContent = obj1.offer.title;
    cardAddress.textContent = obj1.offer.address;
    cardPrice.textContent = `${obj1.offer.price}₽/ночь`;

    if (obj1.offer.type === `flat`) {
      cardType.textContent = `Квартира`;
    } else if (obj1.offer.type === `bungalow`) {
      cardType.textContent = `Бунгало`;
    } else if (obj1.offer.type === `house`) {
      cardType.textContent = `Дом`;
    } else if (obj1.offer.type === `palace`) {
      cardType.textContent = `Дворец`;
    }
    var roomsCol;
    if (obj1.offer.rooms === 1) {
      roomsCol = `${obj1.offer.rooms} комната для `;
    } else if (obj1.offer.rooms > 4) {
      roomsCol = `${obj1.offer.rooms} комнат для `;
    } else if (obj1.offer.rooms < 5 && obj1.offer.rooms > 1) {
      roomsCol = `${obj1.offer.rooms} комнаты для `;
    }
    var guestsCol;
    if (obj1.offer.guests === 1) {
      guestsCol = `${obj1.offer.guests} гостя.`;
    } else {
      guestsCol = `${obj1.offer.guests} гостей.`;
    }
    cardTextCapacity.textContent = roomsCol + guestsCol;

    cardTextTime.textContent = `Заезд после ${obj1.offer.checkin}, выезд до ${obj1.offer.checkout}`;

    for (var cardFeature of cardFeatures) {
      var cardClass = cardFeature.classList[1];
      var featureCode = cardClass.split(`--`)[1];
      var featureIndex = obj1.offer.features.indexOf(featureCode);
      if (featureIndex === -1) {
        cardFeature.remove();
      }
    }

    cardDescription.textContent = obj1.offer.description;

    var cardPhotosChild = cardPhotos.querySelector(`.popup__photo`);

    if (obj1.offer.photos.length === 0) {
      cardPhotosChild.remove();
    } else if (obj1.offer.photos.length === 1) {
      cardPhotosChild.src = obj1.offer.photos[0];
    } else if (obj1.offer.photos.length > 1) {
      for (var i = 1; i < obj1.offer.photos.length; i++) {
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

  window.popup = {
    fragment: fragmentCard,
    renderPopup: renderCard,
  };
})();
