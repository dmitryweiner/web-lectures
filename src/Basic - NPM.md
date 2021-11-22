---
title: Basic - NPM
---

## NPM

![NPM logo](assets/npm/logo.png)

[Дмитрий Вайнер](https://github.com/dmitryweiner)
---

### Идея
* Зависимости проекта должны быть документированы.
* Должно быть средство установки пакетов, прописанных в зависимостях:
  * PHP: composer.
  * Java: gradle, maven.
* Средство должно автоматически определять нужные версии пакетов.

---

### NPM
* В экосистеме роль менеджера пакетов выполняет NPM.
* NPM &mdash; **n**ode **p**ackage **m**anager.
* Устанавливается вместе с [Node.js](https://nodejs.org/en/download/).

---

### package.json
* Главный конфигурационный файл называется ```package.json``` и располагается в корне проекта.
* Он должен быть в формате [JSON](https://ru.wikipedia.org/wiki/JSON).
* Его можно создать вручную, можно сгенерировать с помощью NPM.
* Файл хранит:
  * Имя проекта.
  * Зависимости от сторонних библиотек.
  * Скрипты запуска.
  * Настройки.
---

### Инициализация проекта
* Для генерации ```package.json``` надо выполнить команду:
```shell
npm init
```
* В ходе создания придётся ответить на вопросы:

```shell
package name: (sample-project) 
version: (1.0.0) 
description: This is sample project
entry point: (index.js) 
test command: 
git repository: https://github.com/dmitryweiner/sample-project
keywords: project sample
author: Dmitry Weiner
license: (ISC) GPL-3.0-or-later
About to write to /home/dmw/projects/sample-project/package.json:

{
  "name": "sample-project",
  "version": "1.0.0",
  "description": "This is sample project",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/dmitryweiner/sample-project.git"
  },
  "keywords": [
    "project",
    "sample"
  ],
  "author": "Dmitry Weiner",
  "license": "GPL-3.0-or-later",
  "bugs": {
    "url": "https://github.com/dmitryweiner/sample-project/issues"
  },
  "homepage": "https://github.com/dmitryweiner/sample-project#readme"
}


Is this OK? (yes) yes
```
---

### Поля package.json
* [Полный список возможных полей](https://docs.npmjs.com/cli/v8/configuring-npm/package-json).
* name: имя проекта.
* version: версия вида "1.2.3" (обязательно).
* author: автор (обязательно).
* license: под какой [лицензией](https://spdx.org/licenses/).
* description: краткое описание проекта.
* keywords: ключевые слова.
* homepage: домашняя страница проекта.
* repository: ссылка на репозиторий.
* dependencies: список необходимых библиотек.
* devDependencies: библиотеки для разработки.
---

### Типы лицензий 
![licences types](assets/npm/licences.png)
---

### Установка библиотеки
* [Поиск нужной библиотеки](https://www.npmjs.com/).
* Установка:
```shell
npm install %ИМЯ_БИБЛИОТЕКИ%
# сокращённая команда:
npm i %ИМЯ_БИБЛИОТЕКИ%
```
* Установка библиотеки, нужной только для разработки:
```shell
npm install --save-dev %ИМЯ_БИБЛИОТЕКИ%
# сокращённая команда:
npm i -D %ИМЯ_БИБЛИОТЕКИ%
```
* Код библиотек сохраняется в ```./node_modules```.
---

### Различие devDependencies и dependencies
* Зависимости, перечисленные в `dependencies` нужны для сборки проекта для продакшена.
* Зависимости в `devDependencies` нужны только во время разработки и на продакшен попасть не должны.
* Есть ещё `peerDependencies` для зависимостей библиотеки, которы надо устанавливать самостоятельно.
* [Подробнее](https://stackoverflow.com/questions/18875674/whats-the-difference-between-dependencies-devdependencies-and-peerdependencies).
---

### Нужная версия
* При установке можно указывать конкретную версию библиотеки:
```shell
npm i lodash@1.0.0
```
* Можно указывать минорную или мажорную версии:
```shell
npm i lodash@~1.0 # поставит только 1.0.0 - 1.0.9
npm i lodash@^1.0 # поставит любую начиная от 1.0.0 до 1.3.0
```
* Это называется [семантическое версионирование](https://docs.npmjs.com/about-semantic-versioning).
* [Калькулятор версии](https://semver.npmjs.com/).
---

### package-lock.json
* При установке пакетов (библиотек) конкретные версии записываются в `package-lock.json`:

```json
{
  "name": "sample-project",
  "version": "1.0.0",
  "lockfileVersion": 2,
  "requires": true,
  "packages": {
    "": {
      "name": "sample-project",
      "version": "1.0.0",
      "license": "GPL-3.0-or-later",
      "dependencies": {
        "lodash": "~1.0"
      }
    },
    "node_modules/lodash": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-1.0.2.tgz",
      "integrity": "sha1-j1dWDIO1n8JwvT1WG2kAQ0MOJVE=",
      "engines": [
        "node",
        "rhino"
      ]
    }
  },
  "dependencies": {
    "lodash": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-1.0.2.tgz",
      "integrity": "sha1-j1dWDIO1n8JwvT1WG2kAQ0MOJVE="
    }
  }
}
```
---

### Что коммитить, а что нет
* Коммитить:
  * `package.json`
  * `package-lock.json`: чтобы зафиксировать конкретные версиии пакетов.
* Не коммитить `node_modules`, добавить их в .gitignore:
```gitignore
./node_modules/
```

---

### node_modules

[![node_modules](assets/npm/node_modules.png)](assets/npm/node_modules.mp4)
---

### Установка всех зависимостей
* Для склонированного проекта встаёт задача установки **всех** зависимостей, перечисленных в `package.json`.
* Это делается командой:
```shell
npm install
# сокращённая команда
npm i
```
---

### Удаление библиотеки
* Библиотека удаляется командой:
```shell
npm uninstall lodash
npm un lodash
```
* При этом обновляется package.json и package-lock.json.
* Созависимые библиотеки не будут удалены.

---

### Скрипты запуска
* В поле scripts следует описать доступные команды для запуска в проекте:
```json
{
    "scripts": {
      "start": "node index.js",
      "test": "jest",
      "lint": "eslint . --fix"
    }
}
```
* Команды вызываются с помощью конструкции `npm run %ИМЯ_КОМАНДЫ%`:
```shell
npm run start # вызывает "node index.js"
```
---

### Консольные команды
* [Полный список команд](https://docs.npmjs.com/cli/v8/commands).
* Полезные:
  * npm audit: поиск уязвимостей в установленных библиотеках.
  * npm ping: попинговать репозиторий npm.
  * npm publish: опубликовать пакет.
  * npm rebuild: пересобрать пакет.
---

### Самое частое решение проблем

![solution](assets/npm/solution.png)
---

### Альтернативы NPM
* [Yarn](https://yarnpkg.com/).
  * Намного быстрее.
  * Скачивает библиотеки в несколько потоков.
  * Хранит конфиг в таком же формате.
* [Bower](https://bower.io/).
  * Свой формат конфига. 
  * Классная птица на лого.
  * Любят владельцы MacOS.
