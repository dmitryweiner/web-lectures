---
title: React - Основы
---

## React: основы

![react logo](assets/react-basic/react-logo.png)

[Дмитрий Вайнер](https://github.com/dmitryweiner)

---

### Схема работы веб-приложения
1. Отреагировать на действия пользователя:
    * клики;
    * ввод данных;
2. Послать какие-нибудь запросы в сеть, получить ответы;
3. Изменить состояние;
4. Перерисовать интерфейс.
---

### Идея
* Что если написать библиотеку, которая будет перерисовывать интерфейс **автоматически**
  в ответ на изменение состояния?
* Хорошо бы она переририсовывала интефейс не весь, а **только то,
  что изменилось**.
* Тогда мы сможем отделить логику от представления.
---

### Обновление DOM-дерева
* Реакт строит виртуальное [DOM-дерево](https://ru.wikipedia.org/wiki/Document_Object_Model).
* При изменении состояния дерево обновляется.
* Далее происходит отрисовка только только того, что изменилось.
---

### Обновление DOM-дерева
![DOM update](assets/react-basic/dom.gif)
---

### Установка
* Использование [CDN](https://ru.wikipedia.org/wiki/Content_Delivery_Network).
* Создание проекта с помощью [CRA](https://github.com/facebook/create-react-app).
* Редактирование конфига Webpack вручную.
* На слайдах далее ➡
---

### Использование CDN
* Для маленьких проектов удобнее использовать React без транспиляции и сборки.
* Транспиляция будет происходить прямо в браузере благодаря библиотеке [Babel Standalone](https://babeljs.io/docs/en/babel-standalone).
* Для запуска нужно подключить 2 библиотеки:
  * React.
  * React-DOM.
---

### Использование CDN
```html
<!doctype html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <script src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="text/babel">
        function App() {
            return <>Hello world</>;
        }
        ReactDOM.render(<App/>, document.getElementById('root'));
    </script>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```
[Живой пример](https://dmitryweiner.github.io/907sv-react/counter.html)
---

### Create React App
* Можно воспользоваться создателем приложений:
```shell
npx create-react-app %имя_приложения%
```
* Можно указать разнообразные шаблоны:
  * typescript
  * redux
  * redux-typescript
```shell
npx create-react-app my-app --template [template-name]
```
---

### Ручное создание конфига для webpack
* Пример конфига:
```js
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const paths = require('./paths');
module.exports = {
    entry: [paths.src + '/index.js'],
    output: {
        path: paths.build,
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.static,
                    to: paths.build,
                    globOptions: {
                        ignore: ['**/index.html']
                    }
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: paths.static + '/index.html', // template file
            filename: 'index.html' // output file
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    context: 'src' // prevent display of src/ in filename
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    }
};
```
* [Пример проекта](https://github.com/dmitryweiner/html-chat).
---

### Компонент
* В реакте всё состоит из компонентов.
* Корневой компонент по традиции называется ```App```, он монтируется в DOM:
```js
function App() {
    return <>Hello world</>;
}
ReactDOM.render(<App/>, document.getElementById('root'));
```
* Компонент &mdash; это функция, которая должна возвращать [JSX](https://reactjs.org/docs/introducing-jsx.html).
* В JSX могут быть HTML-теги или другие компоненты.
---

### Вызов компонента
* Компонент может быть вызван из другого компонента:
```js
function Component() {
    return <>Hello world</>;
}
function App() {
    return <><Component /></>;
}
```
* При вызове можно передать параметры, которые будут видны в компоненте:
```js
function Item({ title }) {
    return <>The title is: {title}</>;
}
function App() {
    return <><Item title="123" /></>;
}
```
---

### Вызов компонента
В компонент можно передавать не только строки, но и числа, и переменные:
```jsx
<Component
    text="some test" // так передаем строку
    number={123} // число
    value={value} // значение переменной
    someFunction={functionName} // ссылка на функцию
    anotherFunction={() => console.log(123)} // анонимная функция 
/>
```
---

### Узлы JSX
* JSX состоит из узлов (листьев). Нельзя вернуть несколько узлов просто так.
* Они должны быть обёрнуты в <></> (Это короткая запись [React.Fragment](https://reactjs.org/docs/fragments.html)).
* Так неправильно ❌:
```jsx
return <p>Покормить кота</p>
     <p>Искупать рыб</p>;
```
* Так правильно ✅:
```jsx
return <>
    <p>Покормить кота</p>
    <p>Искупать рыб</p>
</>;
```
---

### JSX и фигурные скобки { }
* В фигурных скобках можно писать любой валидный код.
* То, что он вернёт, будет встроено в DOM или передано компоненту.
* Вернуть он должен строку, число или JSX, всё остальное вызовет ошибку:
```jsx
{new Date().toLocaleDateString()}{/* выдаст текущую дату */}
{1 + '1'}{/* выдаст 11 */}
{[1, 2, 3]}{/* ошибка! */}
```
---

### Вывод списков
* Элементы списка [должны обладать атрибутом key](https://reactjs.org/docs/lists-and-keys.html),
  чтобы при изменении списка не обновлять его весь, а только изменённые элементы. 
* Если у элементов есть ```id```, нужно использовать его.
* Если нет возможности сгенерировать ```id```, можно использовать индекс массива.
```jsx
function List() {
    const items = [1, 2, 3];
    return <ul>
        {items.map((item, index) => <li key={index}>{/* временное решение */}
            {item}
        </li>)}
    </ul>;
}
```
---

### Вывод списков
* Если у элементов есть id, нужно использовать его.
```jsx
function List({ items }) {
    return <ul>
        {items.map(item => <li key={item.id}>{/* хорошее решение */}
            {item.title}
        </li>)}
    </ul>;
}
```
---

### Условия в JSX
https://reactjs.org/docs/conditional-rendering.html
---
### Полезные ссылки
* https://learn-reactjs.ru/home
* https://www.codecademy.com/learn/react-101
* https://jstutorial.medium.com/react-animated-tutorial-7a46fa3c2b96
