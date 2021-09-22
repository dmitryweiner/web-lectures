---
title: VueX
---

## VueX &mdash; менеджер состояний

![vuex](assets/vuex/vuex-logo.png)

[Дмитрий Вайнер](https://github.com/dmitryweiner)

---

### Проблематика

![wrong data flow](assets/vuex/wrong-data-flow.png)
---

![data flow](assets/vuex/data-flow.png)
---

### Установка
* [Документация](https://next.vuex.vuejs.org/guide/).
* Все указания относятся к VueX **4** и Vue **3**.

```shell
npm i vuex
```

```js
import { createApp } from 'vue'
import { createStore } from 'vuex'

const store = createStore({
    state () {
      return { /* initial state */ }
    },
    mutations: { /* */ },
    actions: { /* */ },
    getters: { /* */ },
});

const app = createApp({ /* your root component */ });

// Install the store instance as a plugin
app.use(store);
```
---

### При создании проекта
* Можно выбрать опцию VueX при создании проекта, тогда всё поставится само:

![vuex create app](assets/vuex/vuex-create-app.png)
---

### Подключение
* После ```app.use(store);``` у каждого компонента появляется объект ```this.$store```.
* Через этот объект можно взаимодействовать со стором:
  * Получать актуальное состояние.
  * Изменять его.
---

### Метод state
* Метод должен возвращать начальное состояние стора:
```js
state () {
      return {
          todos: [
              { id: 1, title: "Погладить кошку", isDone: true },
              { id: 2, title: "Почистить картошку", isDone: false }
          ]
      }
},
```
---

### Getters
* Геттеры &mdash; методы, калькулирующие данные по текущему состоянию стора.
* Очень похожи на computed методы в компонентах Vue.
* Будут пересчитываться только при изменении стора, когда выйдет Vue 3.1 ([issue](https://github.com/vuejs/vuex/issues/1878)).
```js
getters: {
    doneTodosCount (state) {
      return state.todos.filter(todo => todo.isDone).length;
    }
}
```
---

### Getters
* Доступ в компоненте:
```vue
computed: {
      doneTodosCount () {
        return this.$store.getters.doneTodosCount;
      }
}
```
---

### Связь Getters с computed
* Можно автоматически прикрутить геттеры к computed в компоненте, чтобы не писать для каждого геттера такую обёртку:
```js
import { mapGetters } from 'vuex'
export default {
      // ...
      computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
          'doneTodosCount',
          'anotherGetter',
          // ...
        ])
      }
}
```
---

### Mutations
* Мутации &mdash; методы, **синхронно** изменяющие стор:
```js
mutations: {
    add (state, payload) {
      const newTodo = {
        id: Math.random().toString(36).substr(2),
        title: payload,
        isDone: false
      }
      state.todos.push(newTodo);
    }
}
```
* Вызов в компоненте:
```vue
methods: {
      add() {
        this.$store.commit("add", "Полить цветы");
      }
},
```
---

### Mutations
* Мутации изменяют объект state.
* Его не надо пересоздавать, как в Redux. Это происходит автоматически под капотом.
* При изменении стейта обновятся геттеры.
---

### Подключение мутаций к methods
* Чтобы не писать эти обёртки, можно подключить мутации к methods компонента:

```vue
import { mapMutations } from 'vuex';

export default {
  // ...
  methods: {
    ...mapMutations([
      'add', /* map `this.add()` to `this.$store.commit('add')` */
    ])
  }
}
```
---

### Actions
* Экшены не изменяют стейт сами, они для этого вызывают мутации.
* Экшены бывают асинхронные.
* Экшены могут вызывать экшены (саги, привет!).
```js
actions: {
    add({ commit, state, dispatch }, payload) {
        commit("add", payload);
    }
}
```
---

### Actions: вызов в компоненте
* Можно так:

```vue
methods: {
      add() {
        this.$store.dispatch("add", "Полить цветы");
      }
},
```
* Но лучше замапить:

```js
import { mapActions } from 'vuex'

export default {
      // ...
      methods: {
        ...mapActions([
          'add', // map `this.add()` to `this.$store.dispatch('add')`
        ]),
      }
}

```
---

![](assets/vuex/action-inside-action.jpg)
---

### Асинхронные экшены
* Надо использовать синтаксический сахар async/await:
```js
actions: {
      async actionA ({ commit }) {
        commit('gotData', await api.getData());
      },
      async actionB ({ dispatch, commit }) {
        await dispatch('actionA') // wait for `actionA` to finish
        commit('gotOtherData', await api.getOtherData());
      }
}
```
---

### Несколько модулей
* Желательно разделить стор на несколько модулей по числу сущностей.
* Это делается для облегчения стора и ясной кодовой базы.
* Также это делается, чтобы компоненты не обновлялись от чужих изменений.
* [Документация](https://next.vuex.vuejs.org/guide/modules.html).
---

### Модули

```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = createStore({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> `moduleA`'s state
store.state.b // -> `moduleB`'s state
```
---

### Модули
* В экшене есть доступ к корневому стейту **rootState**, если нужны данные из других модулей.
* rootState передаётся как один из параметров экшена:
```js
const moduleA = {
      // ...
      actions: {
        incrementIfOddOnRootSum ({ state, commit, rootState }) {
          if ((state.count + rootState.count) % 2 === 1) {
            commit('increment')
          }
        }
      }
}
```
---

### Работа с TypeScript

[Документация](https://next.vuex.vuejs.org/guide/typescript-support.html)

```ts
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { RootState } from "@/store/type";

type StateType = {
  list: Array<string>;
};

const state: StateType = {
  list: [],
};

const mutations: MutationTree<StateType> = {
  ADD_TODO: (state, item: string): void => {
    state.list.push(item);
  },
};

const getters: GetterTree<StateType, RootState> = {
  list: (state): Array<string> => state.list,
};

const actions: ActionTree<StateType, RootState> = {
  async addTodo({ commit }, data: string) {
    commit("ADD_TODO", data);
  },
};

export default {
  namespace: true,
  state,
  mutations,
  getters,
  actions,
};
```
---

### Тестирование
* Тестирование производится с помощью фреймворка _chai_.
* Getters, mutations выносятся в отдельные объекты и тестируются отдельно.
* Для тестирования экшенов используется inject-loader.
* [Документация](https://next.vuex.vuejs.org/guide/testing.html).
---

### Альтернативы: pinia
* VueX довольно сложно типизировать, поэтому написали библиотеку [pinia](https://github.com/posva/pinia).

```js
import { defineStore } from 'pinia'

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useMainStore = defineStore('main', {
  // a function that returns a fresh state
  state: () => ({
    counter: 0,
    name: 'Eduardo',
  }),
  // optional getters
  getters: {
    doubleCount() {
      return this.counter * 2
    },
    // use getters in other getters
    doubleCountPlusOne() {
      return this.doubleCount * 2 + 1
    },
  },
  // optional actions
  actions: {
    reset() {
      // `this` is the store instance
      this.counter = 0
    },
  },
})
```
---

### Полезные ссылки
* https://next.vuex.vuejs.org/guide/