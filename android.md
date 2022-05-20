### Вопросы по курсу "Программирование мобильных устройств"

* Написать кликер с возможностью уменьшения и увеличения:

    ![](src/assets/android/questions/img.png)
    
    Если число нечётное, то оно красное, иначе зелёное.

* Калькулятор площади прямоугольника:

  ![](src/assets/android/questions/img_1.png)

  Площадь должна обновляться автоматически при изменении слайдеров (`addOnChangeListener`).

* Сделать обратный таймер:

  ![](src/assets/android/questions/img_2.png)

  Таймер при нажатии кнопки "старт" идёт до 0 и останавливается. Можно остановить кнопкой "стоп".
  Пользоваться `CountDownTimer` нельзя, `Handler` и `Thread` можно.

* Сделать калькулятор:
  
  ![](src/assets/android/questions/img_3.png)
 
  Ответ обновляется автоматически при изменении полей ввода (`addTextChangeListener`, `Spinner.setOnItemSelectedListener`).

* Сделать калькулятор перевода температур из Цельсия в Фаренгейты и обратно:

  ![](src/assets/android/questions/img_4.png)

* Добавляем числа в `ArrayList<Integer>` и показываем среднее арифметическое:

  ![](src/assets/android/questions/img_5.png)

* Добавляем числа в `ArrayList<Integer>` и показываем элементы списка в 
  зависимости от положения `RadioButton` (для реакции на изменения использовать
  `RadioGroup.setOnChangeListener`).

  ![](src/assets/android/questions/img_6.png)

* При открытии приложение каждую секунду добавляет в TextView очередное простое число:

  2, 3, 5, 7, 11...