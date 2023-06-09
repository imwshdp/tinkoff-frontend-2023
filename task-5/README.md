# 5 задание

Ограничение времени: 1 секунда\
Ограничение памяти: 256 МБ

## Текст задания

Саша ведет бюджет и анализирует, как изменялся баланс на его счету. Он выписал числа _a1, a2, ... , an_ - изменения баланса за последние _n_ дней.\
\
Отрезок из дней _[i, j]_ Саша считает _разумным_, если суммарное изменение баланса с _i_-того по _j_-й день равно нулю, т.е. _ai + ai+1 + ... + aj = 0_. Отрезок из дней [_l, r_] считается _нормальным_, если внутри данного отрезка можно найти _разумный_ подотрезок.\
\
Помогите Саше проанализировать эффективность ведения бюджета и посчитайте количество нормальных отрезков в массиве изменений баланса его счета.\
\
`Формат входных данных`\
 Первая строка содержит число _n_ (1 <= _n_ <= 2 \* 10^5) - количество дней, для которых Саша записывал изменения баланса.

Вторая строка содержит число _n_ чисел из _a1, a2, ... , an_ (-10^9 <= _ai_ <= 10^9) - значения изменений баланса.

`Формат выходных данных`\
 Выведите одно число — количество нормальных отрезков для данного массива.

`Замечание`\
 Отрезки длины 1 при соблюдении остальных условий тоже могут считаться разумными и нормальными.

## Примеры данных

### Пример 1

`Ввод`:\
3\
42 -42 42\
`Вывод`: 3

### Пример 2

`Ввод`:\
4\
1 2 3 -6\
`Вывод`: 1

### Пример 3

`Ввод`:\
5\
-1 1 2 -3 6\
`Вывод`: 6
