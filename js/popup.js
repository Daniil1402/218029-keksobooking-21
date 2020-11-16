"use strict";

(function () {
  var cardTemplate = document.querySelector(`#card`).content;

  var renderCard = function (pin) {
    var cardElement = cardTemplate.cloneNode(true);
    var cardTitle = cardElement.querySelector(`.popup__title`);
    var cardAddress = cardElement.querySelector(`.popup__text--address`);
    var cardPrice = cardElement.querySelector(`.popup__text--price`);
    var cardType = cardElement.querySelector(`.popup__type`);
    var cardTextCapacity = cardElement.querySelector(`.popup__text--capacity`);
    var cardTextTime = cardElement.querySelector(`.popup__text--time`);
    var cardFeatures = cardElement.querySelectorAll(`.popup__feature`);
    var cardDescription = cardElement.querySelector(`.popup__description`);
    var cardPhoto = cardElement.querySelector(`.popup__photos`);
    var cardAvatar = cardElement.querySelector(`.popup__avatar`);

    var popupFeature = cardElement.querySelector(`.popup__features`);

    cardTitle.textContent = pin.offer.title;
    cardAddress.textContent = pin.offer.address;
    cardPrice.textContent = `${pin.offer.price}₽/ночь`;

    if (pin.offer.type === `flat`) {
      cardType.textContent = `Квартира`;
    } else if (pin.offer.type === `bungalow`) {
      cardType.textContent = `Бунгало`;
    } else if (pin.offer.type === `house`) {
      cardType.textContent = `Дом`;
    } else if (pin.offer.type === `palace`) {
      cardType.textContent = `Дворец`;
    }
    var roomsCount;
    if (pin.offer.rooms === 1) {
      roomsCount = `${pin.offer.rooms} комната для `;
    } else if (pin.offer.rooms > 4 || pin.offer.rooms === 0) {
      roomsCount = `${pin.offer.rooms} комнат для `;
    } else if (pin.offer.rooms < 5 && pin.offer.rooms > 1) {
      roomsCount = `${pin.offer.rooms} комнаты для `;
    }
    var guestsCount;
    if (pin.offer.guests === 1) {
      guestsCount = `${pin.offer.guests} гостя.`;
    } else {
      guestsCount = `${pin.offer.guests} гостей.`;
    }
    cardTextCapacity.textContent = roomsCount + guestsCount;

    cardTextTime.textContent = `Заезд после ${pin.offer.checkin}, выезд до ${pin.offer.checkout}`;

    for (var cardFeature of cardFeatures) {
      var cardClass = cardFeature.classList[1];
      var featureCode = cardClass.split(`--`)[1];
      var featureIndex = pin.offer.features.indexOf(featureCode);
      if (featureIndex === -1) {
        cardFeature.remove();
      }
    }
    if (pin.offer.features.length === 0) {
      popupFeature.remove();
    }
    if (pin.offer.photos.length === 0) {
      cardPhoto.remove();
    }

    cardDescription.textContent = pin.offer.description;

    var cardPhotosChild = cardPhoto.querySelector(`.popup__photo`);

    if (pin.offer.photos.length === 0) {
      cardPhotosChild.remove();
    } else if (pin.offer.photos.length === 1) {
      cardPhotosChild.src = pin.offer.photos[0];
    } else if (pin.offer.photos.length > 1) {
      for (var i = 1; i < pin.offer.photos.length; i++) {
        cardPhotosChild.src = pin.offer.photos[0];
        var cardPhotoСlone = cardPhotosChild.cloneNode();
        cardPhotoСlone.src = pin.offer.photos[i];
        cardPhoto.appendChild(cardPhotoСlone);
      }
    }

    cardAvatar.src = pin.author.avatar;

    return cardElement;
  };

  var fragmentCard = document.createDocumentFragment();

  window.popup = {
    fragment: fragmentCard,
    renderPopup: renderCard,
  };
})();
