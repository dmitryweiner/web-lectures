---
title: React - Библиотеки компонентов
---

## React - Библиотеки компонентов

[все лекции](https://github.com/dmitryweiner/lectures/blob/main/README.md)
---
### Краткий обзор библиотек
* Как ставить.
* Как подключать.
* Демо.
* Документация.
* Гибкость и желание странного (календари, ...).
* Актуальность (когда последний коммит, как часто релизы).
---

### ![Material-UI](assets/component-libraries/mui.png) Material-UI
* [Репозиторий](https://github.com/mui/material-ui).
* Установка:

```shell
npm install @mui/material @emotion/react @emotion/styled
```
* Подключение:

```js
import * as React from 'react';
import Button from '@mui/material/Button';

function App() {
  return <Button variant="contained">Hello World</Button>;
}
```
---

### Material-UI
* Демо:
  * https://www.react-most-wanted.com/
  * https://github.com/alexanmtz/material-sense
* [Документация](https://mui.com/material-ui/getting-started/overview/).
* Релизы [часто (раз в неделю примерно)](https://github.com/mui/material-ui/releases). 
---

### Выбор даты и времени в Material-UI
* Компоненты для [выбора времени и даты](https://mui.com/x/react-date-pickers/getting-started/)
очень продвинутые:

![mui-date](assets/component-libraries/mui-date.png)
---

### <img src="assets/component-libraries/bootstrap.png" height="60"> React Bootstrap
* [Документация](https://react-bootstrap.github.io/getting-started/introduction).
* Установка:

```shell
npm install react-bootstrap bootstrap
```
* Подключение CSS в index.js:

```js
import 'bootstrap/dist/css/bootstrap.min.css';
```
* Подключение компонентов:

```js
import Button from 'react-bootstrap/Button';
// ..
<Button as="a" variant="primary">Button as link</Button>
```
---

### React Bootstrap
[Демо](https://github.com/emaildano/react-bootstrap-example)

![bootstrap-form](assets/component-libraries/bootstrap-form.png)
---

### ![](assets/component-libraries/blueprint.png) Blueprint 
* [Репозиторий](https://github.com/palantir/blueprint).
* [Документация](https://blueprintjs.com/docs/).
* Установка:

```shell
npm i @blueprintjs/core
```

* Использование:

```js
import { Button } from "@blueprintjs/core";
// ...
<Button intent="success" text="button content" onClick={incrementCounter} />
```
---

### Blueprint
* [Демо](https://codesandbox.io/examples/package/@blueprintjs/core).
* [Ещё демо](https://dribbble.com/Palantir).

![](assets/component-libraries/blueprint-demo.png)
---

### React Admin
* Готовый компонент для админки.
* [Документация](https://marmelab.com/react-admin/Tutorial.html).
* [Демо](https://marmelab.com/react-admin-demo/).
---

### Поисковик по отдельным компонентам
* [Поиск](https://bit.cloud/components?q=datepicker) (для примера ищем datepicker).

![bit.cloud](assets/component-libraries/byt.png)
