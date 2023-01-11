---
title: React - Form validation
---

## Валидация форм в React.js

![react validation](assets/react-validation/img.png)

[все лекции](https://github.com/dmitryweiner/web-lectures/blob/main/README.md)

[видео](https://youtu.be/lBDKQ00vSjk)
---

### Валидация формы
> Проверка данных формы на соответствие заданному формату.
* Бывает на стороне клиента (JS) и на стороне сервера.
* Требования к данным:
  * Обязательность (не может быть пустым).
  * Длина (max, min).
  * Формат (телефон, email, номер паспорта).
  * Содержание символов (только латинские, etc.).
---

### Момент валидации
* Немедленная: при вводе показывается сообщение об ошибке.
* При отправке формы: ошибки показываются только при попытке 
отправить данные.
---

### Задача
* Реализовать валидацию формы авторизации:
<br/>Логин:
<input>
<br/>Пароль:
<input>
<br/><button>Войти</button>
---

### Условия валидации
* Поле "Логин":
  * Обязательное.
  * Содержит от 6 до 20 символов.
  * Туда можно вводить буквы латинского алфавита и цифры.
* Поле "Пароль":
  * Обязательное.
* Валидация будет происходить при нажатии на кнопку "Войти".
---

### Форма
* В стейте формы должны лежать введённые данные (2 поля).
* Также в стейте должны лежать сообщения о возможных ошибках в полях.
* Должна быть функция `isValid()`, которую вызывают при отправке формы. 
  * Она возвращает true если всё валидно, процесс обработки формы идёт дальше (отправка на сервер?).
  * Она возвращает false, если есть ошибки. Ошибки показываем пользователю.

---

### Форма
```tsx
export default function Form() {
  const [login, setLogin] = useState("");
  const [loginError, setLoginError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isValid = (): boolean => {
    // TODO
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid()) {
      // отправка данных на сервер
    }
  };

  return <>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Логин:
          <input 
            value={login} 
            onChange={e => setLogin(e.target.value)}/>
        </label>
      </div>
      <div>
        <label>Пароль:
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)}/>
        </label>
      </div>
      <button type="submit">Войти</button>
    </form>
  </>;
}
```

---

### Напишем функцию валидации
```ts
const isValid = (): boolean => {
  let result = true;
  if (login.length === 0) {
    setLoginError("Логин не может быть пустым.");
    result = false;
  }

  if (!/^([a-z0-9]{6,20})$/.test(login)) {
    setLoginError("Логин должен содержать от 6 до 20 символов латинского алфавита и цифры.");
    result = false;
  }

  if (password.length === 0) {
    setPasswordError("Пароль не может быть пустым.");
    result = false;
  }

  return result;
};
```
---

### Напишем отображение ошибок
```css
.error {
    color: red;
}
```

```tsx
    <form onSubmit={handleSubmit}>
  <div>
    <label>Логин:
      <input value={login} onChange={e => setLogin(e.target.value)}/>
    </label>
    {loginError && <div className={styles.error}>
      {loginError}
    </div>}
  </div>
  <div>
    <label>Пароль:
      <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
    </label>
    {passwordError && <div className={styles.error}>
      {passwordError}
    </div>}
  </div>
  <button type="submit">Войти</button>
</form>
```

---

### Форма в сборе
```tsx
import { FormEvent, useState } from "react";
import styles from "./Form.module.css";

export default function Form() {
  const [login, setLogin] = useState("");
  const [loginError, setLoginError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isValid = (): boolean => {
    let result = true;

    // очищаем ошибки
    setLoginError("");

    if (!/^([a-z0-9]{6,20})$/.test(login)) {
      setLoginError("Логин должен содержать от 6 до 20 символов латинского алфавита и цифры.");
      result = false;
    }

    if (login.length === 0) {
      setLoginError("Логин не может быть пустым.");
      result = false;
    }

    setPasswordError("");

    if (password.length === 0) {
      setPasswordError("Пароль не может быть пустым.");
      result = false;
    }

    return result;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValid()) {
      // отправка данных на сервер
    }
  };

  return <>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Логин:
          <input value={login} onChange={e => setLogin(e.target.value)}/>
        </label>
        {loginError && <div className={styles.error}>
          {loginError}
        </div>}
      </div>
      <div>
        <label>Пароль:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        </label>
        {passwordError && <div className={styles.error}>
          {passwordError}
        </div>}
      </div>
      <button type="submit">Войти</button>
    </form>
  </>;
}
```
---

### Плюсы и минусы подхода
* Плюсы:
  * Просто.
* Минусы:
  * Если полей много (больше 2), код становится лапшеобразным 🍜 и слабоподдерживаемым.
---

### Альтернативы
* Костыль:
  * Складывать форму в объект с отдельными полями, соответствующими полям формы.
  * Складывать ошибки в объект с полями.
* Использовать для обработки формы сторонние библиотеки:
  * [Formik](https://formik.org/).
  * [Final-form](https://dmitryweiner.github.io/web-lectures/React%20-%20Final-form.html#/).
---

### Задачи
* Написать валидацию формы регистрации:
  * Поле "Логин":
    * Обязательное.
    * Содержит от 6 до 20 символов.
    * Туда можно вводить буквы латинского алфавита и цифры.
  * Поле "Пароль":
    * Обязательное.
  * Поле "Повтор пароля":
    * Обязательное.
    * Должно совпадать с паролем.
---

### Задачи
* Написать валидацию формы редактирования профиля:
  * Имя (обязательно).
  * Отчество (обязательно).
  * Фамилия (обязательно).
  * Дата рождения (ДД.ММ.ГГГГ, опционально).
  * Адрес (опционально).
---

### Полезные ссылки
* https://blog.shahednasser.com/how-to-create-and-validate-forms-in-react-using-formik-and-yup/
* https://developer.mozilla.org/ru/docs/Learn/Forms/Form_validation
* https://guides.kontur.ru/principles/validation/
* https://regex101.com/
---

![](assets/react-validation/img_3.png)
