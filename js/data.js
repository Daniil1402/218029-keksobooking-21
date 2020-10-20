"use strict";

(function () {
  var createRandNumber = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
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

  var price = [200, 1000, 100, 500, 500, 120, 400, 300];

  var typeArr = [`palace`, `flat`, `house`, `bungalow`];

  var rooms = [1, 3, 2, 2, 3, 2, 2, 1];

  var guests = [2, 4, 2, 4, 5, 3, 4, 2];

  var checkArr = [`12:00`, `13:00`, `14:00`];

  var description = `Самое лучшее предложение`;

  var createArrFeatures = function () {
    var features = [
      `wifi`,
      `dishwasher`,
      `parking`,
      `washer`,
      `elevator`,
      `conditioner`,
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
      `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
      `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
      `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
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

  window.data = {
    createObjectArr() {
      for (var i = 0; i < 8; i++) {
        objectsArr.push(createObject(numbers[i], addressesX[i], addressesY[i]));
      }
      return objectsArr;
    },
    dataArr: objectsArr,
  };
})();
