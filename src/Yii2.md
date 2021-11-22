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

### Ассеты
* JS и CSS файлы, которые должны быть на всех страницах, подключаются в `assets/AppAsset.php`:
```php
public $css = [
    'css/site.css',
];
public $js = [
    'js/jquery.js', // для примера! 
];
```
---

### Ассеты
* CSS, JS, картинки, шрифты лежат в `web`.
* В папке `web/assets` лежат сжатые и закешированные файлы, туда ничего класть не надо.
---

### Layout
* По умолчанию шаблон оборачивается в layout, который лежит в `views/layouts/main.php`.
* Это поведение можно [изменить](https://stackoverflow.com/questions/35407690/how-to-change-default-layout-for-all-controllers-in-yii2).
* У каждого экшена или контроллера можно [задать свой layout](https://stackoverflow.com/questions/31851718/set-layout-from-module-controller-in-yii2/35408865).
---

### Механизм работы фреймворка
* Поступает запрос вида: ```/index.php?r=%CONTROLLER_NAME%/%ACTION_NAME%```.
  * При использовании Nginx или Apache запрос можно посылать в виде ```/controller/action```.
* Фреймворк ищет в controllers класс с именем ```%CONTROLLER_NAME%Controller``` (С большой буквы).
* Далее ищет метод, соответствующий экшену (```action%ACTION_NAME%```).
---

### Экшен по умолчанию
* Если экшен не указан, вызывается `actionIndex`.
```php
public function actionIndex()
{
    return $this->render('index');
}
```
---

### Примеры URL -&gt; контроллер
```
/article -> app\controllers\ArticleController;
/post-comment -> app\controllers\PostCommentController;
/admin/post-comment -> app\controllers\admin\PostCommentController;
/adminPanels/post-comment -> app\controllers\adminPanels\PostCommentController.
```
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

### Контроллер и шаблон
* Экшен контроллера может рендерить вью:
```php
public function actionIndex()
{
    return $this->render('index');
}
```
* Шаблон должен лежать в views/%ИМЯ_КОНТРОЛЛЕРА%/index.php (и называться соответственно тому, что передали в `render()`):⬇
----
#### views/site/index.php
```php
<?php
/* @var $this yii\web\View */
use yii\helpers\Html;
$this->title = 'About';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-about">
    <h1><?= Html::encode($this->title) ?></h1>
    <p>
        This is the About page. You may modify the following file to customize its content:
    </p>
    <code><?= __FILE__ ?></code>
</div>
```
---

### Передача данных в шаблон
* Передаём данные:
```php
public function actionIndex()
{
    return $this->render('index', ['data' => 123]);
}
```
* Используем в шаблоне `index.php`:
```php
<?=$data;?>
```
---

### Отображение формы в шаблоне
```php
<?php
use yii\bootstrap4\ActiveForm;
use yii\bootstrap4\Html;
?>
<?php $form = ActiveForm::begin([
    'id' => 'login-form',
    'layout' => 'horizontal',
    'fieldConfig' => [
        'template' => "{label}\n<div class=\"col-lg-3\">{input}</div>\n<div class=\"col-lg-8\">{error}</div>",
        'labelOptions' => ['class' => 'col-lg-1 col-form-label'],
    ],
]); ?>
    <?= $form->field($model, 'username')->textInput(['autofocus' => true]) ?>
    <?= $form->field($model, 'password')->passwordInput() ?>
    <?= $form->field($model, 'rememberMe')->checkbox([
        'template' => "<div class=\"offset-lg-1 col-lg-3 custom-control custom-checkbox\">{input} {label}</div>\n<div class=\"col-lg-8\">{error}</div>",
    ]) ?>
    <div class="form-group">
        <div class="offset-lg-1 col-lg-11">
            <?= Html::submitButton('Login', ['class' => 'btn btn-primary', 'name' => 'login-button']) ?>
        </div>
    </div>
<?php ActiveForm::end(); ?>
```
---

### Формы
* Форма строится с помощью класса ActiveForm.
* С помощью него можно реализовать [валидацию](https://yiiframework.com.ua/ru/doc/guide/2/input-validation/) (обязательность полей, правила).
* Динамическую загрузку значений.
* [Подробнее](https://yiiframework.com.ua/ru/doc/guide/2/input-forms/).
---

### Обработка запросов
* Данные, отправленные в форме, попадают в экшен с помощью вызова метода:
```php
Yii::$app->request->post()
```
* GET-параметры можно получать с помощью метода:
```php
$id = $request->get('id', 1);
// equivalent to: $id = isset($_GET['id']) ? $_GET['id'] : 1;
```
* Узнать, с чем к нам пришли:
```php
$request = Yii::$app->request;
if ($request->isAjax) { /* the request is an AJAX request */ }
if ($request->isGet)  { /* the request method is GET */ }
if ($request->isPost) { /* the request method is POST */ }
if ($request->isPut)  { /* the request method is PUT */ }
```

---

### Запросы к БД
* Вначале надо настроить конфиг для доступа к базе `config/db.php`:
```php
return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host=localhost;dbname=yii2basic',
    'username' => 'root',
    'password' => '',
    'charset' => 'utf8',
    // Schema cache options (for production environment)
    //'enableSchemaCache' => true,
    //'schemaCacheDuration' => 60,
    //'schemaCache' => 'cache',
];
```
---

### SQL запросы
* Запросы выполняются с помощью [\yii\db\Query](https://yiiframework.com.ua/ru/doc/guide/2/db-query-builder/):
```php
$rows = (new \yii\db\Query())
    ->select(['id', 'email'])
    ->from('user')
    ->where(['last_name' => 'Smith'])
    ->limit(10)
    ->all();
```

---
### Модели и Active Record

---
### Наполнение модели данными

---
### Модель инициализируется из формы

---
### Сохранение и модификация данных с помощью модели

---
### Генерация моделей по существующей БД

---
### CRUD

---
### Миграции

---
### Дебаг

---
### Тесты

---
### Полезные ссылки
* https://www.yiiframework.com/doc/guide/2.0/ru/
* http://des1roer.blogspot.com/2015/06/yii2.html
* https://fructcode.com/ru/blog/yii2-lessons-how-to-create-page/
* https://yiiframework.com.ua/ru/doc/guide/2/
