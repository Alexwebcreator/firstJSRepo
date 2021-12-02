'use strict';
let title = prompt("Как называется ваш проект");
let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let rollback = 20;
let adaptive = prompt("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуг нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуг нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");

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


const getAllServicePrices = function(num1, num2) {
  return (num1 + num2);
};   

let allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);


function getFullPrice(pr1, pr2) {
  return (pr1 + pr2);
}

let fullPrice = getFullPrice(screenPrice, allServicePrices);

let getTitle = function (title) {
   title = title.trim().toLowerCase();
   return title[0].toUpperCase() + title.substring(1);
};

let rollBackPrice = fullPrice*(rollback/100);
const getServicePercentPrices = function(a, b) {
  return (a - b);
};

let servicePercentPrice = getServicePercentPrices(fullPrice,rollBackPrice);

getFullPrice();
getAllServicePrices();
showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log([screens]);
console.log(getTitle(title));
console.log(getRollbackMessage(fullPrice));
console.log('Cтоимость за вычетом процента отката посреднику ' + servicePercentPrice);
