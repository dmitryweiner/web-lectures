## React: тестирование функциональных компонентов

![react-testing library](assets/react-testing/logo-large.png)

[Дмитрий Вайнер](mailto:dmitry.weiner@gmail.com)

[видео]()

---

### Типовой тест

```javascript
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

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
