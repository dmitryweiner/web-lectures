---
title: React - Запросы в сеть
---

## React - Запросы в сеть

![react network](assets/fetch/api.png)

[все лекции](https://github.com/dmitryweiner/lectures/blob/main/README.md)

[Видео](https://youtu.be/wKuWpQrqquE)
---

### Как делать запросы?
* С помощью Fetch API: `fetch("URL")`
* Библиотека [react-query](https://github.com/tanstack/query)
* Библиотека [react-fetching-library](https://github.com/marcin-piela/react-fetching-library#readme)
---

### Задача
* Написать компонент, отображающий форму:
<br/><label>
ID:
<input><br/>
</label>
<button>Получить данные!</button> 
* При нажатии кнопки компонент обращается в API:
https://jsonplaceholder.typicode.com/posts/:id
* Полученные результаты показываются на экране. Поля `title` и `body`:

```json
{
    "userId": 1,
    "id": 4,
    "title": "eum et est occaecati",
    "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
}
```  
---

### Создадим разметку и базовый стейт
```tsx
import {FormEvent, useState} from "react";

export default function Fetcher() {
    const [id, setId] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO fetch
    };

    return <form onSubmit={handleSubmit}>
        <label>
            ID:
            <input type="text" value={id} onChange={e => setId(e.target.value)}/>            <br/>
        </label>
        <button type="submit">Получить данные!</button>
    </form>;
}
```
---

### Отправка запроса
```ts
type Result = {
    userId: string;
    id: string;
    title: string;
    body: string;
} | undefined;

const URL = "https://jsonplaceholder.typicode.com/posts";

// in component
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { // async!
    e.preventDefault();
    const response = await fetch(`${URL}/${id}`); // await!
    const data = await response.json();
    setResult(data);
};
```
---

### Вывод результатов
```tsx
// in component
{result && <div>
    <b>{result?.title}</b><br/>
    {result?.body}
</div>}
```
---

### А как же обработка ошибок?
```tsx
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
        const response = await fetch(`${URL}/${id}`);
        if (response.status !== 200) {
            throw Error(response.statusText);
        }
        const data = await response.json();
        setResult(data);
    } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        }
    }
};
// ...
{error && <div className={styles.error}>{error}</div>}
```
---

### Всё в сборе
```tsx
import {FormEvent, useState} from "react";
import styles from "./Fetcher.module.css";

type Result = {
    userId: string;
    id: string;
    title: string;
    body: string;
} | undefined;

const URL = "https://jsonplaceholder.typicode.com/posts";

export default function Fetcher() {
    const [id, setId] = useState("");
    const [error, setError] = useState("");
    const [result, setResult] = useState<Result>();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch(`${URL}/${id}`);
            if (response.status !== 200) {
                throw Error(response.statusText);
            } 
            const data = await response.json();
            setResult(data);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
        }
    };

    return <form onSubmit={handleSubmit}>
        <label>
            ID:
            <input type="text" value={id} onChange={e => setId(e.target.value)}/>
            <br/>
        </label>
        <button type="submit">Получить данные!</button>
        {result && <div>
            <b>{result?.title}</b><br/>
            {result?.body}
        </div>}
        {error && <div className={styles.error}>{error}</div>}
    </form>;
}
```
---

### Отправка `POST`
```tsx
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
        const data = {
          // данные из формы
          login: "admin",
          password: "123"
        };
        const response = await fetch(URL, {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        setResult(data);
    } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        }
    }
};
```
---

### Плюсы и минусы
* Плюсы:
    * Просто.
* Минусы:
    * Нет кеширования.
    * Нет состояния загрузки.
    * Лапшекод.
* __Вывод__: надо использовать библиотеку [React Query](https://dmitryweiner.github.io/lectures/React%20-%20Query.html#/).
---

### Задачи
* Написать компонент, отображающий форму:
    <br/><label>
    ID:
    <input>
    </label>
    <button>Получить данные!</button><br/> 
* При нажатии кнопки компонент обращается по адресу https://jsonplaceholder.typicode.com/posts/:id.
* Также компонент обращается по адресу https://jsonplaceholder.typicode.com/users/:userId, где `userId` получен из предыдущих данных.
* Показать экране: из post - поля `title` и `body`, из user - поля `name`, `email`.
---

### Задачи
* То же, что и на предыдущей странице, но с отображением состояния загрузки.

![spinner](assets/fetch/loading-gif.gif)
---

* Склонировать [репозиторий](https://github.com/dmitryweiner/mini-chat-server), запустить сервер.
* Из форм, 
[написанных ранее](https://dmitryweiner.github.io/lectures/React%20-%20Form%20validation.html#/) 
(логин и регистрация), отправлять запросы:
  * Регистрация: `POST /user`
  ```json
    { "nickname": "test", "password": "123" }
  ```
  * Логин: `POST /auth`
  ```json
    { "nickname": "test", "password": "123" }
  ```
* После успешной регистрации перенаправлять на логин.
После успешной авторизации перенаправлять на / (Home). 
  