---
title: React - Запросы в сеть c библиотекой React Query
---

## React - Запросы в сеть c библиотекой React Query

![react-query](assets/fetch/react-query.jpg)

[все лекции](https://github.com/dmitryweiner/web-lectures/blob/main/README.md)

[Видео](https://youtu.be/wKuWpQrqquE)
---

### Перепишем форму
* Перепишем форму, делающую запросы с помощью [`fetch`](https://dmitryweiner.github.io/web-lectures/React%20-%20Network.html#/).
* Минусы использования `fetch()`:
    * Нет кеширования.
    * Нет состояния загрузки.
    * Лапшекод.
---

![react-query](assets/fetch/react-query.jpg)

* [Документация](https://tanstack.com/query/v4/docs/overview), [примеры](https://github.com/TanStack/query/tree/main/examples/react).
* Установка:
```sh
npm i @tanstack/react-query
```
* Использование:
```js
const { isLoading, error, data } = useQuery(['repoData'], () =>
    fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res =>
      res.json()
    )
)
if (isLoading) return 'Loading...'
if (error) return 'An error has occurred: ' + error.message
```
---

### Установка в index.tsx|index.jsx
```ts
import {QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <App/>
  </QueryClientProvider>
);
```  
---

### Переписываем компонент
```tsx
// в компоненте
const [id, setId] = useState("");
const [input, setInput] = useState("");

const {data, error, isFetching} = useQuery(
    ['post', id], // ключ для кэша
    async () => { // метод получения данных
        const response = await fetch(`${URL}/${id}`);
        if (response.status !== 200) {
           throw Error(response.statusText);
        }
        return await response.json();
    },
    {enabled: !!id} // если id не задан, запрос не делается
);

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setId(input);
};
``` 

---

### Вывод данных
```tsx
// в рендере компонента
{isFetching ? (
    "Loading..."
) : error instanceof Error ? (
    <span>Error: {error.message}</span>
) : (
    <>
        <h1>{data?.title}</h1>
        <div>
            <p>{data?.body}</p>
        </div>
        <div>{isFetching ? "Background Updating..." : " "}</div>
    </>
)}
``` 
---

### Выносим получение данных в хук
```tsx
type Post = {
    userId: string;
    id: string;
    title: string;
    body: string;
} | undefined;

const URL = "https://jsonplaceholder.typicode.com/posts";

const getPostById = async (id: string): Promise<Post> => {
    const response = await fetch(`${URL}/${id}`);
    if (response.status !== 200) {
        throw Error(response.statusText);
    } 
    return await response.json();
};

function usePost(postId: string) {
    return useQuery(
        ["post", postId],
        () => getPostById(postId),
        {enabled: !!postId}
    );
}
```
---

### Всё в сборе 
```tsx
import {FormEvent, useState} from "react";
import styles from "./Fetcher.module.css";
import {useQuery} from "@tanstack/react-query";

type Post = {
    userId: string;
    id: string;
    title: string;
    body: string;
} | undefined;

const URL = "https://jsonplaceholder.typicode.com/posts";

const getPostById = async (id: string): Promise<Post> => {
    const response = await fetch(`${URL}/${id}`);
    if (response.status !== 200) {
        throw Error(response.statusText);
    }
    return await response.json();
};

function usePost(postId: string) {
    return useQuery(
        ["post", postId],
        () => getPostById(postId),
        {enabled: !!postId}
    );
}

export default function FetcherQuery() {
    const [id, setId] = useState("");
    const [input, setInput] = useState("");

    const {data, error, isFetching} = usePost(id);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setId(input);
    };

    return <form onSubmit={handleSubmit}>
        <label>
            ID:
            <input type="text" value={input} onChange={e => setInput(e.target.value)}/>
            <br/>
        </label>
        <button type="submit">Получить данные!</button>
        {isFetching ? (
            "Loading..."
        ) : error instanceof Error ? (
            <span>Error: {error.message}</span>
        ) : (
            <>
                <h1>{data?.title}</h1>
                <div>
                    <p>{data?.body}</p>
                </div>
                <div>{isFetching ? "Background Updating..." : " "}</div>
            </>
        )}
    </form>;
}
```
---

### Кеширование 
Надо задать параметр staleTime, чтобы запросы кешировались. По умолчанию он 0, запросы не кешируются.
```ts
useQuery(
    ["post", postId],
    () => getPostById(postId),
    {
         enabled: !!postId,
         staleTime: 10000 // <-- время протухания кеша в ms
    }
);
```

[Подробнее](https://tanstack.com/query/v4/docs/guides/caching), 
[ещё](https://tanstack.com/query/v4/docs/guides/important-defaults).
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
