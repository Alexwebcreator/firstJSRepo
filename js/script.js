'use strict';

const title = document.getElementsByTagName("h1")[0];
const calculateBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];
const screenBtn = document.querySelector(".screen-btn");
const otherItems1 = document.querySelectorAll(".other-items.percent");
const otherItems2 = document.querySelectorAll(".other-items.number");
const inputRange = document.querySelector(".rollback > div > input[type=range]");
const inputRangeValue = document.querySelector("div.rollback .range-value");
const spanRange = document.querySelector(".rollback > div > span.range-value");
const totalInput = document.getElementsByClassName("total-input");
const totalScreensPrice = totalInput[0];
const totalScreensNumber = totalInput[1];
const totalServicesPrice = totalInput[2];
const totalPrice = totalInput[3];
const totalPriceAfter = totalInput[4];
const allSelect = document.querySelector("select");
const allTextInput = document.querySelectorAll("input[type=text]");
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
    this.addTitle();
    inputRange.addEventListener('input', this.getRollback.bind(this));
    calculateBtn.addEventListener('click', this.checkValues.bind(this));
    resetBtn.addEventListener("click", this.reset.bind(this));
    screenBtn.addEventListener('click', this.addScreenBlock.bind(this));
    inputRange.addEventListener('input', this.changeRollback.bind(this));
  },

  addTitle: function() {
    document.title = title.textContent;
  },

  start() {
    this.addScreens();
    this.addServices();
    this.addPrices();
    this.logger();
    this.showResult();
    this.addDisable();
    calculateBtn.style.display = "none";
    resetBtn.style.display = "block";
  },

  reset: function () {
    this.addEnable();

    totalScreensPrice.value = totalScreensPrice.defaultValue;
    totalScreensNumber.value = totalScreensNumber.defaultValue;
    totalServicesPrice.value = totalServicesPrice.defaultValue;
    totalPrice.value = totalPrice.defaultValue;
    totalPriceAfter.value = totalPriceAfter.defaultValue;

    this.title = '';
    this.screens = [];
    this.screenPrice = 0;
    this.adaptive = true;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};
    this.rollback = 0;
    this.rollbackSum = 0;
    this.isError = false;

    allScreens = document.querySelectorAll(".screen");

    allScreens.forEach((screen) => {
      let select = screen.querySelector("select");
      select.selectedIndex = "0";
    });

    for (var i = 1; i < allScreens.length; i++) {
      allScreens[i].remove();
    }

    let serviceDefaultPrice = document.querySelectorAll(
      ".main-controls__input"
    );
    serviceDefaultPrice.forEach((screen) => {
      let input = screen.querySelector("input");
      input.value = input.defaultValue;
    });

    let serviceUncheck = document.querySelectorAll(".custom-checkbox");
    serviceUncheck.forEach((box) => (box.checked = false));

    inputRangeValue.textContent = inputRange.defaultValue + "%";
    inputRange.value = "0";

  },
  checkValues: function() {
    allScreens = document.querySelectorAll(".screen");
    allScreens.forEach((screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      this.isError = false;
      if (select.value === "" || input.value === "") {
         this.isError = true;
       }
    });
    if (!this.isError) {
        this.start();
    } else {
      alert('Заполни поля');
    }
  },

  showResult: function() {
    totalScreensPrice.value = this.screenPrice;
    totalScreensNumber.value = this.screensNumber;
    totalServicesPrice.value = this. servicePricesPercent + this. servicePricesNumber;
    totalPrice.value = this.fullPrice;
    totalPriceAfter.value = this.servicePercentPrice;
  },

  addScreens: function() {
    allScreens = document.querySelectorAll(".screen");
    allScreens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index, 
        name: selectName, 
        price: +select.value * +input.value,
        count: +input.value
      });
    });
    console.log(this.screens);
  },

  addServices: function() {
    otherItems1.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      
      if(check.checked) {
        this.servicesPercent[label.textContent] = input.value;
      }
      
    });

    otherItems2.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      
      if(check.checked) {
        this.servicesNumber[label.textContent] = input.value;
      }
      
    });
    
  },

  addScreenBlock: function() {
    const cloneScreen = allScreens[0].cloneNode(true);
    allScreens[allScreens.length - 1].after(cloneScreen);
  },

  addPrices: function() {
    this.screenPrice = this.screens.reduce((sum, screen) => sum + screen.price, 0);

    this.screensNumber = this.screens.reduce((sum, screen) => sum + screen.count, 0);

    for(let key in this.servicesNumber) {
      this.servicePricesNumber += +this.servicesNumber[key];
    }

    for(let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice*(+this.servicesPercent[key]/100);
    }

    this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

    this.rollbackSum = this.fullPrice * (this.rollback / 100);

    this.servicePercentPrice = this.fullPrice - this.rollbackSum;

  },

  getRollback: function () {
    this.rollback = +inputRange.value;
    spanRange.textContent = inputRange.value + "%";
  },

  changeRollback: function () {
    this.rollbackSum = this.fullPrice * (this.rollback / 100);
    this.servicePercentPrice = this.fullPrice - this.rollbackSum;
    totalPriceAfter.value = this.servicePercentPrice;
  },

  addEnable: function () {
    [].forEach.call(allTextInput, (n) => {
      n.removeAttribute("disabled");
    });
    [].forEach.call(allSelect, (n) => {
      n.removeAttribute("disabled");
    });

    calculateBtn.style.display = "block";
    resetBtn.style.display = "none";
  },

  addDisable: function () {
    [].forEach.call(allTextInput, (n) => {
      n.disabled = true;
    });
    [].forEach.call(allSelect, (n) => {
      n.disabled = true;
    });

    allScreens.disabled = true;
    calculateBtn.style.display = "none";
    resetBtn.style.display = "block";
  },

  logger() {
    console.log(this);
  }

};

appData.init();
