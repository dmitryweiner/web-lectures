// посчитать максимум и минимум массива
const arr = [1, 6, -1, 22, 13];

// перевернуть строку задом наперёд
const str = "!тевирП";

// вычислить сумму квадратных корней для всех чётных чисел целочисленного массива
const arr1 = [3, 5, 8, 13, 21, 42];


/**
 * написать функцию, которая проверяет, являются ли две строки анаграммой
 *
 * anagram("Лунь", "нуль") // true
 * anagram("Лунь", "ноль") // false
 *
 * @see https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%B0%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0
 */

/**
 * написать функцию, которая проверяет, является ли строка палиндромом
 *
 * palindrome("Аргентина манит негра") // true
 * palindrome("123") // false
 *
 * @see https://ru.wikipedia.org/wiki/%D0%9F%D0%B0%D0%BB%D0%B8%D0%BD%D0%B4%D1%80%D0%BE%D0%BC
 */
const evenArr = [8, 42]
const acc = evenArr.reduce(
    (acc,element)=>{return acc+Math.sqrt(element)},
    0
);
console.log(acc);
