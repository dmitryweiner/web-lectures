---
title: JS часть 2
---

### JavaScript
#### Функции
#### Rest...spread


![js](assets/js/js-logo.png)

[Дмитрий Вайнер](https://github.com/dmitryweiner)

[видео](https://drive.google.com/file/d/1xXjD38iQo6-5GIUcAGQeb_DSxPixRAXx/view?usp=sharing)
---

### Функции
* Функция &mdash; участок кода, который можно вызвать.
* Функции бывают анонимные и именованные.
* Функции могут принимать на вход аргументы.
* Функции могут возвращать значение (return).
* Ссылку на функцию можно сохранить в переменную и потом вызвать.
* Функция может вызывать саму себя (рекурсия).
---

### Функции
[Документация](https://learn.javascript.ru/es-function).

```js
function fact(number) {
    let result = 1;
    for (let i = 1; i <= number; i++) {
        // сокращённая запись result = result * number
        result *= i;
    }
    return result;
}
fact(5); // 120
```
---

### Варианты анонимных функций
* Анонимная функция может быть записана в полном виде:
```js
const multiply = function (a, b) {
    return a * b;
}
multiply(2, 2); // 4
```
* Или в стрелочном виде:
```js
const divide = (a, b) => {
    return a / b;
}
divide(4, 2); // 2
```
* [Отличия](https://learn.javascript.ru/es-function#funktsii-strelki-ne-imeyut-svoego-this).
---

### Варианты стрелочных функций
* Если стрелочная функция сразу возвращает результат, можно обойтись без {}.
* Если аргумент один, можно обойтись без ().

```js
// эти функции эквивалентны
const square = function (a) {
    return a * a;
}

const square = (a) => {
    return a * a;
}

const square = a => a * a;
```
---

### Параметры по умолчанию
* У функции могут быть параметры, которые можно не указывать. Тогда будут заданы значения по умолчанию:
```js
function sayMyName(name = "Walter White") {
    console.log(`Your name is ${name}`);
}
sayMyName("Dmitry"); // Your name is Dmitry
sayMyName(); // Your name is Walter White
```
* Параметры по умолчанию могут быть не только значением, но и выражением.
* Они должны быть последними в списке параметров. Так нельзя: ❌
```js
function sayMyName(firstName = "Walter", lastName) {}
```
---

### Ссылочные типы в параметрах
* При передаче ссылочных типов в аргументах функция может их изменять.
* Эти изменения будут видны снаружи функции.
* Нельзя использовать этот эффект для возврата значений из функции, следует пользоваться return'ом.
```js
function changer(o) {
    o.a = 123;
}
const obj = { a: 1, b: 2 };
changer(o);
console.log(obj.a); // 123
```
---

### Чистые функции
* Функции по возможности должны быть чистыми ([pure function](https://ru.wikipedia.org/wiki/%D0%A7%D0%B8%D1%81%D1%82%D0%BE%D1%82%D0%B0_%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B8)).
* Чистая функция:
    * Детерменированная: при одних и тех же аргументах выдаёт одинаковые значения.
    * Без побочных эффектов:
        * Не изменяет внешние переменные.
        * Не изменяет аргументы.
* Плюсы чистых функций:
    * Легко тестировать.
    * Легко кешировать.
    * Легко понимать.
---

### Rest & spread
* Оператор ...rest используется в аргументах функции и вбирает в себя все не перечисленные параметры.

```js
function sumAll(...args) { // args — имя массива
  let sum = 0;
  for (let arg of args) sum += arg;
  return sum;
}
console.log(sumAll(1, 2, 3)); // 6
```
* [Подробнее](https://learn.javascript.ru/rest-parameters-spread-operator).
---

### ...rest и аргументы функции
* Не все аргументы могут лежать в ...rest. Могут быть и указанные аргументы:
```js
function sayMyName(firstName, lastName, ...rest) {
    console.log(`${firstName} ${lastName} - ${rest}`);
}
```
---

### Rest & spread
* Оператор ...spread используется там, где ожидается несколько аргументов.
* Ему на вход подаётся что-то итерируемое (объект, массив).
```js
const arr = [1, 2, 3];
console.log(sumAll(...arr)); // 6
```
---

### Копирование объектов и массивов с помощью ...spread
* Чтобы избежать копирования по ссылке, нужно скопировать сам объект/массив.
* В этом нам поможет оператор ...spread:

```js
const obj = { a: 1, b: 2 };
const newObj = {...obj};
newObj.a = 123;
console.log(obj.a); // 1

const arr = [1, 2, 3];
const newArr = [...arr];
newArr[1] = 123;
console.log(arr[1]); // 2
```
---

### Деструктурирующее присваивание
* Можно при создании переменных брать значения из объектов:
```js
const obj = { a: 1, b: 2 };
const { a, b } = obj;
console.log(a, b); // 1, 2
```
* Или из массивов:
```js
const arr = [1, 2, 3];
const [a, b] = arr;
console.log(a, b); // 1, 2
```
* [Подробнее](https://learn.javascript.ru/destructuring-assignment).
---

### Деструктурирующее присваивание и ...rest
* Оставшиеся поля можно сложить в одну переменную с помощью оператора ...rest:

```js
const obj = { a: 1, b: 2, c: 3, d: 4 };
const { a, b, ...notUsed } = obj;
console.log(a, b); // 1, 2
console.log(notUsed); // { c: 3, d: 4 }

const arr = [1, 2, 3, 4];
const [f, g, notUsedArray] = arr;
console.log(f, g); // 1, 2
console.log(notUsedArray); // [3, 4]
```
---

### Деструктурирующее присваивание и параметры по умолчанию
* У объекта может не быть указанных полей, поэтому разумно применить параметры по умолчанию:

```js
const user = {
    firstName: "Walter",
    lastName: "White"
};
const { firstName = "", lastName = "", surname = "" } = user; 
```
---

### Деструктурирующее присваивание в аргументах функции
* Можно пользоваться деструктурирующим присваиванием прямо в аргументах функции.
* Это удобно, когда параметров слишком много (больше 3).
* Удобно это сочетать с параметрами по умолчанию.
---

### Деструктурирующее присваивание в аргументах функции
```js
function showMenu({title = "Заголовок", width = 100, height = 200}) {
  console.log(`${title} ${width} ${height}`);
}

// чтобы вызвать совсем без параметров:
function showMenu({
                    title = "Заголовок",
                    width = 100,
                    height = 200
} = {}) {
  console.log(`${title} ${width} ${height}`);
}
```
---

### Полезные ссылки
* https://learn.javascript.ru/es-function
* https://learn.javascript.ru/rest-parameters-spread-operator
* https://learn.javascript.ru/destructuring-assignment
