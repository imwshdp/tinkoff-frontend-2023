# 4 задание

Ограничение времени: 1 секунда\
Ограничение памяти: 256 МБ

## Текст задания

Набор чисел _x1, x2, ... , xk_ назовем "скучным", если получается удалить из него один элемент так, чтобы каждое число в данном наборе встречалось одинаковое количество раз. Удаление - обязательная операция.\
\
Дан массив _a1, a2, ... , an_ длины _n_. Найдите максимальное число _l_ (2 <= _l_ <= _n_), что префикс длины _l_ этого массива, т.е. его первые _l_ элементов, является скучным набором чисел.\
\
`Формат входных данных`\
 Первая строка содержит число _n_ (2 <= _n_ <= 2 * 10^5) - размер массива. Во второй строке находятся *n* чисел из массива *a1, a2, ... , an* (1 <= *ai* <= 2 * 10^5).\

`Формат выходных данных`\
 Выведите одно число - максимальное _l_, что префикс длины _l_ массива _a_ является скучным.

## Примеры данных

### Пример 1

`Ввод`:\
13\
1 2 3 1 2 2 3 3 3 1 4 4 5\
`Вывод`: 10

### Пример 2

`Ввод`:\
10\
1 2 4 2 3 1 3 9 15 23\
`Вывод`: 7

### Пример 3

`Ввод`:\
5\
1 2 3 4 5\
`Вывод`: 5
