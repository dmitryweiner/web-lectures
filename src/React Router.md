---
title: Лекции по фронтенду - React router
---

## Библиотека react-router-dom

![react-router-dom logo](assets/react-router/logo.png)

[Дмитрий Вайнер](mailto:dmitry.weiner@gmail.com)

---

### Идея
* Хорошо бы в адресной строке у нас был осмысленный URL, соответствующий разным страницам веб-приложения.
  * Это называется
    [SPA](https://ru.wikipedia.org/wiki/%D0%9E%D0%B4%D0%BD%D0%BE%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%87%D0%BD%D0%BE%D0%B5_%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5).
* Хорошо бы мы ходили между страницами, а приложение при этом не перезагружалось.
* Хорошо бы работала кнопка назад.
* Хорошо бы приложение могло редиректить на нужную страницу само.

---

### Это работа для роутера
* Этим занимается т.н. роутер.
* Он перехватывает изменение URL.
* Сообщает компонентам текущий URL.
* Может его произвольно менять.
*  Рендерит компоненты в соответствии с URL.

---

### Установка и подключение
* Я выбрал библиотеку ```react-router-dom``` версию 5.2 (на 2020 год).
  * Вообще есть много библиотек для роутинга.
* [Документация](https://reactrouter.com/web/guides/quick-start).
* Установка:
```shell
  npm i react-router-dom@5
```
* Для хостингов с собственным доменом надо использовать ```BrowserRouter```.
* Для сайтов, лежащих в каталоге (Github Pages) подойдёт ```HashRouter```.

---
### Подключение
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
---

![plain router](assets/react-router/plain-router.jpeg)

---

### Декларативный роутинг
* В ```App```:
```js
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
// in render
<Switch>
    <Route path='/home' component={Home} />
    <Route path='/appointments' component={Appointments} />
    <Redirect from='/' to='/home'/>
</Switch>
```
---

### Вложенные роуты
* Роуты могут быть вложены.
* Внутри компонента может быть сколько угодно ```<Switch>```.
* [Живой пример](https://reactrouter.com/web/example/nesting).

---

### Компонент ```Route```
* Задаёт соответствие между URL и тем, что отрисовывать.
* Должен быть внутри ```<Switch />```.
* ```path``` &mdash; на какой URL реагировать.
* ```component ``` &mdash; какой компонент показывать.
* ```children``` &mdash; набор компонентов.
* ```render ``` &mdash; вызвать метод рендера.
* ```exact``` &mdash; требовать точного совпадения.
* ```sensitive``` &mdash; принимать во внимание регистр символов.
* ```strict``` &mdash; принимать во внимание слэши.

---

![exact or strict](assets/react-router/fry.jpeg)

[Объяснение мема](https://stackoverflow.com/questions/52275146/usage-of-exact-and-strict-props)

---

### Компонент ```Route```
* Можно использовать так:

```jsx
<Route path='/home' component={Home} />
```
* А можно и так:

```jsx
<Route path='/home'><Home/></Route>
```

* Или даже так:

```jsx
<Route path='/home' render={ () => <Home/> } />
```

---

### Компонент ```Route```
* Роут может быть с параметром, что-то вроде ```/chat/123``` или ```/user/456```.
* Это делается с помощью конструкции:
```jsx
<Route path="/user/:username" component={User} />
```
* Доступ к параметрам из компонента:
```jsx
import { useParams } from 'react-router-dom';
function User() {
    const { username } = useParams();
    return <>{username}</>
}
```

---

### Компонент ```Redirect```
```jsx
<Redirect from='/' to='/home' />
```
* Должен быть внутри ```<Switch />```.
* ```from``` &mdash; какой урл редиректим.
* ```to``` &mdash; куда редиректим.

---

### Компонент ```Link```
* Может быть где угодно.
* Осуществляет переход по маршруту при нажатии.
* Использование:
```jsx
import { Link } from 'react-router-dom';
//
<Link to="/home">Домой</Link>
```  
* ```to```: URL куда идти.

---

### Хуки для доступа к роутеру из компонента
* [Документация](https://reactrouter.com/core/api/Hooks).
* useHistory: история перемещений, переход.
* useLocation: текущий URL.
* useParams: параметры, переданные в роут вида ```/user/123```.
* useRouteMatch: какая часть URL совпала.

---

### Переход на другой URL
```jsx
import { useHistory } from 'react-router-dom';
function Login() {
    const history = useHistory();
    return <>
        <button
            onClick={() => history.push('/registration')}>
            Регистрация
        </button>
    </>;
}
```

---

### Доступ к параметрам роута:
```jsx
// App.js
<Route path="/user/:username" component={User} />

// User.js
import { useParams } from 'react-router-dom';
function User() {
    const { username } = useParams();
    return <>{username}</>
}
```

---

### Роуты только для залогиненых пользователей
* Можно сделать некоторые роуты закрытыми от анонимных пользователей.
* [Живой пример](https://reactrouter.com/web/example/auth-workflow).

---

### Альтернативные роутеры
* https://reach.tech/router/api/Router
* https://router5.js.org/integration/with-react
* https://github.com/swipely/aviator
* https://reactrouter.com/web/api/MemoryRouter
