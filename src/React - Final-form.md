---
title: React - Final-form
---

## Валидация форм с помощью библиотеки
# `final-form`

[все лекции](https://github.com/dmitryweiner/lectures/blob/main/README.md)

[видео](https://youtu.be/lBDKQ00vSjk)
---

### final-form
* [Руководство](https://final-form.org/docs/react-final-form/getting-started).
* Подключение:
```shell
npm i final-form react-final-form
```
* Использование:

```jsx
import { Form, Field } from 'react-final-form'

const MyForm = () => (
  <Form
    onSubmit={onSubmit}
    validate={validate}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <h2>Simple Default Input</h2>
        <div>
          <label>First Name</label>
          <Field name="firstName" component="input" placeholder="First Name" />
        </div>

        <h2>An Arbitrary Reusable Input Component</h2>
        <div>
          <label>Interests</label>
          <Field name="interests" component={InterestPicker} />
        </div>

        <h2>Render Function</h2>
        <Field
          name="bio"
          render={({ input, meta }) => (
            <div>
              <label>Bio</label>
              <textarea {...input} />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>
          )}
        />

        <h2>Render Function as Children</h2>
        <Field name="phone">
          {({ input, meta }) => (
            <div>
              <label>Phone</label>
              <input type="text" {...input} placeholder="Phone" />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>
          )}
        </Field>

        <button type="submit">Submit</button>
      </form>
    )}
  />
)
```
---

### final-form
* Плюсы:
  * Не надо хранить поля в state.
  * Валидация разнесена с отправкой формы.
  * Возможна асинхронность.
  * Хорошо работает с Material UI.
* Минусы:
  * Высокий порог входа.
---

### Задача
* Переделать форму, написанную в [предыдущей лекции](https://dmitryweiner.github.io/lectures/React%20-%20Form%20validation.html#/):
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

* Отдельное поле. Было:

```tsx
<div>
  <label>Логин:
    <input value={login} onChange={e => setLogin(e.target.value)}/>
  </label>
  {loginError && <div className={styles.error}>
    {loginError}
  </div>}
</div>
```

* Стало:

```tsx
<Field name="login">
  {({input, meta}) => (
    <div>
      <label>Логин:
        <input type="text" {...input} placeholder="Логин"/>
      </label>
      {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
    </div>
  )}
</Field>
```
---

### Функция валидации
```ts
type FormValues = {
  login: string;
  password: string;
};

const isValid = (values: FormValues): ValidationErrors => {
  const errors: ValidationErrors = {}
  if (!/^([a-z0-9]{6,20})$/.test(values?.login)) {
    errors.login = "Логин должен содержать от 6 до 20 символов латинского алфавита и цифры.";
  }

  if (!values?.login) {
    errors.login = "Логин не может быть пустым.";
  }

  if (!values?.password) {
    errors.password = "Пароль не может быть пустым.";
  }

  return errors;
};
```
---

### Форма в сборе

```tsx
import React from "react";
import { ValidationErrors } from "final-form";
import { Form as FinalForm, Field } from 'react-final-form'
import styles from "./Form.module.css";

type FormValues = {
  login: string;
  password: string;
};

export default function Form() {
  const isValid = (values: FormValues): ValidationErrors => {
    const errors: ValidationErrors = {}
    if (!/^([a-z0-9]{6,20})$/.test(values?.login)) {
      errors.login = "Логин должен содержать от 6 до 20 символов латинского алфавита и цифры.";
    }

    if (!values?.login) {
      errors.login = "Логин не может быть пустым.";
    }

    if (!values?.password) {
      errors.password = "Пароль не может быть пустым.";
    }

    return errors;
  };

  const onSubmit = (values: FormValues) => {
    // отправка данных на сервер
    console.log(values);
  };

  return <>
    <FinalForm
      onSubmit={onSubmit}
      validate={isValid}
      render={({handleSubmit}) => (
        <form onSubmit={handleSubmit}>
          <Field name="login">
            {({input, meta}) => (
              <div>
                <label>Логин:
                  <input type="text" {...input} placeholder="Логин"/>
                </label>
                {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
              </div>
            )}
          </Field>
          <Field name="password">
            {({input, meta}) => (
              <div>
                <label>Пароль:
                  <input type="password" {...input} placeholder="Пароль"/>
                </label>
                {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
              </div>
            )}
          </Field>
          <button type="submit">Войти</button>
        </form>
      )}>
    </FinalForm>
  </>;
}
```
---

### Валидацию можно производить на уровне поля
* Создать функции валидации:

```ts
const required = value => (value ? undefined : 'Required')
const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
const minValue = min => value =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`
const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)
```

* Передавать их в поле Field.validate:

```tsx
<Field name="firstName" validate={required}>
  {({ input, meta }) => (
    <div>
      <label>First Name</label>
      <input {...input} type="text" placeholder="First Name" />
      {meta.error && meta.touched && <span>{meta.error}</span>}
    </div>
  )}
</Field>
```
---

### Валидация на уровне поля
* Валидаторы можно комбинировать:

```tsx
<Field
  name="age"
  validate={composeValidators(required, mustBeNumber, minValue(18))}
>
  {({ input, meta }) => (
    <div>
      <label>Age</label>
      <input {...input} type="text" placeholder="Age" />
      {meta.error && meta.touched && <span>{meta.error}</span>}
    </div>
  )}
</Field>
```
* [Пример](https://codesandbox.io/s/github/final-form/react-final-form/tree/master/examples/field-level-validation?file=/index.js).
---

### Перепишем нашу форму на валидаторах полей
* Выделим валидаторы в отдельные функции:

```ts
const required = (value: string) => (value ? undefined : "Это поле не может быть пустым")
const validLogin = (value: string) => {
  if (!/^([a-z0-9]{6,20})$/.test(value)) {
    return "Логин должен содержать от 6 до 20 символов латинского алфавита и цифры.";
  }
  return undefined;
};
const composeValidators = (...validators: any[]) => (value: string) =>
        validators.reduce((error, validator) => error || validator(value), undefined)
```
---

### Поля будут использовать написанные валидаторы
```tsx
<Field name="login" validate={composeValidators(required, validLogin)}>
  {({input, meta}) => (
    <div>
      <label>Логин:
        <input type="text" {...input} placeholder="Логин"/>
      </label>
      {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
    </div>
  )}
</Field>
<Field name="password" validate={required}>
  {({input, meta}) => (
    <div>
      <label>Пароль:
        <input type="password" {...input} placeholder="Пароль"/>
      </label>
      {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
    </div>
  )}
</Field>
```
---

### Форма в сборе
```tsx
import React from "react";
import { Form as FinalForm, Field } from 'react-final-form'
import styles from "./Form.module.css";

type FormValues = {
  login: string;
  password: string;
};

const required = (value: string) => (value ? undefined : "Это поле не может быть пустым")
const validLogin = (value: string) => {
  if (!/^([a-z0-9]{6,20})$/.test(value)) {
    return "Логин должен содержать от 6 до 20 символов латинского алфавита и цифры.";
  }
  return undefined;
};
const composeValidators = (...validators: any[]) => (value: string) =>
        validators.reduce((error, validator) => error || validator(value), undefined)

export default function Form() {
  const onSubmit = (values: FormValues) => {
    // отправка данных на сервер
    console.log(values);
  };

  return <>
    <FinalForm
      onSubmit={onSubmit}
      render={({handleSubmit}) => (
        <form onSubmit={handleSubmit}>
          <Field name="login" validate={composeValidators(required, validLogin)}>
            {({input, meta}) => (
              <div>
                <label>Логин:
                  <input type="text" {...input} placeholder="Логин"/>
                </label>
                {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
              </div>
            )}
          </Field>
          <Field name="password" validate={required}>
            {({input, meta}) => (
              <div>
                <label>Пароль:
                  <input type="password" {...input} placeholder="Пароль"/>
                </label>
                {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
              </div>
            )}
          </Field>
          <button type="submit">Войти</button>
        </form>
      )}>
    </FinalForm>
  </>;
}
```
---

### Validation Schema
* Можно выделить правила валидации в виде схемы.
* Это удобнее, чем комбинировать разрозненные валидаторы.
* Удобно это делать с помощью библиотеки [Yup](https://github.com/jquense/yup).
* Установка:
```shell
npm i yup
```
* [Пример работы](https://codesandbox.io/s/yup-v032-react-final-form-typescript-ogkmq?file=/src/components/App.tsx).
---

### Validation Schema: пример из рабочего проекта
```js
export const InformationSchema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  birthDate: yup
          .string()
          .nullable()
          .required('Date of birth is required')
          .test('birthDate', function testSSN(value) {
            if (_.isNil(value)) {
              return this.createError({
                message: 'Birth date is required',
                path: 'birthDate',
              });
            }

            const birthDate = DateTime.fromISO(value).startOf('day');
            const today = DateTime.now().startOf('day');
            if (birthDate > today) {
              return this.createError({
                message: 'Birth date is invalid',
                path: 'birthDate',
              });
            }

            return true;
          }),
  phone: yup.object({
    number: yup
            .string()
            .matches(/^[0-9]{10}$/, { message: 'Phone is invalid' })
            .nullable()
            .required('Phone is required'),
  }),
  companyName: yup.string().required('Company Name is required'),
  employeeCount: yup.number().required('Total Employee Count is required'),
  industry: yup
          .string()
          .matches(/^\d{6}$/, 'Field must be 6 digits')
          .nullable()
          .optional(),
  taxYearEndDay: yup.string().nullable().required('Tax Year End Day is required'),
  taxYearEndMonth: yup.string().nullable().required('Tax Year End Month is required'),
  address: yup.object({
    street1: yup.string().required('Street address is required'),
    state: yup.string().required('State is required'),
    city: yup.string().required('City is required'),
    apartment: yup.string().nullable().optional(),
    zip: yup
            .string()
            .test('ZipCode_numeric', 'Zip Code should be numeric', value => /^\d+$/.test(value || ''))
            .required('Zip Code is required'),
  }),
});
```
---

### Напишем схему валидации
```ts
const validationSchema = yup.object({
  login: yup
    .string()
    .matches(/^([a-z0-9]{6,20})$/, "Логин должен содержать от 6 до 20 символов латинского алфавита и цифры.")
    .required("Логин не может быть пустым."),
  password: yup
    .string()
    .required("Пароль не может быть пустым."),
});

const validate = async (
  values: FormValues
): Promise<ValidationErrors | undefined> => {
  try {
    await validationSchema.validate(values, {abortEarly: false})
  } catch (error: any) {
    const errors: { [value: string]: string } = {};
    error.inner.forEach((e: ValidationError) => {
      if (e.path) {
        errors[e.path] = e.message;
      }
    });
    return errors;
  }
}
```
---

### Форма в сборе
```tsx
import { ValidationErrors } from "final-form";
import React from "react";
import { Form as FinalForm, Field } from 'react-final-form'
import { ValidationError } from "yup";
import styles from "./Form.module.css";
import * as yup from 'yup';

type FormValues = {
  login: string;
  password: string;
}

const validationSchema = yup.object({
  login: yup
    .string()
    .matches(/^([a-z0-9]{6,20})$/, "Логин должен содержать от 6 до 20 символов латинского алфавита и цифры.")
    .required("Логин не может быть пустым."),
  password: yup
    .string()
    .required("Пароль не может быть пустым."),
});

const validate = async (
  values: FormValues
): Promise<ValidationErrors | undefined> => {
  try {
    await validationSchema.validate(values, {abortEarly: false})
  } catch (error: any) {
    const errors: { [value: string]: string } = {};
    error.inner.forEach((e: ValidationError) => {
      if (e.path) {
        errors[e.path] = e.message;
      }
    });
    return errors;
  }
}

export default function Form() {
  const onSubmit = (values: FormValues) => {
    // отправка данных на сервер
    console.log(values);
  };

  return <>
    <FinalForm
      onSubmit={onSubmit}
      validate={validate}
      render={({handleSubmit}) => (
        <form onSubmit={handleSubmit}>
          <Field name="login">
            {({input, meta}) => (
              <div>
                <label>Логин:
                  <input type="text" {...input} placeholder="Логин"/>
                </label>
                {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
              </div>
            )}
          </Field>
          <Field name="password">
            {({input, meta}) => (
              <div>
                <label>Пароль:
                  <input type="password" {...input} placeholder="Пароль"/>
                </label>
                {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
              </div>
            )}
          </Field>
          <button type="submit">Войти</button>
        </form>
      )}>
    </FinalForm>
  </>;
}
```
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