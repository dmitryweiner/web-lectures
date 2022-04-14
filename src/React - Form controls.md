---
title: React - Form controls
---

## React controls

![react controls](assets/react-controls/win31.png)

[все лекции](https://github.com/dmitryweiner/lectures/blob/main/README.md)

[видео](https://drive.google.com/file/d/10gS_1sMo1geO3lKOGANuvBlQa0dXmvv9/view?usp=sharing)

---

### Варианты работы с инпутом

* [Uncontrolled](https://reactjs.org/docs/uncontrolled-components.html)
    * Хранит своё значение сам.
    * Не извещает компонент об изменениях.
    * Получаем его значение через ref (не через ```getElementById```).
    * Нужен например для &lt;input type="file" /&gt;

* [Controlled](https://reactjs.org/docs/forms.html#controlled-components)
    * Текущее значение хранится в стейте.
    * При изменениях меняет стейт. 

---

### Варианты uncontrolled

* Поле только для чтения (гвоздями прибито некоторое значение).
```jsx
<input value={123} readOnly={true} />
```

* Установлено начальное значение, но может изменяться.
```jsx
<input defaultValue={123}/>
```  

* defaultValue можно применять и для controlled-полей.

---

### События

У инпута случаются разнообразные события:
* onChange: значение изменилось.
* onClick: кликнули.
* onFocus: компонент получил фокус ввода.
* onBlur: компонент потерял фокус ввода.
* onSubmit: отправка формы.
* [Полный список](https://www.w3schools.com/jsref/dom_obj_event.asp)
* [Список с объяснениями](https://www.w3schools.com/tags/ref_eventattributes.asp)

---

### Работа с событиями
* В обработчик события приходят данные о свершившемся событии.
```jsx
function Component() {
    function handleChange(event) {
        console.log(event);
    }
    return <input onChange={handleChange} />;
}
```
* event: произошедшее событие.
* event.target: DOM-элемент, в котором оно произошло.
* event.target.value: текущее значение элемента (кроме чекбокса).
* event.target.checked: значение чекбокса.
---

### Вмешательство в работу событий
* Событие [всплывает](https://learn.javascript.ru/event-bubbling), обрабатываясь в обработчиках всё более высоких порядков.
* В случае формы это вызывает нежелательную перезагрузку страницы.
* Этому можно помешать, вызвав метод ```preventDefault``` у события.
```jsx
function Form() {
    function handleSubmit(event) {
        event.preventDefault(); // Отмена отправки формы
    }
    return <form onSubmit={handleSubmit}>
        <input/>
        <button type="submit">Отправить</button>
    </form>;
}
```
---

### Вмешательство в работу событий
* Переход по ссылке тоже может быть нежелательным, его можно предотвратить.
* [Работа с дефолтными действиями](https://learn.javascript.ru/default-browser-action).
```jsx
function Link() {
    function handleClick(event) {
        event.preventDefault();
    }
    return <a href="#" onClick={handleClick}>Click me!</a>;
}
```

---

### Текстовое поле
* Пример текстового поля, сохраняющего значение в стейт:

<input value="42" />

Вы ввели: 42

```jsx
function TextField() {
    const [text, setText] = useState('');
    function handeChange(event) {
        setText(event.target.value);
    }
    return <>
        <input value={text} onChange={handeChange} />
        Вы ввели: {text}
    <>;
}
```
---

### Кнопка
* Пример обработчика кнопки:

<button>Нажми меня!</button>

```jsx
function Button({ title }) {
    function handeClick() {
        console.log('Аааа, меня нажали!!!');
    }
    return <button onClick={handeClick}>{title}</button>;
}
```
---

### Текстовое поле

```jsx
<input type="text" value={value} onChange={changeHandler} />
```

* Типы текстового поля (значение свойства type):
    * text: <input type="text" value="abc" />
    * number: <input type="number" value="123" />
    * email: <input type="email" value="test@test.ru" />
    * password: <input type="password" />
    * date: <input type="date" />
* Поддерживается не всеми браузерами.
---

### Чекбокс
* Особенности:
  * В событии ```event.value.checked```.
  * Значение чекбокса ```<input checked={true|false} />```.

<label><input type="checkbox" />Выбери меня!</label>

```jsx
function Checkbox() {
    const [isChecked, setIsChecked] = useState(false);
    return <>
        <input
            type="checkbox"
            checked={isChecked} // тут внимательно, не value 
            onChange={e => setIsChecked(e.target.checked)}/>
        {isChecked ? 'checked' : 'not checked'}
    </>;
}
```
---

### Радио-кнопки
* Объединяются в группу по одному и тому же name:

```jsx
function Radio() {
    const [value, setValue] = useState(0);
    return <>
        <label>
            <input
                type="radio"
                name="radioName"
                checked={value === 0}
                onChange={() => setValue(0)} />
            To be
        </label>
        <label>
            <input
                type="radio"
                name="radioName"
                checked={value === 1}
                onChange={() => setValue(1)} />
            or not to be
        </label>
        You selected: {value}
    </>;
}
```
---

### Радио-кнопки поумнее
* Разумнее выносить варианты выбора в массив:

<input type="radio" name="r">Быть</input>
<input type="radio" name="r">Не быть</input>

```jsx
const variants = ['to be', 'or not to be'];
function Radio() {
    const [value, setValue] = useState(0);
    return <>
        {variants.map((variant, index) => <label key={index}> // тут можно index, если массив не меняется
            <input
              type="radio"
              name="radioName"
              checked={value === index}
              onChange={() => setValue(index)} />
            {variant}
        </label>)}
        You selected: {variants[value]}
    </>;
}
```
---

### Ползунок

<input type="range"/>

```jsx
function Range({ max = 0, min = 100 }) {
  const [value, setValue] = useState(0);
  function handleChange(e) {
    // ВНИМАНИЕ! Явное приведение к Int,
    // т.к. из события приходит СТРОКА
    setValue(Number.parseInt(e.target.value));
  }
  return <>
    <input
      type="range"
      value={value}
      onChange={handleChange}
    />
    Current value: {value}
  </>;
}
```
---

### Селектбокс

<select>
  <option>Воронеж</option>
  <option>Рио-де-Жанейро</option>
</select>

```jsx
const variants = ['Воронеж', 'Рио-де-Жанейро'];
function Select() {
  const [value, setValue] = useState(0);
  return <>
    <select onChange={e => setValue(e.target.value)}>
        {variants.map((variant, index) => (
            <option key={index} value={index}>
                {variant}
            </option>
        ))}
    </select>
    Selected: {variants[value]}
  </>;
}
```
---

### Селектбокс поумнее

* Идея в том, чтобы вынести варианты в структуру и сравнивать с ней в дальнейшем.

```js
const variants = {
    ADD: '+',
    SUBSTRACT: '-',
    DIVIDE: '/',
    MULTIPLY: '*'
};
````

* Так можно получить ключи объекта (ADD, MULTIPLY, ...):

```js
Object.keys(variants)
```

* А так можно получить его значения (+, -):

```js
Object.values(variants)
```

---

### Селектбокс поумнее

```jsx
function Select() {
  const [value, setValue] = useState(0);
  return <>
    <select onChange={e => setValue(e.target.value)}>
        {Object.values(variants).map((variant, index) => (
            <option key={index} value={variant}>
                {variant}
            </option>
        ))}
    </select>
  </>;
}

// где-то в обработчике:
if (selected === variants.ADD) {
    //...
}
```
---

### Множественный селектбокс

<select multiple>
  <option>Воронеж</option>
  <option>Астрахань</option>
  <option>Брянск</option>
</select>

```jsx
const variants = ['Воронеж', 'Астрахань', 'Брянск'];
function MultipleSelect() {
  const [value, setValue] = useState([]); // Начальное значение изменилось
  function handleChange(event) {
      setValue(Array.from(event.target.selectedOptions, item => item.value));
  }
  return <>
    <select multiple={true} onChange={handleChange}>
        {variants.map((variant, index) => (
            <option key={index} value={index}>
                {variant}
            </option>
        ))}
    </select>
    Selected: {value.join(',')}
  </>;
}
```
---

![Попьём-ка чайку](assets/react-controls/updating-state.jpeg)

