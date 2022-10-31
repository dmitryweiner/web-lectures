---
title: Sequelize
---

### ORM `Sequelize` + Node.js
![Sequelize](assets/sequelize/logo.png)

[все лекции](https://github.com/dmitryweiner/lectures/blob/main/README.md)

---

### ORM 

> [Object-Relational Mapping](https://ru.wikipedia.org/wiki/ORM) — объектно-реляционное отображение или преобразование, «виртуальная объектная база данных».
---

![](assets/sequelize/structure.png)
---

### Установка 
```shell
npm i sequelize sqlite3
```
[Документация](https://sequelize.org/)
---

### Подключение
```js
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite', // тип базы
  storage: 'path/to/database.sqlite' // путь до базы и имя
});
```
---

### Модель
* Модель — это абстракция, представляющая таблицу в БД.
* Модель определяет название таблицы, то, какие колонки она содержит и их типы данных.
* Имя модели в единственном числе, имя таблицы автоматически во множественном.
---

### Определяем модель
```js
const User = sequelize.define('User', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});
``` 
---

### Синхронизация модели с БД
* User.sync() - создаёт таблицу, если её нет, ничего не делает, если она есть.
* User.sync({ force: true }) - стирает таблицу, если есть, создаёт заново.
* User.sync({ alter: true }) - обновляем поля таблицы, если она уже есть.
* await User.drop(); - удаление таблицы. 
* await sequelize.sync({ force: true }); - синхронизация всех таблиц.
---

### Работа с моделью
* INSERT:
```js
const jane = User.create({ name: "Jane" });
```
* UPDATE:
```js
const jane = await User.create({ name: "Jane" });
jane.set({
  name: "Ada"
});
// As above, the database still has "Jane" and "green"
await jane.save();
```
---

### Работа с моделью
* DELETE:
```js
const jane = await User.create({ name: "Jane" });
await jane.destroy();
```
* SELECT:
```js
const users = await User.findAll();
```
* SELECT WHERE:
```js
Post.findAll({
  where: {
    authorId: 2
  }
});
// https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
```
---

### Find
* findAll
* findByPk
* findOne
* findOrCreate
* findAndCountAll
* https://sequelize.org/docs/v6/core-concepts/model-querying-finders/
---

### Полезные ссылки
* https://sequelize.org/
* https://habr.com/ru/post/565062/