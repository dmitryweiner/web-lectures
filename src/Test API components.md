
## Тестирование асинхронных экшенов в Redux

---

### Идея
* Не давать коду выполнять реальные запросы по сети.
* Эмулировать сервер программно.
  * Описывать enpdpoint'ы сервера прямо в коде тестов.

---

### Fetch-mock
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

### MSW
```js
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
    rest.get('/greeting', (req, res, ctx) => {
        return res(ctx.json({ greeting: 'hello there' }))
    })
)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

```
---

### Полезные ссылки
https://redux.js.org/recipes/writing-tests
https://testing-library.com/docs/react-testing-library/example-intro/