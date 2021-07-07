---
title: React - Тестирование запросов в сеть
---

## Тестирование запросов в сеть

[Дмитрий Вайнер](https://github.com/dmitryweiner)

---

### Идея
* Не давать коду выполнять реальные запросы по сети.
* Эмулировать сервер программно.
  * Описывать enpdpoint'ы сервера прямо в коде тестов.

---

### Использовать spyOn библиотеки jest
* Надо подменить вызовы методов у объекта api:
```js
import * as api from './api';
test('should call api', async () => {
    const todos = [{ title: 'Read the book' }, { title: 'Feed the cat' }];
    const getTodos = jest.spyOn(api, 'geTodos')
        .mockImplementation(() => Promise.resolve(todos)); // подмена вызова
    
    // вызываем что-то, что идёт в API
    // Компонент или экшен или сагу
    api.getTodos();
    
    expect(getTodos).toHaveBeenCalledTimes(1);
    getTodos.mockClear();
});
```

---

### Fetch-mock
* Установить fetch-mock:
```shell
npm i -D fetch-mock
```
* Описать возможные реакции сервера (как бы локальный сервер на время тестов):
```js
fetchMock.getOnce('/URL', {
    body: { data },
    headers: { 'content-type': 'application/json' }
})
```
* [Документация по возможным запросам](http://www.wheresrhys.co.uk/fetch-mock/).

---

### Пример тестирования асинхронного экшена
* Использующего redux-thunk:
```js
import fetchMock from 'fetch-mock';
test('/todos', async () => {
    fetchMock.getOnce('/todos', {
        body: { todos: ['do something'] },
        headers: { 'content-type': 'application/json' }
    })
    const expectedActions = [
        { type: types.FETCH_TODOS_REQUEST },
        { type: types.FETCH_TODOS_SUCCESS, body: { todos: ['do something'] } }
    ];
    const store = makeTestStore({ initialState: { todos: [] } });
    await store.dispatch(actions.fetchTodos());
    expect(store.getActions()).toEqual(expectedActions);
});
```

---

### Библиотека MSW
* Установка:
```shell
npm i -D msw
```
* [Документация](https://mswjs.io/docs/).
* [Пример тестов](https://github.com/mswjs/examples/tree/master/examples/rest-react).
* Описание реакций сервера:
```js
import { rest } from 'msw'
import { setupServer } from 'msw/node'
//
const server = setupServer(
    rest.get('/greeting', (req, res, ctx) => {
        return res(ctx.json({ greeting: 'hello there' }))
    })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

---

### Полезные ссылки
* https://redux.js.org/recipes/writing-tests
* https://testing-library.com/docs/react-testing-library/example-intro/