---
title: TypeScript + Redux
---

## TypeScript + Redux

[Дмитрий Вайнер](mailto:dmitry.weiner@gmail.com)

[видео]()

---

### Типизация экшенов
* Простой способ.
* Посложнее.
* Кошмар.

---

### Экшены: простой способ
* Заводим константы возможных типов экшенов (поле action.type):
```ts
export const ADD = 'Add';
export const REMOVE = 'Remove';
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
export type ACTION_TYPE = AddItem | RemoveItem; // и т.д.
```
---

### Экшены: способ посложнее
* Заводим структуру с типами экшенов:
```ts
export const ACTION_TYPES = {
    ADD: 'add',
    REMOVE: 'remove',
} as const; // важно слово as const!
```
* Описываем экшены:
```ts
export interface IActionAdd {
    type: typeof ACTION_TYPES.ADD;
    payload: Item; }
export interface IActionRemove {
    type: typeof ACTION_TYPES.REMOVE;
    payload: string; }
```
* Описываем обобщённый тип:
```ts
export type ACTION_TYPE = AddItem | RemoveItem; // и т.д.
```

---

### Экшены с ENUM
* Заводим ENUM:
```ts
export enum ACTION_TYPES  {
  ADD = 'add',
  REMOVE = 'remove'
}
```
* Типизируем экшены:
```ts
export interface IActionAdd {
    type: typeof ACTION_TYPES.ADD;
    payload: Item;
}
export interface IActionRemove {
    type: typeof ACTION_TYPES.REMOVE;
    payload: string;
}
```
* Обобщённый тип:
```ts
export type IAction = IActionAdd | IActionRemove;
```

---

### Кошмарный способ
* По мотивам этого [поста](https://habr.com/ru/company/alfa/blog/452620/).
* Заводим константы возможных типов экшенов (поле action.type):
```ts
export const ADD = 'Add';
export const REMOVE = 'Remove';
```
* Создаём тип, выводящий из того, что ему дали:
```ts
type Action<K, V = void> = V extends void ? { type: K } : { type: K } & V;
```
* Описываем тип экшенов:
```ts
export type ActionType =
| Action<typeof ADD, { payload: Item }>
| Action<typeof REMOVE, { payload: string }>
```

---

### Типизация стора
* Просто описываем, что лежит в сторе:
```ts
export interface Item {
    id: string;
    title: string;
    isChecked: boolean;
}

export interface List extends Array<Item> {}

export interface IStore {
    list: List;
}
```

---

### Типизация редьюсера
```ts
const initialState: IStore = {
    list: []
};

export const reducer = function (state: IStore = initialState, action: ActionType): IStore {
    switch (action.type) {
        case ADD: {
            return {
                //...
            }
```