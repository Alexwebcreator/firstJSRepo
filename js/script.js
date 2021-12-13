'use strict';

const title = document.getElementsByTagName("h1")[0];
const calculateBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];
const screenBtn = document.querySelector(".screen-btn");
const otherItems1 = document.querySelectorAll(".other-items.percent");
const otherItems2 = document.querySelectorAll(".other-items.number");
const inputRange = document.querySelector(".rollback > div > input[type=range]");
const spanRange = document.querySelector(".rollback > div > span.range-value");
const totalInput = document.getElementsByClassName("total-input");
const totalScreensPrice = totalInput[0];
const totalScreensNumber = totalInput[1];
const totalServicesPrice = totalInput[2];
const totalPrice = totalInput[3];
const totalPriceAfter = totalInput[4];
let allScreens = document.querySelectorAll(".screen");


const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  rollback: 0,
  rollbackSum: 0,
  isError: false,
  init: function() {
    appData.addTitle();
    inputRange.addEventListener('input', appData.getRollback);
    calculateBtn.addEventListener('click', appData.checkValues);
    screenBtn.addEventListener('click', appData.addScreenBlock);
    inputRange.addEventListener('input', appData.changeRollback);
  },

  addTitle: function() {
    document.title = title.textContent;
  },

  checkValues: function() {
    allScreens = document.querySelectorAll(".screen");
    allScreens.forEach(function (screen) {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      appData.isError = false;
      if (select.value === "" || input.value === "") {
         appData.isError = true;
       }
    });
    if (!appData.isError) {
        appData.start();
    } else {
      alert('Заполни поля');
    }
  },

  showResult: function() {
    totalScreensPrice.value = appData.screenPrice;
    totalScreensNumber.value = appData.screensNumber;
    totalServicesPrice.value = appData. servicePricesPercent + appData. servicePricesNumber;
    totalPrice.value = appData.fullPrice;
    totalPriceAfter.value = appData.servicePercentPrice;
  },

  addScreens: function() {
    allScreens = document.querySelectorAll(".screen");
    allScreens.forEach(function (screen, index) {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index, 
        name: selectName, 
        price: +select.value * +input.value,
        count: +input.value
      });
    });
    console.log(appData.screens);
  },

  addServices: function() {
    otherItems1.forEach(function(item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      
      if(check.checked) {
        appData.servicesPercent[label.textContent] = input.value;
      }
      
    });

    otherItems2.forEach(function(item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      
      if(check.checked) {
        appData.servicesNumber[label.textContent] = input.value;
      }
      
    });
    
  },

  addScreenBlock: function() {
    const cloneScreen = allScreens[0].cloneNode(true);
    allScreens[allScreens.length - 1].after(cloneScreen);
  },

  addPrices: function() {
    appData.screenPrice = appData.screens.reduce((sum, screen) => sum + screen.price, 0);

    appData.screensNumber = appData.screens.reduce((sum, screen) => sum + screen.count, 0);

    for(let key in appData.servicesNumber) {
      appData.servicePricesNumber += +appData.servicesNumber[key];
    }

    for(let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice*(+appData.servicesPercent[key]/100);
    }

    appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;

    appData.rollbackSum = appData.fullPrice * (appData.rollback / 100);

    appData.servicePercentPrice = appData.fullPrice - appData.rollbackSum;

  },

  getRollback: function () {
    appData.rollback = +inputRange.value;
    spanRange.textContent = inputRange.value + "%";
  },

  changeRollback: function () {
    appData.rollbackSum = appData.fullPrice * (appData.rollback / 100);
    appData.servicePercentPrice = appData.fullPrice - appData.rollbackSum;
    totalPriceAfter.value = appData.servicePercentPrice;
  },

  start() {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.logger();
    appData.showResult();
  },

  logger() {
    console.log(appData);
  }

};

appData.init();
