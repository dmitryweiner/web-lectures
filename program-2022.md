# Программа курса "Системное программирование" для групп 007са, 007сб, 907а, 907б.
## На самом деле это фронтенд/веб-разработка.

* [HTML](https://dmitryweiner.github.io/lectures/Basic%20-%20HTML.html)
* [CSS](https://dmitryweiner.github.io/lectures/Basic%20-%20CSS.html)
* [JavaScript](https://dmitryweiner.github.io/lectures/Basic%20-%20JS.html)
  * [Введение в язык JavaScript. Основы языка: синтаксис, управляющие конструкции.](https://dmitryweiner.github.io/lectures/JS_part1.html)
  * [Функции. Rest...spread.](https://dmitryweiner.github.io/lectures/JS_part2.html)
  * [Массивы.](https://dmitryweiner.github.io/lectures/JS_part3.html)
  * [Работа с DOM. События.](https://dmitryweiner.github.io/lectures/JS_part4.html)
  * [Асинхронный код. Обработка ошибок. HTTP-запросы.](https://dmitryweiner.github.io/lectures/JS_part5.html)
  * [Map, Set. Даты. Работа с устройствами.](https://dmitryweiner.github.io/lectures/JS_part6.html)
* [Node.js](https://dmitryweiner.github.io/lectures/Basic%20-%20Nodejs.html)
* [NPM](https://dmitryweiner.github.io/lectures/Basic%20-%20NPM.html)
* [TypeScript](https://dmitryweiner.github.io/lectures/Basic%20-%20TypeScript.html)
* [Webpack](https://dmitryweiner.github.io/lectures/Basic%20-%20Webpack.html#/)
* [ESLint + Prettier + Husky](https://github.com/dmitryweiner/lectures/raw/main/old/%D0%9B%D0%B5%D0%BA%D1%86%D0%B8%D1%8F%20eslint%20prettier%20husky.pptx)
* [Git](https://dmitryweiner.github.io/lectures/Basic%20-%20Git.html)

## Лабораторная №1: Список дел
#### а) Вёрстка  HTML

![html](src/assets/programs/html.png)

* Сверстать заготовку будущего веб-приложения.
* В процессе можно пользоваться [презентацией](https://dmitryweiner.github.io/lectures/Basic%20-%20HTML.html#/).

<hr/>

#### б) работа с CSS

![css](src/assets/programs/css.png)

* Написать стили для веб-приложения. Не обязательно, чтоб было как на картинке, главное сам процесс.
* Постараться отцентрировать весь блок горизонтально и вертикально.
* Будет плюсом, если сам список можно будет прокручивать без прокручивания самой страницы.
* В процессе можно пользоваться [презентацией](https://dmitryweiner.github.io/lectures/Basic%20-%20CSS.html#/).

<hr/>

#### в) Оживляем список дел, прикручиваем JS
* Добавить возможность добавления новых элементов.
* Добавить возможность удаления элементов.
* _Задание со звёздочкой:_ Сохранить элементы в [localstorage](https://learn.javascript.ru/localstorage).

<hr/>

#### г) Фильтрация элементов

![filter](src/assets/programs/filter.png)

* Сделать нажимаемыми ссылки внизу. Нажимаешь на ссылку, она становится жирной. Так устанавливается режим фильтрации. 
Можно реализовать это с помощью радиокнопок.
* Сделать фильтрацию в соответствии с выбранным режимом. Нажали на ссылку, список обновился.
* Рефакторинг: вынос кода, обновляющего список, в отдельную функцию render().

<hr/>

## Лабораторная №2: Работа с API
#### а) Выбрать себе API по вкусу:
* [Список интересных API](https://github.com/public-apis/public-apis),
  * [Google Books](https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=oliver%20sacks).
  * [Погода по названию города](https://goweather.herokuapp.com/weather/Curitiba).
  * [Погода по координатам](https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relativehumidity_2m,windspeed_10m).
  * [arXive](http://export.arxiv.org/api/query?search_query=all:electron&start=0&max_results=1).
  * [Орбиты спутников в космосе](https://tle.ivanstanojevic.me/#/browse).
  * [Землетрясения](https://earthquake.usgs.gov/fdsnws/event/1/).
  * [Координаты самолётов (и не только)](https://openskynetwork.github.io/opensky-api/rest.html).
  * [Поиск городов](http://geodb-cities-api.wirefreethought.com/demo).
* [7 публичных API](https://proglib.io/p/7-besplatnyh-api-o-kotoryh-nikto-ne-govorit-2020-12-07?focus=comment)
* [Список рецептов еды](https://spoonacular.com/food-api/docs).
* [Fake users](https://randomuser.me/documentation).
* [NASA](https://api.nasa.gov/).
* [Покемоны](https://pokeapi.co/).
* [Чат](https://github.com/dmitryweiner/mini-chat-server).
* [TODO list](https://github.com/dmitryweiner/todo-server).
* НСКГорТранс:
  * [Список маршрутов](https://map.nskgortrans.ru/listmarsh.php?r=&r=true).
  * [Информация по 23-му автобусу](https://map.nskgortrans.ru/markers.php?r=1-023-W-23%257C)
#### б) Реализовать форму ввода (поиск?), кнопку "отправить" и отображение результатов.
  * При отправке должен отображаться спиннер, который исчезает при получении результатов.
  * Типовой вид формы: 
  ![search form](src/assets/programs/search.png)
#### в) Реализовать дополнительные фичи:
  * Сортировку по какому-либо полю.
  * Фильтрация по категории.
  * Ограничение количества результатов на странице.
  * Типовой вид формы:
  
  ![advanced search form](src/assets/programs/advanced-search.png)

# Программа для тех, кто уже знает JS + CSS + HTML
* [Введение в React.js](https://dmitryweiner.github.io/lectures/React%20-%20Basic.html#/)
* [Функциональные компоненты и хуки](https://dmitryweiner.github.io/lectures/React%20-%20Hooks.html#/)
* [Как работать с формами и контролами](https://dmitryweiner.github.io/lectures/React%20-%20Form%20controls.html#/)
* [Тестирование с помощью testing-library](https://dmitryweiner.github.io/lectures/React%20-%20Testing%20components.html#/)
* [Добавление стилей](https://dmitryweiner.github.io/lectures/React%20-%20Styles%20and%20assets.html#/)
* [Маршрутизация](https://dmitryweiner.github.io/lectures/React%20-%20Router.html#/)
* [Запросы в сеть](https://dmitryweiner.github.io/lectures/React%20-%20Fetch.html#/)
* [TypeScript + React](https://dmitryweiner.github.io/lectures/React%20-%20TypeScript%20with%20React.html#/)

## Лабораторные
Сделать 1 и 2 лабораторные на React.js.

# Задачи на контрольную / диф. зачёт

#### 1. Лайк
На странице отображается чёрное сердечко 🖤. Когда на него кликнули дважды (задержка <= 800 ms),
сердечко становится красным ❤️. По техническим причинам нельзя пользоваться встроенным событием
```onDoubleClick```.

#### 2. Кликер
Написать кликер с возможностью уменьшения и увеличения:

![](src/assets/programs/img.png)

Если число нечётное, то оно красное, иначе зелёное.

#### 3. Измеритель времени реакции. 
Страница показывает красную кнопку. На неё пока нельзя нажимать. Через случайное время (1-10 с)
цвет кнопки меняется на зелёный и на неё надо нажать. После нажатия компонент пишет время между изменением цвета и
нажатием (время реакции среднего человека 0.1-0.2 с).

#### 4. Обратный таймер:

![](src/assets/programs/img_2.png)

Таймер при нажатии кнопки "старт" идёт до 0 и останавливается. Можно остановить кнопкой "стоп".

#### 5. Частоты слов
Многострочное поле ввода, а снизу выводится список слов и сколько раз это слово встретилось.
Обновляется автоматически при изменении поля.

![](src/assets/programs/img_7.png)

#### 6. Калькулятор систем счисления
Калькулятор для перевода в другие системы счисления (2, 8, 16). Результат меняется при изменении полей.

![](src/assets/programs/img_8.png)

#### 7. Калькулятор температур
Сделать калькулятор перевода температур из Цельсия в Фаренгейты и обратно.
При изменении одного поля меняется другое и наоборот.

![](src/assets/programs/img_4.png)

#### 8. Нотификации
Сверстать виджет нотификаций. Он показывает, сколько пришло новых сообщений.
Колокольчик можно отобразить с помощью эмодзи 🔔. Число отображается в виде текста
в круглом `<div>`.

![](src/assets/programs/img_9.png)

#### 9. Кнопка с закруглёнными краями
Сверстать модную кнопку с круглыми краями, белым текстом и оранжевым фоном.
При нажатии на кнопку цвет фона меняется на зелёный.

![](src/assets/programs/img_10.png)

#### 10. Светофор
Реализовать светофор, меняющийся раз в секунду.
Задача со ✨: сделать светофор с показом секунд, как [здесь](src/assets/programs/traffic.gif).

![](src/assets/programs/img_11.png)
