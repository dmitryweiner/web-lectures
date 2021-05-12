---
title: Лекции по фронтенду - Express js
---

## Express.js

![express.js logo](assets/express/orelly.jpeg)

[Дмитрий Вайнер](https://github.com/dmitryweiner)

[видео](https://youtu.be/ykNZrjuyQZY)
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
* Настройка запуска в ```package.json```:
```json
"scripts": {
    "start": "node index.js",
```
* Или запуск с помощью [```nodemon```](https://github.com/remy/nodemon):
```shell
npm i nodemon
```
```json
"scripts": {
    "start": "nodemon index.js",
```
---

### Минимальный сервер
```js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
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

### Объект res
* Позволяет отправить HTTP-статус.
* Заголовки.
* Тело ответа.
* [Документация](https://expressjs.com/ru/4x/api.html#res).
---
### Объект res
* Отправка статуса:

```js
res.status(201);
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
* Чтение:

```js
req.cookies.name
```
* Запись ([документация](https://expressjs.com/ru/4x/api.html#res.cookie)):

```js
res.cookie(
    'cookieName',
    value,
    { maxAge: 900000, httpOnly: true }
);
```
---

### Типы HTTP запроса
* При отправке HTTP-запроса указывается его тип:
  * GET.
  * POST.
  * PUT.
  * DELETE.
  * OPTIONS.
* [Документация](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).
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

### Middleware
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

### Разбор тела POST-запроса
```js
const express = require('express');
const app = express();
// Для запросов с заголовком Content-Type: application/json
app.use(express.json());
// Для запросов с заголовком Content-Type:  application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.post('/profile', function (req, res, next) {
    console.log(req.body);
    res.json(req.body);
})
```

**Внимание:** не надо пользоваться библиотекой body-parser для этого, она устарела.

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

### Подключение БД
* Express.js работает с большим набором баз данных:
  * MySQL
  * MongoDB
  * PostgreSQL
* Для небольших проектов удобно использовать файловые БД, которые хранят данные в локальных файлах:
  * [SQLite](https://github.com/mapbox/node-sqlite3)
  * [LowDB](https://github.com/typicode/lowdb)
* [Документация](https://expressjs.com/en/guide/database-integration.html).
---

### MongoDB 
* По историческим причинам Express.js часто используют с [MongoDB](https://www.tutorialspoint.com/mongodb/index.htm).
```shell
npm i mongodb
```
```js
const mongoClient = require('mongodb').MongoClient;
mongoClient.connect('mongodb://localhost:27017/animals', function(err, client){
     if (err) throw err;
  
     let db = client.db('animals');
     db.collection('mammals').find().toArray(function(err, result){
         if (err) throw err;
         console.log(result);
         client.close();
     });
});
```
---

### Mongoose
* Хотя MongoDB и не реляционная БД, работу с ней удобно осуществлять через [ORM](https://ru.wikipedia.org/wiki/ORM).
* [Документация](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose).

```js
const mongoose = require('mongoose');
// подключаем к БД
const mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// определяем схему
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: String,
  password: String
});
const UserModel = mongoose.model(
    'user', // имя коллекции в БД
    UserSchema 
);
// создаём экземпляр модели
const user = new UserModel({
    username: 'vasya_pupkine',
    password: '123'
});
user.save(function (err) {
    if (err) return handleError(err);
    // saved!
});
```
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

### Полезные ссылки
* [Шикарная документация](https://expressjs.com/ru/4x/api.html).
* [Документация](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction).
* [Демонстрационный проект](https://github.com/dmitryweiner/mini-chat-server).
* [Ещё один демонстрационный проект](https://github.com/dmitryweiner/todo-server).
* [Проект с Mongoose](https://github.com/dmitryweiner/secure-chat-nodejs).