---
title: Redux - Основы
---

## React + Redux

![React + Redux](assets/redux/redux-logo.jpeg)

[все лекции](https://github.com/dmitryweiner/lectures/blob/main/README.md)

Видео: [про Redux](https://drive.google.com/file/d/1d6FYASBSJiL36QM-n-7y046K94sxTD-1/view?usp=sharing),
[про раскукоживание стора](https://youtu.be/LIra64O9juo).

---

### State management
* Можно хранить состояние приложения размазанным по компонентам.
* Плюсы:
  * Просто. Не надо думать.
  * Всё под рукой.
* Минусы:
  * Приходится пробрасывать потомками стейт и методы изменения.
  * Может нарушиться консистентность.
  * Изменения очень дорогие.

---

## Идея

![data flow](assets/redux/data-flow.png)

---

### Redux
* Библиотека управления состоянием.
* Авторы: [Dan Abramov](https://github.com/gaearon) и [Andrew Clark](https://github.com/acdlite).
* Дата первого релиза: 2.06.2015.
* Текущая версия: 4.0.
* [Документация](https://redux.js.org/api/api-reference).
* [Учебникъ](https://redux.js.org/tutorials/fundamentals/part-1-overview).

---

![схема работы](assets/redux/redux-diagram.gif)

---

## Плюсы
* Состояние приложения лежит в одном единственном месте.
* Изменения атомарные и последовательные.
* Можно восстановить историю изменений.
* Не нужно прокидывать в компоненты state и dispatch.

---

## Минусы
* Немного сложно с непривычки.
* Много кода.
* Много новых файлов.
* Легко запутаться в изменениях стейта.

---

## Подключение 
* Установка:
```shell
npm i redux react-redux
```
* Создание стора (в ```store.js```):
```js
import { createStore } from 'redux';
const store = createStore(reducer);
export default store;
```
* Подключение в приложение (в ```index.js```):
```js
import { Provider } from 'react-redux';
const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, rootElement);
```

---

### Middleware
* [Документация](https://redux.js.org/tutorials/fundamentals/part-4-store#middleware).
* Можно вмешиваться в процесс обработки экшенов для логирования или добавления асинхроннности.
```js
const middlewareEnhancer = applyMiddleware(logger, thunk);
const store = createStore(rootReducer, middlewareEnhancer);
```

---

## State-first подход
* Думаем вначале, что будет лежать в сторе.
  * В TS: явно описываем тип стора.
* Описываем его начальное значение (что показывается, при загрузке приложения).
```js
const initialState = {
    items: [],
    filterByDone: false
};
```

---

### Actions
* Определяем константами имена (типы) экшенов:
```js
const ADD = 'add';
const REMOVE = 'remove';
```
* Разумнее сделать структуру с типами экшенов:
```js
const ACTION_TYPES = {
    ADD: 'add',
    REMOVE: 'remove'
};
```
---

### Action creators
* Чтобы не писать экшен каждый раз при вызове ```dispatch```:
```js
// допускается, но не одобряется
dispatch({type: ACTION_TYPES.ADD, payload: 'text'});
```
* Заводят специальные функции, создающие экшен:
```js
const add = content => ({
    type: ACTION_TYPES.ADD,
    payload: content
});
```
* В эти функции можно передавать параметры.

---

## Reducer
* Функция, которая делает из старого стейта новый на основании пришедшего экшена.
* Стейт не должен мутировать.
* Должен быть пункт default.
```js
function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD: {
            return { // это мутатор:
                ...state,
                list: [...state.list, action.payload]
            }
        }
        /* тут ещё мутаторы */
        default:
              return state;
    }
}
```

---

## Reducer: особенности
* [Стейт иммутабелен.](https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns)
  Изменять объекты нельзя, пересоздавать можно.
  * Иначе React не отрисует изменения.
* Мутаторы можно выделять в отдельные методы, если там много кода.
  * Если там много кода, возможно происходит что-то не то.
* Дефолтный пункт для случаев, когда пришёл экшен, а мутатора нет.
* В редьюсере не должно быть асинхронной логики.

---

### Компоновка редьюсеров
* Когда редьюсер становится слишком большим и начинает содержать логику, относящуюся к разным
  сущностям, имеет смысл разделить его на несколько логических частей.
* Если изначально известно, что в стейте будет несколько разных сущностей, стоит писать разные
  редьюсеры сразу.
* [Документация](https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#combining-reducers).

---

### Компоновка редьюсеров
* Редьюсеры объединяются с помощью 
  [```combineReducers```](https://redux.js.org/recipes/structuring-reducers/using-combinereducers):
```js
import { combineReducers } from 'redux';
import todosReducer from './features/todos/todosSlice';
import filtersReducer from './features/filters/filtersSlice';
const rootReducer = combineReducers({
    todos: todosReducer,
    filters: filtersReducer
});
export default rootReducer;
```

---

## [Счётчик с кнопками](https://dmitryweiner.github.io/react-standalone/redux-counter.html)
```js
const ACTION_INC = 'inc';
const ACTION_DEC = 'dec';

const actionInc = () => ({
    type: ACTION_INC,
});

const actionDec = () => ({
    type: ACTION_DEC,
});

const initialState = {
    counter: 0
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_INC: {
            return {
                ...state,
                counter: state.counter + 1
            };
        }
        case ACTION_DEC: {
            return {
                ...state,
                counter: state.counter - 1
            };
        }
        default: {
            return state;
        }
    }
}

const store = Redux.createStore(reducer);

function App() {
    const dispatch = ReactRedux.useDispatch();
    const counter = ReactRedux.useSelector(state => state.counter);
    return (
        <>
            <button onClick={() => dispatch(actionDec())}>-</button>
            {counter}
            <button onClick={() => dispatch(actionInc())}>+</button>
        </>
    );
}
const rootElement = document.getElementById('root');
ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <App />
    </ReactRedux.Provider>,
    rootElement
);
```

---

## Селекторы
* Если нужно из стейта получить отдельные поля или некую отфильтрованную информацию.
* Чтобы не писать этот код везде, его выделяют в селекторы.
* Селектор представляет собой функцию, принимающую на вход стейт и возвращающую то, что надо:
```js
const filteredListSelector = state => {
    if (state.filterChecked) {
        return state.list.filter(item => item.isChecked);
    }
    return state.list;
}
```

---

## Использование с React.js
* Функциональные компоненты:
  * Хуки useDispatch, useSelector.
* Компоненты-классы:
  * connect
  * mapStateToProps
  * mapDispatchToProps


---

## Компоненты-классы
* [Документация](https://react-redux.js.org/introduction/basic-tutorial#connecting-the-components).
* Компонент оборачивается в функцию ```connect(mapStateToProps, mapDispatchToProps)(Component)```.
* mapStateToProps: функция, выделяющая из стейта только те поля, которые нужны компоненту.
* mapDispatchToProps: создаёт диспатчеры для нужных экшенов.

---

## Компоненты-классы
```js
class ReduxComponent extends React.Component {
    render() {
        return <>
            {this.props.counter}
            <button onClick={() => this.props.increment()}>+</button>
        </>;
    }
}
function mapStateToProps(state) {
    return { counter: state.counter };
}
function mapDispatchToProps(dispatch) {
    return {
        increment: () => dispatch({type: 'INCREMENT'})
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ReduxComponent);
```

---

## Функциональные компоненты
* [Документация](https://react-redux.js.org/api/hooks).
* Свежий стейт и его срезы можно получить от хука ```useSelector```.
* ```dispatch``` можно получить от хука ```useDispatch```. 

---

## useSelector
* Без функции-селектора:
```js
import { useSelector } from 'react-redux';
function Component() {
    const counter = useSelector(state => state.counter); // речь об этой функции
    return <>{counter}</>;
}
```
* Но лучше перенести эту функцию в стор:
```js
const filteredListSelector = state => {
    if (state.filterChecked) {
        return state.list.filter(item => item.isChecked);
    }
    return state.list;
}
// ...
import { useSelector } from 'react-redux';
// в компоненте
const list = useSelector(filteredListSelector);
```

---

## Вызов dispatch
* Создание экшена налету:
```js
import { useDispatch } from 'react-redux';
// в компоненте:
const dispatch = useDispatch();
// ...
<button onClick={() => dispatch({type: ADD, payload: 'text'})}>Add</button>
```
* Вызов функции создания экшена:
```js
import { useDispatch } from 'react-redux';
// в компоненте:
const dispatch = useDispatch();
// ...
<button onClick={() => dispatch(actionDec())}>-</button>
```

---

## Расширение браузера для Redux
* [Для Хрома](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en).
* [Для Огнелиса](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/).
* [Подключение](https://github.com/zalmoxisus/redux-devtools-extension#11-basic-store):
```js
const store = createStore(
   reducer, /* preloadedState, */
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
```

---

## Расширение браузера для Redux
![Redux Devtools](assets/redux/devtools.png)

----

![Redux Devtools](assets/redux/devtools2.png)

---

## Организация кода
* В одном файле.
  * Подходит только совсем маленьким проектам.
* В папке redux (ducks).
  * Когда планируется много разных сущностей в сторе с несвязанной логикой.
* По фичам.
  * Под каждую фичу отводится своя папка с кусками стора и компонентами.

---

### Пример разбиения
* [Репозиторий](https://github.com/dmitryweiner/redux-store).
* [Видео](https://youtu.be/LIra64O9juo).
* **Внимание!** Во избежание непонятных ошибок из-за циклических импортов:
  * Глобальный initialState должен лежать в индексе стора.
  * initialState отдельных слайсов должны лежать там же, где их редьюсеры.
---

## Папка redux
[Живой пример](https://codesandbox.io/s/9on71rvnyo).

![redux](assets/redux/redux-dirs.png)

---

## Фичи-каталоги
[Живой пример](https://codesandbox.io/s/3x6jx7p0r6)

![redux features](assets/redux/redux-features.png)

---

## Что можно улучшить?
* А как делать асинхронные запросы в сеть?
  * [Redux Thunk](https://github.com/reduxjs/redux-thunk)
* Запутался, какой экшен следует за каким?
  * [Redux Saga](https://redux-saga.js.org/docs/introduction/GettingStarted)
* Селекторы пересчитываются при каждом рендере, помогити!
  * [Reselect](https://github.com/reduxjs/reselect)
* Слишком много разрозненных файлов, можно это будет структура с мутаторами и экшенами?
  * [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
  
---

## Полезные ссылки
* [Руководство на русском](https://rajdee.gitbooks.io/redux-in-russian/content/).
* [Лекция Эндрю Кларка про реакт](https://www.youtube.com/watch?v=ZVYVtUFDf28).
* [Статья на русском](https://tproger.ru/translations/redux-for-beginners/).
* [Работающее приложение](https://codesandbox.io/s/9on71rvnyo).
* [Ещё одно](https://codesandbox.io/s/3x6jx7p0r6).
