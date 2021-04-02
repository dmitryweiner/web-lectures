---
title: Лекции по фронтенду - Redux Saga
---

![redux-saga logo](assets/redux-saga/Redux-Saga-Logo.png)
![redux saga](assets/redux-saga/meme.jpeg)

[Дмитрий Вайнер](mailto:dmitry.weiner@gmail.com)

---

### Идея
* Иногда (а на самом деле очень часто) логика работы приложения требует отслеживать работу экшенов
 и в ответ запускать _другие экшены_.
* Хороший пример: аутентификация и дальнейший переход на главную страницу.
* Эту логику обычно размещают в компоненте, это плохой стиль (компонент-представление ничего не должен знать
  про экшены).

---

### Redux Saga
* Для описания логики связей между экшенами придумали отдельный слой абстракции,
  назвали его ["саги"](https://ru.wikipedia.org/wiki/%D0%A1%D0%B0%D0%B3%D0%B0).
* Саги работают с помощью [генераторов и итераторов](https://learn.javascript.ru/generators).
* Сага может подписываться на определённые экшены.
* Может вызывать другие саги.
* Может совершать асинхронные запросы.
* Может Вызывать экшены.
* [Документация](https://redux-saga.js.org/docs/introduction/GettingStarted).

---

### Установка и подключение
* Установка:
```shell
npm install redux-saga
```
* Подключение:
```js
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './sagas';
// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);
// then run the root saga
sagaMiddleware.run(rootSaga);
```
---

### Использование

---

### Эффекты

---

### 

---

### 

---

### Полезные ссылки
* [Документация](https://redux-saga.js.org/docs/introduction/GettingStarted).

---
