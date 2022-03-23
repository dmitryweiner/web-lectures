---
title: JS часть 3
---

### JavaScript
#### Массивы


![js](assets/js/js-logo.png)

[Дмитрий Вайнер](https://github.com/dmitryweiner)
---

> Массив &mdash; структура данных, хранящая набор значений (элементов массива), идентифицируемых по индексу.
---

### Создание
* Самый простой метод:
```js
const arr = [1, 2, 3, 4, 5];
```
* Так тоже можно:
```js
const arr = new Array();
```
* Массив на N элементов:
```js
const N = 3;
const arr = new Array(N);
console.log(arr); // [undefined, undefined, undefined]
```
---

### Создание с заполнением
* Можно создать массив из N не пустых элементов:
```js
const N = 3;
const arr = new Array(N).fill(10);
console.log(arr); // [10, 10, 10]
```
---

### Создание из чего-то
* `Array.from()` создаёт массив из из массивоподобного или итерируемого объекта:

```js
console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]
```
---

### Добавление/удаление элементов (массив изменяется):
* push(...items) – добавляет элементы в конец,
* pop() – извлекает элемент с конца,
* shift() – извлекает элемент с начала,
* unshift(...items) – добавляет элементы в начало.
* splice(pos, deleteCount, ...items) – начиная с индекса pos, удаляет deleteCount элементов и вставляет items.
---

### Добавление/удаление элементов:
* slice(start, end) – создаёт новый массив, копируя в него элементы с позиции start до end (не включая end).
* concat(...items) – возвращает новый массив: копирует все члены текущего массива и добавляет к нему items. Если какой-то из items является массивом, тогда берутся его элементы.
---

### splice и slice
* Из массива можно вырезать кусок произвольной длины из произвольного места с помощью _splice_.
  **Внимание!** Этот метод меняет сам массив.
```js
const arr = [1, 2, 3, 4, 5];
arr.splice(1, 2);
console.log(arr); // [1, 4, 5]
```
* Можно взять часть массива с помощью _slice_. Этот метод массив не изменяет.
```js
const arr = [1, 2, 3, 4, 5];
console.log(arr.slice(1, 2)); // [2, 3]
console.log(arr); // [1, 2, 3, 4, 5]
```
* [Подробнее](https://learn.javascript.ru/array-methods).
---

### Поиск среди элементов:
* indexOf/lastIndexOf(item, pos) – ищет item, начиная с позиции pos, и возвращает его индекс или -1, если ничего не найдено.
* includes(value) – возвращает true, если в массиве имеется элемент value, в противном случае false.
---

### Поиск среди элементов:
* filter(func) - для каждого элемента вызывает функцию и отдаёт все те, для которых функция возвращает true.
* find(func) – то же, что и предыдущее, только возвращается первый элемент.
* findIndex(func) - похож на find, но возвращает индекс вместо значения.
---

### Перебор элементов:
* forEach(func) – вызывает func для каждого элемента. Ничего не возвращает.
* map(func) – создаёт новый массив из результатов вызова func для каждого элемента.
* sort(func) – сортирует массив «на месте», а потом возвращает его.
* reverse() – «на месте» меняет порядок следования элементов на противоположный и возвращает изменённый массив.
---

![sort](assets/js/sort.jpg)
---

### Перебор элементов:
* reduce(func, initial) – вычисляет одно значение на основе всего массива, вызывая func для каждого элемента и передавая промежуточный результат между вызовами.

```js
const arr = [1, 2, 3];
arr.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
);
// 6 - сумма массива
```
---

### Полезные функции:
* `split("123")`/`[].join("")` – преобразует строку в массив и обратно.
* `Array.isArray(arr)` проверяет, является ли arr массивом.
* [Документация](https://learn.javascript.ru/array-iteration).
---

### Примеры

```js
const arr = [1, -1, 2, -2, 3];
arr.map(element => element * element);
// возвели в квадрат каждый элемент и вернули массив [1, 1, 4, 4, 9]

arr.forEach(element => console.log(element)); // вывели каждый элемент

arr.reduce((accumulator, currentValue) => accumulator + currentValue);
// 3 - сумма массива

arr.reverse() // перевернутый массив [3, -2, 2, -1, 1]
```
---

### Полезные методы массивов
* every: возвращает true, если вызов callback вернёт true для каждого элемента arr.
* some: возвращает true, если вызов callback вернёт true для какого-нибудь элемента arr.

```js
const arr = [1, -1, 2, -2, 3];

const isPositive = element => element > 0;

arr.every(isPositive); // false, не все положительные
arr.some(isPositive); // true, есть хоть одно положительное
arr.filter(isPositive); // [1, 2, 3]
arr.find(isPositive); // 1 -- первое положительное число
arr.findIndex(isPositive); // 0
```
---

### Полезные ссылки
* https://learn.javascript.ru/array
* https://learn.javascript.ru/array-iteration