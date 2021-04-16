---
title: Лекции по фронтенду - Redux Saga
---

![redux-saga logo](assets/redux-saga/Redux-Saga-Logo.png)
![redux saga](assets/redux-saga/meme.jpeg)

[Дмитрий Вайнер](https://github.com/dmitryweiner)

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

### Сага о корнях
* Вся обработка саг начинается с корневой саги, в которой вызываются все остальные:
```js
export default function* rootSaga() {
      yield takeEvery('ACTION_NAME', anotherSaga);
}
//
export function* anotherSaga() {
    // полезный код
}
```

---

### Жизненный цикл
![life cycle](assets/redux-saga/life-cycle.png)

---

### Саги
* Сага должна быть [генератором](https://learn.javascript.ru/generators).
* Саги управляются с помощью _сайд-эффектов_. С помощью них можно:
  * Подписываться на вызов экшенов.
  * Вызвать другие саги и отменять вызов.
  * Делать вызовы API.
  * Получать данные из стора.
  * Писать данные в стор.
  * Приостанавливаться.
* Сайд-эффект вызывается с помощью  ```yield```.

---

### Сайд-эффекты
* Базовые эффекты:
  * ```call``` &mdash; вызов и ожидание ответа сторонней функции (обычно АПИ).
  * ```take``` &mdash; подписка на экшен.
  * ```fork``` &mdash; неблокирующий вызов сторонних методов.
  * ```put``` &mdash; вызов экшена (можно передавать параметры).
  * ```select``` &mdash; обращение к текущему состоянию стора.
* [Полный список методов](https://redux-saga.js.org/docs/api/#effect-creators).

---

### Внимание!
* Внутри саги надо не забывать ставить ```yield``` перед эффектами, иначе они не применятся 
  (т.к. эффекты &mdash; тоже генераторы).
* Работает:
```js
yield put(loading()); // ✅
````
* Не работает:
```js
put(loading()); // ❌
```

---

### Ожидание вызова экшена
* На первый вызов экшена и больше не сработает:
```js
yield take('ACTION_NAME');
````
* На все вызовы takeEvery (важно! второй параметр: сага-обработчик):
```js
yield takeEvery('ACTION_NAME', anotherSaga);
```
Можно ожидать вызов нескольких экшенов:
```js
yield takeEvery(
    [
        'ACTION_NAME',
        'ANOTHER_ACTION_NAME',
    ],
    anotherSaga
);

```
---

### Можно подписываться на изменения текущего роута
* И вызывать соответствующую сагу:
```js
import { LOCATION_CHANGE } from 'connected-react-router';
//
yield takeEvery(LOCATION_CHANGE, locationChangedSaga);
```
---

### Обращение к стейту
* Эффект ```select``` (используется функция или селектор библиотеки ```reselect```):
```js
const userId = yield select(selectUserId);
````
* Без функции:
```js
const userId = yield select(state => state.fetcher.userId);
```
---

### Вызов функций
* Эффект ```call```:
```js
yield call(functionName, parameters);
```
* Вызов API c помощью ```fetch```:
```js
const users = yield call(fetch, '/users');
const repos = yield call(fetch, '/repos');
````
* Можно делать это параллельно:
```js
const [users, repos] = yield all([
    call(fetch, '/users'),
    call(fetch, '/repos')
]);
```
---

### Вызов экшена
* Эффект ```put```:
```js
yield put({type: 'DELETE ALL'});
```
* Вызов с помощью acton creator с параметрами:
```js
yield put(actionCreator(parameters))
```
---

### Пример, когда нужна сага
* Открывается приложение, проверяет, аутентифицирован ли пользователь.
  * Если нет:
     * Запоминает текущий URL, чтобы к нему вернуться.
     * Перенаправляет на форму логина.
  * Если аутентифицирован:
     * Запрашиваем данные необходимые данные.
     * Складываем в стор.
----

### Пример, когда нужна сага
* Во время всего этого могут происходить разнообразные ошибки сети и сервера.
* Размещать эту логику следует отдельно, не в компонентах.
* Писать это на чистом Redux было бы слишком мучительно.
---

### Примерная реализация
```js
function* initialLoad() {
    try {
        const token = yield call(api.checkAuth);
        yield put({type: 'LOGIN_SUCCESS', token});
        const data = yield call(api.getData);
        yield put({type: 'SAVE_DATA', payload: data});
    } catch(error) {
        yield put({type: 'LOGIN_ERROR', error});
    } finally {
        if (yield cancelled()) {
            // ... put special cancellation handling code here
        }
    }
}
```
---

### Как это тестировать?
* Пользуемся тем, что саги &mdash; это генераторы.
* Реальное обращение к API надо [замокать](https://dmitryweiner.github.io/lectures/Test%20Redux%20Thunk.html#/).
* Создаём генератор, вызываем у него ```.next()``` и проверяем то, что он вернул.
* Возвращать он должен экшены.
----

### Пример саги
```js
function* fetchAuthorsFromApi() {
  yield takeEvery('FETCH_AUTHORS', makeAuthorsApiRequest);
}
function* makeAuthorsApiRequest(){
  try {
    const authors = yield call(Api.requestAuthors);
    yield put(saveAuthorsToList(authors));  
  } catch (err) {
    yield put(saveAuthorToListError());
  }
}
```
----

### Пример теста
```js
describe('fetchAuthorsFromApi', () => {
  const genObject = fetchAuthorsFromApi();
  
  it('should wait for every FETCH_AUTHORS action and call makeAuthorsApiRequest', () => {
    expect(genObject.next().value)
      .toEqual(takeEvery('FETCH_AUTHORS', makeAuthorsApiRequest));
  });
  
  it('should be done on next iteration', () => {
    expect(genObject.next().done).toBeTruthy();
  });
});
```
---

### Полезные ссылки
* [Документация](https://redux-saga.js.org/docs/introduction/GettingStarted).
* [API redux-saga](https://redux-saga.js.org/docs/api/).
* [Хорошая статья про саги](https://itnext.io/redux-saga-how-to-make-real-good-things-with-generators-7d91a8916f0e).
* [Сборник полезных рецептов](https://redux-saga.js.org/docs/recipes/).
* [Тестирование саг](https://medium.com/@13gaurab/unit-testing-sagas-with-jest-29a8bcfca028).
