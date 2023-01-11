
## MongoDB

![mongo logo](assets/mongo/Mongo-db-logo.png)

[все лекции](https://github.com/dmitryweiner/web-lectures/blob/main/README.md)
---

### Факты
* Создана в 2009 г. компанией 10gen.
* Распространяется под Server Side Public License.
* Классика в мире NoSQL баз.
* [Официальный сайт](https://www.mongodb.com/try).
* [Документация](https://docs.mongodb.com/guides/server/introduction/).
---

### Основные фичи
* Документо-ориентированная база.
* Поддерживает [репликацию](https://docs.mongodb.com/manual/core/replica-set-arbiter/).
* Поддерживает 
  [шардирование](https://ru.wikipedia.org/wiki/%D0%A1%D0%B5%D0%B3%D0%BC%D0%B5%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5_(%D0%B1%D0%B0%D0%B7%D1%8B_%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85).
* Поддерживает балансировку нагрузки.
* Есть библиотеки под все распространённые языки.
* Есть коллекции с фиксированным размером.
* Можно хранить файлы.
* Есть индексы.
---

### NoSQL
* Не реляционная база данных.
* Вместо записей хранит документы.
* У документов может быть произвольный набор полей.
* Есть поле id, можно использовать внешние ключи.
* [Введение в NoSQL](https://www.w3schools.in/mongodb/introduction-to-nosql/).
* [Преимущества NoSQL](https://www.w3schools.in/benefits-of-using-nosql/).
---

### Шардинг и репликация
* Можно хранить разные куски коллекций на разных серверах (ближе к клиенту).
Это называется [шардинг](https://docs.mongodb.com/manual/sharding/).
* Можно завести несколько серверов с идентичным содержимым 
([репликация](https://docs.mongodb.com/manual/replication/))
и [балансировать](https://severalnines.com/database-blog/overview-mongodb-and-load-balancing)
запросы от пользователей в зависимости от загрузки сервера.

----

![sharding](assets/mongo/sharding.svg)

----

![replica](assets/mongo/replica.svg)

---

### Установка
* Для работы с этой БД необходимо поставить СУБД локально в систему.
* [Установка](https://docs.mongodb.com/manual/installation/).
* Для работы в Node.js необходимо поставить коннектор:
```shell
npm i mongodb
```
* Использование:
```js
const mongo = require('mongodb');
```
---

### Консольные команды
* После установки в системе есть: 
  * сервер mongod, 
  * консольная оболочка для работы с базой ```mongo```,
  * средства для экспорта/импорта ```mongoexport, mongoimport```,
  * для дампа базы ```mongodump, mongorestore```,
  * диагностика ```mongostat, mongotop```.
* Почитать: 
  [1](https://docs.mongodb.com/database-tools/),
  [2](https://docs.mongodb.com/manual/reference/mongo-shell/),
  [3](https://gist.github.com/michaeltreat/d3bdc989b54cff969df86484e091fd0c).
---

### Декстопные клиенты
* Если скучно работать в консоли, администрировать базу можно из 
десктопного клиента.
* [Топ 20 клиентов](https://www.guru99.com/top-20-mongodb-tools.html).
* Рекомендую этот [Robo 3T](https://robomongo.org/?utm_source=Guru99&utm_medium=listing&utm_campaign=leadgen).

![Robo 3T](assets/mongo/robo_3t_logo.png)

---

### Подключение к базе
* При первом подключении ДБ создаёт базу, если её не было:

```js
const MongoClient = require('mongodb').MongoClient;
// имя базы должно отражать то, что в ней лежит
const url = 'mongodb://localhost:27017/databaseName'; 
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    // тут можно сохранить куда-то объект db
    db.close();
});
```
---

### Создание коллекции
* Создание коллекции (аналог таблицы в SQL):
  
```js
const url = 'mongodb://localhost:27017/databaseName';
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.createCollection('customers', function(err, res) {
        if (err) throw err;
        console.log('Collection created!');
        db.close();
    });
});
```
---

### Capped коллекции
* Можно создавать коллекции ограниченного размера (либо число документов, либо размер на диске).
* При этом более старые стираются.
* [Почитать](https://docs.mongodb.com/manual/core/capped-collections/).

```js
db.createCollection( 'log', { capped: true, size: 100000 } );
```
---

### Индексы
* Если необходимо искать/сортировать по определённому полю документов,
процесс очень ускорит создание индекса.
* [Документация](https://docs.mongodb.com/manual/indexes/).
* [Формат вызова](https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/).

```js
db.collection.createIndex(
  {
      "a": 1
  },
  {
      unique: true,
      sparse: true,
      expireAfterSeconds: 3600
  }
)
```
---

### Удаление коллекции
* Коллекцию можно не только создать, но и удалить:

```js
db.collection('customers').drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log('Collection deleted');
    db.close();
});
```
---

### Создание документа
* Когда создана коллекция, в неё можно добавить документ с помощью метода ```insertOne```.
* В созданном документе есть служебное поле ```_id```, служащее первичным ключом.

```js
const url = 'mongodb://localhost:27017/databaseName';
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const newDocument = { name: 'Company Inc', address: 'Highway 37' };
    db.collection('customers').insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log('1 document inserted');
        db.close();
    });
});
```
---

#### Можно добавлять сразу несколько документов
```js
const docs = [
  { name: 'John', address: 'Highway 71'},
  { name: 'Peter', address: 'Lowstreet 4'},
  { name: 'Amy', address: 'Apple st 652'}
];
db.collection('customers').insertMany(docs, function(err, res) {
  if (err) throw err;
  console.log('Number of documents inserted: ' + res.insertedCount);
  db.close();
});
```
---

### Внешние ключи
* Один документ может ссылаться на ID другого.
* То, что такое ID существует, никак не проверяется.
* [Про ссылки](https://docs.mongodb.com/manual/reference/database-references/#std-label-document-references),
  [1 to N](https://docs.mongodb.com/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/).
  
```js
const original_id = require('mongodb').ObjectId();
db.places.insert({
    '_id': original_id, // задать первичный ключ вручную
    'name': 'Broadway Center',
    'url': 'bc.example.net'
})
db.people.insert({
    'name': 'Erin',
    'places_id': original_id,
    'url':  'bc.example.net/Erin'
})
```
---

### Поиск
* Поиск осуществляется при помощи объекта запроса.
* Найти один документ: ```findOne```, найти все ```find```.

```js
/* customers:
    { name: 'John', address: 'Highway 71'},
    { name: 'Peter', address: 'Lowstreet 4'},
    { name: 'Amy', address: 'Apple st 652'}
 */
const query = { address: 'Lowstreet 4' };
db.collection('customers').find(query).toArray(function(err, result) {
  if (err) throw err;
  console.log(result); // [ { name: 'Peter', address: 'Lowstreet 4'} ]
  db.close();
});
```
---

### Find
* В метод ```find``` можно также передать, какие поля выбирать из коллекции, а какие не выбирать:

```js
db.collection('customers').find(
    query, 
    { 
        name: 1, // выбрать поле name
        _id: -1 // не выбирать поле _id 
    }
);
```

* Ограничение числа записей:

```js
.find().limit(5)
```
---

### [Сложные запросы](https://www.w3schools.in/mongodb/query-operations/)
* Строгое соответствие:
```js
const query = { field: 'value' };
```
* Частичное соответствие:
```js
const query = { field: /^val/ };
```
* Несколько полей (AND):
```js
const query = { field1: 'value1', field2: 'value2' };
```
* Несколько полей (OR):
```js
const query = { $or: [ 
    { field1: 'value1' },
    { field2: 'value2' } 
]};
```
---

### Сортировка
* Результаты поиска сортируются с помощью метода ```sort```.
* Задание полей и направляение для сортировки производится с помощью объекта.
* [Подробнее](https://www.w3schools.in/mongodb/sorting/).

```js
const mysort = { name: 1 };
/*
{ name: 1 } // ascending
{ name: -1 } // descending
 */
db.collection('customers').find().sort(mysort).toArray(function(err, result) {
  if (err) throw err;
  console.log(result);
  db.close();
});
```
---

### JOIN
* Можно объединять результаты запроса с данными из другой коллекции (как в конструкции JOIN из SQL):

```js
db.collection('orders').aggregate([
  { $lookup:
     {
       from: 'products',
       localField: 'product_id',
       foreignField: '_id',
       as: 'orderdetails'
     }
   }
  ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
});
```
----

### Изменение документа
* Вначале документ для обновления надо найти с помощью query.
* Изменить один документ: ```updateOne```.
* Изменить всё найденное: ```updateMany```.

```js
const query = { address: 'Valley 345' };
const newValues = { $set: {name: 'Mickey', address: 'Canyon 123' } };
db.collection('customers').updateOne(query, newValues, function(err, res) {
    if (err) throw err;
    console.log('1 document updated');
    db.close();
});
```
---

### Удаление документа
* Точно так же можно удалять документы.
* Удалить один документ: deleteOne.
* Удалить все найденные: deleteMany.

```js
const query = { address: /^O/ };
dbo.collection('customers').deleteMany(query, function(err, obj) {
    if (err) throw err;
    console.log(obj.result.n + ' document(s) deleted');
    db.close();
});
```
---

### Полезные ссылки
* https://docs.mongodb.com/guides/server/introduction/
* https://www.w3schools.com/nodejs/nodejs_mongodb.asp
* https://www.w3schools.in/mongodb/overview/

