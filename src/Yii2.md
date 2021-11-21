---
title: Yii2
---

## Yii2

![yii2 logo](assets/yii2/logo.png)

[Дмитрий Вайнер](https://github.com/dmitryweiner)

---

### Yii2
* Yii &mdash; акроним от "Yes It Is!", произносится "йии".
* Первый релиз 1 января 2008.
* Текущая версия 2 (в 2021-м должна была выйти [3-я версия](https://www.yiiframework.com/yii3-progress)).
* Создатель [Цян Суэ](https://twitter.com/qiang_xue).
* [Документация](https://www.yiiframework.com/doc/guide/2.0/ru/).

<div style="display: flex; flex-direction: row; justify-content: center;">
<div style="width:150px">

![Цян Суэ](assets/yii2/quang.png)
</div>
</div>
---

### Идеи
* Реализация паттерна [MVC](https://ru.wikipedia.org/wiki/Model-View-Controller).
* Очень мощные консольные команды.
* Генерация моделей и CRUD по базе.
* REST из коробки.
* Миграции БД.
* Шаблонизаторы Twig и Smarty.
---

### Установка
* Вначале надо [поставить Composer](https://getcomposer.org/download/)
* Генерация проекта:
```shell
composer create-project --prefer-dist yiisoft/yii2-app-basic %PROJECT_NAME%
```
* [Подробности](https://www.yiiframework.com/doc/guide/2.0/ru/start-installation).

---

### Запуск
* Встроенный сервер:

```shell
cd %PROJECT_NAME%
./yii serve
```

* Настройка хостинга:
  * [Apache](https://www.yiiframework.com/doc/guide/2.0/ru/start-installation#recommended-apache-configuration).
  * [Nginx](https://www.yiiframework.com/doc/guide/2.0/ru/start-installation#recommended-nginx-configuration).
---

![first run](assets/yii2/run-app.png)
---

### Структура приложения
```
composer.json       используется Composer'ом, содержит описание приложения
config/             конфигурационные файлы
    console.php     конфигурация консольного приложения
    web.php         конфигурация Web приложения
commands/           содержит классы консольных команд
controllers/        контроллеры
models/             модели
runtime/            файлы, которые генерирует Yii во время выполнения приложения (логи, кэш и т.п.)
vendor/             содержит пакеты Composer'а и, собственно, сам фреймворк Yii
views/              виды приложения
web/                корневая директория Web приложения. Содержит файлы, доступные через Web
    assets/         скрипты, используемые приложением (js, css)
    index.php       точка входа в приложение Yii. С него начинается выполнение приложения
yii                 скрипт выполнения консольного приложения Yii
```
---
### Жизненный цикл

![lifecycle](assets/yii2/lifecycle.png)
---

### Механизм работы
* Поступает запрос вида: ```/index.php?r=%CONTROLLER_NAME%/%ACTION_NAME%```.
  * При использовании Nginx или Apache запрос можно посылать в виде ```/controller/action```.
* Фреймворк ищет в controllers файл с именем ```%CONTROLLER_NAME%Controller``` (с большой буквы).
* Далее ищет метод, соответствующий экшену (```action%ACTION_NAME%```). Если экшен не указан, вызывается ```actionIndex```.
---

### Примеры URL -&gt; контроллер
---

### Структура контроллера
* Контроллер &mdash; это класс, наследуемый от ```yii\web\Controller```.

```php
namespace app\controllers;

use yii\web\Controller;

class SiteController extends Controller
{
    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionHelloWorld()
    {
        return 'Hello World';
    }
}
```
---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### 

---
### Полезные ссылки
* https://www.yiiframework.com/doc/guide/2.0/ru/
