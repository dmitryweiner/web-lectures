---
title: Лекции по фронтенду - Nodejs
---

## Node.js

![nodejs logo](assets/nodejs/node-logo.png)

[Дмитрий Вайнер](https://github.com/dmitryweiner)

---

> Node.js &mdash; программная платформа, основанная на движке V8
> (транслирующем JavaScript в машинный код), превращающая JavaScript
> из узкоспециализированного языка в язык общего назначения.

---

### Node.js
* Выполняется не в браузере, а на уровне системы.
* Имеет доступ к файлам, сети, устройствам.
* Есть модули.
* Есть NPM.
---

### Модули
* Стандарт модулей называется [CommonJS](https://nodejs.org/docs/latest/api/modules.html).
* В модуле:

```js
// module.js
function usefulFunction(param) {
    return param * 3;
}

module.exports = {
    usefulFunction
}
```
* В другом модуле:

```js
const { usefulFunction } = require('./module.js');
usefulFunction(3);
```
---

### ES6 модули
* Поддержка ES6 модулей есть c 16-й версии Node.js.
* [Документация](https://nodejs.org/api/esm.html).

---

### Работа с файлами

https://nodejs.org/api/fs.html

---

### Сервер
```js
// Подключение модуля http
const http = require("http");
// Создаем веб-сервер с обработчиком запросов
const server = http.createServer((incomingMessage, response) => {
  console.log("Начало обработки запроса");
  // Передаем код ответа и заголовки http
  response.writeHead(200, { 
      "Content-Type": "text/plain; charset=UTF-8" 
  });
  response.end("Hello, world!");
});
// Запускаем веб-сервер
server.listen(3000, "127.0.0.1", () => {
  const { address, port } = server.address();
  console.log(`Сервер запущен ${address}:${port}`);
});
```
---

### Сервер статики
```js
var fs = require('fs'),
    http = require('http');

http.createServer(function (req, res) {
  fs.readFile(__dirname + req.url, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(8080);
```
---

### Фреймворки
* Adonis.js
* Express.js
* Fastify
* Hapi.js
* Koa.js
* LoopBack.js
* Meteor.js
* Nest.js
* Sails.js
[Почитать](https://medium.com/dailyjs/which-one-is-the-best-node-js-framework-choosing-among-10-tools-87a0e191eefd)

---

### Работа с Mongo.db
---

### Mongoose
---

### Менеджеры запуска
nodemon
pm2
---

### Альтернативы
https://deno.land/

---
https://jairusw.medium.com/top-10-insane-node-js-modules-c1fdf71f0033