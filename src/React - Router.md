---
title: React - Маршрутизация с помощью библиотеки react-router-dom
---

## Маршрутизация react-router-dom

![react-router-dom logo](assets/react-router/logo.png)

[все лекции](https://github.com/dmitryweiner/lectures/blob/main/README.md)

[Видео](https://youtu.be/XTDyYjpIS_Q)
---

### SPA 🧖🏻‍
* Веб-приложение может содержать множество страниц с разной информацией.
* При переходе между страницами меняется URL. Само приложение при этом не перезагружается.
* Также работает кнопка назад.
* Это называется
  [Single Page Application](https://ru.wikipedia.org/wiki/%D0%9E%D0%B4%D0%BD%D0%BE%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%87%D0%BD%D0%BE%D0%B5_%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5)
  ([пример](https://react.microfrontends.app/)).
---

### Это работа для роутера
* Этим занимается т.н. роутер.
* Он перехватывает изменение URL.
* Сообщает компонентам текущий URL.
* Может его произвольно менять.
*  Рендерит компоненты в соответствии с URL.

---

### react-router-dom
* Я рекомендую библиотеку ```react-router-dom``` версию 6.4.2 (на 2022 год).
  * [Документация](https://reactrouter.com/en/main/start/overview),
  [руководство](https://reactrouter.com/en/main/start/tutorial).
* Установка:
```shell
  npm i react-router-dom@6
```
---
### Подключение
В `src/index.js`:
```js
import { BrowserRouter as Router } from 'react-router-dom';
//import { HashRouter as Router } from 'react-router-dom';
ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);
```
Главное не подключать просто Router, ничего работать не будет
----

![plain router](assets/react-router/plain-router.jpeg)
---

### Типы роутеров
* Для хостингов с собственным доменом, где можно настроить Nginx/Apache надо использовать `BrowserRouter`.
```js
import { BrowserRouter as Router } from 'react-router-dom';
```
* Для сайтов, лежащих в каталоге (Github Pages) и без доступа к конфигам сервера подойдёт `HashRouter`.
```js
import { HashRouter as Router } from 'react-router-dom';
```
* Для целей тестирования применяется `MemoryRouter`.
---

### Типы роутеров
* `BrowserRouter`:
  * https://site.com/profile
  * https://site.com/users
  * https://site.com/todos
* `HashRouter`:
  * https://site.com/app/#/profile
  * https://site.com/app/#/users
  * https://site.com/app/#/todos
---

### Определяем роуты
В ```App.js```:

```js
import {
    Route,
    Routes
} from 'react-router-dom';
// in render
<Routes>
    <Route path='/path1' element={<Component1 />} />
    <Route path='/path2' element={<Component2 />} />
    <Route path='/path3/:id' element={<Component3 />} />
</Routes>
```
---

### Пример
```jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
```
---

### Дефолтный роут
Любой URL, отличный от 
  * /about
  * /home
  * /users 

будет вести на /home:

```jsx
<Routes>
  <Route path="/about" element={<About />} />
  <Route path="/users" element={<Users />} />
  <Route path="/home" element={<Home />} />
  <Route path="*" element={<Navigate to="/home" replace />} />
</Routes>

```
---

### Вложенные роуты
* Роуты могут быть вложены.
* Внутри компонента `<Routes />`может быть сколько угодно `<Route />`.
* [Документация](https://reactrouter.com/en/v6.3.0/getting-started/overview#nested-routes).

```jsx
<Routes>
  {/* URL /invoices */}
  <Route path="invoices" element={<Invoices />}>
    {/* URL /invoices/123 */}
    <Route path=":invoiceId" element={<Invoice />} />
    {/* URL /invoices/sent */}
    <Route path="sent" element={<SentInvoices />} /> 
  </Route>
</Routes>
```
---

### Компонент ```Route```
* Задаёт соответствие между URL и тем, что отрисовывать.
* Должен быть внутри ```<Routes />```.
* ```path``` &mdash; на какой URL реагировать.
* ```element``` &mdash; какой компонент показывать.
* `index` &mdash; является ли этот роут индексным (см. далее).
* ```caseSensitive``` &mdash; принимать во внимание регистр символов.
* [Подробнее](https://reactrouter.com/en/main/route/route).
---

### Формат `path`
* Возможные значения:
```
/groups
/groups/admin
/users/:id
/users/:id/messages
/files/*
/files/:id/*
```
* Звёздочка означает, что дальше идёт любая строка.
* `:id` (может быть и не id) означает, что это значение мы хотим видеть в качестве параметра в компоненте.
---

### Доступ к параметрам роута
* Если роут определён так:
```jsx
<Route path="/user/:id" element={<User />} />
```
* Под него подходят значения:
```jsx
/user/123
/user/abc
/user -- не подходит
```
* Доступ к параметрам из компонента:
```jsx
import { useParams } from 'react-router-dom';
function User() {
    const { id } = useParams();
    // если URL /user/1, то компонент выведет 1
    return <>{id}</>
}
```
---

### Переход на нужный роут
* Переход реализован с помощью компонента `<Link />`.
* Переход происходит при нажатии.
* Использование:
```jsx
import { Link } from 'react-router-dom';
//
<Link to="/home">Домой</Link>
```
* [Подробнее](https://reactrouter.com/en/main/components/link).
---

### Хуки для доступа к роутеру из компонента
* [useNavigate](https://reactrouter.com/en/main/hooks/use-navigate): история перемещений, переход.
* [useLocation](https://reactrouter.com/en/main/hooks/use-location): текущий URL.
* [useParams](https://reactrouter.com/en/main/hooks/use-params): параметры, переданные в роут вида ```/user/123```.
* useMatch: какая часть URL совпала.
---

### Программный переход на нужный роут
* Иногда необходимо перейти на нужный роут не из JSX, а программно.
* Например, после успешной авторизации можно показать экран Home.
* [Подробнее](https://reactrouter.com/en/main/hooks/use-navigate).

```jsx
import { useNavigate } from "react-router-dom";
function Form() {
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
  };
  return <form onSubmit={onSubmit}>...</>
}
```
---

### Переход при нажатии на кнопку
```jsx
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
    return <>
        <button
            onClick={() => navigate('/registration')}>
            Регистрация
        </button>
    </>;
}
```
---

### Использование лейаута
* Роут может быть обёрнут в другой роут. Внутренний компонент может отображаться внутри компонента внешнего:
```jsx
<Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
</Route>
```
* Параметр index означает, что роут реагирует на путь родителя (в данном случае /).
* При этом внутренний компонент отображается в `<Layout/>` вместо специального компонента `<Outlet />`.
---

[живой пример](https://stackblitz.com/github/remix-run/react-router/tree/main/examples/basic?file=src%2FApp.tsx)

```jsx
import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Basic Example</h1>

      <p>
        This example demonstrates some of the core features of React Router
        including nested <code>&lt;Route&gt;</code>s,{" "}
        <code>&lt;Outlet&gt;</code>s, <code>&lt;Link&gt;</code>s, and using a
        "*" route (aka "splat route") to render a "not found" page when someone
        visits an unrecognized URL.
      </p>

      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
```
---

### Роуты только для залогиненых пользователей
* Можно сделать некоторые роуты закрытыми от анонимных пользователей.
* [Подробнее](https://www.robinwieruch.de/react-router-private-routes/).
* [Живой пример](https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=package.json,src%2FApp.tsx).
---

### Другие разнообразные примеры
Примеры использования react-router-dom:

https://github.com/remix-run/react-router/tree/main/examples
---

### Альтернативные роутеры
* https://reach.tech/router/api/Router
* https://router5.js.org/integration/with-react
* https://github.com/swipely/aviator
