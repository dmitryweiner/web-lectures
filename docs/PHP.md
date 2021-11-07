---
title: PHP
---

## PHP

![PHP logo](assets/php/logo.png)

[Дмитрий Вайнер](https://github.com/dmitryweiner)
---

### Идея
* PHP &mdash; рекурсивный акроним словосочетания PHP: Hypertext Preprocessor.
* Серверный интерпретатор (по типу Node.js).
* Создан 8 июня 1995.
* Текущая версия 8.0.
---

![versions](assets/php/versions.png)
---

![versions graph](assets/php/versions-graph.png)
---

### Распространённые фреймворки
* [Symfony](https://symfony.com/).
* [Laravel](https://laravel.ru/).
* [Zend](https://framework.zend.com/).
* [Yii2](https://www.yiiframework.com/).
---

### Системы менеджмента контента (CMS)
* [Drupal](https://www.drupal.org/).
* [Wordpress](https://wordpress.com/ru/create/).
* [Joomla](https://joomla.ru/).
* [Magento](https://magento.com/).
---

### Система управления зависимостями
* [Composer](https://packagist.org/)
```shell
curl -sS https://getcomposer.org/installer | php
```
* Зависимости хранятся в composer.json:
```json
{
    "name": "your-vendor-name/package-name",
    "description": "A short description of what your package does",
    "require": {
        "php": ">=7.4",
        "another-vendor/package": "1.*"
    }
}
```
---

### Установка
* Windows:
  * [OpenServer](https://ospanel.io/).
  * [Denwer](http://www.denwer.ru/).
* Linux:
```shell
sudo apt install php # ставит v7.4
```
---

### Хостинг
* [Поисковик по хостингам](https://ru.hostadvice.com/hosting-services/free-php-hosting/).
* [000webhost.com](https://www.000webhost.com/).
---

### Базовый синтаксис
* [PHP-теги](https://www.php.net/manual/ru/language.basic-syntax.phptags.php):
```php
<?php /* всё, что в этих тегах, интерпретируется, как PHP-код */ ?>
```
  * Тег ?&gt; можно не закрывать, если файл содержит только код PHP.
* Создание переменных:
```php
<?php
$a = 1;
$b = $a + 1;
```
* Вывод:
```php
<?php
echo 123;
```
---

![variable](assets/php/var.png)
---

### Вывод для дебага
* Без типов:
```php
print_r([1, 2, 3]);
// Array ( [0] => 1 [1] => 2 [2] => 3 ) 
```
* Если надо вывести тип, используется [var_dump()](https://www.php.net/manual/ru/function.var-dump.php):
```php
<?php
var_dump([1, 2, 3]);
// array(3) { [0]=> int(1) [1]=> int(2) [2]=> int(3) } 
```
---

### Укороченный вывод
* Вместо echo можно использовать короткий синтаксис "&lt;?=":
```php
<?php
  $a = "123";
?>
<?=$a?>
```
* Выведет:
```
123
```
---

### Типы данных
```php
$number = 123;

$double = 1.23;

$boolean = true;

$string = "123";

$array = [1, 2, 3];

$object = new class{};

$function = function() {};
```

[Подробнее](https://www.php.net/manual/ru/language.types.php).
---

### Определение типа переменной
* Всегда можно определить тип переменной с помощью [**gettype**](https://www.php.net/manual/ru/function.gettype.php):
```php
$unknown = 1.23;
echo gettype($unknown);
// double
```
---

### Интерпретируемые строки
* Строки в одинарных кавычках не интерпретируются:
```php
$name = "Vasya";
echo 'My name is $name';
// My name is $name
```
* Строки в двойных кавычках интерпретируются:
```php
$name = "Vasya";
echo "My name is $name";
// My name is Vasya
```
---

### Операторы
* Арифметика:
  * \+ Сложение.
  * \- Вычитание.
  * \* Умножение.
  * / Деление.
  * % Деление по модулю.
  * \** Возведение в степень.
---

### Операторы
* Строки складываются оператором точка ".":
```php
$name = "Vasya";
$greeting = "My name is ";
echo $greeting . $name;
// My name is Vasya
```
---

### Сравнение
```php
$n == $m //	true, если $n равно $m

$n === $m //	true, если $n равно $m и имеют одинаковые типы

$n != $m //	true, если $n не равна $m

$n !== $m //	true, если отличаются тип или значение переменных

$n < $m //	true, если $n меньше $m

$n > $m //	true, если $n больше $m

$n <= $m //	true, если $n меньше или равна $m

$n >= $m //	true, если $n больше или равна $m
```
---

### Операторы управления
* if/else:

```php
if ($a > $b) {
    echo "a больше, чем b";
} elseif ($a == $b) {
    echo "a равен b";
} else {
    echo "a меньше, чем b";
}
```
* for:

```php
for ($i = 1; $i <= 10; $i++) {
    echo $i;
}
```
---

### Операторы управления
* switch:

```php
switch ($value) {
    case 'значение1':
        // код
        break;
    case 'значение2':
        // код
        break;    
    default:
        // код
        break;
}
```
* while:

```php
$i = 0;
while ($i < 4) {
    $i++;
    echo "i = $i";
}
```
---

### Тернарный оператор
```php
$is_admin = ($user['permissions'] === 'admin') ? true : false;
```
---

### Массивы
* В массив можно складывать значения любого типа:
```php
$arr = [1, 2, true, "123"];
```
* Индекс массива начинается с 0:
```php
echo $arr[0]; // 1
```
* Положить в массив ещё один элемент:
```php
$arr[] = "Ещё один элемент";
```
---

### Ассоциативные массивы
* Ключи массива могут быть строками:
```php
$arr = [
    "хлеб" => 60,
    "яйца" => 200,
    "колбаса" => 300
];
```
---

### Foreach
* Массив удобно перебирать с помощью foreach:
```php
$arr = [1, 2, true, "123"];
foreach ($arr as $value) {
    echo $value;
}
```
---

### Неявное приведение типов
* Тип переменной определяется по контексту, в котором она используется:

```php
$foo = "1";  // $foo - это строка (ASCII-код 49)

$foo *= 2;   // $foo теперь целое число (2)

$foo = $foo * 1.3;  // $foo теперь число с плавающей точкой (2.6)

$foo = 5 * "10 Little Piggies"; // $foo - это целое число (50)

$foo = 5 * "10 Small Pigs";     // $foo - это целое число (50)
```
---

### Явное приведение типов
* Имя требуемого типа записывается в круглых скобках перед приводимой переменной ([подробнее](https://www.php.net/manual/ru/language.types.type-juggling.php)).
```php
$foo = (int) "1"; // целое число
```
  * (int), (integer) - приведение к int.
  * (bool), (boolean) - приведение к bool.
  * (float), (double), (real) - приведение к float.
  * (string) - приведение к string.
  * (array) - приведение к array.
  * (object) - приведение к object.
---

### Функции
* Функции бывают [именованные](https://www.php.net/manual/ru/functions.user-defined.php)
и [анонимные](https://www.php.net/manual/ru/functions.anonymous.php):

```php
function foo($arg_1, $arg_2, /* ..., */ $arg_n) {
  echo "Пример функции.\n";
  return $retval;
}

$greet = function($name) {
  echo "Привет, $name";
};
$greet('Мир');
$greet('PHP');
```

---

### Typehint
* Начиная с PHP 7.4 можно [указывать](https://www.php.net/manual/ru/language.types.declarations.php)
тип параметров и возвращаемого значения:

```php
function sum(float $a, float $b): float {
    return $a + $b;
}
```
---

### Объекты и классы
* Пример работы с классом:

```php
class foo {
    function do_foo() {
        echo "Код foo.";
    }
}

$bar = new foo;
$bar->do_foo(); // -> оператор вызова метода или чтения поля
```

* ООП в языке [представлено](https://www.php.net/manual/ru/language.oop5.php) полностью.
---

### Оператор передачи по ссылке
* С помощью оператора "&" можно передавать [параметр по ссылке](https://www.php.net/manual/ru/language.references.pass.php),
что позволяет его изменять:
```php
$arr = [1, 2, 3, 4];
foreach ($arr as &$value) {
    $value = $value * 2;
}
// [2, 4, 6, 8]
```
---

### Оператор передачи по ссылке
* Его можно указывать в параметрах функции или метода:

```php
function foo(&$var) {
    $var++;
}

$a = 5;
foo($a);
// $a здесь равно 6
```
---

### Импорты
* Можно импортировать код из других файлов с помощью методов require, require_once, include и include_once:
  * [require](https://www.php.net/manual/ru/function.require.php): вызывает ошибку, если файл не найден.
  * [include](https://www.php.net/manual/ru/function.include.php): вызывает warning, если файл не найден.
  * include_once, require_once: импортируют файл единожды.
* Подключение файла вызывает его выполнение.
---

### Пример импорта
* footer.php:

```php
 <?php
echo "<p>Copyright &copy; 1999-" . date("Y") . " W3Schools.com</p>";
```
* index.php:

```php
 <html>
<body>

<h1>Welcome to my home page!</h1>
<p>Some text.</p>
<p>Some more text.</p>
<?php include 'footer.php';?>

</body>
</html> 
```
---

### Пространство имён
* Для избежания коллизий имён используются [пространства имён](https://www.php.net/manual/ru/language.namespaces.rationale.php) (аналог пакетов в Java).
* Пространства имён могут быть вложенные.
* Путь можно указывать относительный.

```php
namespace project\util;

class Debug {
    static function helloWorld() {
        print "Привет из класса Debug";
    }
}

// в другом файле:
project\util\Debug::helloWorld();

// или
use project\util;
Debug::helloWorld();
```
---

### Переменные окружения
* Переменные окружения лежат в [$_ENV](https://www.php.net/manual/ru/reserved.variables.environment.php):
```php
echo 'Моё имя пользователя: ' .$_ENV["USER"] . '!';
```
---

### Глобальные константы
* Глобальные константы лежат в [$_SERVER](https://www.php.net/manual/ru/reserved.variables.server.php):
  * PHP_SELF: Имя файла скрипта, который сейчас выполняется.
  * SERVER_ADDR: IP-адрес сервера, на котором выполняется текущий скрипт.
  * QUERY_STRING: Строка запроса, если есть, через которую была открыта страница.
  * REMOTE_ADDR: IP-адрес, с которого пользователь просматривает текущую страницу.
---

### Обработка форм
https://addphp.ru/materials/base/1_13.php
---

### Чтение и запись файлов
* Можно [читать и писать файлы](https://addphp.ru/materials/base/1_14.php), если есть права в системе.

```php
$handle = @fopen("/tmp/inputfile.txt", "r");
if ($handle) {
    while (($buffer = fgets($handle, 4096)) !== false) {
        echo $buffer;
    }
    if (!feof($handle)) {
        echo "Ошибка: fgets() неожиданно потерпел неудачу\n";
    }
    fclose($handle);
}
```
---

### Cookies
https://addphp.ru/materials/base/1_15.php
---

### Работа с датами
http://old.code.mu/books/php/base/rabota-s-datami-v-php.html

---

### Подключение к БД
https://addphp.ru/materials/mysql/1_3.php

---

### Изменение данных в БД

---

### Полезные ссылки
* https://www.php.net/manual/ru/tutorial.php
* http://ru.html.net/tutorials/php/
* https://getjump.github.io/ru-php-the-right-way/
* https://addphp.ru/
* https://proglib.io/p/samouchitel-dlya-nachinayushchih-kak-osvoit-php-s-nulya-za-30-minut-2021-02-08
* https://php.zone/kurs-php-dlya-nachinayushih

