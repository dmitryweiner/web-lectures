---
title: Redux - Борьба с излишними рендерами в React.js useMemo reselect
---

## Борьба с излишними рендерами в React.js
### С помощью хука useMemo
### Библиотеки reselect
### И оборачивания в React.memo

[все лекции](https://github.com/dmitryweiner/lectures/blob/main/README.md)

[видео](https://drive.google.com/file/d/18zlX_cBrtaNDvBkSvDD282UIckH6opPW/view?usp=sharing)

---

### Стор и медленный селектор
* Допустим, есть стор:
```js
const state = {
    list: [
        { id: 1, isChecked: false, title: 'Полить кошку' },
        { id: 2, isChecked: true, title: 'Вырастить картошку' }
    ]
}
```
* По нему пробегает медленная функция, подсчитывающая количество элементов в массиве:
```js
const selectItemsCount = list => {
    // представим, что тут что-то крайне медленное
    let j;
    for (let i; i < 1000000; i++) j = i * j; 
    return list.length;
}
``` 

---

### Проблема
* Где-то в компоненте мы вызываем эту функцию:
```jsx
<span>{selectItemsCount(state.list)}</span>
```
* При каждом рендере компонента (а он может происходить часто) функция будет вызываться
и тормозить браузер.
* [Живой пример](https://dmitryweiner.github.io/react-standalone/list.html).

---

### Идея
* Что если кешировать результаты работы функции.
* Вызывать её только тогда, когда изменится то, с чем она работает.
* Это легко можно сделать с помощью useMemo.

---

### useMemo спешит на помощь
* [Синтаксис использование](https://reactjs.org/docs/hooks-reference.html#usememo):
```js
const значение = useMemo(функция, [зависимости]);
```
* Решение вышеописанной проблемы:
```jsx
const count = useMemo(
    () => selectItemsCount(state.list),
    [state.list]
);
//
<span>{count}</span>
```
---

### Почему это костыль
* Если есть несколько компонентов, использующих одинаковый селектор, кешировать
придётся в каждом компоненте.
* Нужно следить за зависимостями (можно забыть их указать).
* Хорошо бы кешировать уже на уровне селектора.

---

### React.memo
* Если мы твёрдо уверены, что компонент должен ререндериться только тогда, когда меняются его пропсы,
  можно обернуть его в ```React.memo()```.
* [Документация](https://reactjs.org/docs/react-api.html#reactmemo).
* Пример:
```jsx
const MyComponent = React.memo(
    function MyComponent(props) {
        /* render using props */
    }
);
```

---

### React.memo и функция сравнения
* По умолчанию реакт сравнивает объекты по ссылке, что не всегда удобно.
* Можно взять сравнение пропсов в свои руки (если надо сравнивать не по ссылке, а поля объектов):
```jsx
function MyComponent(props) {
    /* render using props */
}
function areEqual(prevProps, nextProps) {
    /*
    Сравнивающая фунция: возвращает true -- происходит ререндер.
    */
}
export default React.memo(MyComponent, areEqual);
```

---

### Библиотека reselect
* [Документация](https://github.com/reduxjs/reselect).
* Установка:
```shell
npm i reselect
```
* Формат использования:
```js
import { createSelector } from 'reselect';
const selector = createSelector(
    функция_выбирающая_значения1,
    функция_выбирающая_значения2,
    //...
    (значения1, значения2, /*...*/) => результат // тут долгие вычисления
);
```

---

### Reselect: принцип действия
* Как только меняются значения, селектор пересчитывает результат.
* Входными функциями могут быть другие селекторы (многостадийное кеширование).

---

### Использование
* Решение ранее описанной проблемы:
```js
import { createSelector } from 'reselect';
const selectItemsCount = createSelector(
    state => state.list,
    list => list.length
);
//
<span>Всего: {selectItemsCount(state)}</span>
```
* При изменении свойства ```list``` селектор будет обновлён.

---

### Полезные ссылки
* [Пример приложения с reselect](https://codesandbox.io/s/7429z69wwj).