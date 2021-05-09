---
title: Лекции по фронтенду - Nodejs
---

## Node.js

![nodejs logo](assets/nodejs/node-logo.png)

[Дмитрий Вайнер](https://github.com/dmitryweiner)

---

* Node.js &mdash; программная платформа, основанная на движке V8
(транслирующем JavaScript в машинный код), превращающая JavaScript
из узкоспециализированного языка в язык общего назначения.
* Создан в 2009г.
* Создатель [Райан Дал](https://tinyclouds.org/).

![Ryan Dahl](assets/nodejs/Ryan_Dahl.jpeg)
---

### Node.js
* Выполняется не в браузере, а на уровне системы.
* Имеет доступ к файлам, сети, устройствам.
* Есть асинхронное выполнение.
* Есть модули.
* Есть NPM.
* Последняя версия: 16.
* Лучше использовать 
  [LTS](https://ru.wikipedia.org/wiki/%D0%94%D0%BE%D0%BB%D0%B3%D0%BE%D1%81%D1%80%D0%BE%D1%87%D0%BD%D0%B0%D1%8F_%D0%BF%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%BA%D0%B0_%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%BD%D0%BE%D0%B3%D0%BE_%D0%BE%D0%B1%D0%B5%D1%81%D0%BF%D0%B5%D1%87%D0%B5%D0%BD%D0%B8%D1%8F)
  версию 14.
* [Установка](https://nodejs.org/ru/download/).
* [Документация](https://nodejs.org/api/documentation.html).

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
* У файла должно быть расширение ```*.mjs```.
* [Документация](https://nodejs.org/api/esm.html).

---

### Мониторинг и управление
* Глобальный объект ```process``` (не нужно импортировать).
* Можно прерывать выполнение процесса, считывать аргументы и многое другое:
```js
// вывести аргументы, с которыми запущен процесс
console.log(process.argv);
// переменные окружения
console.log(process.env);
// выйти с кодом 1
process.exit(1);
```
* [Документация](https://nodejs.org/api/process.html).
---

### Разбор аргументов
* В ```process.argv``` лежит массив аргументов, не очень удобно с ним работать.
* Очень удобная библиотека [yargs](https://github.com/yargs/yargs) парсит аргументы и выводит подсказки.
* [Полезная статья](https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/)
```js
#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
yargs(hideBin(process.argv))
  .command('serve [port]', 'start the server', (yargs) => {
    return yargs
      .positional('port', {
        describe: 'port to bind on',
        default: 5000
      });
  }, (argv) => {
    if (argv.verbose) console.info(`start server on :${argv.port}`);
    serve(argv.port);
  })
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
  })
  .argv
```
---

### Работа с файлами
* Используется библиотека ```fs``` (устанавливать не нужно).
* Операции бывают:
  * Синхронные: поток выполнения останавливается и ждёт, пока ответит ОС.
  ```js
    const fs = require('fs');
    const data = fs.readFileSync('./input.txt',  {encoding:'utf8', flag:'r'});
    console.log(data);
  ```
  * Асинхронные: выполнение идёт дальше, а при ответе запускается обработчик.
  ```js
    fs.readFile('./input1.txt', {encoding:'utf8', flag:'r'}, (err, data) => {});
  ```
* [Документация](https://nodejs.org/api/fs.html).

---

### Сервер
* Используется библиотека ```http``` (устанавливать не надо).
```js
// Подключение модуля http
const http = require('http');
// Создаем веб-сервер с обработчиком запросов
const server = http.createServer((incomingMessage, response) => {
  console.log('Начало обработки запроса');
  // Передаем код ответа и заголовки http
  response.writeHead(200, { 
      'Content-Type': 'text/plain; charset=UTF-8' 
  });
  response.end('Hello, world!');
});
// Запускаем веб-сервер
server.listen(3000, '127.0.0.1', () => {
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
* [Express.js](https://expressjs.com/)
* Fastify
* Hapi.js
* [Koa.js](https://koajs.com/)
* LoopBack.js
* Meteor.js
* Nest.js
* Sails.js
* [Обзор фреймворков](https://medium.com/dailyjs/which-one-is-the-best-node-js-framework-choosing-among-10-tools-87a0e191eefd).

---

### Менеджеры запуска
* Приложения на node.js периодически падают, хорошо бы их перезапускать автоматически:
* [nodemon](https://www.geeksforgeeks.org/nodejs-automatic-restart-nodejs-server-with-nodemon/?ref=rp)
* [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/)
---

### Альтернативы node.js
* [Deno](https://deno.land/) от создателя Node.js.
* Rust.
* Go.
* PHP.
* Python + Django.

---

![seal programming in nodejs](assets/nodejs/seal.jpeg)