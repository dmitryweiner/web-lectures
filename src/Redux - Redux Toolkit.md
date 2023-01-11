---
title: Redux - Redux Toolkit
---

## Redux Toolkit

![ancient age meme](assets/redux-toolkit/toolkit-meme.png)

[все лекции](https://github.com/dmitryweiner/web-lectures/blob/main/README.md)

[видео](https://youtu.be/KVVd9atLvlg)
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
  * Это напоминает [разделение стора на редьюсеры](https://dmitryweiner.github.io/web-lectures/Redux.html#/15).
* Слайс состоит из:
  * Имени (имя будет включаться в имена экшенов).
  * Начального состояния.
  * Редьюсеров, которые сооветствуют экшенам.
  * Внешних редьюсеров.
---

### Схема слайса
```js
const slice = createSlice({
    name: 'sliceName', // это имя будет добавлено в имя экшенов
    initialState: { /* начальное значение стора */ },
    reducers: {
        actionName: (state, action) => { /* тут что-то делают со стором */ }
    },
    extraReducers: {
        ['ANOTHER_ACTION_NAME']: (state, action) => { 
            /* тут опять что-то делают со стором */
        }
    }
});
export default slice.reducer; // по дефолту наружу смотрит редьюсер
export const {
    actionName
} = slice.actions; // тут лежат все экшены
```
----

### Слайс счётчика для примера

```js
// counterSlice.js
import { configureStore, createSlice } from '@reduxjs/toolkit';
const counterSlice = createSlice({
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
});
export default configureStore.reducer;
// store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
export default configureStore({
    reducer: {
        counter: counterSlice,
    },
});
```
---

### Сложный редьюсер
* Может содержать два поля ```reducer``` и ```prepare```.
* В ```prepare``` можно преобразовать значение ```payload```.

```ts
reducers: {
    addTodo: {
        reducer: (state, action: PayloadAction<Item>) => {
            state.push(action.payload);
        },
        prepare: (text: string) => {
            const id = nanoid();
            return { payload: { id, text } }
        }
    }
}
```
---

### Редьюсеры не мутируют стейт
* Redux Toolkit позволяет писать "мутирующую" логику в редьюсерах.
На самом деле никакого изменения стейта не происходит, он так же продолжает
пересоздаваться, как и в ["обычном" Redux](https://dmitryweiner.github.io/web-lectures/Redux.html#/13).
Это делается с помощью библиотеки [immer](https://github.com/immerjs/immer), которая детектирует изменения 
в черновом стейте и создаёт свежую его копию.
```js
increment: (state) => {
    state.value += 1;
}
```
---

### Экстра-редьюсеры
* Экстра-редьюсеры нужны для подписки на срабатывания экшенов из других слайсов.
* Или вообще произвольных экшенов.
* Асинхронных экшенов.
```js
const incrementBy = createAction('incrementBy');
extraReducers: {
    [incrementBy]: (state, action) => { /* ... */  },
    ['ANOTHER_ACTION_NAME']: (state, action) => { /* ... */  },
    [anotherSliceActionName]: (state, action) => { /* ... */  }
}
```

---

### extraReducers с builder
* Можно экстра-редьюсеры указывать не в виде объекта с полями, а в виде вызовов метода ```builder``` 
  (для TypeScript это единственный рабочий способ).
* Помимо метода ```addCase```, есть полезные методы ```addMatcher``` и ```addDefaultCase```.
* [Документация](https://redux-toolkit.js.org/api/createSlice#the-extrareducers-builder-callback-notation).

```js
extraReducers: builder => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
        state.entities.push(action.payload)
    })
}
```
---

### Создание стора
* Используется метод [```configureStore```](https://redux-toolkit.js.org/api/configureStore):
```js
const store = configureStore({
    reducer: {
        todo: todoSlice,
        /* ещё слайсы */
    },
    devTools: true | false, // логи
    middleware: [/* thunk, saga */],
    preloadedState: {} // предзагруженное состояние стора (для серверного рендеринга)
});
```
---

### Middleware (плохой способ)
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

### Middleware (правильный способ)
* Оставляем встроенные, добавляем свои:
```js
const store = configureStore({
    reducer: {/*...*/},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
```
* [Документация](https://redux-toolkit.js.org/api/getDefaultMiddleware).

---

### Как вызывать экшены в компоненте (плохой способ)
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
export const { 
    increment, 
    decrement, 
    incrementByAmount
} = counterSlice.actions;
```
* Импорт:

```js
import { decrement, increment } from './counterSlice';
```
---

### Типизация стора в TS
* [Документация](https://redux-toolkit.js.org/usage/usage-with-typescript)
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

### Типизация initialState и reducer

```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface Item {
    id: string
    text: string
}
const todosSlice = createSlice({
    name: 'todos',
    initialState: [] as Item[],
    reducers: {
        addTodo: {
            reducer: (state, action: PayloadAction<Item>) => {
                state.push(action.payload)
            }
        }
    }
})
```
---

### Асинхронные экшены
* Плохой подход &mdash; меняем состояние вручную:
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
* [Документация](https://redux-toolkit.js.org/api/createAsyncThunk).

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

### Полезный объект ```thunkAPI```
* При создании асинхронного экшена с помощью ```createAsyncThunk```
  в обработчике вторым параметром передаётся объект ```thunkAPI``` со следующими полями:
  * dispatch: метод dispatch из стора (можно вызвать ещё один экшен).
  * getState: метод getState из стора (можно узнать состояние стора).
---

### Типизированный асинхроэкшен на TS
[Документация](https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk)

```ts
const addElement = createAsyncThunk<
    Element, // тип возвращаемого
    string, // тип входного
    { rejectValue: string } // тип ошибки
    >(
    'todo/addElement',
    async (title: string, thunkAPI) => {
        try {
            return await api.todos.add({title});
        } catch (error) {
            thunkAPI.rejectWithValue(error.message);
        }
    }
)

// в слайсе:
extraReducers: builder => {
    builder
        .addCase(addElement.pending, (state) => {
            state.requestStatus = REQUEST_STATUS.LOADING;
        })
        .addCase(addElement.fulfilled, (state, action) => {
            state.requestStatus = REQUEST_STATUS.SUCCESS;
            state.list.push(action.payload);
        })
        .addCase(addElement.rejected, (state, action) => {
            state.requestStatus = REQUEST_STATUS.ERROR;
            if (action.payload) { // без if не заработает!
                state.error = action.payload;
            }
        });
}
```

---

### Саги
* Устанавливаем полезную библиотеку [```saga-toolkit```](https://github.com/janoist1/saga-toolkit):
```shell
npm i saga-toolkit
```
* Создание экшена для вызова саги с помощью [```createSagaAction```](https://npm.io/package/saga-action-creator):
```js
import { createSagaAction } from 'saga-toolkit';
export const fetchThings = createSagaAction(`${slice.name}/fetchThings`);
```
* См. слайд ниже ⬇️
----

* Подписываемся на вызов экшена:
```js
import { call } from 'redux-saga/effects'
import { takeLatestAsync } from 'saga-toolkit'
import API from 'hyper-super-api'
import * as actions from './slice'
function* fetchThings() {
    const result = yield call(() => API.get('/things'))
    return result
}
export default [
    takeLatestAsync(actions.fetchThings.pending, fetchThings),
]
```
---

### Тесты
* Для компонентов тесты не изменятся.
* При проверке редьюсеров обратить внимание на изменение имён экшенов.
* [Пример тестирования всего приложения](https://www.xtivia.com/blog/best-practices-for-testing-a-react-redux-toolkit-app/)

![no tests](assets/memes/no-tests.png)
---

### Полезные ссылки
* [С чего начать](https://redux-toolkit.js.org/introduction/getting-started)
* [Гид по использованию](https://redux-toolkit.js.org/usage/usage-guide)
