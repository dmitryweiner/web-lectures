## Тестируем Redux

![react-testing library](assets/react-testing/logo-large.png)
![redux](assets/redux/logo.png)

[Дмитрий Вайнер](mailto:dmitry.weiner@gmail.com)

[видео]()

---

### Методика
* Тестируем стор отдельно:
  * Создатели экешенов.
  * Реакцию на экшены.
* Тестируем подключенные компоненты отдельно:
  * Правильно ли отрисовывают стор.
  * Вызывают ли правильные экшены.
* [Документация](https://redux.js.org/recipes/writing-tests).

---

### Тестирование создателей экшенов
* Создатель экшена:

```js
const add = content => ({
    type: ACTION_TYPES.ADD,
    payload: content
});
```
* Тест на него:

```js
const text = 'текст';
const expectedAction = {
    type: ACTION_TYPES.ADD,
    payload: text
}
expect(add(text)).toEqual(expectedAction)
```

---

### Тестирование редьюсера
* Создаём нужное состояние стора.
* Создаём нужный экшен.
* Вызываем редьюсер с нужным состоянием стора и нужным экшеном.
* Смотрим, адекватные ли изменения.

---

### Тестирование редьюсера
* Редьюсер:

```js
function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD: {
            return {
                ...state,
                list: [...state.list, action.payload]
            }
        }
        default:
            return state;
    }
}
```

----

### Тестирование редьюсера
* Тест на него:

```js
const title = 'text';
const action = {
    type: ACTION_TYPES.ADD,
    payload: title
}
const newState = reducer(action, []);
expect(newState.length).toEqual(1);
expect(newState[0]).toEqual(text);
```

---

### Тестирование компонентов
* Надо создать тестовый стор.
* И обмануть компонент, обернув его в ```<Redux.Provider>```.
* Для этого добавим в ```setupTests.js```:

```js
import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
const TestProvider = ({
                          store,
                          children
                      }) => <Provider store={store}>{children}</Provider>
export function testRender(ui, { store, ...otherOpts }) {
    return render(<TestProvider store={store}>{ui}</TestProvider>, otherOpts)
}
export function makeTestStore({ initialState, store = createStore(reducer, initialState)} = {}) {
    const origDispatch = store.dispatch;
    store.dispatch = jest.fn(origDispatch);
    return store;
}
```

---

### Тестирование отображения
* Допустим, компонент берёт из стора ```store.counter```:
```jsx
function Component() {
    const counter = Redux.useSelector(state => state.counter);
    return <>{counter}</>;
}
```
* Тест, что компонент всё отображает правильно:
```jsx
const store = makeTestStore({ initialState: { counter: 123 } });
testRender(<Component />, { store });
expect(screen.getByText(/123/i)).toBeInTheDocument();
```

---

### Тест вызовов экшенов
* Компонент при нажатии "+" вызывает соответствующий экшен:

```jsx
const actionInc = () => ({
    type: ACTION_INC,
});
function Counter() {
    const dispatch = ReactRedux.useDispatch();
    return <button data-testid="button" onClick={() => dispatch(actionInc())}>+</button>;
}
```
* Тест:

```jsx
const store = makeTestStore();
testRender(<Counter />, { store });
fireEvent.click(getByTestId('button'));
expect(store.dispatch).toHaveBeenCalledWith(actionInc());
```

---

### Что дальше?
* Как тестировать асинхронные запросы к сети?
  * [fetch-mock](https://redux.js.org/recipes/writing-tests#async-action-creators)

---

### Полезные ссылки
* [Официальная документация](https://redux.js.org/recipes/writing-tests)
* [Пример тестирования Redux](https://gist.github.com/krawaller/e5d40217658fa132f3c3904987e467cd)
* [Пост в блоге по мотивам примера](https://blog.krawaller.se/posts/unit-testing-react-redux-components/)