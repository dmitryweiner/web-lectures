---
title: Redux - Тестируем Redux
---

## Тестируем Redux

![react-testing library](assets/react-testing/logo-large.png)
![redux](assets/redux/logo.png)

[Дмитрий Вайнер](https://github.com/dmitryweiner)

[видео](https://drive.google.com/file/d/1xqG4h7YNgbZaoOcCGKDQkOhXsERyPThO/view?usp=sharing)

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
* Сверяем получившийся стор с эталонным состоянием.
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
---

### Тестирование редьюсера
* Тест на него:

```js
const title = 'text';
const action = {
    type: ACTION_TYPES.ADD,
    payload: title
}
const state = reducer(initialState, action);
expect(state.list.length).toEqual(1);
expect(state.list[0]).toEqual(text);
```
---

### Тестирование компонентов
* Надо создать поддельный стор.
* Чем плох настоящий стор от Redux?
  * Нельзя взять полный список пришедших экшенов.
  * Требует при создании редьюсер (его мы тестируем отдельно).
* Используем библиотеку [redux-mock-store](https://github.com/reduxjs/redux-mock-store).

```shell
npm i -D redux-mock-store
npm i -D @types/redux-mock-store # типы для TS
``` 
---

### Пример использования redux-mock-store

```js
import configureStore from 'redux-mock-store';
// функция, создающая стор
const mockStore = configureStore();

test('addTodo()', () => {
    const initialState = { test: '123' }
    const store = mockStore(initialState);
    store.dispatch({ type: 'ADD' });
    expect(store.getActions()).toEqual([{ type: 'ADD' }]);
});
```
---

### ```setupTests.js```
* Компонент, использующий Redux, должен быть обёрнут в ```<Redux.Provider>```.
```js
const TestProvider = ({
                          store,
                          children
                      }) => <Provider store={store}>{children}</Provider>
```
* Имеющаяся функция render() из @testing-library/react так не умеет, поэтому напишем свою.
```js
export function testRender(ui, { store, ...otherOpts }) {
    return render(<TestProvider store={store}>{ui}</TestProvider>, otherOpts);
}
```
---

### ```setupTests.js```

```js
import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
// функция для создания поддельного стора
export const mockStore = configureStore();
const TestProvider = ({
                          store,
                          children
                      }) => <Provider store={store}>{children}</Provider>
export function testRender(ui, { store, ...otherOpts }) {
    return render(<TestProvider store={store}>{ui}</TestProvider>, otherOpts)
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
const store = mockStore({ counter: 123 });
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
const store = mockStore();
testRender(<Counter />, { store });
fireEvent.click(getByTestId('button'));
expect(store.getActions()).toEqual([actionInc()]);
```

---

### Что дальше?
* [Как тестировать асинхронные запросы к сети?](https://dmitryweiner.github.io/lectures/Test%20Redux%20Thunk.html#/)

### Полезные ссылки
* [Официальная документация](https://redux.js.org/recipes/writing-tests)
* [Пример тестирования Redux](https://gist.github.com/krawaller/e5d40217658fa132f3c3904987e467cd)
* [Пост в блоге по мотивам примера](https://blog.krawaller.se/posts/unit-testing-react-redux-components/)