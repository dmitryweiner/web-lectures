---
title: React - Form validation
---

## Валидация форм в React.js

![react validation](assets/react-validation/img.png)

[все лекции](https://github.com/dmitryweiner/lectures/blob/main/README.md)

[видео]()
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

### Время валидации
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
* Поле "Логин":
  * Обязательное.
  * Содержит от 6 до 20 символов.
  * Туда можно вводить буквы латинского алфавита и цифры.
* Поле "Пароль":
  * Обязательное.
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
https://final-form.org/docs/react-final-form/getting-started

---

### Validation Schema
```js
export const EndCompanyUserEditLocationSchema = yup.object({
  name: yup.string().required('Location name is required'),
  FEIN: yup.string().optional(),
  address: yup.object({
    street: yup.string().required('Street address is required'),
    state: yup.string().required('State is required'),
    city: yup.string().required('City is required'),
    zIPCode: yup.number().required('Zip Code is required'),
  }),
});

```

---

### Formik + Yup
https://blog.shahednasser.com/how-to-create-and-validate-forms-in-react-using-formik-and-yup/

---

### 

---


### Задачи
---

### Полезные ссылки
* https://blog.shahednasser.com/how-to-create-and-validate-forms-in-react-using-formik-and-yup/
* https://developer.mozilla.org/ru/docs/Learn/Forms/Form_validation
* https://guides.kontur.ru/principles/validation/
---

![](assets/react-validation/img_3.png)