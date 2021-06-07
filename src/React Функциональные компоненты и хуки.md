---
title: Лекции по фронтенду - React функциональные компоненты и хуки
---

## Функциональные компоненты в React

![Капитан Крюк](assets/fc/captain.png)

[Дмитрий Вайнер](https://github.com/dmitryweiner)

[видео](https://drive.google.com/file/d/11hBKHlofUsjI8aN4ccc4HTFfwsykzH6s/view?usp=sharing)

---

### Функциональный компонент VS компонент класс

![functional component vs class](assets/fc/fc-vs-classes.gif)

---

### Функциональный компонент VS компонент класс

| Class | FC |
|-------|----|
| Есть конструктор  |  Редуцирован до рендер функции  |
| Есть методы жизненного цикла | Вместо этого хуки |
| Перерисовывается, когда меняются props и state | Перерисовывается, когда меняются props и работают хуки (useState) |
---

### Компонент-представление

#### Было

```javascript
class ShowSomething extends React.Component {
    render() {
        return <span>{this.props.somethingToShow}</span>;
    }
}
```

#### Стало

```javascript
function ShowSomething({ somethingToShow }) {
    return <span>{somethingToShow}</span>;
}
```

---

### У функции тоже может быть состояние

![Состояние у функции](assets/fc/functions-state.png)

---

### Список хуков

* Базовые
  * useState
  * useEffect
  * useContext
* Дополнительные
  * useRef
  * useMemo
  * useCallback
  * useReducer
    
[Полный список](https://reactjs.org/docs/hooks-reference.html)

---

### Правила вызова хуков
* Вызовы хуков должны располагаться на первом уровне вложенности компонента-функции
* Нельзя оборачивать их в условные конструкции или циклы
* Т.к. реакту важен порядок вызова хуков, если он изменится, начнутся _странности_
[Подробнее](https://reactjs.org/docs/hooks-rules.html)

---


### Аналогии с методами жизненного цикла

| Class | FC |
|-------|----|
| конструктор, выполняется один раз при создании |  - |
| componentDidMount | useEffect(() => {}, [])  |
| componentWillUnmount | useEffect(() => { return () => {}}, [])  |
| this.state, setState() | useState |
| this.value | useRef |

---

### useState

```javascript
const [value, setValue] = useState(initialValue);
```

* value &mdash; текущее значение: когда меняется, компонент перерисовывается.
* setValue(newValue) &mdash; метод установки нового значения.
* setValue может принимать на вход функцию prevValue => nextValue.  
* initialValue &mdash; начальное значение.

[документация](https://reactjs.org/docs/hooks-reference.html#usestate)

---

### Было: компонент со стейтом

```javascript
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: props.initialCount
        };
    }
    render() {
        const { count } = this.state;
        return <>
            <button>
                onClick={() => this.setState({ count: count + 1 })}>
                Click me!
            </button>
            { count }
        </>;
    }
}
```
---

### Стало: функциональный компонент со стейтом

```javascript
function ShowSomething({ initialCount }) {
    const [count, setCount] = useState(initialCount);
    return <>
        <button>
            onClick={() => setCount(count + 1)}>
            Click me!
        </button>
        { count }
    </>;
}
```
---

### useEffect

* Выполняется после коммита рендера
* Можно имитировать методы componentDidMount и componentDidUpdate
* useEffect вызывается асинхронно, сразу после того, как применится изменение к DOM. То есть он гарантирует,
  что он будет выполнен после рендера компонента, и может привести к следующему рендеру, если какие-то 
  значения изменятся.

---

### useEffect

```javascript
useEffect(() => {
    /* effect code */ 
    return () => {/* shutdown code */};
}, [dependencies]);
```

* Принимает на вход колбек и зависимости
* Колбэк возвращает метод, который будет вызван в следующий цикл отрисовки (аналог componentWillUnmount)

[документация](https://reactjs.org/docs/hooks-reference.html#useeffect)

---

### useEffect: особенности
* Если не передать второй параметр (или передать null), эффект будет вычисляться каждый рендер.
* Если передать вторым параметром пустой массив, эффект выполнится 1 раз (componentDidMount).
* Сравнение "изменился ли" происходит по ссылке, поля объекта не сравниваются.
* [Документация: про второй параметр, зависимости](https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect).
* [Хорошее объяснение](https://overreacted.io/a-complete-guide-to-useeffect/).

---

### Компонент-класс Таймер
Напишем компонент в старом стиле. При монтировании этого компонента начинает идти таймер. 
При удалении таймер останавливается.
```javascript
class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { time: 0 };
        this.timerId = null;
    }
    componentDidMount() {
        this.timerId = setInterval(() => this.setState({ time: this.state.time + 1 }), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timerId);
    }
    render() {
        const { time } = this.state; 
        return <span>{time}</span>;
    }
}
```

---

### Функциональный компонент Таймер
Перепишем компонент в виде функции с использованием useState

Обратите внимание на переменную innerTime. Её необходимо использовать, потому что прямое использование
переменной time ссылается на замыкание, где та не меняется

---

### Функциональный компонент Таймер
```javascript
function Timer() {
    const [time, setTime] = useState(0);
    useEffect(() => {
      let innerTime = time;
      const timerId = setInterval(
              () => {
                innerTime++;
                setTime(innerTime);
              },
              1000
      );
      return () => {
        clearInterval(timerId);
      };
    }, []);
    return <span>{time}</span>;
}
```

---

### Функциональный компонент Таймер
Можно написать без добавочной переменной, используя свойство сеттера принимать на вход функцию
```javascript
function Timer() {
    const [time, setTime] = useState(0);
    useEffect(() => {
      const timerId = setInterval(
              () => setTime(time => time + 1),
              1000
      );
      return () => {
        clearInterval(timerId);
      };
    }, []);
    return <span>{time}</span>;
}
```

---

### useMemo
Поскольку компонент-функция вызывается каждый раз, когда меняются пропсы и стейт,
все вычисления в теле этой функции выполняются заново.

Если они тяжелые (типа вычисления числа π), хорошо бы результат кешировать.

Иными словами мемоизировать.

---

### useMemo

```javascript
const value = useMemo(() => hardCaclulations(), [dependencies]);
```
* value &mdash; мемоизированное значение
* hardCaclulations() &mdash; функция, выполняющая тяжёлые вычисления
  * обратите внимание на то, как она вызвана: нужно в useMemo передать именно функцию, а не значение
* dependencies &mdash; зависимости (когда они меняются, перевычисляется значение)

[живой пример](https://codepen.io/dmitryweiner/pen/JjYxBVp?editors=0010)

[документация](https://reactjs.org/docs/hooks-reference.html#usememo)

---

### useCallback

Иногда требуется мемоизировать функцию, чтобы она не создавалась каждый рендер.

Это бывает нужно, когда создание функции &mdash; дорогая операция, или если не надо, чтобы она менялась.

---

### useCallback

```javascript
const memoCallback = useCallback(
    (params) => callback(params),
    [dependencies]
);
```
* memoCallback &mdash; мемоизированная функция
* callback(params) &mdash; исходная функция
* dependencies &mdash; зависимости (при изменении функция пересоздаётся)

[живой пример](https://codepen.io/dmitryweiner/pen/gOaqdda?editors=0010)

[документация](https://reactjs.org/docs/hooks-reference.html#usememo)

---

### useReducer

Разработчики вдохновились идеей Redux и реализовали этот хук

```javascript
const initialState = {/*...*/};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {/* new state */};
    default:
      throw new Error();
  }
}
const [state, dispatch] = useReducer(reducer, initialState, init);
```

[живой пример](https://codepen.io/dmitryweiner/pen/YzyBBoQ?editors=0010), [документация](https://reactjs.org/docs/hooks-reference.html#usereducer)

---

### useContext

Способ пробрасывания переменных вглубь дерева потомков 
без непосредственного указывания этих данных в промежуточных узлах.

[документация](https://reactjs.org/docs/hooks-reference.html#usecontext)

---

### useRef

Хук для создания переменной, значение которой сохраняется между рендерами.

В отличие от useState, изменение этой переменной не вызывает ререндер.

```javascript
function Timer() {
  const intervalRef = useRef();
  useEffect(() => {
    const id = setInterval(() => {/* ... */});
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  });
}
```

[документация](https://reactjs.org/docs/hooks-reference.html#useref)

---

### useRef

Обычно useRef используют для доступа к DOMу

```javascript
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
          <>
            <input ref={inputEl} type="text" />
            <button onClick={onButtonClick}>Focus the input</button>
          </>
  );
}
```

---

### Библиотека кастомных хуков

* Не стоит писать свой велосипед, если есть [react-use](https://github.com/streamich/react-use)
* Полезные хуки
  * [useList](https://github.com/streamich/react-use/blob/master/docs/useList.md)
  * [useAsync](https://github.com/streamich/react-use/blob/master/docs/useAsync.md)
  * [useKeypress](https://github.com/streamich/react-use/blob/master/docs/useKeypress.md)
  * [useHover](https://github.com/streamich/react-use/blob/master/docs/useHover.md)
  * [useWindowSize](https://github.com/streamich/react-use/blob/master/docs/useWindowSize.md)

---

## Полезные ссылки
https://overreacted.io/how-are-function-components-different-from-classes/

---

## Спасибо за внимание

![Good bye sweet prince](assets/fc/meme.jpg)
