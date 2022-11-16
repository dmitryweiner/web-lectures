
## Express.js

![express.js logo](assets/express/orelly.jpeg)

[все лекции](https://github.com/dmitryweiner/lectures/blob/main/README.md)

Видео: [1](https://youtu.be/ykNZrjuyQZY), [2](https://youtu.be/5riqB93BSsM)
---

### Express.js
* Создан в 2010.
* Создатель [TJ Holovaychik](https://github.com/tj) ([твитор](https://twitter.com/tjholowaychuk)).
![TJ Holovaychik](assets/express/holowaychik.jpeg)
---

### Особенности
* Де факто стандарт в бэкенде на Node.js.
* Лицензия [MIT](https://ru.wikipedia.org/wiki/%D0%9B%D0%B8%D1%86%D0%B5%D0%BD%D0%B7%D0%B8%D1%8F_MIT).
* Написан по мотивам [Sinatra](https://ru.wikipedia.org/wiki/Sinatra).
* Часто используется с MongoDB, и с React/Angular/Vue ([MEAN](https://ru.wikipedia.org/wiki/MEAN_(%D0%B2%D0%B5%D0%B1-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0))).

---

### Установка
* Установка библиотеки:
```shell
npm i express
```
* Настройка запуска в ```package.json -> scripts```:
```json
"scripts": {
    // ...
    "start": "node index.js"
}
```
* Или запуск с помощью [```nodemon```](https://github.com/remy/nodemon):
```shell
npm i nodemon
```
```json
    "start": "nodemon index.js",
```
---

### Минимальный сервер
```js
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Hello World!'); // отправка ответа
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});
```
---

### Статический сервер
* Express может работать, как сервер статики.
```js
// можно указать, из какого каталога брать файлы
app.use(express.static('public'));
// можно указать, какой URL отвечает за статику
app.use('/media', express.static('public'));
```
---

### Общая идеология обработчиков
* Нужно описать обработчики разной степени специфичности.
* Express ищет обработчик, подходящий к запросу.
* Обработчик может либо:
  * послать ответ; 
  * отправить запрос дальше по цепочке в следующий подходящий обработчик;
  * выкинуть ошибку;
* Порядок объявления обработчиков важен.
---

### Общий вид обработчика

![req res handler](assets/express/req-handler.png)

* Реакция только на GET /
```js
app.get('/', (req, res) => {
    res.send('Hello World!');
});
```
----
* Реакция на определённый URL:

```js
app.use('/admin', function (req, res, next) { // GET 'http://www.example.com/admin/new?sort=desc'
    next();
})
```
* Делает ровно то же:

```js
app.all('/admin', function (req, res, next) { // GET 'http://www.example.com/admin/new?sort=desc'
    next();
})
```
---

### Объект req
* Очень полезный объект, хранит в себе информацию о запросе:
* Тело запроса ```req.body```.
* Кукисы ```req.cookies```.
* [Документация](https://expressjs.com/ru/4x/api.html#req).
---

### Разбор тела POST-запроса
* Предполагаем, что клиент шлёт запросы с заголовком `Content-Type: application/json`:

```js
const express = require('express');
const app = express();

// Для запросов с заголовком Content-Type: application/json
app.use(express.json());

app.post('/profile', function (req, res, next) {
    console.log(req.body);
    res.json(req.body);
})
```
---

### Объект res
* Позволяет отправить [HTTP-статус](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).
* Заголовки.
* Тело ответа.
* [Документация](https://expressjs.com/ru/4x/api.html#res).
---
### Объект res
* Отправка только статуса:

```js
res.status(201).send();
```
* Отправка текста:

```js
res.send('Some text');
```
* Отправка JSON:

```js
res.json({ a: 1 });
```
* Можно статус и ответ:

```js
res.status(201).json({ b: 2 });
```
---

### Метод next()
* Позволяет передать управление в следующий подходящий обработчик.
* Если ответ уже задан, его не получится изменить в следующих обработчиках.
* Можно передать в next() ошибку, чтобы она была обработана другим обработчиком.
```js
next(new Error('Not found'));
```
---

### Обработка ошибок
* Можно задать специальный обработчик (у него должно быть 4 параметра), который будет перехватывать ошибки
и как-то красиво их выводить:
```js
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});
```
* [Пример](https://github.com/dmitryweiner/todo-server/blob/main/server/index.js).
---

### Работа с куками
Чтение:
* Для начала надо поставить cookie-parser:
```shell
npm i cookie-parser
```
* Подключить парсер:
```js
const cookies = require("cookie-parser");
app.use(cookies());
```
* Чтение в обработчике:
```js
app.get("/", (req, res) => {
    console.log(req.cookies);
});
```
---

### Работа с куками
* Запись ([документация](https://expressjs.com/ru/4x/api.html#res.cookie)):

```js
res.cookie(
    'cookieName',
    value,
    { 
        maxAge: 900000, 
        httpOnly: true
    }
);
```

[Что значат все эти параметры](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
---

### RESTful API
* Для удобства использования и разработки API организуется по методике [RESTful API](https://ru.wikipedia.org/wiki/REST).
![RESTful](assets/express/task_api.png)
---

### Роуты
* Удобно организованное API делится на сущности.
* До каждой сущности свой URL.
  
![rest api entities](assets/express/entity-rest-crud.png)
---

### Роуты
* Это можно реализовать вот так:

```js
const express = require('express');
const router = express.Router();
router.get('/', (req, res, next) => {
    // get all items
});
router.get('/:id', (req, res, next) => {
    // get item by ID
});
router.post('/', (req, res, next) => {
    // create item
});

// Ключевая строчка!
// обработчики будут слушать по адресу 
// http://mydomain.com/items/...
app.use('/items', router);
```
* [Документация](https://expressjs.com/ru/guide/routing.html).
* [Ещё документация](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes).
---

### Параметры из роута
* В роуте могут содержаться параметры (например, ID).
* Их можно удобно получать из объекта ```req```:
```js
router.get('/:id', (req, res) => {
    console.log(req.params.id);
});
```
---

### Промежуточные обработчики (middleware)
* Можно писать свои собственные обработчики для отлавливания ошибок, преобразования данных.
* Порядок вызовов обработчиков зависит от **порядка объявления**.
* Общий вид обработчика:

```js
let middlewareFunction = function(req, res, next) {
    // ... тут какие-то полезные действия
    next(); // надо вызвать next() чтобы передать управление дальше по цепочке
}
```
---

### Middleware
```js
const express = require('express');
const app = express();
let middlewareFunction = function(req, res, next) {
    // ... тут какие-то полезные действия
    next(); // надо вызвать next() чтобы передать управление дальше по цепочке
}
// для всех роутов и методов запроса
app.use(middlewareFunction);
// для определённого роута
app.use('/someroute', middlewareFunction);
// для определённого роута и метода GET
app.get('/', middlewareFunction);
app.listen(3000);
```
---

### Готовые middleware
* Можно использовать удобные middleware для разнообразных действий:
* Для междоменных запросов: [CORS](https://github.com/expressjs/cors#readme).
* Для загрузки изображений: [multer](https://github.com/expressjs/multer).
* Логгирование: [morgan](https://github.com/expressjs/morgan#readme).
---

### CORS
* Для корректной работы 
  [междоменных запросов](https://ru.wikipedia.org/wiki/Cross-origin_resource_sharing)
  необходимо отправлять соответствующие заголовки.
* Это удобно делать с помощью библиотеки [CORS](https://github.com/expressjs/cors#readme):
```shell
npm i cors
```
```js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(
    cors({
        credentials: true, // чтобы работали secured куки
        origin: true // автоматом подставляется текущий сервер в Origin
    })
);
```
---

### Логгирование
* Можно пользоваться удобной библиотекой [morgan](https://github.com/expressjs/morgan#readme):
```js
const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('combined'));
```
* [Список режимов](https://github.com/expressjs/morgan#predefined-formats).
---

### Аутентификация
* Для аутентификации используется кука, хранящая сессионный токен.
* У куки должны быть следующий параметры ([подробнее](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)):
  * httpOnly=true: чтобы кука была не видна в JS: document.coockies.
  * sameSite=none: чтобы можно было обращаться с другого домена (если это необходимо).
  * secure=true: чтобы куки ходили только через HTTPS.
---

### Алгоритм логина
* Вытащить пользователя из базы.
  * Если нет пользователя, возвращаем 404 с сообщением, что пользователь не найден.
* Проверить, что пароль пользователя совпадает с паролем из базы (хешированный, конечно).
  * Если не совпадает, возвращаем 401 с сообщением, что пароль не тот.
* Сгенерировать токен, сложить его в базу вместе с user_id.
* Отправить куку пользователю (httpOnly!), в которой лежит токен.
---

### Пример реализации логина
```js
authRouter.post("/", (req, res) => {

    const user = getUserByLogin(req.body.login);

    if (!user) {
        return res.status(404).json({
            message: "Такой пользователь не найден"
        });
    }

    if (user.password !== req.body.password) { // TODO: hash
        return res.status(400).json({
            message: "Пароль неверный"
        });
    }

    const token = addToken(user.id);
    res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // TODO: to const
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production'
    });

    res.status(200).json({ok: true});
});
```
Из проекта [express-auth-example](https://github.com/dmitryweiner/express-auth-example/blob/master/server/routes/auth.js)
---

### Пояснения про sameSite и secure
* Почему такой код?
```js
sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
secure: process.env.NODE_ENV === 'production'
```
* На dev-контуре мы работаем с доменом `localhost`, но по протоколу HTTP (не HTTPS).
Поэтому нужно отключить secure, тогда придётся sameSite=lax.
* На prod-контуре мы работаем с __разными__ доменами, но по протоколу HTTPS, поэтому мы
можем отключить sameSite, включив secure.
* [Подробнее про sameSite и secure](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies).
---

### Алгоритм проверки, залогинен ли
* Прочитать токен из куки.
  * Нет токена - статус 401, сообщение "не авторизован".
* Проверить, есть ли такой токен в базе. Проверить время жизни, если есть.
  * Нет токена или протух - статус 401, сообщение "не авторизован".
* Если всё хорошо, продолжаем работу.
---

### Пример реализации проверки
```js
userRouter.get("/", (req, res) => {
    const token = req.cookies.token;
    const userId = getUserIdByToken(token);
    if (!userId) {
        return res.status(401).json({
            message: "Пользователь не авторизован"
        });
    }

    const user = getUserById(userId);
    res.status(200).json(user);
});
```
Из проекта [express-auth-example](https://github.com/dmitryweiner/express-auth-example/blob/master/server/routes/user.js)
---

### Аутентификация
* Готовая аутентификация сделана в следующих репозиториях:
  * [express-auth-example](https://github.com/dmitryweiner/express-auth-example).
  * [mini-chat-server](https://github.com/dmitryweiner/mini-chat-server).
* Для хранения сессии можно использовать библиотеку [express-session](https://github.com/expressjs/session).
* Для приемлемой защищенности лучше всего использовать JWT-аутентификацию с библиотекой
[express-jwt](https://github.com/auth0/express-jwt).
---

### Тестирование
* Для юнит-тестирования применяется [```jest```](https://jestjs.io/docs/getting-started).
* Для сквозного тестирования применяется библиотека [supertest](https://github.com/visionmedia/supertest#readme).
* [Статья про тестирование](https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/),
  [ещё статья](https://hackernoon.com/api-testing-using-supertest-1f830ce838f1).
---

### Supertest
* Установка:
```shell
npm -D supertest
```
* Разобщаем слушателя и сам сервер:
```js
//server.js
const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});
module.exports = app;
```
```js
//index.js <-- то, что запускается через npm start
const app = require('./server');
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
```
---

### Supertest
* Сам тест:

```js
const request = require('supertest');
const app = require('../../src/app');
test('It should response the GET method', async () => {
  const response = await request(app).get('/');
  expect(response.statusCode).toBe(200);
});
```
* [Примеры тестов](https://github.com/dmitryweiner/mini-chat-server/tree/master/tests).
---

### Простейший сервер
Для примера написан простейший сервер, который хранит коллекцию объектов.

* API
  * ```GET /``` получить всю коллекцию.
    ```json
    [ 
        { "id": "123", "test": "test" }
    ]
    ```
  * ```GET /:id``` получить элемент по ID.
    ```json
    {"id":  "123", "test": "test"}
    ```
  * ```POST /``` добавить элемент в коллекцию.
  * ```DELETE /:id``` удалить элемент по ID.
----

```js
const express = require('express');
const app = express();
app.use(express.json());
let items = [];
app.get('/', (req, res) => {
    res.json(items);
});
app.get('/:id', (req, res) => {
    const item = items.find(item => item.id === req.params.id);
    res.json(item);
});
app.delete('/:id', (req, res) => {
    items = items.filter(item => item.id !== req.params.id);
    res.status(200).send();
});
app.post('/', (req, res) => {
    const newItem = req.body;
    newItem.id = Math.random().toString(36).substr(2);
    items.push(newItem);
    res.status(201).json(newItem);
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});
```
---

### Полезные ссылки
* [Шикарная документация](https://expressjs.com/ru/4x/api.html).
* [Документация](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction).

* Демо-проекты: 
  * [express-auth-example](https://github.com/dmitryweiner/express-auth-example).
  * [mini-chat-server](https://github.com/dmitryweiner/mini-chat-server).
  * [todo-server](https://github.com/dmitryweiner/todo-server).
