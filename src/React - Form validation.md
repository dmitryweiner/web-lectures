---
title: React - Form validation
---

## Валидация форм в React.js

![react validation](assets/react-validation/img.png)

[все лекции](https://github.com/dmitryweiner/lectures/blob/main/README.md)

[видео]()
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
https://blog.shahednasser.com/how-to-create-and-validate-forms-in-react-using-formik-and-yup/
---

![](assets/react-validation/img_3.png)