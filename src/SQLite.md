---
title: SQLite
---
### СУБД `SQLite` + Node.js
![SQLite](assets/sqlite/logo.png)

[все лекции](https://github.com/dmitryweiner/web-lectures/blob/main/README.md)

[видео](https://youtu.be/BiJmO73XZLQ)
---

> SQLite — это быстрая и легкая встраиваемая однофайловая СУБД на языке C, которая не имеет сервера и позволяет хранить всю базу локально на одном устройстве. Для работы SQLite не нужны сторонние библиотеки или службы.

[Подробнее](https://blog.skillfactory.ru/glossary/sqlite/)
---

### SQLite
* [Документация](https://www.sqlite.org/docs.html), [rus](https://metanit.com/sql/sqlite/).
* [Программа для работы с базой](https://sqlitebrowser.org/).
* [Работа с базой онлайн](https://sqliteonline.com/).
---

### Типы данных
SQLite поддерживает только четыре типа данных, которые реализованы в SQL:
* INTEGER — целое число;
* REAL — дробное число;
* TEXT — текст;
* BLOB — двоичные данные.
Также существует особое значение NULL — отсутствие данных.
---

### Установка
```shell
npm install sqlite3 sqlite
```
[Документация](https://github.com/kriasoft/node-sqlite)
---

### Подключение
```js
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

// this is a top-level await 
(async () => {
    // open the database
    const db = await open({
      filename: 'database.db', // имя и путь к БД
      driver: sqlite3.Database
    })
})();
```
---

### Создание таблицы
```js
await db.exec('CREATE TABLE IF NOT EXISTS tbl (col TEXT)')
```
[Подробнее](https://www.sqlitetutorial.net/sqlite-create-table/)
---

### INSERT
```js
await db.exec('INSERT INTO tbl VALUES ("test")')
```
```js
const result = await db.run(
  'INSERT INTO tbl (col) VALUES (?)',
  'foo'
)
/*
{
  // row ID of the inserted row
  lastID: 1,
  // instance of `sqlite#Statement`
  // which is a wrapper around `sqlite3#Statement`
  stmt: <Statement>
}
*/
```
[Подробнее](https://www.sqlitetutorial.net/sqlite-insert/)
---

### UPDATE
```js
const result = await db.run(
  'UPDATE tbl SET col = ? WHERE col = ?',
  'foo',
  'test'
)
```
[Подробнее](https://www.sqlitetutorial.net/sqlite-update/)
---

### SELECT
* Получаем одну запись:
```js
const result = await db.get('SELECT col FROM tbl WHERE col = ?', 'test')
// { col: 'test' }
```
* Получаем все записи:
```js
const result = await db.get('SELECT col FROM tbl')
// [{ col: 'test' }, ...]
```
* [Подробнее](https://www.sqlitetutorial.net/sqlite-select/)
---

### DELETE
```js
await db.exec('DELETE FROM tbl WHERE col = ?', 'test')
```
[Подробнее](https://www.sqlitetutorial.net/sqlite-delete/)
---

### Полезные ссылки
* https://github.com/kriasoft/node-sqlite
* https://www.sqlitetutorial.net/
* https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/
* [Учебный проект с SQLite](https://github.com/dmitryweiner/express-auth-example/commit/333f5400062315490e7470340d152ea3a671556a).
