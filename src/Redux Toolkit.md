---
title: Лекции по фронтенду - Redux Toolkit
---

## Redux Toolkit

![ancient age meme](assets/redux-toolkit/toolkit-meme.png)

[Дмитрий Вайнер](https://github.com/dmitryweiner)
---

### Недостатки "чистого" Redux
* Redux &mdash; хорошая библиотека, но обладает некоторыми недостатками:
  * Огромный объём шаблонного кода.
  * Для каждого экшена надо создать константу для имени, тип и свой мутатор.
  * Сложно настраивать.
  * Чтобы просто начать работать, надо подключить много других библиотек.
---

### Идея!
* Что если собрать все нужные части стора в один объект:
  * Начальное состояние.
  * Редьюсеры.
* Экшены и их имена генерировать автоматически.
---

### Установка
* При создании приложения:
  * Обычный JS:
  ```shell
  npx create-react-app my-app --template redux
  ```
  * Современный TypeScript:
  ```shell
  npx create-react-app my-app --template redux-typescript
  ```
* В уже существующем приложении:
```shell
npm i @reduxjs/toolkit
```
---

### Создание стора
* Стор состоит из слайсов. Каждый слайс ответственен за отдельную сущность.
  * Это напоминает [разделение стора на редьюсеры](https://dmitryweiner.github.io/lectures/Redux.html#/15).
* Слайс состоит из:
  * Имени (имя будет включаться в имена экшенов).
  * Начального состояния.
  * Редьюсеров.
---

```js
// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

export default configureStore({
    reducer: {
        counter: counterSlice,
    },
});
```
---

### Редьюсеры не мутируют стейт
* Redux Toolkit позволяет писать "мутирующую" логику в редьюсерах.
На самом деле никакого изменения стейта не происходит, он так же продолжает
пересоздаваться, как и в ["обычном" Redux](https://dmitryweiner.github.io/lectures/Redux.html#/13).
Это делается с помощью библиотеки [immer](https://github.com/immerjs/immer), которая детектирует изменения 
в черновом стейте и создаёт свежую его копию.
```js
increment: (state) => {
    state.value += 1;
}
```
---

### Middleware
* Перезаписываем встроенные middleware (не рекомендуется):
```js
const store = configureStore({
    reducer: {/*...*/},
    middleware: [thunk, logger, /*...*/],
})
```
* Встроенные:
  * Development:
    ```js
      const middleware = [thunk, immutableStateInvariant, serializableStateInvariant];
    ```
  * Production:
    ```js
      const middleware = [thunk];
    ```
---

### Middleware
* Оставляем встроенные, добавляем свои:
```js
const store = configureStore({
    reducer: {/*...*/},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
```
* [Документация](https://redux-toolkit.js.org/api/getDefaultMiddleware).

---

### Как вызывать экшены в компоненте
```jsx
import { useSelector, useDispatch } from 'react-redux'
import counterSlice from './counterSlice'

export function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  return <>
    <button
      onClick={() => dispatch(counterSlice.actions.increment())}>
        +
    </button>
    <span>{count}</span>
    <button
      onClick={() => dispatch(counterSlice.actions.decrement())}>
      -
    </button>
  </>;
}
```
---

### Удобный способ экспорта экшенов
* Экспорт:

```js
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
```
* Импорт:

```js
import { decrement, increment } from './counterSlice';
```
---

### Типизация стора в TS
* Стейт и диспатч:
```ts
// Вывод типа текущего стейта автоматически
export type RootState = ReturnType<typeof store.getState>
// Вывод диспатча
export type AppDispatch = typeof store.dispatch
```
* Типизация хуков (чтобы не писать постоянно тип):
```ts
// hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

---

### Асинхронные экшены
* Простой подход:
```js
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    loading: 'idle',
    users: [],
  },
  reducers: {
    usersLoading(state, action) {
      // Use a "state machine" approach for loading state instead of booleans
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    usersReceived(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.users = action.payload
      }
    },
  },
})
// Destructure and export the plain action creators
export const { usersLoading, usersReceived } = usersSlice.actions
// Define a thunk that dispatches those action creators
const fetchUsers = () => async (dispatch) => {
  dispatch(usersLoading())
  const response = await usersAPI.fetchAll()
  dispatch(usersReceived(response.data))
}
```
---

### Асинхронные экшены с createAsyncThunk
```js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from './userAPI'

// First, create the thunk
const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId, thunkAPI) => {
    const response = await userAPI.fetchById(userId)
    return response.data
  }
)

// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: 'users',
  initialState: { entities: [], loading: 'idle' },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchUserById.fulfilled]: (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload)
    },
  },
})

// Later, dispatch the thunk as needed in the app
dispatch(fetchUserById(123))
```

---
### createAsyncThunk
https://redux-toolkit.js.org/api/createAsyncThunk

---

### Саги
```js
yield put(action.type)
```

---

### Нормализация данных
normalizr
https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape

---

### Тесты
https://www.xtivia.com/blog/best-practices-for-testing-a-react-redux-toolkit-app/
---

### Полезные ссылки
* https://redux-toolkit.js.org/introduction/getting-started
* https://redux-toolkit.js.org/usage/usage-guide
