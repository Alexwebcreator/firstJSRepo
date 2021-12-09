'use strict';

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},
  rollback: 20,

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  asking: function() {
    do {
      appData.title = prompt("Как называется ваш проект");
    } while (!isNaN(appData.title));

    for (let i = 0; i < 2; i++) {
      let name;
      let price = 0;

      do {
        name = prompt("Какие типы экранов нужно разработать?");
      } while (!isNaN(name));

      do {
        price = +prompt("Сколько будет стоить данная работа?");
      } while(!appData.isNumber(price));

      appData.screens.push({id: i, name: name, price: price});

    }

    for (let i = 0; i < 2; i++) {
      let name;
      let price = 0;

      do {
        name = prompt("Какой дополнительный тип услуг нужен?");
      } while (!isNaN(name));

      do {
        price = prompt('Сколько это будет стоить?');
      } while (!appData.isNumber(price));

      if (name in appData.services) {
        appData.services[name + i] = price;
      } else {
        appData.services[name] = price;
      }

      appData.services[name] = +price;
    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");

  },

  addPrices: function() {
    appData.screenPrice = appData.screens.reduce((sum, screen) => sum + screen.price, 0);

    for(let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },

  getRollbackMessage: function(price) {
    if (price >= 30000) {
      return "Даем скидку 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даем скидку 5%";
    } else if (price >= 0 && price < 15000) {
      return "Скидка не предусмотренa";
    } else {
      return "Что-то пошло не так";
    }
  }, 

  getFullPrice: function() {
    appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
  },

  getTitle: function () {
    appData.title = appData.title.trim()[0].toUpperCase() + appData.title. trim().substring(1).toLowerCase();
  },

  getServicePercentPrice: function() {
    appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice*(appData.rollback/100));
  },


  start() {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice();
    appData.getServicePercentPrice();
    appData.getTitle();
    appData.logger();
  },

  logger() {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
  }

};

appData.start();
