---
title: Vue - Основы
---

## Vue: основы

![distracted vue](assets/vue/vue-developer.jpg)

[Дмитрий Вайнер](https://github.com/dmitryweiner)

---

### Общие факты
* Первый релиз в 2014.
* Текущая версия: 3 (на 2021й год).
* [Документация](https://v3.vuejs.org/).
* Создатель [Эван Ю](https://twitter.com/youyuxi).
---

### Основные фишки фреймворка
* Шаблон, стили и код в одном файле.
* Двустороннее связывание с моделью.
* Реализация [MVVM](https://ru.wikipedia.org/wiki/Model-View-ViewModel).
---

### Установка
* Можно использовать в standalone режиме, ничего не собирать:

```html
<head>
    <script src="https://unpkg.com/vue@next"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const App = {
                el: '#root',
                data: () => ({
                    value: "Hello world!"
                })
            };
            Vue.createApp(App).mount('#root');
        });
    </script>
</head>
<body>
<div id="root">
    <p>{{ value }}</p>
</div>
</body>

```
---

### Создание приложения
* Если есть админские права:
```shell
npm install -g @vue/cli
vue create %APP_NAME%
```
* Если нет прав:
```shell
npx -p @vue/cli vue create %APP_NAME%
```
* Для **д**ефолтной установки без лишних вопросов добавить ключ ```-d```.
* Создание приложения в графическом интерфейсе:
```shell
vue ui
```
* [Документация](https://cli.vuejs.org/guide/creating-a-project.html#vue-create).
---

### Опции:

![cli](assets/vue/cli-new-project.png)
---

### Опции:
![cli](assets/vue/cli-select-features.png)
---

### Общая структура компонента
* Компонент располагается в одном файле.
* Файл содержит три блока:
  * Шаблон.
  * Стили (не обязательный).
  * Код.
---
```vue
<template>
  <div>
    {{ value }}
    <span class="red">{{ stateValue }}</span>
  </div>
</template>
<style scoped>
  .red {
    color: red;
  }
</style>
<script>
import IncludedComponent from './IncludedComponent';

export default {
  components: { IncludedComponent },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      stateValue: 1
    }
  },
  computed: {
    computedValue() { return this.stateValue + 1 },
  },
  watch: {
    value: 'watchValue'
  },
  methods: {
    watchValue () { console.log('value is changed') }
  },
  mounted () { console.log('Component is mounted') }
}
</script>
```
---

### Поля компонента
* **components**: компоненты, использованные в данном компоненте.
* **props**: переданные пропсы.
* **data()**: изменяемые данные (аналог state).
* **computed**: вычисляемые данные.
* **watch**: наблюдатель над изменяемыми данными.
* **methods**: методы компонента.
* **setup**: вызывается до монтирования компонента.
* **mounted**: вызывается после монтирования.
* **unmounted**: после демонтирования.
---

### Жизненный цикл компонента
![](assets/vue/lifecycle.png)
---

### Передача пропсов
* Один компонент может вызвать другой (в смысле, использовать в шаблоне).
* При вызове можно передать пропсы.
* Они могут быть использованы в другом компоненте.
* При изменении пропсов компонент перерисовывается автоматически.
---

### Потомок 
```vue
<template>
  <div><!-- Без этого элемента линтер ругается -->
    {{ value }}
  </div>
</template>
<script>
export default {
  name: "Child",
  props: {
    value: {
      type: String, // Указываем явно тип пропса
      required: true // Пропс обязателен
    }
  }
}
</script>
```
---

### Родитель
```vue
<template>
  <Child value="42"/><!-- Если не передать пропс, линтер ругается -->
</template>
<script>
import Child from "./Child";

export default {
  name: "Parent",
  components: { Child }
}
</script>
```
---

### Изменение стейта
* При изменении стейта компонент обновляется автоматически:
```vue
<template>
    <div>
      {{ timer }}
    </div>
</template>
<script>
export default {
    name: "Timer",
    data() {
      return {
        timer: 0
      }
    },
    mounted() {
      this.intervalId = setInterval(() => this.timer = this.timer + 1, 1000);
    },
    unmounted() {
      clearInterval(this.intervalId);
    }
}
</script>
```
---

### Вычислимые свойства
---

### Watcher (наблюдатель)
---

### Передача событий
---
### Язык шаблонов
---

### Директивы шаблонов
---

### Условия
---

### Обход массива
---

### V-bind (короткая и полная записи)
---

### Стили локальные и общие
---

### Тестирование
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
