'use strict';
let title = "Knife shop";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 10000;
let rollback = 20;
let adaptive = true;
let service1 = "Написание текстов для сайта";
let servicePrice1 = 4000;
let service2 = "Дизайн сайта";
let servicePrice2 = 5000;
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = Math.ceil(fullPrice - (fullPrice*(rollback/100)));


console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);
console.log(screens.toLowerCase().split(" "));
console.log(`Процент отката посреднику за работу ${fullPrice*(rollback/100)}`);
console.log(`Итоговая стоимость за вычетом отката посреднику за работу ${servicePercentPrice.toPrecision (5)}`);
if (fullPrice < 0) {
  console.log("Что-то пошло не так");
}  else if (fullPrice < 15000) {
  console.log("Скидка не предусмотренa");
} else if (fullPrice < 30000) {
  console.log("Даем скидку 5%");
} else if (fullPrice >= 30000) {
  console.log("Даем скидку 10%");
}