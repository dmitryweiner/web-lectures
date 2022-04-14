---
title: JS часть 4
---

### JavaScript
#### Работа с DOM
#### События


![js](assets/js/js-logo.png)

[все лекции](https://github.com/dmitryweiner/lectures/blob/main/README.md)

[видео](https://drive.google.com/file/d/1i-5_uKDIrqbF7kTomPHKfkV1xq-v8-gu/view?usp=sharing)
---

### Обращение к DOM'у
* Поиск элементов DOM осуществляется с помощью следующих методов:
    * document.getElementById().
    * document.querySelector().
    * document.querySelectorAll().
    * document.getElementsByTagName().
    * document.getElementsByClassName().
    * document.getElementsByName().
* [Подробнее](https://learn.javascript.ru/searching-elements-dom).
---

### Поиск элемента по ID
```html
<div id="root"></div>
<script>
  const element = document.getElementById("root");
  console.log(element);
</script>
```
---

### Поиск элемента по [CSS-селектору](https://developer.mozilla.org/ru/docs/Web/CSS/CSS_Selectors)
```html
<ul>
  <li class="selected">Купить еды</li>
  <li>Посадить картошку</li>
</ul>
<script>
  const element = document.querySelector("ul li.selected");
  console.log(element); // <li class="selected">Купить еды</li>
</script>
```
---

### Оси родитель-потомок и другие
* У найденного элемента можно посмотреть его потомков:
    * childNodes.
    * firstChild.
    * lastChild.
* И его родителя:
    * parentNode.
* [Подробнее](https://learn.javascript.ru/dom-navigation).
---

![DOM axis](assets/js/dom-axis.png)
---

### Коллекции
* Методы поиска по DOM querySelectorAll, getElementsByName и др. возвращают коллекции узлов.
* Коллекции могут быть итерированы с помощью for..of:
```js
for (let node of document.body.childNodes) {
    conslole.log(node); // покажет все узлы из коллекции
}
```
* Коллекцию можно конвертировать в массив для фильтрации или сортировки:
```js
const arr = Array.from(document.body.childNodes);
```
---

### Живые коллекции
* Коллекции являются [живыми](https://htmlacademy.ru/blog/boost/frontend/collections-js) (кроме querySelectorAll) и динамически обновляются при изменении DOM.
* Если мы сохраним ссылку на elem.childNodes и добавим/удалим узлы в DOM, то они появятся в сохранённой коллекции автоматически.
---

### Изменение свойств
* У найденных узлов можно читать и изменять всевозможные свойства:
    * **.innerText**: текст внутри узла.
    * **.innerHTML**: если туда нужно добавить HTML.
    * **.style**.
    * **.width**.
    * **.value** (только для input).

```html
<div id="root"></div>
<script>
  const element = document.getElementById("root");
  element.innerText = "123";
</script>
```
---

### Чтение свойств
* Точно так же можно прочитать свойства DOM-элементов.
* Это может пригодиться, если надо узнать, что пользователь ввёл в поле ввода:

```html
<input type="text" id="userInput" />
<script>
  const userInput = document.getElementById("userInput");
  console.log(userInput.value);
</script>
```
---

### Создание элементов
* Для создания элемента можно использовать метод document.createElement:
```html
<div id="root"></div>
<script>
  const newElement = document.createElement("span");
  newElement.innerHTML = "Я просто маленький текстовый элемент";
  document.getElementById("root").appendChild(newElement);
</script>
```
---

### Создание текста
* Для добавления текста можно вызвать `createTextNode`:
```html
<div id="root"></div>
<script>
  const newText = document.createTextNode("текстовый элемент");
  document.getElementById("root").appendChild(newText);
</script>
```
---

### Создание элементов
* Есть способ попроще:

```html
<div id="root"></div>
<script>
  document.getElementById("root")
          .innerHTML = "<span>Текстовый элемент</span>";
</script>
```
---

![inner HTML](assets/js/innerHTML.png)
---

### Удаление элементов
* Находим родителя нужного элемента и удаляем потомка через него:

```html
<div id="root">
  <div id="willBeDeleted"></div>
</div>
<script>
    const element = document.getElementById("willBeDeleted");
    element.parentElement.removeChild(element);
</script>
```
---

### Обработчики
* Обработчики событий DOM-элементов добавляются с помощью **addEventListener**.
* Удаляются с помощью **removeEventListener**.
```html
<button id="button">Click me!</button>
<script>
    const element = document.getElementById("button");
    element.addEventListener("click", () => {
      console.log("Button clicked!");
    });
</script>
```
* Устаревший способ:
```html
<button id="button" onclick="onClickHandler()">Click me!</button>
```
---

![click event](assets/js/clickEvents.png)
---

### Типы событий
* DOM-элементы генерируют огромное множество событий. Самые частые:
    * **click**: клик по элементу.
    * **change**: поле ввода изменилось.
    * **blur**: с поля ввода ушёл фокус.
    * **focus**: пришёл фокус.
    * **submit**: форма отправлена.
* [Список всех событий](https://developer.mozilla.org/ru/docs/Web/Events).
---

### Event
* На вход обработчику приходит событие, из которого можно получить
  [много полезной информации](https://developer.mozilla.org/ru/docs/Web/API/Event).
* Поля события зависят от элемента, от которого оно пришло.
* Если это текстовое поле, то результат ввода лежит в **event.target.value**.
* Если это чекбокс, то состояние лежит в **event.target.checked**.

```js
const checkbox = document.getElementById("checkbox");
checkbox.addEventListener("click", event => {
    console.log(event.target.checked);
});
```
---

### Обработчик загрузки страницы
* Вначале выполняются скрипты, подключенные во внешних файлах, потом скрипты в блоке head, потом скрипты в body.
* Когда выполняются скрипты в файлах, DOM ещё не построен, поэтому `getElementById` будет возвращать `null`.
* Чтобы так не было, надо подписаться на событие `DOMContentLoaded`, а в обработчике искать нужные элементы.
---

### Обработчик загрузки страницы
```js
// script.js
const element = document.getElementById("button");
console.log(element); // null!
document.addEventListener("DOMContentLoaded", () => {
  const element = document.getElementById("button");
  element.addEventListener("click", () => {
    console.log("Button clicked!");
  });
});
```

Или проще использовать свойство [`defer`](https://learn.javascript.ru/script-async-defer):
```html
<script defer src="script.js"></script>
```
---

### Отправка формы
```html
<form id="form">
  <input type="text" id="userInput" />
  <button type="submit">Send</button>
</form>
<script>
  const form = document.getElementById("form");
  form.addEventListener("submit", event => {
    /**
     * Внимание!
     * Нужно вызвать preventDefault, 
     * чтобы форма не перезагружала страницу.
     */
    event.preventDefault();  
    const userInput = document.getElementById("userInput");
    console.log(userInput.value);
  });
</script>
```
---

### Игра "Нажми на кнопку"
```html
<button id="button" style="position: absolute">
  click me!
</button>
<script>
  const button = document.getElementById("button");
  button.style.top = window.innerHeight/2 + "px";
  button.style.left = window.innerWidth/2 + "px";
  const x = Math.random() * (window.innerHeight - button.clientHeight);
  const y = Math.random() * (window.innerWidth - button.clientWidth);
  button.addEventListener("mouseenter", () => {
      button.style.top = x + "px";
      button.style.left = y + "px";
  });
</script>
```

---

### Полезные ссылки
* https://learn.javascript.ru/searching-elements-dom
* https://learn.javascript.ru/dom-navigation
* https://learn.javascript.ru/script-async-defer
