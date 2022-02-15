---
title: JS часть 6
---

### JavaScript
#### Map / Set
#### Работа с датами
#### Математика

![js](assets/js/js-logo.png)

[Дмитрий Вайнер](https://github.com/dmitryweiner)
---

### Map, Set
* Set &mdash; это объект для хранения набора уникальных значений.
* Map &mdash; это объект для хранения пар ключ-значение.
* [Подробнее](https://learn.javascript.ru/map-set).
---

### Set
```js
// конструктор
const numbers = new Set();

// добавление значений
numbers.add(1);
numbers.add(2);
numbers.add(2);
numbers.add(3);
numbers.add(3);

// взять значения в виде массива
Array.from(numbers.values()); // [1, 2, 3]

// проверка, есть ли такое значение
numbers.has(1); // true

// размер коллекции
numbers.size; // 3

// очистка
numbers.clear();
```
---

### Set
* Простой способ поместить в массив только уникальные значения из другого массива:
```js
const arr = [1, 4, 4, 6, 1, 5, 6];
const unique = [...new Set(arr)]; // [1, 4, 6, 5]
```
---

### Map
* new Map() – создаёт коллекцию.
* map.set(key, value) – записывает по ключу key значение value.
* map.get(key) – возвращает значение по ключу или undefined, если ключ key отсутствует.
* map.has(key) – возвращает true, если ключ key присутствует в коллекции, иначе false.
* map.delete(key) – удаляет элемент по ключу key.
* map.clear() – очищает коллекцию.
* map.size – возвращает текущее количество.
---

### Работа с датами
* Конструкторы:
```js
new Date();
new Date(milliseconds)
new Date(datestring)
new Date(year, month, date, hours, minutes, seconds, ms)
```
* Получение компонентов даты:
    * getFullYear() Получить год (из 4 цифр)
    * getMonth() Получить месяц, от 0 до 11.
    * getDate() Получить число месяца, от 1 до 31.
    * getHours(), getMinutes(), getSeconds(), getMilliseconds()
---

### Работа с датами
* Установка компонентов даты:
    * setFullYear(year [, month, date])
    * setMonth(month [, date])
    * setDate(date)
    * setHours(hour [, min, sec, ms])
    * setMinutes(min [, sec, ms])
    * setSeconds(sec [, ms])
    * setMilliseconds(ms)
    * setTime(milliseconds)
* [Подробнее](https://learn.javascript.ru/datetime).
---

### Локальное представление даты
* Можно представить дату в региональном формате (зависит от выставленного региона в системе и браузере):

```js
const date = new Date();
date.toLocaleString(); // "18.10.2021, 12:00:34"
date.toLocaleTimeString(); // "12:00:34"
date.toLocaleDateString(); // "18.10.2021"
```
---

### Moment.js
* Для удобной работы с датами можно подключить библиотеку [moment.js](https://momentjs.com/).

```js
moment().format('MMMM Do YYYY, h:mm:ss a'); // October 17th 2021, 9:22:04 pm
moment().format('dddd');                    // Sunday
moment().format("MMM Do YY");               // Oct 17th 21

moment().startOf('day').fromNow();        // 21 hours ago
moment().endOf('day').fromNow();          // in 3 hours
moment().startOf('hour').fromNow();       // 22 minutes ago
```
---

### Математика
* Вся математика лежит в объекте Math:
    * Константы:
        * Math.E Число Эйлера или Непера (2,718).
        * Math.PI Число π (3,14159265).
    * Функции:
        * Math.ceil(x) значение числа, округлённое к большему целому.
        * Math.floor(x) значение числа, округлённое к меньшему целому.
        * Math.round(x) "обычное" округление.
---

### Математика
* Math.random() псевдослучайное число в диапазоне от 0 до 1.
* Math.max([x[, y[, …]]]) наибольшее число из своих аргументов.
* Math.min([x[, y[, …]]]) наименьшее число из своих аргументов.
* Math.sin(x) синус числа.
* Math.sqrt(x) положительный квадратный корень числа.
* [Подробнее](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math).
