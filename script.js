'use strict';

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const appData = {
  title: '',
  screens: '',
  screenPrice: 0,
  adaptive: true,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  service1: '',
  service2: '',
  rollback: 20,
  asking: function() {
    appData.title = prompt("Как называется ваш проект", "Калькулятор   верстки");
    appData.screens = prompt("Какие типы экранов нужно разработать?",   "Простые, Сложные");

    do {
      appData.screenPrice = +prompt("Сколько будет стоить данная работа?");
    } while(!isNumber(appData.screenPrice));
  

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
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

  getAllServicePrices: function() {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
      let price = 0;

      if (i === 0) {
        appData.service1 = prompt("Какой дополнительный тип услуг   нужен?");
      } else if (i === 1) {
        appData.service2 = prompt("Какой дополнительный тип услуг   нужен?");
      }
      do {
        price = prompt('Сколько это будет стоить?');
      } while (!isNumber(price));
      sum += +price;
    }

    return sum;
  
  }, 

  getFullPrice: function() {
    return +appData.screenPrice + appData.allServicePrices;
  },

  getTitle: function () {
    return appData.title.trim()[0].toUpperCase() + appData.title. trim().substring(1).toLowerCase();
  },

  getServicePercentPrice: function() {
    return appData.fullPrice - (appData.fullPrice*(appData.  rollback/100));
  },


  start() {
    appData.asking();
    appData.allServicePrices = appData.    getAllServicePrices();
    appData.fullPrice = appData.getFullPrice    ();
    appData.servicePercentPrice = appData.    getServicePercentPrice();
    appData.title = appData.getTitle();
    appData.logger();
  },

  logger() {
    for (const key in appData) {
      if (typeof appData[key] !== 'function') {
        console.log(`${key}: ${appData[key]}`);
      }
    }
  }

};

appData.start();
