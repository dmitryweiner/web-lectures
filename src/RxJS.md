---
title: RxJS
---

## RxJS

![RxJS logo](assets/rxjs/logo.jpg)

[Дмитрий Вайнер](https://github.com/dmitryweiner)

---

### Концепция
* RxJS &mdash; библиотека, реализующая шаблон реактивного программирования 
["наблюдатель"](https://ru.wikipedia.org/wiki/%D0%9D%D0%B0%D0%B1%D0%BB%D1%8E%D0%B4%D0%B0%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)).
* Есть источник изменений, продуцирующий некоторые события.
* Есть слушатели этих изменений, реагирующие только тогда, когда изменения происходят.
* Это называется 
[декларативное программирование](https://ru.wikipedia.org/wiki/%D0%94%D0%B5%D0%BA%D0%BB%D0%B0%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%BE%D0%B5_%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)
(в отличие от императивного).
---

![observer pattern](assets/rxjs/observer.png)
---

### Источник сообщений
* Источник сообщений зовут Observable (то, за чем наблюдают).
* Observable бывает разный:
  * Обычный Observable: на него может подписаться только один слушатель.
  * Subject: на него подписываются несколько слушателей.
  * Scheduler: планировщик событий в соответствии с Event Loop в JS.
---
  
![observable](assets/rxjs/observable.jpeg)
---
  
### Слушатель
* Слушатель подписывается на события с помощью метода subscribe().
* До подписки на источник событий Observable и не думает начать выполняться.

---

### Потоки данных
* В процессе движения события от источника к слушателю с событием могут происходить
разнообразные метаморфозы.
* Можно это представить в виде трубы между источником и слушателем, в которой находятся разные фильтры.
* Кстати, это осуществляется с помощью метода pipe().
---

![pipe](assets/rxjs/pipe.png)
---

### Способы создания Observable
* Прямой способ:
```js
import { Observable } from "rxjs";
const obs = new Observable((sub) => {
  sub.next(1);
  setTimeout(() => {
    sub.next(3);
    sub.complete();
  }, 500);
});
obs.subscribe(console.log);
// 1, 3
```
* Из любого итерируемого объекта:
```js
import { from } from "rxjs";
from([1, 2, 3]).subscribe(console.log);
// 1, 2, 3
```
---

### Способы создания Observable
* Из списка аргументов:
```js
import { of } from "rxjs";
of(1, 2, "челюсть").subscribe(console.log);
// 1, 2, "челюсть"
```
* Из события:
```js
import { fromEvent } from 'rxjs';
const clicks = fromEvent(document, 'click');
clicks.subscribe(console.log);
```
---

### Таймер
* Если передать 1 аргумент, таймер сработает через указанное время:
```js
import { timer } from 'rxjs';
timer(3000).subscribe(console.log);
// 0 (через 3 секунды)
```
* Второй аргумент означает, через сколько миллисекунд таймер будет регулярно срабатывать:
```js
import { timer } from 'rxjs';
timer(3000, 1000).subscribe(console.log);
// 0, 1, 2, 3...
```
---

### Интервал
* Срабатывает регулярно через указанное количество миллисекунд:
```js
import { interval } from 'rxjs';
interval(500).subscribe(console.log);
// 0, 1, 2, 3...
```
---

### Операторы
* К проходящим между слушателем и источником данным можно применить различные операторы, пользуясь методом pipe().
* Преобразование (map, scan, buffer).
* Фильтрация (filter, take, skip, distinct);
* Обработка ошибок (catchError, retry, onErrorResumeNext);
* Условия (skipUntil, skipWhile, takeUntil, takeWhile);
* Математические (min, max, count);
* Утилиты (tap, delay);
---

### Map

---

### 

---

### 

---

### 

---

### Способы объединения Observables
* concat, concatMap
* merge, mergeMap

---

### Switch

---

### 

---

### 

---

### 

---

### Полезные ссылки
* https://riptutorial.com/rxjs
* https://angdev.ru/rxjs/about/
* https://www.learnrxjs.io/
* https://rxviz.com/
* https://javascript.plainenglish.io/rxjs-operators-in-pictures-but-mostly-memes-7137cea5c8cc