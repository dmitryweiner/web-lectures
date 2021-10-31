---
title: Angular - State managers
---

## Менеджеры состояния в Angular

![ngrx](assets/angular-state/ngrx.gif)

[Дмитрий Вайнер](https://github.com/dmitryweiner)

---

### Варианты
* [NGRX](https://ngrx.io/guide/store).
* [NGXS](https://www.ngxs.io/).
* [MobX](https://github.com/mobxjs/mobx-angular).
---

### NGRX: особенности
* За основу взяты идеи Redux.
* Изоляция сайд-эффектов.
* Интеграция с роутером в Angular.
* Активное использование библиотеки [RxJS](https://dmitryweiner.github.io/lectures/RxJS.html#/).
---

![ng-rx-logos](assets/angular-state/ng-rx-logos.png)

* [Документация](https://ngrx.io/guide/store).
* [Вызовы к API](https://medium.com/angular-in-depth/handle-api-call-state-nicely-445ab37cc9f8).
* [Пример проекта](https://github.com/zhaosiyang/loadable-example/tree/e505183bd25d55c173be03ad3ea43f019a373c50).
---
![](assets/angular-state/ngrx-cycle.png)
---

### Установка
* Без создания черновика стора:
```shell
ng add @ngrx/store@latest
```
* С генерацией черновика стора:
```shell
ng add @ngrx/store@latest --minimal false
```
---

### Генерация стора
```shell
ng g store State --root --module app.module.ts
 create src/app/reducers/index.ts
 update src/app/app.module.ts
```
---

### Экшены
* Создание экшена:
```ts
// actions.ts
import { createAction } from '@ngrx/store';
export const actionName = createAction('action name');
```
* Для примера опишем счётчик с инкрементом и декрементом:
```ts
import { createAction } from '@ngrx/store';
export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');
```
---

### Акция с нагрузкой
* Создадим где-то интерфейс:
```ts
interface Todo {
    id: string;
    title: string;
    isDone: boolean;
}
```
* В экшенах:
```ts
import { createAction, props } from '@ngrx/store';
export const addTodo = createAction(
  'add todo',
  props<{title: string}>() // можно props<string>(), если один параметр
);
```
---

### Редьюсер
* Примерный редьюсер с инкрементом и декрементом:

```ts
import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';
 
export const initialState = 0;
 
export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, (state) => 0)
);
```
---

### Редуктор с параметрами
```ts
const initialState: Todo[] = [];
export const todosReducer = createReducer(
  initialState,
  on(addTodo, (state, { title }) => {
    const todo = {
        id: Math.random().toString(36).substr(2),
        title,
        isDone
    }
    return [...state, todo];
  })
);
```
```ts
this.store.dispatch(addTodo({ title: "Покормить кота" }));
```
---

### Подключение в модуле
```ts
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './somewhere';
 
@NgModule({
  /* тут всё, что было */
  imports: [
      /* другие импорты */
      StoreModule.forRoot({ 
          count: counterReducer // название ключа -- название поля в сторе
      })
  ],
})
```
---

### Использование в компоненте
```ts
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from '../counter.actions';

export class CounterComponent {
    count$: Observable<number>; // привет из RxJS

    constructor(private store: Store<{ count: number }>) {
        // вместо строки может быть и селектор
        this.count$ = store.select('count');
    }

    increment() {
        this.store.dispatch(increment());
    }

    decrement() {
        this.store.dispatch(decrement());
    }

    reset() {
        this.store.dispatch(reset());
    }
}
```
---

### В шаблоне
* Внимание на **async**:
```angular2html
<button (click)="increment()">Increment</button>
<div>Current Count: {{ count$ | async }}</div>
<button (click)="decrement()">Decrement</button>
<button (click)="reset()">Reset Counter</button>
```
---

### Селекторы
* [Документация](https://ngrx.io/guide/store/selectors).

```ts
import { createSelector } from '@ngrx/store';
 
export interface State {
  counter1: number;
  counter2: number;
}
 
export const selectCounter1 = createSelector((state: State) => state.counter1);
export const selectCounter2 = createSelector((state: State) => state.counter2);
export const selectTotal = createSelector(
  selectCounter1,
  selectCounter2,
  (counter1, counter2) => counter1 + counter2
); 
```

```ts
// component.ts
constructor(private store: Store<{ count: number }>) {
    this.total$ = store.select(selectTotal);
}
```
---

### Сайд-эффекты
* Сайд-эффект &mdash; инструмент для обращения к API.
* Без сайд-эффекта происходит вот что:
  * Компонент запускает вызов к API (в сервисе).
  * Сервис возвращает данные.
  * Компонент сохраняет данные в стор или во внутреннее состояние.
* Минусы такого подхода:
  * Логика работы с API размазана между стором, компонентом и сервисом.
---

### Сайд-эффекты
* С сайд-эффектом происходит вот что:
  * Компонент вызывает экшен с помощью dispatch.
  * Сайд-эффект отслеживает нужный экшен.
  * Производит вызов в API (а то и не один).
  * Вызывает экшен сохранения результата.
  * Стор сохраняет результат.
* Плюсы: асинхронная логика лежит в одном месте.
* Напоминает [Redux Saga](https://redux-saga.js.org/).
---

### Сайд-эффекты: установка
```shell
ng add @ngrx/effects@latest
```
---

### Сайд-эффекты: приготовления
* Экшены:
```ts
export const retreiveTodos = createAction('retreiveTodos');
export const setTodos = createAction('setTodos', props<Todo[]>());
```
* Редуктор:
```ts
const initialState: Todos[] = [];
export const todosReducer = createReducer(
    initialState,
    on(setTodos, (state, todos) => {
      return [...todos];
    })
);
```
---

### Сайд-эффекты
* Эффект:
  
```ts
@Injectable()
export class TodoEffects {
  todos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retreiveTodos),
      exhaustMap(action =>
        // тут может быть вызов сервиса для похода в API
        this.http.get("http://URL").pipe(
          map(todos => setTodos(todos),
          catchError(error => console.error)) // можно вызвать экшен сохранения ошибки
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}
}
```
---

### Сайд-эффекты
* Подключение в модуле:
```ts
import { EffectsModule } from '@ngrx/effects';
import { MovieEffects } from './effects/movie.effects';
@NgModule({
    imports: [
      EffectsModule.forRoot([TodoEffects])
    ],
})
export class AppModule {}
```
---

### Сайд-эффекты
* Кода общения с API выносят в отдельный сервис (см. ниже ⬇).
* Эффект:
```ts
@Injectable()
export class TodoEffects {
    todos$ = createEffect(() =>
      this.actions$.pipe(ofType(retreiveTodos),
        exhaustMap(
            // Вызов API
            action => this.todoApiService.getAll()
            .pipe(map(todos => setTodos(todos))))
      )
    );
    constructor(
      private actions$: Actions,
      private todoApiService: TodoApiService
    ) {}
}
```
----
```ts
@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  constructor (private http: HttpClient) {}
  getAll() {
    return this.http.get('/todos');
  }
}
```
---

### Маршрутизация в сторе
* Можно использовать [@ngrx/router-store](https://ngrx.io/guide/router-store).
* Подключить routerReducer.
* Добавить вызов RouterStoreModule.connectRoute в основном модуле приложения.
* Добавляем RouterState в основное состояние приложения.
* [Подробнее](https://habr.com/ru/post/425959/).
---

### Тестирование
* [Тестирование стора](https://ngrx.io/guide/store/testing).
* [Тестирование сайд-эффектов](https://ngrx.io/guide/effects/testing).
---

### Альтернативы
* [NGXS](https://www.ngxs.io/).
* [Elf](https://ngneat.github.io/elf/docs/store).
* [rx-angular](https://github.com/rx-angular/rx-angular/blob/master/libs/state/README.md).
* [Mobx-angular](https://github.com/mobxjs/mobx-angular).