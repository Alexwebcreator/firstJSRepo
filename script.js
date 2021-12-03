'use strict';

let title;
let screens;
let screenPrice;
let adaptive;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;
let rollback = 20;

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getRollbackMessage = function(price) {
  if (price >= 30000) {
    return "Даем скидку 10%";
  } else if (price >= 15000 && price < 30000) {
    return "Даем скидку 5%";
  } else if (price >= 0 && price < 15000) {
    return "Скидка не предусмотренa";
  } else {
    return "Что-то пошло не так";
  }
};

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function() {
  title = prompt("Как называется ваш проект", "Калькулятор верстки");
  screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные");

  do {
    screenPrice = +prompt("Сколько будет стоить данная работа?");
  } while(!isNumber(screenPrice));
  

  adaptive = confirm("Нужен ли адаптив на сайте?");
};

const getAllServicePrices = function() {
  let sum = 0;

  for (let i = 0; i < 2; i++) {

    if (i === 0) {
      service1 = prompt("Какой дополнительный тип услуг нужен?");
    } else if (i === 1) {
      service2 = prompt("Какой дополнительный тип услуг нужен?");
    }
    sum += (() => {
            let n;
            do {
                n = prompt('Сколько это будет стоить?');
            } while (!isNumber(n));
            return +n;
        })();
    }

  return sum;
  
};   


function getFullPrice() {
  return (screenPrice + allServicePrices);
}

const getTitle = function () {
   return title.trim()[0].toUpperCase() + title.trim().substring(1).toLowerCase();
};

let rollBackPrice = fullPrice*(rollback/100);
const getServicePercentPrices = function() {
  return (fullPrice - (fullPrice*(rollback/100)));
};


asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();

getFullPrice();
showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);
showTypeOf(rollBackPrice);

console.log("allServicePrices", allServicePrices);
console.log([screens]);
console.log(getTitle(title));
console.log(getRollbackMessage(fullPrice));
console.log('Cтоимость за вычетом процента отката посреднику ' + servicePercentPrice);