---
title: Redux - TypeScript
---

## TypeScript + Redux

[все лекции](https://github.com/dmitryweiner/web-lectures/blob/main/README.md)

[видео](https://drive.google.com/file/d/1xqG4h7YNgbZaoOcCGKDQkOhXsERyPThO/view?usp=sharing)

---

### Ставим нужные типы
```shell
npm i -D @types/react-redux
```

---

### Типизация экшенов
* Простой способ.
* Посложнее.
* Кошмар.

---

### Экшены: простой способ
* Заводим константы возможных типов экшенов (поле action.type):
```ts
const ADD = 'Add';
const REMOVE = 'Remove';
```
* Типизируем сами экшены:
```ts
interface AddItem {
    type: typeof ADD;
    payload: Item;
}
interface RemoveItem {
    type: typeof REMOVE;
    payload: string;
}
```
* Описываем обобщённый тип:
```ts
type ACTION_TYPE = AddItem | RemoveItem; // и т.д.
```
---

### Экшены: способ посложнее
* Заводим структуру с типами экшенов:
```ts
const ACTION_TYPES = {
    ADD: 'add',
    REMOVE: 'remove',
} as const; // важно слово as const!
```
* Описываем экшены:
```ts
interface IActionAdd {
    type: typeof ACTION_TYPES.ADD;
    payload: Item; }
interface IActionRemove {
    type: typeof ACTION_TYPES.REMOVE;
    payload: string; }
```
* Описываем обобщённый тип:
```ts
type ACTION_TYPE = AddItem | RemoveItem; // и т.д.
```

---

### Экшены с ENUM
* Заводим ENUM:
```ts
enum ACTION_TYPES  {
  ADD = 'add',
  REMOVE = 'remove'
}
```
* Типизируем экшены:
```ts
interface IActionAdd {
    type: typeof ACTION_TYPES.ADD;
    payload: Item;
}
interface IActionRemove {
    type: typeof ACTION_TYPES.REMOVE;
    payload: string;
}
```
* Обобщённый тип:
```ts
type IAction = IActionAdd | IActionRemove;
```

---

### Кошмарный способ
* По мотивам этого [поста](https://habr.com/ru/company/alfa/blog/452620/).
* Заводим константы возможных типов экшенов (поле action.type):
```ts
const ADD = 'Add';
const REMOVE = 'Remove';
```
* Создаём тип, выводящий из того, что ему дали:
```ts
type Action<K, V = void> = V extends void ? { type: K } : { type: K } & V;
```
* Описываем тип экшенов:
```ts
type ActionType =
| Action<typeof ADD, { payload: Item }>
| Action<typeof REMOVE, { payload: string }>
```

---

### Типизация стора
* Просто описываем, что лежит в сторе:
```ts
interface Item {
    id: string;
    title: string;
    isChecked: boolean;
}
//
interface List extends Array<Item> {}
//
interface IStore {
    list: List;
}
```

---

### Комбинированный стор

* Если стор собирается из нескольких редьюсеров 
  ([```combineReducers```](https://redux.js.org/recipes/structuring-reducers/using-combinereducers)),
  проще всего определить тип стора так:

```ts
export type AppState = ReturnType<typeof store.getState>;
```

---

### Типизация редьюсера
```ts
const initialState: IStore = {
    list: []
};

const reducer = function (state: IStore = initialState, action: ActionType): IStore {
    switch (action.type) {
        case ADD: {
            return {
                //...
            }
```

---

### Типизация функции ```dispatch```
Пригодится при типизации [асинхронных экшенов](https://dmitryweiner.github.io/web-lectures/Redux%20API.html#/9).

```ts
export type AppDispatch = typeof store.dispatch;
```
